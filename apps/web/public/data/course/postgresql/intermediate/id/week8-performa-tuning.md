# Performa Tuning — Gudang Tetap Cepat 1 Juta Baris

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 8:** Performa Tuning

## Tujuan Pembelajaran

- `EXPLAIN ANALYZE` waktu nyata, `VACUUM`, `ANALYZE`, `pg_stat_statements` cari query lambat

---

## Program

```sql
EXPLAIN ANALYZE SELECT * FROM produk WHERE kategori = 'Sembako';
-- Seq Scan cost=... time=1.2ms → Index Scan time=0.1ms

VACUUM ANALYZE produk;
SELECT query, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 5;
```

---

## Ringkasan

Minggu 8: **Gudang Cepat** — `EXPLAIN ANALYZE` + `VACUUM`.
