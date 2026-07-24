import React from 'react';
import { Play, Code, BookOpen } from 'lucide-react';
import { ApparelSize } from '../types';
import { CURRICULUM_LEVELS } from '../data/curriculum';

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
  lang?: 'id' | 'en';
}

const totalWeeks = CURRICULUM_LEVELS.reduce((sum, l) => sum + l.weeks.length, 0);

export const TrackCard: React.FC<TrackCardProps> = ({
  track,
  onAddToCart,
  onOpenDetails,
  isCompact = false,
  onStartCourse,
  lang = 'id',
}) => {
  return (
    <div 
      className={`relative w-full h-full flex flex-col justify-between rounded-[28px] p-4 sm:p-5 select-none shadow-md hover:shadow-xl transition-all border ${track.bgClass} ${track.borderColor} dark:bg-zinc-800/90 dark:border-zinc-700/80 dark:text-zinc-100`}
    >
      {/* Badge Ribbon */}
      <div className="absolute top-3 right-4 z-20">
        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xs text-zinc-800 dark:text-zinc-200 shadow-2xs border border-white/60 dark:border-zinc-700">
          <BookOpen className="w-2.5 h-2.5 text-zinc-500 dark:text-zinc-400" />
          {totalWeeks} {lang === 'id' ? 'Minggu' : 'Weeks'}
        </span>
      </div>

      {/* --- MIDDLE BODY: MODEL IMAGE + DESCRIPTION --- */}
      <div className="relative grid grid-cols-12 items-center gap-3 my-auto z-10 pt-4">
        {/* Tech Illustration Image */}
        <div className="col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-[150px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/80 dark:border-zinc-700 shadow-sm bg-white/70 dark:bg-zinc-900/90 backdrop-blur-xs flex items-center justify-center p-3.5 group">
            <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px] opacity-10 pointer-events-none" />
            <img 
              src={track.image} 
              alt={track.name}
              className="track-logo-img w-full h-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right Content Area: Description, Stock */}
        <div className="col-span-7 flex flex-col justify-between h-full pl-1 space-y-2">
          {/* Track Title */}
          <div>
            <span className="text-[9px] font-black tracking-widest text-zinc-700 dark:text-emerald-400 uppercase">
              {track.category}
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 leading-tight line-clamp-1 sm:line-clamp-2">
              {track.name}
            </h3>
          </div>

          {/* Text Description */}
          <p className="text-[11px] sm:text-xs leading-relaxed text-zinc-800 dark:text-zinc-300 font-medium line-clamp-3">
            {track.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button 
              onClick={() => onStartCourse?.(track.id)}
              className="px-4 py-2 bg-[#2E5B44] hover:bg-[#234735] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all hover:scale-105 shadow-sm"
              title="Mulai Course"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Mulai Course</span>
            </button>

            <button 
              onClick={() => onOpenDetails(track)}
              className="w-9 h-9 bg-white/80 dark:bg-zinc-700/80 hover:bg-white dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 rounded-xl flex items-center justify-center shadow-xs transition-transform hover:scale-110"
              title="Buka Playground"
            >
              <Code className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
