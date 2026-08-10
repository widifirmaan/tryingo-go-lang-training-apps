import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faRotateLeft, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../../utils/translations';

interface VuePlaygroundProps {
  lang: Language;
  initialCode?: string;
}

const DEFAULT_VUE = `<script setup>
import { ref } from 'vue'
const count = ref(0)
const message = ref('Hello Vue! 🚀')
</script>

<template>
  <div style="font-family: system-ui; padding: 20px">
    <h1>{{ message }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>
`;

declare global {
  interface Window {
    Vue?: {
      compile: (src: string, options?: any) => { code: string; errors: string[] };
      compileTemplate: (options: any) => { code: string; errors: string[] };
      compileScript: (descriptor: any, options: any) => any;
      parse: (src: string) => any;
    };
  }
}

let vueScriptLoadPromise: Promise<void> | null = null;

async function loadVueRuntime(): Promise<void> {
  if (vueScriptLoadPromise) return vueScriptLoadPromise;

  vueScriptLoadPromise = new Promise<void>(async (resolve, reject) => {
    const loadScript = (src: string): Promise<void> =>
      new Promise((res, rej) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => res();
        script.onerror = () => rej(new Error(`Failed to load: ${src}`));
        document.head.appendChild(script);
      });

    try {
      await loadScript('https://cdn.jsdelivr.net/npm/@vue/compiler-sfc@3.4.21/dist/compiler-sfc.browser.js');
      await loadScript('https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.runtime.esm-browser.js');
      resolve();
    } catch (err) {
      vueScriptLoadPromise = null;
      reject(err);
    }
  });

  return vueScriptLoadPromise;
}

function compileVueSFC(source: string): { jsCode: string; errors: string[] } {
  const errors: string[] = [];

  if (!window.Vue) {
    return { jsCode: '', errors: ['Vue SFC compiler not loaded'] };
  }

  try {
    const { descriptor, parseErrors } = window.Vue.parse(source, { filename: 'component.vue' });

    if (parseErrors.length > 0) {
      errors.push(...parseErrors.map((e: any) => typeof e === 'string' ? e : e.message || JSON.stringify(e)));
    }

    const templateResult = window.Vue.compileTemplate({
      source: descriptor.template?.content || '',
      filename: 'component.vue',
      id: 'vue-sfc',
      compilerOptions: {
        mode: 'module',
      },
    });

    if (templateResult.errors.length > 0) {
      errors.push(...templateResult.errors.map((e: any) => typeof e === 'string' ? e : e.message || JSON.stringify(e)));
    }

    const scriptResult = window.Vue.compileScript(descriptor, {
      id: 'vue-sfc',
      inlineTemplate: true,
      templateOptions: {
        compilerOptions: {
          mode: 'module',
        },
      },
    });

    if (scriptResult.errors.length > 0) {
      errors.push(...scriptResult.errors.map((e: any) => typeof e === 'string' ? e : e.message || JSON.stringify(e)));
    }

    const combinedCode = scriptResult.content + '\n\n' + templateResult.code.replace(
      'export function render',
      'const __render = function render'
    ) + '\n\n__component.render = __render;\nexport default __component;\nexport { __render as render };';

    return { jsCode: combinedCode, errors };
  } catch (err: any) {
    errors.push(err.message || String(err));
    return { jsCode: '', errors };
  }
}

export const VuePlayground: React.FC<VuePlaygroundProps> = ({ lang, initialCode }) => {
  const isId = lang === 'id';
  const [code, setCode] = useState(initialCode || DEFAULT_VUE);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const prevInitialCode = useRef(initialCode);
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => setEditorReady(true));
  }, []);

  useEffect(() => {
    if (!initialCode) return;
    if (prevInitialCode.current === initialCode) return;
    prevInitialCode.current = initialCode;
    setCode(initialCode);
    setOutput('');
    setError('');
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  useEffect(() => {
    setIsLoading(true);
    setStatus('loading');
    loadVueRuntime()
      .then(() => {
        setStatus('ready');
        setIsLoading(false);
      })
      .catch((err) => {
        setStatus('error');
        setIsLoading(false);
        setError(isId ? `Gagal memuat compiler Vue: ${err.message}\nPastikan koneksi internet tersedia.` : `Failed to load Vue compiler: ${err.message}\nMake sure internet connection is available.`);
      });
  }, [isId]);

  const runVue = useCallback(async () => {
    setIsRunning(true);
    setOutput('');
    setError('');

    try {
      await loadVueRuntime();

      if (!window.Vue) {
        setError(isId ? 'Vue compiler tidak tersedia' : 'Vue compiler not available');
        setIsRunning(false);
        return;
      }

      const { jsCode, errors } = compileVueSFC(code);

      if (errors.length > 0) {
        setError(errors.join('\n'));
        setIsRunning(false);
        return;
      }

      const blob = new Blob([jsCode], { type: 'text/javascript' });
      const blobUrl = URL.createObjectURL(blob);

      const logs: string[] = [];
      const iframe = iframeRef.current;

      if (iframe) {
        const iframeContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; font-family: system-ui, sans-serif; }
  </style>
</head>
<body>
  <div id="app"></div>
  <script type="importmap">
    {
      "imports": {
        "vue": "https://cdn.jsdelivr.net/npm/@vue/runtime-dom@3.4.21/dist/runtime-dom.esm-browser.js",
        "@vue/runtime-core": "https://cdn.jsdelivr.net/npm/@vue/runtime-core@3.4.21/dist/runtime-core.esm-browser.js",
        "@vue/runtime-dom": "https://cdn.jsdelivr.net/npm/@vue/runtime-dom@3.4.21/dist/runtime-dom.esm-browser.js",
        "@vue/reactivity": "https://cdn.jsdelivr.net/npm/@vue/reactivity@3.4.21/dist/reactivity.esm-browser.js",
        "@vue/shared": "https://cdn.jsdelivr.net/npm/@vue/shared@3.4.21/dist/shared.esm-browser.js"
      }
    }
  <\/script>
  <script type="module">
    const _logs = [];
    const _origLog = console.log;
    const _origError = console.error;
    const _origWarn = console.warn;

    console.log = function(...args) {
      _logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
      window.parent.postMessage({ type: 'console', level: 'log', args: _logs[_logs.length - 1] }, '*');
      _origLog.apply(console, args);
    };
    console.error = function(...args) {
      _logs.push('Error: ' + args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
      window.parent.postMessage({ type: 'console', level: 'error', args: _logs[_logs.length - 1] }, '*');
      _origError.apply(console, args);
    };
    console.warn = function(...args) {
      _logs.push('Warn: ' + args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
      window.parent.postMessage({ type: 'console', level: 'warn', args: _logs[_logs.length - 1] }, '*');
      _origWarn.apply(console, args);
    };

    window.onerror = function(msg, url, line, col, err) {
      window.parent.postMessage({ type: 'error', args: msg + ' (line ' + line + ':' + col + ')' }, '*');
      return false;
    };

    import('${blobUrl}').then(async (mod) => {
      const { createApp } = await import('https://cdn.jsdelivr.net/npm/@vue/runtime-dom@3.4.21/dist/runtime-dom.esm-browser.js');
      const component = mod.default || mod;
      const app = createApp(component);
      app.config.errorHandler = function(err, vm, info) {
        window.parent.postMessage({ type: 'error', args: 'Vue Error: ' + err.message + ' (' + info + ')' }, '*');
      };
      app.mount('#app');
    }).catch(err => {
      window.parent.postMessage({ type: 'error', args: 'Module Error: ' + err.message }, '*');
    });
  <\/script>
</body>
</html>`;

        const blob2 = new Blob([iframeContent], { type: 'text/html' });
        const iframeUrl = URL.createObjectURL(blob2);
        iframe.src = iframeUrl;
      }
    } catch (err: any) {
      setError(err.message || String(err));
    }

    setIsRunning(false);
  }, [code, isId]);

  const handleReset = useCallback(() => {
    setCode(initialCode || DEFAULT_VUE);
    setOutput('');
    setError('');
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runVue();
    }
  };

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.addCommand(2048 | 3001, () => runVue());
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'console' || event.data?.type === 'error') {
        setOutput((prev) => {
          const prefix = event.data.level === 'error' ? '❌ ' : event.data.level === 'warn' ? '⚠️ ' : '';
          return prev ? prev + '\n' + prefix + event.data.args : prefix + event.data.args;
        });
        if (event.data.type === 'error') {
          setError((prev) => prev ? prev + '\n' + event.data.args : event.data.args);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
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
            {isId ? '💚 Vue Playground — SFC Compiler di Browser' : '💚 Vue Playground — SFC Compiler in Browser'}
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
      <div className="flex-1 flex min-h-0 flex-row">
        {/* Editor + Output */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Editor Panel */}
          <div className="flex-1 min-h-0 flex flex-col border-b border-zinc-700/50">
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
              <span className="text-[10px] text-zinc-500 font-mono">App.vue</span>
              <button
                onClick={runVue}
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
                      ? (isId ? 'Memuat Compiler...' : 'Loading Compiler...')
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
              <span className="text-[10px] text-zinc-500 font-mono">
                {isId ? 'Output' : 'Output'}
                {output && (
                  <span className="ml-2 text-zinc-600">
                    ({output.split('\n').length} {isId ? 'baris' : 'lines'})
                  </span>
                )}
              </span>
              <span className="text-[9px] text-zinc-600">
                {status === 'loading' ? (isId ? 'Memuat Vue...' : 'Loading Vue...') :
                 status === 'ready' ? (isId ? 'Compiler siap' : 'Compiler ready') :
                 status === 'error' ? (isId ? 'Gagal memuat' : 'Load failed') : ''}
              </span>
            </div>
            <div className="flex-1 min-h-0 overflow-auto p-3 font-mono text-xs">
              {!output && !error && !isRunning && (
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <FontAwesomeIcon icon={faCircleInfo} className="w-3 h-3" />
                  <span>{isId ? 'Klik "Jalankan" atau tekan Ctrl+Enter untuk mengeksekusi kode Vue...' : 'Click "Run" or press Ctrl+Enter to execute Vue code...'}</span>
                </div>
              )}

              {(isRunning || isLoading) && !output && (
                <div className="flex items-center gap-2 text-yellow-400 text-xs">
                  <FontAwesomeIcon icon={faSpinner} spin className="w-3 h-3" />
                  <span>{isLoading ? (isId ? 'Memuat runtime Vue...' : 'Loading Vue runtime...') : (isId ? 'Menjalankan...' : 'Running...')}</span>
                </div>
              )}

              {output && (
                <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
              )}

              {error && (
                <div className="bg-red-900/30 border border-red-800/50 rounded-lg p-3 mt-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-red-400 mb-1 font-mono">
                    <span className="text-red-500">✗</span>
                    <span>{isId ? 'Error' : 'Error'}</span>
                  </div>
                  <pre className="text-red-300 text-[11px] font-mono whitespace-pre-wrap">{error}</pre>
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
          <div className="flex-1 min-h-0">
            <iframe
              ref={iframeRef}
              title="Vue Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-modals allow-same-origin"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 sm:px-4 py-1.5 bg-[#252526] border-t border-zinc-700/50 text-[10px] text-zinc-500 flex items-center justify-between shrink-0">
        <span>
          {isId ? 'Vue SFC Compiler — Kompilasi Single-File Component di browser — Ctrl+Enter untuk menjalankan' : 'Vue SFC Compiler — Compile Single-File Components in browser — Ctrl+Enter to run'}
        </span>
        <span className="text-zinc-600">
          {isId ? 'v3.4.21' : 'v3.4.21'}
        </span>
      </div>
    </div>
  );
};

export default VuePlayground;
