# PostgreSQL Basics — Giant Excel Warehouse

> **Kategori:** PostgreSQL | **Level:** Beginner | **Minggu 1:** Dasar PostgreSQL & Tabel

## Learning Objectives

- Understand DB like **giant Excel** safe (not lost on power off) — PostgreSQL = free warehouse
- Create warehouse `CREATE DATABASE shop_db` and shelf `CREATE TABLE products` with columns
- Understand `SERIAL` auto number, `PRIMARY KEY` ID card, `NOT NULL` required
- Insert `INSERT` and fetch `SELECT *`, filter `WHERE`, count `COUNT/AVG`

---

## Why This Matters (Non-IT)

Shop notes in book lost in flood. Excel lost if laptop dies. **Database = locked warehouse with CCTV (ACID), millions rows**. Today build first warehouse: products and customers shelves.

---

## Program: Build Shop Warehouse

Run in **Supabase SQL Editor** (free, no install) or `psql`.

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    city VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, price, stock, category) VALUES
    ('Rice 5kg', 62000, 10, 'Staple'),
    ('Spinach', 5000, 20, 'Vegetable'),
    ('Eggs 1kg', 28000, 15, 'Protein');

INSERT INTO customers (name, email, city) VALUES
    ('Budi', 'budi@email.com', 'Jakarta'),
    ('Siti', 'siti@email.com', 'Bandung');

SELECT * FROM products;
SELECT name, price FROM products WHERE category = 'Staple';
SELECT COUNT(*) AS total FROM products;
SELECT AVG(price) AS avg_price FROM products;
```

**No install:** `supabase.com` → New Project → `SQL Editor` → paste → `Run`.

---

## Key Concepts

### PostgreSQL = Free & Safe Warehouse
`ACID` = if power off mid-write, not half done. Excel not.

### Shelf = TABLE, Column = Header
`VARCHAR(100)` short text, `INTEGER` whole number, `DECIMAL(10,2)` money, `TIMESTAMP` time.

### `SERIAL` + `PRIMARY KEY` = Number + ID Card
`SERIAL` auto 1,2,3. `PRIMARY KEY` = unique ID card.

### `INSERT` Fill, `SELECT` Fetch
`INSERT INTO products (name,price) VALUES ('Rice',62000)` → `SELECT * FROM products WHERE stock > 5`.

---

## Beginner Friendly Explanation

### Analogy: Shop Warehouse

- **Database = warehouse building**: `shop_db` building.
- **Table = shelf**: `products` shelf 1, `customers` shelf 2.
- **Column = shelf label**: `name`, `price`.
- **Row = box**: 1 box = 1 product.
- **`SERIAL` = numbering machine**: each box in, machine stamps number.

---

## Experiments

- **Green:** `INSERT INTO products (name,price) VALUES ('Sugar',15000)` → `SELECT *`?
- **Yellow:** `SELECT * FROM products WHERE price > 10000` → ?
- **Red:** Try `INSERT` duplicate email `budi@email.com` → `UNIQUE` error?

---

## Challenge

**Library Warehouse:** Make `books(id SERIAL PK, title VARCHAR NOT NULL, stock INT DEFAULT 0)` + `members(id,name,email UNIQUE)` → `INSERT` 3 books, 2 members → `SELECT COUNT(*)` → `AVG(stock)`?

---

## Mini Glossary

- **DATABASE/TABLE**: warehouse/shelf
- **SERIAL/PRIMARY KEY**: number/ID
- **VARCHAR/INTEGER**: text/number
- **SELECT/INSERT**: fetch/fill

---

## Summary

Week 1 of 10: **Warehouse & Shelf** (Level: Beginner). Can make warehouse, shelf, fill, and count. Next: **CRUD** — update & delete.
