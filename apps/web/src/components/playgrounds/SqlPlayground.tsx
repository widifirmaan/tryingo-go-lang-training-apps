import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faRotateLeft, faTable, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../../utils/translations';
import { executeSql, resetSql, getSchema, SqlResult, SqlTableSchema } from '../../utils/sqlEngine';

interface SqlPlaygroundProps {
  lang: Language;
  initialCode?: string;
}

const DEFAULT_SQL = `-- Tryngo SQL Playground — SQLite via sql.js (WASM)
-- Sample tables: employees, products, orders
-- Try running a query:

SELECT * FROM employees;
`;

export const SqlPlayground: React.FC<SqlPlaygroundProps> = ({ lang, initialCode }) => {
  const isId = lang === 'id';
  const [code, setCode] = useState(initialCode || DEFAULT_SQL);
  const [results, setResults] = useState<SqlResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [schema, setSchema] = useState<SqlTableSchema[]>([]);
  const [showSchema, setShowSchema] = useState(true);
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
    setResults([]);
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  useEffect(() => {
    getSchema().then(setSchema);
  }, []);

  const runSql = useCallback(async () => {
    setIsRunning(true);
    setResults([]);

    const statements = code
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));

    if (statements.length === 0) {
      setResults([
        {
          columns: [],
          rows: [],
          rowCount: 0,
          error: isId ? 'Tidak ada perintah SQL yang valid' : 'No valid SQL statement',
          executionTimeMs: 0,
        },
      ]);
      setIsRunning(false);
      return;
    }

    const allResults: SqlResult[] = [];
    for (const stmt of statements) {
      const result = await executeSql(stmt);
      allResults.push(result);
    }

    setResults(allResults);
    setIsRunning(false);

    const schemaResult = await getSchema();
    setSchema(schemaResult);
  }, [code, isId]);

  const handleReset = useCallback(async () => {
    await resetSql();
    setResults([]);
    const schemaResult = await getSchema();
    setSchema(schemaResult);
    setCode(initialCode || DEFAULT_SQL);
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runSql();
    }
  };

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.addCommand(
      // monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter
      2048 | 3001, // Ctrl+Enter
      () => runSql()
    );
  };

  return (
    <div
      className="flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 w-full h-full"
      onKeyDown={handleKeyDown}
    >
      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Schema Sidebar */}
        {showSchema && (
          <div className="w-48 shrink-0 border-r border-zinc-700/50 bg-[#1a1a1a] overflow-y-auto hidden md:block">
            <div className="px-3 py-2 border-b border-zinc-800">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wide">
                {isId ? 'Tabel' : 'Tables'}
              </span>
            </div>
            {schema.map((table) => (
              <div key={table.name} className="px-3 py-2 border-b border-zinc-800/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <FontAwesomeIcon icon={faTable} className="w-2.5 h-2.5 text-green-400" />
                  <span className="text-[11px] text-green-400 font-mono font-medium">{table.name}</span>
                </div>
                {table.columns.map((col) => (
                  <div key={col.name} className="pl-4 text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                    <span className={col.name === 'id' ? 'text-yellow-500' : 'text-zinc-400'}>{col.name}</span>
                    <span className="text-zinc-600">{col.type}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Editor + Results */}
        <div ref={containerRef} className={`flex-1 flex min-h-0 ${isHorizontal ? 'flex-row' : 'flex-col'}`}>
          {/* Editor Panel */}
          <div className={`${isHorizontal ? 'w-1/2 min-h-0 border-r' : 'flex-1 min-h-[120px] border-b'} border-zinc-700/50 flex flex-col`}>
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
              <span className="text-[10px] text-zinc-500 font-mono">query.sql</span>
              <span className="text-[9px] text-zinc-600 hidden sm:inline">{isId ? 'Edit kode di sini' : 'Edit code here'}</span>
            </div>
            <div className="flex-1 min-h-0">
              {editorReady ? (
                <Editor
                  key={editorKey}
                  height="100%"
                  language="sql"
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

          {/* Results Panel */}
          <div className={`${isHorizontal ? 'w-1/2 min-h-0' : 'flex-1 min-h-[120px]'} flex flex-col bg-[#1a1a1a]`}>
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-500 font-mono">
                  {isId ? 'Hasil' : 'Result'}
                  {results.length > 0 && (
                    <span className="ml-2 text-zinc-600">
                      ({results.reduce((acc, r) => acc + r.rowCount, 0)} {isId ? 'baris' : 'rows'})
                    </span>
                  )}
                </span>
                {results.length > 0 && results[0].executionTimeMs !== undefined && (
                  <span className="text-[9px] text-zinc-600">
                    {results[results.length - 1].executionTimeMs.toFixed(2)}ms
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowSchema(!showSchema)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    showSchema ? 'bg-[#2E5B44] text-white' : 'hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200'
                  }`}
                  title={isId ? 'Tampilkan/Sembunyikan Schema' : 'Toggle Schema'}
                >
                  <FontAwesomeIcon icon={faTable} className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
                  title={isId ? 'Reset Database' : 'Reset Database'}
                >
                  <FontAwesomeIcon icon={faRotateLeft} className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={runSql}
                  disabled={isRunning}
                  className="flex items-center gap-1 px-2.5 py-0 rounded-lg bg-[#2E5B44] hover:bg-[#234735] text-white text-[10px] sm:text-xs font-bold transition-all disabled:opacity-50 shadow-xs"
                >
                  {isRunning ? (
                    <FontAwesomeIcon icon={faSpinner} spin className="w-3 h-3 text-white" />
                  ) : (
                    <FontAwesomeIcon icon={faPlay} className="w-3 h-3 text-white" />
                  )}
                  <span className="hidden sm:inline">{isRunning ? (isId ? 'Menjalankan...' : 'Running...') : (isId ? 'Jalankan' : 'Run')}</span>
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-auto p-3">
              {results.length === 0 ? (
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <FontAwesomeIcon icon={faCircleInfo} className="w-3 h-3" />
                  <span>{isId ? 'Klik "Jalankan" atau tekan Ctrl+Enter untuk mengeksekusi SQL...' : 'Click "Run" or press Ctrl+Enter to execute SQL...'}</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((result, idx) => (
                    <div key={idx}>
                      {result.error ? (
                        <div className="bg-red-900/30 border border-red-800/50 rounded-lg p-3">
                          <div className="flex items-center gap-1.5 text-[10px] text-red-400 mb-1 font-mono">
                            <span className="text-red-500">✗</span>
                            <span>{isId ? 'Error' : 'Error'}</span>
                          </div>
                          <pre className="text-red-300 text-[11px] font-mono whitespace-pre-wrap">{result.error}</pre>
                        </div>
                      ) : result.columns.length === 0 ? (
                        <div className="bg-green-900/20 border border-green-800/40 rounded-lg p-3">
                          <div className="flex items-center gap-1.5 text-[10px] text-green-400 font-mono">
                            <span>✓</span>
                            <span>
                              {isId ? 'Berhasil' : 'Success'}
                              {result.affectedRows !== undefined && ` — ${result.affectedRows} ${isId ? 'baris terpengaruh' : 'rows affected'}`}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="overflow-x-auto rounded-lg border border-zinc-700/50">
                          <table className="w-full text-[11px] font-mono">
                            <thead>
                              <tr className="bg-[#252526]">
                                {result.columns.map((col, colIdx) => (
                                  <th
                                    key={colIdx}
                                    className="px-3 py-2 text-left text-green-400 font-medium border-b border-zinc-700/50 whitespace-nowrap"
                                  >
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {result.rows.map((row, rowIdx) => (
                                <tr
                                  key={rowIdx}
                                  className={rowIdx % 2 === 0 ? 'bg-[#1a1a1a]' : 'bg-[#1e1e1e]'}
                                >
                                  {row.map((cell, cellIdx) => (
                                    <td
                                      key={cellIdx}
                                      className={`px-3 py-1.5 border-b border-zinc-800/50 whitespace-nowrap ${
                                        cell === 'NULL' ? 'text-zinc-600 italic' : 'text-zinc-300'
                                      }`}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {result.rowCount > 0 && (
                            <div className="px-3 py-1.5 bg-[#252526] border-t border-zinc-700/50 text-[10px] text-zinc-500">
                              {result.rowCount} {isId ? 'baris' : 'rows'}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlPlayground;
