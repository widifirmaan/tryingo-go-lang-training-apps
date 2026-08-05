# Aggregations & Group By

> PostgreSQL | Modul 6

## Tujuan Pembelajaran

- Menggunakan COUNT, SUM, AVG, MIN, MAX
- Memahami GROUP BY
- Menggunakan HAVING untuk filter grup
- Membuat laporan agregasi

---

## Program: Analytics Queries

```sql
SELECT category_id, COUNT(*) as total_products,
       AVG(price) as avg_price,
       SUM(stock) as total_stock
FROM products
GROUP BY category_id
HAVING COUNT(*) > 5
ORDER BY avg_price DESC;
```

---

## Penjelasan

PostgreSQL adalah database relasional open-source yang mendukung SQL standar dan fitur lanjutan.
PostgreSQL mendukung JSON, indexing lanjutan, transaksi ACID, dan ekstensi seperti PostGIS.
Gunakan psql untuk berinteraksi dengan database dari command line.

---

## Eksperimen

- Ubah query di atas dan lihat hasilnya
- Tambah tabel baru dan buat relasi
- Coba gunakan EXPLAIN untuk analisis query

---

## Tantangan

Buat skema database untuk aplikasi sederhana menggunakan konsep minggu ini.
Jalankan query dan verifikasi hasilnya di psql atau pgAdmin.

---

## Ringkasan

Modul 6 dari 16: **Aggregations & Group By**. PostgreSQL adalah RDBMS open-source yang kuat dengan fitur JSON, indexing, dan ekstensi. Minggu depan: **7. Subqueries & CTEs**.
