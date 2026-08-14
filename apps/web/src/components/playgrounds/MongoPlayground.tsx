import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faRotateLeft, faSpinner, faDatabase, faTable } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../../utils/translations';
import { executeMongo, resetMongo, listCollections } from '../../utils/mongoSim';

interface MongoPlaygroundProps {
  lang: Language;
  initialCode?: string;
  language?: string;
  onClose?: () => void;
  inline?: boolean;
}

interface Line {
  text: string;
  kind: 'cmd' | 'out' | 'err' | 'info';
}

const DEFAULT_CODE = `// MongoDB Playground — Tryngo
// Ketik perintah MongoDB di sini, lalu klik "Run" atau Ctrl+Enter

// 1. Tampilkan semua koleksi
show collections

// 2. Lihat semua dokumen di koleksi employees
db.employees.find()

// 3. Cari dengan filter
db.employees.find({ department: "Engineering" })

// 4. Operator query: $gt, $lt, $in
db.employees.find({ salary: { $gt: 80000000 } })
db.employees.find({ department: { $in: ["Engineering", "Sales"] } })

// 5. Insert dokumen baru
db.employees.insertOne({ name: "Rina", department: "Design", salary: 75000000, skills: ["Figma"], active: true })

// 6. Update dokumen
db.employees.updateOne({ name: "Budi" }, { $set: { salary: 90000000 }, $push: { skills: "Kubernetes" } })

// 7. Aggregation pipeline
db.employees.aggregate([
  { $match: { active: true } },
  { $group: { _id: "$department", totalSalary: { $sum: "$salary" }, count: { $sum: 1 } } },
  { $sort: { totalSalary: -1 } }
])

// 8. Hapus dokumen
db.employees.deleteOne({ name: "Dewi" })
`;

// Split a Mongo shell script into logical statements, respecting bracket
// depth, string/template/regex literals and comments so multi-line commands
// (e.g. aggregate pipelines) run as a single command instead of line-by-line.
export function splitStatements(code: string): string[] {
  const stmts: string[] = [];
  let buffer = '';
  let depth = 0;
  let inStr: string | null = null; // ', ", `
  let inRegex = false;
  let prevNonSpace: string | null = null;

  const push = () => {
    const t = buffer.trim();
    if (t) stmts.push(t);
    buffer = '';
  };

  const isEscaped = (i: number): boolean => {
    let count = 0;
    for (let j = i - 1; j >= 0 && code[j] === '\\'; j--) count++;
    return count % 2 === 1;
  };

  const isRegexStart = (): boolean => {
    if (prevNonSpace === null) return true;
    return /[=(,{}\[\]:!&|;?+\-*%<>]/.test(prevNonSpace);
  };

  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if (inStr) {
      buffer += ch;
      if (ch === inStr && !isEscaped(i)) inStr = null;
      continue;
    }
    if (inRegex) {
      buffer += ch;
      if (ch === '/' && !isEscaped(i)) inRegex = false;
      else if (ch === '\n') {
        inRegex = false;
        buffer += ' ';
      }
      continue;
    }
    if (ch === '/' && code[i + 1] === '/') {
      // comment line outside a command → treat as its own statement (info)
      if (depth === 0 && buffer.trim() === '') {
        while (i < code.length && code[i] !== '\n') { buffer += code[i]; i++; }
        push();
        prevNonSpace = ' ';
        continue;
      }
      // inline comment inside a command → skip to end of line
      while (i < code.length && code[i] !== '\n') i++;
      buffer += ' ';
      prevNonSpace = ' ';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inStr = ch;
      buffer += ch;
      prevNonSpace = ch;
      continue;
    }
    if (ch === '/' && isRegexStart()) {
      inRegex = true;
      buffer += ch;
      continue;
    }
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth = Math.max(0, depth - 1);
    if (ch === ';' && depth === 0) {
      push();
      prevNonSpace = ';';
      continue;
    }
    if (ch === '\n') {
      if (depth === 0) push();
      else buffer += ' ';
      prevNonSpace = ' ';
      continue;
    }
    if (!/\s/.test(ch)) prevNonSpace = ch;
    buffer += ch;
  }
  push();
  return stmts;
}

export const MongoPlayground: React.FC<MongoPlaygroundProps> = ({
  lang,
  initialCode,
  onClose,
  inline,
}) => {
  const isId = lang === 'id';
  const [code, setCode] = useState(initialCode || DEFAULT_CODE);
  const [lines, setLines] = useState<Line[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [collections, setCollections] = useState<string[]>(listCollections());
  const outputRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const isRunningRef = useRef(false);
  const runIdRef = useRef(0);
  const mountedRef = useRef(true);
  const prevInitialCode = useRef(initialCode);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      runIdRef.current++;
    };
  }, []);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    resetMongo();
    setCollections(listCollections());
  }, []);

  useEffect(() => {
    if (!initialCode) return;
    if (prevInitialCode.current === initialCode) return;
    prevInitialCode.current = initialCode;
    runIdRef.current++;
    isRunningRef.current = false;
    setIsRunning(false);
    setCode(initialCode);
    setLines([]);
    resetMongo();
    setCollections(listCollections());
  }, [initialCode]);

  const pushLine = useCallback((line: Line) => {
    setLines((prev) => [...prev, line]);
  }, []);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#')) {
      if (trimmed.startsWith('//')) pushLine({ text: trimmed, kind: 'info' });
      return;
    }
    pushLine({ text: `> ${trimmed}`, kind: 'cmd' });
    const { result, isError } = executeMongo(trimmed);
    if (result) {
      pushLine({ text: result, kind: isError ? 'err' : 'out' });
    }
  }, [pushLine]);

  const runAll = useCallback(async () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    const runId = ++runIdRef.current;
    setIsRunning(true);
    setLines([]);

    const cmds = splitStatements(code);
    for (const cmd of cmds) {
      if (runIdRef.current !== runId || !mountedRef.current) break;
      runCommand(cmd);
      await new Promise((r) => setTimeout(r, 80));
    }

    if (!mountedRef.current || runIdRef.current !== runId) return;
    setCollections(listCollections());
    setIsRunning(false);
    isRunningRef.current = false;
  }, [code, runCommand]);

  const runSelected = useCallback(() => {
    if (isRunningRef.current) return;
    const editor = editorRef.current;
    if (!editor) return;
    const selection = editor.getSelection?.();
    const selectedText = selection && !selection.isEmpty() ? editor.getModel()?.getValueInRange(selection) : null;
    if (selectedText) {
      splitStatements(selectedText).forEach((c) => runCommand(c));
    } else {
      const first = splitStatements(code)[0];
      if (first) runCommand(first);
    }
    setCollections(listCollections());
  }, [code, runCommand]);

  const reset = useCallback(() => {
    runIdRef.current++;
    isRunningRef.current = false;
    setIsRunning(false);
    resetMongo();
    setCollections(listCollections());
    setLines([]);
    setCode(initialCode || DEFAULT_CODE);
  }, [initialCode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runAll();
    }
  };

  const handleEditorMount: any = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div
      className={`flex bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 h-full w-full ${inline ? '' : 'shadow-2xl'}`}
      onKeyDown={handleKeyDown}
    >
      {/* Sidebar - Collections */}
      <div className="w-48 sm:w-56 bg-[#252526] border-r border-zinc-700/50 flex flex-col shrink-0">
        <div className="px-3 py-2 border-b border-zinc-700/50">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-400 font-mono">
            <FontAwesomeIcon icon={faDatabase} className="w-3 h-3" />
            <span>{isId ? 'Koleksi' : 'Collections'}</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-1">
          {collections.map((name) => (
            <div
              key={name}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-zinc-300 hover:bg-zinc-700/50 cursor-pointer font-mono transition-colors"
              onClick={() => {
                const editor = editorRef.current;
                const current = editor ? editor.getValue() : code;
                const next = current + `\ndb.${name}.find()`;
                setCode(next);
                if (editor) {
                  editor.setValue(next);
                  editor.focus();
                }
              }}
            >
              <FontAwesomeIcon icon={faTable} className="w-2.5 h-2.5 text-emerald-400" />
              <span className="truncate">{name}</span>
            </div>
          ))}
          {collections.length === 0 && (
            <div className="px-3 py-2 text-[10px] text-zinc-500 italic">
              {isId ? '(tidak ada koleksi)' : '(no collections)'}
            </div>
          )}
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Editor + Output */}
        <div className="flex-1 flex flex-col min-h-0 lg:flex-row">
          {/* Editor Panel */}
          <div className="flex-1 flex flex-col min-h-0 lg:border-r border-zinc-700/50">
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800">
              <span className="text-[10px] text-zinc-500 font-mono">query.js</span>
              <span className="text-[9px] text-zinc-600 hidden sm:inline">{isId ? 'Edit kode di sini' : 'Edit code here'}</span>
            </div>
            <div className="flex-1 min-h-0">
              <Editor
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
                  renderLineHighlight: 'gutter',
                  bracketPairColorization: { enabled: true },
                }}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex-1 flex flex-col min-h-0 lg:max-w-[50%] border-t lg:border-t-0 border-zinc-700/50">
            <div className="flex items-center justify-between px-3 py-1 bg-[#0b0e14] border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-500 font-mono">{isId ? 'Hasil' : 'Result'}</span>
                <button
                  onClick={runSelected}
                  className="text-[9px] text-emerald-400 hover:text-emerald-300 transition-colors"
                  title={isId ? 'Jalankan baris terpilih' : 'Run selected'}
                >
                  {isId ? '▶ Jalankan pilihan' : '▶ Run selected'}
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={runAll}
                  disabled={isRunning}
                  className="flex items-center gap-1 px-2.5 py-0 rounded-lg bg-[#2E5B44] hover:bg-[#234735] text-white text-[10px] sm:text-xs font-bold transition-all disabled:opacity-50 shadow-xs"
                  title={isId ? 'Jalankan semua' : 'Run all'}
                >
                  {isRunning ? (
                    <FontAwesomeIcon icon={faSpinner} spin className="w-3 h-3" />
                  ) : (
                    <FontAwesomeIcon icon={faPlay} className="w-3 h-3" />
                  )}
                  <span className="hidden sm:inline">{isRunning ? (isId ? 'Menjalankan...' : 'Running...') : (isId ? 'Jalankan' : 'Run')}</span>
                </button>
                <button
                  onClick={reset}
                  className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
                  title={isId ? 'Reset data sampel' : 'Reset sample data'}
                >
                  <FontAwesomeIcon icon={faRotateLeft} className="w-3.5 h-3.5" />
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                    title={isId ? 'Tutup' : 'Close'}
                  >
                    <span className="text-xs">✕</span>
                  </button>
                )}
              </div>
            </div>
            <div
              ref={outputRef}
              className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 text-[11px] sm:text-xs leading-relaxed select-text bg-[#0b0e14]"
              style={{ scrollbarWidth: 'thin' }}
            >
              {lines.length === 0 ? (
                <div className="text-zinc-500 whitespace-pre-wrap">
                  {isId
                    ? `// Output muncul di sini setelah menjalankan perintah.\n// Klik "Jalankan" atau tekan Ctrl+Enter.\n// Klik nama koleksi di sidebar untuk menyisipkan query.`
                    : `// Output appears here after running commands.\n// Click "Run" or press Ctrl+Enter.\n// Click a collection name in the sidebar to insert a query.`}
                </div>
              ) : (
                lines.map((l, i) => (
                  <div
                    key={i}
                    className={
                      l.kind === 'cmd' ? 'text-emerald-400 whitespace-pre-wrap mb-1'
                      : l.kind === 'err' ? 'text-red-400 whitespace-pre-wrap mb-1'
                      : l.kind === 'info' ? 'text-zinc-500 italic whitespace-pre-wrap mb-1'
                      : 'text-zinc-300 whitespace-pre-wrap mb-1'
                    }
                  >
                    {l.text || '\u00A0'}
                  </div>
                ))
              )}
              {isRunning && <div className="text-zinc-500 animate-pulse">▊</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MongoPlayground;
