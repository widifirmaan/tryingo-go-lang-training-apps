# CRUD & Advanced Queries

> **Kategori:** PostgreSQL | **Level:** Beginner | **Minggu 2:** CRUD & Advanced Queries

## Learning Objectives

- INSERT with RETURNING
- UPDATE with WHERE
- DELETE with WHERE
- Subqueries
- GROUP BY with HAVING

---

## Program: Complete Data Operations

```sql
-- INSERT dengan RETURNING
INSERT INTO produk (nama, harga, stok, kategori) VALUES
    ('Webcam HD', 650000, 40, 'Aksesoris'),
    ('SSD 512GB', 950000, 35, 'Storage')
RETURNING *;

-- READ dengan kondisi
SELECT nama, harga FROM produk
    WHERE harga BETWEEN 500000 AND 3000000
    ORDER BY harga DESC;

SELECT kategori, COUNT(*) AS jumlah, AVG(harga) AS rata
    FROM produk GROUP BY kategori HAVING COUNT(*) >= 2;

-- UPDATE
UPDATE produk SET harga = harga * 0.9
    WHERE kategori = 'Aksesoris' RETURNING nama, harga;

UPDATE produk SET stok = stok - 5 WHERE nama = 'Laptop ASUS';

-- DELETE
DELETE FROM produk WHERE stok = 0;

-- Subquery
SELECT nama, harga FROM produk
    WHERE harga > (SELECT AVG(harga) FROM produk);

-- LIKE
SELECT * FROM produk WHERE nama LIKE '%Logitech%';
SELECT * FROM pelanggan WHERE kota ILIKE 'jakarta%';
```

---

## Key Concepts

### INSERT & RETURNING
RETURNING * returns newly created rows.

### UPDATE
Expressions in SET clause.

### DELETE
Without WHERE, all rows deleted!

### Subqueries
Query inside parentheses.

### GROUP BY & HAVING
GROUP BY groups, HAVING filters groups.

---

## Experiments

- Multi-row INSERT
- UPDATE with subquery
- ILIKE search
- Multiple GROUP BY

---

## Challenge

Inventory system: update stock, delete expired, category reports.

---

## Summary

Week 2 of 10: **CRUD & Advanced Queries** (Beginner).
