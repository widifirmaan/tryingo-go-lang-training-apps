# Performance & Security

> **Kategori:** Node.js | **Level:** Lanjutan | **Minggu 10:** Performance & Security

## Tujuan Pembelajaran

- Cluster mode untuk multi-core
- Caching: Redis, in-memory cache
- Streaming untuk file besar
- Security: helmet, CORS, rate limiting
- Environment configuration dan secrets management

---

## Program: Optimasi

```javascript
console.log("=== Performance Tips ===");

console.log("\n1. Cluster Mode:");
console.log("  const cluster = require('cluster');");
console.log("  if (cluster.isMaster) { fork workers }");

console.log("\n2. Caching:");
const cache = new Map();
function getCached(key, fetchFn) {
  if (cache.has(key)) { console.log("  Cache hit:", key); return cache.get(key); }
  const val = fetchFn();
  cache.set(key, val);
  console.log("  Cache miss, stored:", key);
  return val;
}
getCached("user:1", () => ({ id: 1, nama: "Budi" }));
getCached("user:1", () => ({ id: 1, nama: "Budi" }));

console.log("\n3. Streaming:");
console.log("  fs.createReadStream('large.txt').pipe(res)");

console.log("\n=== Security Best Practices ===");
const security = [
  "helmet() - set security headers",
  "cors() - configure allowed origins",
  "express-rate-limit - prevent brute force",
  "express-validator - input sanitization",
  "dotenv - store secrets in .env",
];
for (const s of security) console.log("  - " + s);

console.log("\n=== Environment Config ===");
console.log("  NODE_ENV=production");
console.log("  PORT=3000");
console.log("  DATABASE_URL=postgres://...");
console.log("  JWT_SECRET=use-random-256-bit");
```

---

## Konsep Kunci

### Cluster
Node.js single-thread. Cluster untuk gunakan semua core.

### Caching
Cache frequent queries. TTL untuk expiration.

### Streaming
Baca file chunk-by-chunk, tidak load seluruh ke memory.

### Security
Helmet (headers), CORS (origin), Rate Limiter (brute force).

---

## Eksperimen

- Implementasikan Redis cache
- Buat streaming file upload
- Tambah rate limiting middleware
- Setup helmet dan CORS di Express

---

## Tantangan

Optimasi API: tambah caching, streaming download, security headers, rate limiting.

---

## Ringkasan

Minggu 10 dari 12: **Performance & Security** (Level: Lanjutan). Minggu depan: **Deployment & DevOps**.
