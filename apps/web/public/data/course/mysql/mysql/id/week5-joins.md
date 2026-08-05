# JOINs & Relationships

> MySQL | Modul 5

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

Modul 5 dari 16: **JOINs & Relationships**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **6. Aggregations & Group By**.
