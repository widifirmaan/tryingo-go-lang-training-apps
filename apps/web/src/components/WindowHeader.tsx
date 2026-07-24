import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; import { faCode } from '@fortawesome/free-solid-svg-icons';

interface WindowHeaderProps {
  title?: string;
  onCodeClick?: () => void;
}

export const WindowHeader: React.FC<WindowHeaderProps> = ({
  title = 'MacBook Pro 16" - 1',
  onCodeClick,
}) => {
  return (
    <div className="w-full bg-[#1e1e24] text-zinc-400 text-xs px-4 py-2 flex items-center justify-between border-b border-zinc-800 rounded-t-2xl font-mono select-none">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 mr-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
        </div>
        <span className="text-zinc-300 font-sans text-xs tracking-tight">{title}</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onCodeClick}
          className="bg-[#22c55e] hover:bg-[#16a34a] text-zinc-950 p-1 rounded transition-colors flex items-center justify-center font-bold"
          title="Toggle Inspect Code"
        >
          <FontAwesomeIcon icon={faCode} className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
