# Backup & Restore

> PostgreSQL | Modul 13

## Tujuan Pembelajaran

- Melakukan pg_dump untuk backup
- Menggunakan pg_restore untuk restore
- Memahami point-in-time recovery
- Mengatur automated backup

---

## Program: Data Protection

```sql
-- Backup
pg_dump -U postgres -d mydb -f backup.sql

-- Restore
psql -U postgres -d mydb -f backup.sql

-- Backup with format
pg_dump -U postgres -d mydb -Fc -f backup.dump
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

Modul 13 dari 16: **Backup & Restore**. PostgreSQL adalah RDBMS open-source yang kuat dengan fitur JSON, indexing, dan ekstensi. Minggu depan: **14. Partitioning & Scaling**.
