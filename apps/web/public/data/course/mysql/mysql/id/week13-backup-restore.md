# Backup & Restore

> MySQL | Modul 13

## Tujuan Pembelajaran

- Melakukan mysqldump untuk backup
- Menggunakan mysql untuk restore
- Memahami point-in-time recovery
- Mengatur automated backup

---

## Program: Data Protection

```sql
-- Backup
mysqldump -u root -p mydb > backup.sql

-- Restore
mysql -u root -p mydb < backup.sql

-- Backup with single transaction
mysqldump -u root -p --single-transaction mydb > backup.sql
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

Modul 13 dari 16: **Backup & Restore**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **14. Partitioning & Scaling**.
