# MySQL Basics — Shop Warehouse MySQL Version

> **Kategori:** MySQL | **Level:** Beginner | **Minggu 1:** Dasar MySQL & Tabel

## Learning Objectives

- Distinguish MySQL vs PostgreSQL: `AUTO_INCREMENT` vs `SERIAL`, `ENGINE=InnoDB`
- Build `CREATE TABLE products` with `INT AUTO_INCREMENT PRIMARY KEY`
- `INSERT`, `SELECT`, `WHERE`, `COUNT/AVG` — same as PostgreSQL

---

## Why This Matters (Non-IT)

MySQL is the most used by small businesses (WordPress, online shops). Its warehouse mirrors PostgreSQL, only the numbering machine differs: `AUTO_INCREMENT`.

---

## Program: MySQL Warehouse

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO products (name, price, stock, category) VALUES
    ('Rice 5kg', 62000, 10, 'Staples'),
    ('Spinach', 5000, 20, 'Veggies');

SELECT * FROM products;
SELECT name, price FROM products WHERE category = 'Staples';
SELECT COUNT(*) AS total FROM products;
```

**Try without installing:** `db-fiddle.com` pick MySQL 8 or `onecompiler.com/mysql`.

---

## Key Concepts

### `AUTO_INCREMENT` = MySQL Numbering Machine
Unlike PostgreSQL `SERIAL`, MySQL uses `INT AUTO_INCREMENT`. Same result 1,2,3.

### `ENGINE=InnoDB` = ACID-Proof
MySQL has 2 engines: `InnoDB` safe, `MyISAM` fast but unsafe — use `InnoDB`.

---

## Beginner Friendly Explanation

### Analogy: MySQL vs PostgreSQL Warehouse
- Two warehouse brands, same racks, different-colored numbering machines.

### Step 0 — Prepare Device
- `db-fiddle.com` MySQL 8 (no install) or local `mysql -u root -p`.

### How the Computer Reads It
1. `CREATE TABLE ... AUTO_INCREMENT` → MySQL adds an auto-number machine.
2. `INSERT` without `id` → machine stamps 1, 2, 3.

### 3 Must-Know Terms
1. **AUTO_INCREMENT=InnoDB**: numbering/safe-engine

---

## Experiments

- **Green:** Omit `id` in `INSERT` → auto-numbered?
- **Yellow:** `ENGINE=MyISAM` → FK rejected? Switch to `InnoDB`.
- **Red:** Duplicate `PRIMARY KEY` → error? Let auto-number handle it.

---

## Challenge

Build MySQL `customers` with `email VARCHAR(150) UNIQUE`, fill 2 rows, `SELECT AVG(price)`.

---

## Mini Glossary

- **AUTO_INCREMENT/InnoDB**: numbering/safe

---

## Summary

Week 1: **MySQL Warehouse** — like PostgreSQL, different numbering machine. Next: **CRUD**.
