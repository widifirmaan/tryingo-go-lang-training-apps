# JOIN & Relations — Combine 2 MySQL Racks into 1 Report

> **Kategori:** MySQL | **Level:** Beginner | **Minggu 3:** JOIN & Relasi

## Learning Objectives

- `FOREIGN KEY` binding rope: `orders.customer_id → customers.id` (source: MySQL 8.0 docs, `ENGINE=InnoDB` mandatory for FK)
- `INNER JOIN` only matched pairs, `LEFT JOIN` all left + pairs when present
- `GROUP BY` + `COUNT/SUM` for reports: total spent per customer

---

## Why This Matters (Non-IT)

Shops keep separate `customers` and `orders` racks. The boss asks "How much did Budi spend total?" — must **join** 2 racks. Without JOIN, hand-count 100 receipts. `FOREIGN KEY` stops receipts pointing at nonexistent customers (`id 999`).

---

## Program: Orders Joined to Customers

```sql
-- Orders rack roped to customers (InnoDB mandatory for FK!)
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
) ENGINE=InnoDB;

INSERT INTO orders (customer_id, total) VALUES
(1, 75000), (1, 32000), (2, 55000); -- Budi 2x, Siti 1x

-- INNER JOIN — only paired rows
SELECT customers.name, orders.total
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id;

-- LEFT JOIN — all customers, even unordered (NULL)
SELECT customers.name, orders.total
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id;

-- Report: total per customer
SELECT customers.name,
       COUNT(orders.id) AS order_count,
       SUM(orders.total) AS total_spent
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id
GROUP BY customers.name
ORDER BY total_spent DESC;
```

---

## Key Concepts

### Foreign Key = Rope (Needs InnoDB)
`customer_id INT, FOREIGN KEY (customer_id) REFERENCES customers(id)` — MyISAM can't, use `ENGINE=InnoDB`. Can't insert `999` when customer 999 doesn't exist.

### JOIN = Combine Racks
- `INNER JOIN` → only rows connected both sides.
- `LEFT JOIN` → all left, right `NULL` when no pair.

### `GROUP BY` = Group Up
`GROUP BY customers.name` → `COUNT`/`SUM` computed per name.

---

## Beginner Friendly Explanation

### Analogy: Guest Book & Receipt Stack
- **customers = guest book**, **orders = receipt stack** with handwritten `customer_id`.
- **JOIN = stapler**: staples each receipt to the guest-book row with the same `id`.
- **LEFT JOIN = staples every guest-book page**, even pages without receipts (shows `NULL`).

### Step 0 — Prepare Device
- Same as W1: `db-fiddle.com` MySQL 8 or local. Ensure the `customers` table exists from W1 (or quickly create 2 rows).

### How the Computer Reads It
1. `INNER JOIN orders ON customers.id = orders.customer_id` → for each customer, finds same-id orders → merges into 1 row.
2. `GROUP BY customers.name` → gathers rows per name → `SUM(total)` per group.

### 3 Must-Know Terms
1. **Foreign Key**: rope between racks
2. **JOIN**: combine racks
3. **GROUP BY**: group for counting

---

## Experiments

- **Green:** `INSERT INTO orders (customer_id, total) VALUES (999, 10000)` → foreign-key error? (customer 999 missing)
- **Yellow:** `LEFT JOIN` a customer with no orders → `total` shows `NULL`?
- **Red:** `DELETE FROM customers WHERE id = 1` with orders → FK error (can't delete a parent with children).

---

## Challenge

**Library JOIN:** Build `loans(id AUTO_INCREMENT PK, book_id INT, member_id INT, date DATE)` + FKs to `books` & `members` → `SELECT members.name, books.title FROM loans JOIN members ON ... JOIN books ON ...` → `GROUP BY members.name` counts loans per member.

---

## Mini Glossary

- **Foreign Key**: rope (needs InnoDB)
- **INNER/LEFT JOIN**: exact-match / all-left combine
- **GROUP BY**: group + count

---

## Summary

Week 3 of 5: **JOIN** (Level: Beginner). Can combine 2 racks into reports. Next: **Index** — keep 100k rows fast.
