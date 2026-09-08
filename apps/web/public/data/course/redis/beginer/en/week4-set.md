# Set — Unique Redis Tag Bags

> **Kategori:** Redis | **Level:** Beginner | **Minggu 4:** Set

## Learning Objectives

- `SADD tags "veggies" "fresh"` unique bag (duplicates auto-1), `SMEMBERS`, `SISMEMBER`, `SREM` (source: redis.io/docs/data-types/sets)
- `SINTER` intersect, `SUNION` union, `SDIFF` difference — for tags & categories

---

## Why This Matters (Non-IT)

Products tagged `["veggies","fresh","veggies"]` — duplicates double filters. Sets auto-unique. `SINTER` finds "veggie AND promo products" without loops.

---

## Program: Shop Tag Bags

```bash
SADD tags:rice "staples" "basic" "promo"
SADD tags:spinach "veggies" "fresh" "promo"
SADD tags:rice "staples"
SMEMBERS tags:rice
SISMEMBER tags:rice "promo"
SINTER tags:rice tags:spinach
SUNION tags:rice tags:spinach
SDIFF tags:rice tags:spinach
SREM tags:rice "basic"
SRANDMEMBER tags:spinach
```

---

## Key Concepts

### Set = Unordered Unique Bag
`SADD` adds (duplicates ignored), `SMEMBERS` views, `SISMEMBER` checks, `SREM` removes.

### `SINTER/SUNION/SDIFF` = Set Operations
Intersect / union / difference of 2 bags — for tag filters.

---

## Beginner Friendly Explanation

### Analogy: Unique Shopping Bag
- **Set = bag**: insert "veggies" 2x stays 1.
- **SINTER = what's in both bags**.

### Step 0 — Prepare Device
- Same as W1.

### How the Computer Reads It
1. `SADD tags:rice "staples"` → adds when missing.
2. `SINTER a b` → compares, outputs members in both.

### 3 Must-Know Terms
1. **Set/SADD/SMEMBERS**: bag/add/view
2. **SINTER/SUNION**: intersect/union

---

## Experiments

- **Green:** `SADD` "promo" 2x → `SMEMBERS` 1?
- **Yellow:** `SINTER` rice & spinach → "promo"?
- **Red:** `SDIFF` rice spinach → rice-only?

---

## Challenge

**Shop Tags:** 3 products `SADD` own tags → `SINTER` 2 products → `SUNION` all → `SISMEMBER` "promo" check.

---

## Mini Glossary

- **Set/SADD/SMEMBERS**: bag/add/view
- **SINTER/SUNION/SDIFF**: intersect/union/difference

---

## Summary

Week 4 of 5: **Unique Bags** (Level: Beginner). Anti-duplicate tags + intersects. Next: **Sorted Set** — rankings.
