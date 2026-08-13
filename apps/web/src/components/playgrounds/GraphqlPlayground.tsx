import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faRotateLeft, faExpand, faCompress, faTimes, faTriangleExclamation, faEye, faEyeSlash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../../utils/translations';
import { runQuery, runIntrospection, getSampleSchema, SAMPLE_QUERIES } from '../../utils/graphqlRunner';

interface GraphqlPlaygroundProps {
  lang: Language;
  initialCode?: string;
  language: string;
  onClose?: () => void;
  inline?: boolean;
  week?: number;
}

const DEFAULT_QUERY = SAMPLE_QUERIES[0].query;

export const GraphqlPlayground: React.FC<GraphqlPlaygroundProps> = ({
  lang,
  initialCode,
  language,
  onClose,
  inline,
}) => {
  const [query, setQuery] = useState(initialCode || DEFAULT_QUERY);
  const [variables, setVariables] = useState('{\n  \n}');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSchema, setShowSchema] = useState(false);
  const [schemaText, setSchemaText] = useState('');
  const [introspectionResult, setIntrospectionResult] = useState('');
  const [showIntrospection, setShowIntrospection] = useState(false);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [showVariables, setShowVariables] = useState(false);
  const [sampleMenuOpen, setSampleMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isId = lang === 'id';

  const [editorReady, setEditorReady] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setEditorReady(true));
  }, []);

  const prevInitialCode = useRef(initialCode);
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    if (!initialCode) return;
    if (prevInitialCode.current === initialCode) return;
    prevInitialCode.current = initialCode;
    setQuery(initialCode);
    setResult('');
    setError('');
    setEditorKey(k => k + 1);
  }, [initialCode]);

  const runGraphQL = useCallback(async () => {
    setIsRunning(true);
    setError('');
    setResult('');
    setShowIntrospection(false);

    try {
      let vars: Record<string, any> | undefined;
      if (variables.trim() && variables.trim() !== '{\n  \n}') {
        try {
          vars = JSON.parse(variables);
        } catch {
          setError(isId ? 'Variables JSON tidak valid. Periksa format JSON.' : 'Invalid JSON variables. Check JSON format.');
          setIsRunning(false);
          return;
        }
      }

      const schema = getSampleSchema();
      const output = await runQuery(schema, query, vars);

      if (output.errors.length > 0 && !output.data) {
        setError(output.errors.join('\n'));
      } else {
        const formatted = JSON.stringify(output.data, null, 2);
        let display = formatted;
        if (output.errors.length > 0) {
          display += '\n\n⚠️ Errors:\n' + output.errors.join('\n');
        }
        setResult(display);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : (isId ? 'Eksekusi gagal' : 'Execution failed'));
    }

    setIsRunning(false);
  }, [query, variables, isId]);

  const handleIntrospection = useCallback(async () => {
    setIsRunning(true);
    setError('');
    setResult('');

    try {
      const schema = getSampleSchema();
      const introResult = await runIntrospection(schema);
      setIntrospectionResult(JSON.stringify(introResult, null, 2));
      setShowIntrospection(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Introspection failed');
    }

    setIsRunning(false);
  }, []);

  const handleViewSchema = useCallback(() => {
    if (!showSchema) {
      setSchemaText(getSampleSchema());
    }
    setShowSchema(!showSchema);
  }, [showSchema]);

  const resetQuery = () => {
    setQuery(DEFAULT_QUERY);
    setVariables('{\n  \n}');
    setResult('');
    setError('');
    setShowIntrospection(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runGraphQL();
    }
  };

  const loadSample = (sample: typeof SAMPLE_QUERIES[0]) => {
    setQuery(sample.query);
    if (sample.variables) {
      setVariables(JSON.stringify(sample.variables, null, 2));
      setShowVariables(true);
    } else {
      setVariables('{\n  \n}');
    }
    setSampleMenuOpen(false);
    setResult('');
    setError('');
  };

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

  const Wrapper = inline ? 'div' : motion.div;
  const wrapperProps = inline ? {} : {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <Wrapper
      {...wrapperProps}
      className={`flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 ${
        inline ? 'w-full h-full' : isFullscreen ? 'fixed inset-4 z-50' : 'w-full h-full'
      }`}
      onKeyDown={handleKeyDown}
    >
      {/* Toolbar */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e1e1e] border-b border-zinc-800 flex-wrap">
        <button
          onClick={runGraphQL}
          disabled={isRunning}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2E5B44] hover:bg-[#234735] text-white text-[10px] sm:text-xs font-bold transition-all disabled:opacity-50 shadow-xs"
        >
          {isRunning ? (
            <FontAwesomeIcon icon={faSpinner} spin className="w-3 h-3 text-white" />
          ) : (
            <FontAwesomeIcon icon={faPlay} className="w-3 h-3 text-white" />
          )}
          <span className="hidden sm:inline">{isRunning ? (isId ? 'Menjalankan...' : 'Running...') : (isId ? 'Jalankan' : 'Run')}</span>
        </button>

        <button
          onClick={handleIntrospection}
          disabled={isRunning}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#3b3b4f] hover:bg-[#4a4a6a] text-zinc-200 text-[10px] font-medium transition-all disabled:opacity-50"
          title={isId ? 'Introspection Query' : 'Introspection Query'}
        >
          <FontAwesomeIcon icon={faEye} className="w-3 h-3" />
          <span className="hidden sm:inline">Introspect</span>
        </button>

        <button
          onClick={handleViewSchema}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#3b3b4f] hover:bg-[#4a4a6a] text-zinc-200 text-[10px] font-medium transition-all"
          title={isId ? 'Lihat Schema' : 'View Schema'}
        >
          {showSchema ? <FontAwesomeIcon icon={faEyeSlash} className="w-3 h-3" /> : <FontAwesomeIcon icon={faEye} className="w-3 h-3" />}
          <span className="hidden sm:inline">Schema</span>
        </button>

        <button
          onClick={() => setShowVariables(!showVariables)}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
            showVariables ? 'bg-[#2E5B44]/30 text-[#7ee787]' : 'bg-[#3b3b4f] hover:bg-[#4a4a6a] text-zinc-200'
          }`}
          title={isId ? 'Variables (JSON)' : 'Variables (JSON)'}
        >
          Vars
        </button>

        {/* Sample queries dropdown */}
        <div className="relative">
          <button
            onClick={() => setSampleMenuOpen(!sampleMenuOpen)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#3b3b4f] hover:bg-[#4a4a6a] text-zinc-200 text-[10px] font-medium transition-all"
          >
            <span className="hidden sm:inline">{isId ? 'Contoh Query' : 'Sample Queries'}</span>
            <span className="sm:hidden">{isId ? 'Contoh' : 'Samples'}</span>
            <FontAwesomeIcon icon={sampleMenuOpen ? faChevronUp : faChevronDown} className="w-2.5 h-2.5" />
          </button>
          {sampleMenuOpen && (
            <div className="absolute top-full left-0 mt-1 bg-[#252526] border border-zinc-700 rounded-lg shadow-xl z-50 w-56 max-h-64 overflow-y-auto">
              {SAMPLE_QUERIES.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => loadSample(sample)}
                  className="block w-full text-left px-3 py-2 text-[11px] text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors border-b border-zinc-800 last:border-0"
                >
                  {sample.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[9px] text-zinc-600 hidden sm:inline">
            {isId ? 'Ctrl+Enter untuk menjalankan' : 'Ctrl+Enter to run'}
          </span>
          <button
            onClick={resetQuery}
            className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            title={isId ? 'Reset Query' : 'Reset Query'}
          >
            <FontAwesomeIcon icon={faRotateLeft} className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors hidden sm:block"
            title={isFullscreen ? (isId ? 'Keluar Layar Penuh' : 'Exit Fullscreen') : (isId ? 'Layar Penuh' : 'Fullscreen')}
          >
            {isFullscreen ? <FontAwesomeIcon icon={faCompress} className="w-3.5 h-3.5" /> : <FontAwesomeIcon icon={faExpand} className="w-3.5 h-3.5" />}
          </button>
          {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
            title={isId ? 'Tutup' : 'Close'}
          >
            <FontAwesomeIcon icon={faTimes} className="w-3.5 h-3.5" />
          </button>
          )}        </div>
      </div>

      {/* Schema Panel (collapsible) */}
      {showSchema && (
        <div className="border-b border-zinc-800 bg-[#1e1e1e]">
          <div className="flex items-center justify-between px-3 py-1 bg-[#252526] border-b border-zinc-800">
            <span className="text-[10px] text-zinc-400 font-mono">Schema (SDL)</span>
            <button
              onClick={() => setShowSchema(false)}
              className="text-zinc-500 hover:text-zinc-300 text-[10px]"
            >
              <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
            </button>
          </div>
          <pre className="p-3 text-[11px] text-[#7ee787] font-mono overflow-auto max-h-48 whitespace-pre-wrap leading-relaxed">
            {schemaText}
          </pre>
        </div>
      )}

      {/* Main Content */}
      <div ref={containerRef} className={`flex-1 flex min-h-0 ${isHorizontal ? 'flex-row' : 'flex-col'}`}>
        {/* Query Editor Panel */}
        <div className={`${isHorizontal ? 'w-1/2 min-h-0 border-r' : 'flex-1 min-h-[120px] border-b'} border-zinc-700/50 flex flex-col`}>
          <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800">
            <span className="text-[10px] text-zinc-500 font-mono">query.graphql</span>
          </div>
          <div className="flex-1 min-h-0">
            {editorReady ? (
              <Editor
                key={editorKey}
                height="100%"
                language="graphql"
                theme="vs-dark"
                value={query}
                onChange={(val) => setQuery(val || '')}
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

          {/* Variables Panel */}
          {showVariables && (
            <div className="border-t border-zinc-800 bg-[#1e1e1e]">
              <div className="flex items-center justify-between px-3 py-1 bg-[#252526] border-b border-zinc-800">
                <span className="text-[10px] text-zinc-400 font-mono">Variables (JSON)</span>
                <button
                  onClick={() => setShowVariables(false)}
                  className="text-zinc-500 hover:text-zinc-300 text-[10px]"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                </button>
              </div>
              <div className="h-32">
                {editorReady ? (
                  <Editor
                    height="100%"
                    language="json"
                    theme="vs-dark"
                    value={variables}
                    onChange={(val) => setVariables(val || '')}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 12,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: 'on',
                      padding: { top: 4 },
                    }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-zinc-500 text-xs">
                    ...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Result Panel */}
        <div className={`${isHorizontal ? 'w-1/2 min-h-0' : 'flex-1 min-h-[120px]'} flex flex-col bg-white dark:bg-zinc-900`}>
          <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800">
            <span className="text-[10px] text-zinc-500 font-mono">
              {showIntrospection ? 'Introspection' : (isId ? 'Hasil' : 'Result')}
            </span>
            <div className="flex items-center gap-2">
              {result && (
                <span className="text-[9px] text-zinc-600">
                  {isId ? 'JSON' : 'JSON'}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 min-h-0 relative">
            <div className="p-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap overflow-auto h-full">
              {showIntrospection ? (
                introspectionResult ? (
                  <span className="text-[#7ee787]">{introspectionResult}</span>
                ) : (
                  <span className="text-zinc-400 italic">
                    {isId ? 'Klik "Introspect" untuk melihat skema...' : 'Click "Introspect" to view schema...'}
                  </span>
                )
              ) : result ? (
                <span className={error ? 'text-red-400' : 'text-[#7ee787]'}>{result}</span>
              ) : (
                <span className="text-zinc-400 italic">
                  {isId ? 'Klik "Jalankan" untuk mengeksekusi query...' : 'Click "Run" to execute query...'}
                </span>
              )}
            </div>

            {/* Error overlay */}
            {error && (
              <div className="absolute bottom-0 left-0 right-0 bg-red-900/90 text-red-200 p-3 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 text-[10px] text-red-300 mb-1">
                  <FontAwesomeIcon icon={faTriangleExclamation} className="w-3 h-3" />
                  <span>{isId ? 'Error' : 'Error'}</span>
                </div>
                <pre className="whitespace-pre-wrap">{error}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default GraphqlPlayground;
