import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faRotateLeft, faCircleInfo, faClock, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../../utils/translations';
import { executePhp } from '../../utils/phpEngine';

interface PhpPlaygroundProps {
  lang: Language;
  initialCode?: string;
}

const DEFAULT_PHP = `<?php
// Tryngo PHP Playground — PHP di browser via php-wasm

$nama = "Tryngo";
$tahun = 2026;

echo "Selamat datang di $nama!\\n";
echo "Tahun: " . $tahun . "\\n";

// Array
$buah = ["Apel", "Mangga", "Jeruk"];
foreach ($buah as $b) {
    echo "- $b\\n";
}

// Fungsi
function tambah($a, $b) {
    return $a + $b;
}

echo "5 + 3 = " . tambah(5, 3) . "\\n";
?>
`;

export const PhpPlayground: React.FC<PhpPlaygroundProps> = ({ lang, initialCode }) => {
  const isId = lang === 'id';
  const [code, setCode] = useState(initialCode || DEFAULT_PHP);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [engineStatus, setEngineStatus] = useState<'loading' | 'ready' | 'fallback' | 'error'>('loading');
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const prevInitialCode = useRef(initialCode);
  const [editorKey, setEditorKey] = useState(0);
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
    setOutput('');
    setError('');
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  useEffect(() => {
    const initEngine = async () => {
      try {
        const status = await executePhp('');
        if (status.engine) {
          setEngineStatus('ready');
        } else {
          setEngineStatus('fallback');
        }
      } catch {
        setEngineStatus('fallback');
      }
    };
    initEngine();
  }, []);

  const runPhp = useCallback(async () => {
    setIsRunning(true);
    setOutput('');
    setError('');
    setExecutionTime(null);

    const start = performance.now();

    try {
      const result = await executePhp(code);
      const elapsed = performance.now() - start;
      setExecutionTime(elapsed);

      if (result.error) {
        setError(result.error);
      }
      if (result.output) {
        setOutput(result.output);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : (isId ? 'Eksekusi gagal' : 'Execution failed'));
    }

    setIsRunning(false);
  }, [code, isId]);

  const handleReset = useCallback(() => {
    setCode(initialCode || DEFAULT_PHP);
    setOutput('');
    setError('');
    setExecutionTime(null);
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runPhp();
    }
  };

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.addCommand(
      2048 | 3001,
      () => runPhp()
    );
  };

  const statusBadge = engineStatus === 'ready'
    ? (isId ? '🐘 PHP WASM — Berjalan di browser' : '🐘 PHP WASM — Running in browser')
    : engineStatus === 'fallback'
      ? (isId ? '🐘 PHP Interpreter — Mode fallback (parsial)' : '🐘 PHP Interpreter — Fallback mode (partial)')
      : engineStatus === 'error'
        ? (isId ? '❌ PHP Error' : '❌ PHP Error')
        : (isId ? '⏳ Memuat...' : '⏳ Loading...');

  return (
    <div
      className="flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 w-full h-full"
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#252526] border-b border-zinc-700/50 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-zinc-400 font-medium ml-2 hidden sm:inline">
            {statusBadge}
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
              <span className="text-[10px] text-zinc-500 font-mono">
                {isId ? 'kode.php' : 'code.php'}
              </span>
              <button
                onClick={runPhp}
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
            <div className="flex-1 min-h-0">
              {editorReady ? (
                <Editor
                  key={editorKey}
                  height="100%"
                  language="php"
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
                    <span>{isId ? 'Error PHP' : 'PHP Error'}</span>
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
                      ? 'Klik "Jalankan" atau tekan Ctrl+Enter untuk mengeksekusi PHP...'
                      : 'Click "Run" or press Ctrl+Enter to execute PHP...'}
                  </span>
                </div>
              )}
            </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 sm:px-4 py-1.5 bg-[#252526] border-t border-zinc-700/50 text-[10px] text-zinc-500 flex items-center justify-between shrink-0">
        <span>
          {isId
            ? 'PHP Playground — php-wasm + interpreter fallback — Ctrl+Enter untuk menjalankan'
            : 'PHP Playground — php-wasm + interpreter fallback — Ctrl+Enter to run'}
        </span>
        <span className="text-zinc-600">
          {engineStatus === 'ready' ? 'WASM' : engineStatus === 'fallback' ? 'Interpreter' : '...'}
        </span>
      </div>
    </div>
  );
};

export default PhpPlayground;
