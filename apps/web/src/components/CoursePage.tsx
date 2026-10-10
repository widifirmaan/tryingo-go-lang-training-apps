import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookOpen, faChevronDown, faCode, faQuestion, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Sparkles, Award, Play, Rocket } from 'lucide-react';
import { Language } from '../utils/translations';
import { TRACKS_COLLECTION } from '../data/tracksData';
import { getCurriculum } from '../data/curriculum';
import { SLUG_MAP } from '../data/slugMap';
import { CertificateModal } from './CertificateModal';
import { AiMentorDrawer } from './AiMentorDrawer';
import { StackBlitzPlayground } from './playgrounds/StackBlitzPlayground';
import { DockerPlayground } from './DockerPlayground';
import { SqlPlayground } from './playgrounds/SqlPlayground';
import { MongoPlayground } from './playgrounds/MongoPlayground';
import { RedisPlayground } from './playgrounds/RedisPlayground';
import { GraphqlPlayground } from './playgrounds/GraphqlPlayground';
import { PhpPlayground } from './playgrounds/PhpPlayground';
import { RubyPlayground } from './playgrounds/RubyPlayground';
import { PythonPlayground } from './playgrounds/PythonPlayground';
import { CsharpPlayground } from './playgrounds/CsharpPlayground';
import { ReactPlayground } from './playgrounds/ReactPlayground';
import { VuePlayground } from './playgrounds/VuePlayground';
import { SveltePlayground } from './playgrounds/SveltePlayground';

const InlinePlayground = React.lazy(() => import('./CodePlayground'));

// Copy helper with textarea fallback (clipboard API needs secure context)
const copyText = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* fall through to textarea */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
};

const nodeText = (node: React.ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join('');
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return nodeText(node.props.children);
  return '';
};

const NON_RUNNABLE_LANGS = new Set([
  'text', 'txt', 'output', 'diagram', 'console', 'log', 'stdout', 'stderr',
  'result', 'plain', '', 'markdown', 'md', 'bash', 'sh', 'shell', 'zsh',
  'powershell', 'cmd', 'yaml', 'yml', 'json', 'toml', 'ini', 'mermaid'
]);

// Fenced code block: header with language label, run in playground, and copy button
const LessonCodeBlock: React.FC<{
  children?: React.ReactNode;
  isId: boolean;
  onRunCode?: (code: string, lang: string) => void;
}> = ({ children, isId, onRunCode }) => {
  const [copied, setCopied] = useState(false);
  const child = React.Children.toArray(children)[0];
  const langClass = React.isValidElement<{ className?: string }>(child)
    ? child.props.className || ''
    : '';
  const lang = (langClass.match(/language-(\w+)/) || [])[1] || '';
  const text = nodeText(children);
  const isRunnable = Boolean(lang && !NON_RUNNABLE_LANGS.has(lang.toLowerCase().trim()));

  return (
    <div className="rounded-xl overflow-hidden mb-6 border border-zinc-700/60">
      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-800 dark:bg-black/40">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
          {lang || (isId ? 'output' : 'output')}
        </span>
        <div className="flex items-center gap-2">
          {onRunCode && isRunnable && text.trim().length > 0 && (
            <button
              onClick={() => onRunCode(text, lang)}
              title={isId ? 'Coba di Playground' : 'Run in Playground'}
              className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>{isId ? 'Coba di Playground' : 'Try in Playground'}</span>
            </button>
          )}
          <button
            onClick={async () => {
              if (await copyText(text)) {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }
            }}
            title={isId ? 'Salin kode' : 'Copy code'}
            className="flex items-center gap-1 text-[10px] font-bold text-zinc-300 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-3 h-3" />
            {copied ? (isId ? 'Tersalin!' : 'Copied!') : (isId ? 'Salin' : 'Copy')}
          </button>
        </div>
      </div>
      <pre className="!m-0 !rounded-none !border-0">{children}</pre>
    </div>
  );
};

// Inline `code`: click to copy (skipped while selecting text)
const LessonInlineCode: React.FC<{ children?: React.ReactNode; className?: string; isId: boolean }> = ({ children, className, isId }) => {
  const [copied, setCopied] = useState(false);
  if (className?.includes('language-')) {
    // block-level code inside <pre> — the block header already handles copy
    return <code className={className}>{children}</code>;
  }
  return (
    <code
      className={`${className || ''} cursor-pointer`.trim()}
      title={`${isId ? 'Klik untuk menyalin' : 'Click to copy'}: ${nodeText(children).slice(0, 60)}`}
      onClick={async (e) => {
        if (window.getSelection()?.toString()) return;
        e.preventDefault();
        if (await copyText(nodeText(children))) {
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }
      }}
    >
      {children}
      {copied && <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5 ml-1 text-[#2E5B44]" />}
    </code>
  );
};

const extractCode = (markdown: string, preferred: string[] = []): string => {
  const regex = /```(\w*)\r?\n([\s\S]*?)```/g;
  const blocks: { lang: string; code: string }[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(markdown)) !== null) {
    blocks.push({ lang: (match[1] || '').toLowerCase(), code: match[2].trim() });
  }
  if (!blocks.length) return '';
  // 1) Hit in the playground's language(s) — earliest preferred language wins, largest block wins
  if (preferred.length) {
    const rank = new Map(preferred.map((l, i) => [l.toLowerCase(), i]));
    const hits = blocks
      .filter(b => rank.has(b.lang))
      .sort((a, b) => (rank.get(a.lang)! - rank.get(b.lang)!) || (b.code.length - a.code.length));
    if (hits.length) {
      // Bare JS/TS that touches the DOM needs its HTML shell to run in the iframe preview
      const top = hits[0];
      if ((top.lang === 'javascript' || top.lang === 'js' || top.lang === 'typescript' || top.lang === 'ts')
        && /document|window|getElementById|querySelector|addEventListener/.test(top.code)) {
        const html = blocks.filter(b => b.lang === 'html')
          .sort((a, b) => b.code.length - a.code.length)[0];
        if (html) return html.code;
      }
      return top.code;
    }
    // Preferred fences were explicitly requested, but none matched.
    // Return empty so caller/playground can fall back to its own valid default template,
    // rather than feeding foreign language syntax into the runner.
    return '';
  }
  // 2) Fallback: largest fenced block (the week's main program, not setup one-liners)
  return blocks.reduce((a, b) => (b.code.length > a.code.length ? b : a)).code;
};

// Preferred fence languages per playground so the editor is pre-filled with
// the week's runnable program instead of setup snippets (bash/npm/install).
const STACKBLITZ_FENCES: Record<string, string[]> = {
  nodejs: ['javascript', 'js'],
  nextjs: ['tsx', 'jsx', 'ts', 'typescript', 'javascript', 'js'],
  nestjs: ['typescript', 'ts'],
  angular: ['typescript', 'ts'],
  django: ['python', 'py'],
  spring: ['java'],
};

const INLINE_FENCES: Record<string, string[]> = {
  golang: ['go'],
  rust: ['rust'],
  javascript: ['javascript', 'js', 'html'],
  typescript: ['typescript', 'ts', 'javascript'],
  html5: ['html'],
  css3: ['html'],
  tailwind: ['html'],
};

const wrapSnippetForPlayground = (code: string, rawLang: string, trackSlug: string, isId: boolean): string => {
  const trimmed = code.trim();
  const lang = rawLang.toLowerCase();

  // 1. Go
  if (lang === 'go' || trackSlug === 'golang') {
    if (trimmed.includes('func main(') || trimmed.includes('func main ()')) {
      return trimmed;
    }
    return `package main

import (
\t"fmt"
)

func main() {
\t${trimmed.split('\n').join('\n\t')}
}`;
  }

  // 2. Rust
  if (lang === 'rust' || trackSlug === 'rust') {
    if (trimmed.includes('fn main()') || trimmed.includes('fn main ()')) {
      return trimmed;
    }
    return `fn main() {
    ${trimmed.split('\n').join('\n    ')}
}`;
  }

  // 3. HTML / CSS / Tailwind
  if (lang === 'html' || lang === 'css' || trackSlug === 'html5' || trackSlug === 'css3' || trackSlug === 'tailwind') {
    if (trimmed.includes('<!DOCTYPE') || trimmed.includes('<html')) {
      return trimmed;
    }

    if (lang === 'css' || trackSlug === 'css3' || (!trimmed.includes('<') && /[{}:;]/.test(trimmed))) {
      return `<!DOCTYPE html>
<html lang="${isId ? 'id' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Demo</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; background: #0f172a; color: #f8fafc; margin: 0; }
    .demo-card { background: #1e293b; border: 1px solid #334155; padding: 20px; border-radius: 12px; max-width: 520px; }
    .btn { background: #2E5B44; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-family: inherit; margin-top: 8px; display: inline-block; }
    .box { background: #334155; padding: 12px; border-radius: 8px; margin: 8px 0; }
    .badge { display: inline-block; padding: 2px 8px; background: #10b981; color: white; border-radius: 9999px; font-size: 11px; font-weight: bold; }
${trimmed}
  </style>
</head>
<body>
  <div class="demo-card card box container navbar grid-container">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
      <h2 style="margin: 0; font-size: 18px;">${isId ? 'Pratinjau CSS' : 'CSS Live Preview'}</h2>
      <span class="badge">Live</span>
    </div>
    <p style="margin: 8px 0; color: #94a3b8; font-size: 14px;">${isId ? 'Efek styling diterapkan langsung pada elemen ini.' : 'Styling rules applied directly to this element.'}</p>
    <div class="box item">${isId ? 'Kotak Konten (.box / .item)' : 'Content Box (.box / .item)'}</div>
    <button class="btn">${isId ? 'Tombol Interaktif (.btn)' : 'Interactive Button (.btn)'}</button>
  </div>
</body>
</html>`;
    }

    if (trackSlug === 'tailwind') {
      return `<!DOCTYPE html>
<html lang="${isId ? 'id' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <title>Tailwind CSS Demo</title>
</head>
<body class="bg-slate-900 text-white p-6 font-sans antialiased min-h-screen">
  ${trimmed}
</body>
</html>`;
    }

    // HTML Snippet (e.g. <meta>, <header>, <form>, etc.)
    const isHeadMeta = /^\s*<meta|<title|<link/i.test(trimmed);
    if (isHeadMeta) {
      return `<!DOCTYPE html>
<html lang="${isId ? 'id' : 'en'}">
<head>
  <meta charset="UTF-8">
  ${trimmed}
  <title>HTML5 Demo</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; background: #0f172a; color: #f8fafc; margin: 0; }
    .card { background: #1e293b; border: 2px solid #10b981; padding: 20px; border-radius: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <h3 style="margin: 0 0 8px 0;">${isId ? 'Layar Responsif 1:1 Aktif' : 'Responsive 1:1 Scale Active'}</h3>
    <p style="margin: 0; color: #94a3b8;">${isId ? 'Tag disematkan ke dalam elemen <head> dan berfungsi penuh.' : 'Tag is embedded in <head> and active.'}</p>
  </div>
</body>
</html>`;
    }

    return `<!DOCTYPE html>
<html lang="${isId ? 'id' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML5 Demo</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; background: #0f172a; color: #f8fafc; margin: 0; line-height: 1.6; }
    input, button, select, textarea { font-family: inherit; font-size: 14px; border-radius: 6px; padding: 6px 12px; }
    a { color: #38bdf8; }
    table { border-collapse: collapse; width: 100%; margin: 12px 0; }
    th, td { border: 1px solid #334155; padding: 8px 12px; text-align: left; }
    th { background: #1e293b; color: #38bdf8; }
  </style>
</head>
<body>
${trimmed}
</body>
</html>`;
  }

  // 4. JS / TS with DOM interactions
  if ((lang === 'javascript' || lang === 'js' || lang === 'typescript' || lang === 'ts')
      && /document\.|window\.|getElementById|querySelector/i.test(trimmed)
      && !trimmed.includes('<!DOCTYPE') && !trimmed.includes('<html')) {
    return `<!DOCTYPE html>
<html lang="${isId ? 'id' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JS Demo</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; background: #0f172a; color: #f8fafc; margin: 0; }
    #app, .output, #output { margin-top: 12px; padding: 16px; background: #1e293b; border: 1px solid #334155; border-radius: 10px; font-size: 14px; }
    button { font-family: inherit; font-size: 14px; background: #2E5B44; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; }
    button:hover { background: #234735; }
    input { font-family: inherit; font-size: 14px; padding: 8px 12px; border-radius: 6px; border: 1px solid #475569; background: #1e293b; color: white; }
  </style>
</head>
<body>
  <div id="app">Output JavaScript</div>
  <script>
${trimmed}
  </script>
</body>
</html>`;
  }

  // 5. PHP
  if (lang === 'php' || trackSlug === 'php') {
    if (!trimmed.startsWith('<?php')) {
      return `<?php\n\n${trimmed}\n`;
    }
  }

  return trimmed;
};

interface CoursePageProps {
  trackId: string;
  lang: Language;
  onBack: () => void;
  onOpenPlayground?: (code: string) => void;
  onOpenQuiz?: (slug: string, level?: string) => void;
  onOpenIde?: (trackId: string) => void;
  initialLevel?: string;
  initialWeek?: number;
  onNavigate?: (trackId: string, level: string, week: number) => void;
}

export const CoursePage: React.FC<CoursePageProps> = ({ trackId, lang, onBack, onOpenPlayground, onOpenQuiz, onOpenIde, initialLevel, initialWeek, onNavigate }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const [activeLevel, setActiveLevel] = useState(() => {
    const s = SLUG_MAP[trackId] || trackId.replace('tryngo-lang-', '');
    const lvls = getCurriculum(s);
    if (initialLevel && lvls.some(l => l.levelId === initialLevel)) return initialLevel;
    return lvls[0]?.levelId || 'beginer';
  });
  const [activeWeek, setActiveWeek] = useState(() => {
    const lvl = getCurriculum(SLUG_MAP[trackId] || trackId.replace('tryngo-lang-', ''))
      .find(l => l.levelId === (initialLevel || undefined));
    if (lvl) {
      const first = lvl.weeks[0]?.week;
      if (initialWeek === undefined) return first || 1;
      if (lvl.weeks.some(w => w.week === initialWeek)) return initialWeek;
      return first || 1;
    }
    return initialWeek || 1;
  });
  const [showLevelPicker, setShowLevelPicker] = useState(false);
  const [leftWidth, setLeftWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const isId = lang === 'id';
  const track = TRACKS_COLLECTION.find(t => t.id === trackId);
  const slug = SLUG_MAP[trackId] || trackId.replace('tryngo-lang-', '');
  const isStackBlitz = slug === 'nextjs' || slug === 'nodejs' || slug === 'nestjs' || slug === 'django' || slug === 'angular' || slug === 'spring';
  const isDocker = slug === 'docker';
  const levels = getCurriculum(slug);

  const currentLevel = levels.find(l => l.levelId === activeLevel);
  const currentWeek = currentLevel?.weeks.find(w => w.week === activeWeek);

  const [overrideCode, setOverrideCode] = useState<string | null>(null);
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  useEffect(() => {
    setOverrideCode(null);
  }, [slug, activeWeek]);

  const getActivePlaygroundCode = useCallback((fences: string[]) => {
    if (overrideCode !== null) return overrideCode;
    return extractCode(content, fences);
  }, [overrideCode, content]);

  const getFilePath = useCallback(() => {
    if (!currentWeek) return '';
    const topic = currentWeek.topicId;
    const fileName = `week${activeWeek}-${topic}.md`;
    return `/data/course/${slug}/${activeLevel}/${lang}/${fileName}`;
  }, [slug, activeLevel, activeWeek, lang, currentWeek]);

  const loadRef = useRef<{ abort: AbortController } | null>(null);

  const loadContent = useCallback(() => {
    const path = getFilePath();
    if (!path) {
      setContent(`# ${track?.name || trackId}

> _${isId ? 'Materi sedang disiapkan. Coba minggu atau level lain!' : 'Material being prepared. Try another week or level!'}_

\`\`\`
${isId ? 'Konten untuk modul ini belum tersedia.' : 'Content for this module is not yet available.'}
\`\`\`
`);
      setLoading(false);
      return;
    }
    loadRef.current?.abort.abort();
    const abort = new AbortController();
    loadRef.current = { abort };
    setLoading(true);
    fetch(path, { signal: abort.signal })
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.name === 'AbortError') return;
        setContent(`# ${track?.name || trackId}

> _${isId ? 'Materi sedang disiapkan. Coba minggu atau level lain!' : 'Material being prepared. Try another week or level!'}_

\`\`\`
${isId ? 'Konten untuk modul ini belum tersedia.' : 'Content for this module is not yet available.'}
\`\`\`
`);
        setLoading(false);
      });
  }, [getFilePath, track, trackId, isId]);

  useEffect(() => {
    loadContent();
    return () => loadRef.current?.abort.abort();
  }, [loadContent]);



  const handleLevelChange = (levelId: string) => {
    const newLevel = levels.find(l => l.levelId === levelId);
    const firstWeek = newLevel?.weeks[0]?.week ?? 1;
    setActiveLevel(levelId);
    setActiveWeek(firstWeek);
    setShowLevelPicker(false);
    onNavigate?.(trackId, levelId, firstWeek);
  };

  const handleWeekChange = (week: number) => {
    setActiveWeek(week);
    onNavigate?.(trackId, activeLevel, week);
  };

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Initialize 50/50 split on desktop
  useEffect(() => {
    if (!isDesktop || leftWidth !== null) return;
    const container = containerRef.current;
    if (container) {
      setLeftWidth(container.getBoundingClientRect().width * 0.5);
    }
  }, [isDesktop, content]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    const container = containerRef.current;
    if (container && leftWidth === null) {
      setLeftWidth(container.getBoundingClientRect().width * 0.5);
    }
  }, [leftWidth]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setLeftWidth(Math.max(200, Math.min(rect.width - 400, x)));
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!track) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Track not found
      </div>
    );
  }

  const levelInfo = levels.find(l => l.levelId === activeLevel);
  const levelName = isId ? levelInfo?.nameId : levelInfo?.nameEn;

  return (
    <div className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto lg:overflow-hidden gap-3 px-3 sm:px-0">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 flex-wrap">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 shadow-xs transition-all shrink-0"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-700 dark:text-zinc-300" />
        </button>

        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border-zinc-200 dark:border-zinc-700 border flex items-center justify-center p-1.5 sm:p-2 shrink-0">
            <img src={track.image} alt={track.name} className="track-logo-img w-full h-full object-contain" style={{ filter: 'brightness(0) saturate(100%)' }} referrerPolicy="no-referrer" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h2 className="font-extrabold text-xs sm:text-sm md:text-base leading-none truncate">{track.name}</h2>
            </div>
            <p className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 font-medium truncate mt-0.5">
              {track.category}
            </p>
          </div>
        </div>

        {/* Claim Certificate Button */}
        <button
          onClick={() => setIsCertificateOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-zinc-950 font-black shadow-xs transition-all text-xs sm:text-sm shrink-0"
          title={isId ? 'Klaim Sertifikat Kelulusan' : 'Claim Certificate of Completion'}
        >
          <Award className="w-3.5 h-3.5 text-zinc-950" />
          <span className="hidden sm:inline">{isId ? 'Sertifikat' : 'Certificate'}</span>
        </button>

        {/* AI Mentor Button */}
        <button
          onClick={() => setIsMentorOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-[#2E5B44] text-white shadow-xs hover:brightness-110 transition-all text-xs sm:text-sm font-bold shrink-0"
          title={isId ? 'Tanya AI Mentor seputar modul ini' : 'Ask AI Mentor about this lesson'}
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span className="hidden sm:inline">AI Mentor</span>
        </button>

        {/* IDE Button */}
        <button
          onClick={() => onOpenIde?.(trackId)}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-xs hover:bg-white dark:hover:bg-zinc-700 transition-all text-xs sm:text-sm font-bold shrink-0"
          title={isId ? 'Buka Online IDE' : 'Open Online IDE'}
        >
          <FontAwesomeIcon icon={faCode} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">IDE</span>
        </button>

        {/* Quiz Button */}
        <button
          onClick={() => onOpenQuiz?.(slug, activeLevel)}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#2E5B44] text-white border border-[#2E5B44] shadow-xs hover:bg-[#234735] transition-all text-xs sm:text-sm font-bold shrink-0"
          title={isId ? 'Kuis semua materi' : 'Quiz all material'}
        >
          <FontAwesomeIcon icon={faQuestion} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">{isId ? 'Kuis' : 'Quiz'}</span>
        </button>

        {/* Level Picker */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowLevelPicker(!showLevelPicker)}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-xs hover:bg-white dark:hover:bg-zinc-700 transition-all text-xs sm:text-sm font-bold"
          >
            <span className="hidden sm:inline">{levelName}</span>
            <FontAwesomeIcon icon={faChevronDown} className="w-3.5 h-3.5" />
          </button>

          {showLevelPicker && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowLevelPicker(false)} />
              <div className="absolute right-0 top-full mt-1 z-20 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-2 w-56">
                {levels.map((level, idx) => (
                  <button
                    key={level.levelId}
                    onClick={() => handleLevelChange(level.levelId)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
                      activeLevel === level.levelId
                        ? 'bg-[#2E5B44] text-white'
                        : 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${
                      activeLevel === level.levelId ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-700'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <span className="block">{isId ? level.nameId : level.nameEn}</span>
                      <span className="block text-[9px] opacity-60 font-medium">{isId ? level.descId : level.descEn}</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Week Tabs */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 flex-shrink-0 scrollbar-thin">
        {currentLevel?.weeks.map((w) => {
          return (
            <button
              key={w.week}
              onClick={() => handleWeekChange(w.week)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                activeWeek === w.week
                  ? 'bg-[#2E5B44] text-white border-[#2E5B44] shadow-xs'
                  : 'bg-white/60 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-700'
              }`}
            >
              <span className="sm:hidden">W{w.week}</span>
              <span className="hidden sm:inline">{isId ? w.titleId : w.titleEn}</span>
            </button>
          );
        })}
      </div>

      {/* Content + Inline Playground */}
      <div ref={containerRef} className="flex flex-col lg:flex-row flex-1 min-h-0 lg:gap-0">
        {/* Markdown Content */}
        <div className="lg:overflow-y-auto rounded-2xl sm:rounded-[28px] bg-white dark:bg-zinc-900/95 border border-zinc-300 dark:border-zinc-700 px-5 py-4 sm:p-6 md:p-8 shadow-md lg:max-h-none"
          style={isDesktop && leftWidth ? { width: leftWidth, flex: 'none' } : {}}
        >
          {loading ? (
            <div className="flex items-center justify-center h-40 text-zinc-400">
              <div className="flex flex-col items-center gap-2">
                <FontAwesomeIcon icon={faBookOpen} className="w-8 h-8 animate-pulse" />
                <span className="text-xs font-medium">{isId ? 'Memuat...' : 'Loading...'}</span>
              </div>
            </div>
          ) : (
            <motion.div
              key={activeWeek}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.12 }}
            >
              <div className="lesson-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    pre: ({ children }) => (
                      <LessonCodeBlock
                        isId={isId}
                        onRunCode={(code, codeLang) => {
                          const wrapped = wrapSnippetForPlayground(code, codeLang, slug, isId);
                          setOverrideCode(wrapped);
                        }}
                      >
                        {children}
                      </LessonCodeBlock>
                    ),
                    code: ({ children, className }) => <LessonInlineCode isId={isId} className={className}>{children}</LessonInlineCode>,
                    img: ({ src, alt }) => (
                      <figure className="my-6 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/70 p-4 text-center shadow-xs">
                        <img src={src} alt={alt} className="mx-auto rounded-xl max-h-96 w-auto object-contain" loading="lazy" />
                        {alt && <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium italic">{alt}</figcaption>}
                      </figure>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}
        </div>

        {/* Resizable Divider (desktop only) */}
        <div
          className="hidden lg:flex items-center justify-center w-2 mx-1 my-1 cursor-col-resize shrink-0 select-none rounded-full transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-400 dark:active:bg-zinc-500 bg-transparent"
          onMouseDown={handleMouseDown}
        >
          <div className="w-0.5 h-8 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        </div>

        {/* Mobile gap divider */}
        <div className="lg:hidden h-3" />

        {/* Inline Code Playground */}
        {content && isDocker ? (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <DockerPlayground lang={lang} script={getActivePlaygroundCode(['bash', 'sh', 'shell', 'dockerfile', 'yaml', 'yml'])} />
          </div>
        ) : content && isStackBlitz ? (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <StackBlitzPlayground
              lang={lang}
              language={slug as any}
              initialCode={getActivePlaygroundCode(STACKBLITZ_FENCES[slug] || ['javascript', 'js', 'typescript', 'ts'])}
            />
          </div>
        ) : content && (slug === 'postgresql' || slug === 'mysql') ? (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <SqlPlayground lang={lang} initialCode={getActivePlaygroundCode(['sql'])} />
          </div>
        ) : content && slug === 'mongodb' ? (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <MongoPlayground lang={lang} initialCode={getActivePlaygroundCode(['javascript', 'js', 'json'])} />
          </div>
        ) : content && slug === 'redis' ? (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <RedisPlayground lang={lang} initialCode={getActivePlaygroundCode(['redis', 'bash', 'sh'])} />
          </div>
        ) : content && slug === 'graphql' ? (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <GraphqlPlayground lang={lang} initialCode={getActivePlaygroundCode(['graphql'])} />
          </div>
        ) : content && (slug === 'php' || slug === 'laravel' || slug === 'codeigniter4') ? (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <PhpPlayground lang={lang} initialCode={getActivePlaygroundCode(['php'])} />
          </div>
        ) : content && slug === 'csharp' ? (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <CsharpPlayground lang={lang} initialCode={getActivePlaygroundCode(['csharp', 'cs'])} />
          </div>
        ) : content && slug === 'python' ? (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <PythonPlayground lang={lang} initialCode={getActivePlaygroundCode(['python', 'py'])} />
          </div>
        ) : content && slug === 'rails' ? (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <RubyPlayground lang={lang} initialCode={getActivePlaygroundCode(['ruby', 'rb', 'erb', 'javascript', 'js'])} />
          </div>
        ) : content && slug === 'react' ? (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <ReactPlayground lang={lang} initialCode={getActivePlaygroundCode(['jsx', 'tsx', 'javascript', 'js'])} />
          </div>
        ) : content && slug === 'vue' ? (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <VuePlayground lang={lang} initialCode={getActivePlaygroundCode(['vue', 'html', 'javascript', 'js', 'ts'])} />
          </div>
        ) : content && slug === 'svelte' ? (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <SveltePlayground lang={lang} initialCode={getActivePlaygroundCode(['svelte', 'html', 'javascript', 'js', 'ts'])} />
          </div>
        ) : content && (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <React.Suspense fallback={null}>
              <InlinePlayground
                lang={lang}
                initialCode={getActivePlaygroundCode(INLINE_FENCES[slug] || [])}
                language={slug}
                week={activeWeek}
                onClose={() => {}}
                inline
              />
            </React.Suspense>
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        trackName={track.name}
        trackSlug={slug}
        lang={lang}
      />

      {/* AI Mentor Drawer */}
      <AiMentorDrawer
        isOpen={isMentorOpen}
        onClose={() => setIsMentorOpen(false)}
        trackName={track.name}
        topicTitle={currentWeek ? (isId ? currentWeek.titleId : currentWeek.titleEn) : track.name}
        currentCode={overrideCode || extractCode(content)}
        lang={lang}
      />
    </div>
  );
};

export default CoursePage;
