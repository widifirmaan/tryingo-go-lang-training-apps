import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faRotateLeft, faCircleInfo, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../../utils/translations';

interface RubyPlaygroundProps {
  lang: Language;
  initialCode?: string;
  language?: string;
  inline?: boolean;
  week?: number;
}

interface OutputLine {
  text: string;
  kind: 'output' | 'error' | 'info' | 'result';
}

const DEFAULT_RUBY = `# Ruby Playground — Tryngo
# Klik "Run" atau tekan Ctrl+Enter untuk menjalankan

puts "Hello, World!"

# Variabel
nama = "Budi"
umur = 25
puts "Nama: #{nama}, Umur: #{umur}"

# Array
buah = ["apel", "mangga", "jeruk"]
buah.each do |b|
  puts "Buah: #{b}"
end

# Hash
mahasiswa = { nama: "Ani", nilai: 95 }
puts "#{mahasiswa[:nama]} mendapat nilai #{mahasiswa[:nilai]}"

# Method
def sapa(nama)
  "Halo, #{nama}!"
end

puts sapa("Dewi")
puts sapa("Eko")

# Times loop
3.times do |i|
  puts "Iterasi ke-#{i + 1}"
end

# While loop
counter = 0
while counter < 3
  puts "Counter: #{counter}"
  counter += 1
end

# Kondisional
nilai = 85
if nilai >= 80
  puts "Lulus dengan baik"
elsif nilai >= 60
  puts "Lulus"
else
  puts "Tidak lulus"
end
`;

let wasmModule: any = null;
let wasmLoadAttempted = false;

async function loadRubyWasm(): Promise<any> {
  if (wasmModule) return wasmModule;
  if (wasmLoadAttempted) return null;
  wasmLoadAttempted = true;

  try {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/ruby-head-wasm-wasi@2.3.0/dist/browser.umd.js';
    document.head.appendChild(script);

    await new Promise<void>((resolve, reject) => {
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load ruby-wasm script'));
      setTimeout(() => reject(new Error('ruby-wasm load timeout')), 15000);
    });

    const rubyWasi = (window as any)['ruby-wasm-wasi'];
    if (!rubyWasi || !rubyWasi.DefaultRubyVM) {
      console.warn('ruby-wasm not available on window');
      return null;
    }

    const wasmRes = await fetch('https://cdn.jsdelivr.net/npm/ruby-head-wasm-wasi@2.3.0/dist/ruby+stdlib.wasm');
    const wasmModuleBinary = await WebAssembly.compileStreaming(wasmRes);
    const { vm } = await rubyWasi.DefaultRubyVM(wasmModuleBinary, { consolePrint: true });
    wasmModule = { vm };
    return wasmModule;
  } catch (err) {
    console.warn('ruby-wasm unavailable, using procedural interpreter:', err);
    return null;
  }
}

function runRubyWasm(code: string): Promise<{ output: string[]; error: string | null }> {
  return new Promise((resolve) => {
    if (!wasmModule) {
      resolve({ output: [], error: 'WASM not loaded' });
      return;
    }

    const output: string[] = [];
    const origLog = console.log;
    const origError = console.error;
    const origWarn = console.warn;
    console.log = (...args: unknown[]) => output.push(args.map((a) => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    console.error = (...args: unknown[]) => output.push('Error: ' + args.map(String).join(' '));
    console.warn = (...args: unknown[]) => output.push('Warning: ' + args.map(String).join(' '));

    try {
      wasmModule.vm.eval(code);
      resolve({ output, error: null });
    } catch (err: any) {
      resolve({ output, error: err?.message || String(err) });
    } finally {
      console.log = origLog;
      console.error = origError;
      console.warn = origWarn;
    }
  });
}

interface InterpreterState {
  variables: Map<string, any>;
  methods: Map<string, FunctionDef>;
  output: OutputLine[];
  lastValue?: any;
  returnValue?: any;
  didReturn?: boolean;
}

interface FunctionDef {
  params: string[];
  body: string[];
}

function interpretRuby(code: string): { output: OutputLine[]; error: string | null } {
  const state: InterpreterState = {
    variables: new Map(),
    methods: new Map(),
    output: [],
    lastValue: undefined,
    returnValue: undefined,
    didReturn: false,
  };

  const lines = code.split('\n');
  try {
    processLines(lines, state);
    return { output: state.output, error: null };
  } catch (err: any) {
    return { output: state.output, error: err?.message || String(err) };
  }
}

function processLines(lines: string[], state: InterpreterState, depth = 0): number {
  let i = 0;
  while (i < lines.length) {
    if (state.didReturn) return i;
    const raw = lines[i];
    const line = raw.trim();

    if (!line || line.startsWith('#')) {
      i++;
      continue;
    }

    if (line === 'end') {
      return i;
    }

    if (line.startsWith('def ')) {
      const defMatch = line.match(/^def\s+(\w+)(?:\(([^)]*)\))?\s*$/);
      if (defMatch) {
        const methodName = defMatch[1];
        const params = defMatch[2] ? defMatch[2].split(',').map((p) => p.trim()) : [];
        const bodyLines: string[] = [];
        let defDepth = 0;
        i++;
        while (i < lines.length) {
          const bodyLine = lines[i].trim();
          if (bodyLine === 'end') {
            if (defDepth === 0) {
              break;
            }
            defDepth--;
          } else if (opensBlock(bodyLine)) {
            defDepth++;
          }
          bodyLines.push(lines[i]);
          i++;
        }
        state.methods.set(methodName, { params, body: bodyLines });
        i++;
        continue;
      }
    }

    if (line.startsWith('puts ') || line.startsWith('print ')) {
      const isPuts = line.startsWith('puts ');
      const expr = line.slice(isPuts ? 5 : 6).trim();
      const value = evaluateExpression(expr, state);
      if (Array.isArray(value)) {
        value.forEach((v) => state.output.push({ text: stringify(v), kind: 'output' }));
      } else {
        state.output.push({ text: stringify(value), kind: 'output' });
      }
      i++;
      continue;
    }

    if (line.startsWith('if ') || line === 'else' || line === 'elsif') {
      const ifMatch = line.match(/^if\s+(.+)$/);
      if (ifMatch) {
        const condition = ifMatch[1].trim();
        const ifBody: string[] = [];
        const elseIfBranches: { condition: string; body: string[] }[] = [];
        let elseBody: string[] = [];
        let inElse = false;
        let inElseIf = false;
        let currentElseIfCondition = '';
        let currentElseIfBody: string[] = [];

        i++;
        while (i < lines.length) {
          const bodyLine = lines[i].trim();
          if (bodyLine === 'end') break;
          if (bodyLine === 'else') {
            inElse = true;
            inElseIf = false;
            i++;
            continue;
          }
          const elsifMatch = bodyLine.match(/^elsif\s+(.+)$/);
          if (elsifMatch) {
            if (inElseIf) {
              elseIfBranches.push({ condition: currentElseIfCondition, body: currentElseIfBody });
            }
            inElseIf = true;
            inElse = false;
            currentElseIfCondition = elsifMatch[1].trim();
            currentElseIfBody = [];
            i++;
            continue;
          }
          if (inElse) {
            elseBody.push(lines[i]);
          } else if (inElseIf) {
            currentElseIfBody.push(lines[i]);
          } else {
            ifBody.push(lines[i]);
          }
          i++;
        }

        if (inElseIf) {
          elseIfBranches.push({ condition: currentElseIfCondition, body: currentElseIfBody });
        }

        if (evaluateCondition(condition, state)) {
          processLines(ifBody, state, depth + 1);
        } else {
          let matched = false;
          for (const branch of elseIfBranches) {
            if (evaluateCondition(branch.condition, state)) {
              processLines(branch.body, state, depth + 1);
              matched = true;
              break;
            }
          }
          if (!matched && elseBody.length > 0) {
            processLines(elseBody, state, depth + 1);
          }
        }
        i++;
        continue;
      }
    }

    if (line.match(/^\d+\.times\s+do/)) {
      const timesMatch = line.match(/^(\d+)\.times\s+do(?:\s*\|\s*(\w+)\s*\|\s*)?$/);
      if (timesMatch) {
        const count = parseInt(timesMatch[1]);
        const loopVar = timesMatch[2] || '__i';
        const bodyLines: string[] = [];
        i++;
        while (i < lines.length) {
          if (lines[i].trim() === 'end') break;
          bodyLines.push(lines[i]);
          i++;
        }
        for (let t = 0; t < count; t++) {
          state.variables.set(loopVar, t);
          processLines(bodyLines, state, depth + 1);
        }
        state.variables.delete(loopVar);
        i++;
        continue;
      }
    }

    if (line.startsWith('while ')) {
      const whileMatch = line.match(/^while\s+(.+)$/);
      if (whileMatch) {
        const condition = whileMatch[1].trim();
        const bodyLines: string[] = [];
        i++;
        while (i < lines.length) {
          if (lines[i].trim() === 'end') break;
          bodyLines.push(lines[i]);
          i++;
        }
        let iterations = 0;
        while (evaluateCondition(condition, state)) {
          processLines(bodyLines, state, depth + 1);
          iterations++;
          if (iterations > 10000) {
            throw new Error('Infinite loop detected (max 10000 iterations)');
          }
        }
        i++;
        continue;
      }
    }

    const eachMatch = line.match(/^(.+)\.each\s+do(?:\s*\|\s*(\w+)\s*\|\s*)?$/);
    if (eachMatch) {
      const collectionExpr = eachMatch[1].trim();
      const itemVar = eachMatch[2] || '__item';
      const bodyLines: string[] = [];
      i++;
      while (i < lines.length) {
        if (lines[i].trim() === 'end') break;
        bodyLines.push(lines[i]);
        i++;
      }
      const collection = evaluateExpression(collectionExpr, state);
      if (Array.isArray(collection)) {
        for (const item of collection) {
          state.variables.set(itemVar, item);
          processLines(bodyLines, state, depth + 1);
        }
      } else if (typeof collection === 'object' && collection !== null) {
        for (const [k, v] of Object.entries(collection)) {
          state.variables.set(itemVar, [k, v]);
          processLines(bodyLines, state, depth + 1);
        }
      }
      state.variables.delete(itemVar);
      i++;
      continue;
    }

    const assignMatch = line.match(/^(\w+)\s*=\s*(.+)$/);
    if (assignMatch) {
      const varName = assignMatch[1];
      const expr = assignMatch[2].trim();
      const value = evaluateExpression(expr, state);
      state.variables.set(varName, value);
      i++;
      continue;
    }

    const opAssignMatch = line.match(/^(\w+)\s*(\+\=|-\=|\*\=|\/\=)\s*(.+)$/);
    if (opAssignMatch) {
      const varName = opAssignMatch[1];
      const op = opAssignMatch[2];
      const expr = opAssignMatch[3].trim();
      const current = state.variables.get(varName);
      const newVal = evaluateExpression(expr, state);
      switch (op) {
        case '+=':
          state.variables.set(varName, (current ?? 0) + newVal);
          break;
        case '-=':
          state.variables.set(varName, (current ?? 0) - newVal);
          break;
        case '*=':
          state.variables.set(varName, (current ?? 0) * newVal);
          break;
        case '/=':
          state.variables.set(varName, (current ?? 0) / newVal);
          break;
      }
      i++;
      continue;
    }

    const methodCallMatch = line.match(/^(\w+)\(([^)]*)\)$/);
    if (methodCallMatch && state.methods.has(methodCallMatch[1])) {
      const methodName = methodCallMatch[1];
      const argsStr = methodCallMatch[2].trim();
      const args = argsStr ? argsStr.split(',').map((a) => evaluateExpression(a.trim(), state)) : [];
      const method = state.methods.get(methodName)!;
      const savedVars = new Map(state.variables);
      method.params.forEach((param, idx) => {
        state.variables.set(param, args[idx]);
      });
      state.lastValue = executeMethodBody(method.body, state);
      method.params.forEach((param) => {
        if (savedVars.has(param)) {
          state.variables.set(param, savedVars.get(param));
        } else {
          state.variables.delete(param);
        }
      });
      i++;
      continue;
    }

    const bareMethodCall = line.match(/^(\w+)$/);
    if (bareMethodCall && state.methods.has(bareMethodCall[1])) {
      const method = state.methods.get(bareMethodCall[1])!;
      state.lastValue = executeMethodBody(method.body, state);
      i++;
      continue;
    }

    const returnMatch = line.match(/^return(?:\s+(.+))?$/);
    if (returnMatch) {
      state.returnValue = returnMatch[1] ? evaluateExpression(returnMatch[1].trim(), state) : null;
      state.didReturn = true;
      return i;
    }

    try {
      const exprValue = evaluateExpression(line, state);
      if (exprValue !== undefined) {
        state.lastValue = exprValue;
      }
    } catch {
      // not a standalone expression — ignore
    }

    i++;
  }
  return lines.length;
}

function evaluateExpression(expr: string, state: InterpreterState): any {
  const trimmed = expr.trim();

  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    let str = trimmed.slice(1, -1);
    str = str.replace(/#\{([^}]+)\}/g, (_, inner) => {
      return stringify(evaluateExpression(inner.trim(), state));
    });
    return str;
  }

  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1);
  }

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];
    return splitArgs(inner).map((item) => evaluateExpression(item.trim(), state));
  }

  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return {};
    const obj: Record<string, any> = {};
    const pairs = splitArgs(inner);
    for (const pair of pairs) {
      const colonIdx = pair.indexOf(':');
      if (colonIdx > -1) {
        const key = pair.slice(0, colonIdx).trim();
        const val = pair.slice(colonIdx + 1).trim();
        const cleanKey = key.replace(/^:/, '').replace(/:$/, '');
        obj[cleanKey] = evaluateExpression(val, state);
      }
    }
    return obj;
  }

  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'nil') return null;

  const num = Number(trimmed);
  if (!isNaN(num) && trimmed !== '') return num;

  if (state.variables.has(trimmed)) {
    return state.variables.get(trimmed);
  }

  const methodCallMatch = trimmed.match(/^(\w+)\(([^)]*)\)$/);
  if (methodCallMatch && state.methods.has(methodCallMatch[1])) {
    const methodName = methodCallMatch[1];
    const argsStr = methodCallMatch[2].trim();
    const args = argsStr ? argsStr.split(',').map((a) => evaluateExpression(a.trim(), state)) : [];
    const method = state.methods.get(methodName)!;
    const savedVars = new Map(state.variables);
    method.params.forEach((param, idx) => {
      state.variables.set(param, args[idx]);
    });
    const result = executeMethodBody(method.body, state);
    method.params.forEach((param) => {
      if (savedVars.has(param)) {
        state.variables.set(param, savedVars.get(param));
      } else {
        state.variables.delete(param);
      }
    });
    return result;
  }

  const bareCall = trimmed.match(/^(\w+)$/);
  if (bareCall && state.methods.has(bareCall[1])) {
    const method = state.methods.get(bareCall[1])!;
    return executeMethodBody(method.body, state);
  }

  const propMatch = trimmed.match(/^(\w+)\[(\d+)\]$/);
  if (propMatch) {
    const arr = state.variables.get(propMatch[1]);
    const idx = parseInt(propMatch[2]);
    if (Array.isArray(arr)) return arr[idx];
  }

  const hashKeyMatch = trimmed.match(/^(\w+)\[:(\w+)\]$/);
  if (hashKeyMatch) {
    const hash = state.variables.get(hashKeyMatch[1]);
    const key = hashKeyMatch[2];
    if (hash && typeof hash === 'object') return hash[key];
  }

  const binOpMatch = findBinOp(trimmed);
  if (binOpMatch) {
    const left = evaluateExpression(binOpMatch.left.trim(), state);
    const op = binOpMatch.op;
    const right = evaluateExpression(binOpMatch.right.trim(), state);
    switch (op) {
      case '+': return (left ?? 0) + (right ?? 0);
      case '-': return (left ?? 0) - (right ?? 0);
      case '*': return (left ?? 0) * (right ?? 0);
      case '/': return (left ?? 0) / (right ?? 1);
      case '%': return (left ?? 0) % (right ?? 1);
      case '**': return Math.pow(left ?? 0, right ?? 0);
      case '==': return left === right;
      case '!=': return left !== right;
      case '<': return (left ?? 0) < (right ?? 0);
      case '>': return (left ?? 0) > (right ?? 0);
      case '<=': return (left ?? 0) <= (right ?? 0);
      case '>=': return (left ?? 0) >= (right ?? 0);
      case '<=>': return (left ?? 0) - (right ?? 0);
    }
  }

  const lengthMatch = trimmed.match(/^(\w+)\.length$/);
  if (lengthMatch) {
    const val = state.variables.get(lengthMatch[1]);
    if (Array.isArray(val) || typeof val === 'string') return val.length;
  }

  const toSMatch = trimmed.match(/^(\w+)\.to_s$/);
  if (toSMatch) {
    const val = state.variables.get(toSMatch[1]);
    return stringify(val);
  }

  const toIMatch = trimmed.match(/^(\w+)\.to_i$/);
  if (toIMatch) {
    const val = state.variables.get(toIMatch[1]);
    return parseInt(val) || 0;
  }

  return trimmed;
}

function executeMethodBody(body: string[], state: InterpreterState): any {
  const savedOutput = [...state.output];
  const savedLastValue = state.lastValue;
  const savedReturnValue = state.returnValue;
  const savedDidReturn = state.didReturn;
  state.output = [];
  state.lastValue = undefined;
  state.returnValue = undefined;
  state.didReturn = false;

  processLines(body, state, 0);

  const methodOutput = state.output;
  const result = state.didReturn ? state.returnValue : state.lastValue;
  state.output = savedOutput;
  state.lastValue = savedLastValue;
  state.returnValue = savedReturnValue;
  state.didReturn = savedDidReturn;

  for (const line of methodOutput) {
    state.output.push(line);
  }

  return result;
}

function evaluateCondition(condition: string, state: InterpreterState): boolean {
  const andParts = condition.split('&&');
  if (andParts.length > 1) {
    return andParts.every((p) => evaluateCondition(p.trim(), state));
  }

  const orParts = condition.split('||');
  if (orParts.length > 1) {
    return orParts.some((p) => evaluateCondition(p.trim(), state));
  }

  const notMatch = condition.match(/^!\s*(.+)$/);
  if (notMatch) {
    return !evaluateCondition(notMatch[1].trim(), state);
  }

  const compMatch = condition.match(/^(.+?)\s*(\=\=|\!\=|\<\=|\>\=|\<|\>)\s*(.+)$/);
  if (compMatch) {
    const left = evaluateExpression(compMatch[1].trim(), state);
    const op = compMatch[2];
    const right = evaluateExpression(compMatch[3].trim(), state);
    switch (op) {
      case '==': return left === right;
      case '!=': return left !== right;
      case '<': return (left ?? 0) < (right ?? 0);
      case '>': return (left ?? 0) > (right ?? 0);
      case '<=': return (left ?? 0) <= (right ?? 0);
      case '>=': return (left ?? 0) >= (right ?? 0);
    }
  }

  const val = evaluateExpression(condition, state);
  return !!val;
}

function stringify(val: any): string {
  if (val === null || val === undefined) return 'nil';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (Array.isArray(val)) return `[${val.map(stringify).join(', ')}]`;
  if (typeof val === 'object') {
    const entries = Object.entries(val).map(([k, v]) => `:${k} => ${stringify(v)}`);
    return `{${entries.join(', ')}}`;
  }
  return String(val);
}

function opensBlock(line: string): boolean {
  return /^(if\s|unless\s|while\s|until\s|for\s|case\s|begin$|def\s)/.test(line)
    || /do(?:\s*\|\s*\w+\s*(?:,\s*\w+)*\s*\|)?\s*$/.test(line);
}

const BIN_OPS = ['<=>', '**', '<=', '>=', '==', '!=', '<', '>', '+', '-', '*', '/', '%'];

function findBinOp(expr: string): { left: string; op: string; right: string } | null {
  let depth = 0;
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth--;
    else if (depth === 0) {
      for (const op of BIN_OPS) {
        if (expr.startsWith(op, i)) {
          const left = expr.slice(0, i).trim();
          const right = expr.slice(i + op.length).trim();
          if (left && right) return { left, op, right };
          break;
        }
      }
    }
  }
  return null;
}

function splitArgs(str: string): string[] {
  const result: string[] = [];
  let depth = 0;
  let current = '';
  for (const ch of str) {
    if (ch === '[' || ch === '{' || ch === '(') depth++;
    if (ch === ']' || ch === '}' || ch === ')') depth--;
    if (ch === ',' && depth === 0) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) result.push(current.trim());
  return result;
}

export const RubyPlayground: React.FC<RubyPlaygroundProps> = ({
  lang,
  initialCode,
  inline,
}) => {
  const isId = lang === 'id';
  const [code, setCode] = useState(initialCode || DEFAULT_RUBY);
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [wasmStatus, setWasmStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const prevInitialCode = useRef(initialCode);
  const [editorKey, setEditorKey] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setEditorReady(true));
  }, []);

  useEffect(() => {
    loadRubyWasm()
      .then((wasm) => {
        setWasmStatus(wasm ? 'ready' : 'unavailable');
      })
      .catch(() => {
        setWasmStatus('unavailable');
      });
  }, []);

  useEffect(() => {
    if (!initialCode) return;
    if (prevInitialCode.current === initialCode) return;
    prevInitialCode.current = initialCode;
    setCode(initialCode);
    setOutput([]);
    setEditorKey((k) => k + 1);
  }, [initialCode]);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [output]);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput([]);

    await new Promise((r) => setTimeout(r, 50));

    if (wasmStatus === 'ready' && wasmModule) {
      const result = await runRubyWasm(code);
      if (result.error) {
        setOutput([
          ...result.output.map((t) => ({ text: t, kind: 'output' as const })),
          { text: result.error, kind: 'error' },
        ]);
      } else {
        setOutput(result.output.map((t) => ({ text: t, kind: 'output' as const })));
      }
    } else {
      const result = interpretRuby(code);
      if (result.error) {
        setOutput([
          ...result.output,
          { text: result.error, kind: 'error' },
        ]);
      } else {
        setOutput(result.output);
      }
    }

    setIsRunning(false);
  }, [code, wasmStatus]);

  const handleReset = useCallback(() => {
    setOutput([]);
    setCode(initialCode || DEFAULT_RUBY);
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
    editor.addCommand(2048 | 3, () => runCode());
  };

  return (
    <div
      className={`flex flex-col bg-[#1e1e1e] rounded-[28px] overflow-hidden border border-zinc-700/50 ${
        inline ? 'w-full h-full' : 'w-full h-full shadow-2xl'
      }`}
      onKeyDown={handleKeyDown}
    >
      {/* Main Content */}
      <div className="flex-1 flex min-h-0 flex-col lg:flex-row">
        {/* Editor Panel */}
        <div className="flex-1 min-h-0 flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-700/50">
          <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
            <span className="text-[10px] text-zinc-500 font-mono">main.rb</span>
            <span className="text-[9px] text-zinc-600 hidden sm:inline">{isId ? 'Edit kode di sini' : 'Edit code here'}</span>
          </div>
          <div className="flex-1 min-h-0">
            {editorReady ? (
              <Editor
                key={editorKey}
                height="100%"
                language="ruby"
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

        {/* Output Panel */}
        <div className="flex-1 min-h-0 flex flex-col bg-[#1a1a1a]">
          <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-zinc-800 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-500 font-mono">
                {isId ? 'Hasil' : 'Result'}
              </span>
              {wasmStatus === 'loading' && (
                <span className="text-[9px] text-yellow-500">
                  {isId ? 'Memuat WASM...' : 'Loading WASM...'}
                </span>
              )}
            </div>
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
            className="flex-1 min-h-0 overflow-auto p-3 font-mono text-[11px] sm:text-xs leading-relaxed"
          >
            {output.length === 0 && !isRunning ? (
              <div className="flex items-center gap-2 text-zinc-500">
                <FontAwesomeIcon icon={faCircleInfo} className="w-3 h-3" />
                <span>
                  {isId
                    ? 'Klik "Jalankan" atau tekan Ctrl+Enter untuk mengeksekusi kode Ruby...'
                    : 'Click "Run" or press Ctrl+Enter to execute Ruby code...'}
                </span>
              </div>
            ) : (
              <div className="space-y-0.5">
                {output.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      line.kind === 'error'
                        ? 'text-red-400 whitespace-pre-wrap'
                        : line.kind === 'info'
                        ? 'text-zinc-500 italic whitespace-pre-wrap'
                        : 'text-zinc-200 whitespace-pre-wrap'
                    }
                  >
                    {line.text || '\u00A0'}
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

export default RubyPlayground;
