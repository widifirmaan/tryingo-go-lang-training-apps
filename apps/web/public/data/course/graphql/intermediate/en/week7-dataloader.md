# DataLoader & N+1 — GraphQL Cart-at-Once

> **Kategori:** GraphQL | **Level:** Intermediate | **Minggu 7:** DataLoader & N+1 Problem

## Learning Objectives

- N+1: 100 products → 1 list query + 100 category queries = 101x (slow!) (source: github.com/graphql/dataloader)
- `new DataLoader(keys => batchFn(keys))` gathers 1 tick → 1 `WHERE id IN (...)` query

---

## Why This Matters (Non-IT)

100-product list + per-row category = 101 DB queries (10 seconds). With DataLoader, 2 queries (0.1s) — 100x fast. Without it, GraphQL is slow in production.

---

## Program: Shop Cart

```javascript
const DataLoader = require("dataloader");

// Without DataLoader (N+1): 1 + 100 queries!
// Product: { category: p => db.category(p.categoryId) } ← 100x!

// With DataLoader: 1 + 1 queries
const categoryLoader = new DataLoader(async (ids) => {
  const rows = await db.categoriesByIds(ids); // 1 query IN (...)
  return ids.map(id => rows.find(r => r.id === id)); // order matches ids!
});

const resolvers = {
  Product: {
    category: (parent) => categoryLoader.load(parent.categoryId),
  },
};
```

---

## Key Concepts

### N+1 = 1 + N Queries
List (1) + each row (N). DataLoader gathers → 1 batch.

### `load()` + Batch = Cart
`load(id)` boards the cart, cart runs 1x per tick with all riders.

---

## Beginner Friendly Explanation

### Analogy: Motorbikes vs Bus
- **No DataLoader = 100 motorbikes** (expensive).
- **DataLoader = 1 bus**: gathers riders 1 tick, runs once.

### Step 0 — Prepare Device
- Apollo Server from W5 + `npm install dataloader`, log query counts.

### How the Computer Reads It
1. 100 `load(id)` calls in 1 tick → 1 batch function call.
2. Batch must return results in `ids` order!

### 3 Must-Know Terms
1. **N+1/batch/load**: 101x/cart/board

---

## Experiments

- **Green:** Log each category query → 100 lines? With DataLoader → 1?
- **Yellow:** `load` same id 2x → cached (1x)?
- **Red:** Batch returning random order → data swapped? (Must match ids order!)

---

## Challenge

**Fast Shop:** `Product.category` via DataLoader + log proving query count: 101 → 2. Screenshot.

---

## Mini Glossary

- **DataLoader/N+1**: cart/101x

---

## Summary

Week 7 of 10: **Cart-at-Once** (Level: Intermediate). 100x fast. Next: **Subscriptions**.
