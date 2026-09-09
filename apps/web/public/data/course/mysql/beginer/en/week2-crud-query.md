# CRUD & Query — Fill, View, Edit, Delete MySQL Warehouse

> **Kategori:** MySQL | **Level:** Beginner | **Minggu 2:** CRUD & Query
> **Prerequisites:** Week 1 — **MySQL Basics**.

## Learning Objectives

- **C**reate `INSERT` adds boxes, **R**ead `SELECT` views, **U**pdate `UPDATE` relabels, **D**elete `DELETE` discards — 4 warehouse moves (source: MySQL 8.0 docs)
- Filter `WHERE`, sort `ORDER BY ... DESC`, limit `LIMIT 2`, fuzzy-find `LIKE '%ric%'`, range `BETWEEN 10000 AND 50000`
- Golden rule: `UPDATE`/`DELETE` without `WHERE` = hits all rows

---

## Why This Matters (Non-IT)

A warehouse without CRUD = display only. Shop cashiers daily **change prices** (`UPDATE products SET price = 6000 WHERE name = 'Spinach'`), **discard expired goods** (`DELETE WHERE stock = 0`), **find rice** (`LIKE '%ric%'`). Without `WHERE`, 1 click deletes 10,000 rows — no undo.

---

## Program: Shop CRUD

Run on `db-fiddle.com` (MySQL 8) or `mysql -u root -p shop_db`.

```sql
-- R: View all + filter + sort + limit
SELECT * FROM products;
SELECT name, price FROM products WHERE stock > 5 ORDER BY price DESC LIMIT 2;

-- R: Fuzzy find (LIKE, % = anything) + range
SELECT * FROM products WHERE name LIKE '%ric%';
SELECT * FROM products WHERE price BETWEEN 10000 AND 50000;

-- U: Change Spinach price (check with SELECT above first!)
UPDATE products SET price = 6000 WHERE name = 'Spinach';
SELECT * FROM products WHERE name = 'Spinach';

-- D: Delete zero-stock (check first!)
DELETE FROM products WHERE stock = 0;

-- Add a column if forgotten (ALTER)
ALTER TABLE products ADD COLUMN discount INT DEFAULT 0;
UPDATE products SET discount = 10 WHERE category = 'Veggies';
SELECT name, price, discount FROM products;
```

**Golden rule (MySQL docs):** `UPDATE`/`DELETE` without `WHERE` = changes/deletes **everything**. Always `SELECT ... WHERE ...` first to check.

---

## Key Concepts

### CRUD = 4 Warehouse Moves
- `INSERT` adds, `SELECT` reads, `UPDATE` edits, `DELETE` removes.

### `WHERE` + `LIKE` + `BETWEEN` = Strainers
`WHERE price > 10000`, `WHERE name LIKE 'R%'` (`%` = wild), `WHERE price BETWEEN 10000 AND 50000`.

### `ORDER BY` + `LIMIT` = Sort + Cut
`ORDER BY price DESC` expensive first, `LIMIT 5` takes top 5.

---

## Beginner Friendly Explanation

### Analogy: Shop Warehouse
- **SELECT = take a box to view**, **UPDATE = relabel price**, **DELETE = toss box in trash**.
- **WHERE = filter**: "take Veggies-category only".
- **No WHERE = sweep all**: `DELETE FROM products` → warehouse empty instantly!

### Step 0 — Prepare Device
- Same as W1: `db-fiddle.com` pick MySQL 8 (no install) or local `mysql -u root -p` → `USE shop_db;` → `SHOW TABLES;` ensure `products` exists.

### How the Computer Reads It
1. `UPDATE products SET price = 6000 WHERE name = 'Spinach'` → finds `name='Spinach'` rows → changes `price` → reports `Rows matched: 1`.
2. `SELECT * FROM products WHERE price BETWEEN 10000 AND 50000` → checks each row, shows passers.

### 3 Must-Know Terms
1. **CRUD**: add/read/edit/delete
2. **WHERE**: row filter
3. **LIMIT**: cap count

---

## Experiments

- **Green:** `SELECT * FROM products WHERE category='Veggies' ORDER BY price` → what?
- **Yellow:** `UPDATE products SET stock=99 WHERE id=1` → `SELECT` check?
- **Red:** Deliberate `DELETE FROM products WHERE 1=0` (matches nothing) → `0 rows affected`, safe. Never try without `WHERE` on real data!

---

## Challenge

**Safe CRUD Drill:** `INSERT` 2 rows → `SELECT LIKE` find → `UPDATE` 1 price → `SELECT` verify → `DELETE` 1 row → `COUNT(*)` check.

---

## Mini Glossary

- **CRUD**: 4 warehouse moves
- **WHERE/LIKE/BETWEEN**: filter
- **ORDER BY/LIMIT**: sort/cap

---

## Summary

Week 2 of 5: **CRUD** (Level: Beginner). Can fill, view, edit, delete safely. Next: **JOIN** — combine 2 racks.
