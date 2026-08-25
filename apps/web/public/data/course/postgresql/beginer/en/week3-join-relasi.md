# JOIN & Relations — Join 2 Shelves into 1 Report

> **Kategori:** PostgreSQL | **Level:** Beginner | **Minggu 3:** JOIN & Relasi

## Learning Objectives

- `FOREIGN KEY` — string: `orders.customer_id → customers.id`
- `INNER JOIN` only paired, `LEFT JOIN` all left + pair if exists
- `GROUP BY` + `COUNT/SUM` for report: total per customer

---

## Why This Matters (Non-IT)

Shop has `customers` and `orders` separate. Boss asks "How much did Budi buy total?" — must **join** 2 shelves. Without JOIN, answer manually.

---

## Program: Orders Join Customers

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO orders (customer_id, total) VALUES (1, 75000), (1, 32000), (2, 55000);

SELECT customers.name, orders.total
FROM customers INNER JOIN orders ON customers.id = orders.customer_id;

SELECT customers.name, orders.total
FROM customers LEFT JOIN orders ON customers.id = orders.customer_id;

SELECT customers.name, COUNT(orders.id) AS order_count, SUM(orders.total) AS total_spent
FROM customers LEFT JOIN orders ON customers.id = orders.customer_id
GROUP BY customers.name ORDER BY total_spent DESC;
```

---

## Key Concepts

### Foreign Key = String
`customer_id INTEGER REFERENCES customers(id)` — cannot insert `999` if no customer 999.

### JOIN = Join Shelves
- `INNER JOIN` → only linked
- `LEFT JOIN` → all left, right `NULL` if none

### `GROUP BY` = Group
`GROUP BY customers.name` → count per name.

---

## Beginner Friendly Explanation

### Analogy: Guest Book & Receipts

- **customers = guest book**, **orders = pile receipts** with `customer_id` handwritten.
- **JOIN = stapler**: staple receipt to guest book row with same `id`.

---

## Experiments

- **Green:** `INSERT orders` without `customer_id` → allowed? (allowed NULL if not `NOT NULL`)
- **Yellow:** `LEFT JOIN` customer with no orders → `total` NULL?
- **Red:** `DELETE FROM customers WHERE id=1` with orders → foreign key error.

---

## Challenge

**Library:** `loans(id, book_id FK, member_id FK, date)` → `SELECT members.name, books.title FROM loans JOIN members ON ... JOIN books ON ...` + `GROUP BY members.name` count.

---

## Mini Glossary

- **Foreign Key**: string
- **JOIN**: join
- **GROUP BY**: group

---

## Summary

Week 3: **JOIN** — can join 2 shelves into report. Next: **Index** — fast search.
