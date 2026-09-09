# Window Functions — Rankings Without GROUP

> **Kategori:** PostgreSQL | **Level:** Intermediate | **Minggu 6:** Window Functions
> **Prerequisites:** Week 5 — **Functions & Triggers**.

## Learning Objectives

- `ROW_NUMBER() OVER (ORDER BY price DESC)`, `RANK()`, `SUM() OVER (PARTITION BY category)` — rank & totals per category without `GROUP BY`

---

## Why This Matters (Non-IT)

A "most expensive product per category" report without windows = complex `GROUP BY` + `JOIN`. Windows = 1 query.

---

## Program: Shop Rankings

```sql
SELECT name, category, price,
  ROW_NUMBER() OVER (ORDER BY price DESC) AS rank,
  RANK() OVER (PARTITION BY category ORDER BY price DESC) AS category_rank,
  SUM(price) OVER (PARTITION BY category) AS category_total
FROM products
ORDER BY price DESC;
```

`PARTITION BY category` = compute per category, `ORDER BY` = sort.

---

## Key Concepts

### `OVER` / `PARTITION BY` = Compute Without Collapsing
`GROUP BY` collapses rows; `OVER` keeps rows + adds computed columns.

---

## Beginner Friendly Explanation

### Analogy: Race Rankings per Class
- **`PARTITION BY category` = separate races per class**, **`ROW_NUMBER` = finish order**.

### Step 0 — Prepare Device
- Supabase / `psql`, `products` table from W1-W5, run query row by row.

### How the Computer Reads It
1. `PARTITION BY category` → splits rows per category.
2. `ROW_NUMBER() OVER (ORDER BY price DESC)` → numbers within each split.

### 3 Must-Know Terms
1. **OVER/PARTITION**: compute/split

---

## Experiments

- **Green:** Remove `PARTITION BY` → global ranking?
- **Yellow:** `RANK()` vs `ROW_NUMBER()` with tied prices → gaps vs no gaps?
- **Red:** `ORDER BY` inside `OVER` missing → arbitrary order? Add it.

---

## Challenge

**Ranking Report:** Top-3 most expensive per category + category total, 1 query, `RANK()` + `SUM() OVER`.
- **Link-up (Week 5 — Functions & Triggers):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **window/partition**: compute/split

---

## Summary

Week 6: **Rankings** — Window Functions. Next: **JSONB**.
