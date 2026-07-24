import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; import { faPlay, faRotateLeft, faExpand, faCompress, faTimes, faTriangleExclamation, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../utils/translations';

interface CodePlaygroundProps {
  lang: Language;
  initialCode?: string;
  language: string;
  onClose: () => void;
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
  rust: 'html',
  postgresql: 'html',
  graphql: 'html',
  csharp: 'html',
  spring: 'html',
  codeigniter: 'html',
  mysql: 'html',
  mongodb: 'html',
  redis: 'html',
  django: 'python',
  nestjs: 'javascript',
};

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  lang,
  initialCode,
  language,
  onClose,
}) => {
  const [code, setCode] = useState(initialCode || DEFAULT_CODE[LANGUAGE_MAP[language] || 'html'] || DEFAULT_CODE.html);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConsole, setShowConsole] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const consoleTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isId = lang === 'id';

  const isWebLanguage = ['html', 'javascript', 'typescript', 'css'].includes(LANGUAGE_MAP[language] || 'html');

  const WORKER_URL = (import.meta as any).env?.VITE_EXECUTION_WORKER_URL || 'https://tryngo-code-execution.REPLACE.workers.dev';

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setError('');
    setOutput('');

    if (isWebLanguage) {
      // HTML/CSS/JS: render in iframe
      const iframe = iframeRef.current;
      if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(code);
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
    } else {
      try {
        const res = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            language: LANGUAGE_MAP[language] || language,
          }),
        });

        if (!res.ok) {
          const errText = await res.text();
          setError(errText || `HTTP ${res.status}`);
          setIsRunning(false);
          return;
        }

        const result = await res.json();

        if (result.stderr) {
          setError(result.stderr);
        }
        if (result.stdout) {
          setOutput(result.stdout);
        }
        if (!result.success) {
          setError(result.stderr || (isId ? 'Eksekusi gagal' : 'Execution failed'));
        }

        setIsRunning(false);
      } catch (err) {
        setError(
          isId
            ? `Gagal terhubung ke server eksekusi.\nPastikan Worker sudah di-deploy.\n\nDetail: ${err instanceof Error ? err.message : 'Network error'}`
            : `Failed to connect to execution server.\nMake sure the Worker is deployed.\n\nDetail: ${err instanceof Error ? err.message : 'Network error'}`
        );
        setIsRunning(false);
      }
    }
  }, [code, isWebLanguage, language, isId, WORKER_URL]);

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

  // Auto-run on mount
  useEffect(() => {
    const timer = setTimeout(() => runCode(), 500);
    return () => clearTimeout(timer);
  }, []);

  const editorLanguage = LANGUAGE_MAP[language] === 'typescript' ? 'typescript'
    : LANGUAGE_MAP[language] === 'javascript' || LANGUAGE_MAP[language] === 'html' ? 'html'
    : LANGUAGE_MAP[language] === 'go' ? 'go'
    : LANGUAGE_MAP[language] === 'python' ? 'python'
    : 'html';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 shadow-2xl ${
        isFullscreen ? 'fixed inset-4 z-50' : 'w-full h-full'
      }`}
      onKeyDown={handleKeyDown}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#252526] border-b border-zinc-700/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-[10px] sm:text-xs text-zinc-400 font-medium ml-2 hidden sm:inline">
            {isWebLanguage
              ? (isId ? '🌐 Bahasa Web — Hasil langsung di preview' : '🌐 Web Language — Live preview')
              : (isId ? '⚙️ Bahasa Server — Eksekusi via Worker' : '⚙️ Server Language — Execute via Worker')
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

      {/* Editor + Preview */}
      <div className="flex-1 flex flex-col sm:flex-row min-h-0">
        {/* Editor Panel */}
        <div className="flex-1 min-h-[200px] sm:min-h-0 border-b sm:border-b-0 sm:border-r border-zinc-700/50 flex flex-col">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800">
            <span className="text-[10px] text-zinc-500 font-mono">
              {language}.{LANGUAGE_MAP[language] === 'html' ? 'html' : LANGUAGE_MAP[language] === 'javascript' ? 'js' : 'ts'}
            </span>
            <span className="text-[9px] text-zinc-600 hidden sm:inline">{isId ? 'Edit kode di sini' : 'Edit code here'}</span>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
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
          </div>
        </div>

        {/* Preview / Output Panel */}
        <div className="flex-1 min-h-[200px] sm:min-h-0 flex flex-col bg-white">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-3 py-1 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowConsole(true)}
                className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${
                  showConsole ? 'bg-[#2E5B44] text-white' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {isId ? 'Hasil' : 'Result'}
              </button>
              {!isWebLanguage && (
                <button
                  onClick={() => setShowConsole(false)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${
                    !showConsole ? 'bg-[#2E5B44] text-white' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Output
                </button>
              )}
            </div>

            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2E5B44] hover:bg-[#234735] text-white text-[10px] sm:text-xs font-bold transition-all disabled:opacity-50 shadow-xs"
            >
              <FontAwesomeIcon icon={faPlay} className={`w-3 h-3 text-white ${isRunning ? 'animate-pulse' : ''}`} />
              <span className="hidden sm:inline">{isId ? 'Jalankan' : 'Run'}</span>
              <span className="text-[8px] opacity-60 hidden sm:inline">Ctrl+Enter</span>
            </button>
          </div>

          {/* Preview or Console Output */}
          <div className="flex-1 min-h-0 relative">
            {isWebLanguage ? (
              <iframe
                ref={iframeRef}
                title="preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-modals allow-same-origin"
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

      {/* Footer Hint */}
      <div className="px-3 sm:px-4 py-1.5 bg-[#252526] border-t border-zinc-700/50 text-[10px] text-zinc-500 flex items-center justify-between">
        <span>
          {isId ? '💡 Tekan Ctrl+Enter untuk menjalankan' : '💡 Press Ctrl+Enter to run'}
        </span>
        <span className="hidden sm:inline">
          {isId
            ? `Mode: ${isWebLanguage ? 'Live Preview' : 'Server Execution'}`
            : `Mode: ${isWebLanguage ? 'Live Preview' : 'Server Execution'}`
          }
        </span>
      </div>
    </motion.div>
  );
};

export default CodePlayground;
