// ============================================================================
// redisSim.ts — In-browser Redis command simulator for Tryngo Redis track.
// Simulates a realistic subset of Redis commands using in-memory JS data
// structures (Map, Set, objects). No Redis server needed.
// ============================================================================

type RedisValue = {
  type: 'string' | 'hash' | 'list' | 'set' | 'zset';
  data: any;
  expiresAt?: number | null;
};

type PubSubCallback = (channel: string, message: string) => void;

interface RedisStats {
  totalKeys: number;
  expired: number;
  byType: Record<string, number>;
  currentDb: number;
}

let store = new Map<string, RedisValue>();
const subscribers = new Map<string, Set<PubSubCallback>>();
const patternSubscribers = new Map<string, Set<PubSubCallback>>();
let expiredCount = 0;
let currentDb = 0;
const dbStores = new Map<number, Map<string, RedisValue>>();
dbStores.set(0, store);

const activeStore = (): Map<string, RedisValue> => {
  const s = dbStores.get(currentDb);
  if (!s) {
    const created = new Map<string, RedisValue>();
    dbStores.set(currentDb, created);
    return created;
  }
  return s;
};

const now = () => Date.now();

const isExpired = (key: string): boolean => {
  const v = activeStore().get(key);
  if (!v?.expiresAt) return false;
  if (now() >= v.expiresAt) {
    activeStore().delete(key);
    expiredCount++;
    return true;
  }
  return false;
};

const getVal = (key: string): any | null => {
  const v = activeStore().get(key);
  if (!v) return null;
  if (isExpired(key)) return null;
  return v.data;
};

const getType = (key: string): string => {
  const v = activeStore().get(key);
  if (!v) return 'none';
  if (isExpired(key)) return 'none';
  return v.type;
};

const parseIntSafe = (s: string): number | null => {
  const n = parseInt(s, 10);
  return isNaN(n) ? null : n;
};

const parseFloatSafe = (s: string): number | null => {
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
};

const formatBulkString = (s: string | null): string => {
  if (s === null) return '$-1';
  return `$${s.length}\r\n${s}`;
};

const formatArray = (items: (string | null)[]): string => {
  if (!items.length) return '*0';
  let out = `*${items.length}\r\n`;
  for (const item of items) {
    out += formatBulkString(item);
    out += '\r\n';
  }
  return out.trimEnd();
};

const formatInteger = (n: number): string => `:${n}`;

const formatError = (msg: string): string => `-ERR ${msg}\r\n`;

const formatSimpleString = (s: string): string => `+${s}`;

const okResponse = () => formatSimpleString('OK');

// Returns null when the key is missing or holds the expected type, otherwise a WRONGTYPE error reply.
const wrongtypeCheck = (key: string, expected: string): string | null => {
  const t = getType(key);
  if (t === 'none' || t === expected) return null;
  return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
};

const notifySubscribers = (pattern: string, channel: string, message: string) => {
  for (const [pat, cbs] of patternSubscribers) {
    if (matchGlob(pat, pattern)) {
      for (const cb of cbs) cb(channel, message);
    }
  }
};

const matchGlob = (pattern: string, str: string): boolean => {
  const regex = new RegExp('^' + pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
  return regex.test(str);
};

const loadSampleData = () => {
  currentDb = 0;
  for (const [, s] of dbStores) {
    s.clear();
  }
  const base = dbStores.get(0) ?? new Map<string, RedisValue>();
  dbStores.set(0, base);
  store = base;
  expiredCount = 0;
  subscribers.clear();
  patternSubscribers.clear();

  store.set('user:1:name', { type: 'string', data: 'Budi', expiresAt: null });
  store.set('user:1:email', { type: 'string', data: 'budi@example.com', expiresAt: null });
  store.set('user:2:name', { type: 'string', data: 'Siti', expiresAt: null });
  store.set('product:1', { type: 'hash', data: { name: 'Laptop', price: '15000000', stock: '25' }, expiresAt: null });
  store.set('product:2', { type: 'hash', data: { name: 'Mouse', price: '250000', stock: '150' }, expiresAt: null });
  store.set('queue:tasks', { type: 'list', data: ['send_email', 'generate_report', 'backup_db'], expiresAt: null });
  store.set('tags:product:1', { type: 'set', data: new Set(['electronics', 'computer', 'work']), expiresAt: null });
  const zsetData: Record<string, number> = { player1: 100, player2: 85, player3: 120, player4: 95 };
  store.set('leaderboard', { type: 'zset', data: zsetData, expiresAt: null });
  store.set('session:abc', { type: 'string', data: 'active', expiresAt: now() + 3600000 });
};

const cmdPing = (): string => formatSimpleString('PONG');

const cmdEcho = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'echo\' command');
  return formatBulkString(args.join(' '));
};

const cmdDel = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'del\' command');
  let count = 0;
  for (const key of args) {
    if (store.has(key) && !isExpired(key)) {
      store.delete(key);
      count++;
    }
  }
  return formatInteger(count);
};

const cmdExists = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'exists\' command');
  let count = 0;
  for (const key of args) {
    if (store.has(key) && !isExpired(key)) count++;
  }
  return formatInteger(count);
};

const cmdType = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'type\' command');
  return formatSimpleString(getType(args[0]));
};

const cmdKeys = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'keys\' command');
  const pattern = args[0];
  const results: string[] = [];
  for (const key of store.keys()) {
    if (!isExpired(key) && matchGlob(pattern, key)) {
      results.push(key);
    }
  }
  return formatArray(results);
};

const cmdExpire = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'expire\' command');
  const key = args[0];
  const seconds = parseIntSafe(args[1]);
  if (seconds === null) return formatError('value is not an integer or out of range');
  const v = store.get(key);
  if (!v || isExpired(key)) return formatInteger(0);
  v.expiresAt = now() + seconds * 1000;
  return formatInteger(1);
};

const cmdTtl = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'ttl\' command');
  const key = args[0];
  const v = store.get(key);
  if (!v || isExpired(key)) return formatInteger(-2);
  if (!v.expiresAt) return formatInteger(-1);
  const remaining = Math.ceil((v.expiresAt - now()) / 1000);
  return formatInteger(Math.max(0, remaining));
};

const cmdFlushall = (): string => {
  for (const [, s] of dbStores) {
    s.clear();
  }
  subscribers.clear();
  patternSubscribers.clear();
  expiredCount = 0;
  return okResponse();
};

const cmdRename = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'rename\' command');
  const src = args[0];
  const dst = args[1];
  if (!store.has(src) || isExpired(src)) return formatError('no such key');
  const v = store.get(src)!;
  store.delete(src);
  store.set(dst, v);
  return okResponse();
};

const cmdRenamenx = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'renamenx\' command');
  const src = args[0];
  const dst = args[1];
  if (!store.has(src) || isExpired(src)) return formatError('no such key');
  if (store.has(dst) && !isExpired(dst)) return formatInteger(0);
  const v = store.get(src)!;
  store.delete(src);
  store.set(dst, v);
  return formatInteger(1);
};

const cmdDbsize = (): string => formatInteger(store.size);

const cmdTime = (): string => {
  const t = Math.floor(Date.now() / 1000);
  const ms = Date.now() % 1000;
  return formatArray([String(t), String(ms)]);
};

const cmdSelect = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'select\' command');
  const db = parseIntSafe(args[0]);
  if (db === null || db < 0) return formatError('invalid DB index');
  currentDb = db;
  let target = dbStores.get(db);
  if (!target) {
    target = new Map();
    dbStores.set(db, target);
  }
  store = target;
  return okResponse();
};

const cmdInfo = (): string => {
  const info = `# Server\r\nredis_version:7.2.0-sim\r\n# Clients\r\nconnected_clients:1\r\n# Memory\r\nused_memory:${store.size * 100}\r\n# Keyspace\r\ndb${currentDb}:keys=${store.size},expires=${[...store.values()].filter(v => v.expiresAt).length},avg_ttl=0\r\n`;
  return formatBulkString(info);
};

const cmdCommand = (): string => formatInteger(0);

// --- String commands ---

const cmdSet = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'set\' command');
  const key = args[0];
  const value = args[1];
  let ex: number | null = null;
  let nx = false, xx = false;

  for (let i = 2; i < args.length; i++) {
    const opt = args[i].toUpperCase();
    if (opt === 'EX') {
      const secs = parseIntSafe(args[i + 1] ?? '');
      if (secs === null || secs <= 0) return formatError('invalid expire time in \'set\' command');
      ex = secs;
      i++;
    } else if (opt === 'PX') {
      const ms = parseIntSafe(args[i + 1] ?? '');
      if (ms === null || ms <= 0) return formatError('invalid expire time in \'set\' command');
      ex = ms / 1000;
      i++;
    } else if (opt === 'NX') { nx = true; }
    else if (opt === 'XX') { xx = true; }
  }

  const exists = store.has(key) && !isExpired(key);
  if (nx && exists) return '$-1';
  if (xx && !exists) return '$-1';

  const v: RedisValue = { type: 'string', data: value, expiresAt: null };
  if (ex) v.expiresAt = now() + ex * 1000;
  store.set(key, v);
  return okResponse();
};

const cmdGet = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'get\' command');
  const val = getVal(args[0]);
  if (val === null) return '$-1';
  if (typeof val !== 'string') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  return formatBulkString(val);
};

const cmdAppend = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'append\' command');
  const key = args[0];
  const suffix = args[1];
  const v = store.get(key);
  if (!v || isExpired(key)) {
    store.set(key, { type: 'string', data: suffix, expiresAt: null });
    return formatInteger(suffix.length);
  }
  if (v.type !== 'string') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  v.data += suffix;
  return formatInteger(v.data.length);
};

const cmdStrlen = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'strlen\' command');
  const val = getVal(args[0]);
  if (val === null) return formatInteger(0);
  if (typeof val !== 'string') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  return formatInteger(val.length);
};

const cmdIncr = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'incr\' command');
  return cmdIncrby(['INCRBY', args[0], '1']);
};

const cmdDecr = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'decr\' command');
  return cmdIncrby(['INCRBY', args[0], '-1']);
};

const cmdIncrby = (args: string[]): string => {
  if (args[0] === 'INCRBY' && args.length < 3) return formatError('wrong number of arguments for \'incrby\' command');
  if (args[0] === 'DECRBY' && args.length < 3) return formatError('wrong number of arguments for \'decrby\' command');
  const key = args[0] === 'INCRBY' || args[0] === 'DECRBY' ? args[1] : args[0];
  const incr = args[0] === 'INCRBY' || args[0] === 'DECRBY' ? args[2] : args[1];
  const n = parseIntSafe(incr);
  if (n === null) return formatError('value is not an integer or out of range');
  const v = store.get(key);
  if (!v || isExpired(key)) {
    store.set(key, { type: 'string', data: String(n), expiresAt: null });
    return formatInteger(n);
  }
  if (v.type !== 'string') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  const cur = parseIntSafe(v.data);
  if (cur === null) return formatError('value is not an integer or out of range');
  const result = cur + n;
  v.data = String(result);
  return formatInteger(result);
};

const cmdDecrby = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'decrby\' command');
  const n = parseIntSafe(args[2]);
  if (n === null) return formatError('value is not an integer or out of range');
  return cmdIncrby(['INCRBY', args[1], String(-n)]);
};

const cmdGetset = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'getset\' command');
  const key = args[0];
  const newVal = args[1];
  const oldVal = getVal(key);
  if (oldVal !== null && typeof oldVal !== 'string') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  store.set(key, { type: 'string', data: newVal, expiresAt: null });
  if (oldVal === null) return '$-1';
  return formatBulkString(oldVal);
};

const cmdMset = (args: string[]): string => {
  if (args.length < 2 || args.length % 2 !== 0) return formatError('wrong number of arguments for \'mset\' command');
  for (let i = 0; i < args.length; i += 2) {
    store.set(args[i], { type: 'string', data: args[i + 1], expiresAt: null });
  }
  return okResponse();
};

const cmdMget = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'mget\' command');
  const results: (string | null)[] = [];
  for (const key of args) {
    const val = getVal(key);
    results.push(typeof val === 'string' ? val : null);
  }
  return formatArray(results);
};

const cmdSetex = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'setex\' command');
  const key = args[0];
  const seconds = parseIntSafe(args[1]);
  if (seconds === null) return formatError('value is not an integer or out of range');
  if (seconds <= 0) return formatError('invalid expire time in \'setex\' command');
  const value = args[2];
  store.set(key, { type: 'string', data: value, expiresAt: now() + seconds * 1000 });
  return okResponse();
};

const cmdSetnx = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'setnx\' command');
  const key = args[0];
  const value = args[1];
  if (store.has(key) && !isExpired(key)) return formatInteger(0);
  store.set(key, { type: 'string', data: value, expiresAt: null });
  return formatInteger(1);
};

const cmdPsetex = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'psetex\' command');
  const key = args[0];
  const ms = parseIntSafe(args[1]);
  if (ms === null) return formatError('value is not an integer or out of range');
  if (ms <= 0) return formatError('invalid expire time in \'psetex\' command');
  const value = args[2];
  store.set(key, { type: 'string', data: value, expiresAt: now() + ms });
  return okResponse();
};

// --- Hash commands ---

const cmdHset = (args: string[]): string => {
  if (args.length < 3 || args.length % 2 === 0) return formatError('wrong number of arguments for \'hset\' command');
  const key = args[0];
  const v = store.get(key);
  let hash: Record<string, string>;
  let isNew = false;
  if (!v || isExpired(key)) {
    hash = {};
    isNew = true;
  } else {
    if (v.type !== 'hash') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
    hash = { ...v.data };
  }
  let added = 0;
  for (let i = 1; i < args.length; i += 2) {
    const field = args[i];
    const value = args[i + 1];
    if (!(field in hash)) added++;
    hash[field] = value;
  }
  store.set(key, { type: 'hash', data: hash, expiresAt: isNew ? null : v!.expiresAt });
  return formatInteger(added);
};

const cmdHget = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'hget\' command');
  const key = args[0];
  const field = args[1];
  const tErr = wrongtypeCheck(key, 'hash');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return '$-1';
  const result = val[field];
  return result !== undefined ? formatBulkString(result) : '$-1';
};

const cmdHmset = (args: string[]): string => {
  if (args.length < 3 || args.length % 2 === 0) return formatError('wrong number of arguments for \'hmset\' command');
  const key = args[0];
  const tErr = wrongtypeCheck(key, 'hash');
  if (tErr) return tErr;
  const v = store.get(key);
  const isNew = !v || isExpired(key);
  let hash: Record<string, string> = {};
  let ttl: number | null = null;
  if (!isNew) {
    hash = { ...v.data };
    ttl = v.expiresAt ?? null;
  }
  for (let i = 1; i < args.length; i += 2) {
    hash[args[i]] = args[i + 1];
  }
  store.set(key, { type: 'hash', data: hash, expiresAt: ttl });
  return okResponse();
};

const cmdHmget = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'hmget\' command');
  const key = args[0];
  const tErr = wrongtypeCheck(key, 'hash');
  if (tErr) return tErr;
  const val = getVal(key);
  const results: (string | null)[] = [];
  if (val === null) {
    for (let i = 1; i < args.length; i++) results.push(null);
  } else {
    for (let i = 1; i < args.length; i++) {
      results.push(val[args[i]] !== undefined ? val[args[i]] : null);
    }
  }
  return formatArray(results);
};

const cmdHgetall = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'hgetall\' command');
  const key = args[0];
  const tErr = wrongtypeCheck(key, 'hash');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return formatArray([]);
  const results: string[] = [];
  for (const [k, v] of Object.entries(val)) {
    results.push(k, v as string);
  }
  return formatArray(results);
};

const cmdHdel = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'hdel\' command');
  const key = args[0];
  const tErr = wrongtypeCheck(key, 'hash');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return formatInteger(0);
  let count = 0;
  for (let i = 1; i < args.length; i++) {
    if (args[i] in val) {
      delete val[args[i]];
      count++;
    }
  }
  if (Object.keys(val).length === 0) store.delete(key);
  return formatInteger(count);
};

const cmdHexists = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'hexists\' command');
  const key = args[0];
  const field = args[1];
  const tErr = wrongtypeCheck(key, 'hash');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return formatInteger(0);
  return formatInteger(field in val ? 1 : 0);
};

const cmdHkeys = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'hkeys\' command');
  const key = args[0];
  const tErr = wrongtypeCheck(key, 'hash');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return formatArray([]);
  return formatArray(Object.keys(val));
};

const cmdHvals = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'hvals\' command');
  const key = args[0];
  const tErr = wrongtypeCheck(key, 'hash');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return formatArray([]);
  return formatArray(Object.values(val));
};

const cmdHlen = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'hlen\' command');
  const key = args[0];
  const tErr = wrongtypeCheck(key, 'hash');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return formatInteger(0);
  return formatInteger(Object.keys(val).length);
};

const cmdHincrby = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'hincrby\' command');
  const key = args[0];
  const field = args[1];
  const incr = parseIntSafe(args[2]);
  if (incr === null) return formatError('value is not an integer or out of range');
  const v = store.get(key);
  let hash: Record<string, string>;
  let ttl: number | null = null;
  if (!v || isExpired(key)) {
    hash = {};
  } else {
    if (v.type !== 'hash') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
    hash = { ...v.data };
    ttl = v.expiresAt ?? null;
  }
  const fieldValue = hash[field];
  if (fieldValue !== undefined && parseIntSafe(fieldValue) === null) return formatError('hash value is not an integer');
  const cur = parseIntSafe(fieldValue || '0') || 0;
  const result = cur + incr;
  hash[field] = String(result);
  store.set(key, { type: 'hash', data: hash, expiresAt: ttl });
  return formatInteger(result);
};

// --- List commands ---

const cmdLpush = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'lpush\' command');
  const key = args[0];
  const v = store.get(key);
  let list: string[];
  let ttl: number | null = null;
  if (!v || isExpired(key)) {
    list = [];
  } else {
    if (v.type !== 'list') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
    list = [...v.data];
    ttl = v.expiresAt ?? null;
  }
  for (let i = 1; i < args.length; i++) {
    list.unshift(args[i]);
  }
  store.set(key, { type: 'list', data: list, expiresAt: ttl });
  return formatInteger(list.length);
};

const cmdRpush = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'rpush\' command');
  const key = args[0];
  const v = store.get(key);
  let list: string[];
  let ttl: number | null = null;
  if (!v || isExpired(key)) {
    list = [];
  } else {
    if (v.type !== 'list') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
    list = [...v.data];
    ttl = v.expiresAt ?? null;
  }
  for (let i = 1; i < args.length; i++) {
    list.push(args[i]);
  }
  store.set(key, { type: 'list', data: list, expiresAt: ttl });
  return formatInteger(list.length);
};

const cmdLpop = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'lpop\' command');
  const key = args[0];
  const val = getVal(key);
  if (val === null) return '$-1';
  if (!Array.isArray(val)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  const item = val.shift();
  if (item === undefined) {
    store.delete(key);
    return '$-1';
  }
  if (!val.length) store.delete(key);
  return formatBulkString(item);
};

const cmdRpop = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'rpop\' command');
  const key = args[0];
  const val = getVal(key);
  if (val === null) return '$-1';
  if (!Array.isArray(val)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  const item = val.pop();
  if (item === undefined) {
    store.delete(key);
    return '$-1';
  }
  if (!val.length) store.delete(key);
  return formatBulkString(item);
};

const cmdLrange = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'lrange\' command');
  const key = args[0];
  const start = parseIntSafe(args[1]);
  const stop = parseIntSafe(args[2]);
  if (start === null || stop === null) return formatError('value is not an integer or out of range');
  const val = getVal(key);
  if (val === null) return formatArray([]);
  if (!Array.isArray(val)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  const len = val.length;
  const s = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  const e = stop < 0 ? Math.max(len + stop, -1) : Math.min(stop, len - 1);
  if (s > e || s >= len) return formatArray([]);
  return formatArray(val.slice(s, e + 1));
};

const cmdLlen = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'llen\' command');
  const val = getVal(args[0]);
  if (val === null) return formatInteger(0);
  if (!Array.isArray(val)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  return formatInteger(val.length);
};

const cmdLindex = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'lindex\' command');
  const key = args[0];
  const index = parseIntSafe(args[1]);
  if (index === null) return formatError('value is not an integer or out of range');
  const val = getVal(key);
  if (val === null) return '$-1';
  if (!Array.isArray(val)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  const item = index < 0 ? val[val.length + index] : val[index];
  return item !== undefined ? formatBulkString(item) : '$-1';
};

const cmdLset = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'lset\' command');
  const key = args[0];
  const index = parseIntSafe(args[1]);
  if (index === null) return formatError('value is not an integer or out of range');
  const v = store.get(key);
  if (!v || isExpired(key)) return formatError('no such key');
  if (v.type !== 'list') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  const cursor = index < 0 ? v.data.length + index : index;
  if (cursor < 0 || cursor >= v.data.length) return formatError('index out of range');
  v.data[cursor] = args[2];
  return okResponse();
};

const cmdLinsert = (args: string[]): string => {
  if (args.length < 4) return formatError('wrong number of arguments for \'linsert\' command');
  const key = args[0];
  const pos = args[1].toUpperCase();
  if (pos !== 'BEFORE' && pos !== 'AFTER') return formatError('syntax error');
  const pivot = args[2];
  const value = args[3];
  const v = store.get(key);
  if (!v || isExpired(key)) return formatInteger(0);
  if (v.type !== 'list') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  const idx = v.data.indexOf(pivot);
  if (idx === -1) return formatInteger(-1);
  const insertAt = pos === 'BEFORE' ? idx : idx + 1;
  v.data.splice(insertAt, 0, value);
  return formatInteger(v.data.length);
};

const cmdLrem = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'lrem\' command');
  const key = args[0];
  const count = parseIntSafe(args[1]);
  if (count === null) return formatError('value is not an integer or out of range');
  const value = args[2];
  const v = store.get(key);
  if (!v || isExpired(key)) return formatInteger(0);
  if (v.type !== 'list') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  let removed = 0;
  const list = v.data;
  if (count > 0) {
    for (let i = 0; i < list.length && removed < count; i++) {
      if (list[i] === value) { list.splice(i, 1); removed++; i--; }
    }
  } else if (count < 0) {
    for (let i = list.length - 1; i >= 0 && removed < -count; i--) {
      if (list[i] === value) { list.splice(i, 1); removed++; }
    }
  } else {
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i] === value) { list.splice(i, 1); removed++; }
    }
  }
  if (list.length === 0) store.delete(key);
  return formatInteger(removed);
};

const cmdLtrim = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'ltrim\' command');
  const key = args[0];
  const start = parseIntSafe(args[1]);
  const stop = parseIntSafe(args[2]);
  if (start === null || stop === null) return formatError('value is not an integer or out of range');
  const v = store.get(key);
  if (!v || isExpired(key)) return okResponse();
  if (v.type !== 'list') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  const len = v.data.length;
  const s = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  const e = stop < 0 ? Math.max(len + stop, -1) : Math.min(stop, len - 1);
  if (s > e || s >= len) {
    store.delete(key);
  } else {
    v.data = v.data.slice(s, e + 1);
  }
  return okResponse();
};

// --- Set commands ---

const cmdSadd = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'sadd\' command');
  const key = args[0];
  const v = store.get(key);
  let set: Set<string>;
  let ttl: number | null = null;
  if (!v || isExpired(key)) {
    set = new Set();
  } else {
    if (v.type !== 'set') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
    set = new Set(v.data);
    ttl = v.expiresAt ?? null;
  }
  let added = 0;
  for (let i = 1; i < args.length; i++) {
    if (!set.has(args[i])) { set.add(args[i]); added++; }
  }
  store.set(key, { type: 'set', data: set, expiresAt: ttl });
  return formatInteger(added);
};

const cmdSmembers = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'smembers\' command');
  const val = getVal(args[0]);
  if (val === null) return formatArray([]);
  if (!(val instanceof Set)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  return formatArray([...val]);
};

const cmdSismember = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'sismember\' command');
  const key = args[0];
  const member = args[1];
  const val = getVal(key);
  if (val === null) return formatInteger(0);
  if (!(val instanceof Set)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  return formatInteger(val.has(member) ? 1 : 0);
};

const cmdSrem = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'srem\' command');
  const key = args[0];
  const val = getVal(key);
  if (val === null) return formatInteger(0);
  if (!(val instanceof Set)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  let count = 0;
  for (let i = 1; i < args.length; i++) {
    if (val.delete(args[i])) count++;
  }
  if (val.size === 0) store.delete(key);
  return formatInteger(count);
};

const cmdScard = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'scard\' command');
  const val = getVal(args[0]);
  if (val === null) return formatInteger(0);
  if (!(val instanceof Set)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  return formatInteger(val.size);
};

const cmdSmove = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'smove\' command');
  const src = args[0];
  const dst = args[1];
  const member = args[2];
  const srcVal = getVal(src);
  if (srcVal === null) return formatInteger(0);
  if (!(srcVal instanceof Set)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  if (!srcVal.has(member)) return formatInteger(0);
  const dstVal = store.get(dst);
  let dstSet: Set<string>;
  if (!dstVal || isExpired(dst)) {
    dstSet = new Set();
  } else {
    if (dstVal.type !== 'set') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
    dstSet = new Set(dstVal.data);
  }
  // Validate destination BEFORE mutating the source so a WRONGTYPE error
  // leaves the source set intact (Redis semantics).
  srcVal.delete(member);
  dstSet.add(member);
  store.set(dst, { type: 'set', data: dstSet, expiresAt: null });
  return formatInteger(1);
};

const cmdSpop = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'spop\' command');
  const key = args[0];
  const count = args.length > 1 ? parseIntSafe(args[1]) : null;
  if (args.length > 1 && count === null) return formatError('value is not an integer or out of range');
  const tErr = wrongtypeCheck(key, 'set');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return '$-1';
  const arr = [...val];
  if (count !== null) {
    const n = Math.min(Math.max(count, 0), arr.length);
    const popped: string[] = [];
    for (let k = 0; k < n; k++) {
      const idx = Math.floor(Math.random() * arr.length);
      popped.push(arr.splice(idx, 1)[0]);
    }
    for (const m of popped) val.delete(m);
    if (!val.size) store.delete(key);
    return formatArray(popped);
  }
  if (val.size === 0) {
    store.delete(key);
    return '$-1';
  }
  const item = arr[Math.floor(Math.random() * arr.length)];
  val.delete(item);
  if (!val.size) store.delete(key);
  return formatBulkString(item);
};

const cmdSrandmember = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'srandmember\' command');
  const key = args[0];
  const count = args.length > 1 ? parseIntSafe(args[1]) : null;
  if (args.length > 1 && count === null) return formatError('value is not an integer or out of range');
  const tErr = wrongtypeCheck(key, 'set');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return '$-1';
  const arr = [...val];
  if (arr.length === 0) return '$-1';
  if (count !== null) {
    const n = Math.min(Math.max(count, 0), arr.length);
    const picked: string[] = [];
    for (let k = 0; k < n; k++) {
      picked.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    return formatArray(picked);
  }
  return formatBulkString(arr[Math.floor(Math.random() * arr.length)]);
};

const cmdSinter = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'sinter\' command');
  const first = getVal(args[0]);
  if (first === null) return formatArray([]);
  if (!(first instanceof Set)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  let result = new Set([...first]);
  for (let i = 1; i < args.length; i++) {
    const val = getVal(args[i]);
    if (val === null) return formatArray([]);
    if (!(val instanceof Set)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
    result = new Set([...result].filter(x => val.has(x)));
  }
  return formatArray([...result]);
};

const cmdSunion = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'sunion\' command');
  const result = new Set<string>();
  for (const key of args) {
    const val = getVal(key);
    if (val === null) continue;
    if (!(val instanceof Set)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
    for (const item of val) result.add(item);
  }
  return formatArray([...result]);
};

const cmdSdiff = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'sdiff\' command');
  const first = getVal(args[0]);
  if (first === null) return formatArray([]);
  if (!(first instanceof Set)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
  let result = new Set([...first]);
  for (let i = 1; i < args.length; i++) {
    const val = getVal(args[i]);
    if (val === null) continue;
    if (!(val instanceof Set)) return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
    for (const item of val) result.delete(item);
  }
  return formatArray([...result]);
};

// --- Sorted Set commands ---

const cmdZadd = (args: string[]): string => {
  if (args.length < 3 || args.length % 2 === 0) return formatError('wrong number of arguments for \'zadd\' command');
  const key = args[0];
  const v = store.get(key);
  let zset: Record<string, number>;
  let ttl: number | null = null;
  if (!v || isExpired(key)) {
    zset = {};
  } else {
    if (v.type !== 'zset') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
    zset = { ...v.data };
    ttl = v.expiresAt ?? null;
  }
  let added = 0;
  for (let i = 1; i < args.length; i += 2) {
    const score = parseFloatSafe(args[i]);
    if (score === null) return formatError('value is not a valid float');
    const member = args[i + 1];
    if (!(member in zset)) added++;
    zset[member] = score;
  }
  store.set(key, { type: 'zset', data: zset, expiresAt: ttl });
  return formatInteger(added);
};

const cmdZrange = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'zrange\' command');
  const key = args[0];
  const start = parseIntSafe(args[1]);
  const stop = parseIntSafe(args[2]);
  if (start === null || stop === null) return formatError('value is not an integer or out of range');
  const tErr = wrongtypeCheck(key, 'zset');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return formatArray([]);
  const entries = Object.entries(val).sort((a, b) => a[1] - b[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  const len = entries.length;
  const s = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  const e = stop < 0 ? Math.max(len + stop, -1) : Math.min(stop, len - 1);
  if (s > e || s >= len) return formatArray([]);
  const slice = entries.slice(s, e + 1);
  const withScores = args.some(a => a.toUpperCase() === 'WITHSCORES');
  const results: string[] = [];
  for (const [member, score] of slice) {
    results.push(member);
    if (withScores) results.push(String(score));
  }
  return formatArray(results);
};

const cmdZrevrange = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'zrevrange\' command');
  const key = args[0];
  const start = parseIntSafe(args[1]);
  const stop = parseIntSafe(args[2]);
  if (start === null || stop === null) return formatError('value is not an integer or out of range');
  const tErr = wrongtypeCheck(key, 'zset');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return formatArray([]);
  const entries = Object.entries(val).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0));
  const len = entries.length;
  const s = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  const e = stop < 0 ? Math.max(len + stop, -1) : Math.min(stop, len - 1);
  if (s > e || s >= len) return formatArray([]);
  const slice = entries.slice(s, e + 1);
  const withScores = args.some(a => a.toUpperCase() === 'WITHSCORES');
  const results: string[] = [];
  for (const [member, score] of slice) {
    results.push(member);
    if (withScores) results.push(String(score));
  }
  return formatArray(results);
};

const cmdZrank = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'zrank\' command');
  const key = args[0];
  const member = args[1];
  const tErr = wrongtypeCheck(key, 'zset');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return '$-1';
  const entries = Object.entries(val).sort((a, b) => a[1] - b[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  const idx = entries.findIndex(([m]) => m === member);
  return idx >= 0 ? formatInteger(idx) : '$-1';
};

const cmdZrevrank = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'zrevrank\' command');
  const key = args[0];
  const member = args[1];
  const tErr = wrongtypeCheck(key, 'zset');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return '$-1';
  const entries = Object.entries(val).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0));
  const idx = entries.findIndex(([m]) => m === member);
  return idx >= 0 ? formatInteger(idx) : '$-1';
};

const cmdZscore = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'zscore\' command');
  const key = args[0];
  const member = args[1];
  const tErr = wrongtypeCheck(key, 'zset');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return '$-1';
  const score = val[member];
  return score !== undefined ? formatBulkString(String(score)) : '$-1';
};

const cmdZrem = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'zrem\' command');
  const key = args[0];
  const tErr = wrongtypeCheck(key, 'zset');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return formatInteger(0);
  let count = 0;
  for (let i = 1; i < args.length; i++) {
    if (args[i] in val) { delete val[args[i]]; count++; }
  }
  if (Object.keys(val).length === 0) store.delete(key);
  return formatInteger(count);
};

const cmdZcard = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'zcard\' command');
  const key = args[0];
  const tErr = wrongtypeCheck(key, 'zset');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return formatInteger(0);
  return formatInteger(Object.keys(val).length);
};

const cmdZincrby = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'zincrby\' command');
  const key = args[0];
  const incr = parseFloatSafe(args[1]);
  if (incr === null) return formatError('value is not a valid float');
  const member = args[2];
  const v = store.get(key);
  let zset: Record<string, number>;
  let ttl: number | null = null;
  if (!v || isExpired(key)) {
    zset = {};
  } else {
    if (v.type !== 'zset') return formatError('WRONGTYPE Operation against a key holding the wrong kind of value');
    zset = { ...v.data };
    ttl = v.expiresAt ?? null;
  }
  zset[member] = (zset[member] || 0) + incr;
  store.set(key, { type: 'zset', data: zset, expiresAt: ttl });
  return formatBulkString(String(zset[member]));
};

const parseScoreBound = (s: string): { value: number; exclusive: boolean } | null => {
  let exclusive = false;
  let str = s.trim();
  if (str.startsWith('(')) { exclusive = true; str = str.slice(1); }
  const lower = str.toLowerCase();
  if (lower === '-inf') return { value: -Infinity, exclusive: false };
  if (lower === '+inf' || lower === 'inf') return { value: Infinity, exclusive: false };
  const n = parseFloatSafe(str);
  if (n === null) return null;
  return { value: n, exclusive };
};

const cmdZrangebyscore = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'zrangebyscore\' command');
  const key = args[0];
  const min = parseScoreBound(args[1]);
  const max = parseScoreBound(args[2]);
  if (!min || !max) return formatError('min or max is not a float');
  const tErr = wrongtypeCheck(key, 'zset');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return formatArray([]);
  const inRange = ([, s]: [string, number]) =>
    (min.exclusive ? s > min.value : s >= min.value) && (max.exclusive ? s < max.value : s <= max.value);
  const entries = Object.entries(val).filter(inRange as any).sort((a, b) => a[1] - b[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  const withScores = args.some(a => a.toUpperCase() === 'WITHSCORES');
  const results: string[] = [];
  for (const [member, score] of entries) {
    results.push(member);
    if (withScores) results.push(String(score));
  }
  return formatArray(results);
};

const cmdZcount = (args: string[]): string => {
  if (args.length < 3) return formatError('wrong number of arguments for \'zcount\' command');
  const key = args[0];
  const min = parseScoreBound(args[1]);
  const max = parseScoreBound(args[2]);
  if (!min || !max) return formatError('min or max is not a float');
  const tErr = wrongtypeCheck(key, 'zset');
  if (tErr) return tErr;
  const val = getVal(key);
  if (val === null) return formatInteger(0);
  const count = Object.values(val).filter((s) => {
    const sc = s as number;
    return (min.exclusive ? sc > min.value : sc >= min.value) && (max.exclusive ? sc < max.value : sc <= max.value);
  }).length;
  return formatInteger(count);
};

// --- Pub/Sub commands ---

const cmdSubscribe = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'subscribe\' command');
  const results: string[] = [];
  for (const channel of args) {
    if (!subscribers.has(channel)) subscribers.set(channel, new Set());
    results.push('subscribe', channel, String(subscribers.size + patternSubscribers.size));
  }
  return formatArray(results);
};

const cmdPublish = (args: string[]): string => {
  if (args.length < 2) return formatError('wrong number of arguments for \'publish\' command');
  const channel = args[0];
  const message = args[1];
  let count = 0;
  const subs = subscribers.get(channel);
  if (subs) {
    for (const cb of subs) { cb(channel, message); count++; }
  }
  for (const [pattern, cbs] of patternSubscribers) {
    if (matchGlob(pattern, channel)) {
      for (const cb of cbs) { cb(channel, message); count++; }
    }
  }
  return formatInteger(count);
};

const cmdUnsubscribe = (args: string[]): string => {
  const results: string[] = [];
  for (const channel of args.length ? args : [...subscribers.keys()]) {
    subscribers.delete(channel);
    results.push('unsubscribe', channel, '0');
  }
  return formatArray(results);
};

const cmdPsubscribe = (args: string[]): string => {
  if (!args.length) return formatError('wrong number of arguments for \'psubscribe\' command');
  const results: string[] = [];
  for (const pattern of args) {
    if (!patternSubscribers.has(pattern)) patternSubscribers.set(pattern, new Set());
    results.push('psubscribe', pattern, String(subscribers.size + patternSubscribers.size));
  }
  return formatArray(results);
};

// --- Main dispatch ---

export function executeRedis(cmd: string): { response: string; isError: boolean } {
  const trimmed = cmd.trim();
  if (!trimmed) return { response: '', isError: false };

  const tokens = parseCommand(trimmed);
  if (!tokens.length) return { response: '', isError: false };

  const command = tokens[0].toUpperCase();
  const args = tokens.slice(1);

  let response = '';
  let isError = false;

  try {
    switch (command) {
      case 'PING': response = cmdPing(); break;
      case 'ECHO': response = cmdEcho(args); break;
      case 'DEL': response = cmdDel(args); break;
      case 'EXISTS': response = cmdExists(args); break;
      case 'TYPE': response = cmdType(args); break;
      case 'KEYS': response = cmdKeys(args); break;
      case 'EXPIRE': response = cmdExpire(args); break;
      case 'TTL': response = cmdTtl(args); break;
      case 'FLUSHALL': response = cmdFlushall(); break;
      case 'RENAME': response = cmdRename(args); break;
      case 'RENAMENX': response = cmdRenamenx(args); break;
      case 'DBSIZE': response = cmdDbsize(); break;
      case 'TIME': response = cmdTime(); break;
      case 'SELECT': response = cmdSelect(args); break;
      case 'INFO': response = cmdInfo(); break;
      case 'COMMAND': response = cmdCommand(); break;

      // Strings
      case 'SET': response = cmdSet(args); break;
      case 'GET': response = cmdGet(args); break;
      case 'APPEND': response = cmdAppend(args); break;
      case 'STRLEN': response = cmdStrlen(args); break;
      case 'INCR': response = cmdIncr(args); break;
      case 'DECR': response = cmdDecr(args); break;
      case 'INCRBY': response = cmdIncrby(['INCRBY', ...args]); break;
      case 'DECRBY': response = cmdDecrby(['DECRBY', ...args]); break;
      case 'GETSET': response = cmdGetset(args); break;
      case 'MSET': response = cmdMset(args); break;
      case 'MGET': response = cmdMget(args); break;
      case 'SETEX': response = cmdSetex(args); break;
      case 'SETNX': response = cmdSetnx(args); break;
      case 'PSETEX': response = cmdPsetex(args); break;

      // Hashes
      case 'HSET': response = cmdHset(args); break;
      case 'HGET': response = cmdHget(args); break;
      case 'HMSET': response = cmdHmset(args); break;
      case 'HMGET': response = cmdHmget(args); break;
      case 'HGETALL': response = cmdHgetall(args); break;
      case 'HDEL': response = cmdHdel(args); break;
      case 'HEXISTS': response = cmdHexists(args); break;
      case 'HKEYS': response = cmdHkeys(args); break;
      case 'HVALS': response = cmdHvals(args); break;
      case 'HLEN': response = cmdHlen(args); break;
      case 'HINCRBY': response = cmdHincrby(args); break;

      // Lists
      case 'LPUSH': response = cmdLpush(args); break;
      case 'RPUSH': response = cmdRpush(args); break;
      case 'LPOP': response = cmdLpop(args); break;
      case 'RPOP': response = cmdRpop(args); break;
      case 'LRANGE': response = cmdLrange(args); break;
      case 'LLEN': response = cmdLlen(args); break;
      case 'LINDEX': response = cmdLindex(args); break;
      case 'LSET': response = cmdLset(args); break;
      case 'LINSERT': response = cmdLinsert(args); break;
      case 'LREM': response = cmdLrem(args); break;
      case 'LTRIM': response = cmdLtrim(args); break;

      // Sets
      case 'SADD': response = cmdSadd(args); break;
      case 'SMEMBERS': response = cmdSmembers(args); break;
      case 'SISMEMBER': response = cmdSismember(args); break;
      case 'SREM': response = cmdSrem(args); break;
      case 'SCARD': response = cmdScard(args); break;
      case 'SMOVE': response = cmdSmove(args); break;
      case 'SPOP': response = cmdSpop(args); break;
      case 'SRANDMEMBER': response = cmdSrandmember(args); break;
      case 'SINTER': response = cmdSinter(args); break;
      case 'SUNION': response = cmdSunion(args); break;
      case 'SDIFF': response = cmdSdiff(args); break;

      // Sorted Sets
      case 'ZADD': response = cmdZadd(args); break;
      case 'ZRANGE': response = cmdZrange(args); break;
      case 'ZREVRANGE': response = cmdZrevrange(args); break;
      case 'ZRANK': response = cmdZrank(args); break;
      case 'ZREVRANK': response = cmdZrevrank(args); break;
      case 'ZSCORE': response = cmdZscore(args); break;
      case 'ZREM': response = cmdZrem(args); break;
      case 'ZCARD': response = cmdZcard(args); break;
      case 'ZINCRBY': response = cmdZincrby(args); break;
      case 'ZRANGEBYSCORE': response = cmdZrangebyscore(args); break;
      case 'ZCOUNT': response = cmdZcount(args); break;

      // Pub/Sub
      case 'SUBSCRIBE': response = cmdSubscribe(args); break;
      case 'PUBLISH': response = cmdPublish(args); break;
      case 'UNSUBSCRIBE': response = cmdUnsubscribe(args); break;
      case 'PSUBSCRIBE': response = cmdPsubscribe(args); break;

      default:
        response = formatError(`unknown command '${command}'`);
        isError = true;
    }
  } catch (err) {
    response = formatError(err instanceof Error ? err.message : 'unknown error');
    isError = true;
  }

  if (response.startsWith('-')) isError = true;

  return { response, isError };
}

const parseCommand = (input: string): string[] => {
  const tokens: string[] = [];
  let current = '';
  let inQuote = false;
  let quoteChar = '';
  let hasToken = false;

  const pushToken = () => {
    if (hasToken) {
      tokens.push(current);
      current = '';
      hasToken = false;
    }
  };

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (inQuote) {
      if (ch === quoteChar) {
        inQuote = false;
      } else {
        current += ch;
      }
    } else if (ch === '"' || ch === '\'') {
      inQuote = true;
      quoteChar = ch;
      hasToken = true;
    } else if (ch === ' ' || ch === '\t') {
      pushToken();
    } else {
      current += ch;
      hasToken = true;
    }
  }
  pushToken();
  return tokens;
};

export function resetRedis(): void {
  loadSampleData();
}

export function getStats(): RedisStats {
  const byType: Record<string, number> = { string: 0, hash: 0, list: 0, set: 0, zset: 0 };
  let total = 0;
  for (const [key, val] of store) {
    if (!isExpired(key)) {
      byType[val.type]++;
      total++;
    }
  }
  return { totalKeys: total, expired: expiredCount, byType, currentDb };
}

// Initialize with sample data
loadSampleData();
