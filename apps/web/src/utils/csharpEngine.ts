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

export function executeCSharp(code: string): ExecutionResult {
  const output: string[] = [];
  const errors: string[] = [];

  try {
    const result = runProgram(code);
    output.push(...result);
    return { output, errors, success: true };
  } catch (err: any) {
    const msg = err.message || String(err);
    errors.push(msg);
    return { output, errors, success: false };
  }
}

function runProgram(code: string): string[] {
  const output: string[] = [];
  const variables = new Map<string, Variable>();
  const methods = new Map<string, MethodDef>();
  const classes = new Map<string, ClassDef>();

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
        if (lines[i].includes('{')) depth++;
        if (lines[i].includes('}')) {
          depth--;
          if (depth <= 0) { i++; break; }
        }
        i++;
      }
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

    // Statement execution
    const result = executeStatement(line, variables, methods, classes, lines, i);
    if (result.output) output.push(...result.output);
    i = result.nextIdx ?? (i + 1);
  }

  // Entry point: invoke Main after all methods/classes are registered
  const mainMethod = methods.get('Main');
  if (mainMethod) {
    const mainResult = invokeMethod('Main', [], methods, variables, classes);
    if (typeof mainResult === 'string' && mainResult.length > 0) {
      output.push(mainResult);
    }
  }

  return output;
}

function stripComments(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '');
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
  return /^(static\s+)?(void|int|string|bool|double|var)\s+\w+\s*\(/.test(line);
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
  const match = header.match(/(?:static\s+)?(\w+)\s+(\w+)\s*\(([^)]*)\)/);
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
  currentIdx: number
): { output?: string[]; nextIdx?: number; returnValue?: any } {
  // Block opening
  if (line === '{') {
    return {};
  }

  // Variable declaration with assignment
  const varDecl = line.match(/^(int|string|bool|double|var)\s+(\w+)\s*=\s*(.+);$/);
  if (varDecl) {
    const type = varDecl[1] as Variable['type'];
    const name = varDecl[2];
    const valueStr = varDecl[3];
    const value = evalExpr(valueStr, variables, methods, classes);
    variables.set(name, { type: type === 'var' ? inferType(value) : type, value });
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
  const assign = line.match(/^(\w+)\s*=\s*(.+);$/);
  if (assign && !line.startsWith('if') && !line.startsWith('while') && !line.startsWith('for')) {
    const name = assign[1];
    const valueStr = assign[2];
    const existing = variables.get(name);
    const value = evalExpr(valueStr, variables, methods, classes);
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
      const result = evalWriteContent(content, variables, methods, classes);
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
    return executeForeach(line, variables, methods, classes, allLines, currentIdx);
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

  // Array element assignment
  const arrAssign = line.match(/^(\w+)\[(\d+)\]\s*=\s*(.+);$/);
  if (arrAssign) {
    const arr = variables.get(arrAssign[1]);
    if (arr && arr.type === 'array') {
      const idx = parseInt(arrAssign[2]);
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
): { output?: string[]; nextIdx?: number } {
  const output: string[] = [];
  const condMatch = line.match(/if\s*\((.+)\)/);
  if (!condMatch) return {};

  const condition = evalCondition(condMatch[1], variables, methods, classes);

  // Collect if-block body
  const ifBody: string[] = [];
  const elseBody: string[] = [];
  let i = currentIdx + 1;
  let depth = 0;
  let inElse = false;

  // Check if brace is on same line
  if (maskStrings(line).includes('{')) depth = 1;

  while (i < allLines.length) {
    const l = allLines[i].trim();
    const masked = maskStrings(l);
    const { opens, closes } = countBraces(masked);

    if (closes > opens) {
      depth -= closes - opens;
      if (depth <= 0) {
        // Check for else on the closing brace line
        if (masked.includes('else')) {
          inElse = true;
          i++;
          continue;
        }
        i++;
        break;
      }
      i++;
      continue;
    }

    if (opens > closes) depth += opens - closes;

    if (l === 'else' || l.startsWith('else ')) {
      inElse = true;
      i++;
      continue;
    }
    if (depth >= 1 && l && !(opens > closes && isBareBrace(l)) && !masked.includes('}')) {
      if (inElse) elseBody.push(l); else ifBody.push(l);
    }
    i++;
  }

  const body = condition ? ifBody : elseBody;
  for (const stmt of body) {
    const result = executeStatement(stmt, variables, methods, classes, allLines, allLines.indexOf(stmt));
    if (result.output) output.push(...result.output);
    if (result.returnValue !== undefined) {
      return { output, nextIdx: i, returnValue: result.returnValue };
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
  const body: string[] = [];
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
      body.push(l);
    }
    i++;
  }

  let iterations = 0;
  const maxIter = 1000;
  while (evalCondition(condExpr, variables, methods, classes) && iterations < maxIter) {
    for (const stmt of body) {
      const result = executeStatement(stmt, variables, methods, classes, allLines, allLines.indexOf(stmt));
      if (result.output) output.push(...result.output);
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
): { output?: string[]; nextIdx?: number; returnValue?: any } {
  const output: string[] = [];
  const forMatch = line.match(/for\s*\(\s*(int\s+)?(\w+)\s*=\s*(\d+);\s*(\w+)\s*([<>]=?|==|!=)\s*(\d+);\s*(\w+)\s*(\+\+|--)\s*\)/);
  if (!forMatch) return {};

  const varName = forMatch[2];
  const initVal = parseInt(forMatch[3]);
  const condVar = forMatch[4];
  const condOp = forMatch[5];
  const condVal = parseInt(forMatch[6]);
  const incVar = forMatch[7];
  const incOp = forMatch[8];

  variables.set(varName, { type: 'int', value: initVal });

  // Collect for body
  const body: string[] = [];
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
      body.push(l);
    }
    i++;
  }

  let iterations = 0;
  const maxIter = 1000;
  while (iterations < maxIter) {
    const current = variables.get(varName)?.value ?? 0;
    if (!evalSimpleCond(current, condOp, condVal)) break;

    for (const stmt of body) {
      const result = executeStatement(stmt, variables, methods, classes, allLines, allLines.indexOf(stmt));
      if (result.output) output.push(...result.output);
      if (result.returnValue !== undefined) {
        return { output, nextIdx: i, returnValue: result.returnValue };
      }
    }

    const val = variables.get(incVar);
    if (val) {
      val.value = incOp === '++' ? (val.value + 1) : (val.value - 1);
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
  currentIdx: number
): { output?: string[]; nextIdx?: number; returnValue?: any } {
  const output: string[] = [];
  const foreachMatch = line.match(/foreach\s*\(\s*(int|string|var)\s+(\w+)\s+in\s+(\w+)\s*\)/);
  if (!foreachMatch) return {};

  const iterType = foreachMatch[1];
  const iterVar = foreachMatch[2];
  const arrName = foreachMatch[3];
  const arr = variables.get(arrName);

  if (!arr || arr.type !== 'array') {
    throw new Error(`'${arrName}' is not an array`);
  }

  // Collect foreach body
  const body: string[] = [];
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
      body.push(l);
    }
    i++;
  }

  for (const item of arr.value) {
    variables.set(iterVar, { type: iterType === 'var' ? inferType(item) : iterType as Variable['type'], value: item });
    for (const stmt of body) {
      const result = executeStatement(stmt, variables, methods, classes, allLines, allLines.indexOf(stmt));
      if (result.output) output.push(...result.output);
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

function evalWriteContent(content: string, variables: Map<string, Variable>, methods: Map<string, MethodDef>, classes: Map<string, ClassDef>): string {
  // Handle string interpolation: $"text {expr} text"
  if (content.startsWith('$"')) {
    return evalInterpolatedString(content, variables, methods, classes);
  }

  // Handle concatenation: "text" + var + "text"
  if (content.includes('+')) {
    const parts = content.split('+').map((p) => p.trim());
    return parts.map((p) => formatValue(evalExpr(p, variables, methods, classes))).join('');
  }

  // Simple value
  return formatValue(evalExpr(content, variables, methods, classes));
}

function evalInterpolatedString(content: string, variables: Map<string, Variable>, methods: Map<string, MethodDef>, classes: Map<string, ClassDef>): string {
  const str = content.slice(2, content.endsWith('"') ? -1 : undefined);
  return str.replace(/\{([^}]+)\}/g, (_, expr) => {
    return formatValue(evalExpr(expr.trim(), variables, methods, classes));
  });
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

function evalExpr(expr: string, variables: Map<string, Variable>, methods: Map<string, MethodDef>, classes: Map<string, ClassDef>): any {
  const trimmed = expr.trim();

  // Boolean literals
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;

  // String literal
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }

  // Number literal
  if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed);
  if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);

  // new int[size] or new string[size]
  const newArrMatch = trimmed.match(/^new\s+\w+\[(\d+)\]$/);
  if (newArrMatch) return new Array(parseInt(newArrMatch[1])).fill(0);

  // Array initializer: new int[] { 1, 2, 3 }
  const arrInitMatch = trimmed.match(/^new\s+\w+\[\]\s*\{(.+)\}$/);
  if (arrInitMatch) {
    return arrInitMatch[1].split(',').map((v) => evalExpr(v.trim(), variables, methods, classes));
  }

  // Method call: MethodName(args)
  const methodCall = trimmed.match(/^(\w+)\s*\(([^)]*)\)$/);
  if (methodCall) {
    const methodName = methodCall[1];
    const argsStr = methodCall[2];
    const args = argsStr ? argsStr.split(',').map((a) => evalExpr(a.trim(), variables, methods, classes)) : [];
    return invokeMethod(methodName, args, methods, variables, classes);
  }

  // Array access: arr[idx]
  const arrAccess = trimmed.match(/^(\w+)\[(\d+)\]$/);
  if (arrAccess) {
    const arr = variables.get(arrAccess[1]);
    if (arr && arr.type === 'array') {
      return arr.value[parseInt(arrAccess[2])];
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
  if (trimmed.includes('+')) {
    const parts = trimmed.split('+').map((p) => p.trim());
    return parts.map((p) => formatValue(evalExpr(p, variables, methods, classes))).join('');
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

  const output: string[] = [];
  let i = 0;
  while (i < method.body.length) {
    const stmt = method.body[i];
    const result = executeStatement(stmt, localVars, methods, classes, method.body, i);
    if (result.output) output.push(...result.output);
    if (result.returnValue !== undefined) {
      return result.returnValue;
    }
    if (result.nextIdx !== undefined && result.nextIdx > i) {
      i = result.nextIdx;
    } else {
      i++;
    }
  }

  return output.length > 0 ? output.join('\n') : null;
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
