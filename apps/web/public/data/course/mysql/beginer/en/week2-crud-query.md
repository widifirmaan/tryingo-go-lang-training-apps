# CRUD & Advanced Queries

> **Kategori:** MySQL | **Level:** Beginner | **Minggu 2:** CRUD & Advanced Queries

## Why This Matters

MySQL is the open source relational database behind millions of websites - from WordPress to fintech apps. The SQL you write here is the same language used to interview data at almost every company.

Practice program: *"Complete Data Operations"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- INSERT data
- UPDATE with WHERE
- DELETE with WHERE
- Subqueries
- GROUP BY HAVING

---

## Program: Complete Data Operations

```sql
INSERT INTO produk (nama, harga, stok, kategori) VALUES
    ('Webcam HD', 650000, 40, 'Aksesoris'),
    ('SSD 512GB', 950000, 35, 'Storage');

SELECT nama, harga FROM produk
    WHERE harga BETWEEN 500000 AND 3000000
    ORDER BY harga DESC;

SELECT kategori, COUNT(*) AS jumlah, AVG(harga) AS rata
    FROM produk GROUP BY kategori HAVING COUNT(*) >= 2;

UPDATE produk SET harga = harga * 0.9
    WHERE kategori = 'Aksesoris';

UPDATE produk SET stok = stok - 5 WHERE nama = 'Laptop ASUS';

DELETE FROM produk WHERE stok = 0;

SELECT nama, harga FROM produk
    WHERE harga > (SELECT AVG(harga) FROM produk);

SELECT * FROM produk WHERE nama LIKE '%Logitech%';
SELECT * FROM pelanggan WHERE kota LIKE 'Jakarta%';
```

---

## Key Concepts

### INSERT
Add new rows to table.

### UPDATE
Modify data with WHERE.

### DELETE
Remove data with WHERE.

### Subqueries
Query inside query.

### GROUP BY & HAVING
GROUP BY groups, HAVING filters.

---

## Experiments

- INSERT IGNORE
- UPDATE with subquery
- LIKE wildcard
- Multiple GROUP BY

---

## Challenge

Inventory system: update stock, delete expired, category reports.

---

## Summary

Week 2 of 10: **CRUD & Advanced Queries** (Beginner).
