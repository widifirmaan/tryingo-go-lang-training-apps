# CHECKLIST RISET: BANDING MATERI vs BOOTCAMP GRATIS (27 STACK)

Metode: tiap stack dibandingkan topik-per-topik vs 2+ sumber bootcamp gratis kanonis
(MDN, freeCodeCamp, The Odin Project, docs resmi, CS50). Gap yang terbukti → materi dikembangkan
(PROSA + kode, id+en). Status: ⬜ belum | 🔄 riset | ✅ selesai+commit.

## Fondasi Web

| Stack | Sumber pembanding | Hasil banding | Gap → aksi | Status |
|---|---|---|---|---|
| HTML5 (14) | freeCodeCamp RWD (Cat Photo App, Registration Form); Odin HTML Foundations; MDN HTML | Form controls tak lengkap; srcset 1 baris | W7 expanded: radio/checkbox/fieldset/legend/select/textarea/file/password/date (6870430) | ✅ |
| CSS3 (12) | freeCodeCamp RWD; Odin CSS (Cascade, Box, Block/Inline); MDN CSS | Cascade tipis; display tak eksplisit; pseudo minim; transforms minim | W1/W2/W3/W8 expanded (2c432e5) | ✅ |
| JavaScript (14) | freeCodeCamp JS+Algoritma (21 proyek); Odin JS; MDN JS | Regex/localStorage/class/debugging/methods/Date/recursion gap | Expanded W2/W4/W5/W8/W10/W11, all executed (7798072) | ✅ |
| TypeScript (12) | TS Handbook (Everyday/Narrowing/Modules/Enums); Total TypeScript | Modules, enum, keyof NOL (import cuma numpang di W9) | W2 +keyof, W4 +enum-vs-union, W12 +export/import incl jebakan .js TS2835 (tsc-verified) | ✅ |

## Bahasa

| Stack | Sumber pembanding | Hasil banding | Gap → aksi | Status |
|---|---|---|---|---|
| Python (12) | CS50P (exceptions/regex/testing); freeCodeCamp SciComp (regex/SQLite); docs.python.org/tutorial | try/except NOL; re NOL; SQLite NOL | W2 +re, W7 +try/except+sqlite3 (executed) | ✅ |
| Go (14) | Tour of Go; Effective Go; go.dev/blog; Boot.dev | Mutex/race-detector NOL; panic/recover NOL; embed/mod/test/table/JSON ok | W3 +panic/recover, W8 +Mutex/-race (go vet+run verified) | ✅ |
| Rust (14) | The Rust Book (ch1-21); Rustlings; Rust by Example | Book Ch3 (if/loop/fn) diasumsikan; Ch4.3 slices, Ch8 String, Ch13 closures/iterators, Ch7 modules NOL | W1 +primer, W5 +slices/String/iterators, W14 +mod (rustc-verified) | ✅ |
| C# (15) | Microsoft Learn (types/OOP/LINQ/async); freeCodeCamp Foundational C# (debugging) | Interface never taught (used W9); DateTime/nullable/debugging/Dictionary NOL | W2 +DateTime/nullable, W4 +Dictionary, W8 +null-safety/debugging, W9 +interface primer | ✅ |
| PHP (12) | php.net manual; FCC PHP; Laracasts | namespace/try-catch diajarkan? TIDAK (dipakai doang); $_FILES NOL | W6 +uploads, W8 +try/catch primer, W9 +namespace primer | ✅ |

## Frontend Framework

| Stack | Sumber pembanding | Hasil banding | Gap → aksi | Status |
|---|---|---|---|---|
| React (12) | react.dev Learn; FCC Frontend; Odin React | useRef NOL (hook inti!) | W4 +useRef (esbuild-verified) | ✅ |
| Vue (12) | vuejs.org Guide; test-utils docs | W9: tanpa plugin-vue/jsdom + tombol tak ada (3 bug eksekusi-terbukti, batch riset sblmnya) | ✅ |
| Next.js (12) | nextjs.org Learn (Routing); Auth.js v5 | Route Handlers tak diajarkan (disebut doang) | W9 +route.js GET/POST (node --check) | ✅ |
| Svelte (11) | svelte.dev tutorial + Kit docs | load()/+server.js tak diajarkan (routing doang) | W6 +load/+server (syntax-verified) | ✅ |
| Angular (14) | angular.dev (signals/standalone/deprecation) | signals NOL (inti v16+) | W10 +signals; W1/W2 version notes | ✅ |
| NestJS (12) | docs.nestjs.com (Middleware/Interceptors) | Middleware + Interceptor NOL (bab inti!) | W6 +middleware/pipeline, W8 +interceptor | ✅ |
| Node.js (12) | nodejs.org (streams); Chrome DevTools | streams + --inspect NOL | W3 +streams (executed 5000/3000), W4 +--inspect | ✅ |

## Backend Framework

| Stack | Sumber pembanding | Hasil banding | Gap → aksi | Status |
|---|---|---|---|---|
| Django (12) | docs.djangoproject; MDN Django tutorial; CS50W | {% static %} + sessions NOL (inti MDN!) | W4 +static, W6 +sessions (py-syntax-verified) | ✅ |
| Laravel (12) | laravel.com/docs (Middleware/Mail/Scheduling/Sanctum) | custom middleware, Mail, schedule, Sanctum-wiring NOL | W5 +middleware, W10 +Mail/schedule, W11 +Sanctum lengkap | ✅ |
| CodeIgniter4 (10) | codeigniter.com/user_guide (QB/pagination) | Query Builder + paginate NOL | W4 +QB+paginate | ✅ |
| Rails (12) | Rails guides (Mailer); Odin Rails | Action Mailer NOL (pasangan jobs!) | W10 +mailer (deliver_later) | ✅ |
| Spring (16) | docs.spring.io (transactions) | @Transactional NOL (kritis uang!) | W4 +@Transactional rollback | ✅ |

## Data & DevOps

| Stack | Sumber pembanding | Hasil banding | Gap → aksi | Status |
|---|---|---|---|---|
| MySQL (10) | dev.mysql.com (VIEW/TRIGGER/replication) | VIEW+TRIGGER dipakai capstone tapi tak diajarkan; mysqldump NOL; SLAVE deprecated | W3 +VIEW/subquery, W5 +TRIGGER (schema-consistent), W9 +mysqldump, W8 modernisasi REPLICA | ✅ |
| PostgreSQL (10) | postgresql.org/docs (views/subqueries) | VIEW+subquery NOL | W3 +VIEW/subquery | ✅ |
| MongoDB (10) | mongodb.com/docs (schema-validation) | $jsonSchema validation NOL | W5 +validator | ✅ |
| Redis (10) | redis.io/docs (MULTI/persistence) | MULTI/EXEC + RDB/AOF NOL | W7 +MULTI/EXEC, W10 +persistence | ✅ |
| GraphQL (10) | graphql.org/learn/schema | union/interface NOL (input ok) | W1 +union/interface | ✅ |
| Docker (12) | docs.docker.com (best practices) | HEALTHCHECK + .dockerignore NOL | W4 +keduanya | ✅ |

## Aturan ekspansi (anti-ngide)
1. Setiap tambahan WAJIB bersumber dari docs/bootcamp di atas (cantumkan sumber di commit/report).
2. Contoh kode baru WAJIB lolos eksekusi/typecheck bila toolchain ada (node/python/tsc/go/rustc).
3. Prosa: analogi + langkah + istilah tetap gaya template; tidak mengubah judul kurikulum.
4. id+en selalu berpasangan; rebuild index + build + validator tiap batch.
