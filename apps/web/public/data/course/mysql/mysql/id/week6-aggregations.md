# Aggregations & Group By

> MySQL | Modul 6

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

Modul 6 dari 16: **Aggregations & Group By**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **7. Subqueries & CTEs**.
