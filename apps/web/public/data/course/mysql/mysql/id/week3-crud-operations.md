# CRUD Operations

> MySQL | Modul 3

## Tujuan Pembelajaran

- Melakukan INSERT, SELECT, UPDATE, DELETE
- Memahami WHERE clause
- Menggunakan LIMIT dan OFFSET
- Memahami operator LIKE dan IN

---

## Program: Basic Queries

```sql
-- INSERT
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');

-- SELECT
SELECT * FROM users WHERE active = TRUE;

-- UPDATE
UPDATE users SET email = 'new@example.com' WHERE id = 1;

-- DELETE
DELETE FROM users WHERE id = 1;
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

Modul 3 dari 16: **CRUD Operations**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **4. Filtering & Sorting**.
