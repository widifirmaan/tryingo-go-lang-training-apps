import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../utils/translations';
import { SLUG_MAP } from '../data/slugMap';
import { TRACKS_COLLECTION } from '../data/tracksData';
import { FrameworkSlug } from '../utils/stackblitzTemplates';
import { StackBlitzPlayground } from './playgrounds/StackBlitzPlayground';
import { DockerPlayground } from './DockerPlayground';
import { SqlPlayground } from './playgrounds/SqlPlayground';
import { MongoPlayground } from './playgrounds/MongoPlayground';
import { RedisPlayground } from './playgrounds/RedisPlayground';
import { GraphqlPlayground } from './playgrounds/GraphqlPlayground';
import { PhpPlayground } from './playgrounds/PhpPlayground';
import { CsharpPlayground } from './playgrounds/CsharpPlayground';
import { PythonPlayground } from './playgrounds/PythonPlayground';
import { RubyPlayground } from './playgrounds/RubyPlayground';
import { ReactPlayground } from './playgrounds/ReactPlayground';
import { VuePlayground } from './playgrounds/VuePlayground';
import { SveltePlayground } from './playgrounds/SveltePlayground';
import CodePlayground from './CodePlayground';

interface IdePageProps {
  trackId: string;
  lang: Language;
  onClose: () => void;
}

const STACKBLITZ_SLUGS = ['nextjs', 'nodejs', 'nestjs', 'django', 'angular', 'spring'] as FrameworkSlug[];

export const IdeModal: React.FC<IdePageProps> = ({ trackId, lang, onClose }) => {
  const isId = lang === 'id';
  const slug = SLUG_MAP[trackId] || trackId.replace('tryngo-lang-', '');
  const track = TRACKS_COLLECTION.find((t) => t.id === trackId);

  let body: React.ReactNode;
  if (slug === 'docker') {
    body = <DockerPlayground lang={lang} />;
  } else if (STACKBLITZ_SLUGS.includes(slug as FrameworkSlug)) {
    body = <StackBlitzPlayground lang={lang} language={slug as FrameworkSlug} />;
  } else if (slug === 'postgresql' || slug === 'mysql') {
    body = <SqlPlayground lang={lang} />;
  } else if (slug === 'mongodb') {
    body = <MongoPlayground lang={lang} />;
  } else if (slug === 'redis') {
    body = <RedisPlayground lang={lang} />;
  } else if (slug === 'graphql') {
    body = <GraphqlPlayground lang={lang} language="graphql" onClose={onClose} />;
  } else if (slug === 'php' || slug === 'laravel' || slug === 'codeigniter' || slug === 'codeigniter4') {
    body = <PhpPlayground lang={lang} />;
  } else if (slug === 'csharp') {
    body = <CsharpPlayground lang={lang} />;
  } else if (slug === 'python') {
    body = <PythonPlayground lang={lang} />;
  } else if (slug === 'rails') {
    body = <RubyPlayground lang={lang} />;
  } else if (slug === 'react') {
    body = <ReactPlayground lang={lang} />;
  } else if (slug === 'vue') {
    body = <VuePlayground lang={lang} />;
  } else if (slug === 'svelte') {
    body = <SveltePlayground lang={lang} />;
  } else {
    // html5, css3, javascript, typescript, golang, rust → generic CodePlayground (inline like course)
    body = <CodePlayground lang={lang} language={slug} onClose={onClose} inline />;
  }

  return (
    <div className="flex-1 flex flex-col h-full min-w-0 lg:overflow-hidden gap-3 px-3 sm:px-0">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 flex-wrap">
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 shadow-xs transition-all shrink-0"
          title={isId ? 'Kembali' : 'Back'}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-700 dark:text-zinc-300" />
        </button>

        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border-zinc-200 dark:border-zinc-700 border flex items-center justify-center p-1.5 sm:p-2 shrink-0">
            {track && <img src={track.image} alt={track?.name || slug} className="track-logo-img w-full h-full object-contain" style={{ filter: 'brightness(0) saturate(100%)' }} referrerPolicy="no-referrer" />}
          </div>
          <div className="min-w-0">
            <h2 className="font-extrabold text-xs sm:text-sm md:text-base leading-none truncate">{track?.name || slug}</h2>
            <p className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 font-medium truncate mt-0.5">
              {isId ? 'Editor Online' : 'Online Editor'}
            </p>
          </div>
        </div>
      </div>

      {/* Editor Body */}
      <div className="h-[calc(100dvh-6.5rem)] landscape:h-[calc(100dvh-4rem)] min-h-0 lg:h-full lg:flex-1 lg:min-h-0 rounded-[28px]">
        <div className="w-full h-full min-h-0">{body}</div>
      </div>
    </div>
  );
};

export default IdeModal;