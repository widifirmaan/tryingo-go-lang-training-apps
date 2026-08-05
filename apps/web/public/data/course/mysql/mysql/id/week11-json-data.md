# JSON Data Type

> MySQL | Modul 11

## Tujuan Pembelajaran

- Menyimpan data JSON di MySQL
- Menggunakan fungsi JSON_EXTRACT, JSON_SET
- Querying JSON data
- Memahami kapan gunakan JSON vs relational

---

## Program: Flexible Data

```sql
INSERT INTO products (name, metadata)
VALUES ('Laptop', '{"brand": "Dell", "ram": "16GB", "ssd": "512GB"}');

SELECT name, JSON_EXTRACT(metadata, '$.brand') as brand
FROM products
WHERE JSON_EXTRACT(metadata, '$.ram') = '16GB';
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

Modul 11 dari 16: **JSON Data Type**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **12. Security & Access Control**.
