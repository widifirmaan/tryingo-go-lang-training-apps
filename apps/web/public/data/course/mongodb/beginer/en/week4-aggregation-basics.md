# Basic Aggregation — MongoDB Report Factory

> **Kategori:** MongoDB | **Level:** Beginner | **Minggu 4:** Aggregation Basics
> **Prerequisites:** Week 3 — **Index**.

## Learning Objectives

- `aggregate([{ $match }, { $group }])` report pipeline: filter → group → count (source: mongodb.com/docs/manual/aggregation)
- `$match` filters, `$group: { _id: "$category", total: { $sum: "$price" } }` groups, `$sort` sorts

---

## Why This Matters (Non-IT)

The boss asks "total per category?" — without aggregation, fetch all to JS then hand-loop (slow, RAM-hungry). With 1 `aggregate` pipeline, Mongo computes on-server → sends a finished 3-row result.

---

## Program: 1-Pipeline Shop Report

```javascript
// Total & average per category
db.products.aggregate([
  { $match: { stock: { $gt: 0 } } },              // 1. filter stock > 0
  { $group: {                                     // 2. group per category
      _id: "$category",
      total: { $sum: "$price" },
      avg: { $avg: "$price" },
      count: { $sum: 1 }
  }},
  { $sort: { total: -1 } }                        // 3. biggest total first
])

// Example result:
// { _id: "Staples", total: 124000, avg: 62000, count: 2 }

// Extra stage: show only name+total
db.products.aggregate([
  { $project: { _id: 0, name: 1, total: { $multiply: ["$price", "$stock"] } } },
  { $sort: { total: -1 } },
  { $limit: 3 }
])
```

---

## Key Concepts

### Pipeline `[]` = Factory Conveyor Belt
Documents enter `$match` → exit → enter `$group` → exit → `$sort`. Each stage reshapes.

### `$match` / `$group` / `$sort` / `$project` / `$limit` = Machines
Filter / group-count / sort / pick columns / cut.

### `$fieldName` = Take Value
`"$price"` = that document's price-field value.

---

## Beginner Friendly Explanation

### Analogy: Report Factory
- **Documents = boxes** on a conveyor belt, each machine (`$match`, `$group`) works, finished report exits.

### Step 0 — Prepare Device
- Same as W1: `mongosh` + 5-item `products` collection (W1-W2).

### How the Computer Reads It
1. `$match: { stock: { $gt: 0 } }` → discards zero stock.
2. `$group: { _id: "$category" }` → gathers per category → computes `$sum`.

### 3 Must-Know Terms
1. **Pipeline/stage**: pipe/machine
2. **$match/$group**: filter/group

---

## Experiments

- **Green:** Remove `$match` → zero-stock joins totals? Reattach.
- **Yellow:** `$sort: { total: 1 }` → smallest first?
- **Red:** `$group: { _id: null, all: { $sum: 1 } }` → counts everything in 1 row?

---

## Challenge

**Complete Shop Report:** Pipeline `match stock>0` → `group` per `category` (`total $sum`, `avg $avg`, `count $sum:1`) → `sort total DESC` → add `$limit: 2` top 2. Screenshot.
- **Link-up (Week 3 — Index):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **aggregate/$match/$group**: factory/filter/group
- **$sort/$limit/$project**: sort/cut/pick

---

## Summary

Week 4 of 5: **Report Factory** (Level: Beginner). 1 pipeline replaces 20 JS lines. Next: **Schema Design** — neat cards.
