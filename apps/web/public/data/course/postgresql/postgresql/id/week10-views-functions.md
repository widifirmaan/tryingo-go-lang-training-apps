# Views & Functions

> PostgreSQL | Modul 10

## Tujuan Pembelajaran

- Membuat views untuk query yang sering digunakan
- Membuat fungsi SQL
- Menggunakan stored procedures
- Memahami materialized views

---

## Program: Stored Logic

```sql
CREATE VIEW active_users AS
SELECT id, name, email, created_at
FROM users
WHERE active = true;

CREATE FUNCTION get_user_order_count(p_user_id INTEGER)
RETURNS INTEGER AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM orders WHERE user_id = p_user_id);
END;
$$ LANGUAGE plpgsql;
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

Modul 10 dari 16: **Views & Functions**. PostgreSQL adalah RDBMS open-source yang kuat dengan fitur JSON, indexing, dan ekstensi. Minggu depan: **11. JSON & Document Queries**.
