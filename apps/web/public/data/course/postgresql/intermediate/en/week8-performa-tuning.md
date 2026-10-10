# Performance & Tuning

> **Kategori:** PostgreSQL | **Level:** Intermediate | **Minggu 8:** Performance & Tuning

## Learning Objectives

- EXPLAIN with BUFFERS
- Materialized View
- VACUUM and ANALYZE
- PostgreSQL config
- pg_stat monitoring

---

## Program: PostgreSQL Optimization

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
    SELECT p.nama, SUM(dp.jumlah * dp.harga_satuan) AS total
    FROM detail_pesanan dp
    JOIN pesanan ps ON ps.id = dp.pesanan_id
    JOIN pelanggan p ON p.id = ps.pelanggan_id
    WHERE ps.tanggal > CURRENT_DATE - INTERVAL '30 days'
    GROUP BY p.nama ORDER BY total DESC;

CREATE MATERIALIZED VIEW mv_penjualan_bulanan AS
SELECT
    DATE_TRUNC('month', ps.tanggal) AS bulan,
    pr.kategori,
    COUNT(*) AS total_transaksi,
    SUM(dp.jumlah) AS total_unit,
    SUM(dp.jumlah * dp.harga_satuan) AS total_revenue
FROM detail_pesanan dp
JOIN pesanan ps ON ps.id = dp.pesanan_id
JOIN produk pr ON pr.id = dp.produk_id
GROUP BY DATE_TRUNC('month', ps.tanggal), pr.kategori;

REFRESH MATERIALIZED VIEW mv_penjualan_bulanan;
SELECT * FROM mv_penjualan_bulanan ORDER BY bulan DESC;

VACUUM ANALYZE produk;

SELECT relname, n_dead_tup, last_vacuum
    FROM pg_stat_user_tables
    WHERE n_dead_tup > 0 ORDER BY n_dead_tup DESC;

SELECT indexrelname, idx_scan AS times_used
    FROM pg_stat_user_indexes ORDER BY idx_scan DESC;

SELECT relname, pg_size_pretty(pg_total_relation_size(relid)) AS total_size
    FROM pg_stat_user_tables ORDER BY pg_total_relation_size(relid) DESC;
```

---

## Key Concepts

### EXPLAIN BUFFERS
Shows I/O, cache hit, query time.

### Materialized View
Store heavy query results.

### VACUUM
Clean dead tuples. ANALYZE updates stats.

### Configuration
shared_buffers 25% RAM.

### Monitoring
pg_stat_user_tables for table activity.

---

## Experiments

- MV with index
- VACUUM FULL vs regular
- Slow query log
- work_mem tuning

---

## Challenge

Optimize: 5 slow queries, add indexes, materialized view.

---

## Summary

Week 8 of 10: **Performance & Tuning** (Intermediate).
