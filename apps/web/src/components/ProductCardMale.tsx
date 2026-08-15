import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; import { faCode, faBookOpen, faStar } from '@fortawesome/free-solid-svg-icons';
import { ApparelSize } from '../types';
import { TECH_LOGOS } from '../assets/techLogos';

interface ProductCardMaleProps {
  onAddToCart: (item: any) => void;
  onOpenDetails: (item: any) => void;
  onStartCourse?: (trackId: string) => void;
  onOpenPlayground?: (trackId: string) => void;
}

export const ProductCardMale: React.FC<ProductCardMaleProps> = ({
  onAddToCart,
  onOpenDetails,
  onStartCourse,
  onOpenPlayground,
}) => {
  const colors = [
    { name: 'HTML5 Orange', hex: '#E34F26' },
    { name: 'JS Yellow', hex: '#F7DF1E' },
    { name: 'Forest Moss', hex: '#2E5B44' },
    { name: 'Soft Sand', hex: '#EEDBB2' },
  ];

  const productData = {
    id: 'tryngo-lang-html5',
    name: 'HTML5',
    category: 'Markup & DOM Standard',
    price: 99,
    availableStock: 240,
    description: 'Sintaks markup standar untuk membangun struktur dokumen web semantik, form validation, dan aksesibilitas.',
    sizes: ['S', 'M', 'L', 'XL'] as ApparelSize[],
    colors: colors.map((c) => c.hex),
    image: TECH_LOGOS.html5,
    bgClass: 'bg-[#FBE8DE]',
  };

  return (
    <div className="relative w-full h-full bg-[#FBE8DE] dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 rounded-[28px] p-3 sm:p-4 flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow select-none border border-[#F4D1C2] dark:border-zinc-700/80">
      
      {/* --- MIDDLE BODY: MODEL IMAGE + DESCRIPTION --- */}
      <div className="grid grid-cols-12 items-stretch gap-2 z-10 flex-1 min-h-0">
        
        {/* Tech Illustration Image */}
        <div className="col-span-5 sm:col-span-6 relative min-h-0">
          <div className="w-full h-full rounded-2xl overflow-hidden border border-white/80 dark:border-zinc-700 shadow-sm bg-white/70 dark:bg-zinc-900/90 backdrop-blur-xs flex items-center justify-center p-2 group">
            <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px] opacity-10 pointer-events-none" />
            <img 
              src={TECH_LOGOS.html5} 
              alt="HTML5 Standard"
              className="track-logo-img w-full h-full min-w-0 min-h-0 object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right Content Area: Description, Stock */}
        <div className="col-span-7 sm:col-span-6 flex flex-col justify-between h-full pl-1 space-y-1">
          
          {/* Track Title */}
          <div>
            <span className="text-[9px] font-black tracking-widest text-orange-900 dark:text-orange-400 uppercase">
              {productData.category}
            </span>
            <h3 className="text-xs sm:text-sm font-extrabold text-orange-950 dark:text-zinc-100 leading-tight">
              {productData.name}
            </h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xs text-zinc-800 dark:text-zinc-200 shadow-2xs border border-white/60 dark:border-zinc-700 mt-1">
              <FontAwesomeIcon icon={faStar} className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400" />
              HTML5
            </span>
          </div>

          {/* Text Description */}
          <p className="text-[11px] leading-tight text-orange-950 dark:text-zinc-300 font-medium max-w-[190px]">
            Sintaks markup standar untuk dokumen web semantik & form validation.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => onStartCourse?.('tryngo-lang-html5')}
                className="w-8 h-8 bg-white/80 dark:bg-zinc-700/80 hover:bg-white dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 rounded-xl flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                title="Mulai Course"
              >
                <FontAwesomeIcon icon={faBookOpen} className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => onOpenPlayground?.(productData.id)}
                className="w-8 h-8 bg-white/80 dark:bg-zinc-700/80 hover:bg-white dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 rounded-xl flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                title="Buka Playground"
              >
                <FontAwesomeIcon icon={faCode} className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-right flex flex-col items-end leading-none">
              <span className="text-[8px] font-bold tracking-widest text-orange-900 dark:text-orange-400 uppercase">
                MODUL
              </span>
              <span className="font-flpcart text-xl sm:text-2xl font-black text-orange-950 dark:text-orange-300 tracking-tight">
                240
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
