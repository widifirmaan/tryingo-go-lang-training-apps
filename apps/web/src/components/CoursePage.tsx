import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; import { faArrowLeft, faBookOpen, faChevronDown, faCode } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../utils/translations';
import { TRACKS_COLLECTION } from '../data/tracksData';
import { getCurriculum } from '../data/curriculum';
import { SLUG_MAP } from '../data/slugMap';

const InlinePlayground = React.lazy(() => import('./CodePlayground'));

const extractCode = (markdown: string): string => {
  const regex = /```(?:\w+)?\n([\s\S]*?)```/;
  const match = regex.exec(markdown);
  return match ? match[1].trim() : '';
};

interface CoursePageProps {
  trackId: string;
  lang: Language;
  onBack: () => void;
  onOpenPlayground?: (code: string) => void;
  initialLevel?: string;
  initialWeek?: number;
  onNavigate?: (trackId: string, level: string, week: number) => void;
}

export const CoursePage: React.FC<CoursePageProps> = ({ trackId, lang, onBack, onOpenPlayground, initialLevel, initialWeek, onNavigate }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState(() => {
    const s = SLUG_MAP[trackId] || trackId.replace('tryngo-lang-', '');
    const lvls = getCurriculum(s);
    if (initialLevel && lvls.some(l => l.levelId === initialLevel)) return initialLevel;
    return lvls[0]?.levelId || 'beginer';
  });
  const [activeWeek, setActiveWeek] = useState(initialWeek || 1);
  const [showLevelPicker, setShowLevelPicker] = useState(false);
  const [leftWidth, setLeftWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const isId = lang === 'id';
  const track = TRACKS_COLLECTION.find(t => t.id === trackId);
  const slug = SLUG_MAP[trackId] || trackId.replace('tryngo-lang-', '');
  const levels = getCurriculum(slug);

  const currentLevel = levels.find(l => l.levelId === activeLevel);
  const currentWeek = currentLevel?.weeks.find(w => w.week === activeWeek);

  const getFilePath = useCallback(() => {
    if (!currentWeek) return '';
    const topic = isId ? currentWeek.topicId : currentWeek.topicId;
    const fileName = `week${activeWeek}-${topic}.md`;
    return `/data/course/${slug}/${activeLevel}/${lang}/${fileName}`;
  }, [slug, activeLevel, activeWeek, lang, isId, currentWeek]);

  const loadRef = useRef<{ abort: AbortController } | null>(null);

  const loadContent = useCallback(() => {
    const path = getFilePath();
    if (!path) return;
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
    setActiveLevel(levelId);
    setActiveWeek(1);
    setShowLevelPicker(false);
    onNavigate?.(trackId, levelId, 1);
  };

  const handleWeekChange = (week: number) => {
    setActiveWeek(week);
    onNavigate?.(trackId, activeLevel, week);
  };

  if (!track) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Track not found
      </div>
    );
  }

  const levelInfo = levels.find(l => l.levelId === activeLevel);
  const levelName = isId ? levelInfo?.nameId : levelInfo?.nameEn;

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

        {/* Level Picker */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowLevelPicker(!showLevelPicker)}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-xs hover:bg-white dark:hover:bg-zinc-700 transition-all text-xs sm:text-sm font-bold"
          >
            <span className="hidden sm:inline">{levelName}</span>
            <span className="sm:hidden">{levels.length > 1 ? `Lv.${levels.findIndex(l => l.levelId === activeLevel) + 1}` : levelName}</span>
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
        {currentLevel?.weeks.map((w) => (
          <button
            key={w.week}
            onClick={() => handleWeekChange(w.week)}
            className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold whitespace-nowrap transition-all border ${
              activeWeek === w.week
                ? 'bg-[#2E5B44] text-white border-[#2E5B44] shadow-xs'
                : 'bg-white/60 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-700'
            }`}
          >
            <span className="sm:hidden">W{w.week}</span>
            <span className="hidden sm:inline">{isId ? w.titleId : w.titleEn}</span>
          </button>
        ))}


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
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
        {content && (
          <div className="h-dvh lg:h-auto lg:flex-1 lg:min-h-0 rounded-[28px] overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md">
            <React.Suspense fallback={null}>
              <InlinePlayground
                lang={lang}
                initialCode={extractCode(content)}
                language={slug}
                week={activeWeek}
                onClose={() => {}}
                inline
              />
            </React.Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
