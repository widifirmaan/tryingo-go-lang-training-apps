# Indexing & Performance

> PostgreSQL | Modul 8

## Tujuan Pembelajaran

- Memahami B-tree indexes
- Membuat index pada kolom frequently queried
- Memahami covering indexes
- Menganalisis query dengan EXPLAIN

---

## Program: Query Optimization

```sql
-- Create index
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Analyze query
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 1;
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

Modul 8 dari 16: **Indexing & Performance**. PostgreSQL adalah RDBMS open-source yang kuat dengan fitur JSON, indexing, dan ekstensi. Minggu depan: **9. Transactions & ACID**.
