import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Terminal, 
  Copy, 
  Check, 
  X, 
  Laptop, 
  FolderTree, 
  Code2, 
  Lightbulb, 
  ExternalLink,
  ChevronDown,
  Monitor,
  Apple,
  Sparkles
} from 'lucide-react';
import { TRACKS_COLLECTION } from '../data/tracksData';
import { SLUG_MAP, REVERSE_SLUG_MAP } from '../data/slugMap';
import { QUICK_START_GUIDES, QuickStartGuide } from '../data/quickStartData';
import { Language } from '../utils/translations';

interface QuickStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlug?: string;
  lang: Language;
  onOpenIde?: (trackId: string) => void;
  onStartCourse?: (trackId: string) => void;
}

type OsType = 'windows' | 'macos' | 'linux';

export const QuickStartModal: React.FC<QuickStartModalProps> = ({
  isOpen,
  onClose,
  initialSlug = 'nextjs',
  lang,
  onOpenIde,
  onStartCourse,
}) => {
  const isId = lang === 'id';
  const [selectedSlug, setSelectedSlug] = useState<string>(initialSlug);
  const [selectedOs, setSelectedOs] = useState<OsType>('windows');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sync initialSlug when modal opens or initialSlug changes
  useEffect(() => {
    if (initialSlug && QUICK_START_GUIDES[initialSlug]) {
      setSelectedSlug(initialSlug);
    }
  }, [initialSlug, isOpen]);

  // Detect user OS once on mount
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('mac')) {
      setSelectedOs('macos');
    } else if (ua.includes('linux')) {
      setSelectedOs('linux');
    } else {
      setSelectedOs('windows');
    }
  }, []);

  // Keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const guide: QuickStartGuide = QUICK_START_GUIDES[selectedSlug] || QUICK_START_GUIDES.nextjs;
  const trackId = REVERSE_SLUG_MAP[selectedSlug] || `tryngo-lang-${selectedSlug}`;
  const track = TRACKS_COLLECTION.find((t) => t.id === trackId);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  const getRuntimeCommandForOs = () => {
    if (selectedOs === 'windows') return guide.installRuntime.command.windows;
    if (selectedOs === 'macos') return guide.installRuntime.command.macos;
    return guide.installRuntime.command.linux;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden text-zinc-900 dark:text-zinc-100"
      >
        {/* Top App Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-[#2E5B44]/5 dark:bg-emerald-950/20 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2E5B44] to-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
              <Rocket className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-black text-sm sm:text-base leading-tight">
                  {isId ? 'Panduan Mulai Cepat (Quick Start)' : 'Quick Start & Setup Guide'}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#2E5B44]/15 text-[#2E5B44] dark:bg-emerald-400/20 dark:text-emerald-300">
                  {guide.badge}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium truncate">
                {isId
                  ? 'Setup VS Code, install runtime/SDK, dan inisialisasi project kosong di komputermu'
                  : 'Install dependencies, set up VS Code, and scaffold an empty project on your machine'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0 ml-2"
            title={isId ? 'Tutup' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stack Selector & OS Toggle Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-5 sm:px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 shrink-0">
          {/* Tech Stack Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:border-[#2E5B44] dark:hover:border-emerald-500 transition-all text-xs font-bold w-full sm:w-auto"
            >
              {track && (
                <img
                  src={track.image}
                  alt={guide.name}
                  className="w-5 h-5 object-contain shrink-0"
                  style={{ filter: 'brightness(0) saturate(100%)' }}
                  referrerPolicy="no-referrer"
                />
              )}
              <span className="truncate">{guide.name}</span>
              <span className="text-[10px] text-zinc-400 font-normal">({guide.category})</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 ml-auto" />
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute left-0 top-full mt-1.5 z-30 w-72 max-h-72 overflow-y-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-1.5 scrollbar-thin">
                  {TRACKS_COLLECTION.map((t) => {
                    const slug = SLUG_MAP[t.id] || t.id.replace('tryngo-lang-', '');
                    const isCurrent = slug === selectedSlug;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelectedSlug(slug);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all ${
                          isCurrent
                            ? 'bg-[#2E5B44] text-white shadow-xs'
                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-700/60 text-zinc-700 dark:text-zinc-200'
                        }`}
                      >
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-4 h-4 object-contain shrink-0"
                          style={{ filter: isCurrent ? 'brightness(0) invert(1)' : 'brightness(0) saturate(100%)' }}
                          referrerPolicy="no-referrer"
                        />
                        <span className="truncate">{t.name}</span>
                        <span className={`text-[10px] ml-auto ${isCurrent ? 'text-emerald-100' : 'text-zinc-400'}`}>
                          {t.category.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* OS Switcher */}
          <div className="flex items-center bg-zinc-200/60 dark:bg-zinc-800 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setSelectedOs('windows')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedOs === 'windows'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 text-sky-500" />
              <span>Windows</span>
            </button>
            <button
              onClick={() => setSelectedOs('macos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedOs === 'macos'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Apple className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
              <span>macOS</span>
            </button>
            <button
              onClick={() => setSelectedOs('linux')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedOs === 'linux'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-500" />
              <span>Linux</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Banner Tagline */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#2E5B44]/5 to-transparent border border-emerald-500/20 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#2E5B44] dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm font-medium leading-relaxed">
              <span className="font-extrabold text-[#2E5B44] dark:text-emerald-400 mr-1.5">
                {guide.name}:
              </span>
              {isId ? guide.taglineId : guide.taglineEn}
            </div>
          </div>

          {/* STEP 1: VS Code & Recommended Extensions */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#2E5B44] text-white flex items-center justify-center text-xs font-black">
                  1
                </span>
                <h3 className="font-extrabold text-sm sm:text-base">
                  {isId ? 'Install VS Code & Ekstensi Rekomendasi' : 'Install VS Code & Recommended Extensions'}
                </h3>
              </div>
              <a
                href="https://code.visualstudio.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-[#2E5B44] dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Download VS Code</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Extension Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {guide.vscode.recommendedExtensions.map((ext) => (
                <div
                  key={ext.id}
                  className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 flex items-start justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-[#2E5B44] dark:text-emerald-400 shrink-0" />
                      <span className="truncate">{ext.name}</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                      {isId ? ext.descriptionId : ext.descriptionEn}
                    </p>
                    <code className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 mt-1 block truncate">
                      {ext.id}
                    </code>
                  </div>
                  <button
                    onClick={() => handleCopy(`code --install-extension ${ext.id}`, `ext-${ext.id}`)}
                    className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors shrink-0"
                    title={isId ? 'Salin perintah install ekstensi' : 'Copy extension install command'}
                  >
                    {copiedKey === `ext-${ext.id}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* One-click install all extensions CLI */}
            <div className="rounded-xl bg-zinc-900 dark:bg-black p-3 text-zinc-100 font-mono text-xs flex items-center justify-between gap-3 border border-zinc-800 shadow-inner">
              <div className="flex items-center gap-2 min-w-0">
                <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate text-zinc-300">{guide.vscode.cliInstallCommand}</span>
              </div>
              <button
                onClick={() => handleCopy(guide.vscode.cliInstallCommand, 'cli-ext')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-sans font-bold text-zinc-200 transition-colors shrink-0"
              >
                {copiedKey === 'cli-ext' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">{isId ? 'Tersalin' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{isId ? 'Salin Semua' : 'Copy All'}</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* STEP 2: Install Runtime / SDK / Dependency */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2E5B44] text-white flex items-center justify-center text-xs font-black">
                2
              </span>
              <h3 className="font-extrabold text-sm sm:text-base">
                {isId ? `Install Runtime & SDK: ${guide.installRuntime.name}` : `Install Runtime & SDK: ${guide.installRuntime.name}`}
              </h3>
            </div>

            <div className="rounded-xl bg-zinc-900 dark:bg-black p-3.5 text-zinc-100 font-mono text-xs space-y-2 border border-zinc-800 shadow-inner">
              <div className="flex items-center justify-between gap-3">
                <span className="text-emerald-400 text-[11px] font-sans font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  {selectedOs.toUpperCase()} Command
                </span>
                <button
                  onClick={() => handleCopy(getRuntimeCommandForOs(), 'install-cmd')}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-sans font-bold text-zinc-200 transition-colors shrink-0"
                >
                  {copiedKey === 'install-cmd' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">{isId ? 'Tersalin' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{isId ? 'Salin' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-zinc-200 overflow-x-auto whitespace-pre-wrap break-all">
                {getRuntimeCommandForOs()}
              </div>
            </div>

            {/* Verify Installation */}
            <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-zinc-700 dark:text-zinc-300">
                  {isId ? 'Verifikasi Instalasi:' : 'Verify Installation:'}
                </span>
                <code className="ml-2 px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 font-mono text-[11px]">
                  {guide.installRuntime.verifyCommand}
                </code>
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 italic">
                Output: {guide.installRuntime.expectedOutput.replace('\n', ' & ')}
              </div>
            </div>
          </section>

          {/* STEP 3: Create Project / Scaffolding */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2E5B44] text-white flex items-center justify-center text-xs font-black">
                3
              </span>
              <h3 className="font-extrabold text-sm sm:text-base">
                {isId ? guide.createProject.titleId : guide.createProject.titleEn}
              </h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {isId ? guide.createProject.explanationId : guide.createProject.explanationEn}
            </p>

            <div className="rounded-xl bg-zinc-900 dark:bg-black p-3.5 text-zinc-100 font-mono text-xs space-y-2 border border-zinc-800 shadow-inner">
              <div className="flex items-center justify-between gap-3">
                <span className="text-emerald-400 text-[11px] font-sans font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  Terminal
                </span>
                <button
                  onClick={() => handleCopy(guide.createProject.command, 'create-cmd')}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-sans font-bold text-zinc-200 transition-colors shrink-0"
                >
                  {copiedKey === 'create-cmd' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">{isId ? 'Tersalin' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{isId ? 'Salin Perintah' : 'Copy Command'}</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-zinc-200 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                {guide.createProject.command}
              </pre>
            </div>
          </section>

          {/* STEP 4: Run Development Server */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2E5B44] text-white flex items-center justify-center text-xs font-black">
                4
              </span>
              <h3 className="font-extrabold text-sm sm:text-base">
                {isId ? 'Jalankan Development Server Lokal' : 'Run Local Development Server'}
              </h3>
            </div>

            <div className="rounded-xl bg-zinc-900 dark:bg-black p-3.5 text-zinc-100 font-mono text-xs space-y-2 border border-zinc-800 shadow-inner">
              <div className="flex items-center justify-between gap-3">
                <span className="text-amber-400 text-[11px] font-sans font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  {isId ? 'Perintah Eksekusi' : 'Execution Command'}
                </span>
                <button
                  onClick={() => handleCopy(guide.runProject.command, 'run-cmd')}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-sans font-bold text-zinc-200 transition-colors shrink-0"
                >
                  {copiedKey === 'run-cmd' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">{isId ? 'Tersalin' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{isId ? 'Salin' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-zinc-200 font-bold">{guide.runProject.command}</div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 text-xs">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-[#2E5B44] dark:text-emerald-400 shrink-0" />
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {isId ? guide.runProject.outputNoteId : guide.runProject.outputNoteEn}
                </span>
              </div>
              {guide.runProject.localUrl.startsWith('http') && (
                <a
                  href={guide.runProject.localUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono font-bold text-[#2E5B44] dark:text-emerald-400 hover:underline shrink-0 ml-2"
                >
                  {guide.runProject.localUrl} ↗
                </a>
              )}
            </div>
          </section>

          {/* STEP 5: Project Structure & First File */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2E5B44] text-white flex items-center justify-center text-xs font-black">
                5
              </span>
              <h3 className="font-extrabold text-sm sm:text-base">
                {isId ? 'Struktur Folder & File Perdana' : 'Project Structure & Starter File'}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* Directory Tree */}
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 flex flex-col">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                  <FolderTree className="w-3.5 h-3.5 text-[#2E5B44] dark:text-emerald-400" />
                  <span>{isId ? 'Struktur Folder' : 'Folder Architecture'}</span>
                </div>
                <pre className="font-mono text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-300 overflow-x-auto flex-1">
                  {guide.projectStructure.tree}
                </pre>
              </div>

              {/* Starter File Code */}
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 dark:bg-black text-zinc-100 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] font-bold text-emerald-400 truncate">
                    {guide.starterFile.filename}
                  </span>
                  <button
                    onClick={() => handleCopy(guide.starterFile.code, 'starter-code')}
                    className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    title={isId ? 'Salin kode awal' : 'Copy starter code'}
                  >
                    {copiedKey === 'starter-code' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <pre className="font-mono text-[11px] leading-relaxed text-zinc-300 overflow-x-auto flex-1 max-h-48">
                  {guide.starterFile.code}
                </pre>
              </div>
            </div>
          </section>

          {/* Pro Tips Section */}
          <section className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
              <Lightbulb className="w-4 h-4" />
              <span>{isId ? 'Tips Praktis & Best Practices' : 'Pro Tips & Best Practices'}</span>
            </div>
            <ul className="space-y-1.5 pl-5 list-disc text-xs text-zinc-700 dark:text-zinc-300">
              {(isId ? guide.proTipsId : guide.proTipsEn).map((tip, idx) => (
                <li key={idx} className="leading-relaxed">
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 shrink-0 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            {isId ? 'Tutup' : 'Close'}
          </button>

          <div className="flex items-center gap-2">
            {onOpenIde && (
              <button
                onClick={() => {
                  onClose();
                  onOpenIde(trackId);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-[#2E5B44] text-xs font-bold shadow-2xs transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-[#2E5B44] dark:text-emerald-400" />
                <span>{isId ? 'Coba di Online IDE' : 'Test in Online IDE'}</span>
              </button>
            )}

            {onStartCourse && (
              <button
                onClick={() => {
                  onClose();
                  onStartCourse(trackId);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2E5B44] hover:bg-[#234735] text-white text-xs font-black shadow-md transition-all"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>{isId ? 'Buka Materi Modul' : 'Open Course Track'}</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuickStartModal;
