import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faRotateLeft, faEraser, faDatabase, faClock, faLayerGroup, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../../utils/translations';
import { executeRedis, resetRedis, getStats } from '../../utils/redisSim';

interface RedisPlaygroundProps {
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

const PROM = '127.0.0.1:6379>';

const splitScript = (script: string): string[] =>
  script
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith('#'));

const DEFAULT_REDIS_CODE = `# Redis Playground — try these commands:
SET greeting "Hello, Redis!"
GET greeting
SET counter 10
INCRBY counter 5
DEL counter

# Hashes
HSET user:1 name "Budi" email "budi@example.com"
HGETALL user:1

# Lists
RPUSH fruits "apple" "banana" "cherry"
LRANGE fruits 0 -1

# Sets
SADD tags "redis" "database" "cache"
SMEMBERS tags

# Sorted Sets
ZADD leaderboard 100 "player1" 85 "player2"
ZRANGE leaderboard 0 -1 WITHSCORES`;

export const RedisPlayground: React.FC<RedisPlaygroundProps> = ({
  lang,
  initialCode,
  onClose,
  inline,
}) => {
  const isId = lang === 'id';
  const [code, setCode] = useState(initialCode || DEFAULT_REDIS_CODE);
  const [lines, setLines] = useState<Line[]>([]);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [stats, setStats] = useState(getStats());
  const outputRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const cancelRef = useRef(false);
  const scriptRef = useRef(initialCode);

  const pushLine = useCallback((l: Line) => {
    setLines((prev) => [...prev, l]);
  }, []);

  const refreshStats = useCallback(() => {
    setStats(getStats());
  }, []);

  const runOne = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    pushLine({ text: `${PROM} ${trimmed}`, kind: 'cmd' });
    const { response, isError } = executeRedis(trimmed);
    if (response) {
      pushLine({ text: response, kind: isError ? 'err' : 'out' });
    }
    refreshStats();
  }, [pushLine, refreshStats]);

  const runScript = useCallback(async (scriptText: string) => {
    const cmds = splitScript(scriptText);
    if (!cmds.length) return;
    cancelRef.current = false;
    setRunning(true);
    for (const c of cmds) {
      if (cancelRef.current) break;
      runOne(c);
      await new Promise((r) => setTimeout(r, 120));
    }
    setRunning(false);
  }, [runOne]);

  const resetAll = useCallback(() => {
    cancelRef.current = true;
    resetRedis();
    setLines([]);
    refreshStats();
  }, [refreshStats]);

  useEffect(() => {
    if (scriptRef.current === initialCode && lines.length) return;
    scriptRef.current = initialCode;
    resetAll();
    const t = setTimeout(() => {
      runScript(initialCode || '');
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = editorRef.current?.getSelection();
    const selectedText = selected ? editorRef.current?.getModel()?.getValueInRange(selected) : null;
    const cmd = selectedText?.trim() || code.split('\n').find(l => l.trim() && !l.trim().startsWith('#')) || '';
    if (!cmd.trim()) return;
    setHistory((h) => [cmd, ...h].slice(0, 50));
    setHistIdx(-1);
    runOne(cmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === 'ArrowUp' && e.altKey) {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx < 0 ? 0 : Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
    } else if (e.key === 'ArrowDown' && e.altKey) {
      e.preventDefault();
      if (histIdx < 0) return;
      const idx = histIdx - 1;
      setHistIdx(idx);
    }
  };

  const banner = isId
    ? `Redis Playground — ketik perintah Redis apa pun di sini.
State hidup di memori browser, tanpa Redis server.
Coba: SET nama "Budi"  atau  HSET user:1 name "Budi"
Ketik perintah di editor, lalu tekan Ctrl+Enter untuk menjalankan.`
    : `Redis Playground — type any Redis command here.
State lives in browser memory, no Redis server needed.
Try: SET name "Budi"  or  HSET user:1 name "Budi"
Type commands in the editor, then press Ctrl+Enter to run.`;

  return (
    <div
      className={`flex flex-col bg-[#0b0e14] h-full w-full rounded-[28px] overflow-hidden border border-zinc-700/50 font-mono ${inline ? '' : 'shadow-2xl'}`}
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#12161f] border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-zinc-400 font-mono ml-2 hidden sm:inline">
            {isId ? '🔴 Redis Playground — di browser, tanpa instalasi server' : '🔴 Redis Playground — in-browser, no server installation'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => runScript(scriptRef.current || code)}
            disabled={running}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2E5B44] hover:bg-[#234735] text-white text-[10px] sm:text-xs font-bold transition-all disabled:opacity-50"
            title={isId ? 'Jalankan (Ctrl+Enter)' : 'Run (Ctrl+Enter)'}
          >
            <FontAwesomeIcon icon={faPlay} className="w-3 h-3" />
            <span className="hidden sm:inline">{running ? (isId ? 'Menjalankan...' : 'Running...') : (isId ? 'Jalankan' : 'Run')}</span>
          </button>
          <button
            onClick={resetAll}
            className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            title={isId ? 'Reset database' : 'Reset database'}
          >
            <FontAwesomeIcon icon={faRotateLeft} className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setLines([])}
            className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            title={isId ? 'Bersihkan layar' : 'Clear screen'}
          >
            <FontAwesomeIcon icon={faEraser} className="w-3.5 h-3.5" />
          </button>
          {!inline && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
              title={isId ? 'Tutup' : 'Close'}
            >
              <FontAwesomeIcon icon={faTimes} className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex min-h-0">
        {/* Editor + Terminal */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Editor */}
          <div className="h-[200px] min-h-[120px] border-b border-zinc-800 flex flex-col">
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800">
              <span className="text-[10px] text-zinc-500 font-mono">commands</span>
              <span className="text-[9px] text-zinc-600 hidden sm:inline">{isId ? 'Ctrl+Enter untuk menjalankan' : 'Ctrl+Enter to run'}</span>
            </div>
            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                language="shell"
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                onMount={(editor) => { editorRef.current = editor; }}
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
            </div>
          </div>

          {/* Terminal output */}
          <div
            ref={outputRef}
            className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 text-[11px] sm:text-xs leading-relaxed select-text min-h-0"
            style={{ scrollbarWidth: 'thin' }}
          >
            {lines.length === 0 && (
              <div className="text-zinc-500 whitespace-pre-wrap">{banner}</div>
            )}
            {lines.map((l, i) => (
              <div
                key={i}
                className={
                  l.kind === 'cmd' ? 'text-[#7ee787] whitespace-pre-wrap'
                  : l.kind === 'err' ? 'text-[#ff7b72] whitespace-pre-wrap'
                  : l.kind === 'info' ? 'text-[#79c0ff] whitespace-pre-wrap'
                  : 'text-zinc-300 whitespace-pre-wrap'
                }
              >
                {l.text || '\u00A0'}
              </div>
            ))}
            {running && <div className="text-zinc-500 animate-pulse">▊</div>}
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="w-48 shrink-0 border-l border-zinc-800 bg-[#12161f] hidden md:flex flex-col">
          <div className="px-3 py-2 border-b border-zinc-800">
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
              {isId ? 'Statistik' : 'Statistics'}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <FontAwesomeIcon icon={faDatabase} className="w-3 h-3" />
                <span className="text-[10px]">{isId ? 'Total Keys' : 'Total Keys'}</span>
              </div>
              <div className="text-lg font-bold text-[#7ee787]">{stats.totalKeys}</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                <span className="text-[10px]">{isId ? 'Expired' : 'Expired'}</span>
              </div>
              <div className="text-lg font-bold text-[#ffa657]">{stats.expired}</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <FontAwesomeIcon icon={faLayerGroup} className="w-3 h-3" />
                <span className="text-[10px]">{isId ? 'Tipe Data' : 'Data Types'}</span>
              </div>
              <div className="space-y-1">
                {Object.entries(stats.byType).map(([type, count]) => (
                  count > 0 ? (
                    <div key={type} className="flex items-center justify-between text-[10px]">
                      <span className="text-zinc-300 capitalize">{type}</span>
                      <span className="text-zinc-400 font-mono">{count}</span>
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 sm:px-4 py-1.5 bg-[#12161f] border-t border-zinc-800 text-[10px] text-zinc-500 flex items-center justify-between shrink-0">
        <span>
          {isId ? 'Redis Simulator v7.2.0 — State di memori browser' : 'Redis Simulator v7.2.0 — State in browser memory'}
        </span>
        <span className="hidden sm:inline">
          DB: {0} | {stats.totalKeys} keys
        </span>
      </div>
    </div>
  );
};

export default RedisPlayground;
