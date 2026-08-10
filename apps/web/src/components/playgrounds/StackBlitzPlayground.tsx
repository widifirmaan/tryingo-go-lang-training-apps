import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faRotateLeft, faCircleInfo, faClock, faTriangleExclamation, faExternalLinkAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import sdk from '@stackblitz/sdk';
import { Language } from '../../utils/translations';
import {
  buildProject,
  DEFAULT_CODE,
  simulateOutput,
  FRAMEWORK_LABELS,
  FRAMEWORK_LANGUAGES,
  FRAMEWORK_MAIN_FILES,
  FrameworkSlug,
} from '../../utils/stackblitzTemplates';

interface StackBlitzPlaygroundProps {
  lang: Language;
  language?: FrameworkSlug;
  initialCode?: string;
}

export const StackBlitzPlayground: React.FC<StackBlitzPlaygroundProps> = ({ lang, language = 'nodejs', initialCode }) => {
  const isId = lang === 'id';
  const slug = language;
  const [code, setCode] = useState(initialCode || DEFAULT_CODE[slug]);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [editorReady, setEditorReady] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
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
    if (!initialCode) {
      setCode(DEFAULT_CODE[slug]);
      setEditorKey((k) => k + 1);
    }
    setOutput('');
    setError('');
    setIframeUrl(null);
    setShowIframe(false);
  }, [slug, initialCode]);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput('');
    setError('');
    setExecutionTime(null);
    const start = performance.now();
    setTimeout(() => {
      const result = simulateOutput(slug, code);
      const elapsed = performance.now() - start;
      setExecutionTime(elapsed);
      if (result.error) setError(result.error);
      if (result.output) setOutput(result.output);
      setIsRunning(false);
    }, 150 + Math.random() * 200);
  }, [code, slug]);

  const openStackBlitz = useCallback(() => {
    try {
      const project = buildProject(slug, code);
      sdk.openProject({
        title: 'Tryngo - ' + FRAMEWORK_LABELS[slug],
        template: project.template,
        files: project.files,
        dependencies: project.dependencies,
      }, { newWindow: true, openFile: FRAMEWORK_MAIN_FILES[slug], view: 'preview' });
    } catch (e) {
      console.error('Failed to open StackBlitz:', e);
    }
  }, [slug, code]);

  const toggleEmbed = useCallback(() => {
    if (showIframe) { setShowIframe(false); return; }
    try {
      const project = buildProject(slug, code);
      const params = new URLSearchParams();
      params.set('embed', '1');
      params.set('theme', 'dark');
      params.set('hideExplorer', '1');
      params.set('hideNavigation', '1');
      params.set('view', 'preview');
      params.set('initialPath', FRAMEWORK_MAIN_FILES[slug]);
      setIframeUrl('https://stackblitz.com/edit/' + project.template + '?' + params.toString());
      setShowIframe(true);
    } catch (e) {
      console.error('Failed to generate embed:', e);
    }
  }, [slug, code, showIframe]);

  const handleReset = useCallback(() => {
    setCode(initialCode || DEFAULT_CODE[slug]);
    setOutput('');
    setError('');
    setExecutionTime(null);
    setEditorKey((k) => k + 1);
  }, [initialCode, slug]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  };

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.addCommand(2048 | 3001, () => runCode());
  };

  const monacoLang = FRAMEWORK_LANGUAGES[slug];
  const mainFile = FRAMEWORK_MAIN_FILES[slug];

  return (
    <div
      className="flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 w-full h-full"
      onKeyDown={handleKeyDown}
    >
      <div className="flex-1 flex min-h-0 flex-row">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 min-h-0 flex flex-col border-b border-zinc-700/50">
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
              <span className="text-[10px] text-zinc-500 font-mono">{mainFile}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleEmbed}
                  className={`p-1.5 rounded-lg transition-colors ${showIframe ? 'bg-[#2E5B44] text-white' : 'hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200'}`}
                  title={isId ? 'Tampilkan/Sembunyikan StackBlitz' : 'Toggle StackBlitz'}
                >
                  <FontAwesomeIcon icon={faUpload} className="w-3 h-3" />
                </button>
                <button
                  onClick={openStackBlitz}
                  className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
                  title={isId ? 'Buka di StackBlitz' : 'Open in StackBlitz'}
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
                  title={isId ? 'Reset Kode' : 'Reset Code'}
                >
                  <FontAwesomeIcon icon={faRotateLeft} className="w-3 h-3" />
                </button>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center gap-1 px-2.5 py-0 rounded-lg bg-[#2E5B44] hover:bg-[#234735] text-white text-[10px] sm:text-xs font-bold transition-all disabled:opacity-50"
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
            <div className="flex-1 min-h-0">
              {editorReady ? (
                <Editor
                  key={editorKey}
                  height="100%"
                  language={monacoLang}
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

          <div className="flex-1 min-h-0 flex flex-col bg-[#1a1a1a]">
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
              <span className="text-[10px] text-zinc-500 font-mono">
                {isId ? 'Output' : 'Output'}
              </span>
              {executionTime !== null && (
                <span className="text-[9px] text-zinc-600 flex items-center gap-1">
                  <FontAwesomeIcon icon={faClock} className="w-2.5 h-2.5" />
                  {executionTime.toFixed(2)}ms
                </span>
              )}
            </div>
            <div className="flex-1 min-h-0 overflow-auto p-3 font-mono text-xs">
              {error ? (
                <div className="bg-red-900/30 border border-red-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-red-400 mb-1">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="w-3 h-3" />
                    <span>{isId ? 'Error' : 'Error'}</span>
                  </div>
                  <pre className="text-red-300 text-[11px] whitespace-pre-wrap">{error}</pre>
                </div>
              ) : output ? (
                <pre className="text-zinc-200 whitespace-pre-wrap text-[11px]">{output}</pre>
              ) : (
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <FontAwesomeIcon icon={faCircleInfo} className="w-3 h-3" />
                  <span>
                    {isId
                      ? 'Klik "Jalankan" atau tekan Ctrl+Enter untuk mensimulasikan ' + FRAMEWORK_LABELS[slug] + '...'
                      : 'Click "Run" or press Ctrl+Enter to simulate ' + FRAMEWORK_LABELS[slug] + '...'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {showIframe && iframeUrl && (
          <div className="w-1/2 min-h-0 flex flex-col border-l border-zinc-700/50">
            <div className="flex items-center justify-between px-3 py-1 bg-[#252526] border-b border-zinc-800 shrink-0">
              <span className="text-[10px] text-zinc-500 font-mono">
                {isId ? 'StackBlitz IDE' : 'StackBlitz IDE'}
              </span>
              <button
                onClick={() => setShowIframe(false)}
                className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {isId ? 'Tutup' : 'Close'}
              </button>
            </div>
            <div className="flex-1 min-h-0 bg-[#1e1e1e]">
              <iframe
                src={iframeUrl}
                className="w-full h-full border-0"
                title="StackBlitz"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>

      <div className="px-3 sm:px-4 py-1.5 bg-[#252526] border-t border-zinc-700/50 text-[10px] text-zinc-500 flex items-center justify-between shrink-0">
        <span>
          {isId
            ? FRAMEWORK_LABELS[slug] + ' Playground - Simulasi + StackBlitz - Ctrl+Enter untuk menjalankan'
            : FRAMEWORK_LABELS[slug] + ' Playground - Simulation + StackBlitz - Ctrl+Enter to run'}
        </span>
        <span className="text-zinc-600">{monacoLang}</span>
      </div>
    </div>
  );
};

export default StackBlitzPlayground;
