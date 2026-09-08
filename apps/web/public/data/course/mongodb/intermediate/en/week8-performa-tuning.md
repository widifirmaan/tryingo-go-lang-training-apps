# Performance & Tuning — MongoDB Card Doctor

> **Kategori:** MongoDB | **Level:** Intermediate | **Minggu 8:** Performa & Tuning

## Learning Objectives

- `.explain("executionStats")` reads `COLLSCAN` vs `IXSCAN` + `totalDocsExamined` + `executionTimeMillis` (source: mongodb.com/docs/manual/reference/explain)
- Compound index `{ category: 1, price: -1 }` for filter+sort at once

---

## Why This Matters (Non-IT)

100k cards without index = 2 seconds. With the right compound index = 0.01s. Wrong-order index (`{price:-1, category:1}` for a category-first query) = unused (wasted RAM!).

---

## Program: Slow-Card Autopsy

```javascript
// Slow: reads all
db.products.find({ category: "Staples" }).sort({ price: -1 })
  .explain("executionStats")
// COLLSCAN, totalDocsExamined: 100000, time: 1800ms

// Cure: compound index (order = query order!)
db.products.createIndex({ category: 1, price: -1 })

db.products.find({ category: "Staples" }).sort({ price: -1 })
  .explain("executionStats")
// IXSCAN, totalDocsExamined: 12000, time: 12ms → 150x!

// Check used indexes + drop unneeded
db.products.getIndexes()
db.products.dropIndex("category_1")
```

---

## Key Concepts

### `COLLSCAN` vs `IXSCAN` = Read-All vs Jump
`totalDocsExamined` ≈ results = good. 100k vs 3 results = bad.

### Compound Index Order Matters
Query `category` + `sort price` → index `{ category: 1, price: -1 }` (same order!).

---

## Beginner Friendly Explanation

### Analogy: Doctor + Right Medicine
- **explain = X-ray**, **index = medicine**, **wrong order = wrong medicine for the disease**.

### Step 0 — Prepare Device
- Same as W1: `mongosh` + 5-item collection (or 1000 seeded via script).

### How the Computer Reads It
1. `explain` → planner shows plan (without running).
2. `createIndex` → new B-Tree → plan changes.

### 3 Must-Know Terms
1. **COLLSCAN/IXSCAN**: all/jump
2. **Compound**: ordered-combo

---

## Experiments

- **Green:** `explain` before/after → `executionTimeMillis` drops?
- **Yellow:** Reversed `{price:-1, category:1}` index for the query above → used? (No! Order matters.)
- **Red:** 5 unused indexes → `INSERT` slows? Drop the unneeded.

---

## Challenge

**Card Doctor:** 3 slow queries → `explain` notes → right compound index → `explain` proves 10x+ faster.

---

## Mini Glossary

- **explain/compound**: xray/combo

---

## Summary

Week 8 of 10: **Card Doctor** (Level: Intermediate). Free 150x. Next: **Change Streams**.
