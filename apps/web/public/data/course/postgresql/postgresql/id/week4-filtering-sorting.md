# Filtering & Sorting

> PostgreSQL | Modul 4

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

Modul 4 dari 16: **Filtering & Sorting**. PostgreSQL adalah RDBMS open-source yang kuat dengan fitur JSON, indexing, dan ekstensi. Minggu depan: **5. JOINs & Relationships**.
