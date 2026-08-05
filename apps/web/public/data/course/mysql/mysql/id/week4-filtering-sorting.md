# Filtering & Sorting

> MySQL | Modul 4

## Tujuan Pembelajaran

- Menggunakan ORDER BY untuk sorting
- Memahami WHERE dengan AND, OR, NOT
- Menggunakan BETWEEN dan IS NULL
- Membuat query filtering yang efisien

---

## Program: Advanced Queries

```sql
SELECT * FROM orders
WHERE total > 100000
  AND status = 'completed'
  AND created_at BETWEEN '2025-01-01' AND '2025-12-31'
ORDER BY created_at DESC
LIMIT 10;
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

Modul 4 dari 16: **Filtering & Sorting**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **5. JOINs & Relationships**.
