# Subqueries & CTEs

> MySQL | Modul 7

## Tujuan Pembelajaran

- Memahami subqueries
- Menggunakan CTE (Common Table Expressions)
- Menggabungkan subquery dan JOIN
- Membuat query berlapis

---

## Program: Complex Queries

```sql
WITH monthly_sales AS (
    SELECT DATE_FORMAT(created_at, '%Y-%m') as month,
           SUM(total) as revenue
    FROM orders
    GROUP BY DATE_FORMAT(created_at, '%Y-%m')
)
SELECT * FROM monthly_sales
WHERE revenue > 1000000;
```

---

## Penjelasan

MySQL adalah database relasional open-source paling populer di dunia.
MySQL mendukung JSON, indexing lanjutan, stored procedures, dan triggers.
Gunakan mysql client atau MySQL Workbench untuk berinteraksi dengan database.

---

## Eksperimen

- Ubah query di atas dan lihat hasilnya
- Tambah tabel baru dan buat relasi
- Coba gunakan EXPLAIN untuk analisis query

---

## Tantangan

Buat skema database untuk aplikasi sederhana menggunakan konsep minggu ini.
Jalankan query dan verifikasi hasilnya di mysql client atau MySQL Workbench.

---

## Ringkasan

Modul 7 dari 16: **Subqueries & CTEs**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **8. Indexing & Performance**.
