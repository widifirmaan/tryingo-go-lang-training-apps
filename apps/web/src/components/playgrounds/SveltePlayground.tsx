import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faRotateLeft, faCircleInfo, faTriangleExclamation, faClock } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../../utils/translations';

interface SveltePlaygroundProps {
  lang: Language;
  initialCode?: string;
  inline?: boolean;
}

const DEFAULT_SVELTE = `<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>

<div style="font-family: system-ui; padding: 20px">
  <h1>Hello Svelte! 🚀</h1>
  <p>Count: {count}</p>
  <p>Doubled: {doubled}</p>
  <button onclick={() => count++}>Increment</button>
</div>
`;

const SVELTE_CDN = 'https://cdn.jsdelivr.net/npm/svelte@5.56.8';

interface SvelteCompiler {
  compile: (source: string, options?: Record<string, unknown>) => {
    js: { code: string };
    warnings: Array<{ message: string }>;
  };
}

let svelteCompilerPromise: Promise<SvelteCompiler> | null = null;

async function loadSvelteCompiler(): Promise<SvelteCompiler> {
  if (svelteCompilerPromise) return svelteCompilerPromise;

  const compilerUrl = `${SVELTE_CDN}/compiler/+esm`;
  svelteCompilerPromise = import(/* @vite-ignore */ compilerUrl).then(
    (mod) => mod as unknown as SvelteCompiler
  );

  try {
    return await svelteCompilerPromise;
  } catch (err) {
    svelteCompilerPromise = null;
    throw err;
  }
}

export const SveltePlayground: React.FC<SveltePlaygroundProps> = ({ lang, initialCode, inline }) => {
  const isId = lang === 'id';
  const [code, setCode] = useState(initialCode || DEFAULT_SVELTE);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [compilerStatus, setCompilerStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [editorReady, setEditorReady] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const prevInitialCode = useRef(initialCode);
  const [editorKey, setEditorKey] = useState(0);
  const isRunningRef = useRef(false);
  const runIdRef = useRef(0);
  const mountedRef = useRef(true);
  const runRef = useRef<() => void>(() => {});

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
    loadSvelteCompiler()
      .then(() => {
        if (mountedRef.current) setCompilerStatus('ready');
      })
      .catch(() => {
        if (mountedRef.current) setCompilerStatus('error');
      });
  }, []);

  useEffect(() => {
    if (!initialCode) return;
    if (prevInitialCode.current === initialCode) return;
    prevInitialCode.current = initialCode;
    runIdRef.current++;
    isRunningRef.current = false;
    setIsRunning(false);
    setCode(initialCode);
    setOutput('');
    setError('');
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  const compileAndRun = useCallback(async () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    const runId = ++runIdRef.current;
    setIsRunning(true);
    setOutput('');
    setError('');
    setExecutionTime(null);

    const start = performance.now();

    try {
      const compiler = await loadSvelteCompiler();
      if (!mountedRef.current || runIdRef.current !== runId) return;

      let compiled;
      try {
        compiled = compiler.compile(code, {
          generate: 'client',
          name: 'App',
          dev: false,
        });
      } catch (err: any) {
        const elapsed = performance.now() - start;
        setExecutionTime(elapsed);
        setError(err.message || (isId ? 'Kompilasi gagal' : 'Compilation failed'));
        isRunningRef.current = false;
        setIsRunning(false);
        return;
      }

      const warnings = compiled.warnings || [];
      const warningsText = warnings.length > 0
        ? warnings.map((w: any) => `⚠ ${w.message}`).join('\n')
        : '';

      const jsCode = compiled.js.code;

      const iframe = iframeRef.current;
      if (!iframe) {
        setError(isId ? 'Preview tidak tersedia' : 'Preview not available');
        isRunningRef.current = false;
        setIsRunning(false);
        return;
      }

      const moduleCode = (jsCode
        .replace(/export default /, '')
        .replace(/import\s+["']svelte\/internal\/disclose-version["']/g, `import "${SVELTE_CDN}/internal/disclose-version/+esm"`)
        .replace(/import\s+["']svelte\/internal\/flags\/legacy["']/g, `import "${SVELTE_CDN}/internal/flags/legacy/+esm"`)
        .replace(/from\s+["']svelte\/internal\/client["']/g, `from "${SVELTE_CDN}/internal/client/+esm"`)
        .replace(/from\s+["']svelte["']/g, `from "${SVELTE_CDN}/+esm"`))
        .replace(/<\/script/gi, '<\\/script');

      const htmlContent = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #1a1a1a;
    }
    * { box-sizing: border-box; }
  </style>
</head>
<body>
  <div id="svelte-app"></div>
  <script type="module">
    import { mount } from '${SVELTE_CDN}/+esm';

    const __runId = ${runId};
    const _origLog = console.log;
    const _origError = console.error;
    const _origWarn = console.warn;
    const _logs = [];

    console.log = function(...args) {
      const line = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      _logs.push(line);
      window.parent.postMessage({ type: 'console', runId: __runId, level: 'log', message: line }, '*');
      _origLog.apply(console, args);
    };
    console.error = function(...args) {
      const line = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      _logs.push('Error: ' + line);
      window.parent.postMessage({ type: 'console', runId: __runId, level: 'error', message: line }, '*');
      _origError.apply(console, args);
    };
    console.warn = function(...args) {
      const line = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      _logs.push('Warning: ' + line);
      window.parent.postMessage({ type: 'console', runId: __runId, level: 'warn', message: line }, '*');
      _origWarn.apply(console, args);
    };

    window.onerror = function(msg, url, line, col, err) {
      window.parent.postMessage({ type: 'console', runId: __runId, level: 'error', message: msg + ' (line ' + line + ')' }, '*');
      return false;
    };

    ${moduleCode}

    try {
      const target = document.getElementById('svelte-app');
      mount(App, { target });
    } catch (err) {
      window.parent.postMessage({ type: 'console', runId: __runId, level: 'error', message: err.message }, '*');
    }
  </script>
</body>
</html>`;

      iframe.srcdoc = htmlContent;

      const elapsed = performance.now() - start;
      if (!mountedRef.current || runIdRef.current !== runId) return;
      setExecutionTime(elapsed);

      if (warningsText) {
        setOutput(warningsText);
      }
    } catch (err: any) {
      const elapsed = performance.now() - start;
      if (!mountedRef.current || runIdRef.current !== runId) return;
      setExecutionTime(elapsed);
      setError(err.message || (isId ? 'Eksekusi gagal' : 'Execution failed'));
    }

    if (mountedRef.current && runIdRef.current === runId) {
      isRunningRef.current = false;
      setIsRunning(false);
    }
  }, [code, isId, lang]);

  runRef.current = compileAndRun;

  const handleReset = useCallback(() => {
    runIdRef.current++;
    isRunningRef.current = false;
    setIsRunning(false);
    setCode(initialCode || DEFAULT_SVELTE);
    setOutput('');
    setError('');
    setExecutionTime(null);
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (editorRef.current?.hasTextFocus()) {
        return; // Monaco command handles it
      }
      compileAndRun();
    }
  };

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.addCommand(
      2048 | 3,
      () => runRef.current()
    );
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type === 'console') {
        if (event.data.runId !== undefined && event.data.runId !== runIdRef.current) return;
        const prefix = event.data.level === 'error' ? 'Error: ' : event.data.level === 'warn' ? 'Warning: ' : '';
        setOutput((prev) => (prev ? prev + '\n' : '') + prefix + event.data.message);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div
      className={`flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 ${
        inline ? 'w-full h-full' : 'w-full h-full'
      }`}
      onKeyDown={handleKeyDown}
    >
      {/* Main Content */}
      <div className="flex-1 flex min-h-0 flex-row">
        {/* Editor + Output */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Editor Panel */}
          <div className="flex-1 min-h-0 flex flex-col border-b border-zinc-700/50">
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
              <span className="text-[10px] text-zinc-500 font-mono">App.svelte</span>
              <span className="text-[9px] text-zinc-600 hidden sm:inline">{isId ? 'Edit kode di sini' : 'Edit code here'}</span>
            </div>
            <div className="flex-1 min-h-0">
              {editorReady ? (
                <Editor
                  key={editorKey}
                  height="100%"
                  language="html"
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

          {/* Output Panel */}
          <div className="flex-1 min-h-0 flex flex-col bg-[#1a1a1a]">
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-500 font-mono">
                  {isId ? 'Hasil' : 'Result'}
                </span>
                {executionTime !== null && (
                  <span className="text-[9px] text-zinc-600 flex items-center gap-1">
                    <FontAwesomeIcon icon={faClock} className="w-2.5 h-2.5" />
                    {executionTime.toFixed(2)}ms
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
                  onClick={compileAndRun}
                  disabled={isRunning || compilerStatus !== 'ready'}
                  className="flex items-center gap-1 px-2.5 py-0 rounded-lg bg-[#2E5B44] hover:bg-[#234735] text-white text-[10px] sm:text-xs font-bold transition-all disabled:opacity-50 shadow-xs"
                >
                  {isRunning ? (
                    <FontAwesomeIcon icon={faSpinner} spin className="w-3 h-3 text-white" />
                  ) : (
                    <FontAwesomeIcon icon={faPlay} className="w-3 h-3 text-white" />
                  )}
                  <span className="hidden sm:inline">
                    {isRunning ? (isId ? 'Menjalankan...' : 'Running...') : (isId ? 'Jalankan' : 'Run')}
                  </span>
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-auto p-3 font-mono text-xs">
              {error ? (
                <div className="bg-red-900/30 border border-red-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-red-400 mb-1">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="w-3 h-3" />
                    <span>{isId ? 'Error Kompilasi' : 'Compilation Error'}</span>
                  </div>
                  <pre className="text-red-300 text-[11px] whitespace-pre-wrap">{error}</pre>
                </div>
              ) : output ? (
                <pre className="text-yellow-300 whitespace-pre-wrap text-[11px]">{output}</pre>
              ) : (
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  {compilerStatus === 'error' ? (
                    <FontAwesomeIcon icon={faTriangleExclamation} className="w-3 h-3 text-red-400" />
                  ) : (
                    <FontAwesomeIcon icon={faCircleInfo} className="w-3 h-3" />
                  )}
                  <span className={compilerStatus === 'error' ? 'text-red-400' : ''}>
                    {compilerStatus === 'error'
                      ? (isId
                        ? 'Gagal memuat compiler Svelte. Periksa koneksi internet lalu muat ulang.'
                        : 'Failed to load Svelte compiler. Check your internet connection and reload.')
                      : (isId
                        ? 'Klik "Jalankan" atau tekan Ctrl+Enter untuk mengkompilasi Svelte...'
                        : 'Click "Run" or press Ctrl+Enter to compile Svelte...')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 min-h-0 flex flex-col border-l border-zinc-700/50 bg-white">
          <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
            <span className="text-[10px] text-zinc-500 font-mono">
              {isId ? 'Preview' : 'Preview'}
            </span>
          </div>
          <div className="flex-1 min-h-0 relative">
            <iframe
              ref={iframeRef}
              title="Svelte Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-modals"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SveltePlayground;
