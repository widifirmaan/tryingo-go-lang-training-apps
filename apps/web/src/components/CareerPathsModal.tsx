import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faRoute, faCheckCircle, faArrowRight, faCompass, faAward } from '@fortawesome/free-solid-svg-icons';
import { CAREER_PATHS, CareerPath } from '../data/careerPaths';
import { TRACKS_COLLECTION } from '../data/tracksData';
import { REVERSE_SLUG_MAP } from '../data/slugMap';
import { getStoredProgress } from '../utils/progress';
import { Language } from '../utils/translations';

interface CareerPathsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack: (trackId: string) => void;
  lang: Language;
}

export const CareerPathsModal: React.FC<CareerPathsModalProps> = ({
  isOpen,
  onClose,
  onSelectTrack,
  lang,
}) => {
  const isId = lang === 'id';
  const [selectedPathId, setSelectedPathId] = useState<string>(CAREER_PATHS[0].id);
  const [progressData, setProgressData] = useState(getStoredProgress);

  useEffect(() => {
    const handleUpdate = () => setProgressData(getStoredProgress());
    window.addEventListener('tryngo-progress-update', handleUpdate);
    return () => window.removeEventListener('tryngo-progress-update', handleUpdate);
  }, []);

  if (!isOpen) return null;

  const currentPath = CAREER_PATHS.find((p) => p.id === selectedPathId) || CAREER_PATHS[0];

  const getPathStats = (path: CareerPath) => {
    let completedTracks = 0;
    for (const slug of path.trackSlugs) {
      const weeks = progressData[slug]?.completedWeeks || [];
      if (weeks.length >= 8) completedTracks++;
    }
    const percent = Math.round((completedTracks / path.trackSlugs.length) * 100);
    return { completedTracks, totalTracks: path.trackSlugs.length, percent };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-[#2E5B44]/5 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2E5B44] text-white flex items-center justify-center text-sm shadow-xs">
              <FontAwesomeIcon icon={faRoute} />
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white leading-tight">
                {isId ? 'Jalur Karir & Kurikulum Terpadu' : 'Career Roadmaps & Bundled Curricula'}
              </h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                {isId
                  ? 'Panduan terstruktur dari nol hingga siap kerja di industri'
                  : 'Structured learning journey from zero to job-ready engineer'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
          </button>
        </div>

        {/* Path Selector Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto scrollbar-none bg-zinc-50 dark:bg-zinc-900/40">
          {CAREER_PATHS.map((path) => {
            const { percent } = getPathStats(path);
            const isSelected = path.id === selectedPathId;
            return (
              <button
                key={path.id}
                onClick={() => setSelectedPathId(path.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                  isSelected
                    ? 'bg-[#2E5B44] text-white border-[#2E5B44] shadow-xs'
                    : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                }`}
              >
                <span>{isId ? path.roleId : path.roleEn}</span>
                {percent > 0 && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {percent}%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Path Detail View */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Path Header Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-zinc-50 to-transparent dark:from-emerald-950/30 dark:via-zinc-900 dark:to-transparent border border-emerald-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#2E5B44] text-white">
                  {currentPath.badge}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white mt-1.5">
                  {isId ? currentPath.titleId : currentPath.titleEn}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  {isId ? 'Target Profesi:' : 'Target Role:'}
                </span>
                <p className="text-sm font-extrabold text-[#2E5B44] dark:text-emerald-400">
                  {isId ? currentPath.roleId : currentPath.roleEn}
                </p>
              </div>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
              {isId ? currentPath.descId : currentPath.descEn}
            </p>

            {/* Overall Path Progress Bar */}
            {(() => {
              const { completedTracks, totalTracks, percent } = getPathStats(currentPath);
              return (
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                    <span>
                      {isId ? 'Kemajuan Karir' : 'Career Mastery'}: {completedTracks} / {totalTracks} {isId ? 'Track' : 'Tracks'}
                    </span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-[#2E5B44] rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Sequential Step Timeline */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faCompass} />
              <span>{isId ? 'Langkah Belajar Bertahap' : 'Curriculum Milestones'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {currentPath.trackSlugs.map((slug, idx) => {
                const trackId = REVERSE_SLUG_MAP[slug];
                const track = TRACKS_COLLECTION.find((t) => t.id === trackId);
                const weeks = progressData[slug]?.completedWeeks || [];
                const isCompleted = weeks.length >= 8;

                if (!track) return null;

                return (
                  <div
                    key={slug}
                    onClick={() => {
                      onSelectTrack(track.id);
                      onClose();
                    }}
                    className={`group cursor-pointer p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                      isCompleted
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                        : 'bg-white dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 hover:border-[#2E5B44] hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-[10px] font-black flex items-center justify-center">
                          {idx + 1}
                        </span>
                        {isCompleted ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            <FontAwesomeIcon icon={faCheckCircle} />
                            <span>{isId ? 'Selesai' : 'Done'}</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-zinc-400">
                            {weeks.length > 0 ? `${weeks.length}w` : (isId ? 'Mulai' : 'Start')}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-1 shrink-0">
                          <img
                            src={track.image}
                            alt={track.name}
                            className="w-full h-full object-contain"
                            style={{ filter: 'brightness(0) saturate(100%)' }}
                          />
                        </div>
                        <h5 className="font-extrabold text-xs text-zinc-900 dark:text-white group-hover:text-[#2E5B44] transition-colors">
                          {track.name}
                        </h5>
                      </div>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {track.category}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-zinc-100 dark:border-zinc-700/50 flex items-center justify-between text-[10px] font-bold text-[#2E5B44] dark:text-emerald-400">
                      <span>{isId ? 'Buka Materi' : 'Explore Course'}</span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
