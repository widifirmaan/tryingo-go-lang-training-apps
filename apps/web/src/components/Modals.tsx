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

  const quickTags = [
    'Spring Boot', 'CodeIgniter', 'MySQL', 'MongoDB', 'Redis',
    'Django', 'NestJS', 'TypeScript', 'React 19', 'Next.js',
    'Golang', 'Python', 'PostgreSQL', 'Laravel',
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

    searchTimerRef.current = setTimeout(async () => {
      setContentLoading(true);
      try {
        const results = await searchCourseContent(searchQuery, { lang, limit: 15 });
        setContentResults(results);
      } catch {
        setContentResults([]);
      }
      setContentLoading(false);
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
            <div className="flex justify-between items-center shrink-0 border-b border-zinc-200/80 pb-3">
              <div className="flex items-center gap-2 text-[#2E5B44]">
                <div className="w-8 h-8 rounded-full bg-[#2E5B44]/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-[#2E5B44]" />
                </div>
                <div>
                  <h3 className="font-flpcart font-bold text-base sm:text-lg text-zinc-900 leading-none">
                    {lang === 'id' ? 'Pencarian & Filter' : 'Search & Filter'}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    {lang === 'id'
                      ? 'Cari modul atau materi kursus sesuai kebutuhan Anda'
                      : 'Find modules or course materials matching your needs'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {(searchQuery || sortBy !== 'default' || selectedCategory !== 'all') && (
                  <button
                    onClick={resetAllFilters}
                    className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-full transition-colors"
                  >
                    {lang === 'id' ? 'Reset Filter' : 'Reset Filter'}
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

            {/* Tab Switcher: Tracks vs Content */}
            <div className="flex gap-1 shrink-0 bg-zinc-100 rounded-2xl p-1">
              <button
                onClick={() => setSearchTab('tracks')}
                className={`flex-1 text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                  searchTab === 'tracks'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                {t.searchTabTracks}
              </button>
              <button
                onClick={() => setSearchTab('content')}
                className={`flex-1 text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                  searchTab === 'content'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                {t.searchTabContent}
              </button>
            </div>

            {/* Input Search Field */}
            <div className="relative shrink-0">
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5 text-[#2E5B44] absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'id' ? 'Cari contoh: React, Golang, Python, CSS, Docker...' : 'Search e.g. React, Golang, Python, CSS, Docker...'}
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

            {/* Quick Topic Pills */}
            <div className="shrink-0 space-y-1.5">
              <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider block">
                {t.popularSearch}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className={`text-xs px-2.5 py-1 rounded-full transition-all font-semibold border ${
                      searchQuery.toLowerCase() === tag.toLowerCase()
                        ? 'bg-[#2E5B44] text-white border-[#2E5B44] shadow-2xs'
                        : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
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

                <div className="flex items-center justify-between shrink-0 pt-2">
                  <span className="text-xs font-bold text-zinc-600">
                    {lang === 'id' ? 'Menampilkan' : 'Showing'} <span className="text-[#2E5B44] font-black">{tracks.length}</span> {lang === 'id' ? 'modul ditemukan' : 'modules found'}
                  </span>
                  <button
                    onClick={() => {
                      onApplyFilters();
                      onClose();
                    }}
                    className="bg-[#2E5B44] hover:bg-[#234735] text-white text-xs px-4 py-2 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                  >
                    <span>{t.applyFilters}</span>
                    <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
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
            <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1 border-t border-zinc-200/80 pt-3">
              {/* TRACKS results */}
              {searchTab === 'tracks' && tracks.length === 0 && (
                <div className="text-center py-8 text-zinc-500">
                  <FontAwesomeIcon icon={faCode} className="w-10 h-10 mx-auto mb-2 opacity-40 text-[#2E5B44]" />
                  <p className="font-bold text-xs text-zinc-800">
                    {lang === 'id' ? 'Tidak ada modul yang cocok.' : 'No matching modules.'}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    {lang === 'id' ? 'Coba gunakan kata kunci atau kategori yang berbeda.' : 'Try different keywords or categories.'}
                  </p>
                </div>
              )}

              {searchTab === 'tracks' && tracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => {
                    onSelectTrack(track);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 bg-white hover:bg-zinc-50/90 rounded-2xl border border-zinc-200/80 shadow-2xs cursor-pointer transition-all hover:scale-[1.01] group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-12 h-12 rounded-xl border ${track.borderColor} ${track.bgClass} flex items-center justify-center p-2 shrink-0`}>
                      <img 
                        src={track.image} 
                        alt={track.name} 
                        className="track-logo-img w-full h-full object-contain filter drop-shadow-2xs"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-black uppercase text-[#2E5B44] tracking-wider block">
                        {track.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#2E5B44] transition-colors truncate">
                        {track.name}
                      </h4>
                      <p className="text-[10px] text-zinc-500 line-clamp-1">
                        {track.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pl-2">
                    <span className="text-xs font-black text-[#2E5B44] bg-[#2E5B44]/10 px-2.5 py-1 rounded-full">
                      ${track.price}
                    </span>
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 text-zinc-400 group-hover:text-[#2E5B44] group-hover:translate-x-0.5 transition-all" />
                  </div>
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
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    {lang === 'id' ? 'Coba gunakan kata kunci yang berbeda.' : 'Try different keywords.'}
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
                  className="flex items-start gap-3 p-3 bg-white hover:bg-zinc-50/90 rounded-2xl border border-zinc-200/80 shadow-2xs cursor-pointer transition-all hover:scale-[1.01] group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] font-black uppercase text-[#2E5B44] tracking-wider">
                        {entry.trackName}
                      </span>
                      <span className="text-[9px] text-zinc-400">·</span>
                      <span className="text-[9px] font-semibold text-zinc-500 uppercase">
                        {entry.levelName}
                      </span>
                      <span className="text-[9px] text-zinc-400">·</span>
                      <span className="text-[9px] font-semibold text-zinc-500">
                        {lang === 'id' ? 'Minggu' : 'Week'} {entry.week}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#2E5B44] transition-colors mt-0.5 leading-tight">
                      {entry.title}
                    </h4>
                    <p className="text-[10px] text-zinc-500 line-clamp-2 mt-0.5">
                      {entry.excerpt}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center">
                    <span className="text-[10px] font-bold text-[#2E5B44] bg-[#2E5B44]/10 px-2.5 py-1 rounded-full group-hover:bg-[#2E5B44] group-hover:text-white transition-all whitespace-nowrap">
                      {t.searchJumpToCourse}
                    </span>
                  </div>
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
  const t = translations[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`relative z-10 w-full max-w-md rounded-3xl p-6 shadow-2xl border transition-colors ${
              theme === 'dark' 
                ? 'bg-[#1E2228] text-white border-zinc-700' 
                : 'bg-[#FBF9F5] text-zinc-900 border-[#2E5B44]/20'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-5 border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#2E5B44] text-white flex items-center justify-center shadow-xs">
                  <FontAwesomeIcon icon={faGear} className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-flpcart leading-tight">
                    {t.settingsTitle}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {t.settingsSub}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-200/60 dark:hover:bg-zinc-700 rounded-full text-zinc-500 dark:text-zinc-400 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* 1. Language Option */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2.5 flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 text-[#2E5B44]" />
                  <span>{t.languageLabel}</span>
                </label>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLang('id')}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between text-left font-bold text-xs ${
                      lang === 'id'
                        ? 'bg-[#2E5B44] text-white border-[#2E5B44] shadow-md ring-2 ring-[#2E5B44]/30'
                        : theme === 'dark'
                          ? 'bg-zinc-800/80 text-zinc-200 border-zinc-700 hover:bg-zinc-800'
                          : 'bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🇮🇩</span>
                      <span>Bahasa Indonesia</span>
                    </div>
                    {lang === 'id' && <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-white shrink-0" />}
                  </button>

                  <button
                    onClick={() => setLang('en')}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between text-left font-bold text-xs ${
                      lang === 'en'
                        ? 'bg-[#2E5B44] text-white border-[#2E5B44] shadow-md ring-2 ring-[#2E5B44]/30'
                        : theme === 'dark'
                          ? 'bg-zinc-800/80 text-zinc-200 border-zinc-700 hover:bg-zinc-800'
                          : 'bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🇺🇸</span>
                      <span>English (US)</span>
                    </div>
                    {lang === 'en' && <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-white shrink-0" />}
                  </button>
                </div>
              </div>

              {/* 2. Theme Option */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2.5 flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faSun} className="w-4 h-4 text-[#2E5B44]" />
                  <span>{t.themeLabel}</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between text-left font-bold text-xs ${
                      theme === 'light'
                        ? 'bg-[#2E5B44] text-white border-[#2E5B44] shadow-md ring-2 ring-[#2E5B44]/30'
                        : 'bg-zinc-800/80 text-zinc-200 border-zinc-700 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faSun} className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{t.lightMode}</span>
                    </div>
                    {theme === 'light' && <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-white shrink-0" />}
                  </button>

                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between text-left font-bold text-xs ${
                      theme === 'dark'
                        ? 'bg-[#2E5B44] text-white border-[#2E5B44] shadow-md ring-2 ring-[#2E5B44]/30'
                        : 'bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faMoon} className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{t.darkMode}</span>
                    </div>
                    {theme === 'dark' && <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-white shrink-0" />}
                  </button>
                </div>
              </div>

              {/* Close / Apply button */}
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full bg-[#2E5B44] hover:bg-[#234735] text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                >
                  <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
                  <span>{t.saveSettings}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

