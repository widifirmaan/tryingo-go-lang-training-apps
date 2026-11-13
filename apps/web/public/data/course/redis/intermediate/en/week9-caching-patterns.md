## Learning Objectives

- Cache-aside pattern
- Write-through pattern
- Cache invalidation
- Cache stampede prevention
- TTL strategies

---

## Program: Cache-Aside, TTL & Anti-Patterns

This program demonstrates the cache-aside pattern end to end: cache miss, writes, TTL, and the stampede pitfall.

```redis
# === CACHE-ASIDE READ flow ===
# 1. Check cache
GET cache:product:1
# 2. Miss -> fetch from the DB... then write to cache:
SET cache:product:1 "Laptop|15000000|25" EX 300
DEL cache:product:1

# === WRITE flow (invalidate on change) ===
SET cache:product:1 "Laptop|15500000|24" EX 300
DEL cache:product:1
# ...new reads repopulate the fresh value

# === TTL watch ===
SET session:abc "uid=42" EX 3600
TTL session:abc

# === ANTI-PATTERN: cache stampede (thundering herd) ===
# Key expires EXACTLY when 1000 requests arrive -> they all hit the DB.
# Fixes: a mutex (SETNX) or early refresh via a background worker:
SET cache:popular:post "rendered-html" EX 590
# Refresh BEFORE expiry from a worker, not on the request path
```

---

## Key Concepts

### Cache-aside vs write-through

Cache-aside: aplikasi mengelola cache sendiri (paling umum, paling fleksibel). Write-through: tiap penulisan DB juga menulis cache (konsisten, biaya tulis tinggi).

### TTL & evict

EX memberi masa hidup kunci; kunci mati otomatis setelah TTL. Pengusiran LRU (maxmemory) berlaku bila memori penuh.

### Stampede & mitigasinya

Kunci panas yang expired bersamaan menggantung DB. Mitigasi: mutex SETNX saat recompute, atau jitter/early refresh agar expiry tidak serempak.

### Invalidation

DEL saat UPDATE/DELETE (cache-aside klasik), atau bump versi nama kunci (cache busting). Sinkronisasi cache & DB adalah bagian terberat sistem terdistribusi.

---

## Experiments

- GET a key you never set - inspect the miss response.
- SET with EX 5 then poll TTL repeatedly until it returns -2 (expired).
- Pair a SET EX 30 with an immediate TTL - watch the numbers.

---

## Challenge

Design a caching protocol (GET/SET/DEL/TTL per order) for one business flow, then analyze its failure modes on deploy or DB failover.

---

## Summary

This week's material has been covered: Cache-Aside, TTL & Anti-Patterns. Continue to the following week to deepen.
