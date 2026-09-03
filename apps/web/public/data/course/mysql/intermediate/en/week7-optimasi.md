# Optimasi — Gudang MySQL Tetap Cepat

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 7:** Optimasi

## Tujuan Pembelajaran

- `EXPLAIN` + `ANALYZE TABLE`, `OPTIMIZE TABLE` — cari lambat

---

## Program

```sql
EXPLAIN SELECT * FROM produk WHERE kategori = 'Sembako';
ANALYZE TABLE produk;
OPTIMIZE TABLE produk;
SHOW INDEX FROM produk;
```

---

## Ringkasan

Minggu 7: **Cepat** — `EXPLAIN` + `ANALYZE`.
