# Lua Scripting — Recipes on Redis Server

> **Kategori:** Redis | **Level:** Intermediate | **Minggu 7:** Lua Scripting

## Learning Objectives

- `EVAL "return redis.call('GET', KEYS[1])" 1 stock:rice` runs recipes on the server (atomic!) (source: redis.io/docs/data-types/functions + scripting)

---

## Why This Matters (Non-IT)

Check-stock + decrement-1 = 2 commands (2-cashier race!). With 1 Lua script, check+decrement runs atomically on the server — no racing gap.

---

## Program: Atomic Stock Decrement

```bash
EVAL "local s = tonumber(redis.call('GET', KEYS[1])); if s > 0 then redis.call('DECR', KEYS[1]); return s - 1; else return -1; end" 1 stock:rice
```

```bash
SET stock:rice 10
# Run the script above → 9 (atomic, safe for 10 simultaneous cashiers!)
```

---

## Key Concepts

### `EVAL script count KEY...` = Recipe on Server
Lua scripts run on the server at once (atomic). `KEYS[1]` keys, `ARGV` data.

### Atomic = No Fights
2 cashiers running together → server queues, exact results.

---

## Beginner Friendly Explanation

### Analogy: Recipe in Kitchen (Not Phone)
- **No Lua = 2 phone calls**: "check stock?" ... "decrement 1" (hijacked in between!).
- **Lua = write recipe, kitchen executes at once**.

### Step 0 — Prepare Device
- `try.redis.io` or `redis-cli`, `SET stock:rice 10` first.

### How the Computer Reads It
1. `EVAL` script → server runs whole script without interleaving.
2. Returns remaining stock or -1 (reject).

### 3 Must-Know Terms
1. **EVAL/KEYS**: recipe/keys
2. **Atomic**: at-once-safe

---

## Experiments

- **Green:** Stock 1 + 2 fast script runs → results 0 and -1 (reject)?
- **Yellow:** Compare manual GET+DECR from 2 terminals together → can go negative?
- **Red:** Script with syntax slip → error before running? Fix.

---

### Bonus: MULTI/EXEC — Simple Packages (vs Lua!)

Lua for logic (if). When only "run 3 commands together uninterruptibly", `MULTI/EXEC` is lighter:

```bash
MULTI                  # start package
DECR stock:rice        # queued, not yet run!
HINCRBY sold 1
EXEC                   # RUN all at once (atomic!)
# Reply: 1) (integer) 9  2) (integer) 1
DISCARD                # cancel package (before EXEC)
```
- Distinguish: `MULTI` = blind queue (no if), Lua = smart (has if). WATCH = optimistic lock (cancels when changed — advanced Redis next!).

---

## Challenge

**Atomic Cashier:** Script `buy(key, qty)`: when stock >= qty decrement + return remainder, else return -1. Test 2 terminals together.

---

## Mini Glossary

- **EVAL/Lua**: recipe

---

## Summary

Week 7 of 10: **Atomic Recipes** (Level: Intermediate). No fights. Next: **Cluster**.
