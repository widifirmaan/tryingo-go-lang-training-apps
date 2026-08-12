import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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

interface IdeModalProps {
  trackId: string;
  lang: Language;
  onClose: () => void;
}

const STACKBLITZ_SLUGS = ['nextjs', 'nodejs', 'nestjs', 'django', 'angular', 'spring'] as FrameworkSlug[];

export const IdeModal: React.FC<IdeModalProps> = ({ trackId, lang, onClose }) => {
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
    // html5, css3, javascript, typescript, golang, rust → generic CodePlayground
    body = <CodePlayground lang={lang} language={slug} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/80">
      <div className="flex items-center gap-3 px-3 sm:px-4 py-2.5 bg-[#171a1c] border-b border-zinc-700/60 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center p-1.5 shrink-0">
          {track && <img src={track.image} alt={track?.name || slug} className="w-full h-full object-contain" referrerPolicy="no-referrer" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-extrabold text-xs text-zinc-100 truncate">{track?.name || slug}</div>
          <div className="text-[9px] uppercase tracking-wider text-[#EEDBB2] font-bold">
            {lang === 'id' ? 'Editor Online' : 'Online Editor'}
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors shrink-0"
          title={lang === 'id' ? 'Tutup' : 'Close'}
        >
          <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 min-h-0 p-2 sm:p-3">
        <div className="w-full h-full min-h-0">{body}</div>
      </div>
    </div>
  );
};

export default IdeModal;