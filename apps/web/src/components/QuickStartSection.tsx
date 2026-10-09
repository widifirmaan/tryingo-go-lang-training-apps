import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Terminal, 
  Copy, 
  Check, 
  Laptop, 
  FolderTree, 
  Code2, 
  Lightbulb, 
  ExternalLink,
  Monitor,
  Apple,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { QUICK_START_GUIDES, QuickStartGuide } from '../data/quickStartData';
import { Language } from '../utils/translations';

interface QuickStartSectionProps {
  slug: string;
  lang: Language;
}

type OsType = 'windows' | 'macos' | 'linux';

export const QuickStartSection: React.FC<QuickStartSectionProps> = ({ slug, lang }) => {
  const isId = lang === 'id';
  const guide: QuickStartGuide = QUICK_START_GUIDES[slug] || QUICK_START_GUIDES.nextjs;
  const [selectedOs, setSelectedOs] = useState<OsType>('windows');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Auto detect user OS
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
    <div className="my-6 rounded-2xl sm:rounded-3xl border-2 border-emerald-500/30 dark:border-emerald-500/20 bg-gradient-to-b from-emerald-500/5 via-white to-zinc-50 dark:from-emerald-950/20 dark:via-zinc-900 dark:to-zinc-900/90 shadow-sm overflow-hidden text-zinc-900 dark:text-zinc-100 transition-all">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-800/40">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2E5B44] to-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-sm sm:text-base tracking-tight text-zinc-900 dark:text-white leading-tight">
                {isId ? 'Panduan Mulai Cepat (Quick Start Guide)' : 'Quick Start & Local Project Setup'}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#2E5B44]/15 text-[#2E5B44] dark:bg-emerald-400/20 dark:text-emerald-300">
                {guide.badge}
              </span>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium mt-0.5">
              {isId
                ? 'Langkah awal: install VS Code, runtime/SDK, dan buat project kosong di komputermu'
                : 'Getting started: install VS Code, dependencies, and scaffold your empty project locally'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* OS Switcher */}
          <div className="flex items-center bg-zinc-200/70 dark:bg-zinc-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setSelectedOs('windows')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                selectedOs === 'windows'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Monitor className="w-3 h-3 text-sky-500" />
              <span>Windows</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedOs('macos')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                selectedOs === 'macos'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Apple className="w-3 h-3 text-zinc-700 dark:text-zinc-300" />
              <span>macOS</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedOs('linux')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                selectedOs === 'linux'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Terminal className="w-3 h-3 text-amber-500" />
              <span>Linux</span>
            </button>
          </div>

          {/* Collapse/Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 transition-colors"
            title={isCollapsed ? (isId ? 'Buka Panduan' : 'Expand Guide') : (isId ? 'Tutup Panduan' : 'Collapse Guide')}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {!isCollapsed && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Tagline Box */}
          <div className="p-3.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 flex items-start gap-2.5 text-xs">
            <Sparkles className="w-4 h-4 text-[#2E5B44] dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-[#2E5B44] dark:text-emerald-300 mr-1">{guide.name}:</strong>
              {isId ? guide.taglineId : guide.taglineEn}
            </div>
          </div>

          {/* STEP 1: VS Code & Ekstensi */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#2E5B44] text-white flex items-center justify-center text-[11px] font-black">
                  1
                </span>
                <h4 className="font-extrabold text-xs sm:text-sm">
                  {isId ? 'Install VS Code & Ekstensi Rekomendasi' : 'Install VS Code & Recommended Extensions'}
                </h4>
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

            {/* Extensions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {guide.vscode.recommendedExtensions.map((ext) => (
                <div
                  key={ext.id}
                  className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-800/50 flex items-start justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-[#2E5B44] dark:text-emerald-400 shrink-0" />
                      <span className="truncate">{ext.name}</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                      {isId ? ext.descriptionId : ext.descriptionEn}
                    </p>
                    <code className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 block truncate mt-0.5">
                      {ext.id}
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(`code --install-extension ${ext.id}`, `ext-${ext.id}`)}
                    className="p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors shrink-0"
                    title={isId ? 'Salin perintah' : 'Copy command'}
                  >
                    {copiedKey === `ext-${ext.id}` ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* One-click CLI */}
            <div className="rounded-xl bg-zinc-900 dark:bg-black p-2.5 text-zinc-100 font-mono text-xs flex items-center justify-between gap-2 border border-zinc-800">
              <div className="flex items-center gap-2 min-w-0">
                <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate text-zinc-300 text-[11px]">{guide.vscode.cliInstallCommand}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(guide.vscode.cliInstallCommand, 'cli-ext')}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] font-sans font-bold text-zinc-200 transition-colors shrink-0"
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
          </div>

          {/* STEP 2: Install Runtime / SDK */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#2E5B44] text-white flex items-center justify-center text-[11px] font-black">
                2
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm">
                {isId ? `Install Runtime & SDK: ${guide.installRuntime.name}` : `Install Runtime & SDK: ${guide.installRuntime.name}`}
              </h4>
            </div>

            <div className="rounded-xl bg-zinc-900 dark:bg-black p-3 text-zinc-100 font-mono text-xs space-y-1.5 border border-zinc-800">
              <div className="flex items-center justify-between gap-2">
                <span className="text-emerald-400 text-[10px] font-sans font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" />
                  {selectedOs.toUpperCase()} Command
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(getRuntimeCommandForOs(), 'install-cmd')}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] font-sans font-bold text-zinc-200 transition-colors shrink-0"
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
              <div className="text-zinc-200 overflow-x-auto whitespace-pre-wrap break-all text-[11px]">
                {getRuntimeCommandForOs()}
              </div>
            </div>

            <div className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
              <div>
                <span className="font-bold text-zinc-700 dark:text-zinc-300">
                  {isId ? 'Verifikasi Instalasi:' : 'Verify Installation:'}
                </span>
                <code className="ml-2 px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 font-mono">
                  {guide.installRuntime.verifyCommand}
                </code>
              </div>
              <div className="text-zinc-500 dark:text-zinc-400 italic">
                Output: {guide.installRuntime.expectedOutput.replace('\n', ' & ')}
              </div>
            </div>
          </div>

          {/* STEP 3: Create Project (Scaffolding) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#2E5B44] text-white flex items-center justify-center text-[11px] font-black">
                3
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm">
                {isId ? guide.createProject.titleId : guide.createProject.titleEn}
              </h4>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {isId ? guide.createProject.explanationId : guide.createProject.explanationEn}
            </p>

            <div className="rounded-xl bg-zinc-900 dark:bg-black p-3 text-zinc-100 font-mono text-xs space-y-1.5 border border-zinc-800">
              <div className="flex items-center justify-between gap-2">
                <span className="text-emerald-400 text-[10px] font-sans font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" />
                  Terminal
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(guide.createProject.command, 'create-cmd')}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] font-sans font-bold text-zinc-200 transition-colors shrink-0"
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
              <pre className="text-zinc-200 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed text-[11px]">
                {guide.createProject.command}
              </pre>
            </div>
          </div>

          {/* STEP 4: Run Dev Server */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#2E5B44] text-white flex items-center justify-center text-[11px] font-black">
                4
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm">
                {isId ? 'Jalankan Development Server Lokal' : 'Run Local Development Server'}
              </h4>
            </div>

            <div className="rounded-xl bg-zinc-900 dark:bg-black p-3 text-zinc-100 font-mono text-xs space-y-1.5 border border-zinc-800">
              <div className="flex items-center justify-between gap-2">
                <span className="text-amber-400 text-[10px] font-sans font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" />
                  {isId ? 'Perintah Eksekusi' : 'Execution Command'}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(guide.runProject.command, 'run-cmd')}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] font-sans font-bold text-zinc-200 transition-colors shrink-0"
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
              <div className="text-zinc-200 font-bold text-[11px]">{guide.runProject.command}</div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 text-xs">
              <div className="flex items-center gap-2">
                <Laptop className="w-3.5 h-3.5 text-[#2E5B44] dark:text-emerald-400 shrink-0" />
                <span className="font-medium text-[11px] text-zinc-700 dark:text-zinc-300">
                  {isId ? guide.runProject.outputNoteId : guide.runProject.outputNoteEn}
                </span>
              </div>
              {guide.runProject.localUrl.startsWith('http') && (
                <a
                  href={guide.runProject.localUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono font-bold text-[11px] text-[#2E5B44] dark:text-emerald-400 hover:underline shrink-0 ml-2"
                >
                  {guide.runProject.localUrl} ↗
                </a>
              )}
            </div>
          </div>

          {/* STEP 5: Folder Structure & Starter File */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#2E5B44] text-white flex items-center justify-center text-[11px] font-black">
                5
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm">
                {isId ? 'Struktur Folder & File Perdana' : 'Project Structure & Starter File'}
              </h4>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/50 flex flex-col">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                  <FolderTree className="w-3.5 h-3.5 text-[#2E5B44] dark:text-emerald-400" />
                  <span>{isId ? 'Struktur Folder' : 'Folder Architecture'}</span>
                </div>
                <pre className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-300 overflow-x-auto flex-1">
                  {guide.projectStructure.tree}
                </pre>
              </div>

              <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 dark:bg-black text-zinc-100 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] font-bold text-emerald-400 truncate">
                    {guide.starterFile.filename}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(guide.starterFile.code, 'starter-code')}
                    className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    title={isId ? 'Salin kode' : 'Copy code'}
                  >
                    {copiedKey === 'starter-code' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
                <pre className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-zinc-300 overflow-x-auto flex-1 max-h-48">
                  {guide.starterFile.code}
                </pre>
              </div>
            </div>
          </div>

          {/* Pro Tips Box */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/20 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{isId ? 'Tips Praktis & Best Practices' : 'Pro Tips & Best Practices'}</span>
            </div>
            <ul className="space-y-1 pl-4 list-disc text-[11px] text-zinc-700 dark:text-zinc-300">
              {(isId ? guide.proTipsId : guide.proTipsEn).map((tip, idx) => (
                <li key={idx} className="leading-relaxed">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickStartSection;
