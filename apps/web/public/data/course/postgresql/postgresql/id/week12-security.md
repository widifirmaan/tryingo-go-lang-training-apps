# Security & Roles

> PostgreSQL | Modul 12

## Tujuan Pembelajaran

- Membuat user dan role
- Memberikan GRANT dan REVOKE
- Memahami row-level security
- Mengimplementasi schema isolation

---

## Program: Access Control

```sql
CREATE ROLE app_readonly WITH LOGIN PASSWORD 'secure_pass';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;
REVOKE INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM app_readonly;
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

Modul 12 dari 16: **Security & Roles**. PostgreSQL adalah RDBMS open-source yang kuat dengan fitur JSON, indexing, dan ekstensi. Minggu depan: **13. Backup & Restore**.
