# Extensions & Tools

> PostgreSQL | Modul 15

## Tujuan Pembelajaran

- Menginstall dan menggunakan PostGIS
- Menggunakan pg_trgm untuk fuzzy search
- Menggunakan uuid-ossp
- Menggunakan hstore untuk key-value storage

---

## Program: PostGIS & pg_trgm

```sql
-- PostGIS: spatial queries
CREATE EXTENSION postgis;
SELECT ST_Distance(geom1, geom2) FROM locations;

-- pg_trgm: fuzzy search
CREATE EXTENSION pg_trgm;
SELECT name FROM products WHERE name % 'laptop';

-- UUID
CREATE EXTENSION uuid-ossp;
INSERT INTO orders (id, total) VALUES (uuid_generate_v4(), 100000);
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

Modul 15 dari 16: **Extensions & Tools**. PostgreSQL adalah RDBMS open-source yang kuat dengan fitur JSON, indexing, dan ekstensi. Minggu depan: **16. Capstone: E-commerce DB**.
