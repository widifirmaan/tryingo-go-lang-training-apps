import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; import { faPlay, faSpinner, faRotateLeft, faExpand, faCompress, faTimes, faTriangleExclamation, faClock } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../utils/translations';
import { initGoWasm, isWasmReady, isTinyGoReady, runGoCode as wasmRunGoCode, runTinyGoWeek } from '../utils/goWasmLoader';

interface CodePlaygroundProps {
  lang: Language;
  initialCode?: string;
  language: string;
  onClose: () => void;
  inline?: boolean;
  week?: number;
}

const DEFAULT_CODE: Record<string, string> = {
  html: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tryngo Playground</title>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    h1 { color: #2E5B44; }
  </style>
</head>
<body>
  <h1>Halo, Tryngo! 🚀</h1>
  <p>Edit kode di samping dan lihat hasilnya di sini!</p>
  <button onclick="alert('Tryngo is awesome!')">Klik Saya</button>
</body>
</html>`,
  javascript: `// Tryngo JavaScript Playground
function greet(name) {
  return \`Hello, \${name}! Welcome to Tryngo!\`;
}

const result = greet("Student");
console.log(result);

// Try modifying the code above!
`,
  typescript: `// Tryngo TypeScript Playground
interface Student {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

const student: Student = {
  name: 'Tryngo Learner',
  level: 'beginner'
};

function celebrate(s: Student): string {
  return \`🎉 \${s.name} is learning at \${s.level} level!\`;
}

console.log(celebrate(student));
`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, Tryngo! 🚀")
    fmt.Println("Learning Go is fun!")
    
    // Try changing the code
    name := "Gopher"
    fmt.Printf("Welcome, %s!\\n", name)
}
`,
  python: `# Tryngo Python Playground
def greet(name):
    return f"Hello, {name}! Welcome to Tryngo!"

students = ["Alice", "Bob", "Charlie"]
for student in students:
    print(greet(student))

# Try modifying the code!
`,
  rust: `fn main() {
    println!("Hello, Tryngo! 🚀");
    println!("Learning Rust is fun!");
    
    let name = "Rustacean";
    let year = 2015;
    println!("Name: {}", name);
    println!("Rust first released: {}", year);
}`,
};

const LANGUAGE_MAP: Record<string, string> = {
  html5: 'html',
  css3: 'html',
  javascript: 'javascript',
  typescript: 'typescript',
  golang: 'go',
  python: 'python',
  nodejs: 'javascript',
  react: 'html',
  vue: 'html',
  nextjs: 'html',
  angular: 'html',
  svelte: 'html',
  php: 'html',
  laravel: 'html',
  rails: 'html',
  docker: 'html',
  rust: 'rust',
  postgresql: 'sql',
  mysql: 'sql',
  mongodb: 'javascript',
  redis: 'shell',
  graphql: 'graphql',
  csharp: 'csharp',
  spring: 'java',
  codeigniter: 'php',
  django: 'python',
  nestjs: 'typescript',
};

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  lang,
  initialCode,
  language,
  onClose,
  inline,
  week,
}) => {
  const [code, setCode] = useState(initialCode || DEFAULT_CODE[LANGUAGE_MAP[language] || 'html'] || DEFAULT_CODE.html);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConsole, setShowConsole] = useState(true);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const consoleTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isId = lang === 'id';
  const isWebLanguage = ['html', 'javascript', 'typescript', 'css'].includes(LANGUAGE_MAP[language] || 'html');
  const isTypeScript = LANGUAGE_MAP[language] === 'typescript';
  const isGoLanguage = LANGUAGE_MAP[language] === 'go';
  const isRustLanguage = LANGUAGE_MAP[language] === 'rust';

  // Defer Monaco mount until after first paint
  const [editorReady, setEditorReady] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setEditorReady(true));
  }, []);

  // TypeScript compiler ref
  const tsRef = useRef<any>(null);
  const [tsReady, setTsReady] = useState(false);

  useEffect(() => {
    if (!isTypeScript) return;
    if ((window as any).ts) {
      tsRef.current = (window as any).ts;
      setTsReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/typescript@5.5.4/lib/typescript.min.js';
    script.onload = () => {
      tsRef.current = (window as any).ts;
      setTsReady(true);
    };
    document.head.appendChild(script);
  }, [isTypeScript]);

  // Sync when initialCode changes (week/level switch) — skip first mount
  const prevInitialCode = useRef(initialCode);
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    if (!initialCode) return;
    if (prevInitialCode.current === initialCode) return;
    prevInitialCode.current = initialCode;
    setCode(initialCode);
    setOutput('');
    setError('');
    setEditorKey(k => k + 1);
  }, [initialCode]);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setError('');
    setOutput('');

    if (isWebLanguage) {
      // HTML/CSS/JS/TS: render in iframe
      const iframe = iframeRef.current;
      if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          let finalCode = code;

          // TypeScript: transpile to JavaScript first
          if (isTypeScript) {
            const ts = tsRef.current;
            if (!ts) {
              setError(isId ? 'TypeScript compiler belum siap. Coba lagi.' : 'TypeScript compiler not ready. Try again.');
              setIsRunning(false);
              return;
            }
            try {
              const result = ts.transpileModule(code, {
                compilerOptions: {
                  module: ts.ModuleKind.ESNext,
                  target: ts.ScriptTarget.ES2022,
                  strict: true,
                  noEmitHelpers: true,
                  importHelpers: false,
                },
              });
              const jsCode = result.outputText;
              finalCode = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TypeScript Output</title>
  <style>body{background:#fff;color:#000;font-family:system-ui,sans-serif;margin:0;padding:16px;line-height:1.6}pre{background:#f5f5f5;padding:8px;border-radius:4px}</style>
</head>
<body>
  <pre id="output"></pre>
  <script>
    const _origLog = console.log;
    const _logs = [];
    console.log = function(...args) {
      _logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
      document.getElementById('output').textContent = _logs.join('\\n');
      _origLog.apply(console, args);
    };
    console.error = function(...args) {
      _logs.push('Error: ' + args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
      document.getElementById('output').textContent = _logs.join('\\n');
    };
  </script>
  <script>${jsCode}</script>
</body>
</html>`;
            } catch (err) {
              setError(err instanceof Error ? err.message : (isId ? 'Gagal kompilasi TypeScript' : 'TypeScript compilation failed'));
              setIsRunning(false);
              return;
            }
          }

          const baseStyles = '<style>body{background:#fff;color:#000;font-family:system-ui,sans-serif;margin:0;padding:0}img{max-width:100%}</style>';
          const styledCode = finalCode.includes('</head>')
            ? finalCode.replace('</head>', baseStyles + '</head>')
            : finalCode.includes('<head>')
              ? finalCode.replace('<head>', '<head>' + baseStyles)
              : '<!DOCTYPE html><html><head>' + baseStyles + '</head><body>' + finalCode + '</body></html>';
          iframeDoc.open();
          iframeDoc.write(styledCode);
          iframeDoc.close();

          // Capture console.log from iframe
          try {
            const win = iframe.contentWindow;
            if (win) {
              const logs: string[] = [];
              const winAny = win as any;
              const originalLog = winAny.console.log.bind(winAny.console);
              winAny.console.log = (...args: any[]) => {
                logs.push(args.map((a: any) => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
                setOutput(logs.join('\n'));
              };
              setTimeout(() => {
                winAny.console.log = originalLog;
              }, 1000);
            }
          } catch {}
        }
      }
      setIsRunning(false);
    } else if (isGoLanguage) {
      // Go: execute via WASM (client-side)
      if (isWasmReady()) {
        try {
          const result = wasmRunGoCode(code);
          if (result.error) setError(result.error);
          if (result.output) setOutput(result.output);
          if (!result.success) setError(result.error || (isId ? 'Eksekusi gagal' : 'Execution failed'));
        } catch (err) {
          setError(err instanceof Error ? err.message : (isId ? 'Eksekusi gagal' : 'Execution failed'));
        }
      } else {
        setError(
          isId
            ? 'Interpreter Go WASM belum siap. Muat ulang halaman lalu coba lagi.'
            : 'Go WASM interpreter not ready. Reload the page and try again.'
        );
      }
      setIsRunning(false);
    } else if (isRustLanguage) {
      // Rust: execute directly via the Rust Playground API (CORS-enabled, no worker needed)
      try {
        const res = await fetch('https://play.rust-lang.org/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            crateType: 'bin',
            edition: '2021',
            channel: 'stable',
            mode: 'debug',
            tests: false,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const result = await res.json();
        if (!result.success) {
          setError(result.stderr || (isId ? 'Kompilasi Rust gagal.' : 'Rust compilation failed.'));
        } else {
          setOutput(result.stdout || result.stderr || (isId ? 'Kompilasi sukses tanpa output.' : 'Compiled successfully with no output.'));
        }
      } catch (err) {
        setError(
          isId
            ? 'Gagal terhubung ke Rust Playground. Periksa koneksi internet Anda.'
            : 'Failed to connect to the Rust Playground. Check your internet connection.'
        );
      }
      setIsRunning(false);
    } else {
      setError(
        isId
          ? 'Bahasa ini belum dapat dieksekusi di playground browser.'
          : 'This language is not yet executable in the browser playground.'
      );
      setIsRunning(false);
    }
  }, [code, isWebLanguage, isGoLanguage, isRustLanguage, language, isId]);

  const resetCode = () => {
    setCode(initialCode || DEFAULT_CODE[LANGUAGE_MAP[language] || 'html'] || DEFAULT_CODE.html);
    setOutput('');
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  };

  // Initialize Go WASM interpreters and auto-run TinyGo examples
  useEffect(() => {
    if (!isGoLanguage) return;
    let cancelled = false;

    initGoWasm().then(({ tinygo, yaegi }) => {
      if (cancelled) return;
      if (tinygo && week && week <= 11) {
        const result = runTinyGoWeek(week);
        if (result.output) setOutput(result.output);
      } else if (yaegi && initialCode) {
        const result = wasmRunGoCode(initialCode);
        if (result.output) setOutput(result.output);
      }
    });

    return () => { cancelled = true; };
  }, [isGoLanguage, week, initialCode]);

  // Detect container width to switch between horizontal/vertical layout
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setIsHorizontal(entry.contentRect.width >= 500);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const editorLanguage = LANGUAGE_MAP[language] === 'typescript' ? 'typescript'
    : LANGUAGE_MAP[language] === 'javascript' || LANGUAGE_MAP[language] === 'html' ? 'html'
    : LANGUAGE_MAP[language] === 'go' ? 'go'
    : LANGUAGE_MAP[language] === 'python' ? 'python'
    : LANGUAGE_MAP[language] === 'rust' ? 'rust'
    : 'html';

  const Wrapper = inline ? 'div' : motion.div;
  const wrapperProps = inline ? {} : {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <Wrapper
      {...wrapperProps}
      className={`flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 ${
        inline ? 'w-full h-full' : isFullscreen ? 'fixed inset-4 z-50' : 'w-full h-full'
      }`}
      onKeyDown={handleKeyDown}
    >
      {!inline && (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#252526] border-b border-zinc-700/50">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs text-zinc-400 font-medium ml-2 hidden sm:inline">
              {isWebLanguage
                ? (isId ? '🌐 Bahasa Web — Hasil langsung di preview' : '🌐 Web Language — Live preview')
                : isGoLanguage
                  ? (isId ? '🐹 Go WASM (TinyGo) — Pre-compiled, instan' : '🐹 Go WASM (TinyGo) — Pre-compiled, instant')
                : isRustLanguage
                  ? (isId ? '🦀 Rust — Eksekusi via Rust Playground API' : '🦀 Rust — Execute via Rust Playground API')
                  : (isId ? '⚙️ Bahasa Lain — Tidak dieksekusi di browser' : '⚙️ Other Language — Not executed in browser')
              }
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={resetCode}
              className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
              title={isId ? 'Reset Kode' : 'Reset Code'}
            >
              <FontAwesomeIcon icon={faRotateLeft} className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors hidden sm:block"
              title={isFullscreen ? (isId ? 'Keluar Layar Penuh' : 'Exit Fullscreen') : (isId ? 'Layar Penuh' : 'Fullscreen')}
            >
              {isFullscreen ? <FontAwesomeIcon icon={faCompress} className="w-3.5 h-3.5" /> : <FontAwesomeIcon icon={faExpand} className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
              title={isId ? 'Tutup' : 'Close'}
            >
              <FontAwesomeIcon icon={faTimes} className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Editor + Preview */}
      <div ref={containerRef} className={`flex-1 flex min-h-0 ${isHorizontal ? 'flex-row' : 'flex-col'}`}>
        {/* Editor Panel */}
        <div className={`${isHorizontal ? 'w-1/2 min-h-0 border-r' : 'flex-1 min-h-[120px] border-b'} border-zinc-700/50 flex flex-col`}>
          {/* Editor Header */}
          <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800">
            <span className="text-[10px] text-zinc-500 font-mono">
              {language}.{LANGUAGE_MAP[language] === 'html' ? 'html' : LANGUAGE_MAP[language] === 'javascript' ? 'js' : LANGUAGE_MAP[language] === 'typescript' ? 'ts' : LANGUAGE_MAP[language]}
            </span>
            <span className="text-[9px] text-zinc-600 hidden sm:inline">{isId ? 'Edit kode di sini' : 'Edit code here'}</span>
          </div>
          <div className="flex-1 min-h-0">
            {editorReady ? (
              <Editor
                key={editorKey}
                height="100%"
                language={editorLanguage}
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
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

        {/* Preview / Output Panel */}
        <div className={`${isHorizontal ? 'w-1/2 min-h-0' : 'flex-1 min-h-[120px]'} flex flex-col bg-white dark:bg-zinc-900`}>
          {/* Panel Header */}
          <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800">
            <span className="text-[10px] text-zinc-500 font-mono">
              {isId ? 'Hasil' : 'Result'}
            </span>
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

          {/* Preview or Console Output */}
          <div className="flex-1 min-h-0 relative">
            {isWebLanguage ? (
              <iframe
                ref={iframeRef}
                title="preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-modals allow-same-origin allow-forms"
              />
            ) : (
              <div className="p-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap overflow-auto h-full">
                {output || (
                  <span className="text-zinc-400 italic">
                    {isId ? 'Klik "Jalankan" untuk mengeksekusi kode...' : 'Click "Run" to execute code...'}
                  </span>
                )}
              </div>
            )}

            {/* Console Output Overlay */}
            {output && isWebLanguage && (
              <div className="absolute bottom-0 left-0 right-0 max-h-[40%] overflow-auto bg-black/80 text-green-400 p-3 font-mono text-[11px] leading-relaxed">
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mb-1 border-b border-zinc-700 pb-1">
                  <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                  <span>{isId ? 'Console Output' : 'Console Output'}</span>
                </div>
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>
            )}

            {error && (
              <div className="absolute bottom-0 left-0 right-0 bg-red-900/90 text-red-200 p-3 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 text-[10px] text-red-300 mb-1">
                  <FontAwesomeIcon icon={faTriangleExclamation} className="w-3 h-3" />
                  <span>{isId ? 'Error' : 'Error'}</span>
                </div>
                <pre className="whitespace-pre-wrap">{error}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {!inline && (
        <div className="px-3 sm:px-4 py-1.5 bg-[#252526] border-t border-zinc-700/50 text-[10px] text-zinc-500 flex items-center justify-between">
          <span>
            Tryngo Powered by{' '}
            <a
              href="https://widifirmaan.web.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white font-bold transition-colors"
            >
              W
            </a>
          </span>
        </div>
      )}
    </Wrapper>
  );
};

export default CodePlayground;
