import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faRotateLeft, faCircleInfo, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../../utils/translations';

interface ReactPlaygroundProps {
  lang: Language;
  initialCode?: string;
}

const DEFAULT_JSX = `function App() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ fontFamily: 'system-ui', padding: 20 }}>
      <h1>Hello React! 🚀</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
`;

declare global {
  interface Window {
    esbuild?: {
      transform: (code: string, options?: any) => Promise<{ code: string; warnings: any[] }>;
      initialize: (options: { wasmModule?: any; worker?: boolean }) => Promise<void>;
    };
  }
}

let esbuildLoaded = false;
let esbuildLoadPromise: Promise<void> | null = null;

async function loadEsbuild(): Promise<void> {
  if (esbuildLoaded) return;
  if (esbuildLoadPromise) return esbuildLoadPromise;

  esbuildLoadPromise = (async () => {
    if (!window.esbuild) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/esbuild-wasm@0.21.5/lib/browser.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load esbuild browser script from CDN'));
        document.head.appendChild(script);
      });
    }

    if (!window.esbuild) {
      throw new Error('esbuild failed to initialize');
    }

    const wasmResponse = await fetch('https://cdn.jsdelivr.net/npm/esbuild-wasm@0.21.5/esbuild.wasm');
    const wasmBinary = await wasmResponse.arrayBuffer();

    await window.esbuild.initialize({
      wasmModule: await WebAssembly.compile(wasmBinary),
      worker: false,
    });

    esbuildLoaded = true;
  })();

  try {
    return await esbuildLoadPromise;
  } catch (err) {
    esbuildLoadPromise = null;
    throw err;
  }
}

export const ReactPlayground: React.FC<ReactPlaygroundProps> = ({ lang, initialCode }) => {
  const isId = lang === 'id';
  const [code, setCode] = useState(initialCode || DEFAULT_JSX);
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [compileStatus, setCompileStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const prevInitialCode = useRef(initialCode);
  const [editorKey, setEditorKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => setEditorReady(true));
  }, []);

  useEffect(() => {
    if (!initialCode) return;
    if (prevInitialCode.current === initialCode) return;
    prevInitialCode.current = initialCode;
    setCode(initialCode);
    setError('');
    setCompileStatus('idle');
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setError('');
    setCompileStatus('idle');

    try {
      await loadEsbuild();
      setIsLoading(false);

      const wrappedCode = code;

      const result = await window.esbuild!.transform(wrappedCode, {
        loader: 'jsx',
        jsx: 'automatic',
        format: 'iife',
        target: 'es2020',
      });

      if (result.warnings.length > 0) {
        console.warn('esbuild warnings:', result.warnings);
      }

      const iframe = iframeRef.current;
      if (!iframe) {
        setIsRunning(false);
        return;
      }

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        setIsRunning(false);
        return;
      }

      const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; background: #ffffff; color: #18181b; font-family: system-ui, -apple-system, sans-serif; }
    #root { min-height: 100vh; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"><\/script>
  <script>
    const _logs = [];
    const _origLog = console.log;
    const _origError = console.error;
    console.log = function(...args) {
      _logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
      window.parent.postMessage({ type: 'console', data: _logs.join('\\n') }, '*');
      _origLog.apply(console, args);
    };
    console.error = function(...args) {
      _logs.push('Error: ' + args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
      window.parent.postMessage({ type: 'console', data: _logs.join('\\n') }, '*');
      _origError.apply(console, args);
    };
    window.onerror = function(msg, url, line, col, err) {
      window.parent.postMessage({ type: 'runtime-error', data: msg + ' (line ' + line + ':' + col + ')' }, '*');
      return false;
    };
  <\/script>
  <script>
    try {
      ${result.code}
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(React.createElement(App));
    } catch (err) {
      window.parent.postMessage({ type: 'runtime-error', data: err.message || String(err) }, '*');
    }
  <\/script>
</body>
</html>`;

      iframeDoc.open();
      iframeDoc.write(html);
      iframeDoc.close();

      setCompileStatus('success');
    } catch (err: any) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(errorMsg);
      setCompileStatus('error');
    }

    setIsRunning(false);
  }, [code, lang]);

  const handleReset = useCallback(() => {
    setCode(initialCode || DEFAULT_JSX);
    setError('');
    setCompileStatus('idle');
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  };

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.addCommand(
      2048 | 3001,
      () => runCode()
    );
  };

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'console') {
        if (event.data.data) {
          setCompileStatus('success');
        }
      }
      if (event.data?.type === 'runtime-error') {
        setError(event.data.data);
        setCompileStatus('error');
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      runCode();
    }, 800);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [runCode]);

  useEffect(() => {
    setIsLoading(true);
    loadEsbuild().then(() => {
      setIsLoading(false);
      runCode();
    }).catch((err: any) => {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : (isId ? 'Gagal memuat compiler React (esbuild). Periksa koneksi internet.' : 'Failed to load React compiler (esbuild). Check your internet connection.'));
      setCompileStatus('error');
    });
  }, []);

  return (
    <div
      className="flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 w-full h-full"
      onKeyDown={handleKeyDown}
    >
      {/* Main Content */}
      <div className="flex-1 flex min-h-0 flex-row">
        {/* Editor + Preview */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          {/* Editor Panel */}
          <div className="flex-1 min-h-0 flex flex-col border-b md:border-b-0 md:border-r border-zinc-700/50">
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
              <span className="text-[10px] text-zinc-500 font-mono">App.jsx</span>
              <span className="text-[9px] text-zinc-600 hidden sm:inline">{isId ? 'Edit kode di sini' : 'Edit code here'}</span>
            </div>
            <div className="flex-1 min-h-0">
              {editorReady ? (
                <Editor
                  key={editorKey}
                  height="100%"
                  language="javascript"
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
                    tabSize: 2,
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

          {/* Preview Panel */}
          <div className="flex-1 min-h-0 flex flex-col bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-500 font-mono">
                  {isId ? 'Preview' : 'Preview'}
                </span>
                {compileStatus === 'success' && (
                  <span className="text-[10px] text-green-400 font-mono">✓</span>
                )}
                {compileStatus === 'error' && (
                  <span className="text-[10px] text-red-400 font-mono">✗</span>
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
                  onClick={runCode}
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
                        ? (isId ? 'Memuat esbuild...' : 'Loading esbuild...')
                        : (isId ? 'Jalankan' : 'Run')
                    }
                  </span>
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-0 relative">
              <iframe
                ref={iframeRef}
                title="react-preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-modals"
              />

              {/* Error Overlay */}
              {error && (
                <div className="absolute bottom-0 left-0 right-0 bg-red-900/90 text-red-200 p-3 font-mono text-[11px] max-h-[50%] overflow-auto">
                  <div className="flex items-center gap-1.5 text-[10px] text-red-300 mb-1">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="w-3 h-3" />
                    <span>{isId ? 'Error' : 'Error'}</span>
                  </div>
                  <pre className="whitespace-pre-wrap">{error}</pre>
                </div>
              )}

              {/* Idle State */}
              {!error && !isRunning && compileStatus === 'idle' && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-zinc-900/80">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <FontAwesomeIcon icon={faCircleInfo} className="w-3 h-3" />
                    <span>{isId ? 'Kode akan otomatis dijalankan...' : 'Code will auto-run...'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactPlayground;
