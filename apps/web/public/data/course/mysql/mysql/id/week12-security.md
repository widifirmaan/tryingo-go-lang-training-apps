# Security & Access Control

> MySQL | Modul 12

## Tujuan Pembelajaran

- Membuat user dan role
- Memberikan GRANT dan REVOKE
- Memahami row-level security
- Mengimplementasi schema isolation

---

## Program: Access Control

```sql
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_pass';
GRANT SELECT ON mydb.* TO 'app_user'@'localhost';
REVOKE INSERT, UPDATE, DELETE ON mydb.* FROM 'app_user'@'localhost';
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

Modul 12 dari 16: **Security & Access Control**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **13. Backup & Restore**.
