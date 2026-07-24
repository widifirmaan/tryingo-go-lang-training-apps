import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Settings, Share2, Play, ChevronLeft, Menu, X, BookOpen, Sparkles, Home, ShoppingBag } from 'lucide-react';
import ghibliHeroImg from '../assets/images/ghibli_hero_coder_1784795662142.jpg';
import { translations, Language } from '../utils/translations';
import { TRACKS_COLLECTION } from '../data/tracksData';
import { CURRICULUM_LEVELS, LEVEL_BADGE_COLORS } from '../data/curriculum';

interface HeroSectionProps {
  onOpenSearch: () => void;
  onOpenFilter: () => void;
  onOpenSettings: () => void;
  onOpenCollection: () => void;
  isExploring?: boolean;
  onBackToHero?: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
  lang?: Language;
  activeCourseId?: string | null;
  onNavigateToWeek?: (trackId: string, level: string, week: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSearch,
  onOpenFilter,
  onOpenSettings,
  onOpenCollection,
  isExploring = false,
  onBackToHero,
  cartCount = 0,
  onOpenCart,
  lang = 'id',
  activeCourseId,
  onNavigateToWeek,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);
  const t = translations[lang];

  useEffect(() => {
    if (activeCourseId) {
      setActiveSubmenu('materi');
      setExpandedTrack(activeCourseId);
    }
  }, [activeCourseId]);

  return (
    <motion.div 
      layout
      transition={{ type: "spring", stiffness: 220, damping: 25 }}
      className="relative w-full h-full bg-[#2E5B44] dark:bg-[#12221A] text-white rounded-[28px] overflow-hidden flex flex-col justify-between p-3 sm:p-4 lg:p-5 shadow-xl border border-[#234735] dark:border-zinc-800 select-none"
    >
      <AnimatePresence mode="wait">
        {/* ----------------------------------------------------------------------- */}
        {/* 1. SIDEBAR MODE CONTENT (Visible on desktop/landscape when isExploring) */}
        {/* ----------------------------------------------------------------------- */}
        {isExploring ? (
          <motion.div 
            key="sidebar-mode-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full flex flex-col justify-between"
          >
            {/* Desktop/Landscape Sidebar View */}
            <div className="hidden lg:flex landscape:flex flex-col h-full w-full">
              <div className="flex flex-col gap-4 flex-shrink-0">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowExitModal(true)}
                      className="bg-white p-1 rounded-full shadow-md flex items-center justify-center cursor-pointer"
                    >
                      <div className="w-8 h-8 bg-[#234735] rounded-full flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                          <div className="bg-[#A4CBB5] rounded-tl-full rounded-br-sm"></div>
                          <div className="bg-white rounded-tr-full rounded-bl-sm"></div>
                          <div className="bg-white rounded-bl-full rounded-tr-sm"></div>
                          <div className="bg-[#EEDBB2] rounded-br-full rounded-tl-sm"></div>
                        </div>
                      </div>
                    </motion.div>
                    <div className="flex flex-col">
                      <span className="font-flpcart text-xl font-black tracking-wide leading-none">
                        TRYNGO
                      </span>
                      <span className="text-[9px] text-[#EEDBB2] uppercase tracking-widest font-bold">Playground Sidebar</span>
                    </div>
                  </div>

                  {onBackToHero && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onBackToHero}
                      className="w-9 h-9 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
                      title="Expand Hero"
                    >
                      <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                    </motion.button>
                  )}
                </div>

                <hr className="border-white/10 my-1" />

                {/* Navigation Options */}
                <div className="flex flex-col gap-1">
                  {/* Home */}
                  {onBackToHero && (
                    <motion.button
                      whileHover={{ scale: 1.02, x: 3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onBackToHero}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2.5 transition-colors"
                    >
                      <Home className="w-4 h-4 text-[#EEDBB2]" />
                      <span>{lang === 'id' ? 'Beranda' : 'Home'}</span>
                    </motion.button>
                  )}

                  {/* Tech News */}
                  <motion.button
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => window.open('https://news.ycombinator.com', '_blank')}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2.5 transition-colors"
                  >
                    <span className="text-base">📰</span>
                    <span>Tech News</span>
                  </motion.button>

                  {/* Materi with submenu */}
                  <div className="flex flex-col">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveSubmenu(activeSubmenu === 'materi' ? null : 'materi')}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-[#EEDBB2]" />
                        <span>Materi</span>
                      </div>
                      <span className="text-[9px] opacity-60">{activeSubmenu === 'materi' ? '▲' : '▼'}</span>
                    </motion.button>
                    <AnimatePresence>
                      {activeSubmenu === 'materi' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden flex flex-col ml-3 mt-0.5 gap-0.5 max-h-[400px] overflow-y-auto"
                        >
                          {TRACKS_COLLECTION.map(track => (
                            <div key={track.id} className="flex flex-col">
                              <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setExpandedTrack(expandedTrack === track.id ? null : track.id)}
                                className="w-full px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 text-[11px] font-bold flex items-center justify-between transition-colors"
                              >
                                <span>{track.name}</span>
                                <span className="text-[9px] opacity-60">{expandedTrack === track.id ? '▲' : '▼'}</span>
                              </motion.button>
                              <AnimatePresence>
                                {expandedTrack === track.id && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="overflow-hidden flex flex-col ml-2 gap-0.5"
                                  >
                                    {CURRICULUM_LEVELS.map(level => (
                                      <div key={level.levelId} className="flex flex-col">
                                        <div className="px-3 py-1 text-[10px] text-white/50 uppercase tracking-wider font-bold">
                                          {lang === 'id' ? level.nameId : level.nameEn}
                                        </div>
                                        {level.weeks.map(week => (
                                          <motion.button
                                            key={week.week}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => {
                                              setExpandedTrack(null);
                                              onNavigateToWeek?.(track.id, level.levelId, week.week);
                                            }}
                                            className="w-full pl-6 pr-3 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 text-[10px] font-medium text-left flex items-center gap-1.5 transition-colors"
                                          >
                                            <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                                            {lang === 'id' ? week.titleId : week.titleEn}
                                          </motion.button>
                                        ))}
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Quiz with submenu */}
                  <div className="flex flex-col">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveSubmenu(activeSubmenu === 'quiz' ? null : 'quiz')}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🧪</span>
                        <span>Quiz</span>
                      </div>
                      <span className="text-[9px] opacity-60">{activeSubmenu === 'quiz' ? '▲' : '▼'}</span>
                    </motion.button>
                    <AnimatePresence>
                      {activeSubmenu === 'quiz' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden flex flex-col ml-3 mt-0.5 gap-0.5"
                        >
                          <motion.button whileTap={{ scale: 0.97 }} className="w-full pl-7 pr-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 text-[11px] font-medium flex items-center gap-2 transition-colors text-left">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                            HTML5 Beginner Quiz
                          </motion.button>
                          <motion.button whileTap={{ scale: 0.97 }} className="w-full pl-7 pr-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 text-[11px] font-medium flex items-center gap-2 transition-colors text-left">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                            Go Beginner Quiz
                          </motion.button>
                          <motion.button whileTap={{ scale: 0.97 }} className="w-full pl-7 pr-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 text-[11px] font-medium flex items-center gap-2 transition-colors text-left">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            Go Intermediate Quiz
                          </motion.button>
                          <motion.button whileTap={{ scale: 0.97 }} className="w-full pl-7 pr-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 text-[11px] font-medium flex items-center gap-2 transition-colors text-left">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                            Go Advanced Quiz
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Online IDE with submenu */}
                  <div className="flex flex-col">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveSubmenu(activeSubmenu === 'ide' ? null : 'ide')}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">💻</span>
                        <span>Online IDE</span>
                      </div>
                      <span className="text-[9px] opacity-60">{activeSubmenu === 'ide' ? '▲' : '▼'}</span>
                    </motion.button>
                    <AnimatePresence>
                      {activeSubmenu === 'ide' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden flex flex-col ml-3 mt-0.5 gap-0.5"
                        >
                          <motion.button whileTap={{ scale: 0.97 }} className="w-full pl-7 pr-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 text-[11px] font-medium flex items-center gap-2 transition-colors text-left">
                            <span className="text-sm">🐹</span>
                            Go Playground
                          </motion.button>
                          <motion.button whileTap={{ scale: 0.97 }} className="w-full pl-7 pr-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 text-[11px] font-medium flex items-center gap-2 transition-colors text-left">
                            <span className="text-sm">🌐</span>
                            HTML / CSS Playground
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <hr className="border-white/10 my-1" />

                  {/* Search */}
                  <motion.button
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onOpenSearch}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2.5 transition-colors"
                  >
                    <Search className="w-4 h-4 text-[#EEDBB2]" />
                    <span>{lang === 'id' ? 'Cari' : 'Search'}</span>
                  </motion.button>

                  {/* Filter */}
                  <motion.button
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onOpenFilter}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2.5 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-[#EEDBB2]" />
                    <span>Filter</span>
                  </motion.button>

                  {/* Support */}
                  <motion.button
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => window.open('https://github.com/anomalyco/tryingo-go-lang-training-apps', '_blank')}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2.5 transition-colors"
                  >
                    <span className="text-base">💚</span>
                    <span>Support</span>
                  </motion.button>
                </div>
              </div>

              {/* Divider above card */}
              <hr className="border-white/10 my-1" />

              {/* Bottom Card Preview - fills remaining space */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex-1 min-h-0 p-3 bg-black/20 backdrop-blur-xs rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/30 shadow-md">
                  <img 
                    src={ghibliHeroImg} 
                    alt="Ghibli Student" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] font-extrabold text-[#EEDBB2] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" /> ACTIVE TRACK
                  </span>
                  <span className="text-xs font-bold text-white line-clamp-1">Zero to Professional</span>
                  <span className="text-[10px] text-emerald-200">6 Interactive Modules</span>
                </div>
              </motion.div>

              {/* Footer */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-medium text-emerald-200">Tryngo v2.4</span>
                {onBackToHero && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onBackToHero}
                    className="text-xs text-[#EEDBB2] hover:underline font-bold"
                  >
                    Close Sidebar
                  </motion.button>
                )}
              </div>
            </div>

            {/* Mobile/Portrait Navbar View */}
            <div className="lg:hidden landscape:hidden relative z-30 w-full flex flex-col gap-2">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  {onBackToHero && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onBackToHero}
                      className="w-8 h-8 sm:w-9 sm:h-9 bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors"
                      title="Return to Hero"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    </motion.button>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowExitModal(true)}
                    className="bg-white p-1 rounded-full shadow-xs flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#234735] rounded-full flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                        <div className="bg-[#A4CBB5] rounded-tl-full rounded-br-sm"></div>
                        <div className="bg-white rounded-tr-full rounded-bl-sm"></div>
                        <div className="bg-white rounded-bl-full rounded-tr-sm"></div>
                        <div className="bg-[#EEDBB2] rounded-br-full rounded-tl-sm"></div>
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex flex-col">
                    <span className="font-flpcart text-base sm:text-lg font-black tracking-wide leading-none">TRYNGO</span>
                    <span className="text-[9px] text-[#EEDBB2] uppercase tracking-wider font-bold">Playground</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onOpenSearch}
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors"
                    title="Search"
                  >
                    <Search className="w-4 h-4 stroke-[2.5]" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onOpenSettings}
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors"
                    title={t.heroSettingsTitle}
                  >
                    <Settings className="w-4 h-4 stroke-[2.5]" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white transition-colors border ${
                      isMobileMenuOpen
                        ? 'bg-white text-[#2E5B44] border-white shadow-md'
                        : 'bg-white/20 hover:bg-white/30 border-white/40'
                    }`}
                    title="Menu"
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <Menu className="w-5 h-5 stroke-[2.5]" />
                    )}
                  </motion.button>
                </div>
              </div>

              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="mt-2 w-full bg-[#234735] text-white rounded-[20px] p-3 border border-white/20 shadow-xl flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto"
                  >
                    {onBackToHero && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setIsMobileMenuOpen(false); onBackToHero(); }}
                        className="w-full px-3 py-2 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center gap-2"
                      >
                        <Home className="w-4 h-4 text-[#EEDBB2]" />
                        <span>{lang === 'id' ? 'Beranda' : 'Home'}</span>
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setIsMobileMenuOpen(false); window.open('https://news.ycombinator.com', '_blank'); }}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center gap-2"
                    >
                      <span className="text-sm">📰</span>
                      <span>Tech News</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveSubmenu(activeSubmenu === 'materi-mobile' ? null : 'materi-mobile')}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#EEDBB2]" />
                        <span>Materi</span>
                      </div>
                      <span className="text-[9px]">{activeSubmenu === 'materi-mobile' ? '▲' : '▼'}</span>
                    </motion.button>
                    <AnimatePresence>
                      {activeSubmenu === 'materi-mobile' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden flex flex-col ml-2 gap-0.5">
                          {TRACKS_COLLECTION.map(track => (
                            <div key={track.id} className="flex flex-col">
                              <button
                                onClick={() => setExpandedTrack(expandedTrack === track.id ? null : track.id)}
                                className="w-full px-3 py-1.5 rounded-lg bg-white/5 text-white/70 text-[11px] font-bold flex items-center justify-between"
                              >
                                <span>{track.name}</span>
                                <span className="text-[9px]">{expandedTrack === track.id ? '▲' : '▼'}</span>
                              </button>
                              {expandedTrack === track.id && (
                                <div className="flex flex-col ml-2 gap-0.5">
                                  {CURRICULUM_LEVELS.map(level => (
                                    <div key={level.levelId}>
                                      <div className="px-3 py-1 text-[9px] text-white/40 uppercase tracking-wider font-bold">
                                        {lang === 'id' ? level.nameId : level.nameEn}
                                      </div>
                                      {level.weeks.map(week => (
                                        <button
                                          key={week.week}
                                          onClick={() => {
                                            setExpandedTrack(null);
                                            onNavigateToWeek?.(track.id, level.levelId, week.week);
                                          }}
                                          className="w-full pl-6 pr-3 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 text-[10px] font-medium text-left flex items-center gap-1.5"
                                        >
                                          <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                                          {lang === 'id' ? week.titleId : week.titleEn}
                                        </button>
                                      ))}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveSubmenu(activeSubmenu === 'quiz-mobile' ? null : 'quiz-mobile')}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🧪</span>
                        <span>Quiz</span>
                      </div>
                      <span className="text-[9px]">{activeSubmenu === 'quiz-mobile' ? '▲' : '▼'}</span>
                    </motion.button>
                    <AnimatePresence>
                      {activeSubmenu === 'quiz-mobile' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden flex flex-col ml-2 gap-0.5">
                          {['HTML5 Beginner Quiz', 'Go Beginner Quiz', 'Go Intermediate Quiz', 'Go Advanced Quiz'].map(q => (
                            <button key={q} className="w-full pl-6 pr-3 py-1.5 rounded-lg bg-white/5 text-white/70 text-[11px] font-medium text-left">{q}</button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveSubmenu(activeSubmenu === 'ide-mobile' ? null : 'ide-mobile')}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">💻</span>
                        <span>Online IDE</span>
                      </div>
                      <span className="text-[9px]">{activeSubmenu === 'ide-mobile' ? '▲' : '▼'}</span>
                    </motion.button>
                    <AnimatePresence>
                      {activeSubmenu === 'ide-mobile' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden flex flex-col ml-2 gap-0.5">
                          <button className="w-full pl-6 pr-3 py-1.5 rounded-lg bg-white/5 text-white/70 text-[11px] font-medium text-left flex items-center gap-2"><span className="text-sm">🐹</span>Go Playground</button>
                          <button className="w-full pl-6 pr-3 py-1.5 rounded-lg bg-white/5 text-white/70 text-[11px] font-medium text-left flex items-center gap-2"><span className="text-sm">🌐</span>HTML / CSS Playground</button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <hr className="border-white/10 my-0.5" />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setIsMobileMenuOpen(false); onOpenSearch(); }}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center gap-2"
                    >
                      <Search className="w-4 h-4 text-[#EEDBB2]" />
                      <span>{lang === 'id' ? 'Cari' : 'Search'}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setIsMobileMenuOpen(false); onOpenFilter(); }}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center gap-2"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-[#EEDBB2]" />
                      <span>Filter</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setIsMobileMenuOpen(false); window.open('https://github.com/anomalyco/tryingo-go-lang-training-apps', '_blank'); }}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center gap-2"
                    >
                      <span className="text-sm">💚</span>
                      <span>Support</span>
                    </motion.button>

                    {onOpenCart && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setIsMobileMenuOpen(false); onOpenCart(); }}
                        className="w-full px-3 py-2 rounded-xl bg-[#EEDBB2] text-[#2E5B44] text-xs font-extrabold flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4" />
                          <span>Enrolled Cart</span>
                        </div>
                        <span className="bg-[#2E5B44] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{cartCount}</span>
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* ----------------------------------------------------------------------- */
          /* 2. FULL HERO MODE CONTENT (When isExploring is false)                  */
          /* ----------------------------------------------------------------------- */
          <motion.div 
            key="full-hero-mode-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full flex flex-col justify-between"
          >
            {/* Top Navbar */}
            <nav id="navbar" aria-label="Main Navigation" className="relative z-20 flex items-center justify-between w-full">
              <div className="bg-white p-1 sm:p-1.5 rounded-full shadow-md flex items-center justify-center h-10 sm:h-12 lg:h-14 border border-white/40">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowExitModal(true)}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-[#234735] hover:bg-[#1A382A] rounded-full flex items-center justify-center transition-colors shadow-xs"
                  title="Tryngo"
                >
                  <div className="grid grid-cols-2 gap-0.5 sm:gap-1 w-4 h-4 sm:w-5 sm:h-5">
                    <div className="bg-[#A4CBB5] rounded-tl-full rounded-br-sm"></div>
                    <div className="bg-white rounded-tr-full rounded-bl-sm"></div>
                    <div className="bg-white rounded-bl-full rounded-tr-sm"></div>
                    <div className="bg-[#EEDBB2] rounded-br-full rounded-tl-sm"></div>
                  </div>
                </motion.button>
              </div>

              <div className="bg-white/95 backdrop-blur-md px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-full shadow-md flex items-center gap-1.5 sm:gap-2 h-10 sm:h-12 lg:h-14 border border-white/40">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onOpenSearch}
                  className="h-8 sm:h-10 lg:h-11 px-3 sm:px-4 lg:px-5 bg-[#234735] hover:bg-[#1A382A] text-white rounded-full flex items-center justify-center transition-colors shadow-xs"
                  title={t.heroSearchTitle}
                >
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onOpenSettings}
                  className="h-8 sm:h-10 lg:h-11 px-3 sm:px-4 lg:px-5 bg-[#234735] hover:bg-[#1A382A] text-white rounded-full flex items-center justify-center transition-colors shadow-xs"
                  title={t.heroSettingsTitle}
                >
                  <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </motion.button>
              </div>

              <div className="bg-white p-1 sm:p-1.5 rounded-full shadow-md flex items-center justify-center h-10 sm:h-12 lg:h-14 border border-white/40">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: 'Tryngo', url: window.location.href });
                    } else {
                      navigator.clipboard?.writeText(window.location.href);
                    }
                  }}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-[#234735] hover:bg-[#1A382A] text-white rounded-full flex items-center justify-center transition-colors shadow-xs"
                  title="Share"
                >
                  <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] text-white" />
                </motion.button>
              </div>
            </nav>

            {/* Decorative Dot Grid */}
            <div className="absolute top-16 right-20 z-0 opacity-80 pointer-events-none hidden md:flex flex-col gap-1.5 items-end">
              <div className="flex gap-1.5"><span className="w-2.5 h-2.5 bg-[#A4CBB5]/60 rounded-full"></span><span className="w-2.5 h-2.5 bg-[#A4CBB5]/60 rounded-full"></span><span className="w-2.5 h-2.5 bg-[#A4CBB5]/60 rounded-full"></span></div>
              <div className="flex gap-1.5"><span className="w-2.5 h-2.5 bg-white/60 rounded-full"></span><span className="w-2.5 h-2.5 bg-white/60 rounded-full"></span><span className="w-2.5 h-2.5 bg-white/60 rounded-full"></span><span className="w-2.5 h-2.5 bg-white/60 rounded-full"></span><span className="w-2.5 h-2.5 bg-white/60 rounded-full"></span></div>
              <div className="flex gap-1.5"><span className="w-2.5 h-2.5 bg-[#EEDBB2]/70 rounded-full"></span><span className="w-2.5 h-2.5 bg-[#EEDBB2]/70 rounded-full"></span><span className="w-2.5 h-2.5 bg-[#EEDBB2]/70 rounded-full"></span><span className="w-2.5 h-2.5 bg-[#EEDBB2]/70 rounded-full"></span><span className="w-2.5 h-2.5 bg-[#EEDBB2]/70 rounded-full"></span></div>
            </div>

            {/* Hero Main Content */}
            <div className="relative z-10 my-auto flex-1 flex items-center justify-center py-2 sm:py-3 lg:py-4">
              <div className="grid grid-cols-1 landscape:grid-cols-12 lg:grid-cols-12 items-center gap-3 sm:gap-4 lg:gap-6 w-full">
                {/* Illustration */}
                <div className="landscape:col-span-5 lg:col-span-5 relative flex justify-center lg:justify-start items-center">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative w-full max-w-[200px] sm:max-w-[260px] landscape:max-w-[220px] lg:max-w-[380px] xl:max-w-[420px] aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/5] rounded-2xl overflow-hidden drop-shadow-2xl border-2 border-white/20"
                  >
                    <img 
                      src={ghibliHeroImg} 
                      alt="Tryngo Ghibli Coder Student"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>

                {/* Typography */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-end text-center lg:text-right gap-1.5 sm:gap-2 lg:gap-3 z-10">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[#EEDBB2] font-semibold text-xs sm:text-sm lg:text-base xl:text-lg tracking-wider uppercase">
                    <span>{t.heroTagline}</span>
                    <span className="text-xs sm:text-sm lg:text-base font-light">→</span>
                  </div>

                  <h1 className="font-flpcart text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[96px] leading-none font-black text-white tracking-tight drop-shadow-md">
                    TRYNGO
                  </h1>

                  <p className="max-w-xs sm:max-w-sm lg:max-w-md text-emerald-100 text-[10px] sm:text-xs lg:text-sm font-semibold tracking-wide leading-relaxed uppercase">
                    {t.heroSub}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Right GO Button */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 lg:bottom-6 lg:right-6 z-20 flex justify-end">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                onClick={onOpenCollection}
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full border-2 border-white/40 text-xs sm:text-sm lg:text-base font-extrabold flex items-center justify-center gap-1 shadow-xl group transition-colors"
                title="Go to Playground"
              >
                <span className="font-flpcart tracking-widest text-xs sm:text-sm lg:text-lg">{t.heroGo}</span>
                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 fill-white stroke-none group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowExitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center border border-zinc-200 dark:border-zinc-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-[#234735] rounded-full flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                  <div className="bg-[#A4CBB5] rounded-tl-full rounded-br-sm"></div>
                  <div className="bg-white rounded-tr-full rounded-bl-sm"></div>
                  <div className="bg-white rounded-bl-full rounded-tr-sm"></div>
                  <div className="bg-[#EEDBB2] rounded-br-full rounded-tl-sm"></div>
                </div>
              </div>
              <p className="text-sm sm:text-base font-bold text-zinc-800 dark:text-zinc-100 mb-6">
                {t.visitConfirm}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-bold transition-colors"
                >
                  {t.visitNo}
                </button>
                <button
                  onClick={() => window.open('https://widifirmaan.web.id', '_blank')}
                  className="px-5 py-2.5 rounded-xl bg-[#234735] hover:bg-[#1A382A] text-white text-sm font-bold transition-colors"
                >
                  {t.visitYes}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

