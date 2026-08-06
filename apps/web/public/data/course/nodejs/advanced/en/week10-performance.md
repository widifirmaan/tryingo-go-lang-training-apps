# Performance & Security

> **Kategori:** Node.js | **Level:** Advanced | **Minggu 10:** Performance & Security

## Learning Objectives

- Cluster mode for multi-core
- Caching: Redis, in-memory cache
- Streaming for large files
- Security: helmet, CORS, rate limiting
- Environment configuration and secrets management

---

## Program: Optimization

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

## Key Concepts

### Cluster
Utilize all CPU cores.

### Caching
Cache with TTL.

### Streaming
Memory-efficient file processing.

### Security
Headers, CORS, rate limiting.

---

## Experiments

- Implement Redis cache
- Create streaming file upload
- Add rate limiting middleware
- Setup helmet and CORS in Express

---

## Challenge

Optimize API: add caching, streaming download, security headers, rate limiting.

---

## Summary

Week 10 of 12: **Performance & Security** (Level: Advanced). Next week: **Deployment & DevOps**.
