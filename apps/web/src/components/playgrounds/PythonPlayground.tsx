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
  const [inputMode, setInputMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputPrompt, setInputPrompt] = useState('');
  const inputResolverRef = useRef<((value: string) => void) | null>(null);
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const prevInitialCode = useRef(initialCode);
  const [editorKey, setEditorKey] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setEditorReady(true));
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
    setIsRunning(true);
    setResult(null);

    const start = performance.now();

    try {
      const pyodide = await getPyodide();

      const stdoutLines: string[] = [];
      const stderrLines: string[] = [];
      let plotImage: string | undefined;

      pyodide.setStdout({
        batched: (text: string) => { stdoutLines.push(text); },
      });

      pyodide.setStderr({
        batched: (text: string) => { stderrLines.push(text); },
      });

      await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

      try {
        await pyodide.runPythonAsync(code);

        const plotResult = await pyodide.runPythonAsync(`
import matplotlib
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
`);

        if (plotResult && typeof plotResult === 'string' && plotResult.length > 0) {
          plotImage = `data:image/png;base64,${plotResult}`;
        }

        const stdoutResult = await pyodide.runPythonAsync('sys.stdout.getvalue()');
        const stderrResult = await pyodide.runPythonAsync('sys.stderr.getvalue()');

        const executionTimeMs = performance.now() - start;

        setResult({
          stdout: stdoutResult || '',
          stderr: stderrResult || '',
          error: '',
          executionTimeMs,
          image: plotImage,
        });
      } catch (err: any) {
        const executionTimeMs = performance.now() - start;
        const errorMsg = err.message || String(err);

        setResult({
          stdout: stdoutLines.join(''),
          stderr: stderrLines.join(''),
          error: errorMsg,
          executionTimeMs,
        });
      }
    } catch (err: any) {
      const executionTimeMs = performance.now() - start;
      const errorMsg = err instanceof Error
        ? (isId ? `Gagal memuat Pyodide: ${err.message}\nPastikan koneksi internet tersedia.` : `Failed to load Pyodide: ${err.message}\nMake sure internet connection is available.`)
        : (isId ? 'Gagal memuat Pyodide' : 'Failed to load Pyodide');

      setResult({
        stdout: '',
        stderr: '',
        error: errorMsg,
        executionTimeMs,
      });
    }

    setIsRunning(false);
  }, [code, isId]);

  const handleReset = useCallback(() => {
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
      2048 | 3001,
      () => runPython()
    );
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputResolverRef.current) {
      inputResolverRef.current(inputValue);
      inputResolverRef.current = null;
    }
    setInputMode(false);
    setInputValue('');
    setInputPrompt('');
  };

  const requestInput = useCallback((prompt: string): Promise<string> => {
    return new Promise((resolve) => {
      setInputPrompt(prompt);
      setInputMode(true);
      setInputValue('');
      inputResolverRef.current = resolve;
    });
  }, []);

  return (
    <div
      className="flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 w-full h-full"
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#252526] border-b border-zinc-700/50 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-zinc-400 font-medium ml-2 hidden sm:inline">
            {isId ? '🐍 Python Playground — Pyodide WASM di browser' : '🐍 Python Playground — Pyodide WASM in browser'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            title={isId ? 'Reset Kode' : 'Reset Code'}
          >
            <FontAwesomeIcon icon={faRotateLeft} className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div ref={containerRef} className={`flex-1 flex min-h-0 ${isHorizontal ? 'flex-row' : 'flex-col'}`}>
        {/* Editor Panel */}
        <div className={`${isHorizontal ? 'w-1/2 min-h-0 border-r' : 'flex-1 min-h-[120px] border-b'} border-zinc-700/50 flex flex-col`}>
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
              <span className="text-[10px] text-zinc-500 font-mono">main.py</span>
              <button
                onClick={runPython}
                disabled={isRunning || isLoading}
                className="flex items-center gap-1 px-2.5 py-0 rounded-lg bg-[#2E5B44] hover:bg-[#234735] text-white text-[10px] sm:text-xs font-bold transition-all disabled:opacity-50"
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
              <span className="text-[10px] text-zinc-500 font-mono">
                {isId ? 'Output' : 'Output'}
                {result && (
                  <span className="ml-2 text-zinc-600">
                    ({result.executionTimeMs.toFixed(1)}ms)
                  </span>
                )}
              </span>
              {result && result.stdout && (
                <span className="text-[9px] text-zinc-600">
                  {result.stdout.split('\n').length - 1} {isId ? 'baris' : 'lines'}
                </span>
              )}
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

              {/* Input prompt for input() */}
              {inputMode && (
                <form onSubmit={handleInputSubmit} className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-400">{inputPrompt}</span>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                    className="flex-1 bg-[#252526] border border-zinc-700 rounded px-2 py-1 text-zinc-200 text-xs font-mono focus:outline-none focus:border-[#2E5B44]"
                    placeholder={isId ? 'Masukkan input...' : 'Enter input...'}
                  />
                  <button
                    type="submit"
                    className="px-2 py-1 bg-[#2E5B44] text-white text-[10px] rounded hover:bg-[#234735] transition-colors"
                  >
                    Enter
                  </button>
                </form>
              )}
            </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 sm:px-4 py-1.5 bg-[#252526] border-t border-zinc-700/50 text-[10px] text-zinc-500 flex items-center justify-between shrink-0">
        <span>
          {isId ? 'Pyodide WASM — Python 3.11 di browser — Ctrl+Enter untuk menjalankan' : 'Pyodide WASM — Python 3.11 in browser — Ctrl+Enter to run'}
        </span>
        <span className="text-zinc-600">
          {isId ? 'math · random · json · datetime · collections · itertools · matplotlib' : 'math · random · json · datetime · collections · itertools · matplotlib'}
        </span>
      </div>
    </div>
  );
};

export default PythonPlayground;
