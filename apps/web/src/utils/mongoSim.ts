// ============================================================================
// mongoSim.ts — In-memory MongoDB command simulator for Tryngo.
// Parses MongoDB-style queries and executes against JS arrays.
// ============================================================================

type Doc = Record<string, any>;

interface Collection {
  name: string;
  docs: Doc[];
}

let collections: Collection[] = [];
let seqId = 100;

const nextId = () => ++seqId;

// --- seed data ----------------------------------------------------------------

const SEED_DATA: { name: string; docs: Doc[] }[] = [
  {
    name: 'employees',
    docs: [
      { _id: 1, name: 'Budi', department: 'Engineering', salary: 85000000, skills: ['Go', 'Python'], active: true },
      { _id: 2, name: 'Siti', department: 'Marketing', salary: 72000000, skills: ['SEO', 'Analytics'], active: true },
      { _id: 3, name: 'Ahmad', department: 'Engineering', salary: 95000000, skills: ['Rust', 'Go', 'K8s'], active: true },
      { _id: 4, name: 'Dewi', department: 'Sales', salary: 68000000, skills: ['CRM', 'Negotiation'], active: false },
      { _id: 5, name: 'Eko', department: 'Engineering', salary: 88000000, skills: ['TypeScript', 'React'], active: true },
    ],
  },
  {
    name: 'products',
    docs: [
      { _id: 1, name: 'Laptop', category: 'Electronics', price: 15000000, tags: ['computer', 'work'], inStock: true },
      { _id: 2, name: 'Mouse', category: 'Electronics', price: 250000, tags: ['accessory'], inStock: true },
      { _id: 3, name: 'Desk Chair', category: 'Furniture', price: 3500000, tags: ['office', 'ergonomic'], inStock: true },
    ],
  },
  {
    name: 'orders',
    docs: [
      { _id: 1, customer: 'Andi', items: [{ product: 'Laptop', qty: 1 }], total: 15000000, status: 'completed', date: '2024-01-15' },
      { _id: 2, customer: 'Budi', items: [{ product: 'Mouse', qty: 2 }], total: 500000, status: 'pending', date: '2024-01-16' },
    ],
  },
  // Warung collections used across Tryngo MongoDB course materials (db.produk, ...)
  {
    name: 'produk',
    docs: [
      { _id: 11, nama: 'Beras 5kg', harga: 62000, stok: 40, kategori: 'Sembako', tag: ['laris'] },
      { _id: 12, nama: 'Minyak 2L', harga: 48000, stok: 25, kategori: 'Sembako', tag: ['laris'] },
      { _id: 13, nama: 'Bayam', harga: 5000, stok: 30, kategori: 'Sayur', tag: [] },
    ],
  },
  {
    name: 'pelanggan',
    docs: [
      { _id: 21, nama: 'Budi', kota: 'Bandung' },
      { _id: 22, nama: 'Siti', kota: 'Jakarta' },
    ],
  },
  {
    name: 'pesanan',
    docs: [
      { _id: 31, pelanggan: 'Budi', produk: 'Beras 5kg', qty: 2, status: 'lunas' },
    ],
  },
];

// --- helpers ----------------------------------------------------------------

const mongoVariables = new Map<string, any>();

export function resetMongo(): void {
  seqId = 100;
  mongoVariables.clear();
  collections = SEED_DATA.map((c) => ({
    name: c.name,
    docs: c.docs.map((d) => JSON.parse(JSON.stringify(d))),
  }));
}

export function listCollections(): string[] {
  return collections.map((c) => c.name);
}

const getNested = (doc: Doc, path: string): any => {
  if (!path.includes('.')) return doc[path];
  const parts = path.split('.');
  let cur = doc;
  for (const part of parts) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[part];
  }
  return cur;
};

const getCollection = (name: string, autoCreate = true): Collection => {
  let c = collections.find((c) => c.name === name);
  if (!c) {
    if (autoCreate) {
      c = { name, docs: [] };
      collections.push(c);
    } else {
      throw new Error(`Collection "${name}" not found. Available: ${listCollections().join(', ')}`);
    }
  }
  return c;
};

const setNested = (obj: any, path: string, val: any): void => {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]] || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = val;
};

const applyUpdate = (doc: Doc, update: Doc): void => {
  if (update.$set) {
    for (const [k, v] of Object.entries(update.$set)) {
      if (k.includes('.')) setNested(doc, k, v);
      else doc[k] = v;
    }
  }
  if (update.$inc) {
    for (const [k, v] of Object.entries(update.$inc)) {
      doc[k] = (doc[k] || 0) + (v as number);
    }
  }
  if (update.$push) {
    for (const [k, v] of Object.entries(update.$push)) {
      if (!Array.isArray(doc[k])) doc[k] = [];
      if (v && typeof v === 'object' && Array.isArray((v as any).$each)) {
        doc[k].push(...(v as any).$each);
        if (typeof (v as any).$slice === 'number') {
          const s = (v as any).$slice;
          if (s < 0) doc[k] = doc[k].slice(s);
          else doc[k] = doc[k].slice(0, s);
        }
      } else {
        doc[k].push(v);
      }
    }
  }
  if (update.$currentDate) {
    for (const k of Object.keys(update.$currentDate)) {
      doc[k] = new Date().toISOString();
    }
  }
  if (update.$unset) {
    for (const k of Object.keys(update.$unset)) {
      delete doc[k];
    }
  }
};

// --- query matching ----------------------------------------------------------

const matchValue = (fieldVal: any, operator: string, operand: any): boolean => {
  switch (operator) {
    case '$gt': return fieldVal > operand;
    case '$gte': return fieldVal >= operand;
    case '$lt': return fieldVal < operand;
    case '$lte': return fieldVal <= operand;
    case '$eq': return fieldVal === operand;
    case '$ne': return fieldVal !== operand;
    case '$in': return Array.isArray(operand) && operand.includes(fieldVal);
    case '$nin': return Array.isArray(operand) && !operand.includes(fieldVal);
    case '$regex': {
      const re = operand instanceof RegExp ? operand : new RegExp(operand);
      re.lastIndex = 0;
      return re.test(String(fieldVal));
    }
    case '$exists': return operand ? fieldVal !== undefined : fieldVal === undefined;
    default: return false;
  }
};

const matchDoc = (doc: Doc, query: Doc): boolean => {
  if (!query || Object.keys(query).length === 0) return true;

  // $expr expressions default to matching in simulator
  if (query.$expr) return true;

  // $and / $or combine with any other top-level fields (MongoDB ANDs them together).
  if (query.$and && Array.isArray(query.$and) && !query.$and.every((q: Doc) => matchDoc(doc, q))) return false;
  if (query.$or && Array.isArray(query.$or) && !query.$or.some((q: Doc) => matchDoc(doc, q))) return false;

  for (const [key, val] of Object.entries(query)) {
    if (key === '$and' || key === '$or' || key.startsWith('$')) continue;
    const docVal = getNested(doc, key);
    if (val instanceof RegExp) {
      val.lastIndex = 0;
      if (!val.test(String(docVal))) return false;
      continue;
    }
    if (val !== null && typeof val === 'object' && !Array.isArray(val) && !(val instanceof RegExp)) {
      const ops = Object.keys(val);
      const isOp = ops.every((o) => o.startsWith('$'));
      if (isOp) {
        // A $regex string value is combined with a sibling $options flag.
        let regexRe: RegExp | null = null;
        const opKeys = ops.filter((o) => o !== '$options');
        for (const op of opKeys) {
          let operand = val[op];
          if (op === '$regex' && typeof operand === 'string') {
            const flags = typeof val.$options === 'string' ? val.$options : '';
            try {
              regexRe = new RegExp(operand, flags);
            } catch {
              return false;
            }
            operand = regexRe;
          }
          if (!matchValue(docVal, op, operand)) return false;
        }
        continue;
      }
    }
    if (JSON.stringify(docVal) !== JSON.stringify(val)) return false;
  }
  return true;
};

// --- projection --------------------------------------------------------------

const projectDoc = (doc: Doc, projection: Doc): Doc => {
  if (!projection || Object.keys(projection).length === 0) return { ...doc };
  const keys = Object.keys(projection);
  const isInclude = keys.some((k) => projection[k]);
  const result: Doc = {};
  if (isInclude) {
    for (const k of keys) {
      if (projection[k] && doc[k] !== undefined) result[k] = doc[k];
    }
    if (!result._id && doc._id !== undefined && !('_id' in projection && !projection._id)) {
      // MongoDB includes _id by default unless explicitly excluded
    }
    if ('_id' in projection && projection._id) result._id = doc._id;
    else if (!('_id' in projection)) result._id = doc._id;
  } else {
    Object.assign(result, doc);
    for (const k of keys) {
      if (!projection[k]) delete result[k];
    }
  }
  return result;
};

// --- aggregation -------------------------------------------------------------

const aggregateSort = (docs: Doc[], sortSpec: Doc): Doc[] => {
  const arr = [...docs];
  const entries = Object.entries(sortSpec);
  arr.sort((a, b) => {
    for (const [key, dir] of entries) {
      const av = a[key], bv = b[key];
      if (av < bv) return dir === 1 ? -1 : 1;
      if (av > bv) return dir === 1 ? 1 : -1;
    }
    return 0;
  });
  return arr;
};

const aggregateGroup = (docs: Doc[], groupSpec: Doc): Doc[] => {
  const { _id, ...accFields } = groupSpec;
  const groups = new Map<string, Doc[]>();

  for (const doc of docs) {
    let key: string;
    if (_id === null) {
      key = 'null';
    } else if (typeof _id === 'string' && _id.startsWith('$')) {
      const field = _id.slice(1);
      key = String(doc[field]);
    } else if (typeof _id === 'object' && _id !== null) {
      const parts = Object.entries(_id).map(([k, v]) => {
        if (typeof v === 'string' && v.startsWith('$')) return String(doc[v.slice(1)]);
        return String(v);
      });
      key = parts.join('_');
    } else {
      key = String(doc[_id as string]);
    }

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(doc);
  }

  const result: Doc[] = [];
  for (const [key, groupDocs] of groups) {
    const out: Doc = {};
    if (_id === null) {
      out._id = null;
    } else if (typeof _id === 'string' && _id.startsWith('$')) {
      out._id = groupDocs[0][_id.slice(1)];
    } else if (typeof _id === 'object' && _id !== null) {
      out._id = {};
      for (const [k, v] of Object.entries(_id)) {
        if (typeof v === 'string' && v.startsWith('$')) (out._id as Doc)[k] = groupDocs[0][v.slice(1)];
        else (out._id as Doc)[k] = v;
      }
    } else {
      out._id = key;
    }

    for (const [field, expr] of Object.entries(accFields)) {
      if (typeof expr === 'object' && expr !== null) {
        const op = Object.keys(expr)[0];
        const val = (expr as Doc)[op];
        switch (op) {
          case '$sum':
            if (val === 1) out[field] = groupDocs.length;
            else if (typeof val === 'string' && val.startsWith('$')) out[field] = groupDocs.reduce((s, d) => s + (Number(d[val.slice(1)]) || 0), 0);
            else if (typeof val === 'number') out[field] = val * groupDocs.length;
            else out[field] = groupDocs.reduce((s, d) => s + (Number(d[field]) || 0), 0);
            break;
          case '$avg':
            out[field] = groupDocs.reduce((s, d) => s + (Number(d[typeof val === 'string' && val.startsWith('$') ? val.slice(1) : field]) || 0), 0) / groupDocs.length;
            break;
          case '$min':
            out[field] = Math.min(...groupDocs.map((d) => Number(d[typeof val === 'string' && val.startsWith('$') ? val.slice(1) : field]) || 0));
            break;
          case '$max':
            out[field] = Math.max(...groupDocs.map((d) => Number(d[typeof val === 'string' && val.startsWith('$') ? val.slice(1) : field]) || 0));
            break;
          case '$push':
            out[field] = groupDocs.map((d) => typeof val === 'string' && val.startsWith('$') ? d[val.slice(1)] : d[field]);
            break;
          case '$first':
            out[field] = groupDocs[0][typeof val === 'string' && val.startsWith('$') ? val.slice(1) : field];
            break;
          case '$last':
            out[field] = groupDocs[groupDocs.length - 1][typeof val === 'string' && val.startsWith('$') ? val.slice(1) : field];
            break;
          default:
            out[field] = `(?op:${op})`;
        }
      }
    }
    result.push(out);
  }
  return result;
};

const aggregate = (docs: Doc[], pipeline: Doc[]): Doc[] => {
  let result = [...docs];
  for (const stage of pipeline) {
    const keys = Object.keys(stage);
    if (keys.length !== 1) throw new Error('Each pipeline stage must have exactly one operator');
    const op = keys[0];
    const arg = stage[op];

    switch (op) {
      case '$match':
        result = result.filter((d) => matchDoc(d, arg));
        break;
      case '$group':
        result = aggregateGroup(result, arg);
        break;
      case '$sort':
        result = aggregateSort(result, arg);
        break;
      case '$project':
        result = result.map((d) => projectDoc(d, arg));
        break;
      case '$limit':
        result = result.slice(0, arg);
        break;
      case '$skip':
        result = result.slice(arg);
        break;
      case '$unwind': {
        const field = typeof arg === 'string' ? arg : arg.path;
        if (typeof field !== 'string' || !field.startsWith('$')) throw new Error('$unwind: path harus string berawalan $ (mis. "$tags")');
        const fieldName = field.slice(1);
        const preserve = typeof arg === 'object' && arg.preserveNullAndEmptyArrays === true;
        const expanded: Doc[] = [];
        for (const doc of result) {
          const arr = doc[fieldName];
          if (Array.isArray(arr)) {
            if (arr.length === 0) {
              if (preserve) {
                const copy = { ...doc };
                delete copy[fieldName];
                expanded.push(copy);
              }
            } else {
              for (const item of arr) expanded.push({ ...doc, [fieldName]: item });
            }
          } else {
            // missing / null / non-array — dropped by default unless preserveNullAndEmptyArrays
            if (preserve) expanded.push({ ...doc });
          }
        }
        result = expanded;
        break;
      }
      case '$lookup': {
        const fromCol = collections.find((c) => c.name === arg.from);
        const fromDocs = fromCol ? fromCol.docs : [];
        if (arg.pipeline && Array.isArray(arg.pipeline)) {
          result = result.map((doc) => {
            let matched = [...fromDocs];
            try {
              matched = aggregate(matched, arg.pipeline);
            } catch {
              // fallback
            }
            return { ...doc, [arg.as]: matched };
          });
        } else {
          result = result.map((doc) => {
            const localVal = doc[arg.localField];
            const matched = fromDocs.filter((fd) => fd[arg.foreignField] === localVal);
            return { ...doc, [arg.as]: matched };
          });
        }
        break;
      }
      case '$facet': {
        const facetObj: Record<string, any[]> = {};
        for (const [facetName, facetPipeline] of Object.entries(arg)) {
          if (Array.isArray(facetPipeline)) {
            try {
              facetObj[facetName] = aggregate(result, facetPipeline as Doc[]);
            } catch {
              facetObj[facetName] = [];
            }
          } else {
            facetObj[facetName] = [];
          }
        }
        result = [facetObj];
        break;
      }
      default:
        throw new Error(`Unknown aggregation stage: ${op}`);
    }
  }
  return result;
};

// --- command parsing ---------------------------------------------------------

const balancedSplit = (input: string, start: number): { inner: string; end: number } => {
  let depth = 0;
  let inStr = false;
  let strChar = '';
  let inLineComment = false;
  let inBlockComment = false;
  let i = start;
  for (; i < input.length; i++) {
    const ch = input[i];
    if (inLineComment) {
      if (ch === '\n') inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (ch === '*' && input[i + 1] === '/') { inBlockComment = false; i++; }
      continue;
    }
    if (inStr) {
      if (ch === strChar && input[i - 1] !== '\\') inStr = false;
    } else {
      if (ch === '/' && input[i + 1] === '/') { inLineComment = true; i++; continue; }
      if (ch === '/' && input[i + 1] === '*') { inBlockComment = true; i++; continue; }
      if (ch === '"' || ch === "'") { inStr = true; strChar = ch; }
      else if (ch === '(' || ch === '[' || ch === '{') depth++;
      else if (ch === ')' || ch === ']' || ch === '}') {
        if (depth === 0) return { inner: input.slice(start, i), end: i };
        depth--;
      }
    }
  }
  return { inner: input.slice(start), end: i };
};

const parseArgs = (argsStr: string): any[] => {
  const trimmed = argsStr.trim();
  if (!trimmed) return [];

  const args: any[] = [];
  let i = 0;
  while (i < trimmed.length) {
    while (i < trimmed.length && (trimmed[i] === ',' || /\s/.test(trimmed[i]))) i++;
    if (i >= trimmed.length) break;

    if (trimmed[i] === '{') {
      const { inner, end } = balancedSplit(trimmed, i + 1);
      const objStr = '{' + inner + '}';
      args.push(safeEvalJSON(objStr));
      i = end + 1;
    } else if (trimmed[i] === '[') {
      const { inner, end } = balancedSplit(trimmed, i + 1);
      const arrStr = '[' + inner + ']';
      args.push(safeEvalJSON(arrStr));
      i = end + 1;
    } else if (trimmed[i] === '"' || trimmed[i] === "'") {
      const quote = trimmed[i];
      let j = i + 1;
      while (j < trimmed.length && (trimmed[j] !== quote || trimmed[j - 1] === '\\')) j++;
      args.push(trimmed.slice(i + 1, j));
      i = j + 1;
    } else {
      let j = i;
      while (j < trimmed.length && trimmed[j] !== ',' && !/\s/.test(trimmed[j])) j++;
      const token = trimmed.slice(i, j);
      if (token === 'true') args.push(true);
      else if (token === 'false') args.push(false);
      else if (token === 'null') args.push(null);
      else if (!isNaN(Number(token))) args.push(Number(token));
      else args.push(token);
      i = j;
    }
  }
  return args;
};

// Safe parser for Mongo-shell-style query literals (objects/arrays/regex), no eval.
const parseQueryLiteral = (() => {
  let s = '';
  let i = 0;

  const skipWs = () => {
    for (;;) {
      while (i < s.length && /\s/.test(s[i])) i++;
      if (s[i] === '/' && s[i + 1] === '/') {
        i += 2;
        while (i < s.length && s[i] !== '\n') i++;
        continue;
      }
      if (s[i] === '/' && s[i + 1] === '*') {
        i += 2;
        while (i < s.length && !(s[i] === '*' && s[i + 1] === '/')) i++;
        if (i < s.length) i += 2;
        continue;
      }
      break;
    }
  };

  const parseValue = (): any => {
    skipWs();
    if (i >= s.length) throw new Error('Unexpected end');
    if (s.startsWith('new Date(', i)) {
      i += 9;
      let parenDepth = 1;
      let arg = '';
      while (i < s.length && parenDepth > 0) {
        if (s[i] === '(') parenDepth++;
        else if (s[i] === ')') {
          parenDepth--;
          if (parenDepth === 0) { i++; break; }
        }
        arg += s[i++];
      }
      const cleanArg = arg.replace(/['"]/g, '').trim();
      return cleanArg && !cleanArg.includes('Date.now') ? new Date(cleanArg).toISOString() : new Date().toISOString();
    }
    if (s.startsWith('Date.now()', i)) {
      i += 10;
      return Date.now();
    }
    if (s.startsWith('ISODate(', i)) {
      i += 8;
      let arg = '';
      while (i < s.length && s[i] !== ')') { arg += s[i++]; }
      if (s[i] === ')') i++;
      const cleanArg = arg.replace(/['"]/g, '').trim();
      return cleanArg ? new Date(cleanArg).toISOString() : new Date().toISOString();
    }
    if (s.startsWith('new ObjectId(', i) || s.startsWith('ObjectId(', i)) {
      const isNew = s.startsWith('new ObjectId(', i);
      i += isNew ? 13 : 9;
      let arg = '';
      while (i < s.length && s[i] !== ')') { arg += s[i++]; }
      if (s[i] === ')') i++;
      return arg.replace(/['"]/g, '').trim() || String(nextId());
    }
    if (s.startsWith('NumberInt(', i)) {
      i += 10;
      let arg = '';
      while (i < s.length && s[i] !== ')') { arg += s[i++]; }
      if (s[i] === ')') i++;
      return parseInt(arg.replace(/['"]/g, '').trim(), 10) || 0;
    }
    if (s.startsWith('NumberLong(', i)) {
      i += 11;
      let arg = '';
      while (i < s.length && s[i] !== ')') { arg += s[i++]; }
      if (s[i] === ')') i++;
      return parseInt(arg.replace(/['"]/g, '').trim(), 10) || 0;
    }
    const ch = s[i];
    if (ch === '{') return parseObject();
    if (ch === '[') return parseArray();
    if (ch === '"' || ch === "'") return parseString();
    if (ch === '/') return parseRegex();
    return parsePrimitive();
  };

  const parseObject = (): Record<string, any> => {
    i++; // consume '{'
    const obj: Record<string, any> = {};
    skipWs();
    if (s[i] === '}') { i++; return obj; }
    for (;;) {
      skipWs();
      // key: quoted or bare
      let key: string;
      if (s[i] === '"' || s[i] === "'") key = parseString();
      else {
        const start = i;
        while (i < s.length && !/[\s:,}]/.test(s[i])) i++;
        key = s.slice(start, i);
      }
      skipWs();
      if (s[i] !== ':') throw new Error('Expected : after key');
      i++;
      const val = parseValue();
      // convert $regex strings into RegExp like the old walk step
      if (key === '$regex' && typeof val === 'string') obj[key] = new RegExp(val);
      else obj[key] = val;
      skipWs();
      if (s[i] === ',') { i++; continue; }
      if (s[i] === '}') { i++; break; }
      throw new Error('Expected , or }');
    }
    return obj;
  };

  const parseArray = (): any[] => {
    i++; // consume '['
    const arr: any[] = [];
    skipWs();
    if (s[i] === ']') { i++; return arr; }
    for (;;) {
      arr.push(parseValue());
      skipWs();
      if (s[i] === ',') { i++; continue; }
      if (s[i] === ']') { i++; break; }
      throw new Error('Expected , or ]');
    }
    return arr;
  };

  const parseString = (): string => {
    const quote = s[i++];
    let out = '';
    while (i < s.length && s[i] !== quote) {
      if (s[i] === '\\' && i + 1 < s.length) {
        i++;
        const esc = s[i];
        if (esc === 'n') out += '\n';
        else if (esc === 't') out += '\t';
        else if (esc === 'r') out += '\r';
        else out += esc;
        i++;
      } else {
        out += s[i++];
      }
    }
    i++; // consume closing quote
    return out;
  };

  const parseRegex = (): RegExp => {
    const start = ++i; // consume '/'
    let body = '';
    while (i < s.length && s[i] !== '/') {
      if (s[i] === '\\' && i + 1 < s.length) {
        body += s[i + 1];
        i += 2;
      } else {
        body += s[i++];
      }
    }
    i++; // consume closing '/'
    let flags = '';
    while (i < s.length && /[a-z]/i.test(s[i])) flags += s[i++];
    try {
      return new RegExp(body, flags);
    } catch {
      return new RegExp(body.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    }
  };

  const parsePrimitive = (): any => {
    const start = i;
    while (i < s.length && !/[\s,}\]/:]/.test(s[i])) i++;
    const token = s.slice(start, i);
    if (token === 'true') return true;
    if (token === 'false') return false;
    if (token === 'null') return null;
    const num = Number(token);
    if (!isNaN(num)) return num;
    if (mongoVariables.has(token)) return mongoVariables.get(token);
    // fall back to a bare string (e.g. unquoted identifier)
    return token;
  };

  return (str: string): any => {
    s = str;
    i = 0;
    const val = parseValue();
    skipWs();
    return val;
  };
})();

const safeEvalJSON = (str: string): any => {
  try {
    return parseQueryLiteral(str);
  } catch {
    return str;
  }
};

// --- format output -----------------------------------------------------------

const formatDoc = (doc: Doc): string => JSON.stringify(doc, null, 2);

const formatResult = (result: any): string => {
  if (result === undefined || result === null) return 'null';
  if (Array.isArray(result)) {
    if (result.length === 0) return '[]';
    return result.map(formatDoc).join('\n');
  }
  if (typeof result === 'object') return formatDoc(result);
  return String(result);
};

// --- main dispatcher ---------------------------------------------------------

export function executeMongo(cmd: string): { result: string; isError: boolean } {
  let line = cmd.trim();
  if (!line) return { result: '', isError: false };
  if (line.startsWith('//') || line.startsWith('#') || line.startsWith('/*') || line.startsWith('*')) return { result: '', isError: false };

  // Strip trailing semicolon
  if (line.endsWith(';')) line = line.slice(0, -1).trim();

  // Print statements
  const printMatch = line.match(/^print(?:json)?\s*\(([\s\S]*)\)$/);
  if (printMatch) {
    const inner = printMatch[1].trim();
    if (mongoVariables.has(inner)) {
      return { result: formatResult(mongoVariables.get(inner)), isError: false };
    }
    const evaluated = safeEvalJSON(inner);
    return { result: formatResult(evaluated), isError: false };
  }

  // Transaction try-catch blocks
  if (line.startsWith('try {') || line.startsWith('try{')) {
    return {
      result: `Transaction successfully committed with majority quorum.\n{ "ok": 1, "status": "committed" }`,
      isError: false,
    };
  }

  // Session commands
  if (line.startsWith('session.') || line.includes('session.startTransaction') || line.includes('session.commitTransaction')) {
    if (line.includes('startTransaction')) return { result: '{ "ok": 1, "status": "transaction_started" }', isError: false };
    if (line.includes('commitTransaction')) return { result: '{ "ok": 1, "status": "committed" }', isError: false };
    if (line.includes('abortTransaction')) return { result: '{ "ok": 1, "status": "aborted" }', isError: false };
    if (line.includes('endSession')) return { result: '{ "ok": 1 }', isError: false };
    return { result: '{ "ok": 1 }', isError: false };
  }

  // Sharding administration commands (sh.*)
  if (line.startsWith('sh.')) {
    if (line.startsWith('sh.status')) {
      return {
        result: `--- Sharding Status ---
  sharding version: { "_id": 1, "minCompatibleVersion": 5, "currentVersion": 6, "clusterId": "65f019a2b8e34a001" }
  shards:
        { "_id": "shard-01", "host": "shard-01.internal:27017", "state": 1 }
        { "_id": "shard-02", "host": "shard-02.internal:27017", "state": 1 }
  active mongos:
        "mongos-01:27017" : "7.0.6"
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled: yes
        Currently running: no
  databases:
        { "_id": "telemetry_db", "primary": "shard-01", "partitioned": true, "version": { "uuid": "7a9b01f4" } }
            telemetry_db.device_telemetries
                shard key: { "facilityId": "hashed" }
                unique: false
                balancing: true
                chunks:
                    shard-01 2
                    shard-02 2
                { "facilityId": { "$minKey": 1 } } -->> { "facilityId": -4611686018427387902 } on : shard-01
                { "facilityId": -4611686018427387902 } -->> { "facilityId": 0 } on : shard-01
                { "facilityId": 0 } -->> { "facilityId": 4611686018427387902 } on : shard-02
                { "facilityId": 4611686018427387902 } -->> { "facilityId": { "$maxKey": 1 } } on : shard-02`,
        isError: false,
      };
    }
    if (line.startsWith('sh.enableSharding')) {
      return { result: '{ "ok": 1 }', isError: false };
    }
    if (line.startsWith('sh.shardCollection')) {
      const colMatch = line.match(/^sh\.shardCollection\(\s*["']([^"']+)["']/);
      const col = colMatch ? colMatch[1] : 'collection';
      return { result: `{ "collectionsharded": "${col}", "ok": 1 }`, isError: false };
    }
    if (line.startsWith('sh.addShard')) {
      return { result: '{ "shardAdded": "shard-03", "ok": 1 }', isError: false };
    }
    return { result: '{ "ok": 1 }', isError: false };
  }

  // Replica set administration commands (rs.*)
  if (line.startsWith('rs.')) {
    if (line.startsWith('rs.status')) {
      return {
        result: JSON.stringify({
          set: 'rs0',
          stateStr: 'PRIMARY',
          myState: 1,
          members: [
            { _id: 0, name: 'mongo1:27017', stateStr: 'PRIMARY', health: 1 },
            { _id: 1, name: 'mongo2:27017', stateStr: 'SECONDARY', health: 1 },
            { _id: 2, name: 'mongo3:27017', stateStr: 'SECONDARY', health: 1 },
          ],
          ok: 1,
        }, null, 2),
        isError: false,
      };
    }
    return { result: '{ "ok": 1 }', isError: false };
  }

  // show commands
  if (line === 'show collections') {
    if (collections.length === 0) return { result: '(no collections)', isError: false };
    return { result: collections.map((c) => c.name).join('\n'), isError: false };
  }
  if (line === 'show dbs') {
    return { result: 'telemetry_db  0.001GB\ntryngo        0.000GB\nadmin         0.000GB', isError: false };
  }
  if (/^use\s+\w+/i.test(line)) {
    const dbName = line.replace(/^use\s+/i, '').replace(/;$/, '').trim();
    return { result: `switched to db ${dbName}`, isError: false };
  }

  // Variable assignment: const/let/var name = expression
  const assignMatch = line.match(/^(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*([\s\S]+)$/);
  if (assignMatch) {
    const varName = assignMatch[1];
    let expr = assignMatch[2].trim();
    if (expr.endsWith(';')) expr = expr.slice(0, -1).trim();

    if (expr.includes('db.getMongo().startSession')) {
      mongoVariables.set(varName, { id: 'session_mock_1' });
      return { result: `// Client session "${varName}" initialized`, isError: false };
    }

    if (expr.startsWith('db.')) {
      const subRes = executeMongo(expr);
      if (!subRes.isError) {
        try {
          mongoVariables.set(varName, JSON.parse(subRes.result));
        } catch {
          mongoVariables.set(varName, subRes.result);
        }
      }
      return subRes;
    }

    try {
      const val = safeEvalJSON(expr);
      mongoVariables.set(varName, val);
      return { result: `// Variable "${varName}" defined`, isError: false };
    } catch {
      mongoVariables.set(varName, expr);
      return { result: `// Variable "${varName}" assigned`, isError: false };
    }
  }

  // Strip .toArray() or .pretty()
  line = line.replace(/\.(toArray|pretty)\(\s*\)$/, '');

  // Extract chained modifiers: .limit(N), .sort({...}), .skip(N), .explain(...)
  let limitCount: number | null = null;
  let sortSpec: Doc | null = null;
  let skipCount: number | null = null;
  let isExplain = false;

  const limitMatch = line.match(/\.limit\(\s*(\d+)\s*\)$/);
  if (limitMatch) {
    limitCount = parseInt(limitMatch[1], 10);
    line = line.slice(0, limitMatch.index).trim();
  }

  const skipMatch = line.match(/\.skip\(\s*(\d+)\s*\)$/);
  if (skipMatch) {
    skipCount = parseInt(skipMatch[1], 10);
    line = line.slice(0, skipMatch.index).trim();
  }

  const sortMatch = line.match(/\.sort\(([\s\S]*)\)$/);
  if (sortMatch) {
    try {
      sortSpec = safeEvalJSON(sortMatch[1].trim());
    } catch {
      // ignore
    }
    line = line.slice(0, sortMatch.index).trim();
  }

  const explainMatch = line.match(/\.explain\(([\s\S]*)\)$/);
  if (explainMatch) {
    isExplain = true;
    line = line.slice(0, explainMatch.index).trim();
  }

  // db.createCollection("colName", { ... })
  const createColMatch = line.match(/^db\.createCollection\(\s*["']([^"']+)["'](?:,\s*\{[\s\S]*\})?\s*\)\s*$/);
  if (createColMatch) {
    const colName = createColMatch[1];
    getCollection(colName, true);
    return { result: '{ "ok": 1 }', isError: false };
  }

  // db.collection.method(args) pattern
  const match = line.match(/^db\.(\w+)\.([a-zA-Z0-9_]+)\(([\s\S]*)\)\s*$/);
  if (!match) {
    return {
      result: `MongoServerError: unrecognized command. Expected format:\n  db.<collection>.<method>(<args>)\nExample: db.employees.find({ department: "Engineering" })`,
      isError: true,
    };
  }

  const [, collName, method, rawArgsStr] = match;
  let argsStr = rawArgsStr.trim();
  if (mongoVariables.has(argsStr)) {
    // Variable substitution (e.g. aggregate(complexPipeline))
  }

  try {
    const col = getCollection(collName);

    switch (method) {
      case 'find': {
        const args = parseArgs(argsStr);
        const query = (args[0] as Doc) || {};
        const projection = (args[1] as Doc) || {};
        let results = col.docs.filter((d) => matchDoc(d, query));
        results = results.map((d) => projectDoc(d, projection));
        if (sortSpec) results = aggregateSort(results, sortSpec);
        if (skipCount) results = results.slice(skipCount);
        if (limitCount !== null) results = results.slice(0, limitCount);

        if (isExplain) {
          return {
            result: JSON.stringify({
              queryPlanner: {
                plannerVersion: 1,
                namespace: `tryngo.${collName}`,
                indexFilterSet: false,
                winningPlan: { stage: 'IXSCAN', direction: 'forward' },
              },
              executionStats: {
                executionSuccess: true,
                nReturned: results.length,
                executionTimeMillis: 2,
                totalKeysExamined: results.length,
                totalDocsExamined: results.length,
              },
            }, null, 2),
            isError: false,
          };
        }

        const out = formatResult(results);
        return { result: out + `\n\n// ${results.length} document(s) found`, isError: false };
      }

      case 'findOne': {
        const args = parseArgs(argsStr);
        const query = (args[0] as Doc) || {};
        const doc = col.docs.find((d) => matchDoc(d, query));
        if (!doc) return { result: 'null', isError: false };
        return { result: formatDoc(doc), isError: false };
      }

      case 'insertOne': {
        const args = parseArgs(argsStr);
        const doc = args[0] as Doc;
        if (!doc) return { result: 'MongoServerError: document required', isError: true };
        const newDoc = { ...doc };
        if (newDoc._id === undefined) newDoc._id = nextId();
        col.docs.push(newDoc);
        return { result: `{ "acknowledged": true, "insertedId": ${JSON.stringify(newDoc._id)} }`, isError: false };
      }

      case 'insertMany': {
        const args = parseArgs(argsStr);
        const docs = args[0] as Doc[];
        if (!Array.isArray(docs)) return { result: 'MongoServerError: expected array of documents', isError: true };
        const insertedIds: any[] = [];
        for (const doc of docs) {
          const newDoc = { ...doc };
          if (newDoc._id === undefined) newDoc._id = nextId();
          col.docs.push(newDoc);
          insertedIds.push(newDoc._id);
        }
        return { result: `{ "acknowledged": true, "insertedCount": ${docs.length}, "insertedIds": ${JSON.stringify(insertedIds)} }`, isError: false };
      }

      case 'findOneAndUpdate': {
        const args = parseArgs(argsStr);
        const query = (args[0] as Doc) || {};
        const update = (args[1] as Doc) || {};
        const options = (args[2] as Doc) || {};
        const idx = col.docs.findIndex((d) => matchDoc(d, query));
        if (idx === -1) return { result: 'null', isError: false };
        const doc = col.docs[idx];
        const before = { ...doc };
        const hasOperators = ['$set', '$inc', '$push', '$unset'].some((op) => update[op]);
        if (hasOperators) {
          applyUpdate(doc, update);
        } else {
          col.docs[idx] = { ...update, ...(doc._id !== undefined ? { _id: doc._id } : {}) };
        }
        const returnDoc = options.returnDocument === 'after' ? col.docs[idx] : before;
        return { result: formatDoc(returnDoc), isError: false };
      }

      case 'findOneAndDelete': {
        const args = parseArgs(argsStr);
        const query = (args[0] as Doc) || {};
        const idx = col.docs.findIndex((d) => matchDoc(d, query));
        if (idx === -1) return { result: 'null', isError: false };
        const [removed] = col.docs.splice(idx, 1);
        return { result: formatDoc(removed), isError: false };
      }

      case 'updateOne': {
        const args = parseArgs(argsStr);
        const query = (args[0] as Doc) || {};
        const update = (args[1] as Doc) || {};
        const idx = col.docs.findIndex((d) => matchDoc(d, query));
        if (idx === -1) return { result: `{ "acknowledged": true, "matchedCount": 0, "modifiedCount": 0 }`, isError: false };

        const doc = col.docs[idx];
        if (!update.$set && !update.$inc && !update.$push && !update.$unset) {
          return { result: 'MongoServerError: update operator required ($set, $inc, $push, $unset)', isError: true };
        }

        applyUpdate(doc, update);
        return { result: `{ "acknowledged": true, "matchedCount": 1, "modifiedCount": 1 }`, isError: false };
      }

      case 'updateMany': {
        const args = parseArgs(argsStr);
        const query = (args[0] as Doc) || {};
        const update = (args[1] as Doc) || {};
        const matched = col.docs.filter((d) => matchDoc(d, query));
        if (matched.length === 0) return { result: `{ "acknowledged": true, "matchedCount": 0, "modifiedCount": 0 }`, isError: false };

        for (const doc of matched) {
          applyUpdate(doc, update);
        }
        return { result: `{ "acknowledged": true, "matchedCount": ${matched.length}, "modifiedCount": ${matched.length} }`, isError: false };
      }

      case 'deleteOne': {
        const args = parseArgs(argsStr);
        const query = (args[0] as Doc) || {};
        const idx = col.docs.findIndex((d) => matchDoc(d, query));
        if (idx === -1) return { result: `{ "acknowledged": true, "deletedCount": 0 }`, isError: false };
        col.docs.splice(idx, 1);
        return { result: `{ "acknowledged": true, "deletedCount": 1 }`, isError: false };
      }

      case 'deleteMany': {
        const args = parseArgs(argsStr);
        const query = (args[0] as Doc) || {};
        const before = col.docs.length;
        col.docs = col.docs.filter((d) => !matchDoc(d, query));
        return { result: `{ "acknowledged": true, "deletedCount": ${before - col.docs.length} }`, isError: false };
      }

      case 'countDocuments': {
        const args = parseArgs(argsStr);
        const query = (args[0] as Doc) || {};
        const count = col.docs.filter((d) => matchDoc(d, query)).length;
        return { result: String(count), isError: false };
      }

      case 'drop': {
        const idx = collections.findIndex((c) => c.name === collName);
        if (idx !== -1) {
          collections.splice(idx, 1);
          return { result: `true  // collection "${collName}" dropped`, isError: false };
        }
        return { result: `true  // collection "${collName}" dropped (empty)`, isError: false };
      }

      case 'createIndex':
      case 'ensureIndex': {
        const args = parseArgs(argsStr);
        const fieldName = args[0] ? Object.keys(args[0])[0] : 'field';
        return { result: `"${fieldName}_1"  // index created successfully`, isError: false };
      }

      case 'getShardDistribution': {
        return {
          result: `Shard shard-01 at shard-01.mongodb.net:27017
 data : 24.5KiB docs : ${col.docs.length > 0 ? Math.ceil(col.docs.length / 2) : 100} chunks : 2
 estimated data per chunk : 12.25KiB

Shard shard-02 at shard-02.mongodb.net:27017
 data : 23.8KiB docs : ${col.docs.length > 0 ? Math.floor(col.docs.length / 2) : 98} chunks : 2
 estimated data per chunk : 11.9KiB

Totals
 data : 48.3KiB docs : ${col.docs.length > 0 ? col.docs.length : 198} chunks : 4
 Shard shard-01 includes 50.7% data, 50.5% docs
 Shard shard-02 includes 49.3% data, 49.5% docs`,
          isError: false,
        };
      }

      case 'explain': {
        return {
          result: JSON.stringify({
            queryPlanner: {
              plannerVersion: 1,
              namespace: `tryngo.${collName}`,
              indexFilterSet: false,
              winningPlan: { stage: 'IXSCAN', direction: 'forward' },
            },
            executionStats: {
              executionSuccess: true,
              nReturned: col.docs.length,
              executionTimeMillis: 2,
              totalKeysExamined: col.docs.length,
              totalDocsExamined: col.docs.length,
            },
          }, null, 2),
          isError: false,
        };
      }

      case 'stats': {
        return {
          result: JSON.stringify({
            ns: `tryngo.${collName}`,
            size: 1024 * (col.docs.length || 1),
            count: col.docs.length,
            avgObjSize: 256,
            storageSize: 4096,
            nindexes: 1,
            ok: 1,
          }, null, 2),
          isError: false,
        };
      }

      case 'aggregate': {
        let pipeline: any;
        if (mongoVariables.has(argsStr)) {
          pipeline = mongoVariables.get(argsStr);
        } else {
          const args = parseArgs(argsStr);
          pipeline = args[0];
          if (typeof pipeline === 'string' && mongoVariables.has(pipeline)) {
            pipeline = mongoVariables.get(pipeline);
          }
        }

        if (!Array.isArray(pipeline)) return { result: 'MongoServerError: aggregate expects an array of pipeline stages', isError: true };

        if (isExplain) {
          return {
            result: JSON.stringify({
              stages: pipeline.map((p, idx) => ({ stage: Object.keys(p)[0], stageIndex: idx + 1 })),
              executionStats: {
                executionSuccess: true,
                nReturned: col.docs.length,
                executionTimeMillis: 3,
              },
            }, null, 2),
            isError: false,
          };
        }

        const results = aggregate(col.docs, pipeline);
        return { result: formatResult(results), isError: false };
      }

      default:
        return {
          result: `MongoServerError: unknown method "${method}".\nSupported: find, findOne, findOneAndUpdate, findOneAndDelete, insertOne, insertMany, updateOne, updateMany, deleteOne, deleteMany, countDocuments, aggregate, drop, createIndex, stats, explain`,
          isError: true,
        };
    }
  } catch (err: any) {
    return { result: `MongoServerError: ${err.message}`, isError: true };
  }
}

// initialize
resetMongo();

// Split a Mongo shell script into logical statements, respecting bracket
// depth, string/template/regex literals and comments so multi-line commands
// (e.g. aggregate pipelines) run as a single command instead of line-by-line.
export function splitStatements(code: string): string[] {
  const stmts: string[] = [];
  let buffer = '';
  let depth = 0;
  let inStr: string | null = null; // ', ", `
  let inRegex = false;
  let prevNonSpace: string | null = null;

  const push = () => {
    const t = buffer.trim();
    if (t) stmts.push(t);
    buffer = '';
  };

  const isEscaped = (i: number): boolean => {
    let count = 0;
    for (let j = i - 1; j >= 0 && code[j] === '\\'; j--) count++;
    return count % 2 === 1;
  };

  const isRegexStart = (): boolean => {
    if (prevNonSpace === null) return true;
    return /[=(,{}\[\]:!&|;?+\-*%<>]/.test(prevNonSpace);
  };

  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if (inStr) {
      buffer += ch;
      if (ch === inStr && !isEscaped(i)) inStr = null;
      continue;
    }
    if (inRegex) {
      buffer += ch;
      if (ch === '/' && !isEscaped(i)) inRegex = false;
      else if (ch === '\n') {
        inRegex = false;
        buffer += ' ';
      }
      continue;
    }
    if (ch === '/' && code[i + 1] === '*') {
      // block comment
      if (depth === 0 && buffer.trim() === '') {
        while (i < code.length) {
          buffer += code[i];
          if (code[i] === '*' && code[i + 1] === '/') {
            buffer += code[i + 1];
            i += 2;
            break;
          }
          i++;
        }
        push();
        prevNonSpace = ' ';
        continue;
      }
      // inline block comment inside a command → skip to closing */
      while (i < code.length) {
        if (code[i] === '*' && code[i + 1] === '/') {
          i += 2;
          break;
        }
        i++;
      }
      buffer += ' ';
      prevNonSpace = ' ';
      continue;
    }
    if (ch === '/' && code[i + 1] === '/') {
      // comment line outside a command → treat as its own statement (info)
      if (depth === 0 && buffer.trim() === '') {
        while (i < code.length && code[i] !== '\n') { buffer += code[i]; i++; }
        push();
        prevNonSpace = ' ';
        continue;
      }
      // inline comment inside a command → skip to end of line
      while (i < code.length && code[i] !== '\n') i++;
      buffer += ' ';
      prevNonSpace = ' ';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inStr = ch;
      buffer += ch;
      prevNonSpace = ch;
      continue;
    }
    if (ch === '/' && isRegexStart()) {
      inRegex = true;
      buffer += ch;
      continue;
    }
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth = Math.max(0, depth - 1);
    if (ch === ';' && depth === 0) {
      push();
      prevNonSpace = ';';
      continue;
    }
    if (ch === '\n') {
      if (depth === 0) {
        let nextIdx = i + 1;
        while (nextIdx < code.length && /\s/.test(code[nextIdx])) nextIdx++;
        if (code[nextIdx] === '.' || prevNonSpace === '.' || prevNonSpace === '=' || prevNonSpace === '+') {
          buffer += ' ';
          prevNonSpace = ' ';
          continue;
        }
        push();
      } else {
        buffer += ' ';
      }
      prevNonSpace = ' ';
      continue;
    }
    if (!/\s/.test(ch)) prevNonSpace = ch;
    buffer += ch;
  }
  push();
  return stmts;
}
