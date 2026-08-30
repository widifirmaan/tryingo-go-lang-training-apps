# Window Functions — Peringkat Tanpa GROUP

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 6:** Window Functions

## Tujuan Pembelajaran

- `ROW_NUMBER() OVER (ORDER BY harga DESC)`, `RANK()`, `SUM() OVER (PARTITION BY kategori)` — hitung peringkat & total per kategori tanpa `GROUP BY`

---

## Kenapa Ini Penting Buat Kamu?

Laporan "produk termahal per kategori" tanpa window = `GROUP BY` + `JOIN` rumit. Window = 1 query.

---

## Program: Peringkat Warung

```sql
SELECT nama, kategori, harga,
  ROW_NUMBER() OVER (ORDER BY harga DESC) AS peringkat,
  RANK() OVER (PARTITION BY kategori ORDER BY harga DESC) AS rank_kategori,
  SUM(harga) OVER (PARTITION BY kategori) AS total_kategori
FROM produk
ORDER BY harga DESC;
```

`PARTITION BY kategori` = hitung per kategori, `ORDER BY` = urut.

---

## Ringkasan

Minggu 6: **Peringkat** — Window Functions.
