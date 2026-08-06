# Performance & Tuning

> **Kategori:** MySQL | **Level:** Intermediate | **Minggu 7:** Performance & Tuning

## Learning Objectives

- EXPLAIN ANALYZE
- Slow query log
- InnoDB buffer pool
- Status monitoring
- OPTIMIZE TABLE

---

## Program: MySQL Optimization

```sql
EXPLAIN ANALYZE
    SELECT p.nama, SUM(dp.jumlah * dp.harga_satuan) AS total
    FROM detail_pesanan dp
    JOIN pesanan ps ON ps.id = dp.pesanan_id
    JOIN pelanggan p ON p.id = ps.pelanggan_id
    WHERE ps.tanggal > DATE_SUB(NOW(), INTERVAL 30 DAY)
    GROUP BY p.nama ORDER BY total DESC;

-- Query cache & optimizer
SELECT @@query_cache_type;
SELECT @@innodb_buffer_pool_size;

-- Slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;

-- Cek status
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Slow_queries';
SHOW STATUS LIKE 'Innodb_buffer_pool_read%';

-- Cek proses aktif
SHOW PROCESSLIST;

-- Optimize table
OPTIMIZE TABLE produk;

-- Analisis tabel
ANALYZE TABLE produk;

-- Konfigurasi penting
-- innodb_buffer_pool_size = 70% RAM
-- innodb_log_file_size = 1GB
-- max_connections = 200
-- query_cache_size = 64M
-- tmp_table_size = 256M
```

---

## Key Concepts

### EXPLAIN ANALYZE
Shows execution plan and time.

### Slow Query Log
Log slow queries for analysis.

### InnoDB Buffer Pool
Cache data and indexes in memory.

### Monitoring
SHOW STATUS for server metrics.

### OPTIMIZE
Defragment InnoDB tables.

---

## Experiments

- Buffer pool tuning
- Query cache
- Partitioning
- Connection pooling

---

## Challenge

Optimize: identify slow queries, tune config.

---

## Summary

Week 7 of 10: **Performance & Tuning** (Intermediate).
