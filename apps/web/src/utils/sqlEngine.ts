// ============================================================================
// sqlEngine.ts — Browser SQL playground engine powered by sql.js (SQLite WASM).
// Lazily loads sql.js from CDN, initializes an in-memory SQLite database,
// pre-loads sample datasets, and provides a clean execute/reset/schema API.
// ============================================================================

interface SqlColumn {
  name: string;
  type: string;
}

interface SqlTableSchema {
  name: string;
  columns: SqlColumn[];
}

export interface SqlResult {
  columns: string[];
  rows: string[][];
  rowCount: number;
  affectedRows?: number;
  error?: string;
  executionTimeMs: number;
  note?: string;
}

interface SqlJsDatabase {
  run: (sql: string, params?: unknown[]) => void;
  exec: (sql: string, params?: unknown[]) => QueryResult[];
  export: () => Uint8Array;
  close: () => void;
}

interface QueryResult {
  columns: string[];
  values: unknown[][];
}

type SqlJsStatic = new (config?: { locateFile?: (file: string) => string }) => SqlJsDatabase;

declare global {
  interface Window {
    initSqlJs?: (config?: { locateFile?: (file: string) => string }) => Promise<SqlJsStatic>;
  }
}

let SQL: SqlJsStatic | null = null;
let db: SqlJsDatabase | null = null;
let initPromise: Promise<void> | null = null;

const SAMPLE_DATA_SQL = `
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary INTEGER NOT NULL,
  hire_date TEXT NOT NULL
);
INSERT INTO employees VALUES (1, 'Budi', 'Engineering', 85000000, '2020-03-15');
INSERT INTO employees VALUES (2, 'Siti', 'Marketing', 72000000, '2021-06-01');
INSERT INTO employees VALUES (3, 'Ahmad', 'Engineering', 95000000, '2019-01-20');
INSERT INTO employees VALUES (4, 'Dewi', 'Sales', 68000000, '2022-09-10');
INSERT INTO employees VALUES (5, 'Eko', 'Engineering', 88000000, '2021-11-05');

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL
);
INSERT INTO products VALUES (1, 'Laptop', 'Electronics', 15000000, 25);
INSERT INTO products VALUES (2, 'Mouse', 'Electronics', 250000, 150);
INSERT INTO products VALUES (3, 'Keyboard', 'Electronics', 750000, 80);
INSERT INTO products VALUES (4, 'Desk Chair', 'Furniture', 3500000, 40);
INSERT INTO products VALUES (5, 'Monitor', 'Electronics', 4500000, 30);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer TEXT NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  order_date TEXT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
INSERT INTO orders VALUES (1, 'Andi', 1, 1, '2024-01-15');
INSERT INTO orders VALUES (2, 'Budi', 2, 2, '2024-01-16');
INSERT INTO orders VALUES (3, 'Citra', 5, 1, '2024-01-17');
INSERT INTO orders VALUES (4, 'Andi', 4, 2, '2024-01-18');
INSERT INTO orders VALUES (5, 'Dewi', 3, 1, '2024-01-19');
`;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    const timer = window.setTimeout(
      () => reject(new Error(`Failed to load script: ${src} (timeout)`)),
      30000
    );
    script.onload = () => {
      clearTimeout(timer);
      resolve();
    };
    script.onerror = () => {
      clearTimeout(timer);
      reject(new Error(`Failed to load script: ${src}`));
    };
    document.head.appendChild(script);
  });
}

async function ensureInit(): Promise<void> {
  if (db) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    if (!window.initSqlJs) {
      await loadScript('https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-wasm.js');
    }

    const sqlJs = window.initSqlJs;
    if (!sqlJs) {
      throw new Error('sql.js failed to initialize: initSqlJs not found on window');
    }

    SQL = await sqlJs({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/${file}`,
    });

    db = new SQL();
    db.run(SAMPLE_DATA_SQL);
  })();

  try {
    await initPromise;
  } catch (err) {
    initPromise = null;
    SQL = null;
    db = null;
    throw err;
  }
}

function valueToString(val: unknown): string {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') {
    return Number.isInteger(val) ? val.toString() : val.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
  }
  return String(val);
}

// Normalize MySQL/PostgreSQL syntax found in course materials into
// SQLite-compatible statements so the browser engine can run them.
export function normalizeDialect(sql: string): string {
  let s = sql.trim();
  if (!s) return s;

  // MySQL: CREATE DATABASE / USE are session-level, not SQLite concepts
  if (/^\s*(CREATE\s+DATABASE|USE\s+)/i.test(s)) {
    return '-- (database selection not supported in SQLite; continuing)';
  }

  // MySQL backticks → SQLite double quotes
  s = s.replace(/`/g, '"');

  // MySQL INT UNSIGNED, BIGINT UNSIGNED etc.
  s = s.replace(/\b(BIG)?INT\s+UNSIGNED\b/gi, 'INTEGER');

  // MySQL AUTO_INCREMENT (column definition)
  s = s.replace(/(\b[A-Z_][A-Z0-9_]*)\s+INT\s+AUTO_INCREMENT\s+PRIMARY\s+KEY\b/gi, '$1 INTEGER PRIMARY KEY AUTOINCREMENT');
  s = s.replace(/\bINT\s+AUTO_INCREMENT\b/gi, 'INTEGER AUTOINCREMENT');
  s = s.replace(/\bINTEGER\s+AUTO_INCREMENT\s+PRIMARY\s+KEY\b/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT');

  // MySQL ENUM(...) / SET(...) → TEXT
  s = s.replace(/\bENUM\s*\([^)]*\)/gi, 'TEXT');
  s = s.replace(/\bSET\s*\([^)]*\)/gi, 'TEXT');

  // MySQL table options (may appear without a leading comma after ')')
  s = s.replace(/,\s*ENGINE\s*=\s*\w+/gi, '');
  s = s.replace(/,\s*(DEFAULT\s+)?CHARSET\s*=\s*\w+/gi, '');
  s = s.replace(/,\s*COLLATE\s*=\s*[\w_]+/gi, '');
  s = s.replace(/\s+ENGINE\s*=\s*\w+/gi, '');
  s = s.replace(/\s+(DEFAULT\s+)?CHARSET\s*=\s*\w+/gi, '');
  s = s.replace(/\s+COLLATE\s*=\s*[\w_]+/gi, '');

  // PostgreSQL SERIAL / BIGSERIAL
  s = s.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\s+SERIAL\s+PRIMARY\s+KEY\b/g, '$1 INTEGER PRIMARY KEY AUTOINCREMENT');
  s = s.replace(/\bSERIAL\b/gi, 'INTEGER');
  s = s.replace(/\bBIGSERIAL\b/gi, 'INTEGER');

  // PostgreSQL ::type casts (bare) & dollar-quoted strings
  s = s.replace(/\$[^$]*\$/g, (m) => m.replace(/'/g, "''"));
  s = s.replace(/::\s*([A-Za-z0-9_]+)/g, '');

  // PostgreSQL boolean literals (SQLite uses 1/0)
  s = s.replace(/\bTRUE\b/gi, '1');
  s = s.replace(/\bFALSE\b/gi, '0');

  return s;
}

export async function initSqlEngine(): Promise<void> {
  await ensureInit();
}

// Serialize DB operations so resetSql (which swaps the shared db instance)
// can never race with an in-flight executeSql/getSchema.
let opChain: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = opChain.then(fn);
  opChain = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

export async function executeSql(sql: string): Promise<SqlResult> {
  return withLock(() => executeSqlLocked(sql));
}

async function executeSqlLocked(sql: string): Promise<SqlResult> {
  const start = performance.now();

  try {
    await ensureInit();
  } catch (err) {
    return {
      columns: [],
      rows: [],
      rowCount: 0,
      error: err instanceof Error ? err.message : 'Failed to initialize SQL engine',
      executionTimeMs: performance.now() - start,
    };
  }

  const trimmed = sql.trim();
  if (!trimmed) {
    return {
      columns: [],
      rows: [],
      rowCount: 0,
      error: 'No SQL statement provided',
      executionTimeMs: performance.now() - start,
    };
  }

  try {
    const normalized = normalizeDialect(trimmed);
    if (normalized.startsWith('--')) {
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        note: normalized,
        executionTimeMs: performance.now() - start,
      };
    }

    const results = db!.exec(normalized);

    if (results.length === 0) {
      const affected = db!.exec('SELECT changes() as c');
      const affectedCount = affected.length > 0 ? Number(affected[0].values[0][0]) : 0;
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        affectedRows: affectedCount,
        executionTimeMs: performance.now() - start,
      };
    }

    const result = results[0];
    const columns = result.columns;
    const rows = result.values.map((row) => row.map(valueToString));

    return {
      columns,
      rows,
      rowCount: rows.length,
      executionTimeMs: performance.now() - start,
    };
  } catch (err) {
    return {
      columns: [],
      rows: [],
      rowCount: 0,
      error: err instanceof Error ? err.message : 'Unknown SQL error',
      executionTimeMs: performance.now() - start,
    };
  }
}

export function resetSql(): Promise<void> {
  return withLock(() => resetSqlLocked());
}

async function resetSqlLocked(): Promise<void> {
  try {
    await ensureInit();

    if (db) {
      db.close();
      db = null;
    }

    if (SQL) {
      db = new SQL();
      db.run(SAMPLE_DATA_SQL);
    } else {
      await ensureInit();
    }
  } catch (err) {
    initPromise = null;
    SQL = null;
    db = null;
    throw err;
  }
}

export function getSchema(): Promise<SqlTableSchema[]> {
  return withLock(() => getSchemaLocked());
}

async function getSchemaLocked(): Promise<SqlTableSchema[]> {
  try {
    await ensureInit();
  } catch {
    return [];
  }

  try {
    const tables = db!.exec(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
    );

    if (tables.length === 0) return [];

    const tableNames = tables[0].values.map((r) => String(r[0]));

    const schema: SqlTableSchema[] = tableNames.map((tableName) => {
      const pragma = db!.exec(`PRAGMA table_info("${tableName}")`);
      const columns: SqlColumn[] =
        pragma.length > 0
          ? pragma[0].values.map((row) => ({
              name: String(row[1]),
              type: String(row[2]),
            }))
          : [];

      return { name: tableName, columns };
    });

    return schema;
  } catch {
    return [];
  }
}

export function isEngineReady(): boolean {
  return db !== null;
}
