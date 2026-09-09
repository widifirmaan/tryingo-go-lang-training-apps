# List — Redis Cashier Queue

> **Kategori:** Redis | **Level:** Beginner | **Minggu 3:** List
> **Prerequisites:** Week 2 — **Hash**.

## Learning Objectives

- `RPUSH queue Budi` enters right, `LPOP queue` exits left (FIFO), `LRANGE queue 0 -1` peeks (source: redis.io/docs/data-types/lists)
- `BLPOP` waits when empty (order queue), `LLEN` length

---

## Why This Matters (Non-IT)

10 online orders arrive together — process 1 by 1 in order (FIFO). List = queue: `RPUSH` (enter), `LPOP` (serve). `BLPOP` cashiers auto-wait when empty, no CPU-wasting `while`.

---

## Program: Order Queue

```bash
RPUSH queue "Budi:rice" "Siti:spinach" "Andi:eggs"
LRANGE queue 0 -1
LLEN queue
LPOP queue
LRANGE queue 0 -1
BLPOP queue 30
```

---

## Key Concepts

### `RPUSH` + `LPOP` = FIFO
Enters right, exits left — like a cashier queue.

### `LRANGE 0 -1` = Peek All
`0` start, `-1` end. `LRANGE queue 0 1` front 2.

### `BLPOP` = Patient Wait
`BLPOP queue 30` waits 30 seconds when empty (for workers).

---

## Beginner Friendly Explanation

### Analogy: Cashier Queue
- **List = line**: `RPUSH` people arrive, `LPOP` served.
- **BLPOP = waiting cashier**: doesn't shout "anyone paying?" every second.

### Step 0 — Prepare Device
- Same as W1: `try.redis.io` / `redis-cli`.

### How the Computer Reads It
1. `RPUSH queue "Budi"` → appends right.
2. `LPOP queue` → takes + removes left.

### 3 Must-Know Terms
1. **LPUSH/RPUSH/LPOP**: left/enter-right/exit-left (FIFO = RPUSH+LPOP)
2. **LRANGE/LLEN**: peek/length
3. **BLPOP**: blocking wait

---

## Experiments

- **Green:** `RPUSH` 3 → `LLEN` 3? `LPOP` → first one exits?
- **Yellow:** `LRANGE queue 0 0` → only front?
- **Red:** `BLPOP empty 5` → waits 5s then `(nil)`? In another terminal `RPUSH` while waiting → instantly gets it?

---

## Challenge

**Shop Queue:** `RPUSH orders ...` 5 orders → `while` `LPOP` + `print` until empty (`LLEN` 0) → `BLPOP` wait demo.

---

## Mini Glossary

- **List/LPUSH/LPOP**: queue/enter/exit
- **BLPOP/LRANGE**: wait/peek

---

## Summary

Week 3 of 5: **Queue** (Level: Beginner). FIFO + patient wait. Next: **Set** — unique bags.
