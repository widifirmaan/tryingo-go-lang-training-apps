import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; import { faCode, faBookOpen, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { ApparelSize } from '../types';
import { getCurriculum } from '../data/curriculum';
import { SLUG_MAP } from '../data/slugMap';

export interface TrackData {
  id: string;
  name: string;
  category: string;
  price: number;
  availableStock: number;
  description: string;
  sizes: ApparelSize[];
  colors: { name: string; hex: string }[];
  image: string;
  bgClass: string;
  borderColor: string;
  accentColor: string;
  badgeText: string;
}

interface TrackCardProps {
  track: TrackData;
  onAddToCart: (item: any) => void;
  onOpenDetails: (item: any) => void;
  isCompact?: boolean;
  onStartCourse?: (trackId: string) => void;
  onOpenPlayground?: (trackId: string) => void;
  onOpenQuiz?: (slug: string) => void;
  lang?: 'id' | 'en';
}

export const TrackCard: React.FC<TrackCardProps> = ({
  track,
  onAddToCart,
  onOpenDetails,
  isCompact = false,
  onStartCourse,
  onOpenPlayground,
  onOpenQuiz,
  lang = 'id',
}) => {
  const slug = SLUG_MAP[track.id] || track.id.replace('tryngo-lang-', '');
  const totalWeeks = getCurriculum(slug).reduce((sum, l) => sum + l.weeks.length, 0);
  return (
    <div 
      className={`relative w-full h-full flex flex-col rounded-[28px] p-3 sm:p-4 select-none shadow-md hover:shadow-xl transition-all border ${track.bgClass} ${track.borderColor} dark:bg-zinc-800/90 dark:border-zinc-700/80 dark:text-zinc-100`}
    >
      {/* --- MIDDLE BODY: MODEL IMAGE + DESCRIPTION --- */}
      <div className="grid grid-cols-12 items-stretch gap-2 z-10 flex-1 min-h-0">
        {/* Tech Illustration Image */}
        <div className="col-span-5 relative min-h-0">
          <div className="w-full h-full rounded-2xl overflow-hidden border border-white/80 dark:border-zinc-700 shadow-sm bg-white/70 dark:bg-zinc-900/90 backdrop-blur-xs flex items-center justify-center p-2 group">
            <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px] opacity-10 pointer-events-none" />
            <img 
              src={track.image} 
              alt={track.name}
              className="track-logo-img w-full h-full min-w-0 min-h-0 object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right Content Area: Description, Stock */}
        <div className="col-span-7 flex flex-col justify-between h-full pl-1 space-y-1">
          {/* Track Title */}
          <div>
            <h3 className="font-bold text-[10px] sm:text-sm text-zinc-900 dark:text-zinc-100 leading-tight line-clamp-1">
              {track.name}
            </h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xs text-zinc-800 dark:text-zinc-200 shadow-2xs border border-white/60 dark:border-zinc-700 mt-1">
              <FontAwesomeIcon icon={faBookOpen} className="w-2.5 h-2.5 text-zinc-500 dark:text-zinc-400" />
              {totalWeeks} {lang === 'id' ? 'Minggu' : 'Weeks'}
            </span>
          </div>

          {/* Text Description */}
          <p className="text-[10px] sm:text-xs leading-relaxed text-zinc-800 dark:text-zinc-300 font-medium flex-1 min-h-0 overflow-hidden items-start">
            {track.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onStartCourse?.(track.id)}
              className="w-8 h-8 bg-white/80 dark:bg-zinc-700/80 hover:bg-white dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 rounded-xl flex items-center justify-center shadow-xs transition-transform hover:scale-110"
              title="Mulai Course"
            >
              <FontAwesomeIcon icon={faBookOpen} className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={() => onOpenPlayground?.(track.id)}
              className="w-8 h-8 bg-white/80 dark:bg-zinc-700/80 hover:bg-white dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 rounded-xl flex items-center justify-center shadow-xs transition-transform hover:scale-110"
              title="Buka Playground"
            >
              <FontAwesomeIcon icon={faCode} className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={() => onOpenQuiz?.(slug)}
              className="w-8 h-8 bg-white/80 dark:bg-zinc-700/80 hover:bg-white dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 rounded-xl flex items-center justify-center shadow-xs transition-transform hover:scale-110"
              title="Buka Kuis"
            >
              <FontAwesomeIcon icon={faQuestion} className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
