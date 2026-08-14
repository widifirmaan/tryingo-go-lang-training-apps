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
];

// --- helpers ----------------------------------------------------------------

export function resetMongo(): void {
  seqId = 100;
  collections = SEED_DATA.map((c) => ({
    name: c.name,
    docs: c.docs.map((d) => ({ ...d, ...(Array.isArray(d.items) ? { items: d.items.map((i: Doc) => ({ ...i })) } : {}) })),
  }));
}

export function listCollections(): string[] {
  return collections.map((c) => c.name);
}

const getCollection = (name: string): Collection => {
  const c = collections.find((c) => c.name === name);
  if (!c) throw new Error(`Collection "${name}" not found. Available: ${listCollections().join(', ')}`);
  return c;
};

const applyUpdate = (doc: Doc, update: Doc): void => {
  if (update.$set) Object.assign(doc, update.$set);
  if (update.$inc) {
    for (const [k, v] of Object.entries(update.$inc)) {
      doc[k] = (doc[k] || 0) + (v as number);
    }
  }
  if (update.$push) {
    for (const [k, v] of Object.entries(update.$push)) {
      if (!Array.isArray(doc[k])) doc[k] = [];
      doc[k].push(v);
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
      return re.test(String(fieldVal));
    }
    case '$exists': return operand ? fieldVal !== undefined : fieldVal === undefined;
    default: return false;
  }
};

const matchDoc = (doc: Doc, query: Doc): boolean => {
  if (!query || Object.keys(query).length === 0) return true;

  if (query.$and) {
    return Array.isArray(query.$and) && query.$and.every((q: Doc) => matchDoc(doc, q));
  }
  if (query.$or) {
    return Array.isArray(query.$or) && query.$or.some((q: Doc) => matchDoc(doc, q));
  }

  for (const [key, val] of Object.entries(query)) {
    if (key.startsWith('$')) continue;
    if (val instanceof RegExp) {
      if (!val.test(String(doc[key]))) return false;
      continue;
    }
    if (val !== null && typeof val === 'object' && !Array.isArray(val) && !(val instanceof RegExp)) {
      const ops = Object.keys(val);
      const isOp = ops.every((o) => o.startsWith('$'));
      if (isOp) {
        if (!ops.every((op) => matchValue(doc[key], op, val[op]))) return false;
        continue;
      }
    }
    if (JSON.stringify(doc[key]) !== JSON.stringify(val)) return false;
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

const aggregateSort = (docs: Doc, sortSpec: Doc): Doc[] => {
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
        const expanded: Doc[] = [];
        for (const doc of result) {
          const arr = doc[field.startsWith('$') ? field.slice(1) : field];
          if (Array.isArray(arr)) {
            if (arr.length === 0) {
              const copy = { ...doc };
              delete copy[field.startsWith('$') ? field.slice(1) : field];
              expanded.push(copy);
            } else {
              for (const item of arr) expanded.push({ ...doc, [field.startsWith('$') ? field.slice(1) : field]: item });
            }
          } else {
            expanded.push(doc);
          }
        }
        result = expanded;
        break;
      }
      case '$lookup': {
        const fromCol = collections.find((c) => c.name === arg.from);
        if (!fromCol) throw new Error(`$lookup: collection "${arg.from}" not found`);
        result = result.map((doc) => {
          const localVal = doc[arg.localField];
          const matched = fromCol.docs.filter((fd) => fd[arg.foreignField] === localVal);
          return { ...doc, [arg.as]: matched };
        });
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
  let i = start;
  for (; i < input.length; i++) {
    const ch = input[i];
    if (inStr) {
      if (ch === strChar && input[i - 1] !== '\\') inStr = false;
    } else {
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
    while (i < trimmed.length && (trimmed[i] === ',' || trimmed[i] === ' ')) i++;
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
      while (j < trimmed.length && trimmed[j] !== ',' && trimmed[j] !== ' ') j++;
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
    while (i < s.length && /\s/.test(s[i])) i++;
  };

  const parseValue = (): any => {
    skipWs();
    if (i >= s.length) throw new Error('Unexpected end');
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
  const line = cmd.trim();
  if (!line) return { result: '', isError: false };
  if (line.startsWith('//') || line.startsWith('#')) return { result: '', isError: false };

  // show commands
  if (line === 'show collections') {
    if (collections.length === 0) return { result: '(no collections)', isError: false };
    return { result: collections.map((c) => c.name).join('\n'), isError: false };
  }
  if (line === 'show dbs') {
    return { result: 'tryngo  0.000GB', isError: false };
  }

  // db.collection.method(args) pattern
  const match = line.match(/^db\.(\w+)\.(\w+)\((.*)\)\s*;?\s*$/);
  if (!match) {
    return {
      result: `MongoServerError: unrecognized command. Expected format:\n  db.<collection>.<method>(<args>)\nExample: db.employees.find({ department: "Engineering" })`,
      isError: true,
    };
  }

  const [, collName, method, argsStr] = match;

  try {
    const col = getCollection(collName);

    switch (method) {
      case 'find': {
        const args = parseArgs(argsStr);
        const query = (args[0] as Doc) || {};
        const projection = (args[1] as Doc) || {};
        let results = col.docs.filter((d) => matchDoc(d, query));
        results = results.map((d) => projectDoc(d, projection));
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
        if (!newDoc._id) newDoc._id = nextId();
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
          if (!newDoc._id) newDoc._id = nextId();
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
        const returnDoc = options.returnDocument === 'before' ? before : col.docs[idx];
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
        collections = collections.filter((c) => c.name !== collName);
        return { result: `true  // collection "${collName}" dropped`, isError: false };
      }

      case 'aggregate': {
        const args = parseArgs(argsStr);
        const pipeline = args[0] as Doc[];
        if (!Array.isArray(pipeline)) return { result: 'MongoServerError: aggregate expects an array of pipeline stages', isError: true };
        const results = aggregate(col.docs, pipeline);
        return { result: formatResult(results), isError: false };
      }

      default:
        return {
          result: `MongoServerError: unknown method "${method}".\nSupported: find, findOne, findOneAndUpdate, findOneAndDelete, insertOne, insertMany, updateOne, updateMany, deleteOne, deleteMany, countDocuments, aggregate, drop`,
          isError: true,
        };
    }
  } catch (err: any) {
    return { result: `MongoServerError: ${err.message}`, isError: true };
  }
}

// initialize
resetMongo();
