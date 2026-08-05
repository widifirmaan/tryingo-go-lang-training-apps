# Subqueries & CTEs

> PostgreSQL | Modul 7

## Tujuan Pembelajaran

- Memahami subqueries
- Menggunakan CTE (Common Table Expressions)
- Menggabungkan subquery dan JOIN
- Membuat query berlapis

---

## Program: Complex Queries

```sql
WITH monthly_sales AS (
    SELECT DATE_TRUNC('month', created_at) as month,
           SUM(total) as revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', created_at)
)
SELECT * FROM monthly_sales
WHERE revenue > 1000000;
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

Modul 7 dari 16: **Subqueries & CTEs**. PostgreSQL adalah RDBMS open-source yang kuat dengan fitur JSON, indexing, dan ekstensi. Minggu depan: **8. Indexing & Performance**.
