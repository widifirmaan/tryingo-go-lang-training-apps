# Indexes & Query Optimization

## Why This Matters

MySQL is the open source relational database behind millions of websites - from WordPress to fintech apps. The SQL you write here is the same language used to interview data at almost every company.

Practice program: *"Database Performance"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- B-tree index in MySQL
- EXPLAIN for query plan
- Multi-column index
- Index cardinality
- Index trade-off

---

## Program: Database Performance

```sql
CREATE TABLE transaksi (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pelanggan_id INT NOT NULL,
    produk_id INT NOT NULL,
    jumlah INT NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    tanggal DATE NOT NULL,
    metode_bayar VARCHAR(20),
    INDEX idx_pelanggan (pelanggan_id),
    INDEX idx_tanggal (tanggal)
);

EXPLAIN SELECT * FROM transaksi WHERE pelanggan_id = 42;

CREATE INDEX idx_tanggal_bayar ON transaksi(tanggal, metode_bayar);

EXPLAIN SELECT * FROM transaksi
    WHERE tanggal BETWEEN '2024-01-01' AND '2024-06-30'
    AND metode_bayar = 'transfer';

SELECT COUNT(*) AS total_rows,
    COUNT(DISTINCT pelanggan_id) AS unique_pelanggan
    FROM transaksi;

SHOW INDEX FROM transaksi;
```

---

## Key Concepts

### B-tree Index
Default MySQL (InnoDB) index.

### EXPLAIN
Shows MySQL execution plan.

### Multi-Column Index
Index on multiple columns. Leftmost prefix rule.

### Cardinality
Unique values in index.

### Trade-off
Fast SELECT, slower writes.

---

## Experiments

- Compare query time
- Covering index
- Index on dup column
- Force index

---

## Challenge

Large table, identify slow queries, add indexes.

---

## Summary

Week 4 of 10: **Indexes & Optimization** (Beginner).
