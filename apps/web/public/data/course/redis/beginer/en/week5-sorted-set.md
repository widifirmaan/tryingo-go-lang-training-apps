# Sorted Set — Redis Shop Leaderboard

> **Kategori:** Redis | **Level:** Beginner | **Minggu 5:** Sorted Set
> **Prerequisites:** Week 4 — **Set**.

## Learning Objectives

- `ZADD best 100 "rice"` score board, `ZRANGE` ascending, `ZREVRANGE` descending (champion first), `ZINCRBY` adds score (source: redis.io/docs/data-types/sorted-sets)
- `ZRANGEBYSCORE` score filter, `ZCOUNT` counts

---

## Why This Matters (Non-IT)

"Top 5 best-sellers" without sorted sets = fetch all + JS `sort` on every open (slow). With `ZREVRANGE best 0 4`, Redis stores pre-sorted → 1 command.

---

## Program: Best-Seller Board

```bash
ZADD best 100 "rice" 250 "oil" 180 "eggs"
ZRANGE best 0 -1 WITHSCORES
ZREVRANGE best 0 2 WITHSCORES
ZINCRBY best 100 "rice"
ZREVRANGE best 0 2 WITHSCORES
ZRANGEBYSCORE best 100 200
ZCOUNT best 100 200
ZREM best "eggs"
```

---

## Key Concepts

### Sorted Set = Leaderboard
`ZADD board score member` — unique members, sorted scores. `ZINCRBY` atomic score add.

### `ZRANGE` vs `ZREVRANGE` = Up vs Down
`ZRANGE 0 2` bottom 3, `ZREVRANGE 0 2` top 3 (champions).

---

## Beginner Friendly Explanation

### Analogy: League Table
- **Member = team**, **score = points**, `ZREVRANGE 0 2` = top 3.

### Step 0 — Prepare Device
- Same as W1.

### How the Computer Reads It
1. `ZADD best 100 "rice"` → stores + inserts sorted.
2. `ZREVRANGE best 0 2` → takes 3 highest scores.

### 3 Must-Know Terms
1. **ZADD/ZRANGE**: board/view
2. **ZINCRBY**: add score

---

## Experiments

- **Green:** `ZREVRANGE best 0 0` → champion #1?
- **Yellow:** `ZINCRBY best 200 "rice"` → champion changes?
- **Red:** `ZADD best 100 "rice"` again (same score) → still 1 member (update, not duplicate)?

---

## Challenge

**Shop Ranking:** `ZADD` 5 products → `ZREVRANGE 0 2` top 3 → `ZINCRBY` sell 30 → new top 3 → `ZRANGEBYSCORE 100 200`. **Beginner Redis DONE!**

---

## Mini Glossary

- **Sorted Set/ZADD/ZREVRANGE**: board/add/champions
- **ZINCRBY/ZCOUNT**: score/count

---

## Summary

Week 5 of 5: **Leaderboard** (Level: Beginner). **Beginner Redis DONE!** Next: **Expiry & Pub/Sub** (Intermediate).
