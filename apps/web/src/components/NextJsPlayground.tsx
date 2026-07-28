import React, { useRef, useEffect } from 'react';
import sdk from '@stackblitz/sdk';
import { Language } from '../utils/translations';

interface NextJsPlaygroundProps {
  lang: Language;
  projectFiles: Record<string, string>;
  mainFile: string;
  onClose?: () => void;
  inline?: boolean;
}

export default function NextJsPlayground({ lang, projectFiles, mainFile, onClose, inline }: NextJsPlaygroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !projectFiles) return;

    sdk.embedProject(el, {
      title: 'Next.js Lesson',
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
    });

    return () => {
      el.innerHTML = '';
    };
  }, [projectFiles, mainFile]);

  return (
    <div ref={containerRef} className="w-full h-full" />
  );
}
