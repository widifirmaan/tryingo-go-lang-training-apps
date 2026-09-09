# Caching Patterns — Redis Drawer Strategy

> **Kategori:** Redis | **Level:** Intermediate | **Minggu 9:** Caching Patterns
> **Prerequisites:** Week 8 — **Clustering**.

## Learning Objectives

- Cache-Aside (read drawer first), Write-Through (write drawer+DB), TTL + `EXPIRE`, anti `cache stampede` + `penetration` (source: redis.io/docs/manual/patterns + AWS caching whitepaper)

---

## Why This Matters (Non-IT)

Without patterns, caches go stale (old prices) or the DB collapses when the drawer empties everywhere at once (1000-request stampede). Right patterns = fast + correct.

---

## Program: 3 Shop Patterns

```bash
# 1. Cache-Aside (most common): read drawer → miss → DB → fill drawer
GET product:1
# (miss) → SELECT from DB → SET product:1 ... EX 60

# 2. Mandatory TTL (anti-stale):
SET product:1 "..." EX 60  # 60 seconds, then fresh again

# 3. Stampede guard: build lock
# SET lock:product:1 1 NX EX 10  → only 1 goes to DB, others wait
SET lock:product:1 1 NX EX 10

# 4. Penetration guard: also cache "missing" (short TTL)
SET product:999 "NULL" EX 30
```

---

## Key Concepts

### Cache-Aside / Write-Through / TTL
- Aside: read drawer first (common).
- Through: write drawer + DB together (consistent, slow writes).
- TTL: mandatory expiry (never stale forever).

### Stampede / Penetration = Raids
- Stampede: drawer empties everywhere → 1000 hit DB. Cure: `NX` lock.
- Penetration: asking for missing things repeatedly → DB hammered. Cure: short `"NULL"` cache.

---

## Beginner Friendly Explanation

### Analogy: Cashier Drawer + Rules
- **Aside = check drawer first**, **TTL = expiry label**, **`NX` lock = single build number**.

### Step 0 — Prepare Device
- `try.redis.io` + product key, watch TTL countdown via `TTL`.

### How the Computer Reads It
1. `GET` miss → app queries DB → `SET ... EX 60` → next 60s served from drawer.
2. Stampede: 1000 misses → 1 lock-holder queries DB, rest wait for drawer fill.

### 3 Must-Know Terms
1. **Aside/Through/TTL**: check-first/write-together/expiry
2. **Stampede/penetration**: raid/wild-asking

---

## Experiments

- **Green:** `SET x 1 EX 2` → wait 3 seconds → `GET` gone?
- **Yellow:** `SET k 1 NX` 2x → second `nil` (lock held)?
- **Red:** No TTL + price changes → stale forever? Add TTL.

---

## Challenge

**Correct Drawer:** Cache-Aside + TTL 60 + stampede lock + `"NULL"` penetration guard for `products` + prove max-60s staleness.

---

## Mini Glossary

- **Aside/TTL/NX**: check/expiry/lock

---

## Summary

Week 9 of 10: **Drawer Strategy** (Level: Intermediate). Fast + correct. Next: **Capstone**.
