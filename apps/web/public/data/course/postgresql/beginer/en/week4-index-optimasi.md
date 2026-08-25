# Index & Optimization — Table of Contents for Fast Search

> **Kategori:** PostgreSQL | **Level:** Beginner | **Minggu 4:** Index & Optimasi

## Learning Objectives

- `CREATE INDEX` — table of contents, search `WHERE email = '...'` from 1s → 0.01s
- `EXPLAIN` plan: `Seq Scan` (read all) vs `Index Scan` (jump)
- When to index: often `WHERE/JOIN/ORDER BY`, not rarely used column

---

## Why This Matters (Non-IT)

Warehouse 10 rows no feel. 100k rows, search `email` without index = read all boxes. With index = open table of contents to shelf.

---

## Program: Shop Index

```sql
EXPLAIN SELECT * FROM customers WHERE email = 'siti@email.com';

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_products_category ON products(category);

EXPLAIN SELECT * FROM customers WHERE email = 'siti@email.com';

CREATE INDEX idx_orders_customer ON orders(customer_id);

SELECT indexname FROM pg_indexes WHERE tablename = 'customers';

DROP INDEX idx_products_category;
```

---

## Key Concepts

### Index = Table of Contents
Without: read pages 1-300. With: open TOC → page 42.

### `EXPLAIN` = Plan
`EXPLAIN SELECT ...` shows `Seq Scan` vs `Index Scan` + cost.

### When Index
- Often `WHERE email`, `JOIN customer_id`, `ORDER BY price` → index
- Rare `city` filter → not needed.

---

## Beginner Friendly Explanation

### Analogy: Phone Book

- **No index = read each page**.
- **With index = alphabetical TOC**: find "Siti" → S → page 200.

---

## Experiments

- **Green:** `EXPLAIN` before & after `CREATE INDEX` → cost down?
- **Yellow:** `DROP INDEX` → `EXPLAIN` back to `Seq Scan`?
- **Red:** Index on rarely filtered `stock` → `INSERT` slower.

---

## Challenge

**Library:** `CREATE INDEX idx_books_title ON books(title)` → `EXPLAIN SELECT * FROM books WHERE title LIKE 'Java%'` → Index Scan? Add `idx_members_email`.

---

## Mini Glossary

- **Index**: TOC
- **EXPLAIN**: plan
- **Seq/Index Scan**: read all/jump

---

## Summary

Week 4: **Index** — large warehouse still fast. Beginner DB done! Next: **Functions & Triggers** (Intermediate).
