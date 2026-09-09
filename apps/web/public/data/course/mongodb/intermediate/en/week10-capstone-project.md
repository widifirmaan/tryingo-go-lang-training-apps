# Capstone: MongoDB E-Commerce — Card-Store Grand Opening

> **Kategori:** MongoDB | **Level:** Intermediate | **Minggu 10:** Capstone: E-Commerce MongoDB
> **Prerequisites:** Week 9 — **Change Streams & Transactions**.

## Learning Objectives

- Combine W1-W9: `CRUD` + `index` + `aggregation` + `schema` + `replica` + `transaction` into a production card store

---

## Why This Matters (Non-IT)

9 separate weeks — capstone proves the combination: fast catalog (index), 1-pipeline reports (`$facet`), correct design (embed/orders), safe (transaction), durable (replica). Your "production-ready MongoDB" portfolio.

---

## Program: Complete Card Store (Checklist)

```javascript
// 1. Correct schema (W5): products embed reviews, orders reference
db.products.insertOne({ name: "Rice", price: 62000, reviews: [{ stars: 5 }] })

// 2. Indexes (W3+W8):
db.products.createIndex({ category: 1, price: -1 })

// 3. 1-pipeline report (W4+W6):
db.products.aggregate([
  { $match: { stock: { $gt: 0 } } },
  { $facet: {
      perCategory: [{ $group: { _id: "$category", total: { $sum: 1 } } }],
      top3: [{ $sort: { price: -1 } }, { $limit: 3 }]
  }}
])

// 4. Safe sell (W9): transaction decrement-stock + add-order

// 5. Replica (W7): rs.status() 1 PRIMARY + 2 SECONDARY
```

**Capstone task:** `mongodump` backup + `explain` 3 IXSCAN queries + `$facet` report screenshot. **MongoDB 0→Expert DONE!** 🎉

---

## Key Concepts

### Capstone = Combine 9 Weeks
CRUD + index + pipeline + design + replica + transaction = production.

---

## Beginner Friendly Explanation

### Analogy: Grand Opening
- **W1-W4 foundation** + **W6-W9 engine** = store. **W10 = open**.

### Step 0 — Prepare Device
- `mongosh` + seeded shop DB + `mongodump` available.

### How the Computer Reads It
1. Checklist top-to-bottom → production card store.
2. `mongodump` → restorable backup.

### 3 Must-Know Terms
1. **Capstone/mongodump**: combine/backup

---

## Experiments

- **Green:** `$facet` report returns both branches?
- **Yellow:** Restore dump into fresh DB → same data?
- **Red:** Sell without transaction → mismatch possible? Wrap it.

---

## Challenge

**Grand Opening:** All checklist + `mongodump` + restore into a new DB + same data. **MongoDB 0→Expert DONE!** 🎉

---
- **Integration checklist:** **Documents & CRUD** (Week 1) + **Update & Delete** (Week 2) + **Index** (Week 3) + **Basic Aggregation** (Week 4) + **Schema Design** (Week 5) + **Advanced Aggregation** (Week 6) + **Replica Set & Sharding** (Week 7) + **Performance & Tuning** (Week 8) + **Change Streams & Transactions** (Week 9) → all parts above run together at the grand opening.
## Mini Glossary

- **Capstone/mongodump**: combine/backup

---

## Summary

Week 10 of 10: **Grand Opening** (Level: Intermediate). **MongoDB 0→Expert from zero DONE!** 🎉
