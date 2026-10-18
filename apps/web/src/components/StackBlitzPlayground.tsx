import React, { useCallback, useEffect, useRef, useState } from 'react';
import sdk from '@stackblitz/sdk';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../utils/translations';
import { StackBlitzProject } from '../utils/stackblitzTemplates';

interface StackBlitzEmbedProps {
  lang: Language;
  project: StackBlitzProject;
  title?: string;
}

export const StackBlitzEmbed: React.FC<StackBlitzEmbedProps> = ({ lang, project, title = 'Tryngo Playground' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const isId = lang === 'id';

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    setError(null);
    el.innerHTML = '';

    sdk.embedProject(el, {
      title,
      template: project.template,
      files: project.files,
    }, {
      height: '100%',
      width: '100%',
      openFile: project.mainFile,
      hideNavigation: true,
      showSidebar: true,
      sidebarView: 'project',
      clickToLoad: true,
      theme: 'dark',
    }).catch((err: unknown) => {
      if (cancelled) return;
      console.error('StackBlitz embed failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    });

    return () => {
      cancelled = true;
      el.innerHTML = '';
    };
  }, [project, title]);

  const openInNewTab = useCallback(() => {
    sdk.openProject({
      title,
      template: project.template,
      files: project.files,
    }, {
      newWindow: true,
      openFile: project.mainFile,
      showSidebar: true,
    });
  }, [project, title]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center bg-[#1e1e1e]">
          <FontAwesomeIcon icon={faTriangleExclamation} className="w-6 h-6 text-amber-400" />
          <p className="text-sm text-zinc-400 max-w-sm">
            {isId
              ? 'Gagal memuat StackBlitz. Kemungkinan diblokir ad-blocker atau jaringan. Coba buka proyek di tab baru.'
              : 'Failed to load StackBlitz. It may be blocked by an ad-blocker or network. Try opening the project in a new tab.'}
          </p>
          <button
            type="button"
            onClick={openInNewTab}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2E5B44] text-white text-sm font-medium hover:bg-[#24493a] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5B44]"
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3.5 h-3.5" />
            {isId ? 'Buka di tab baru' : 'Open in new tab'}
          </button>
        </div>
      )}
    </div>
  );
};

export default StackBlitzEmbed;
