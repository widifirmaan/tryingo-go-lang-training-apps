# Indexing & Performance

> MySQL | Modul 8

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
EXPLAIN SELECT * FROM orders WHERE user_id = 1;
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

Modul 8 dari 16: **Indexing & Performance**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **9. Transactions & ACID**.
