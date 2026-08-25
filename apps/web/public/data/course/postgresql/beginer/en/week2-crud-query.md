# CRUD & Query — Fill, View, Update, Delete

> **Kategori:** PostgreSQL | **Level:** Beginner | **Minggu 2:** CRUD & Query

## Learning Objectives

- **C**reate `INSERT`, **R**ead `SELECT`, **U**pdate `UPDATE`, **D**elete `DELETE` — 4 warehouse moves
- `WHERE` filter, `ORDER BY` sort, `LIMIT` cap
- `LIKE '%ber%'` similar, `BETWEEN` range
- `IS NULL` check empty

---

## Why This Matters (Non-IT)

Warehouse without CRUD = display only. Cashier needs **change price** (UPDATE), **remove expired** (DELETE), **search rice** (LIKE).

---

## Program: Shop CRUD

```sql
SELECT * FROM products;
SELECT name, price FROM products WHERE stock > 5 ORDER BY price DESC LIMIT 2;
SELECT * FROM products WHERE name LIKE '%ber%';
SELECT * FROM products WHERE price BETWEEN 10000 AND 50000;
UPDATE products SET price = 6000 WHERE name = 'Spinach';
SELECT * FROM products WHERE name = 'Spinach';
DELETE FROM products WHERE stock = 0;
ALTER TABLE products ADD COLUMN discount INTEGER DEFAULT 0;
UPDATE products SET discount = 10 WHERE category = 'Vegetable';
SELECT name, price, discount FROM products;
```

**Golden rule:** `UPDATE`/`DELETE` without `WHERE` = change/delete **all**! Always `SELECT` first.

---

## Key Concepts

### CRUD
- `INSERT` add, `SELECT` read, `UPDATE` change, `DELETE` remove

### `WHERE` + `LIKE` + `BETWEEN`
`WHERE price > 10000`, `WHERE name LIKE 'B%'`, `WHERE price BETWEEN 10000 AND 50000`

### `ORDER BY` + `LIMIT`
`ORDER BY price DESC` expensive first, `LIMIT 5` top 5.

---

## Beginner Friendly Explanation

### Analogy: Warehouse

- **SELECT = take box to see**, **UPDATE = change price label**, **DELETE = throw box**.
- **`WHERE` = filter**: "only Vegetable".
- **No `WHERE` = sweep all**: `DELETE FROM products` → empty!

---

## Experiments

- **Green:** `SELECT * FROM products WHERE category='Vegetable' ORDER BY price`
- **Yellow:** `UPDATE products SET stock=99 WHERE id=1` → check?
- **Red:** Try `DELETE FROM products` without WHERE on test → all gone, `SELECT` empty.

---

## Challenge

**Books:** `UPDATE books SET stock = stock -1 WHERE id=1` (borrow), `DELETE FROM members WHERE city IS NULL`, `SELECT * FROM books WHERE title LIKE '%Java%' LIMIT 3`.

---

## Mini Glossary

- **CRUD**: 4 moves
- **WHERE/LIKE/BETWEEN**: filter
- **ORDER/LIMIT**: sort/cap

---

## Summary

Week 2: **CRUD** — can fill, view, change, delete safely. Next: **JOIN** — join 2 shelves.
