# Index & Optimization — Table of Contents Keeps 100k Rows Fast

> **Kategori:** MySQL | **Level:** Beginner | **Minggu 4:** Index & Optimasi

## Learning Objectives

- `CREATE INDEX idx_email ON customers(email)` table of contents — `WHERE email = '...'` jumps instead of full-scanning (source: MySQL 8.0 docs)
- `EXPLAIN SELECT ...` shows the plan: `type: ALL` (reads all) vs `ref/range` (uses index)
- When to index: columns often in `WHERE/JOIN/ORDER BY`; not every column (each `INSERT` slows)

---

## Why This Matters (Non-IT)

A 10-row warehouse feels nothing. 100 thousand customers, email lookup without index = reading 100k boxes one by one. With index = open the alphabetical contents straight to the rack. Without `EXPLAIN`, you never know whether your query full-scans or jumps.

---

## Program: Shop Index

```sql
-- See the plan BEFORE index (type: ALL = reads all, slow)
EXPLAIN SELECT * FROM customers WHERE email = 'siti@email.com';

-- Build the contents
CREATE INDEX idx_email ON customers(email);
CREATE INDEX idx_category ON products(category);

-- Look again → type: ref (uses index, fast)
EXPLAIN SELECT * FROM customers WHERE email = 'siti@email.com';

-- Index for fast JOINs (FK column)
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- See existing indexes
SHOW INDEX FROM customers;

-- Drop when unneeded (each INSERT must update contents)
DROP INDEX idx_category ON products;
```

---

## Key Concepts

### Index = Phone-Book Contents
No index: read every page. With `email` index: find "Siti" → S → page 200.

### `EXPLAIN` = Work Plan
`EXPLAIN SELECT ...` shows `type`: `ALL` (reads all, beware), `ref`/`range` (uses index, good), `key` (index used).

### When to Index vs Not
- Frequent `WHERE email`, `JOIN customer_id`, `ORDER BY price` → index.
- Rarely-filtered `city` column → skip (saves `INSERT` time).

---

## Beginner Friendly Explanation

### Analogy: Phone Book vs Paper Stack
- **No index = paper stack**: find "Siti" reading 1 by 1.
- **With index = alphabetical phone book**: straight to S.

### Step 0 — Prepare Device
- Same as W1. `EXPLAIN` runs on `db-fiddle` and locally with no extra install.

### How the Computer Reads It
1. `CREATE INDEX idx_email ON customers(email)` → MySQL builds a B-Tree structure (alphabetical contents) beside the table.
2. `SELECT ... WHERE email = '...'` → MySQL checks: index? Yes → jump (`ref`), no → read all (`ALL`).

### 3 Must-Know Terms
1. **Index**: contents
2. **EXPLAIN**: query work plan
3. **ALL vs ref**: read-all vs jump

---

## Experiments

- **Green:** `EXPLAIN` before & after `CREATE INDEX` → `type` flips `ALL` → `ref`?
- **Yellow:** `DROP INDEX idx_email ON customers` → `EXPLAIN` back to `ALL`?
- **Red:** Index rarely-`WHERE`d `stock`, then `INSERT` 100 rows → feels slower? (contents rewritten per insert)

---

## Challenge

**Fast Library:** `CREATE INDEX idx_title ON books(title)` → `EXPLAIN SELECT * FROM books WHERE title LIKE 'Java%'` → what `type`? Add `idx_email` on `members` → compare `rows` before/after.

---

## Mini Glossary

- **Index**: contents (B-Tree)
- **EXPLAIN/SHOW INDEX**: plan/list indexes
- **ALL/ref**: read-all/jump

---

## Summary

Week 4 of 5: **Index** (Level: Beginner). Big warehouses stay fast. Next: **Stored Procedure** — recipes in the warehouse.
