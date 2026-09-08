# Performance & Tuning — MySQL Warehouse Fast at 1M Rows

> **Kategori:** MySQL | **Level:** Intermediate | **Minggu 7:** Performa & Tuning

## Learning Objectives

- `EXPLAIN SELECT ...` reads `type: ALL` (reads all) vs `ref/range` (jumps) + `rows` + `Extra` (source: dev.mysql.com/doc/refman/8.0/en/explain)
- `ANALYZE TABLE` refreshes stats, `OPTIMIZE TABLE` tidies, `SHOW INDEX` checks

---

## Why This Matters (Non-IT)

100k rows without index = 2 seconds per lookup → customers wait. With `EXPLAIN`, you know which query full-scans → add index → 0.01s (200x!). Without tuning, server upgrades (expensive) when indexes are free.

---

## Program: Slow-Query Autopsy

```sql
-- 1. Find slow
EXPLAIN SELECT * FROM products WHERE category = 'Staples';
-- type: ALL, rows: 100000 → DANGER (reads all!)

-- 2. Add index
CREATE INDEX idx_category ON products(category);

-- 3. Check again
EXPLAIN SELECT * FROM products WHERE category = 'Staples';
-- type: ref, key: idx_category, rows: 12000 → GOOD

-- 4. Maintain
ANALYZE TABLE products;   -- refresh planner stats
OPTIMIZE TABLE products;  -- tidy fragmentation
SHOW INDEX FROM products; -- list indexes

-- 5. Trap: SELECT * + LIKE '%x%' (leading %) skips indexes!
EXPLAIN SELECT * FROM products WHERE name LIKE '%ric%'; -- ALL (fair, leading %)
EXPLAIN SELECT * FROM products WHERE name LIKE 'ric%';  -- range (trailing % OK!)
```

---

## Key Concepts

### `EXPLAIN` Key Columns
- `type`: `ALL` (bad) → `index` → `range` → `ref` → `const` (good).
- `key`: index used (NULL = none!).
- `rows`: estimated reads (smaller is better).
- `Extra`: `Using filesort` (manual sort, slow) / `Using index` (index-only, fast!).

### `LIKE '%x'` vs `'x%'`
Leading `%` = can't index. Trailing only = can.

---

## Beginner Friendly Explanation

### Analogy: Query Doctor
- **EXPLAIN = X-ray**: see inside without surgery.
- **Index = medicine**, **ANALYZE = periodic lab checks**.

### Step 0 — Prepare Device
- Same as W1 + a fairly-filled `products` table (loop `INSERT` 1000x via script/CLI).

### How the Computer Reads It
1. `EXPLAIN` → MySQL planner shows the plan (without running).
2. `CREATE INDEX` → new B-Tree → plan changes.

### 3 Must-Know Terms
1. **EXPLAIN/type/rows**: xray/kind/rows
2. **ANALYZE/OPTIMIZE**: refresh/tidy

---

## Experiments

- **Green:** `EXPLAIN` 2 queries (with/without index) → `rows` differ?
- **Yellow:** `LIKE '%ric'` vs `'ric%'` → `type` differs?
- **Red:** Index on often-`UPDATE`d column → `INSERT` slows? (Weigh it!)

---

## Challenge

**Shop Doctor:** 3 slow queries → `EXPLAIN` note `type+rows` → add indexes → `EXPLAIN` again → prove `rows` dropped 10x+. Before/after screenshot.

---

## Mini Glossary

- **EXPLAIN/ANALYZE/OPTIMIZE**: xray/fresh/tidy
- **ALL/ref**: all/jump

---

## Summary

Week 7 of 10: **Query Doctor** (Level: Intermediate). Free 200x speed. Next: **Replication** — warehouse branches.
