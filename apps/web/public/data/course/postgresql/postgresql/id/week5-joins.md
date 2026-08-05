# JOINs & Relationships

> PostgreSQL | Modul 5

## Tujuan Pembelajaran

- Memahami INNER JOIN, LEFT JOIN, RIGHT JOIN
- Menggunakan JOIN untuk multi-table queries
- Memahami self-join
- Menggunakan alias untuk kejelasan

---

## Program: Multi-table Queries

```sql
SELECT o.id, u.name, o.total
FROM orders o
INNER JOIN users u ON o.user_id = u.id
LEFT JOIN payments p ON o.id = p.order_id
WHERE o.status = 'completed';
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

Modul 5 dari 16: **JOINs & Relationships**. PostgreSQL adalah RDBMS open-source yang kuat dengan fitur JSON, indexing, dan ekstensi. Minggu depan: **6. Aggregations & Group By**.
