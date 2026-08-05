# JSON & Document Queries

> PostgreSQL | Modul 11

## Tujuan Pembelajaran

- Menyimpan data JSON di PostgreSQL
- Menggunakan operator JSON (->, ->>, #>)
- Querying JSON data
- Memahami kapan gunakan JSON vs relational

---

## Program: Flexible Data

```sql
INSERT INTO products (name, metadata)
VALUES ('Laptop', '{"brand": "Dell", "ram": "16GB", "ssd": "512GB"}');

SELECT name, metadata->>'brand' as brand
FROM products
WHERE metadata->>'ram' = '16GB';
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

Modul 11 dari 16: **JSON & Document Queries**. PostgreSQL adalah RDBMS open-source yang kuat dengan fitur JSON, indexing, dan ekstensi. Minggu depan: **12. Security & Roles**.
