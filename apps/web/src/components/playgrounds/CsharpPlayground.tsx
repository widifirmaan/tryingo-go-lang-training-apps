import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faRotateLeft, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../../utils/translations';
import { executeCSharp, resetCSharp } from '../../utils/csharpEngine';

interface CsharpPlaygroundProps {
  lang: Language;
  initialCode?: string;
}

const DEFAULT_CSHARP = `// C# Playground — Tryngo
// Supports: Console.WriteLine, variables, loops, conditionals, methods, classes

using System;

class Program
{
    static void Main()
    {
        // Variables
        string name = "Tryngo";
        int year = 2026;
        Console.WriteLine($"Welcome to {name}!");
        Console.WriteLine($"Year: {year}");

        // Conditionals
        if (year > 2020)
        {
            Console.WriteLine("This is modern C#!");
        }

        // Loops
        for (int i = 1; i <= 3; i++)
        {
            Console.WriteLine($"Count: {i}");
        }

        // Arrays
        string[] fruits = new string[] { "Apple", "Banana", "Cherry" };
        foreach (string fruit in fruits)
        {
            Console.WriteLine(fruit);
        }

        // Method call
        int result = Add(5, 3);
        Console.WriteLine($"5 + 3 = {result}");
    }

    static int Add(int a, int b)
    {
        return a + b;
    }
}
`;

export const CsharpPlayground: React.FC<CsharpPlaygroundProps> = ({ lang, initialCode }) => {
  const isId = lang === 'id';
  const [code, setCode] = useState(initialCode || DEFAULT_CSHARP);
  const [output, setOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const prevInitialCode = useRef(initialCode);
  const [editorKey, setEditorKey] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setEditorReady(true));
  }, []);

  useEffect(() => {
    if (!initialCode) return;
    if (prevInitialCode.current === initialCode) return;
    prevInitialCode.current = initialCode;
    setCode(initialCode);
    setOutput([]);
    setErrors([]);
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [output, errors]);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput([]);
    setErrors([]);

    setTimeout(() => {
      const result = executeCSharp(code);
      setOutput(result.output);
      setErrors(result.errors);
      setIsRunning(false);
    }, 50);
  }, [code]);

  const handleReset = useCallback(() => {
    resetCSharp();
    setOutput([]);
    setErrors([]);
    setCode(initialCode || DEFAULT_CSHARP);
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  };

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.addCommand(
      2048 | 3, // Ctrl+Enter
      () => runCode()
    );
  };

  return (
    <div
      className="flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 w-full h-full"
      onKeyDown={handleKeyDown}
    >
      {/* Main Content */}
      <div className="flex-1 flex min-h-0 flex-col lg:flex-row">
        {/* Editor Panel */}
        <div className="flex-1 min-h-0 flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-700/50">
          <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
            <span className="text-[10px] text-zinc-500 font-mono">Program.cs</span>
            <span className="text-[9px] text-zinc-600 hidden sm:inline">{isId ? 'Edit kode di sini' : 'Edit code here'}</span>
          </div>
          <div className="flex-1 min-h-0">
            {editorReady ? (
              <Editor
                key={editorKey}
                height="100%"
                language="csharp"
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                onMount={handleEditorMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4,
                  wordWrap: 'on',
                  padding: { top: 8 },
                  renderLineHighlight: 'gutter',
                  bracketPairColorization: { enabled: true },
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-[#1e1e1e] text-zinc-500 text-xs">
                {isId ? 'Memuat editor...' : 'Loading editor...'}
              </div>
            )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex-1 min-h-0 flex flex-col bg-[#1a1a1a]">
          <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
            <span className="text-[10px] text-zinc-500 font-mono">
              {isId ? 'Hasil' : 'Result'}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
                title={isId ? 'Reset Kode' : 'Reset Code'}
              >
                <FontAwesomeIcon icon={faRotateLeft} className="w-3.5 h-3.5" />
              </button>
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
          </div>
          <div
            ref={outputRef}
            className="flex-1 min-h-0 overflow-auto p-3 sm:p-4 text-[11px] sm:text-xs leading-relaxed select-text bg-[#0b0e14]"
            style={{ scrollbarWidth: 'thin' }}
          >
            {output.length === 0 && errors.length === 0 ? (
              <div className="flex items-center gap-2 text-zinc-500">
                <FontAwesomeIcon icon={faCircleInfo} className="w-3 h-3" />
                <span>
                  {isId
                    ? 'Klik "Jalankan" atau tekan Ctrl+Enter untuk mengeksekusi kode C#...'
                    : 'Click "Run" or press Ctrl+Enter to execute C# code...'}
                </span>
              </div>
            ) : (
              <div className="space-y-1">
                {errors.length > 0 && errors.map((err, idx) => (
                  <div key={`err-${idx}`} className="bg-red-900/30 border border-red-800/50 rounded-lg p-3 mb-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-red-400 mb-1 font-mono">
                      <span className="text-red-500">✗</span>
                      <span>{isId ? 'Error Kompilasi' : 'Compilation Error'}</span>
                    </div>
                    <pre className="text-red-300 text-[11px] font-mono whitespace-pre-wrap">{err}</pre>
                  </div>
                ))}
                {output.map((line, idx) => (
                  <div key={idx} className="text-zinc-300 whitespace-pre-wrap font-mono">
                    {line || '\u00A0'}
                  </div>
                ))}
                {isRunning && <div className="text-zinc-500 animate-pulse">▊</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CsharpPlayground;
