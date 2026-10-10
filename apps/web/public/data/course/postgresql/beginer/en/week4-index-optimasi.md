# Indexes & Query Optimization

> **Kategori:** PostgreSQL | **Level:** Beginner | **Minggu 4:** Indexes & Query Optimization

## Learning Objectives

- B-tree index
- EXPLAIN ANALYZE
- Multi-column index
- Partial index
- Index trade-off

---

## Program: Database Performance

```sql
CREATE TABLE transaksi (
    id BIGSERIAL PRIMARY KEY,
    pelanggan_id INTEGER NOT NULL,
    produk_id INTEGER NOT NULL,
    jumlah INTEGER NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    tanggal DATE NOT NULL,
    metode_bayar VARCHAR(20)
);

INSERT INTO transaksi (pelanggan_id, produk_id, jumlah, total, tanggal, metode_bayar)
    SELECT (random()*100+1)::int, (random()*50+1)::int,
        (random()*10+1)::int, (random()*5000000+100000)::decimal(12,2),
        CURRENT_DATE - (random()*365)::int,
        (ARRAY['cash','transfer','ewallet'])[(random()*3)::int+1]
    FROM generate_series(1,1000);

EXPLAIN ANALYZE SELECT * FROM transaksi WHERE pelanggan_id = 42;

CREATE INDEX idx_transaksi_pelanggan ON transaksi(pelanggan_id);

EXPLAIN ANALYZE SELECT * FROM transaksi WHERE pelanggan_id = 42;

CREATE INDEX idx_transaksi_tanggal_bayar ON transaksi(tanggal, metode_bayar);

CREATE INDEX idx_transaksi_besar ON transaksi(total) WHERE total > 1000000;

SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'transaksi';

SELECT COUNT(*) AS total_rows, COUNT(DISTINCT pelanggan_id) AS unique_pelanggan FROM transaksi;
```

---

## Key Concepts

### B-tree Index
Tree structure for fast lookups.

### EXPLAIN ANALYZE
Shows execution plan.

### Multi-Column Index
Column order matters.

### Partial Index
Index with WHERE clause.

### Trade-off
Fast SELECT, slower writes.

---

## Experiments

- Compare query time
- Index on dup column
- GIN index
- Analyze large JOINs

---

## Challenge

10k+ rows table, identify slow queries, add indexes, measure improvement.

---

## Summary

Week 4 of 10: **Indexes & Optimization** (Beginner).
