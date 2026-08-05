# Transactions & ACID

> MySQL | Modul 9

## Tujuan Pembelajaran

- Memahami ACID properties
- Menggunakan START TRANSACTION, COMMIT, ROLLBACK
- Memahami isolation levels
- Mengimplementasi transfer antar rekening

---

## Program: Data Integrity

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 500000 WHERE id = 1;
UPDATE accounts SET balance = balance + 500000 WHERE id = 2;

COMMIT;
-- If error: ROLLBACK;
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

Modul 9 dari 16: **Transactions & ACID**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **10. Views & Functions**.
