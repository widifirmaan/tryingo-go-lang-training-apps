import React from 'react';
import { Play, Code, Sparkles } from 'lucide-react';
import { ApparelSize } from '../types';
import { TECH_LOGOS } from '../assets/techLogos';

interface ProductCardFemaleProps {
  onAddToCart: (item: any) => void;
  onOpenDetails: (item: any) => void;
  onStartCourse?: (trackId: string) => void;
}

export const ProductCardFemale: React.FC<ProductCardFemaleProps> = ({
  onAddToCart,
  onOpenDetails,
  onStartCourse,
}) => {
  const colors = [
    { name: 'CSS3 Blue', hex: '#1572B6' },
    { name: 'Tailwind Cyan', hex: '#38BDF8' },
    { name: 'Sky Blue', hex: '#7BA3BE' },
    { name: 'Mint Green', hex: '#A4CBB5' },
  ];

  const productData = {
    id: 'tryngo-lang-css3',
    name: 'CSS3 & Tailwind UI Design',
    category: 'Styling & Layouts',
    price: 129,
    availableStock: 195,
    description: 'Layout Flexbox, CSS Grid, animasi UI responsif, serta utility-first styling menggunakan Tailwind CSS.',
    sizes: ['S', 'M', 'L', 'XL'] as ApparelSize[],
    colors: colors.map((c) => c.hex),
    image: TECH_LOGOS.tailwind,
    bgClass: 'bg-[#D2E2EC]',
  };

  return (
    <div className="relative w-full h-full min-h-[240px] lg:min-h-0 bg-[#D2E2EC] dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 rounded-[28px] p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-lg transition-shadow select-none border border-[#BFD4E2] dark:border-zinc-700/80">
      
      {/* Badge Ribbon */}
      <div className="absolute top-3 right-4 z-20">
        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xs text-zinc-800 dark:text-zinc-200 shadow-2xs border border-white/60 dark:border-zinc-700">
          <Sparkles className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400 fill-amber-500" />
          CSS3 / Tailwind
        </span>
      </div>

      {/* --- MIDDLE BODY: MODEL IMAGE + DESCRIPTION --- */}
      <div className="relative grid grid-cols-12 items-center gap-3 my-auto z-10 pt-4">
        
        {/* Tech Illustration Image */}
        <div className="col-span-5 sm:col-span-6 relative flex justify-center">
          <div className="relative w-full max-w-[170px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/80 dark:border-zinc-700 shadow-sm bg-white/70 dark:bg-zinc-900/90 backdrop-blur-xs flex items-center justify-center p-3.5 group">
            <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px] opacity-10 pointer-events-none" />
            <img 
              src={TECH_LOGOS.tailwind} 
              alt="CSS3 & Tailwind CSS"
              className="track-logo-img w-full h-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right Content Area: Description, Stock */}
        <div className="col-span-7 sm:col-span-6 flex flex-col justify-between h-full pl-1 space-y-2">
          
          {/* Track Title */}
          <div>
            <span className="text-[9px] font-black tracking-widest text-blue-900 dark:text-cyan-400 uppercase">
              {productData.category}
            </span>
            <h3 className="text-xs sm:text-sm font-extrabold text-blue-950 dark:text-zinc-100 leading-tight">
              {productData.name}
            </h3>
          </div>

          {/* Text Description */}
          <p className="text-[11px] leading-tight text-blue-950 dark:text-zinc-300 font-medium max-w-[190px]">
            Flexbox, Grid, animasi UI responsif, & utility-first styling Tailwind CSS.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => onStartCourse?.('tryngo-lang-css3')}
                className="px-5 py-2 sm:px-6 sm:py-2.5 bg-[#2E5B44] hover:bg-[#234735] text-white text-xs sm:text-sm font-bold rounded-lg flex items-center gap-1.5 transition-all hover:scale-105 shadow-sm"
                title="Mulai Course"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Mulai Course</span>
              </button>
              <button 
                onClick={() => onOpenDetails(productData)}
                className="w-10 h-10 sm:w-11 sm:h-11 bg-white/80 dark:bg-zinc-700/80 hover:bg-white dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 rounded-lg flex items-center justify-center shadow-sm transition-transform hover:scale-110 font-mono font-bold text-sm"
                title="Buka Playground"
              >
                <Code className="w-5 h-5" />
              </button>
            </div>
            <div className="text-right flex flex-col items-end leading-none">
              <span className="text-[9px] font-bold tracking-widest text-blue-900 dark:text-cyan-400 uppercase">
                MODUL
              </span>
              <span className="font-flpcart text-3xl font-black text-blue-950 dark:text-cyan-300 tracking-tight">
                195
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
