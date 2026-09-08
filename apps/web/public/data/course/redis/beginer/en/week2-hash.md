# Hash — Product Cards in Redis Drawer

> **Kategori:** Redis | **Level:** Beginner | **Minggu 2:** Hash

## Learning Objectives

- `HSET product:1 name "Rice" price 62000` card with many fields, 1 key (source: redis.io/docs/data-types/hashes)
- `HGET`, `HGETALL`, `HINCRBY product:1 stock -1` atomic stock decrement, `HDEL`, `EXISTS`
- When Hash vs String: cards vs 1 value

---

## Why This Matters (Non-IT)

Products have 4 data (name, price, stock, category). With Strings that's 4 keys (`product:1:name`...). With Hash 1 key `product:1` holds 4 fields — neat + `HINCRBY stock -1` safe for 2 simultaneous cashiers (atomic, no fights).

---

## Program: Card in Drawer

Run on `try.redis.io` or `docker run -p 6379:6379 -d redis` + `redis-cli`.

```bash
HSET product:1 name "Rice 5kg" price 62000 stock 10 category "Staples"
HGET product:1 name
HGETALL product:1
HINCRBY product:1 stock -1
HGET product:1 stock
HDEL product:1 category
EXISTS product:1
TTL product:1
DEL product:1
```

---

## Key Concepts

### Hash = Card in Drawer
`HSET product:1 field value ...` — 1 key, many fields. `HGETALL` takes all.

### `HINCRBY` = Safe Decrement/Increment
`HINCRBY product:1 stock -1` atomic — 2 simultaneous cashiers never collide (unlike manual `GET`+`SET`).

### Hash vs String
- String: 1 key 1 value (`SET name "Budi"`).
- Hash: 1 key many fields (product card).

---

## Beginner Friendly Explanation

### Analogy: Card in Desk Drawer
- **String = slip of paper**: 1 info.
- **Hash = name card**: name + price + stock on 1 card.

### Step 0 — Prepare Device
- Same as W1: `try.redis.io` (browser) or `docker` + `redis-cli`.

### How the Computer Reads It
1. `HSET product:1 stock 10` → stores field `stock=10` in hash `product:1` (RAM).
2. `HINCRBY product:1 stock -1` → reads + decrements + writes at once (atomic).

### 3 Must-Know Terms
1. **Hash/HSET/HGET**: card/write/read
2. **HINCRBY**: atomic add
3. **Atomic**: no fights

---

## Experiments

- **Green:** `HGETALL product:1` → 4 fields?
- **Yellow:** `HINCRBY product:1 stock -5` → stock 5?
- **Red:** 2 fast `HINCRBY -1` → exactly -2 (atomic)? Compare manual `GET`+`SET` that can collide.

---

## Challenge

**Complete Card:** `HSET customer:1 name Budi points 100` → `HINCRBY customer:1 points 50` → `HGETALL` → `EXPIRE customer:1 3600` → `TTL`.

---

## Mini Glossary

- **Hash/HSET/HGETALL**: card/write/read-all
- **HINCRBY/EXPIRE**: atomic/expiry

---

## Summary

Week 2 of 5: **Drawer Cards** (Level: Beginner). 1 key, many fields. Next: **List** — queues.
