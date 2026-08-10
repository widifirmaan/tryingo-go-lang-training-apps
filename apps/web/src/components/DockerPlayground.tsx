import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faRotateLeft, faEraser } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../utils/translations';
import { runDockerCommand, resetDocker } from '../utils/dockerSim';

interface DockerPlaygroundProps {
  lang: Language;
  script?: string;
}

interface Line {
  text: string;
  kind: 'cmd' | 'out' | 'comment' | 'err';
}

const PROM = 'tryngo@docker:~$';

const splitScript = (script: string): string[] =>
  script
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

export const DockerPlayground: React.FC<DockerPlaygroundProps> = ({ lang, script }) => {
  const isId = lang === 'id';
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef(false);
  const scriptRef = useRef(script);

  const pushLine = useCallback((l: Line) => {
    setLines((prev) => [...prev, l]);
  }, []);

  const pushOut = useCallback((text: string, kind: Line['kind'] = 'out') => {
    text.split('\n').forEach((t) => pushLine({ text: t, kind }));
  }, [pushLine]);

  const runOne = useCallback((cmd: string) => {
    const trimmed = cmd.trim().replace(/^\$?\s*/, '');
    if (trimmed.startsWith('#')) {
      pushLine({ text: trimmed, kind: 'comment' });
      return;
    }
    pushLine({ text: `${PROM} ${trimmed}`, kind: 'cmd' });
    const out = runDockerCommand(trimmed);
    if (out) {
      pushOut(out, out.includes('Error') || out.includes('error') ? 'err' : 'out');
    }
  }, [pushLine, pushOut]);

  const runScript = useCallback(async (scriptText: string) => {
    const cmds = splitScript(scriptText);
    if (!cmds.length) return;
    cancelRef.current = false;
    setRunning(true);
    for (const c of cmds) {
      if (cancelRef.current) break;
      runOne(c);
      await new Promise((r) => setTimeout(r, 140));
    }
    setRunning(false);
  }, [runOne]);

  const resetAll = useCallback(() => {
    cancelRef.current = true;
    resetDocker();
    setLines([]);
    setInput('');
  }, []);

  // On mount / script change (week switch): fresh engine + auto-run lesson script
  useEffect(() => {
    if (scriptRef.current === script && lines.length) return;
    scriptRef.current = script;
    resetAll();
    setHistory([]);
    const t = setTimeout(() => {
      runScript(script || '');
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [script]);

  // Auto-scroll to bottom
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    setHistory((h) => [cmd, ...h].slice(0, 50));
    setHistIdx(-1);
    setInput('');
    runOne(cmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx < 0 ? 0 : Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < 0) return;
      const idx = histIdx - 1;
      setHistIdx(idx);
      setInput(idx < 0 ? '' : history[idx]);
    }
  };

  const banner = isId
    ? `Docker CLI Simulator — ketik perintah docker apa pun di sini.
State (image/container/network/volume) hidup di memori browser, tanpa Docker asli.
Coba: docker run -d --name web -p 8080:80 nginx:alpine  lalu  docker ps
Ketik "docker help" untuk daftar perintah.`
    : `Docker CLI Simulator — type any docker command here.
State (images/containers/networks/volumes) lives in browser memory, no real Docker.
Try: docker run -d --name web -p 8080:80 nginx:alpine  then  docker ps
Type "docker help" for the command list.`;

  return (
    <div
      className="flex flex-col bg-[#0b0e14] h-full w-full rounded-[28px] overflow-hidden border border-zinc-700/50 font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#12161f] border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-zinc-400 font-mono ml-2 hidden sm:inline">
            {isId ? '🐳 Docker CLI Simulator — di browser, tanpa instalasi' : '🐳 Docker CLI Simulator — in-browser, no installation'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => runScript(scriptRef.current || '')}
            disabled={running}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2E5B44] hover:bg-[#234735] text-white text-[10px] sm:text-xs font-bold transition-all disabled:opacity-50"
            title={isId ? 'Jalankan skrip pelajaran' : 'Run lesson script'}
          >
            <FontAwesomeIcon icon={faPlay} className="w-3 h-3" />
            <span className="hidden sm:inline">{running ? (isId ? 'Menjalankan...' : 'Running...') : (isId ? 'Jalankan Skrip' : 'Run Script')}</span>
          </button>
          <button
            onClick={resetAll}
            className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            title={isId ? 'Reset (state baru)' : 'Reset (fresh state)'}
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
        </div>
      </div>

      {/* Terminal output */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 text-[11px] sm:text-xs leading-relaxed select-text"
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
              : l.kind === 'comment' ? 'text-zinc-500 italic whitespace-pre-wrap'
              : 'text-zinc-300 whitespace-pre-wrap'
            }
          >
            {l.text || '\u00A0'}
          </div>
        ))}
        {running && <div className="text-zinc-500 animate-pulse">▊</div>}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-[#12161f] border-t border-zinc-800 shrink-0">
        <span className="text-[#7ee787] text-[11px] sm:text-xs shrink-0">{PROM}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-zinc-100 text-[11px] sm:text-xs font-mono placeholder:text-zinc-600"
          placeholder="docker run -d --name web -p 8080:80 nginx:alpine"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          aria-label={isId ? 'Perintah Docker' : 'Docker command'}
        />
      </form>
    </div>
  );
};

export default DockerPlayground;
