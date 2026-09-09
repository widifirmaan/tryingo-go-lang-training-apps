# Window Functions — Peringkat Tanpa GROUP

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 6:** Window Functions
> **Prasyarat:** Minggu 5 — **Fungsi & Trigger**.

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

## Tantangan

**Window Functions di Warungmu:** pakai `produk` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `produk`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Fungsi & Trigger** (Minggu 5): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 6: **Peringkat** — Window Functions. Minggu depan: **JSONB Semi-Struktural**.
