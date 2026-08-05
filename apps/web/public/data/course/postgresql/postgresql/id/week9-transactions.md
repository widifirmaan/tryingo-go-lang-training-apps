# Transactions & ACID

> PostgreSQL | Modul 9

## Tujuan Pembelajaran

- Memahami ACID properties
- Menggunakan BEGIN, COMMIT, ROLLBACK
- Memahami isolation levels
- Mengimplementasi transfer antar rekening

---

## Program: Data Integrity

```sql
BEGIN;

UPDATE accounts SET balance = balance - 500000 WHERE id = 1;
UPDATE accounts SET balance = balance + 500000 WHERE id = 2;

COMMIT;
-- If error: ROLLBACK;
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

Modul 9 dari 16: **Transactions & ACID**. PostgreSQL adalah RDBMS open-source yang kuat dengan fitur JSON, indexing, dan ekstensi. Minggu depan: **10. Views & Functions**.
