import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; import { faTimes, faSearch, faShoppingBag, faArrowRight, faStar, faCode, faPlay, faGear, faGlobe, faSun, faMoon, faCheck } from '@fortawesome/free-solid-svg-icons';
import { translations, Language, Theme } from '../utils/translations';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  onRemoveItem: (index: number) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
}) => {
  const total = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer Content */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 w-full max-w-md bg-[#FBF9F5] h-full shadow-2xl p-6 flex flex-col justify-between border-l border-[#2E5B44]/20"
          >
            <div>
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faShoppingBag} className="w-5 h-5 text-[#2E5B44]" />
                  <h2 className="text-xl font-bold font-flpcart text-zinc-900">Enrolled Tutorials</h2>
                  <span className="bg-[#2E5B44] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {cartItems.length}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-200/60 rounded-full text-zinc-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-16 text-zinc-500">
                  <FontAwesomeIcon icon={faCode} className="w-12 h-12 mx-auto mb-3 opacity-40 text-[#2E5B44]" />
                  <p className="font-bold text-sm text-zinc-800">No tracks added yet.</p>
                  <p className="text-xs text-zinc-500 mt-1">Explore Tryngo interactive tracks and playgrounds!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {cartItems.map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-zinc-200/80 shadow-xs"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="track-logo-img w-16 h-16 rounded-xl object-contain p-2 bg-zinc-50 border border-zinc-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-zinc-900 truncate">{item.name}</h4>
                        <p className="text-xs text-zinc-500">{item.category}</p>
                        <span className="text-xs font-black text-[#2E5B44]">${item.price}</span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-xs text-red-600 hover:text-red-800 font-semibold p-1"
                      >
                        Remove
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-zinc-200 pt-4 space-y-3">
                <div className="flex justify-between items-center font-bold text-lg text-zinc-900">
                  <span>Total Investment:</span>
                  <span className="text-[#2E5B44] font-flpcart text-2xl">${total}</span>
                </div>
                <button
                  onClick={() => {
                    alert('Welcome to Tryngo! Starting your interactive learning session.');
                    onClose();
                  }}
                  className="w-full bg-[#2E5B44] hover:bg-[#234735] text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-98"
                >
                  <span>Start Learning Now</span>
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import { SearchEntry, searchCourseContent } from '../utils/search';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  tracks: any[];
  onSelectTrack: (track: any) => void;
  onApplyFilters: () => void;
  lang: 'id' | 'en';
  onStartCourse?: (trackId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
  tracks,
  onSelectTrack,
  onApplyFilters,
  lang,
  onStartCourse,
}) => {
  const t = translations[lang];

  const [searchTab, setSearchTab] = useState<'tracks' | 'content'>('tracks');
  const [contentResults, setContentResults] = useState<SearchEntry[]>([]);
  const [contentLoading, setContentLoading] = useState(false);
  const searchTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const searchSeqRef = React.useRef(0);

  const categoryFilters = [
    { id: 'all', label: t.allCategory },
    { id: 'frontend', label: t.frontendCat },
    { id: 'backend', label: t.backendCat },
    { id: 'fullstack', label: t.fullstackCat },
    { id: 'database', label: t.databaseCat },
    { id: 'devops', label: t.devopsCat },
  ];

  const sortOptions = [
    { id: 'default', label: t.recommendation },
    { id: 'name-asc', label: t.nameAsc },
    { id: 'name-desc', label: t.nameDesc },
    { id: 'price-asc', label: t.priceAsc },
    { id: 'price-desc', label: t.priceDesc },
    { id: 'stock-desc', label: t.stockDesc },
  ];

  const resetAllFilters = () => {
    setSearchQuery('');
    setSortBy('default');
    setSelectedCategory('all');
  };

  // Course content search
  React.useEffect(() => {
    if (searchTab !== 'content' || !searchQuery.trim()) {
      setContentResults([]);
      setContentLoading(false);
      return;
    }

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    const seq = ++searchSeqRef.current;

    searchTimerRef.current = setTimeout(async () => {
      setContentLoading(true);
      try {
        const results = await searchCourseContent(searchQuery, { lang, limit: 15 });
        if (searchSeqRef.current !== seq) return;
        setContentResults(results);
      } catch {
        if (searchSeqRef.current !== seq) return;
        setContentResults([]);
      }
      if (searchSeqRef.current === seq) setContentLoading(false);
    }, 300);

    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [searchQuery, searchTab, lang]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-12 p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Card Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative z-10 w-full max-w-2xl bg-[#FBF9F5] rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 border border-[#2E5B44]/20 my-auto max-h-[88vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center shrink-0 pb-1">
              <div className="flex gap-1 shrink-0 bg-zinc-100 rounded-xl p-1">
                <button
                  onClick={() => setSearchTab('tracks')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                    searchTab === 'tracks'
                      ? 'bg-white text-zinc-900 shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-700'
                  }`}
                >
                  {t.searchTabTracks}
                </button>
                <button
                  onClick={() => setSearchTab('content')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                    searchTab === 'content'
                      ? 'bg-white text-zinc-900 shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-700'
                  }`}
                >
                  {t.searchTabContent}
                </button>
              </div>

              <div className="flex items-center gap-2">
                {(searchQuery || sortBy !== 'default' || selectedCategory !== 'all') && (
                  <button
                    onClick={resetAllFilters}
                    className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-full transition-colors"
                  >
                    Reset
                  </button>
                )}
                <button 
                  onClick={onClose} 
                  className="p-1.5 hover:bg-zinc-200/60 rounded-full text-zinc-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Input Search Field */}
            <div className="relative shrink-0">
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5 text-[#2E5B44] absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full pl-12 pr-10 py-3 bg-white rounded-2xl border border-zinc-200 focus:border-[#2E5B44] text-zinc-900 text-sm focus:outline-none transition-all shadow-2xs font-medium"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-700"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Tracks Tab: Filter & Sort Controls */}
            {searchTab === 'tracks' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0 pt-1 border-t border-zinc-200/80">
                  <div>
                    <label className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider block mb-1">
                      {t.categoryLabel}
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-zinc-200 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#2E5B44] shadow-2xs cursor-pointer"
                    >
                      {categoryFilters.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider block mb-1">
                      {t.sortByLabel}
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-zinc-200 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#2E5B44] shadow-2xs cursor-pointer"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between shrink-0 pt-1">
                  <span className="text-xs font-medium text-zinc-500">
                    <span className="text-[#2E5B44] font-bold">{tracks.length}</span> {lang === 'id' ? 'tersedia' : 'available'}
                  </span>
                  <button
                    onClick={() => {
                      onApplyFilters();
                      onClose();
                    }}
                    className="bg-[#2E5B44] hover:bg-[#234735] text-white text-xs px-4 py-2 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                  >
                    <FontAwesomeIcon icon={faSearch} className="w-3.5 h-3.5" />
                    <span>Search</span>
                  </button>
                </div>
              </>
            )}

            {/* Content Tab: Info */}
            {searchTab === 'content' && searchQuery && (
              <div className="shrink-0">
                <span className="text-xs font-bold text-zinc-600">
                  {lang === 'id' ? 'Mencari di' : 'Searching'}{' '}
                  <span className="text-[#2E5B44] font-black">864</span>{' '}
                  {lang === 'id' ? 'materi kursus' : 'course materials'}
                </span>
              </div>
            )}

            {/* Live Search Results List */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-1 pr-1 border-t border-zinc-200/80 pt-2">
              {/* TRACKS results */}
              {searchTab === 'tracks' && tracks.length === 0 && (
                <div className="text-center py-8 text-zinc-500">
                  <FontAwesomeIcon icon={faCode} className="w-10 h-10 mx-auto mb-2 opacity-40 text-[#2E5B44]" />
                  <p className="font-bold text-xs text-zinc-800">
                    {lang === 'id' ? 'Tidak ada hasil.' : 'No matching results.'}
                  </p>
                </div>
              )}

              {searchTab === 'tracks' && tracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => {
                    if (onStartCourse) {
                      onStartCourse(track.id);
                      onClose();
                    } else {
                      onSelectTrack(track);
                      onClose();
                    }
                  }}
                  className="flex items-center justify-between py-2 px-3 hover:bg-zinc-100 rounded-xl cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={track.image} 
                      alt={track.name} 
                      className="track-logo-img w-6 h-6 object-contain shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-sm font-semibold text-zinc-800 group-hover:text-[#2E5B44] transition-colors truncate">
                      {track.name}
                    </span>
                  </div>

                  <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#2E5B44] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}

              {/* CONTENT results */}
              {searchTab === 'content' && contentLoading && (
                <div className="flex items-center justify-center py-10 text-zinc-400">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#2E5B44] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-medium">{t.searchIndexLoading}</span>
                  </div>
                </div>
              )}

              {searchTab === 'content' && !contentLoading && contentResults.length === 0 && searchQuery && (
                <div className="text-center py-8 text-zinc-500">
                  <FontAwesomeIcon icon={faSearch} className="w-10 h-10 mx-auto mb-2 opacity-40 text-[#2E5B44]" />
                  <p className="font-bold text-xs text-zinc-800">
                    {lang === 'id' ? 'Tidak ada hasil untuk' : 'No results for'} "{searchQuery}"
                  </p>
                </div>
              )}

              {searchTab === 'content' && !contentLoading && contentResults.map((entry, idx) => (
                <div
                  key={`${entry.slug}-${entry.level}-${entry.week}-${entry.lang}-${idx}`}
                  onClick={() => {
                    if (onStartCourse) {
                      const trackId = `tryngo-lang-${entry.slug}`;
                      onStartCourse(trackId);
                      onClose();
                    }
                  }}
                  className="flex items-center justify-between py-2 px-3 hover:bg-zinc-100 rounded-xl cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[10px] font-black uppercase text-[#2E5B44] bg-[#2E5B44]/10 px-1.5 py-0.5 rounded shrink-0">
                      {entry.trackName}
                    </span>
                    <span className="text-xs font-semibold text-zinc-800 group-hover:text-[#2E5B44] transition-colors truncate">
                      {entry.title}
                    </span>
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#2E5B44] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

export const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, product }) => {
  return (
    <AnimatePresence>
      {isOpen && product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative z-10 w-full max-w-2xl bg-[#FBF9F5] rounded-3xl p-6 shadow-2xl overflow-hidden border border-[#2E5B44]/20"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-zinc-700 shadow-sm"
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="track-logo-img w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
              </div>

              <div className="flex flex-col justify-between space-y-4">
                <div>
                  <span className="bg-[#2E5B44]/10 text-[#2E5B44] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.category || 'Interactive Tutorial'}
                  </span>
                  <h2 className="text-2xl font-bold text-zinc-900 font-flpcart mt-2">{product.name}</h2>
                  <p className="text-zinc-600 text-xs mt-2 leading-relaxed">{product.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-zinc-500 font-bold uppercase">Tuition Fee</span>
                    <span className="text-3xl font-black text-[#2E5B44] font-flpcart">${product.price || 189}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-zinc-600 border-t border-zinc-200 pt-3">
                    <span>Playground Seats:</span>
                    <span className="font-bold text-zinc-900">158 Spots Open</span>
                  </div>

                  <button
                    onClick={() => {
                      alert('Launching interactive Tryngo code playground!');
                      onClose();
                    }}
                    className="w-full bg-[#2E5B44] hover:bg-[#234735] text-white py-3 rounded-2xl font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <FontAwesomeIcon icon={faPlay} className="w-4 h-4 text-white" />
                    <span>Launch Interactive Playground</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  lang,
  setLang,
  theme,
  setTheme,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`relative z-10 w-full max-w-sm rounded-2xl p-5 shadow-2xl border transition-colors ${
              theme === 'dark' 
                ? 'bg-[#1E2228] text-white border-zinc-700' 
                : 'bg-[#FBF9F5] text-zinc-900 border-[#2E5B44]/20'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200 dark:border-zinc-700">
              <h3 className="text-sm font-bold tracking-tight">
                {lang === 'id' ? 'Pengaturan' : 'Settings'}
              </h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-zinc-200/60 dark:hover:bg-zinc-700 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* 1. Language Option */}
              <div>
                <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                  {lang === 'id' ? 'Bahasa' : 'Language'}
                </span>
                
                <div className="grid grid-cols-2 gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl">
                  <button
                    onClick={() => setLang('id')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center ${
                      lang === 'id'
                        ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    <span>Bahasa Indonesia</span>
                  </button>

                  <button
                    onClick={() => setLang('en')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center ${
                      lang === 'en'
                        ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    <span>English</span>
                  </button>
                </div>
              </div>

              {/* 2. Theme Option */}
              <div>
                <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                  {lang === 'id' ? 'Tema' : 'Theme'}
                </span>

                <div className="grid grid-cols-2 gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl">
                  <button
                    onClick={() => setTheme('light')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      theme === 'light'
                        ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    <FontAwesomeIcon icon={faSun} className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light</span>
                  </button>

                  <button
                    onClick={() => setTheme('dark')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      theme === 'dark'
                        ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    <FontAwesomeIcon icon={faMoon} className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Dark</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

