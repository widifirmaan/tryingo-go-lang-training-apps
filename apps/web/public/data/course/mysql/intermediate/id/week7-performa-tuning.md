# Performa & Tuning

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 7:** Performa & Tuning

## Tujuan Pembelajaran

- EXPLAIN ANALYZE
- Slow query log
- InnoDB buffer pool
- Monitoring status
- OPTIMIZE TABLE

---

## Program: Optimasi MySQL

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

## Konsep Kunci

### EXPLAIN ANALYZE
Menunjukkan execution plan dan waktu.

### Slow Query Log
Catat query lambat untuk analisis.

### InnoDB Buffer Pool
Cache data dan index di memory.

### Monitoring
SHOW STATUS untuk metrik server.

### OPTIMIZE
Defragmentasi tabel InnoDB.

---

## Eksperimen

- Tuning buffer pool
- Query cache
- Partitioning
- Connection pooling

---

## Tantangan

Optimasi: identifikasi slow query, tuning config.

---

## Ringkasan

Minggu 7 dari 10: **Performa & Tuning** (Menengah).
