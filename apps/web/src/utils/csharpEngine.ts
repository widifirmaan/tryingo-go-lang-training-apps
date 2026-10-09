// ============================================================================
// csharpEngine.ts — Procedural C# interpreter for Tryngo.
// Parses common C# patterns and executes them procedurally.
// ============================================================================

export interface ExecutionResult {
  output: string[];
  errors: string[];
  success: boolean;
}

interface Variable {
  type: 'int' | 'string' | 'bool' | 'double' | 'array' | 'object' | 'var';
  value: any;
}

interface MethodDef {
  name: string;
  params: { name: string; type: string }[];
  body: string[];
  returnType: string;
}

interface ClassDef {
  name: string;
  fields: Map<string, Variable>;
  methods: MethodDef[];
}

const C_KEYWORDS = new Set(['using', 'namespace', 'class', 'static', 'void', 'int', 'string', 'bool', 'double', 'var', 'new', 'if', 'else', 'for', 'while', 'foreach', 'in', 'return', 'true', 'false', 'null', 'Console', 'WriteLine', 'Write', 'using', 'System']);

let activeOutput: string[] | null = null;

export function executeCSharp(code: string): ExecutionResult {
  const output: string[] = [];
  const errors: string[] = [];

  try {
    activeOutput = output;
    runProgram(code, output);
    return { output, errors, success: true };
  } catch (err: any) {
    const msg = err.message || String(err);
    errors.push(msg);
    return { output, errors, success: false };
  } finally {
    activeOutput = null;
  }
}

function runProgram(code: string, output: string[]): string[] {
  const variables = new Map<string, Variable>();
  const methods = new Map<string, MethodDef>();
  const classes = new Map<string, ClassDef>();
  const records = new Map<string, string[]>();

  // Pre-scan records: e.g. public record StockBatch(...)
  const recordMatches = code.matchAll(/(?:public\s+)?record\s+(\w+)\s*\(([^)]*)\)/g);
  for (const rm of recordMatches) {
    const recName = rm[1];
    const fields = rm[2].split(',').map((f) => {
      const parts = f.trim().split(/\s+/);
      return parts[parts.length - 1];
    }).filter(Boolean);
    records.set(recName, fields);
  }

  const stripped = stripComments(code);
  const lines = stripped.split('\n');

  let i = 0;
  while (i < lines.length) {
    let line = lines[i].trim();

    if (!line || line === '{' || line === '}') { i++; continue; }

    // Using statements
    if (line.startsWith('using ')) { i++; continue; }

    // Namespace declaration — skip to opening brace
    if (line.startsWith('namespace ')) {
      i++;
      let depth = 0;
      while (i < lines.length) {
        const msk = maskStrings(lines[i]);
        if (msk.includes('{')) depth++;
        if (msk.includes('}')) {
          depth--;
          if (depth <= 0) { i++; break; }
        }
        i++;
      }
      continue;
    }

    // Record declaration (skip declaration statement if encountered during execution)
    if (/^(?:public\s+)?record\s+\w+/.test(line)) {
      i++;
      continue;
    }

    // Class declaration
    if (line.startsWith('class ') || line.startsWith('public class ') || line.startsWith('static class ')) {
      const { classDef, nextIdx } = parseClass(lines, i);
      classes.set(classDef.name, classDef);
      // Register methods
      for (const m of classDef.methods) {
        methods.set(`${classDef.name}.${m.name}`, m);
        methods.set(m.name, m);
      }
      i = nextIdx;
      continue;
    }

    // Top-level method (static)
    if (isMethodDecl(line)) {
      const { method, nextIdx } = parseMethod(lines, i);
      methods.set(method.name, method);
      i = nextIdx;
      continue;
    }

    // Assemble multiline statements if line does not terminate with ';' or '{' and is not a control structure
    const isControl = /^(?:if|while|for|foreach)\s*\(/.test(line);
    if (!isControl && !line.endsWith(';') && !line.endsWith('{')) {
      let assembled = line;
      let j = i + 1;
      let depth = 0;
      for (const ch of line) { if (ch === '{' || ch === '(') depth++; else if (ch === '}' || ch === ')') depth--; }
      while (j < lines.length) {
        const nextL = lines[j].trim();
        if (nextL) {
          assembled += ' ' + nextL;
          for (const ch of nextL) { if (ch === '{' || ch === '(') depth++; else if (ch === '}' || ch === ')') depth--; }
        }
        j++;
        if ((nextL.endsWith(';') || assembled.endsWith(';')) && depth <= 0) break;
      }
      line = assembled;
      const result = executeStatement(line, variables, methods, classes, lines, i, records);
      if (result.output) output.push(...result.output);
      i = j;
      continue;
    }

    // Statement execution
    const result = executeStatement(line, variables, methods, classes, lines, i, records);
    if (result.output) output.push(...result.output);
    i = result.nextIdx ?? (i + 1);
  }

  // Entry point: invoke Main after all methods/classes are registered
  const mainMethod = methods.get('Main');
  if (mainMethod) {
    invokeMethod('Main', [], methods, variables, classes);
  }

  return output;
}

function stripComments(code: string): string {
  let out = '';
  let inStr: '"' | "'" | null = null;
  let inBlock = false;
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    const next = code[i + 1];
    if (inBlock) {
      if (ch === '*' && next === '/') {
        inBlock = false;
        out += '  ';
        i++;
      } else {
        out += ch === '\n' ? '\n' : ' ';
      }
      continue;
    }
    if (inStr) {
      out += ch;
      if (ch === '\\') {
        if (next !== undefined) {
          out += next;
          i++;
        }
        continue;
      }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === '/' && next === '*') {
      inBlock = true;
      out += '  ';
      i++;
      continue;
    }
    if (ch === '/' && next === '/') {
      while (i < code.length && code[i] !== '\n') {
        out += ' ';
        i++;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      inStr = ch;
      out += ch;
      continue;
    }
    out += ch;
  }
  return out;
}

// Replace contents of string literals (incl. interpolated) with spaces so that
// braces inside strings (e.g. {year} in $"...") don't confuse block parsing.
function maskStrings(line: string): string {
  let out = '';
  let inStr: '"' | "'" | null = null;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inStr) {
      if (ch === '\\') { out += ' '; if (i + 1 < line.length) { out += ' '; i++; } continue; }
      if (ch === inStr) { inStr = null; out += ' '; continue; }
      out += ' ';
      continue;
    }
    if (ch === '"' && line[i - 1] !== '\\') { inStr = '"'; out += ' '; continue; }
    if (ch === "'" && line[i - 1] !== '\\') { inStr = "'"; out += ' '; continue; }
    out += ch;
  }
  return out;
}

function isMethodDecl(line: string): boolean {
  return /^(?:(?:public|private|protected|internal)\s+)?(?:static\s+)?(void|int|string|bool|double|var|\w+)\s+\w+\s*\(/.test(line);
}

function parseClass(lines: string[], startIdx: number): { classDef: ClassDef; nextIdx: number } {
  const header = lines[startIdx].trim();
  const nameMatch = header.match(/class\s+(\w+)/);
  const name = nameMatch ? nameMatch[1] : 'Unknown';

  const fields = new Map<string, Variable>();
  const methods: MethodDef[] = [];

  let i = startIdx + 1;
  let depth = 0;
  if (maskStrings(lines[startIdx]).includes('{')) depth = 1;

  while (i < lines.length) {
    const line = lines[i].trim();
    const masked = maskStrings(line);
    const { opens, closes } = countBraces(masked);

    if (closes > opens) {
      depth -= closes - opens;
      if (depth <= 0) { i++; break; }
    }

    if (opens > closes) depth += opens - closes;

    if (isMethodDecl(line)) {
      const { method, nextIdx } = parseMethod(lines, i);
      methods.push(method);
      i = nextIdx;
    } else if (line.match(/^(public|private|protected|static|readonly|\s)*\s*(int|string|bool|double|var)\s+\w+(\s*=\s*.+)?;$/)) {
      // Field declaration
      parseFieldDeclaration(line, fields);
      i++;
    } else {
      i++;
    }
  }

  return { classDef: { name, fields, methods }, nextIdx: i };
}

function parseFieldDeclaration(line: string, fields: Map<string, Variable>): void {
  const cleaned = line.replace(/^(public|private|protected|static|readonly|\s)+/g, '').trim();
  const match = cleaned.match(/(\w+)\s+(\w+)(?:\s*=\s*(.+))?;/);
  if (match) {
    const type = match[1] as Variable['type'];
    const name = match[2];
    const value = match[3]?.trim();
    if (value) {
      fields.set(name, { type, value: evalExpr(value, new Map(), new Map(), new Map()) });
    } else {
      fields.set(name, { type, value: null });
    }
  }
}

// Count { and } in a string-literal-masked line.
function countBraces(masked: string): { opens: number; closes: number } {
  let opens = 0, closes = 0;
  for (const ch of masked) {
    if (ch === '{') opens++;
    else if (ch === '}') closes++;
  }
  return { opens, closes };
}

// Is this line a bare block delimiter like "{" or "}" (no code on the same line)?
function isBareBrace(line: string): boolean {
  return line.replace(/[{}\s]/g, '').length === 0;
}

function parseMethod(lines: string[], startIdx: number): { method: MethodDef; nextIdx: number } {
  const header = lines[startIdx].trim();
  const match = header.match(/(?:(?:public|private|protected|internal)\s+)?(?:static\s+)?(\w+)\s+(\w+)\s*\(([^)]*)\)/);
  if (!match) return { method: { name: 'unknown', params: [], body: [], returnType: 'void' }, nextIdx: startIdx + 1 };

  const returnType = match[1];
  const name = match[2];
  const paramsStr = match[3].trim();
  const params = paramsStr ? parseParams(paramsStr) : [];

  const body: string[] = [];
  let i = startIdx + 1;
  let depth = 0;
  if (maskStrings(lines[startIdx]).includes('{')) depth = 1;

  while (i < lines.length) {
    const line = lines[i].trim();
    const masked = maskStrings(line);
    const { opens, closes } = countBraces(masked);

    if (closes > opens) {
      depth -= closes - opens;
      if (depth <= 0) { i++; break; }
    }

    if (opens > closes) depth += opens - closes;

    if (depth >= 1 && line) {
      body.push(line);
    }
    i++;
  }

  return { method: { name, params, body, returnType }, nextIdx: i };
}

function parseParams(paramsStr: string): { name: string; type: string }[] {
  return paramsStr.split(',').map((p) => {
    const parts = p.trim().split(/\s+/);
    return { type: parts[0], name: parts[1] || 'unknown' };
  }).filter((p) => p.type && p.name);
}

function executeStatement(
  line: string,
  variables: Map<string, Variable>,
  methods: Map<string, MethodDef>,
  classes: Map<string, ClassDef>,
  allLines: string[],
  currentIdx: number,
  records?: Map<string, string[]>
): { output?: string[]; nextIdx?: number; returnValue?: any; control?: 'break' | 'continue' } {
  // Block opening
  if (line === '{') {
    return {};
  }

  // break / continue control flow
  if (line === 'break' || line === 'break;') return { control: 'break' };
  if (line === 'continue' || line === 'continue;') return { control: 'continue' };

  // Variable declaration with assignment (supports types like List<StockBatch>, var, int, string, etc.)
  const varDecl = line.match(/^(?:int|string|bool|double|var|[A-Za-z_]\w*(?:<[^>]+>)?)\s+(\w+)\s*=\s*([\s\S]+?);?$/);
  if (varDecl && !line.startsWith('if') && !line.startsWith('while') && !line.startsWith('for') && !line.startsWith('return')) {
    const name = varDecl[1];
    const valueStr = varDecl[2].trim();
    const value = evalExpr(valueStr, variables, methods, classes, records);
    variables.set(name, { type: inferType(value), value });
    return {};
  }

  // Variable declaration without assignment
  const varDeclNoAssign = line.match(/^(int|string|bool|double)\s+(\w+);$/);
  if (varDeclNoAssign) {
    const type = varDeclNoAssign[1] as Variable['type'];
    const name = varDeclNoAssign[2];
    variables.set(name, { type, value: null });
    return {};
  }

  // Assignment
  const assign = line.match(/^(\w+)\s*=\s*([\s\S]+?);?$/);
  if (assign && !line.startsWith('if') && !line.startsWith('while') && !line.startsWith('for') && !line.startsWith('return')) {
    const name = assign[1];
    const valueStr = assign[2].trim();
    const existing = variables.get(name);
    const value = evalExpr(valueStr, variables, methods, classes, records);
    if (existing) {
      existing.value = value;
    } else {
      variables.set(name, { type: inferType(value), value });
    }
    return {};
  }

  // Console.WriteLine
  if (line.startsWith('Console.WriteLine') || line.startsWith('Console.Write')) {
    const content = extractWriteContent(line);
    if (content !== null) {
      const result = evalWriteContent(content, variables, methods, classes, records);
      return { output: [result] };
    }
    return {};
  }

  // If statement
  if (line.startsWith('if (')) {
    return executeIf(line, variables, methods, classes, allLines, currentIdx);
  }

  // While loop
  if (line.startsWith('while (')) {
    return executeWhile(line, variables, methods, classes, allLines, currentIdx);
  }

  // For loop
  if (line.startsWith('for (')) {
    return executeFor(line, variables, methods, classes, allLines, currentIdx);
  }

  // Foreach loop
  if (line.startsWith('foreach (')) {
    return executeForeach(line, variables, methods, classes, allLines, currentIdx, records);
  }

  // Return statement
  if (line.startsWith('return')) {
    const retMatch = line.match(/^return\s*(.+?)\s*;?$/);
    return { returnValue: retMatch && retMatch[1] ? evalExpr(retMatch[1].trim(), variables, methods, classes) : null };
  }

  // Method invocation (standalone)
  if (line.match(/^\w+(\.\w+)*\s*\([^)]*\);?$/)) {
    evalExpr(line.replace(/;$/, ''), variables, methods, classes);
    return {};
  }

  // Object instantiation
  const objCreation = line.match(/^(\w+)\s+(\w+)\s*=\s*new\s+(\w+)\((.*)\);$/);
  if (objCreation) {
    const className = objCreation[3];
    const argsStr = objCreation[4];
    const args = argsStr ? argsStr.split(',').map((a) => evalExpr(a.trim(), variables, methods, classes)) : [];
    const cls = classes.get(className);
    if (cls) {
      const instance: ClassDef = {
        name: cls.name,
        fields: new Map(cls.fields),
        methods: cls.methods,
      };
      variables.set(objCreation[2], { type: 'object', value: instance });
    } else {
      variables.set(objCreation[2], { type: 'object', value: { className, args } });
    }
    return {};
  }

  // Method call on object
  if (line.match(/^\w+\.\w+\([^)]*\);?$/)) {
    evalExpr(line.replace(/;$/, ''), variables, methods, classes);
    return {};
  }

  // Array declaration
  const arrDecl = line.match(/^(\w+)\[\]\s+(\w+)\s*=\s*new\s+\w+\[(\d+)\];$/);
  if (arrDecl) {
    const name = arrDecl[2];
    const size = parseInt(arrDecl[3]);
    variables.set(name, { type: 'array', value: new Array(size).fill(0) });
    return {};
  }

  // Array initialization
  const arrInit = line.match(/^(\w+)\[\]\s+(\w+)\s*=\s*new\s+\w+\[\]\s*\{(.+)\};$/);
  if (arrInit) {
    const name = arrInit[2];
    const values = arrInit[3].split(',').map((v) => evalExpr(v.trim(), variables, methods, classes));
    variables.set(name, { type: 'array', value: values });
    return {};
  }

  // Array initialization without new: int[] a = { 1, 2, 3 };
  const arrInitNoNew = line.match(/^(\w+)\[\]\s+(\w+)\s*=\s*\{(.+)\};$/);
  if (arrInitNoNew) {
    const name = arrInitNoNew[2];
    const values = arrInitNoNew[3].split(',').map((v) => evalExpr(v.trim(), variables, methods, classes));
    variables.set(name, { type: 'array', value: values });
    return {};
  }

  // Array element assignment (supports variable/computed index)
  const arrAssign = line.match(/^(\w+)\[(.+?)\]\s*=\s*(.+);$/);
  if (arrAssign) {
    const arr = variables.get(arrAssign[1]);
    if (arr && arr.type === 'array') {
      const idxStr = arrAssign[2].trim();
      const idx = /^\d+$/.test(idxStr) ? parseInt(idxStr) : Number(evalExpr(idxStr, variables, methods, classes));
      arr.value[idx] = evalExpr(arrAssign[3], variables, methods, classes);
    }
    return {};
  }

  // Increment / decrement: n++ / n--
  const incDec = line.match(/^(\w+)\s*(\+\+|--)\s*;?$/);
  if (incDec) {
    const v = variables.get(incDec[1]);
    if (v && typeof v.value === 'number') {
      v.value = incDec[2] === '++' ? v.value + 1 : v.value - 1;
    }
    return {};
  }

  return {};
}

function executeIf(
  line: string,
  variables: Map<string, Variable>,
  methods: Map<string, MethodDef>,
  classes: Map<string, ClassDef>,
  allLines: string[],
  currentIdx: number
): { output?: string[]; nextIdx?: number; returnValue?: any; control?: 'break' | 'continue' } {
  const output: string[] = [];
  const condMatch = line.match(/if\s*\((.+)\)/);
  if (!condMatch) return {};

  // Build an if / else-if / else chain. Each entry has either a condition or is the final else.
  const chain: { condition: string | null; body: { line: string; idx: number }[] }[] = [];
  chain.push({ condition: condMatch[1], body: [] });
  let currentBlock = chain[0];

  let i = currentIdx + 1;
  let depth = 0;
  if (maskStrings(line).includes('{')) depth = 1;

  while (i < allLines.length) {
    const l = allLines[i].trim();
    const masked = maskStrings(l);
    const { opens, closes } = countBraces(masked);

    // Line closes the current block completely (depth would reach 0)
    if (closes > opens && depth - (closes - opens) <= 0) {
      // Look ahead to the next non-empty line for else / else-if
      let j = i + 1;
      while (j < allLines.length && allLines[j].trim() === '') j++;
      const nxt = j < allLines.length ? allLines[j].trim() : '';

      if (nxt === 'else') {
        currentBlock = { condition: null, body: [] };
        chain.push(currentBlock);
        depth = maskStrings(allLines[j]).includes('{') ? 1 : 0;
        i = j + (depth > 0 ? 1 : 0);
        if (depth <= 0) {
          if (j + 1 < allLines.length) currentBlock.body.push({ line: allLines[j + 1].trim(), idx: j + 1 });
          i = j + 2;
          break;
        }
        continue;
      }
      if (nxt.startsWith('else if')) {
        const ec = nxt.match(/else\s+if\s*\((.+)\)/);
        currentBlock = { condition: ec ? ec[1] : null, body: [] };
        chain.push(currentBlock);
        depth = maskStrings(allLines[j]).includes('{') ? 1 : 0;
        i = j + (depth > 0 ? 1 : 0);
        if (depth <= 0) {
          if (j + 1 < allLines.length) currentBlock.body.push({ line: allLines[j + 1].trim(), idx: j + 1 });
          i = j + 2;
        }
        continue;
      }

      depth -= closes - opens;
      i++;
      break;
    }

    // Line closes one block and opens another: `} else {` or `} else if (...) {`
    if (closes > 0 && opens >= closes) {
      const rest = masked.replace(/[{}]/g, ' ').trim();
      if (rest === 'else') {
        currentBlock = { condition: null, body: [] };
        chain.push(currentBlock);
        depth -= closes;
        depth += opens;
        i++;
        continue;
      }
      if (/^else\s+if/.test(rest)) {
        const ec = rest.match(/else\s+if\s*\((.+)\)/);
        currentBlock = { condition: ec ? ec[1] : null, body: [] };
        chain.push(currentBlock);
        depth -= closes;
        depth += opens;
        i++;
        continue;
      }
    }

    if (closes > opens) depth -= closes - opens;
    if (opens > closes) depth += opens - closes;

    if (depth >= 1 && currentBlock && l && !(opens > closes && isBareBrace(l)) && !masked.includes('}')) {
      currentBlock.body.push({ line: l, idx: i });
    }
    i++;
  }

  let taken = false;
  for (const block of chain) {
    const matches = block.condition === null ? !taken : evalCondition(block.condition, variables, methods, classes);
    if (!matches) continue;
    taken = true;
    for (const { line: stmt, idx } of block.body) {
      const result = executeStatement(stmt, variables, methods, classes, allLines, idx);
      if (result.output) output.push(...result.output);
      if (result.control === 'break' || result.control === 'continue') {
        return { output, nextIdx: i, control: result.control };
      }
      if (result.returnValue !== undefined) {
        return { output, nextIdx: i, returnValue: result.returnValue };
      }
    }
  }

  return { output, nextIdx: i };
}

function executeWhile(
  line: string,
  variables: Map<string, Variable>,
  methods: Map<string, MethodDef>,
  classes: Map<string, ClassDef>,
  allLines: string[],
  currentIdx: number
): { output?: string[]; nextIdx?: number; returnValue?: any } {
  const output: string[] = [];
  const condMatch = line.match(/while\s*\((.+)\)/);
  if (!condMatch) return {};

  const condExpr = condMatch[1];

  // Collect while body
  const body: { line: string; idx: number }[] = [];
  let i = currentIdx + 1;
  let depth = 0;

  if (maskStrings(line).includes('{')) depth = 1;

  while (i < allLines.length) {
    const l = allLines[i].trim();
    const masked = maskStrings(l);
    const { opens, closes } = countBraces(masked);

    if (closes > opens) {
      depth -= closes - opens;
      if (depth <= 0) { i++; break; }
      i++;
      continue;
    }

    if (opens > closes) depth += opens - closes;

    if (depth >= 1 && l && !(opens > closes && isBareBrace(l))) {
      body.push({ line: l, idx: i });
    }
    i++;
  }

  let iterations = 0;
  const maxIter = 1000;
  while (evalCondition(condExpr, variables, methods, classes) && iterations < maxIter) {
    for (const { line: stmt, idx } of body) {
      const result = executeStatement(stmt, variables, methods, classes, allLines, idx);
      if (result.output) output.push(...result.output);
      if (result.control === 'break') return { output, nextIdx: i };
      if (result.control === 'continue') break;
      if (result.returnValue !== undefined) {
        return { output, nextIdx: i, returnValue: result.returnValue };
      }
    }
    iterations++;
  }

  if (iterations >= maxIter) {
    output.push('[Warning: Loop exceeded maximum iterations]');
  }

  return { output, nextIdx: i };
}

function executeFor(
  line: string,
  variables: Map<string, Variable>,
  methods: Map<string, MethodDef>,
  classes: Map<string, ClassDef>,
  allLines: string[],
  currentIdx: number
): { output?: string[]; nextIdx?: number; returnValue?: any; control?: 'break' | 'continue' } {
  const output: string[] = [];
  const forMatch = line.match(/for\s*\(([^;]+);\s*([^;]+);\s*([^)]+)\s*\)/);
  if (!forMatch) return {};

  const initClause = forMatch[1].trim();
  const condClause = forMatch[2].trim();
  const incClause = forMatch[3].trim();

  // Initializer clause: `int i = 0` or `i = 0`
  const initMatch = initClause.match(/^(?:int\s+)?([a-zA-Z_]\w*)\s*=\s*(.+)$/);
  if (initMatch) {
    const initVal = Number(evalExpr(initMatch[2], variables, methods, classes));
    variables.set(initMatch[1], { type: 'int', value: Number.isNaN(initVal) ? 0 : initVal });
  }

  // Collect for body
  const body: { line: string; idx: number }[] = [];
  let i = currentIdx + 1;
  let depth = 0;

  if (maskStrings(line).includes('{')) depth = 1;

  while (i < allLines.length) {
    const l = allLines[i].trim();
    const masked = maskStrings(l);
    const { opens, closes } = countBraces(masked);

    if (closes > opens) {
      depth -= closes - opens;
      if (depth <= 0) { i++; break; }
      i++;
      continue;
    }

    if (opens > closes) depth += opens - closes;

    if (depth >= 1 && l && !(opens > closes && isBareBrace(l))) {
      body.push({ line: l, idx: i });
    }
    i++;
  }

  let iterations = 0;
  const maxIter = 1000;
  while (iterations < maxIter) {
    if (!evalCondition(condClause, variables, methods, classes)) break;

    for (const { line: stmt, idx } of body) {
      const result = executeStatement(stmt, variables, methods, classes, allLines, idx);
      if (result.output) output.push(...result.output);
      if (result.control === 'break') return { output, nextIdx: i };
      if (result.control === 'continue') break;
      if (result.returnValue !== undefined) {
        return { output, nextIdx: i, returnValue: result.returnValue };
      }
    }

    // Increment clause: `i++`, `i--`, `i += 2`, `i = i + 1`, ...
    const incStep = incClause.match(/^([a-zA-Z_]\w*)\s*(\+\+|--)\s*$/);
    if (incStep) {
      const v = variables.get(incStep[1]);
      if (v && typeof v.value === 'number') v.value += incStep[2] === '++' ? 1 : -1;
    } else {
      const incAssign = incClause.match(/^([a-zA-Z_]\w*)\s*([+\-*/]?=)\s*(.+)$/);
      if (incAssign) {
        const v = variables.get(incAssign[1]);
        if (v) {
          const cur = typeof v.value === 'number' ? v.value : 0;
          const val = Number(evalExpr(incAssign[3], variables, methods, classes)) || 0;
          const op = incAssign[2];
          if (op === '=') v.value = val;
          else if (op === '+=') v.value = cur + val;
          else if (op === '-=') v.value = cur - val;
          else if (op === '*=') v.value = cur * val;
          else if (op === '/=') v.value = cur / val;
        }
      }
    }
    iterations++;
  }

  if (iterations >= maxIter) {
    output.push('[Warning: Loop exceeded maximum iterations]');
  }

  return { output, nextIdx: i };
}

function executeForeach(
  line: string,
  variables: Map<string, Variable>,
  methods: Map<string, MethodDef>,
  classes: Map<string, ClassDef>,
  allLines: string[],
  currentIdx: number,
  records?: Map<string, string[]>
): { output?: string[]; nextIdx?: number; returnValue?: any } {
  const output: string[] = [];
  const foreachMatch = line.match(/foreach\s*\(\s*(?:var|\w+)\s+(\w+)\s+in\s+([\s\S]+?)\s*\)/);
  if (!foreachMatch) return {};

  const iterVar = foreachMatch[1];
  const collExpr = foreachMatch[2].trim();
  let arrValue: any[] = [];

  const directVar = variables.get(collExpr);
  if (directVar && directVar.type === 'array' && Array.isArray(directVar.value)) {
    arrValue = directVar.value;
  } else {
    const evaluated = evalExpr(collExpr, variables, methods, classes, records);
    if (Array.isArray(evaluated)) {
      arrValue = evaluated;
    } else if (directVar && Array.isArray(directVar.value)) {
      arrValue = directVar.value;
    } else {
      throw new Error(`'${collExpr}' is not an array`);
    }
  }

  // Collect foreach body
  const body: { line: string; idx: number }[] = [];
  let i = currentIdx + 1;
  let depth = 0;

  if (maskStrings(line).includes('{')) depth = 1;

  while (i < allLines.length) {
    const l = allLines[i].trim();
    const masked = maskStrings(l);
    const { opens, closes } = countBraces(masked);

    if (closes > opens) {
      depth -= closes - opens;
      if (depth <= 0) { i++; break; }
      i++;
      continue;
    }

    if (opens > closes) depth += opens - closes;

    if (depth >= 1 && l && !(opens > closes && isBareBrace(l))) {
      body.push({ line: l, idx: i });
    }
    i++;
  }

  for (const item of arrValue) {
    variables.set(iterVar, {
      type: typeof item === 'object' && item !== null ? 'object' : inferType(item),
      value: item,
    });
    for (const { line: stmt, idx } of body) {
      const result = executeStatement(stmt, variables, methods, classes, allLines, idx, records);
      if (result.output) output.push(...result.output);
      if (result.control === 'break') return { output, nextIdx: i };
      if (result.control === 'continue') break;
      if (result.returnValue !== undefined) {
        return { output, nextIdx: i, returnValue: result.returnValue };
      }
    }
  }

  return { output, nextIdx: i };
}

function extractWriteContent(line: string): string | null {
  const writeLineMatch = line.match(/Console\.WriteLine\((.+)\);?$/);
  if (writeLineMatch) return writeLineMatch[1].trim();

  const writeMatch = line.match(/Console\.Write\((.+)\);?$/);
  if (writeMatch) return writeMatch[1].trim();

  return null;
}

function evalWriteContent(
  content: string,
  variables: Map<string, Variable>,
  methods: Map<string, MethodDef>,
  classes: Map<string, ClassDef>,
  records?: Map<string, string[]>
): string {
  // Handle string interpolation: $"text {expr} text"
  if (content.startsWith('$"')) {
    return evalInterpolatedString(content, variables, methods, classes, records);
  }

  // Handle composite format: "{0} {1}", a, b
  const composite = tryCompositeFormat(content, variables, methods, classes);
  if (composite !== null) return composite;

  // Full string literal (may contain + or commas): "a+b"
  if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
    return content.slice(1, -1);
  }

  // Handle concatenation: "text" + var + "text" — but a pure numeric
  // a + b (no string involved) is arithmetic, not concatenation.
  const concatParts = splitConcatenation(content);
  if (concatParts) {
    const anyString = concatParts.some((p) => {
      const t = p.trim();
      if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) return true;
      return typeof evalExpr(t, variables, methods, classes) === 'string';
    });
    if (anyString) {
      return concatParts.map((p) => formatValue(evalExpr(p, variables, methods, classes))).join('');
    }
    return formatValue(evalExpr(content, variables, methods, classes));
  }

  // Simple value
  return formatValue(evalExpr(content, variables, methods, classes));
}

// Find the first top-level comma (outside parens/brackets/string literals), or -1.
function findTopLevelComma(content: string): number {
  let depth = 0;
  let inStr: '"' | "'" | null = null;
  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (inStr) {
      if (ch === '\\') { i++; continue; }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'") { inStr = ch; continue; }
    if (ch === '(' || ch === '[') { depth++; continue; }
    if (ch === ')' || ch === ']') { depth--; continue; }
    if (ch === ',' && depth === 0) return i;
  }
  return -1;
}

// Split a concatenation expression only on + operators outside string literals. Returns null if there's no concatenation.
function splitConcatenation(content: string): string[] | null {
  const parts: string[] = [];
  let current = '';
  let inStr: '"' | "'" | null = null;
  let sawPlus = false;
  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (inStr) {
      current += ch;
      if (ch === '\\') { current += content[++i] ?? ''; continue; }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'") { inStr = ch; current += ch; continue; }
    if (ch === '+') { sawPlus = true; parts.push(current.trim()); current = ''; continue; }
    current += ch;
  }
  parts.push(current.trim());
  return sawPlus ? parts : null;
}

// Composite format writes: Console.WriteLine("{0} {1}", a, b)
function tryCompositeFormat(content: string, variables: Map<string, Variable>, methods: Map<string, MethodDef>, classes: Map<string, ClassDef>): string | null {
  const commaIdx = findTopLevelComma(content);
  if (commaIdx === -1) return null;
  const fmtWithQuote = content.slice(0, commaIdx).trim();
  if (!fmtWithQuote.includes('{0}') && !fmtWithQuote.includes('{1}') && !/\{\d/.test(fmtWithQuote)) return null;
  const fmt = (fmtWithQuote.endsWith('"') || fmtWithQuote.endsWith("'")) ? fmtWithQuote.slice(0, -1) : fmtWithQuote;
  const argsPart = content.slice(commaIdx + 1).trim();
  // Split remaining args at top-level commas
  const args: any[] = [];
  let rest = argsPart;
  for (;;) {
    const c = findTopLevelComma(rest);
    if (c === -1) { args.push(evalExpr(rest.trim(), variables, methods, classes)); break; }
    args.push(evalExpr(rest.slice(0, c).trim(), variables, methods, classes));
    rest = rest.slice(c + 1).trim();
  }
  return fmt.replace(/\{(\d+)(:.*?)?\}/g, (m, idx) => {
    if (m.includes(':')) return m; // format spec without args — leave as-is
    return formatValue(args[Number(idx)]);
  });
}

function evalInterpolatedString(
  content: string,
  variables: Map<string, Variable>,
  methods: Map<string, MethodDef>,
  classes: Map<string, ClassDef>,
  records?: Map<string, string[]>
): string {
  const str = content.slice(2, content.endsWith('"') ? -1 : undefined);
  return str.replace(/\{([^}]+)\}/g, (_, expr) => {
    const e = expr.trim();
    let exprBody = e;
    let align = 0;
    let spec = '';

    const colonIdx = findTopLevelColon(e);
    if (colonIdx !== -1) {
      spec = e.slice(colonIdx + 1).trim();
      exprBody = e.slice(0, colonIdx).trim();
    }
    const commaIdx = exprBody.indexOf(',');
    if (commaIdx !== -1) {
      align = parseInt(exprBody.slice(commaIdx + 1).trim(), 10) || 0;
      exprBody = exprBody.slice(0, commaIdx).trim();
    }

    const val = evalExpr(exprBody, variables, methods, classes, records);
    let formatted = formatValueWithSpec(val, spec);
    if (align < 0) {
      formatted = formatted.padEnd(Math.abs(align), ' ');
    } else if (align > 0) {
      formatted = formatted.padStart(align, ' ');
    }
    return formatted;
  });
}

function findTopLevelColon(s: string): number {
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth--;
    else if (ch === ':' && depth === 0) return i;
  }
  return -1;
}

function formatValueWithSpec(val: any, spec: string): string {
  if (!spec) return formatValue(val);
  if (spec.toUpperCase().startsWith('N')) {
    const decimals = parseInt(spec.slice(1), 10) || 0;
    const num = Number(val);
    if (!isNaN(num)) {
      return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    }
  }
  if (spec.toLowerCase() === 'yyyy-mm-dd') {
    const d = val instanceof Date ? val : new Date(val);
    if (!isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    }
  }
  return formatValue(val);
}

function formatValue(value: any): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'boolean') return value ? 'True' : 'False';
  if (Array.isArray(value)) return '{ ' + value.join(', ') + ' }';
  if (typeof value === 'object' && value.className) {
    return value.className;
  }
  return String(value);
}

function splitTopLevelCommas(str: string): string[] {
  const parts: string[] = [];
  let cur = '';
  let depth = 0;
  let inStr: string | null = null;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (inStr) {
      if (ch === inStr && str[i - 1] !== '\\') inStr = null;
      cur += ch;
      continue;
    }
    if (ch === '"' || ch === "'") { inStr = ch; cur += ch; continue; }
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth--;
    if (ch === ',' && depth === 0) {
      parts.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur);
  return parts;
}

function parseCallChain(expr: string): { base: string; calls: { method: string; arg: string }[] } | null {
  let depth = 0;
  let inStr: string | null = null;
  let base = '';
  let idx = 0;
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (inStr) {
      if (ch === inStr && expr[i - 1] !== '\\') inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'") { inStr = ch; continue; }
    if (ch === '(' || ch === '{') depth++;
    else if (ch === ')' || ch === '}') depth--;
    if (ch === '.' && depth === 0) {
      base = expr.slice(0, i).trim();
      idx = i;
      break;
    }
  }
  if (!base) return null;

  const calls: { method: string; arg: string }[] = [];
  while (idx < expr.length) {
    if (expr[idx] !== '.') { idx++; continue; }
    idx++;
    let mName = '';
    while (idx < expr.length && /[a-zA-Z0-9_]/.test(expr[idx])) {
      mName += expr[idx];
      idx++;
    }
    while (idx < expr.length && /\s/.test(expr[idx])) idx++;
    if (expr[idx] === '(') {
      let openIdx = idx;
      let pDepth = 1;
      idx++;
      while (idx < expr.length && pDepth > 0) {
        if (expr[idx] === '(' || expr[idx] === '{') pDepth++;
        else if (expr[idx] === ')' || expr[idx] === '}') pDepth--;
        idx++;
      }
      const arg = expr.slice(openIdx + 1, idx - 1).trim();
      calls.push({ method: mName, arg });
    }
  }

  return { base, calls };
}

function evalSelectorExpr(expr: string, group: any): any {
  const trimmed = expr.trim();
  if (trimmed.endsWith('.Key')) return group.Key;
  if (trimmed.endsWith('.Count()')) return group.items ? group.items.length : 0;
  
  const sumMatch = trimmed.match(/\.Sum\(\s*(\w+)\s*=>\s*([\s\S]+?)\s*\)/);
  if (sumMatch && group.items) {
    const p = sumMatch[1];
    const calc = sumMatch[2].trim();
    if (calc.includes('*')) {
      const parts = calc.split('*').map(s => s.trim().replace(new RegExp(`^${p}\\.`), ''));
      return group.items.reduce((s: number, it: any) => s + (Number(it[parts[0]]) || 0) * (Number(it[parts[1]]) || 0), 0);
    } else {
      const prop = calc.replace(new RegExp(`^${p}\\.`), '');
      return group.items.reduce((s: number, it: any) => s + (Number(it[prop]) || 0), 0);
    }
  }
  return trimmed;
}

function evalWhereCondition(condExpr: string, item: any): boolean {
  const arrowIdx = condExpr.indexOf('=>');
  const cond = arrowIdx !== -1 ? condExpr.slice(arrowIdx + 2).trim() : condExpr;
  const paramMatch = condExpr.match(/^(\w+)\s*=>/);
  const param = paramMatch ? paramMatch[1] : '';
  
  if (cond.includes('&&')) {
    return cond.split('&&').every(c => evalWhereCondition(param ? `${param} => ${c.trim()}` : c.trim(), item));
  }
  
  const gtMatch = cond.match(/(?:\w+\.)?(\w+)\s*>\s*(\d+)/);
  if (gtMatch) {
    const prop = gtMatch[1];
    const val = Number(gtMatch[2]);
    return (Number(item[prop]) || 0) > val;
  }
  
  const boolMatch = cond.match(/(?:\w+\.)?(\w+)$/);
  if (boolMatch) {
    return Boolean(item[boolMatch[1]]);
  }
  return true;
}

function evalLinqPipeline(
  expr: string,
  variables: Map<string, Variable>,
  methods: Map<string, MethodDef>,
  classes: Map<string, ClassDef>,
  records?: Map<string, string[]>
): any {
  const chain = parseCallChain(expr);
  if (!chain || chain.calls.length === 0) return null;

  let cur = evalExpr(chain.base, variables, methods, classes, records);
  if (!Array.isArray(cur) && chain.calls[0].method !== 'Where' && chain.calls[0].method !== 'GroupBy') {
    return null;
  }

  for (const { method, arg } of chain.calls) {
    if (!Array.isArray(cur)) break;
    if (method === 'GroupBy') {
      const propMatch = arg.match(/=>\s*(?:\w+\.)?(\w+)/);
      const prop = propMatch ? propMatch[1] : 'Key';
      const map = new Map<any, any[]>();
      for (const item of cur) {
        const k = item && typeof item === 'object' ? item[prop] : item;
        if (!map.has(k)) map.set(k, []);
        map.get(k)!.push(item);
      }
      cur = Array.from(map.entries()).map(([k, groupItems]) => ({
        Key: k,
        items: groupItems,
      }));
    } else if (method === 'Select') {
      const anonMatch = arg.match(/new\s*\{([\s\S]*)\}/);
      if (anonMatch) {
        const fieldDefs = splitTopLevelCommas(anonMatch[1]);
        cur = cur.map((item) => {
          const projected: Record<string, any> = {};
          for (const f of fieldDefs) {
            const eqIdx = f.indexOf('=');
            if (eqIdx !== -1) {
              const fName = f.slice(0, eqIdx).trim();
              const fExpr = f.slice(eqIdx + 1).trim();
              projected[fName] = evalSelectorExpr(fExpr, item);
            }
          }
          return projected;
        });
      } else {
        const propMatch = arg.match(/=>\s*(?:\w+\.)?(\w+)/);
        if (propMatch) {
          const p = propMatch[1];
          cur = cur.map((item) => item && typeof item === 'object' ? item[p] : item);
        }
      }
    } else if (method === 'OrderByDescending') {
      const propMatch = arg.match(/=>\s*(?:\w+\.)?(\w+)/);
      if (propMatch) {
        const p = propMatch[1];
        cur = [...cur].sort((a, b) => (Number(b[p]) || 0) - (Number(a[p]) || 0));
      }
    } else if (method === 'OrderBy') {
      const propMatch = arg.match(/=>\s*(?:\w+\.)?(\w+)/);
      if (propMatch) {
        const p = propMatch[1];
        cur = [...cur].sort((a, b) => (a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0));
      }
    } else if (method === 'Where') {
      cur = cur.filter(item => evalWhereCondition(arg, item));
    } else if (method === 'Take') {
      const count = parseInt(arg, 10);
      if (!isNaN(count)) cur = cur.slice(0, count);
    }
  }
  return cur;
}

function parseListItems(
  itemsRaw: string,
  fields: string[],
  variables: Map<string, Variable>,
  methods: Map<string, MethodDef>,
  classes: Map<string, ClassDef>,
  records?: Map<string, string[]>
): any[] {
  const result: any[] = [];
  const itemChunks = splitTopLevelCommas(itemsRaw);
  for (const chunk of itemChunks) {
    const t = chunk.trim();
    if (!t) continue;
    const newMatch = t.match(/^new(?:\s+\w+)?\s*\(([\s\S]*)\)$/);
    if (newMatch) {
      const argStrings = splitTopLevelCommas(newMatch[1]);
      const args = argStrings.map((a) => evalExpr(a.trim(), variables, methods, classes, records));
      const obj: Record<string, any> = {};
      for (let k = 0; k < fields.length; k++) {
        obj[fields[k]] = args[k];
      }
      result.push(obj);
    } else {
      result.push(evalExpr(t, variables, methods, classes, records));
    }
  }
  return result;
}

function evalExpr(
  expr: string,
  variables: Map<string, Variable>,
  methods: Map<string, MethodDef>,
  classes: Map<string, ClassDef>,
  records?: Map<string, string[]>
): any {
  const trimmed = expr.trim();

  // Boolean literals
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;

  // String literal
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }

  // Number literal: e.g. 50, 350_000m, 10.5f, 100L
  const numClean = trimmed.replace(/_/g, '').replace(/[mMfFdDlL]$/, '');
  if (/^-?\d+$/.test(numClean)) return parseInt(numClean, 10);
  if (/^-?\d+\.\d+$/.test(numClean)) return parseFloat(numClean);

  // new DateTime(y, m, d)
  const dtMatch = trimmed.match(/^new\s+DateTime\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+))?\s*\)$/);
  if (dtMatch) {
    return new Date(
      parseInt(dtMatch[1], 10),
      parseInt(dtMatch[2], 10) - 1,
      parseInt(dtMatch[3], 10),
      parseInt(dtMatch[4] || '0', 10),
      parseInt(dtMatch[5] || '0', 10),
      parseInt(dtMatch[6] || '0', 10)
    );
  }

  // new List<Type> { ... }
  const listInit = trimmed.match(/^new\s+List<(\w+)>(?:\(\))?\s*\{([\s\S]*)\}$/);
  if (listInit) {
    const recName = listInit[1];
    const itemsRaw = listInit[2].trim();
    const fields = records?.get(recName) || [];
    return parseListItems(itemsRaw, fields, variables, methods, classes, records);
  }

  // LINQ method chaining: e.g. inventory.GroupBy(...)... or fifoQueue.Take(3)
  if (/\.(?:GroupBy|Select|Where|OrderBy|OrderByDescending|Take|ToList)\s*\(/.test(trimmed)) {
    const linqResult = evalLinqPipeline(trimmed, variables, methods, classes, records);
    if (linqResult !== null) return linqResult;
  }

  // new int[size] or new string[size]
  const newArrMatch = trimmed.match(/^new\s+\w+\[(\d+)\]$/);
  if (newArrMatch) return new Array(parseInt(newArrMatch[1])).fill(0);

  // Array initializer: new int[] { 1, 2, 3 }
  const arrInitMatch = trimmed.match(/^new\s+\w+\[\]\s*\{(.+)\}$/);
  if (arrInitMatch) {
    return arrInitMatch[1].split(',').map((v) => evalExpr(v.trim(), variables, methods, classes, records));
  }

  // Method call: MethodName(args)
  const methodCall = trimmed.match(/^(\w+)\s*\(([^)]*)\)$/);
  if (methodCall) {
    const methodName = methodCall[1];
    const argsStr = methodCall[2];
    const args = argsStr ? argsStr.split(',').map((a) => evalExpr(a.trim(), variables, methods, classes, records)) : [];
    return invokeMethod(methodName, args, methods, variables, classes);
  }

  // Member access: obj.Prop
  const memberAccess = trimmed.match(/^(\w+)\.(\w+)$/);
  if (memberAccess) {
    const objName = memberAccess[1];
    const prop = memberAccess[2];
    const obj = variables.get(objName);
    if (obj !== undefined && obj.value != null) {
      const v = obj.value;
      if (typeof v === 'object' && prop in v) return v[prop];
      if (prop === 'Length' || prop === 'Count') return Array.isArray(v) ? v.length : String(v).length;
      if (prop === 'ToString') return String(v);
      if (prop === 'ToUpper') return typeof v === 'string' ? v.toUpperCase() : String(v).toUpperCase();
      if (prop === 'ToLower') return typeof v === 'string' ? v.toLowerCase() : String(v).toLowerCase();
    }
    return trimmed;
  }

  // Array access: arr[idx] (numeric or variable index)
  const arrAccess = trimmed.match(/^(\w+)\[(.+?)\]$/);
  if (arrAccess) {
    const arr = variables.get(arrAccess[1]);
    if (arr && arr.type === 'array') {
      const idxStr = arrAccess[2].trim();
      const idx = /^\d+$/.test(idxStr) ? parseInt(idxStr) : Number(evalExpr(idxStr, variables, methods, classes, records));
      return arr.value[idx];
    }
    return 0;
  }

  // Variable
  if (variables.has(trimmed)) {
    return variables.get(trimmed)!.value;
  }

  // Arithmetic expression (digits and/or numeric variables)
  if (/^[\w\s+\-*/().]+$/.test(trimmed) && /[+\-*/]/.test(trimmed) && !trimmed.includes('"') && !trimmed.includes("'")) {
    try {
      const substituted = trimmed.replace(/[a-zA-Z_]\w*/g, (m) => {
        const v = variables.get(m);
        if (v !== undefined && typeof v.value === 'number') return String(v.value);
        return m;
      });
      if (/^[\d\s+\-*/().]+$/.test(substituted) && /[+\-*/]/.test(substituted)) {
        return evalArithmetic(substituted);
      }
    } catch {
      // fall through
    }
  }

  // String concatenation with variables (already handled in WriteLine)
  const concatParts = splitConcatenation(trimmed);
  if (concatParts) {
    return concatParts.map((p) => formatValue(evalExpr(p, variables, methods, classes, records))).join('');
  }

  return trimmed;
}

function evalCondition(cond: string, variables: Map<string, Variable>, methods: Map<string, MethodDef>, classes: Map<string, ClassDef>): boolean {
  const trimmed = cond.trim();

  // Compound conditions
  if (trimmed.includes('&&')) {
    return trimmed.split('&&').every((c) => evalCondition(c.trim(), variables, methods, classes));
  }
  if (trimmed.includes('||')) {
    return trimmed.split('||').some((c) => evalCondition(c.trim(), variables, methods, classes));
  }

  // Comparison operators
  const ops = ['>=', '<=', '!=', '==', '>', '<'];
  for (const op of ops) {
    const parts = trimmed.split(op);
    if (parts.length === 2) {
      const left = evalExpr(parts[0].trim(), variables, methods, classes);
      const right = evalExpr(parts[1].trim(), variables, methods, classes);
      switch (op) {
        case '>': return left > right;
        case '<': return left < right;
        case '>=': return left >= right;
        case '<=': return left <= right;
        case '==': return left === right;
        case '!=': return left !== right;
      }
    }
  }

  // Boolean variable
  const val = evalExpr(trimmed, variables, methods, classes);
  return Boolean(val);
}

function evalSimpleCond(left: number, op: string, right: number): boolean {
  switch (op) {
    case '>': return left > right;
    case '<': return left < right;
    case '>=': return left >= right;
    case '<=': return left <= right;
    case '==': return left === right;
    case '!=': return left !== right;
    default: return false;
  }
}

function invokeMethod(
  name: string,
  args: any[],
  methods: Map<string, MethodDef>,
  variables: Map<string, Variable>,
  classes: Map<string, ClassDef>
): any {
  const method = methods.get(name);
  if (!method) {
    // Built-in methods
    if (name === 'ToString') {
      return String(args[0]);
    }
    if (name === 'Length' || name === 'Count') {
      return Array.isArray(args[0]) ? args[0].length : String(args[0]).length;
    }
    return null;
  }

  // Create local scope
  const localVars = new Map<string, Variable>(variables);
  method.params.forEach((p, i) => {
    localVars.set(p.name, { type: p.type as Variable['type'], value: args[i] ?? null });
  });

  let i = 0;
  while (i < method.body.length) {
    const stmt = method.body[i];
    const result = executeStatement(stmt, localVars, methods, classes, method.body, i);
    if (result.output && activeOutput) activeOutput.push(...result.output);
    if (result.returnValue !== undefined) {
      return result.returnValue;
    }
    if (result.nextIdx !== undefined && result.nextIdx > i) {
      i = result.nextIdx;
    } else {
      i++;
    }
  }

  return null;
}

function inferType(value: any): Variable['type'] {
  if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'double';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'boolean') return 'bool';
  if (Array.isArray(value)) return 'array';
  return 'var';
}

// Safe arithmetic evaluator for pure numeric expressions (no eval / new Function)
function evalArithmetic(expr: string): number {
  let pos = 0;
  const input = expr.replace(/\s+/g, '');

  function peek(): string {
    return input[pos] || '';
  }

  function consume(): string {
    return input[pos++] || '';
  }

  function parsePrimary(): number {
    const ch = peek();
    if (ch === '(') {
      consume();
      const val = parseExpression();
      if (peek() === ')') consume();
      return val;
    }
    if (ch === '-') {
      consume();
      return -parsePrimary();
    }
    const numMatch = input.slice(pos).match(/^\d+(\.\d+)?/);
    if (numMatch) {
      pos += numMatch[0].length;
      return parseFloat(numMatch[0]);
    }
    throw new Error('Invalid arithmetic expression');
  }

  function parseMulDiv(): number {
    let left = parsePrimary();
    for (;;) {
      const ch = peek();
      if (ch === '*') { consume(); left *= parsePrimary(); }
      else if (ch === '/') { consume(); left /= parsePrimary(); }
      else break;
    }
    return left;
  }

  function parseExpression(): number {
    let left = parseMulDiv();
    for (;;) {
      const ch = peek();
      if (ch === '+') { consume(); left += parseMulDiv(); }
      else if (ch === '-') { consume(); left -= parseMulDiv(); }
      else break;
    }
    return left;
  }

  return parseExpression();
}

export function resetCSharp(): void {
  // No persistent state to reset for procedural interpreter
}
