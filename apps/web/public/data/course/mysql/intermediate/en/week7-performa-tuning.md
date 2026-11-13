# Performance & Tuning

## Learning Objectives

- EXPLAIN ANALYZE
- Slow query log
- InnoDB buffer pool
- Status monitoring
- OPTIMIZE TABLE

---

## Program: Analyzing Queries with EXPLAIN

Tuning starts with the execution plan: is an index used, where the full scan happens, then fix it.

```sql
-- Starting query: every January order in Electronics
SELECT o.customer, p.name, p.price
FROM orders o
JOIN products p ON p.id = o.product_id
WHERE p.category = 'Electronics' AND o.order_date LIKE '2024-01%';

-- Execution plan (SQLite mirrors MySQL EXPLAIN)
EXPLAIN QUERY PLAN
SELECT customer FROM orders WHERE order_date LIKE '2024-01%';

-- Fix 1: index on the filtered column
CREATE INDEX idx_orders_date ON orders(order_date);
EXPLAIN QUERY PLAN
SELECT customer FROM orders WHERE order_date LIKE '2024-01%';

-- Anti-pattern: a function on an indexed column forces a full scan
EXPLAIN QUERY PLAN
SELECT customer FROM orders WHERE SUBSTR(order_date, 1, 7) = '2024-01';

-- Dashboard-style aggregation
SELECT department, ROUND(AVG(salary), 0) AS avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;
```

---

## Key Concepts

### Membaca EXPLAIN

SCAN TABLE = membaca seluruh baris (mahal di jutaan data); SEARCH ... USING INDEX berarti index B-tree dipakai. Bandingkan angka estimated rows sebelum dan sesudah.

### Aturan SARGable

Tulis filter dengan kolom "telanjang". SUBSTR(order_date,1,7)=... menghancurkan index; LIKE '2024-01%' tetap baik karena prefix.

### Index punya biaya

Index mempercepat SELECT namun memperlambat INSERT/UPDATE/DELETE dan menambah storage. Beri index hanya pada kolom yang sering dipakai filter/JOIN.

### Ukur, jangan menduga

Gunakan EXPLAIN dan statistik runtime (SHOW PROFILE di MySQL) sebelum berharap optimasi bekerja. Ukur dahulu, baru optimasi.

---

## Experiments

- Create a composite index (product_id, order_date) on orders and re-inspect the JOIN plan.
- Reshape the aggregation: total order value per month, sorted descending.
- Use HAVING to find departments averaging above 80M, then EXPLAIN it.

---

## Challenge

Write your own slow query, EXPLAIN it, add an index that fixes it, and prove it with a new EXPLAIN.

---

## Summary

This week's material has been covered: Analyzing Queries with EXPLAIN. Continue to the following week to deepen.
