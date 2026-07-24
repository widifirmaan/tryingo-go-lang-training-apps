import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroSection } from './components/HeroSection';
import { TrackCard } from './components/TrackCard';
import { TRACKS_COLLECTION } from './data/tracksData';
import { ArrowDown, Sparkles, LayoutGrid, Filter, RotateCcw, Search } from 'lucide-react';
import { translations, Language, Theme } from './utils/translations';

const CoursePage = React.lazy(() => import('./components/CoursePage'));
const CodePlayground = React.lazy(() => import('./components/CodePlayground'));
const CartModal = React.lazy(() => import('./components/Modals').then(m => ({ default: m.CartModal })));
const SearchModal = React.lazy(() => import('./components/Modals').then(m => ({ default: m.SearchModal })));
const DetailModal = React.lazy(() => import('./components/Modals').then(m => ({ default: m.DetailModal })));
const SettingsModal = React.lazy(() => import('./components/Modals').then(m => ({ default: m.SettingsModal })));

export default function App() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Website Settings: Language & Theme (persisted in localStorage)
  const getInitialLang = (): Language => {
    try { return (localStorage.getItem('tryngo-lang') as Language) || 'id'; } catch { return 'id'; }
  };
  const getInitialTheme = (): Theme => {
    try { return (localStorage.getItem('tryngo-theme') as Theme) || 'light'; } catch { return 'light'; }
  };
  const [lang, setLang] = useState<Language>(getInitialLang);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Search, Filter, Sort States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // State for Exploring / Playground mode (triggered by GO button or Search Modal)
  const [isExploring, setIsExploring] = useState<boolean>(false);

  // Random hero track rotation
  const [heroTrackIds, setHeroTrackIds] = useState<number[]>([0, 1, 2]);

  // Active course view state
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  // Playground state
  const [playgroundCode, setPlaygroundCode] = useState<string | null>(null);
  const [playgroundLanguage, setPlaygroundLanguage] = useState<string>('html5');

  const handleStartCourse = (trackId: string) => {
    setActiveCourseId(trackId);
  };

  const handleBackFromCourse = () => {
    setActiveCourseId(null);
  };

  const handleOpenPlayground = (code?: string) => {
    if (activeCourseId) {
      setPlaygroundLanguage(activeCourseId);
      setPlaygroundCode(code || null);
    }
  };

  const handleClosePlayground = () => {
    setPlaygroundCode(null);
  };

  const t = translations[lang];

  // Clear search, filter, and state on reload
  useEffect(() => {
    setSearchQuery('');
    setSortBy('default');
    setSelectedCategory('all');
    setIsExploring(false);

    try {
      sessionStorage.removeItem('searchQuery');
      sessionStorage.removeItem('selectedCategory');
      localStorage.removeItem('searchQuery');
      localStorage.removeItem('selectedCategory');
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  // Dark Mode Class, Lang Sync & localStorage Persist
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.lang = lang === 'id' ? 'id' : 'en';
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('tryngo-lang', lang);
      localStorage.setItem('tryngo-theme', theme);
    } catch {}
  }, [theme, lang]);

  // Rotate hero tracks every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...TRACKS_COLLECTION.map((_, i) => i)]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setHeroTrackIds(shuffled);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (item: any) => {
    setCartItems((prev) => [...prev, item]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOpenCollection = () => {
    // Activate Exploring / Multi-card mode
    setIsExploring(true);
  };

  const handleBackToHero = () => {
    setIsExploring(false);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSortBy('default');
    setSelectedCategory('all');
  };

  // Filter & Sort Tracks
  const filteredTracks = useMemo(() => {
    return TRACKS_COLLECTION.filter((track) => {
      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = track.name.toLowerCase().includes(q);
        const matchesCategory = track.category.toLowerCase().includes(q);
        const matchesBadge = track.badgeText.toLowerCase().includes(q);
        const matchesDesc = track.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesBadge && !matchesDesc) {
          return false;
        }
      }

      // Category Filter
      if (selectedCategory !== 'all') {
        const cat = track.category.toLowerCase();
        if (selectedCategory === 'frontend' && !cat.includes('frontend') && !cat.includes('markup') && !cat.includes('styling') && !cat.includes('library') && !cat.includes('progressive') && !cat.includes('compile-time')) {
          return false;
        }
        if (selectedCategory === 'backend' && !cat.includes('backend') && !cat.includes('server') && !cat.includes('systems') && !cat.includes('runtime') && !cat.includes('php framework') && !cat.includes('agile web')) {
          return false;
        }
        if (selectedCategory === 'fullstack' && !cat.includes('fullstack')) {
          return false;
        }
        if (selectedCategory === 'database' && !cat.includes('database') && !cat.includes('api')) {
          return false;
        }
        if (selectedCategory === 'devops' && !cat.includes('devops') && !cat.includes('data') && !cat.includes('ai') && !cat.includes('cloud')) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'stock-desc') return b.availableStock - a.availableStock;
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const hasActiveFilters = searchQuery || sortBy !== 'default' || selectedCategory !== 'all';

  return (
    <div
      role="application"
      aria-label={t.heroTagline}
      className={`min-h-screen lg:h-screen w-full p-0 sm:p-3 md:p-4 flex flex-col font-sans antialiased overflow-y-auto lg:overflow-hidden select-none transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#121417] text-zinc-100' : 'bg-[#EFECE6] text-zinc-900'
      }`}>
      
      {/* Main Container */}
      <div className="w-full max-w-[1720px] mx-auto flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Single persistent layout container with FLIP animations */}
        <motion.div 
          layout 
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="flex flex-col lg:flex-row landscape:flex-row gap-3 sm:gap-4 md:gap-5 h-full w-full items-stretch"
        >
          
          {/* Left / Top: Hero Section Container - Resizes smoothly, never disappears */}
          <motion.div 
            layout
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className={`flex-shrink-0 flex flex-col ${
              isExploring || activeCourseId
                ? 'w-full lg:w-72 xl:w-80 landscape:w-72 h-auto lg:h-full' 
                : 'w-full lg:w-[56%] xl:w-[60%] h-dvh lg:h-full min-h-0'
            }`}
          >
            <HeroSection 
              isExploring={isExploring || !!activeCourseId}
              onBackToHero={handleBackToHero}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenFilter={() => setIsSearchOpen(true)}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenCollection={handleOpenCollection}
              cartCount={cartItems.length}
              onOpenCart={() => setIsCartOpen(true)}
              lang={lang}
              activeCourseId={activeCourseId}
            />
          </motion.div>

          {/* Right / Bottom Content Area - Expands or contracts smoothly */}
          <motion.div 
            layout
            role="main"
            aria-label={activeCourseId ? t.courseMateriNav : isExploring ? t.allTracksNav : t.heroTagline}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="flex-1 min-w-0 flex flex-col h-full overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {activeCourseId ? (
                /* MODE C: COURSE MATERIAL VIEW */
                <motion.div
                  key="course-view"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 flex flex-col h-full min-w-0 overflow-hidden"
                >
                  <Suspense fallback={<div className="flex-1 flex items-center justify-center text-zinc-400 text-sm">{t.loading}</div>}>
                    <CoursePage
                      trackId={activeCourseId}
                      lang={lang}
                      onBack={handleBackFromCourse}
                      onOpenPlayground={handleOpenPlayground}
                    />
                  </Suspense>
                </motion.div>
              ) : isExploring ? (
                /* MODE A: MULTI-CARD TRACKS SCROLL CONTAINER */
                <motion.div 
                  key="exploring-tracks"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.25 }}
                  className={`flex-1 flex flex-col h-full min-w-0 overflow-hidden rounded-[28px] p-3 sm:p-4 md:p-5 border shadow-xs transition-colors ${
                    theme === 'dark' 
                      ? 'bg-zinc-900/60 border-zinc-800 backdrop-blur-md' 
                      : 'bg-white/40 border-white/60 backdrop-blur-xs'
                  }`}
                >
                  
                  {/* Header Bar for Tracks Area */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 border-b border-zinc-200/80 dark:border-zinc-800 flex-shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#2E5B44] text-white flex items-center justify-center shadow-xs shrink-0">
                        <LayoutGrid className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h2 className="font-extrabold text-sm sm:text-base leading-none">
                            {t.tracksHeaderTitle}
                          </h2>
                          <span className="bg-[#2E5B44] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                            {filteredTracks.length} / {TRACKS_COLLECTION.length}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium truncate mt-0.5">
                          {hasActiveFilters 
                            ? `${t.activeFilter}: "${searchQuery || 'Kategori/Sort'}" (${filteredTracks.length} ${t.cardsCount})`
                            : t.tracksHeaderSub
                          }
                        </p>
                      </div>
                    </div>

                    {/* Filter & Sort Bar */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsSearchOpen(true)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                          hasActiveFilters
                            ? 'bg-[#2E5B44] text-white border-[#2E5B44] shadow-xs'
                            : theme === 'dark'
                              ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-zinc-700'
                              : 'bg-white/80 hover:bg-white text-zinc-800 border-zinc-200'
                        }`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                        <span>{t.filterAndSort}</span>
                      </button>

                      {hasActiveFilters && (
                        <button
                          onClick={handleResetFilters}
                          className="p-1.5 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 rounded-full transition-colors"
                          title={t.resetFilter}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <div className="lg:hidden landscape:hidden flex items-center gap-1.5 text-xs font-bold text-[#2E5B44] dark:text-emerald-400 bg-[#2E5B44]/10 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-[#2E5B44]/20">
                        <span>{t.scrollVertical}</span>
                        <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>

                  {/* MULTI-CARDS SCROLL SECTION */}
                  {filteredTracks.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white/60 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/80 my-2">
                      <Search className="w-10 h-10 text-zinc-400 mb-2 opacity-50" />
                      <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{t.noTracksFound}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-3 max-w-sm">
                        {t.noTracksFoundSub}
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="bg-[#2E5B44] text-white text-xs px-4 py-2 rounded-xl font-bold shadow-xs hover:bg-[#234735] transition-all"
                      >
                        {t.resetFilter}
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Desktop / Tablet Landscape: 2-ROW HORIZONTAL SCROLL (Scroll Kanan Kiri) */}
                      <div className="hidden lg:grid landscape:grid grid-rows-3 grid-flow-col auto-cols-[360px] lg:auto-cols-[380px] xl:auto-cols-[400px] overflow-x-auto gap-3.5 p-1 pb-3 flex-1 h-full min-h-0 snap-x scrollbar-thin scrollbar-thumb-[#2E5B44]/40 scrollbar-track-transparent">
                        {filteredTracks.map((track, idx) => (
                          <motion.div 
                            key={track.id} 
                            initial={{ opacity: 0, scale: 0.88 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.88 }}
                            transition={{ duration: 0.25, delay: 0.03 * Math.min(idx, 10) }}
                            className="w-full h-full snap-start flex flex-col min-h-0"
                          >
                            <TrackCard 
                              track={track}
                              onAddToCart={handleAddToCart}
                              onOpenDetails={(item) => setSelectedProduct(item)}
                              onStartCourse={(id) => handleStartCourse(id)}
                              lang={lang}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* Mobile / Tablet Portrait: VERTICAL SCROLL (Scroll Atas Bawah) */}
                      <div className="lg:hidden landscape:hidden flex flex-col sm:grid sm:grid-cols-2 gap-4 overflow-y-auto p-1 pb-4 flex-1">
                        {filteredTracks.map((track, idx) => (
                          <motion.div 
                            key={track.id} 
                            initial={{ opacity: 0, scale: 0.88 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.88 }}
                            transition={{ duration: 0.25, delay: 0.03 * Math.min(idx, 10) }}
                            className="w-full flex-shrink-0"
                          >
                            <TrackCard 
                              track={track}
                              onAddToCart={handleAddToCart}
                              onOpenDetails={(item) => setSelectedProduct(item)}
                              onStartCourse={(id) => handleStartCourse(id)}
                              lang={lang}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}

                </motion.div>
              ) : (
                /* MODE B: INITIAL HERO CARDS (hidden on mobile, full hero on small screens) */
                <motion.div 
                  key={heroTrackIds.join('-')}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:grid flex-1 grid-cols-1 gap-3 sm:gap-4 md:gap-5 h-full"
                >
                  {heroTrackIds.map((idx, i) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, delay: i * 0.05 }}
                      className="min-h-0 flex flex-col"
                    >
                      <TrackCard 
                        track={TRACKS_COLLECTION[idx]}
                        onAddToCart={handleAddToCart}
                        onOpenDetails={(item) => setSelectedProduct(item)}
                        onStartCourse={(id) => handleStartCourse(id)}
                        lang={lang}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </motion.div>

      </div>

      {/* Interactive Modals */}
      <Suspense fallback={null}>
        <CartModal 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveItem={handleRemoveFromCart}
        />
      </Suspense>

      <Suspense fallback={null}>
        <SearchModal 
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          tracks={filteredTracks}
          onSelectTrack={(item) => setSelectedProduct(item)}
          onApplyFilters={() => setIsExploring(true)}
          lang={lang}
          onStartCourse={(id) => handleStartCourse(id)}
        />
      </Suspense>

      <Suspense fallback={null}>
        <DetailModal 
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      </Suspense>

      <Suspense fallback={null}>
        <SettingsModal 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
        />
      </Suspense>

      {/* Interactive Code Playground */}
      <AnimatePresence>
        {playgroundCode !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm">
            <Suspense fallback={<div className="text-zinc-400 text-sm">{t.loading}</div>}>
              <CodePlayground
                lang={lang}
                initialCode={playgroundCode || undefined}
                language={playgroundLanguage}
                onClose={handleClosePlayground}
              />
            </Suspense>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
