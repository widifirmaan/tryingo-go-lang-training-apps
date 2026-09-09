# Index — MongoDB Card-Box Contents

> **Kategori:** MongoDB | **Level:** Beginner | **Minggu 3:** Index
> **Prerequisites:** Week 2 — **Update & Delete**.

## Learning Objectives

- `createIndex({ email: 1 })` ascending (`1`) / descending (`-1`) contents, `{ unique: true }` anti-duplicate (source: mongodb.com/docs/manual/indexes)
- `explain("executionStats")` distinguishes `COLLSCAN` (reads all) vs `IXSCAN` (index jump)
- `getIndexes()` / `dropIndex()` manage

---

## Why This Matters (Non-IT)

100k customer cards, email lookup without index = reading 100k cards. With index = jump straight there. Without `explain`, you never know whether your query reads all or jumps.

---

## Program: Shop Contents

```javascript
// in mongosh or Compass
db.customers.createIndex({ email: 1 }, { unique: true })
db.products.createIndex({ category: 1 })
db.products.createIndex({ price: -1 }) // descending for expensive-first

// Compare plans
db.customers.find({ email: "siti@email.com" }).explain("executionStats")
// Look for: "stage": "IXSCAN" (good) vs "COLLSCAN" (reads all)

db.products.getIndexes()
db.products.dropIndex("category_1")
```

---

## Key Concepts

### `createIndex({ field: 1 })` = Contents
`1` ascending, `-1` descending, `unique: true` rejects duplicates (double emails).

### `COLLSCAN` vs `IXSCAN` = Read-All vs Jump
`explain("executionStats")` → `stage` + `totalDocsExamined` (smaller is better).

---

## Beginner Friendly Explanation

### Analogy: Phone Book
- **No index = card stack**: read 1 by 1.
- **With index = alphabetical phone book**: straight to S.

### Step 0 — Prepare Device
- Same as W1: `mongosh` or Compass Atlas Free.

### How the Computer Reads It
1. `createIndex({ email: 1 })` → Mongo builds an alphabetical B-Tree beside the collection.
2. `find({ email: "..." })` → index? Yes → `IXSCAN` jump.

### 3 Must-Know Terms
1. **Index/unique**: contents/anti-duplicate
2. **COLLSCAN/IXSCAN**: read-all/jump

---

## Experiments

- **Green:** `explain` before/after index → `stage` flips?
- **Yellow:** `insertOne` duplicate email → `duplicate key` error?
- **Red:** `dropIndex` → `explain` back to `COLLSCAN`?

---

## Challenge

**Fast Shop:** `createIndex({ name: 1 })` + `unique` on `email` + `explain` 2 queries → screenshot `IXSCAN` 2x.
- **Link-up (Week 2 — Update & Delete):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Index/unique/explain**: contents/anti-duplicate/plan

---

## Summary

Week 3 of 5: **Contents** (Level: Beginner). 100k cards stay fast. Next: **Aggregation** — reports.
