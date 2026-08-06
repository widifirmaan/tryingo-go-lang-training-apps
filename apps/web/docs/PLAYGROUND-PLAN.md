# Client-Side Playground Plan — Per-Framework Support

## Current State
| Track | Method | Client-side? |
|-------|--------|-------------|
| HTML/CSS/JS/TS | iframe preview | Yes |
| Go | TinyGo + Yaegi WASM | Yes |
| Docker | dockerSim.ts (in-memory) | Yes |
| Python | Cloudflare Worker | No |
| Rust | Rust Playground API | No |
| PHP/Ruby/Java/C# | Cloudflare Worker | No |
| React/Vue/Svelte/Angular | StackBlitz (needs JSON) | Partial |
| Next.js/NestJS/Django/Laravel/Rails | StackBlitz (needs JSON) | Partial |
| Node.js | StackBlitz (needs JSON) | Partial |
| PostgreSQL/MySQL | Nothing | No |
| MongoDB/Redis | Nothing | No |
| GraphQL | Nothing | No |

---

## Tier 1 — Pure Client-Side (No WASM, No Server)

### 1. SQL Playground (PostgreSQL + MySQL)
**Approach:** sql.js (SQLite compiled to WASM) + syntax adapter
- sql.js runs SQLite in WASM — supports 95% of SQL syntax shared by PostgreSQL/MySQL
- Add syntax differences as layer on top (SERIAL→AUTO_INCREMENT, etc.)
- Pre-load sample datasets (employees, products, orders)
- Support: SELECT, INSERT, UPDATE, DELETE, JOINs, GROUP BY, subqueries, window functions, CTEs
- **Implementation:** New `SqlPlayground.tsx` + `sqlEngine.ts` wrapper
- **Effort:** Medium

### 2. Redis Playground
**Approach:** In-memory JS data structure simulation
- Implement Redis commands in JS: SET, GET, HSET, HGET, LPUSH, RPUSH, SADD, ZADD, etc.
- TTL/expiry with setTimeout
- Pub/Sub with EventEmitter
- Sorted Sets with skip list or sorted array
- **Implementation:** New `redisSim.ts` (modeled after dockerSim.ts) + `RedisPlayground.tsx`
- **Effort:** Medium

### 3. MongoDB Playground
**Approach:** In-memory JS document store
- Implement MongoDB query syntax: find, insertOne, updateOne, deleteOne, aggregation pipeline basics
- Use JS objects as documents, arrays as collections
- Support query operators: $gt, $in, $regex, $and, $or
- **Implementation:** New `mongoSim.ts` + `MongoPlayground.tsx`
- **Effort:** Medium

### 4. GraphQL Playground
**Approach:** Client-side schema validation + mock execution
- Parse GraphQL schema with `graphql-js` (already in deps)
- Execute queries against in-memory resolvers
- Validate queries/mutations against schema
- Show introspection results
- **Implementation:** New `GraphqlPlayground.tsx`
- **Effort:** Low-Medium

---

## Tier 2 — WASM-Based (Client-Side, Load WASM Binary)

### 5. Python Playground
**Approach:** Pyodide (Python scientific stack compiled to WASM)
- Full CPython interpreter in browser
- Supports stdlib + numpy/pandas/matplotlib
- Load via CDN: `cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js`
- Capture stdout/stderr
- **Implementation:** Extend `CodePlayground.tsx` with Pyodide runner
- **Effort:** Low (Pyodide handles everything)

### 6. PHP Playground
**Approach:** php-wasm (PHP compiled to WASM)
- `wasmer-php` or `php-wasm` from wasmer.io
- Supports PHP 8.x with most stdlib
- Run via: `cdn.jsdelivr.net/npm/php-wasm@0.0.83/`
- **Implementation:** Extend `CodePlayground.tsx` with PHP WASM runner
- **Effort:** Low

### 7. Ruby Playground
**Approach:** ruby-wasm (Ruby compiled to WASM)
- `ruby-wasm` from ruby.wasm or wasmer
- Supports Ruby 3.x with stdlib
- **Implementation:** Extend `CodePlayground.tsx` with Ruby WASM runner
- **Effort:** Low

### 8. C# Playground
**Approach:** Mono WASM / Blazor
- Mono runs .NET code in browser via WASM
- Or: Use `dotnet.wasm` with simplified execution
- Alternative: Transform C# → output via Roslyn (limited)
- **Implementation:** Extend `CodePlayground.tsx` with Mono WASM
- **Effort:** Medium

### 9. Rust Playground
**Approach:** Client-side execution via rustc WASM (heavy) OR procedural output
- Option A: `rustc` WASM (very large, ~50MB)
- Option B: Pre-compute expected output for each week's examples (lightweight)
- Option C: Use Rust Playground API (server, current approach)
- **Recommendation:** Option B for week examples + Option C fallback
- **Effort:** Low (Option B)

---

## Tier 3 — Browser Bundler (Client-Side, Complex)

### 10. React Playground
**Approach:** esbuild WASM + Babel standalone
- esbuild-wasm bundles JSX/TSX in browser
- Babel standalone for JSX transform
- Render result in iframe
- **Implementation:** New `ReactPlayground.tsx`
- **Effort:** Medium

### 11. Vue Playground
**Approach:** Vue SFC Compiler (browser build)
- `@vue/compiler-sfc` compiles .vue files in browser
- Render via Vue runtime + iframe
- **Implementation:** New `VuePlayground.tsx`
- **Effort:** Medium

### 12. Svelte Playground
**Approach:** Svelte compiler (browser build)
- `svelte/compiler` compiles .svelte files in browser
- Render via Svelte runtime + iframe
- **Implementation:** New `SveltePlayground.tsx`
- **Effort:** Medium

### 13. Angular Playground
**Approach:** Not practical client-side (too heavy)
- Recommend: StackBlitz or server-side rendering
- **Effort:** High (not recommended)

---

## Tier 4 — StackBlitz/WebContainer (Needs Internet)

### 14. Next.js / Node.js / NestJS / Django / Laravel / Rails / Spring Boot
**Approach:** StackBlitz SDK or WebContainer
- StackBlitz: embed full IDE, needs project files (JSON)
- WebContainer: run Node.js in browser via WASM (StackBlitz)
- **Implementation:** Generate project files per week + StackBlitz embed
- **Effort:** Medium-High

---

## Priority Implementation Order

### Phase 1 (Quick Wins — Pure JS, No WASM)
1. **GraphQL Playground** — graphql-js already in deps
2. **Redis Playground** — model after dockerSim.ts
3. **MongoDB Playground** — in-memory document store
4. **SQL Playground** — sql.js WASM

### Phase 2 (WASM-Based)
5. **Python Playground** — Pyodide
6. **PHP Playground** — php-wasm
7. **Ruby Playground** — ruby-wasm
8. **C# Playground** — Mono WASM

### Phase 3 (Browser Bundler)
9. **React Playground** — esbuild WASM
10. **Vue Playground** — Vue SFC compiler
11. **Svelte Playground** — Svelte compiler

### Phase 4 (StackBlitz Integration)
12. **Next.js/Node.js/NestJS** — StackBlitz project files
13. **Django/Laravel/Rails/Spring** — StackBlitz project files

---

## Architecture Decision

### Option A: Extend CodePlayground.tsx
Add new runner modes to existing component:
```tsx
const isSqlLanguage = LANGUAGE_MAP[language] === 'sql';
const isRedisLanguage = LANGUAGE_MAP[language] === 'redis';
// ... etc
```
- **Pro:** Consistent UI, less code
- **Con:** Component grows large

### Option B: Separate Playground Components
Each tier gets its own component:
- `SqlPlayground.tsx`
- `RedisPlayground.tsx`
- `PythonPlayground.tsx`
- `ReactPlayground.tsx`
- **Pro:** Clean separation, maintainable
- **Con:** More files

### Recommendation: Option B
Each playground type is different enough to warrant its own component. CoursePage already has the routing logic — extend it:

```tsx
{content && isSqlLanguage ? (
  <SqlPlayground lang={lang} initialCode={extractCode(content)} />
) : content && isRedisLanguage ? (
  <RedisPlayground lang={lang} />
) : content && isPythonLanguage ? (
  <PythonPlayground lang={lang} initialCode={extractCode(content)} />
) : content && isWebLanguage ? (
  // existing iframe preview
)}
```

---

## LANGUAGE_MAP Updates Needed

Current LANGUAGE_MAP maps tracks to editor languages. Need to add:
- `postgresql: 'sql'`
- `mysql: 'sql'`
- `mongodb: 'javascript'`
- `redis: 'shell'`
- `graphql: 'graphql'`
- `python: 'python'` (already exists)
- `php: 'php'`
- `rails: 'ruby'`
- `csharp: 'csharp'`
- `spring: 'java'`

---

## File Structure

```
src/
  components/
    playgrounds/
      SqlPlayground.tsx        # Phase 1
      MongoPlayground.tsx       # Phase 1
      RedisPlayground.tsx       # Phase 1
      GraphqlPlayground.tsx     # Phase 1
      PythonPlayground.tsx      # Phase 2
      PhpPlayground.tsx         # Phase 2
      RubyPlayground.tsx        # Phase 2
      CsharpPlayground.tsx      # Phase 2
      ReactPlayground.tsx       # Phase 3
      VuePlayground.tsx         # Phase 3
      SveltePlayground.tsx      # Phase 3
  utils/
    sqlEngine.ts               # sql.js wrapper
    mongoSim.ts                # In-memory MongoDB
    redisSim.ts                # In-memory Redis
    graphqlRunner.ts           # Client-side GraphQL
```

---

## Estimated Effort

| Phase | Tracks | Effort | Impact |
|-------|--------|--------|--------|
| 1 | SQL, MongoDB, Redis, GraphQL | ~3 days | High (4 tracks fully client-side) |
| 2 | Python, PHP, Ruby, C# | ~2 days | High (4 tracks via WASM) |
| 3 | React, Vue, Svelte | ~3 days | Medium (3 tracks via bundler) |
| 4 | Next.js, Node.js, NestJS, Django, Laravel, Rails, Spring | ~4 days | Medium (7 tracks via StackBlitz) |
| **Total** | **18 tracks** | **~12 days** | **All tracks have playground** |
