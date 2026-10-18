import React, { useState, useRef, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faSpinner,
  faCircleInfo,
  faClock,
  faTriangleExclamation,
  faArrowUpRightFromSquare,
  faFolderTree,
  faFolder,
  faFile,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Language } from '../../utils/translations';
import {
  DEFAULT_CODE,
  simulateOutput,
  simulateNode,
  buildProject,
  buildVirtualFiles,
  REAL_RUNTIME_FRAMEWORKS,
  FRAMEWORK_LABELS,
  FRAMEWORK_LANGUAGES,
  FRAMEWORK_MAIN_FILES,
  FrameworkSlug,
  RealRuntimeFramework,
  StackBlitzProject,
} from '../../utils/stackblitzTemplates';

const StackBlitzEmbed = lazy(() => import('../StackBlitzPlayground'));

interface StackBlitzPlaygroundProps {
  lang: Language;
  language?: FrameworkSlug;
  initialCode?: string;
}

// ---------------------------------------------------------------------------
// Virtual file tree helpers
// ---------------------------------------------------------------------------
interface TreeFolder {
  name: string;
  folders: TreeFolder[];
  files: { name: string; path: string }[];
}

const buildTree = (paths: string[]): TreeFolder => {
  const root: TreeFolder = { name: '', folders: [], files: [] };
  for (const p of paths) {
    const parts = p.split('/');
    let node = root;
    parts.forEach((part, i) => {
      const isFile = i === parts.length - 1;
      if (isFile) {
        node.files.push({ name: part, path: p });
      } else {
        let folder = node.folders.find((f) => f.name === part);
        if (!folder) {
          folder = { name: part, folders: [], files: [] };
          node.folders.push(folder);
        }
        node = folder;
      }
    });
  }
  const sortNode = (n: TreeFolder) => {
    n.folders.sort((a, b) => a.name.localeCompare(b.name));
    n.files.sort((a, b) => a.name.localeCompare(b.name));
    n.folders.forEach(sortNode);
  };
  sortNode(root);
  return root;
};

const FILE_LANGUAGE_BY_EXT: Record<string, string> = {
  ts: 'typescript',
  tsx: 'typescript',
  js: 'javascript',
  jsx: 'javascript',
  json: 'json',
  css: 'css',
  html: 'html',
  py: 'python',
  java: 'java',
  php: 'php',
  rb: 'ruby',
  md: 'markdown',
  xml: 'xml',
  properties: 'ini',
  yml: 'yaml',
  yaml: 'yaml',
  sql: 'sql',
  sh: 'shell',
};

const languageForFile = (path: string, fallback: string): string => {
  const ext = path.split('.').pop()?.toLowerCase() || '';
  return FILE_LANGUAGE_BY_EXT[ext] || fallback;
};

const baseName = (path: string): string => path.split('/').pop() || path;

const TreeFiles: React.FC<{
  folder: TreeFolder;
  depth: number;
  activeFile: string;
  onOpen: (path: string) => void;
}> = ({ folder, depth, activeFile, onOpen }) => (
  <>
    {folder.folders.map((f) => (
      <React.Fragment key={f.name}>
        <div
          className="flex items-center gap-1 py-[3px] text-[10px] font-mono text-zinc-600 select-none"
          style={{ paddingLeft: 6 + depth * 10 }}
        >
          <FontAwesomeIcon icon={faFolder} className="w-2.5 h-2.5 shrink-0 opacity-80" />
          <span className="truncate">{f.name}</span>
        </div>
        <TreeFiles folder={f} depth={depth + 1} activeFile={activeFile} onOpen={onOpen} />
      </React.Fragment>
    ))}
    {folder.files.map((f) => (
      <button
        key={f.path}
        type="button"
        onClick={() => onOpen(f.path)}
        title={f.path}
        className={`w-full text-left flex items-center gap-1 py-[3px] text-[10px] font-mono truncate transition-colors ${
          activeFile === f.path ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
        }`}
        style={{ paddingLeft: 6 + depth * 10 }}
      >
        <FontAwesomeIcon icon={faFile} className="w-2.5 h-2.5 shrink-0 opacity-70" />
        <span className="truncate">{f.name}</span>
      </button>
    ))}
  </>
);

// ---------------------------------------------------------------------------

export const StackBlitzPlayground: React.FC<StackBlitzPlaygroundProps> = ({ lang, language = 'nodejs', initialCode }) => {
  const isId = lang === 'id';
  const slug = language;
  const mainFile = FRAMEWORK_MAIN_FILES[slug];
  const [files, setFiles] = useState<Record<string, string>>(
    () => buildVirtualFiles(slug, initialCode || DEFAULT_CODE[slug])
  );
  const [activeFile, setActiveFile] = useState(mainFile);
  const [openTabs, setOpenTabs] = useState<string[]>([mainFile]);
  const [showTree, setShowTree] = useState(true);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const monacoRef = useRef<Parameters<OnMount>[1] | null>(null);
  const filesRef = useRef(files);
  const prevInitialCode = useRef(initialCode);
  const prevSlug = useRef(slug);
  const [editorKey, setEditorKey] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [isWide, setIsWide] = useState(true);
  const [blitzProject, setBlitzProject] = useState<StackBlitzProject | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isRunningRef = useRef(false);
  const runIdRef = useRef(0);
  const mountedRef = useRef(true);
  const runCodeRef = useRef<() => void>(() => {});
  const timersRef = useRef<Set<number>>(new Set());

  const code = files[mainFile] ?? '';

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (mountedRef.current) setEditorReady(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setIsHorizontal(entry.contentRect.width >= 500);
        setIsWide(entry.contentRect.width >= 700);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isWide) setShowTree(false);
  }, [isWide]);

  useEffect(() => {
    const target = initialCode || DEFAULT_CODE[slug];
    const codeChanged = prevInitialCode.current !== initialCode;
    const slugChanged = prevSlug.current !== slug;
    prevInitialCode.current = initialCode;
    prevSlug.current = slug;
    runIdRef.current++;
    isRunningRef.current = false;
    setIsRunning(false);
    if (codeChanged || slugChanged) {
      // Dispose stale Monaco models so the rebuilt project starts with a clean
      // undo stack instead of reverting into the previous week's code.
      const monaco = monacoRef.current;
      if (monaco) {
        Object.keys(filesRef.current).forEach((p) => {
          try {
            const model = monaco.editor.getModel(monaco.Uri.parse(p));
            if (model && !model.isDisposed()) model.dispose();
          } catch {
            // model already detached
          }
        });
      }
      const nextFiles = buildVirtualFiles(slug, target);
      const nextMain = FRAMEWORK_MAIN_FILES[slug];
      filesRef.current = nextFiles;
      setFiles(nextFiles);
      setActiveFile(nextMain);
      setOpenTabs([nextMain]);
      setEditorKey((k) => k + 1);
    }
    setOutput('');
    setError('');
    setBlitzProject(null);
  }, [initialCode, slug]);

  const runCode = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    const runId = ++runIdRef.current;
    setIsRunning(true);
    setOutput('');
    setError('');
    setExecutionTime(null);
    const start = performance.now();
    const finish = (result: { error?: string | null; output?: string }) => {
      if (!mountedRef.current || runIdRef.current !== runId) return;
      setExecutionTime(performance.now() - start);
      if (result.error) setError(result.error);
      if (result.output) setOutput(result.output);
      isRunningRef.current = false;
      setIsRunning(false);
    };
    const mainCode = filesRef.current[mainFile] ?? '';
    if (slug === 'nodejs') {
      simulateNode(mainCode)
        .then((result) => finish(result))
        .catch((err) => finish({ error: err instanceof Error ? err.message : String(err) }));
    } else {
      const timer = window.setTimeout(() => finish(simulateOutput(slug, mainCode)), 150 + Math.random() * 200);
      timersRef.current.add(timer);
    }
  }, [slug, mainFile]);

  runCodeRef.current = runCode;

  const canRunReal = (REAL_RUNTIME_FRAMEWORKS as readonly string[]).includes(slug);

  const openStackBlitz = useCallback(() => {
    if (!canRunReal) return;
    const base = buildProject(slug as RealRuntimeFramework, code);
    setBlitzProject({ ...base, files: { ...base.files, ...filesRef.current } });
  }, [canRunReal, slug, code]);

  const openStackBlitzTab = useCallback(async () => {
    if (!blitzProject) return;
    const sdk = (await import('@stackblitz/sdk')).default;
    sdk.openProject(
      { title: `Tryngo — ${FRAMEWORK_LABELS[slug]}`, template: blitzProject.template, files: blitzProject.files },
      { newWindow: true, openFile: blitzProject.mainFile, showSidebar: true }
    );
  }, [blitzProject, slug]);

  const handleFileChange = useCallback((value: string | undefined) => {
    const val = value || '';
    setFiles((prev) => {
      if (prev[activeFile] === val) return prev;
      const next = { ...prev, [activeFile]: val };
      filesRef.current = next;
      return next;
    });
  }, [activeFile]);

  const openFile = useCallback((path: string) => {
    setActiveFile(path);
    setOpenTabs((prev) => (prev.includes(path) ? prev : [...prev, path]));
  }, []);

  const closeTab = (path: string) => {
    if (path === mainFile || openTabs.length <= 1) return;
    const idx = openTabs.indexOf(path);
    const next = openTabs.filter((p) => p !== path);
    setOpenTabs(next);
    if (activeFile === path) setActiveFile(next[Math.max(0, idx - 1)]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (editorRef.current?.hasTextFocus()) {
        return; // Monaco command handles it
      }
      runCode();
    }
  };

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    editor.addCommand(2048 | 3, () => runCodeRef.current());
  };

  const tree = useMemo(() => buildTree(Object.keys(files)), [files]);
  const monacoLang = languageForFile(activeFile, FRAMEWORK_LANGUAGES[slug]);

  if (blitzProject) {
    return (
      <div className="flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 w-full h-full">
        <div className="flex items-center justify-between gap-2 px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
          <span className="text-[10px] text-zinc-500 font-mono truncate">
            {FRAMEWORK_LABELS[slug]} — {isId ? 'proyek multi-file' : 'multi-file project'}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={openStackBlitzTab}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-semibold transition-colors"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-2.5 h-2.5" />
              {isId ? 'Tab Baru' : 'New Tab'}
            </button>
            <button
              type="button"
              onClick={() => setBlitzProject(null)}
              className="px-2 py-0.5 rounded-md bg-[#2E5B44] hover:bg-[#234735] text-white text-[10px] font-bold transition-colors"
            >
              {isId ? 'Simulasi' : 'Simulation'}
            </button>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <Suspense
            fallback={
              <div className="h-full flex items-center justify-center bg-[#1e1e1e] text-zinc-500 text-xs gap-2">
                <FontAwesomeIcon icon={faSpinner} spin className="w-3 h-3" />
                {isId ? 'Memuat StackBlitz...' : 'Loading StackBlitz...'}
              </div>
            }
          >
            <StackBlitzEmbed lang={lang} project={blitzProject} title={`Tryngo — ${FRAMEWORK_LABELS[slug]}`} />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 w-full h-full"
      onKeyDown={handleKeyDown}
    >
      <div ref={containerRef} className={`flex-1 flex min-h-0 ${isHorizontal ? 'flex-row' : 'flex-col'}`}>
        <div className={`${isHorizontal ? 'w-1/2 min-h-0 border-r' : 'flex-1 min-h-[120px] border-b'} border-zinc-700/50 flex flex-col`}>
          <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => setShowTree((v) => !v)}
                title={isId ? 'Tampilkan / sembunyikan daftar file' : 'Show / hide file tree'}
                aria-pressed={showTree}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold transition-colors ${
                  showTree ? 'bg-zinc-800 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60'
                }`}
              >
                <FontAwesomeIcon icon={faFolderTree} className="w-3 h-3" />
                <span className="hidden sm:inline">{isId ? 'File' : 'Files'}</span>
              </button>
              <span
                className="text-[10px] text-zinc-500 font-mono truncate"
                title={isId ? 'File utama yang dijalankan simulasi' : 'Main file executed by the simulation'}
              >
                {mainFile}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {canRunReal && (
                <button
                  type="button"
                  onClick={openStackBlitz}
                  title={isId ? 'Jalankan proyek lengkap (multi-file) di StackBlitz' : 'Run the full multi-file project on StackBlitz'}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-semibold transition-colors"
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-2.5 h-2.5" />
                  StackBlitz
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 flex min-h-0">
            {showTree && (
              <div className="w-36 shrink-0 border-r border-zinc-800 bg-[#181818] overflow-y-auto py-1">
                <TreeFiles folder={tree} depth={0} activeFile={activeFile} onOpen={openFile} />
              </div>
            )}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-stretch bg-[#181818] border-b border-zinc-800 shrink-0 overflow-x-auto">
                {openTabs.map((p) => {
                  const isActive = p === activeFile;
                  return (
                    <div
                      key={p}
                      className={`flex items-center gap-1 pl-2.5 pr-1.5 py-1 border-r border-zinc-800/80 border-t-2 shrink-0 ${
                        isActive ? 'bg-[#1e1e1e] border-t-[#2E5B44]' : 'border-t-transparent hover:bg-zinc-800/40'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFile(p)}
                        title={p}
                        className={`text-[10px] font-mono max-w-[140px] truncate transition-colors ${
                          isActive ? 'text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {baseName(p)}
                      </button>
                      {p !== mainFile && (
                        <button
                          type="button"
                          onClick={() => closeTab(p)}
                          title={isId ? 'Tutup tab' : 'Close tab'}
                          className="p-0.5 rounded hover:bg-zinc-700 text-zinc-600 hover:text-zinc-300 transition-colors"
                        >
                          <FontAwesomeIcon icon={faXmark} className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex-1 min-h-0">
                {editorReady ? (
                  <Editor
                    key={editorKey}
                    path={activeFile}
                    height="100%"
                    language={monacoLang}
                    theme="vs-dark"
                    value={files[activeFile] ?? ''}
                    onChange={handleFileChange}
                    onMount={handleEditorMount}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 13,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: 'on',
                      padding: { top: 8 },
                    }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-[#1e1e1e] text-zinc-500 text-xs">
                    {isId ? 'Memuat editor...' : 'Loading editor...'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={`${isHorizontal ? 'w-1/2 min-h-0' : 'flex-1 min-h-[120px]'} flex flex-col bg-[#1a1a1a]`}>
          <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-500 font-mono">
                {isId ? 'Hasil' : 'Result'}
              </span>
              {executionTime !== null && (
                <span className="text-[9px] text-zinc-600 flex items-center gap-1">
                  <FontAwesomeIcon icon={faClock} className="w-2.5 h-2.5" />
                  {executionTime.toFixed(2)}ms
                </span>
              )}
            </div>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center gap-1 px-2.5 py-0 rounded-lg bg-[#2E5B44] hover:bg-[#234735] text-white text-[10px] sm:text-xs font-bold transition-all disabled:opacity-50 shadow-xs"
            >
              {isRunning ? (
                <FontAwesomeIcon icon={faSpinner} spin className="w-3 h-3 text-white" />
              ) : (
                <FontAwesomeIcon icon={faPlay} className="w-3 h-3 text-white" />
              )}
              <span className="hidden sm:inline">{isRunning ? (isId ? 'Menjalankan...' : 'Running...') : (isId ? 'Jalankan' : 'Run')}</span>
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-auto p-3 font-mono text-xs">
            {error ? (
              <div className="bg-red-900/30 border border-red-800/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-[10px] text-red-400 mb-1">
                  <FontAwesomeIcon icon={faTriangleExclamation} className="w-3 h-3" />
                  <span>{isId ? 'Error' : 'Error'}</span>
                </div>
                <pre className="text-red-300 text-[11px] whitespace-pre-wrap">{error}</pre>
              </div>
            ) : output ? (
              <pre className="text-zinc-200 whitespace-pre-wrap text-[11px]">{output}</pre>
            ) : (
              <div className="flex items-center gap-2 text-zinc-500 text-xs">
                <FontAwesomeIcon icon={faCircleInfo} className="w-3 h-3" />
                <span>
                  {isId
                    ? 'Klik "Jalankan" atau tekan Ctrl+Enter untuk mensimulasikan ' + FRAMEWORK_LABELS[slug] + ' (' + mainFile + ')...'
                    : 'Click "Run" or press Ctrl+Enter to simulate ' + FRAMEWORK_LABELS[slug] + ' (' + mainFile + ')...'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackBlitzPlayground;
