// ============================================================================
// phpEngine.ts — Browser PHP playground engine.
// Attempts to load php-wasm from CDN; falls back to a lightweight procedural
// PHP interpreter for common constructs (echo, print, variables, arrays,
// loops, functions, string concatenation).
// ============================================================================

export interface PhpResult {
  output: string;
  error: string;
  engine: 'wasm' | 'interpreter' | null;
}

// ---------------------------------------------------------------------------
// WASM loader (php-wasm from CDN)
// ---------------------------------------------------------------------------
let wasmModule: any = null;
let wasmPromise: Promise<any> | null = null;

function loadPhpWasmScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).PhpWeb) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/php-wasm@0.0.83/browser.min.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load php-wasm'));
    document.head.appendChild(script);
  });
}

async function initPhpWasm(): Promise<any> {
  if (wasmModule) return wasmModule;
  if (wasmPromise) return wasmPromise;

  wasmPromise = (async () => {
    await loadPhpWasmScript();
    const PhpWeb = (window as any).PhpWeb;
    if (!PhpWeb) {
      throw new Error('php-wasm not available');
    }
    const php = new PhpWeb();
    wasmModule = php;
    return php;
  })();

  try {
    return await wasmPromise;
  } catch (err) {
    wasmPromise = null;
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Lightweight PHP interpreter (fallback)
// ---------------------------------------------------------------------------
interface InterpScope {
  vars: Map<string, any>;
  parent: InterpScope | null;
}

class PhpInterpreter {
  private scope: InterpScope;
  private output: string = '';
  private error: string = '';
  private functions: Map<string, { params: string[]; body: string }> = new Map();

  constructor() {
    this.scope = { vars: new Map(), parent: null };
  }

  getOutput(): string {
    return this.output;
  }

  getError(): string {
    return this.error;
  }

  private setError(msg: string): never {
    this.error = msg;
    throw new Error(msg);
  }

  execute(code: string): void {
    const stripped = this.stripPhpTags(code);
    const tokens = this.tokenize(stripped);
    this.parseBlock(tokens);
  }

  private stripPhpTags(code: string): string {
    return code
      .replace(/<\?php/gi, '')
      .replace(/\?>/g, '')
      .trim();
  }

  private tokenize(code: string): string[] {
    const tokens: string[] = [];
    let i = 0;
    while (i < code.length) {
      if (code[i] === '/' && code[i + 1] === '/') {
        while (i < code.length && code[i] !== '\n') i++;
        continue;
      }
      if (code[i] === '/' && code[i + 1] === '*') {
        i += 2;
        while (i < code.length && !(code[i] === '*' && code[i + 1] === '/')) i++;
        i += 2;
        continue;
      }
      if (code[i] === '#') {
        while (i < code.length && code[i] !== '\n') i++;
        continue;
      }
      if (code[i] === '"') {
        let s = '"';
        i++;
        while (i < code.length && code[i] !== '"') {
          if (code[i] === '\\' && i + 1 < code.length) {
            s += code[i] + code[i + 1];
            i += 2;
          } else {
            s += code[i];
            i++;
          }
        }
        s += '"';
        i++;
        tokens.push(s);
        continue;
      }
      if (code[i] === "'") {
        let s = "'";
        i++;
        while (i < code.length && code[i] !== "'") {
          s += code[i];
          i++;
        }
        s += "'";
        i++;
        tokens.push(s);
        continue;
      }
      if (/\s/.test(code[i])) {
        i++;
        continue;
      }
      if (code[i] === '$') {
        let v = '$';
        i++;
        while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
          v += code[i];
          i++;
        }
        tokens.push(v);
        continue;
      }
      if (/[a-zA-Z_]/.test(code[i])) {
        let id = '';
        while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
          id += code[i];
          i++;
        }
        tokens.push(id);
        continue;
      }
      if (/[0-9]/.test(code[i])) {
        let num = '';
        while (i < code.length && /[0-9.]/.test(code[i])) {
          num += code[i];
          i++;
        }
        tokens.push(num);
        continue;
      }
      if (code[i] === '.' && i + 1 < code.length && code[i + 1] !== '=') {
        tokens.push('.');
        i++;
        continue;
      }
      if (code[i] === '=' && code[i + 1] === '=') {
        if (i + 2 < code.length && code[i + 2] === '=') {
          tokens.push('===');
          i += 3;
        } else {
          tokens.push('==');
          i += 2;
        }
        continue;
      }
      if (code[i] === '!' && code[i + 1] === '=') {
        if (i + 2 < code.length && code[i + 2] === '=') {
          tokens.push('!==');
          i += 3;
        } else {
          tokens.push('!=');
          i += 2;
        }
        continue;
      }
      if (code[i] === '<' && code[i + 1] === '=') {
        tokens.push('<=');
        i += 2;
        continue;
      }
      if (code[i] === '>' && code[i + 1] === '=') {
        tokens.push('>=');
        i += 2;
        continue;
      }
      if (code[i] === '&' && code[i + 1] === '&') {
        tokens.push('&&');
        i += 2;
        continue;
      }
      if (code[i] === '|' && code[i + 1] === '|') {
        tokens.push('||');
        i += 2;
        continue;
      }
      if (code[i] === '+' && code[i + 1] === '+') {
        tokens.push('++');
        i += 2;
        continue;
      }
      if (code[i] === '-' && code[i + 1] === '-') {
        tokens.push('--');
        i += 2;
        continue;
      }
      if (code[i] === '+' && code[i + 1] === '=') {
        tokens.push('+=');
        i += 2;
        continue;
      }
      if (code[i] === '-' && code[i + 1] === '=') {
        tokens.push('-=');
        i += 2;
        continue;
      }
      if (code[i] === '*' && code[i + 1] === '=') {
        tokens.push('*=');
        i += 2;
        continue;
      }
      if (code[i] === '/' && code[i + 1] === '=') {
        tokens.push('/=');
        i += 2;
        continue;
      }
      tokens.push(code[i]);
      i++;
    }
    return tokens;
  }

  private parseBlock(tokens: string[]): number {
    let pos = 0;
    while (pos < tokens.length) {
      if (tokens[pos] === ';' || tokens[pos] === '{' || tokens[pos] === '}') {
        if (tokens[pos] === ';') { pos++; continue; }
        if (tokens[pos] === '{') {
          pos++;
          pos = this.parseBlock(tokens.slice(pos)) + pos;
          continue;
        }
        if (tokens[pos] === '}') { pos++; break; }
      }
      pos = this.parseStatement(tokens.slice(pos));
    }
    return pos;
  }

  private parseStatement(tokens: string[]): number {
    if (tokens.length === 0) return 0;

    const first = tokens[0];

    if (first === 'echo' || first === 'print') {
      return this.parseEcho(tokens);
    }
    if (first === 'function') {
      return this.parseFunction(tokens);
    }
    if (first === 'for') {
      return this.parseFor(tokens);
    }
    if (first === 'while') {
      return this.parseWhile(tokens);
    }
    if (first === 'foreach') {
      return this.parseForeach(tokens);
    }
    if (first === 'if') {
      return this.parseIf(tokens);
    }
    if (first === 'return') {
      return this.parseReturn(tokens);
    }
    if (first === '$') {
      return this.parseAssignment(tokens);
    }
    if (first === 'array' || (first === '[')) {
      return this.parseArrayLiteral(tokens);
    }

    if (first === ';') return 1;

    const exprEnd = this.findExprEnd(tokens);
    return exprEnd;
  }

  private findExprEnd(tokens: string[]): number {
    let pos = 0;
    let depth = 0;
    while (pos < tokens.length) {
      if (tokens[pos] === '(' || tokens[pos] === '[') depth++;
      if (tokens[pos] === ')' || tokens[pos] === ']') depth--;
      if (tokens[pos] === ';' && depth === 0) return pos + 1;
      pos++;
    }
    return pos;
  }

  private parseEcho(tokens: string[]): number {
    let pos = 1;
    const values: string[] = [];
    while (pos < tokens.length && tokens[pos] !== ';') {
      if (tokens[pos] === ',') { pos++; continue; }
      const { value, nextPos } = this.parseExpression(tokens.slice(pos));
      values.push(String(value));
      pos = nextPos + pos;
    }
    this.output += values.join('') + '\n';
    return pos + 1;
  }

  private parseFunction(tokens: string[]): number {
    if (tokens.length < 5) return this.findExprEnd(tokens);
    const name = tokens[1];
    let pos = 2;
    if (tokens[pos] !== '(') return this.findExprEnd(tokens);
    pos++;
    const params: string[] = [];
    while (pos < tokens.length && tokens[pos] !== ')') {
      if (tokens[pos] === ',') { pos++; continue; }
      if (tokens[pos] === '$') {
        params.push(tokens[pos] + (tokens[pos + 1] || ''));
        pos += 2;
      } else {
        pos++;
      }
    }
    if (tokens[pos] === ')') pos++;
    if (tokens[pos] !== '{') return this.findExprEnd(tokens);
    pos++;
    let braceDepth = 1;
    const bodyTokens: string[] = [];
    while (pos < tokens.length && braceDepth > 0) {
      if (tokens[pos] === '{') braceDepth++;
      if (tokens[pos] === '}') braceDepth--;
      if (braceDepth > 0) bodyTokens.push(tokens[pos]);
      pos++;
    }
    const body = bodyTokens.join(' ');
    this.functions.set(name, { params, body });
    return pos;
  }

  private parseFor(tokens: string[]): number {
    if (tokens.length < 10) return this.findExprEnd(tokens);
    let pos = 1;
    if (tokens[pos] !== '(') return this.findExprEnd(tokens);
    pos++;
    while (pos < tokens.length && tokens[pos] !== ';') pos++;
    pos++;
    const condStart = pos;
    while (pos < tokens.length && tokens[pos] !== ';') pos++;
    const condTokens = tokens.slice(condStart, pos);
    pos++;
    const incStart = pos;
    while (pos < tokens.length && tokens[pos] !== ')') pos++;
    const incTokens = tokens.slice(incStart, pos);
    pos++;
    if (tokens[pos] !== '{') return this.findExprEnd(tokens);
    pos++;
    let braceDepth = 1;
    const bodyStart = pos;
    while (pos < tokens.length && braceDepth > 0) {
      if (tokens[pos] === '{') braceDepth++;
      if (tokens[pos] === '}') braceDepth--;
      pos++;
    }
    const bodyTokens = tokens.slice(bodyStart, pos - 1);

    const maxIter = 1000;
    let iter = 0;
    while (iter < maxIter) {
      const condResult = this.evalExpr(condTokens);
      if (!condResult) break;
      const bodyTokCopy = [...bodyTokens];
      this.parseBlock(bodyTokCopy);
      this.evalExpr(incTokens);
      iter++;
    }
    return pos;
  }

  private parseWhile(tokens: string[]): number {
    if (tokens.length < 7) return this.findExprEnd(tokens);
    let pos = 1;
    if (tokens[pos] !== '(') return this.findExprEnd(tokens);
    pos++;
    const condStart = pos;
    while (pos < tokens.length && tokens[pos] !== ')') pos++;
    const condTokens = tokens.slice(condStart, pos);
    pos++;
    if (tokens[pos] !== '{') return this.findExprEnd(tokens);
    pos++;
    let braceDepth = 1;
    const bodyStart = pos;
    while (pos < tokens.length && braceDepth > 0) {
      if (tokens[pos] === '{') braceDepth++;
      if (tokens[pos] === '}') braceDepth--;
      pos++;
    }
    const bodyTokens = tokens.slice(bodyStart, pos - 1);

    const maxIter = 1000;
    let iter = 0;
    while (iter < maxIter) {
      const condResult = this.evalExpr(condTokens);
      if (!condResult) break;
      const bodyTokCopy = [...bodyTokens];
      this.parseBlock(bodyTokCopy);
      iter++;
    }
    return pos;
  }

  private parseForeach(tokens: string[]): number {
    if (tokens.length < 8) return this.findExprEnd(tokens);
    let pos = 1;
    if (tokens[pos] !== '(') return this.findExprEnd(tokens);
    pos++;
    const arrayVar = tokens[pos];
    pos++;
    pos++;
    let asPos = pos;
    while (asPos < tokens.length && tokens[asPos] !== ')') asPos++;
    const valueVar = tokens[asPos - 1];
    pos = asPos + 1;
    if (tokens[pos] !== '{') return this.findExprEnd(tokens);
    pos++;
    let braceDepth = 1;
    const bodyStart = pos;
    while (pos < tokens.length && braceDepth > 0) {
      if (tokens[pos] === '{') braceDepth++;
      if (tokens[pos] === '}') braceDepth--;
      pos++;
    }
    const bodyTokens = tokens.slice(bodyStart, pos - 1);

    const arr = this.resolveVar(arrayVar);
    if (Array.isArray(arr)) {
      for (const item of arr) {
        this.scope.vars.set(valueVar, item);
        const bodyTokCopy = [...bodyTokens];
        this.parseBlock(bodyTokCopy);
      }
    }
    return pos;
  }

  private parseIf(tokens: string[]): number {
    if (tokens.length < 7) return this.findExprEnd(tokens);
    let pos = 1;
    if (tokens[pos] !== '(') return this.findExprEnd(tokens);
    pos++;
    const condStart = pos;
    while (pos < tokens.length && tokens[pos] !== ')') pos++;
    const condTokens = tokens.slice(condStart, pos);
    pos++;
    if (tokens[pos] !== '{') return this.findExprEnd(tokens);
    pos++;
    let braceDepth = 1;
    const bodyStart = pos;
    while (pos < tokens.length && braceDepth > 0) {
      if (tokens[pos] === '{') braceDepth++;
      if (tokens[pos] === '}') braceDepth--;
      pos++;
    }
    const bodyTokens = tokens.slice(bodyStart, pos - 1);

    const condResult = this.evalExpr(condTokens);
    if (condResult) {
      const bodyTokCopy = [...bodyTokens];
      this.parseBlock(bodyTokCopy);
    }
    return pos;
  }

  private parseReturn(tokens: string[]): number {
    let pos = 1;
    const { value, nextPos } = this.parseExpression(tokens.slice(pos));
    this.output += String(value);
    return nextPos + pos + 1;
  }

  private parseAssignment(tokens: string[]): number {
    const varName = tokens[0];
    let pos = 1;
    if (tokens[pos] === '[') {
      pos++;
      const { value: idxVal, nextPos } = this.parseExpression(tokens.slice(pos));
      pos += nextPos;
      if (tokens[pos] === ']') pos++;
      if (tokens[pos] === '=') {
        pos++;
        const { value, nextPos: np } = this.parseExpression(tokens.slice(pos));
        const arr = this.resolveVar(varName);
        if (Array.isArray(arr)) {
          arr[idxVal] = value;
          this.scope.vars.set(varName, arr);
        }
        pos += np;
      }
      return pos + (tokens[pos] === ';' ? 1 : 0);
    }
    if (tokens[pos] === '=' || tokens[pos] === '+=' || tokens[pos] === '-=' || tokens[pos] === '*=' || tokens[pos] === '/=') {
      const op = tokens[pos];
      pos++;
      const { value, nextPos } = this.parseExpression(tokens.slice(pos));
      const current = this.resolveVar(varName);
      let result: any;
      if (op === '=') result = value;
      else if (op === '+=') result = (current || 0) + value;
      else if (op === '-=') result = (current || 0) - value;
      else if (op === '*=') result = (current || 0) * value;
      else if (op === '/=') result = (current || 0) / value;
      else result = value;
      this.scope.vars.set(varName, result);
      pos += nextPos;
      return pos + (tokens[pos] === ';' ? 1 : 0);
    }
    if (tokens[pos] === '++') {
      const current = Number(this.resolveVar(varName)) || 0;
      this.scope.vars.set(varName, current + 1);
      return pos + 2;
    }
    if (tokens[pos] === '--') {
      const current = Number(this.resolveVar(varName)) || 0;
      this.scope.vars.set(varName, current - 1);
      return pos + 2;
    }
    return this.findExprEnd(tokens);
  }

  private parseArrayLiteral(tokens: string[]): number {
    let pos = 0;
    if (tokens[pos] === 'array') pos++;
    if (tokens[pos] === '(') {
      pos++;
      const arr: any[] = [];
      while (pos < tokens.length && tokens[pos] !== ')') {
        if (tokens[pos] === ',') { pos++; continue; }
        if (tokens[pos] === '=>') { pos++; continue; }
        const { value, nextPos } = this.parseExpression(tokens.slice(pos));
        arr.push(value);
        pos += nextPos;
      }
      return pos + 1;
    }
    if (tokens[pos] === '[') {
      pos++;
      const arr: any[] = [];
      while (pos < tokens.length && tokens[pos] !== ']') {
        if (tokens[pos] === ',') { pos++; continue; }
        const { value, nextPos } = this.parseExpression(tokens.slice(pos));
        arr.push(value);
        pos += nextPos;
      }
      return pos + 1;
    }
    return pos;
  }

  private parseExpression(tokens: string[]): { value: any; nextPos: number } {
    if (tokens.length === 0) return { value: undefined, nextPos: 0 };

    let pos = 0;
    let result = this.parseSingleExpr(tokens, pos);
    pos = result.nextPos;

    while (pos < tokens.length) {
      const op = tokens[pos];
      if (op === '+' || op === '-' || op === '*' || op === '/' || op === '%') {
        const rhs = this.parseSingleExpr(tokens, pos + 1);
        if (op === '+') result.value = Number(result.value) + Number(rhs.value);
        else if (op === '-') result.value = Number(result.value) - Number(rhs.value);
        else if (op === '*') result.value = Number(result.value) * Number(rhs.value);
        else if (op === '/') result.value = Number(result.value) / Number(rhs.value);
        else if (op === '%') result.value = Number(result.value) % Number(rhs.value);
        pos = rhs.nextPos;
      } else if (op === '.') {
        const rhs = this.parseSingleExpr(tokens, pos + 1);
        result.value = String(result.value) + String(rhs.value);
        pos = rhs.nextPos;
      } else if (op === '==' || op === '!=' || op === '<' || op === '>' || op === '<=' || op === '>=' || op === '===' || op === '!==') {
        const rhs = this.parseSingleExpr(tokens, pos + 1);
        if (op === '==') result.value = result.value == rhs.value;
        else if (op === '!=') result.value = result.value != rhs.value;
        else if (op === '===') result.value = result.value === rhs.value;
        else if (op === '!==') result.value = result.value !== rhs.value;
        else if (op === '<') result.value = result.value < rhs.value;
        else if (op === '>') result.value = result.value > rhs.value;
        else if (op === '<=') result.value = result.value <= rhs.value;
        else if (op === '>=') result.value = result.value >= rhs.value;
        pos = rhs.nextPos;
      } else if (op === '&&') {
        const rhs = this.parseSingleExpr(tokens, pos + 1);
        result.value = result.value && rhs.value;
        pos = rhs.nextPos;
      } else if (op === '||') {
        const rhs = this.parseSingleExpr(tokens, pos + 1);
        result.value = result.value || rhs.value;
        pos = rhs.nextPos;
      } else {
        break;
      }
    }

    return { value: result.value, nextPos: pos };
  }

  private parseSingleExpr(tokens: string[], pos: number): { value: any; nextPos: number } {
    if (pos >= tokens.length) return { value: undefined, nextPos: pos };

    const tok = tokens[pos];

    if (tok === '$') {
      const varName = tok + (tokens[pos + 1] || '');
      return { value: this.resolveVar(varName), nextPos: pos + 2 };
    }

    if (tok === '(') {
      let depth = 1;
      let i = pos + 1;
      while (i < tokens.length && depth > 0) {
        if (tokens[i] === '(') depth++;
        if (tokens[i] === ')') depth--;
        i++;
      }
      const inner = tokens.slice(pos + 1, i - 1);
      const result = this.parseExpression(inner);
      return { value: result.value, nextPos: i };
    }

    if (tok === '[') {
      let depth = 1;
      let i = pos + 1;
      while (i < tokens.length && depth > 0) {
        if (tokens[i] === '[') depth++;
        if (tokens[i] === ']') depth--;
        i++;
      }
      const arr: any[] = [];
      const inner = tokens.slice(pos + 1, i - 1);
      let j = 0;
      while (j < inner.length) {
        if (inner[j] === ',') { j++; continue; }
        const r = this.parseExpression(inner.slice(j));
        arr.push(r.value);
        j += r.nextPos;
      }
      return { value: arr, nextPos: i };
    }

    if (tok.startsWith('"')) {
      const str = this.interpolatedString(tok);
      return { value: str, nextPos: pos + 1 };
    }

    if (tok.startsWith("'")) {
      const str = tok.slice(1, -1);
      return { value: str, nextPos: pos + 1 };
    }

    if (/^[0-9]+$/.test(tok)) {
      return { value: parseInt(tok, 10), nextPos: pos + 1 };
    }
    if (/^[0-9]+\.[0-9]+$/.test(tok)) {
      return { value: parseFloat(tok), nextPos: pos + 1 };
    }

    if (tok === 'true' || tok === 'TRUE') return { value: true, nextPos: pos + 1 };
    if (tok === 'false' || tok === 'FALSE') return { value: false, nextPos: pos + 1 };

    const knownFns = ['count', 'strlen', 'strtoupper', 'strtolower', 'implode', 'explode', 'array_push', 'array_merge', 'is_array', 'date', 'time', 'round', 'abs', 'min', 'max', 'sort', 'count', 'array_keys', 'array_values', 'print_r'];
    if (knownFns.includes(tok) || (pos + 1 < tokens.length && tokens[pos + 1] === '(')) {
      return this.parseFunctionCall(tokens, pos, tok);
    }

    return { value: tok, nextPos: pos + 1 };
  }

  private parseFunctionCall(tokens: string[], pos: number, fnName: string): { value: any; nextPos: number } {
    if (pos + 1 >= tokens.length || tokens[pos + 1] !== '(') {
      return { value: fnName, nextPos: pos + 1 };
    }
    let depth = 1;
    let i = pos + 2;
    while (i < tokens.length && depth > 0) {
      if (tokens[i] === '(') depth++;
      if (tokens[i] === ')') depth--;
      i++;
    }
    const argTokens = tokens.slice(pos + 2, i - 1);
    const args: any[] = [];
    let j = 0;
    while (j < argTokens.length) {
      if (argTokens[j] === ',') { j++; continue; }
      const r = this.parseExpression(argTokens.slice(j));
      args.push(r.value);
      j += r.nextPos;
    }

    if (this.functions.has(fnName)) {
      const fn = this.functions.get(fnName)!;
      const savedScope = this.scope;
      const newScope: InterpScope = { vars: new Map(), parent: savedScope };
      fn.params.forEach((p, idx) => {
        newScope.vars.set(p, args[idx]);
      });
      this.scope = newScope;
      const bodyTok = this.tokenize(fn.body);
      this.parseBlock(bodyTok);
      this.scope = savedScope;
      return { value: undefined, nextPos: i };
    }

    const result = this.callBuiltin(fnName, args);
    return { value: result, nextPos: i };
  }

  private callBuiltin(name: string, args: any[]): any {
    switch (name) {
      case 'count': return Array.isArray(args[0]) ? args[0].length : 0;
      case 'strlen': return String(args[0] || '').length;
      case 'strtoupper': return String(args[0] || '').toUpperCase();
      case 'strtolower': return String(args[0] || '').toLowerCase();
      case 'implode': return (args[1] || []).join(String(args[0] || ''));
      case 'explode': return String(args[1] || '').split(String(args[0] || ' '));
      case 'array_push': {
        const arr = args[0];
        if (Array.isArray(arr)) arr.push(args[1]);
        return arr;
      }
      case 'array_merge': return [...(args[0] || []), ...(args[1] || [])];
      case 'is_array': return Array.isArray(args[0]);
      case 'date': return new Date().toISOString().split('T')[0];
      case 'time': return Date.now();
      case 'round': return Math.round(Number(args[0] || 0));
      case 'abs': return Math.abs(Number(args[0] || 0));
      case 'min': return Math.min(...args.map(Number));
      case 'max': return Math.max(...args.map(Number));
      case 'sort': {
        const arr = [...(args[0] || [])];
        arr.sort();
        return arr;
      }
      case 'array_keys': return Array.isArray(args[0]) ? args[0].map((_: any, i: number) => i) : [];
      case 'array_values': return Array.isArray(args[0]) ? [...args[0]] : [];
      case 'print_r': return JSON.stringify(args[0], null, 2);
      default: return undefined;
    }
  }

  private interpolatedString(str: string): string {
    let result = '';
    let i = 1;
    while (i < str.length - 1) {
      if (str[i] === '\\' && i + 1 < str.length - 1) {
        const next = str[i + 1];
        if (next === 'n') result += '\n';
        else if (next === 't') result += '\t';
        else if (next === 'r') result += '\r';
        else if (next === '$') result += '$';
        else if (next === '"') result += '"';
        else if (next === '\\') result += '\\';
        else result += next;
        i += 2;
        continue;
      }
      if (str[i] === '$') {
        let varName = '$';
        i++;
        while (i < str.length - 1 && /[a-zA-Z0-9_]/.test(str[i])) {
          varName += str[i];
          i++;
        }
        const val = this.resolveVar(varName);
        result += val !== undefined ? String(val) : '';
        continue;
      }
      result += str[i];
      i++;
    }
    return result;
  }

  private resolveVar(name: string): any {
    let scope: InterpScope | null = this.scope;
    while (scope) {
      if (scope.vars.has(name)) {
        return scope.vars.get(name);
      }
      scope = scope.parent;
    }
    return undefined;
  }

  private evalExpr(tokens: string[]): any {
    if (tokens.length === 0) return true;
    const result = this.parseExpression(tokens);
    return result.value;
  }
}

// ---------------------------------------------------------------------------
// Main execution API
// ---------------------------------------------------------------------------
export async function executePhp(code: string): Promise<PhpResult> {
  if (!code.trim()) {
    return { output: '', error: '', engine: null };
  }

  try {
    const php = await initPhpWasm();
    const result = await php.run(code);
    const output = result.text || '';
    const error = result.error || '';
    return { output, error, engine: 'wasm' };
  } catch {
    // Fallback to interpreter
    try {
      const interp = new PhpInterpreter();
      interp.execute(code);
      return {
        output: interp.getOutput(),
        error: interp.getError(),
        engine: 'interpreter',
      };
    } catch (err) {
      return {
        output: '',
        error: err instanceof Error ? err.message : 'PHP execution failed',
        engine: 'interpreter',
      };
    }
  }
}
