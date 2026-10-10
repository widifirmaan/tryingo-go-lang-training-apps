# Performa & Tuning

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 8:** Performa & Tuning

## Tujuan Pembelajaran

- EXPLAIN dengan BUFFERS
- Materialized View
- VACUUM dan ANALYZE
- Konfigurasi PostgreSQL
- Monitoring pg_stat

---

## Program: Optimasi PostgreSQL

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

## Konsep Kunci

### EXPLAIN BUFFERS
Menunjukkan I/O, cache hit, waktu query.

### Materialized View
Simpan hasil query berat.

### VACUUM
Bersihkan dead tuples. ANALYZE update statistik.

### Konfigurasi
shared_buffers 25% RAM, work_mem untuk sort.

### Monitoring
pg_stat_user_tables untuk aktivitas tabel.

---

## Eksperimen

- MV dengan index
- VACUUM FULL vs biasa
- Slow query log
- work_mem tuning

---

## Tantangan

Optimasi: 5 slow query, tambah index, materialized view.

---

## Ringkasan

Minggu 8 dari 10: **Performa & Tuning** (Menengah).
