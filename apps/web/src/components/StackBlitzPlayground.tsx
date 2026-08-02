import React, { useRef, useEffect, useState } from 'react';
import sdk from '@stackblitz/sdk';
import { Language } from '../utils/translations';

interface StackBlitzPlaygroundProps {
  lang: Language;
  title: string;
  projectFiles: Record<string, string>;
  mainFile: string;
  onClose?: () => void;
  inline?: boolean;
}

export default function StackBlitzPlayground({ lang, title, projectFiles, mainFile, onClose, inline }: StackBlitzPlaygroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !projectFiles) return;

    let cancelled = false;
    setError(null);

    sdk.embedProject(el, {
      title,
      template: 'node',
      files: projectFiles,
    }, {
      height: '100%',
      width: '100%',
      openFile: mainFile,
      view: 'preview',
      hideExplorer: true,
      hideNavigation: true,
      clickToLoad: true,
      theme: 'dark',
      crossOriginIsolated: true,
    }).catch((err: unknown) => {
      if (cancelled) return;
      console.error('StackBlitz embed failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    });

    return () => {
      cancelled = true;
      el.innerHTML = '';
    };
  }, [projectFiles, mainFile, title]);

  const openInNewTab = () => {
    sdk.openProject({
      title,
      template: 'node',
      files: projectFiles,
    }, { newWindow: true, openFile: mainFile, view: 'preview' });
  };

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
          {lang === 'id'
            ? 'Gagal terhubung ke playground StackBlitz. Coba nonaktifkan ad-blocker untuk situs ini, atau buka proyek di tab baru.'
            : 'Failed to connect to the StackBlitz playground. Try disabling your ad-blocker for this site, or open the project in a new tab.'}
        </p>
        <button
          type="button"
          onClick={openInNewTab}
          className="px-4 py-2 rounded-lg bg-[#2E5B44] text-white text-sm font-medium hover:bg-[#24493a] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5B44]"
        >
          {lang === 'id' ? 'Buka di tab baru' : 'Open in new tab'}
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full" />
  );
}
