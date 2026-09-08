# Advanced Aggregation — 2-Floor MongoDB Factory

> **Kategori:** MongoDB | **Level:** Intermediate | **Minggu 6:** Aggregation Lanjutan

## Learning Objectives

- `$lookup` joins collections + `$unwind` opens arrays + `$facet` 2 reports at once (source: mongodb.com/docs/manual/aggregation)

---

## Why This Matters (Non-IT)

A "total per customer + top products" report without `$facet` = 2 queries + JS-side merge. With 1 `$facet` pipeline, 1 request 2 reports. `$lookup` turns 2 queries into 1.

---

## Program: 2-Floor Shop Factory

```javascript
// 1. $lookup: join orders + customers (like JOIN)
db.orders.aggregate([
  { $lookup: {
      from: "customers",
      localField: "customer_email",
      foreignField: "email",
      as: "person"
  }},
  { $unwind: "$person" },  // open 1-element array into object
  { $project: { _id: 0, name: "$person.name", total: 1 } }
])

// 2. $facet: 2 reports 1 pipeline
db.products.aggregate([
  { $facet: {
      perCategory: [
        { $group: { _id: "$category", total: { $sum: "$price" } } }
      ],
      priciest: [
        { $sort: { price: -1 } },
        { $limit: 3 },
        { $project: { _id: 0, name: 1, price: 1 } }
      ]
  }}
])
```

---

## Key Concepts

### `$lookup` + `$unwind` = Join + Open
`$lookup` attaches an array, `$unwind` opens it into rows (or an object when 1).

### `$facet` = 2 Parallel Factories
1 input → 2 pipelines (`perCategory`, `priciest`) → 1 document 2 results.

---

## Beginner Friendly Explanation

### Analogy: Branching Factory
- **$lookup = stapler between boxes**, **$facet = 2 production lines** from 1 belt.

### Step 0 — Prepare Device
- Same as W1: `mongosh` + `products` + `orders` + `customers`.

### How the Computer Reads It
1. `$lookup` → for each order, finds matching customer → attaches array.
2. `$facet` → runs 2 sub-pipelines on the same input.

### 3 Must-Know Terms
1. **$lookup/$unwind**: join/open
2. **$facet**: report-branch

---

## Experiments

- **Green:** Without `$unwind` → `person` 1-element array? With → object?
- **Yellow:** `$facet` with 1 empty branch → `{}` result?
- **Red:** `$lookup` wrong field (`emial`) → all arrays empty? Fix it.

---

## Challenge

**2-Floor Factory:** `$lookup` + `$unwind` + `$facet` (category totals + top 3) in 1 pipeline, screenshot both results.

---

## Mini Glossary

- **$lookup/$unwind/$facet**: join/open/branch

---

## Summary

Week 6 of 10: **2-Floor Factory** (Level: Intermediate). 1 pipeline, 2 reports. Next: **Replica Set**.
