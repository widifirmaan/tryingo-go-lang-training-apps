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

declare global {
  interface Window {
    loadPyodide?: (config?: { indexURL?: string }) => Promise<any>;
  }
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

let pyodideInstance: any = null;
let pyodideLoadPromise: Promise<any> | null = null;

const PREP_CODE = `import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
try:
    import matplotlib.pyplot as plt
    plt.close('all')
except Exception:
    pass
`;

const PLOT_CAPTURE_CODE = `import matplotlib
matplotlib.use('AGG')
import matplotlib.pyplot as plt
import io
import base64

buf = io.BytesIO()
try:
    plt.savefig(buf, format='png', dpi=100, bbox_inches='tight')
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    plt.close('all')
    img_base64
except Exception as e:
    plt.close('all')
    ''
`;

async function getPyodide(): Promise<any> {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoadPromise) return pyodideLoadPromise;

  pyodideLoadPromise = (async () => {
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide script from CDN'));
        document.head.appendChild(script);
      });
    }

    const loadPyodide = window.loadPyodide;
    if (!loadPyodide) {
      throw new Error('Pyodide failed to initialize: loadPyodide not found on window');
    }

    pyodideInstance = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
    });

    await pyodideInstance.loadPackage(['matplotlib']);

    return pyodideInstance;
  })();

  try {
    return await pyodideLoadPromise;
  } catch (err) {
    pyodideLoadPromise = null;
    pyodideInstance = null;
    throw err;
  }
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

    let pyodide: any = null;
    setIsLoading(true);
    try {
      pyodide = await getPyodide();
    } catch (err: any) {
      const errorMsg = err instanceof Error
        ? (isId ? `Gagal memuat Pyodide: ${err.message}\nPastikan koneksi internet tersedia.` : `Failed to load Pyodide: ${err.message}\nMake sure internet connection is available.`)
        : (isId ? 'Gagal memuat Pyodide' : 'Failed to load Pyodide');
      finish({ stdout: '', stderr: '', error: errorMsg, executionTimeMs: performance.now() - start });
      return;
    }
    if (!mountedRef.current || runIdRef.current !== runId) return;
    setIsLoading(false);

    const stdoutLines: string[] = [];
    const stderrLines: string[] = [];

    try {
      pyodide.setStdout({
        batched: (text: string) => { stdoutLines.push(text); },
      });

      pyodide.setStderr({
        batched: (text: string) => { stderrLines.push(text); },
      });

      pyodide.setStdin({
        stdin: () => {
          const value = window.prompt(isId ? 'Masukkan input untuk input():' : 'Enter input for input():', '');
          return value === null ? null : value + '\n';
        },
      });

      await pyodide.runPythonAsync(PREP_CODE);
      await pyodide.runPythonAsync(code);

      const plotResult = await pyodide.runPythonAsync(PLOT_CAPTURE_CODE);

      const stdoutResult = await pyodide.runPythonAsync('sys.stdout.getvalue()');
      const stderrResult = await pyodide.runPythonAsync('sys.stderr.getvalue()');

      finish({
        stdout: stdoutResult || '',
        stderr: stderrResult || '',
        error: '',
        executionTimeMs: performance.now() - start,
        image: plotResult && typeof plotResult === 'string' && plotResult.length > 0
          ? `data:image/png;base64,${plotResult}`
          : undefined,
      });
    } catch (err: any) {
      const errorMsg = err.message || String(err);

      let caughtStdout = stdoutLines.join('');
      let caughtStderr = stderrLines.join('');
      try {
        const so = await pyodide.runPythonAsync('sys.stdout.getvalue()');
        const se = await pyodide.runPythonAsync('sys.stderr.getvalue()');
        if (so) caughtStdout = so;
        if (se) caughtStderr = se;
      } catch {
        // buffers unavailable — keep captured lines
      }

      finish({
        stdout: caughtStdout,
        stderr: caughtStderr,
        error: errorMsg,
        executionTimeMs: performance.now() - start,
      });
    }
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
