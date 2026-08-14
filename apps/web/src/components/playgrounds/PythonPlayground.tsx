import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faRotateLeft, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../../utils/translations';

interface PythonPlaygroundProps {
  lang: Language;
  initialCode?: string;
}

interface ExecutionResult {
  stdout: string;
  stderr: string;
  error: string;
  executionTimeMs: number;
  image?: string;
}

const DEFAULT_PYTHON = `# Tryngo Python Playground — Pyodide (WASM)
# Pre-loaded modules: math, random, json, datetime, collections, itertools

import math
import random
import json
from datetime import datetime
from collections import Counter
import itertools

def greet(name):
    return f"Hello, {name}! Welcome to Tryngo!"

students = ["Alice", "Bob", "Charlie"]
for student in students:
    print(greet(student))

# Try modifying the code above!
`;

// ---------------------------------------------------------------------------
// Worker-based Pyodide runner.
//
// Pyodide's runPythonAsync executes synchronously on the calling thread — an
// infinite loop in user code would freeze the entire tab with no way to abort.
// Running Pyodide inside a Web Worker keeps the UI responsive and lets us kill
// a stuck run by terminating the worker. The worker is kept alive between runs
// and only recreated after a timeout kills it.
// ---------------------------------------------------------------------------

const PYODIDE_BASE = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full';

const PY_WORKER_SRC = `
importScripts('${PYODIDE_BASE}/pyodide.js');

let pyodide = null;
let ready = false;
let baselineGlobals = false;

const PREP_CODE = [
  'import sys',
  'import io',
  "sys.stdout = io.StringIO()",
  "sys.stderr = io.StringIO()",
  "try:",
  "    import matplotlib.pyplot as plt",
  "    plt.close('all')",
  "except Exception:",
  "    pass"
].join('\\n');

const RESET_GLOBALS_CODE = [
  "__tryngo_base = globals().get('globals_baseline', None)",
  "__tryngo_base = __tryngo_base if isinstance(__tryngo_base, set) else set()",
  "__tryngo_keep = set(globals().keys())",
  "for __tryngo_k in set(globals().keys()) - __tryngo_base - {'__tryngo_keep', 'globals_baseline', '__tryngo_base'}:",
  "    globals().pop(__tryngo_k, None)",
  "del __tryngo_keep, __tryngo_base"
].join('\\n');

const PLOT_CAPTURE_CODE = [
  'import matplotlib',
  "matplotlib.use('AGG')",
  'import matplotlib.pyplot as plt',
  'import io',
  'import base64',
  '',
  'buf = io.BytesIO()',
  "try:",
  "    plt.savefig(buf, format='png', dpi=100, bbox_inches='tight')",
  "    buf.seek(0)",
  "    img_base64 = base64.b64encode(buf.read()).decode('utf-8')",
  "    plt.close('all')",
  '    img_base64',
  'except Exception as e:',
  "    plt.close('all')",
  "    ''"
].join('\\n');

async function ensureReady() {
  if (ready) return;
  pyodide = await loadPyodide({ indexURL: '${PYODIDE_BASE}/' });
  await pyodide.loadPackage(['matplotlib']);
  ready = true;
}

self.onmessage = async (e) => {
  const { id, type, code } = e.data;
  if (type === 'ready') return;
  if (type !== 'run') return;
  try {
    await ensureReady();
    postMessage({ type: 'ready' });
  } catch (err) {
    postMessage({ id, type: 'load-error', error: err && err.message ? String(err.message) : String(err) });
    return;
  }
  const stdoutLines = [];
  const stderrLines = [];
  try {
    pyodide.setStdout({ batched: (t) => stdoutLines.push(t) });
    pyodide.setStderr({ batched: (t) => stderrLines.push(t) });
    pyodide.setStdin({ stdin: () => '' });
  } catch {
    // buffers unavailable — continue without capture
  }
  const start = performance.now();
  let stdout = '';
  let stderr = '';
  let image = '';
  let error = '';
  try {
    if (!baselineGlobals) {
      await pyodide.runPythonAsync(PREP_CODE);
      await pyodide.runPythonAsync("globals_baseline = set(globals().keys())");
      baselineGlobals = true;
    } else {
      await pyodide.runPythonAsync(RESET_GLOBALS_CODE);
      await pyodide.runPythonAsync(PREP_CODE);
    }
    await pyodide.runPythonAsync(code);
    const plotResult = await pyodide.runPythonAsync(PLOT_CAPTURE_CODE);
    stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
    stderr = await pyodide.runPythonAsync('sys.stderr.getvalue()');
    if (plotResult && typeof plotResult === 'string' && plotResult.length > 0) {
      image = 'data:image/png;base64,' + plotResult;
    }
  } catch (err) {
    error = err && err.message ? String(err.message) : String(err);
    try {
      const so = await pyodide.runPythonAsync('sys.stdout.getvalue()');
      const se = await pyodide.runPythonAsync('sys.stderr.getvalue()');
      if (so) stdout = so;
      if (se) stderr = se;
    } catch {
      if (stdoutLines.length) stdout = stdoutLines.join('');
      if (stderrLines.length) stderr = stderrLines.join('');
    }
  }
  postMessage({
    id,
    type: 'result',
    stdout: String(stdout || ''),
    stderr: String(stderr || ''),
    error: String(error || ''),
    image: image || '',
    executionTimeMs: performance.now() - start,
  });
};
`;

let pyWorker: Worker | null = null;
let pyWorkerReady = false;
let pyRunSeq = 1;

function runPythonWorker(code: string): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    let settled = false;
    let handler: ((e: MessageEvent) => void) | null = null;
    let runTimer: ReturnType<typeof setTimeout> | null = null;

    const finish = (res: ExecutionResult) => {
      if (settled) return;
      settled = true;
      if (runTimer) clearTimeout(runTimer);
      if (handler && pyWorker) {
        pyWorker.removeEventListener('message', handler);
      }
      resolve(res);
    };

    if (!pyWorker) {
      try {
        const blob = new Blob([PY_WORKER_SRC], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        pyWorker = new Worker(url);
        URL.revokeObjectURL(url);
        pyWorkerReady = false;
        pyWorker.addEventListener('message', (e) => {
          const data = e.data;
          if (data && data.type === 'ready') pyWorkerReady = true;
        });
      } catch (err) {
        finish({
          stdout: '',
          stderr: '',
          error: err instanceof Error ? err.message : 'Failed to start Python worker',
          executionTimeMs: 0,
        });
        return;
      }
    }

    const id = pyRunSeq++;
    handler = (e: MessageEvent) => {
      const data = e.data;
      if (!data || data.id !== id) return;
      if (data.type === 'result') {
        finish({
          stdout: data.stdout,
          stderr: data.stderr,
          error: data.error,
          image: data.image || undefined,
          executionTimeMs: data.executionTimeMs,
        });
      } else if (data.type === 'load-error') {
        finish({
          stdout: '',
          stderr: '',
          error: data.error || 'Failed to load Pyodide',
          executionTimeMs: 0,
        });
      }
    };
    pyWorker.addEventListener('message', handler);
    pyWorker.postMessage({ id, type: 'run', code });

    // First run includes the Pyodide + matplotlib download, so give it a much
    // longer budget. Subsequent runs execute against a warm worker.
    const timeoutMs = pyWorkerReady ? 15000 : 60000;
    runTimer = setTimeout(() => {
      const timedOut = pyWorkerReady
        ? 'Python execution timed out (possible infinite loop)'
        : 'Pyodide load timed out. Check your internet connection.';
      finish({ stdout: '', stderr: '', error: timedOut, executionTimeMs: 0 });
      if (pyWorker) {
        pyWorker.terminate();
        pyWorker = null;
        pyWorkerReady = false;
      }
    }, timeoutMs);
  });
}

export const PythonPlayground: React.FC<PythonPlaygroundProps> = ({ lang, initialCode }) => {
  const isId = lang === 'id';
  const [code, setCode] = useState(initialCode || DEFAULT_PYTHON);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const prevInitialCode = useRef(initialCode);
  const [editorKey, setEditorKey] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isRunningRef = useRef(false);
  const runIdRef = useRef(0);
  const mountedRef = useRef(true);
  const runPythonRef = useRef<() => void>(() => {});

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (mountedRef.current) setEditorReady(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setIsHorizontal(entry.contentRect.width >= 500);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!initialCode) return;
    if (prevInitialCode.current === initialCode) return;
    prevInitialCode.current = initialCode;
    runIdRef.current++;
    isRunningRef.current = false;
    setIsRunning(false);
    setIsLoading(false);
    setCode(initialCode);
    setResult(null);
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [result]);

  const runPython = useCallback(async () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    const runId = ++runIdRef.current;
    setIsRunning(true);
    setResult(null);

    const start = performance.now();
    const finish = (res: ExecutionResult) => {
      if (!mountedRef.current || runIdRef.current !== runId) return;
      setResult(res);
      isRunningRef.current = false;
      setIsRunning(false);
      setIsLoading(false);
    };

    setIsLoading(true);
    const res = await runPythonWorker(code);
    if (!mountedRef.current || runIdRef.current !== runId) return;
    setIsLoading(false);

    if (res.error && (/Pyodide load timed out/i.test(res.error) || /^Failed to load Pyodide/i.test(res.error))) {
      const errorMsg = isId
        ? `Gagal memuat Pyodide: ${res.error}\nPastikan koneksi internet tersedia.`
        : `Failed to load Pyodide: ${res.error}\nMake sure internet connection is available.`;
      finish({ stdout: '', stderr: '', error: errorMsg, executionTimeMs: performance.now() - start });
      return;
    }

    finish({
      stdout: res.stdout,
      stderr: res.stderr,
      error: res.error,
      executionTimeMs: performance.now() - start,
      image: res.image,
    });
  }, [code, isId]);

  runPythonRef.current = runPython;

  const handleReset = useCallback(() => {
    runIdRef.current++;
    isRunningRef.current = false;
    setIsRunning(false);
    setIsLoading(false);
    setCode(initialCode || DEFAULT_PYTHON);
    setResult(null);
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runPython();
    }
  };

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.addCommand(
      2048 | 3,
      () => runPythonRef.current()
    );
  };

  return (
    <div
      className="flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 w-full h-full"
      onKeyDown={handleKeyDown}
    >
      {/* Main Content */}
      <div ref={containerRef} className={`flex-1 flex min-h-0 ${isHorizontal ? 'flex-row' : 'flex-col'}`}>
        {/* Editor Panel */}
        <div className={`${isHorizontal ? 'w-1/2 min-h-0 border-r' : 'flex-1 min-h-[120px] border-b'} border-zinc-700/50 flex flex-col`}>
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
              <span className="text-[10px] text-zinc-500 font-mono">main.py</span>
              <span className="text-[9px] text-zinc-600 hidden sm:inline">{isId ? 'Edit kode di sini' : 'Edit code here'}</span>
            </div>
            <div className="flex-1 min-h-0">
              {editorReady ? (
                <Editor
                  key={editorKey}
                  height="100%"
                  language="python"
                  theme="vs-dark"
                  value={code}
                  onChange={(val) => setCode(val || '')}
                  onMount={handleEditorMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 4,
                    wordWrap: 'on',
                    padding: { top: 8 },
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-[#1e1e1e] text-zinc-500 text-xs">
                  {isId ? 'Memuat editor...' : 'Loading editor...'}
                </div>
              )}
            </div>
          </div>

          {/* Output Panel */}
          <div className={`${isHorizontal ? 'w-1/2 min-h-0' : 'flex-1 min-h-[120px]'} flex flex-col bg-[#1a1a1a]`}>
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-500 font-mono">
                  {isId ? 'Hasil' : 'Result'}
                </span>
                {result && (
                  <span className="text-[9px] text-zinc-600">
                    {result.executionTimeMs.toFixed(1)}ms
                    {result.stdout ? ' · ' + (result.stdout.split('\n').length - 1) + (isId ? ' baris' : ' lines') : ''}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
                  title={isId ? 'Reset Kode' : 'Reset Code'}
                >
                  <FontAwesomeIcon icon={faRotateLeft} className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={runPython}
                  disabled={isRunning || isLoading}
                  className="flex items-center gap-1 px-2.5 py-0 rounded-lg bg-[#2E5B44] hover:bg-[#234735] text-white text-[10px] sm:text-xs font-bold transition-all disabled:opacity-50 shadow-xs"
                >
                  {isRunning || isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin className="w-3 h-3 text-white" />
                  ) : (
                    <FontAwesomeIcon icon={faPlay} className="w-3 h-3 text-white" />
                  )}
                  <span className="hidden sm:inline">
                    {isRunning
                      ? (isId ? 'Menjalankan...' : 'Running...')
                      : isLoading
                        ? (isId ? 'Memuat Pyodide...' : 'Loading Pyodide...')
                        : (isId ? 'Jalankan' : 'Run')
                    }
                  </span>
                </button>
              </div>
            </div>
            <div ref={outputRef} className="flex-1 min-h-0 overflow-auto p-3 font-mono text-xs">
              {!result && !isRunning && (
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <FontAwesomeIcon icon={faCircleInfo} className="w-3 h-3" />
                  <span>{isId ? 'Klik "Jalankan" atau tekan Ctrl+Enter untuk mengeksekusi kode Python...' : 'Click "Run" or press Ctrl+Enter to execute Python code...'}</span>
                </div>
              )}

              {(isRunning || isLoading) && (
                <div className="flex items-center gap-2 text-yellow-400 text-xs">
                  <FontAwesomeIcon icon={faSpinner} spin className="w-3 h-3" />
                  <span>{isLoading ? (isId ? 'Memuat runtime Python...' : 'Loading Python runtime...') : (isId ? 'Menjalankan...' : 'Running...')}</span>
                </div>
              )}

              {result && (
                <div className="space-y-2">
                  {result.stdout && (
                    <pre className="text-green-400 whitespace-pre-wrap">{result.stdout}</pre>
                  )}
                  {result.stderr && (
                    <pre className="text-yellow-400 whitespace-pre-wrap">{result.stderr}</pre>
                  )}
                  {result.error && (
                    <div className="bg-red-900/30 border border-red-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 text-[10px] text-red-400 mb-1 font-mono">
                        <span className="text-red-500">✗</span>
                        <span>{isId ? 'Error' : 'Error'}</span>
                      </div>
                      <pre className="text-red-300 text-[11px] font-mono whitespace-pre-wrap">{result.error}</pre>
                    </div>
                  )}
                  {result.image && (
                    <div className="border border-zinc-700/50 rounded-lg overflow-hidden bg-white p-2">
                      <img src={result.image} alt="matplotlib plot" className="max-w-full" />
                    </div>
                  )}
                </div>
              )}

              </div>
        </div>
      </div>
    </div>
  );
};

export default PythonPlayground;
