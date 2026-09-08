# Redis Strings — Fast Drawer

> **Kategori:** Redis | **Level:** Beginner | **Minggu 1:** Tipe Data String

## Learning Objectives

- Redis = **fast drawer on the desk** (RAM), not a warehouse (disk) — 0.1ms reads
- `SET name "Budi"`, `GET name`, `INCR counter`, `EXPIRE key 60` expiry
- `MSET/MGET` many at once

---

## Why This Matters (Non-IT)

Shopping carts, login sessions, price caches — need a drawer opening super fast, not a heavy warehouse.

---

## Program: Fast Drawer

Run on `try.redis.io` or `docker run -p 6379:6379 redis`.

```bash
SET customer:1:name "Budi"
GET customer:1:name
SET counter:visitors 0
INCR counter:visitors # +1
INCRBY counter:visitors 5 # +5
EXPIRE counter:visitors 60 # gone in 60 seconds
TTL counter:visitors

MSET product:1:price 62000 product:1:stock 10
MGET product:1:price product:1:stock

SET stock:rice 10
DECR stock:rice # sell 1 → 9
GET stock:rice
```

---

## Key Concepts

### Drawer vs Warehouse
- **Redis = RAM drawer**: fast, lost on blackout (unless `PERSIST`).
- **Postgres = disk warehouse**: slow, durable.

### `INCR/DECR` = Auto Count
`INCR counter` without manual fetch +1 — safe for many cashiers.

### `EXPIRE` = Expiry
`SET session:123 "data" EX 3600` → deleted in 1 hour.

---

## Beginner Friendly Explanation

### Analogy: Desk Drawer
- **Redis = desk drawer**: grab in 0.1ms. **Postgres = back warehouse**: walk there.

### Step 0 — Prepare Device
- `try.redis.io` in browser (no install) or `docker run` + `redis-cli`.

### How the Computer Reads It
1. `SET customer:1:name "Budi"` → stored in RAM under key.
2. `EXPIRE key 60` → Redis auto-deletes after 60s.

### 3 Must-Know Terms
1. **SET/GET/EXPIRE**: put/take/expire

---

## Experiments

- **Green:** `GET` missing key → `(nil)`?
- **Yellow:** `TTL` after `EXPIRE 60` → counts down?
- **Red:** Restart Redis (no persist) → drawer emptied? That's RAM!

---

## Challenge

**Fast Drawer:** `SET` 3 keys + `INCR` counter 5x + `EXPIRE` 1 key + `MSET/MGET` pair.

---

## Mini Glossary

- **Redis/SET/GET**: drawer/put/take

---

## Summary

Week 1: **Fast Drawer** — strings & counters. Next: **Hash** — cards in drawer.
