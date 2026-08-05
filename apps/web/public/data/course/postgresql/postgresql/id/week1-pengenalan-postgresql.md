# Pengenalan PostgreSQL & Setup

> PostgreSQL | Modul 1

## Tujuan Pembelajaran

- Mengenal PostgreSQL sebagai RDBMS open-source
- Menginstall PostgreSQL dan pgAdmin
- Memahami konsep database relasional
- Membuat database dan tabel pertama

---

## Program: Hello PostgreSQL

```sql
-- Connect to PostgreSQL
psql -U postgres -d mydb

-- Create a table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (name, email) VALUES ('Budi', 'budi@example.com');

-- Query all
SELECT * FROM users;
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

Modul 1 dari 16: **Pengenalan PostgreSQL & Setup**. PostgreSQL adalah RDBMS open-source yang kuat dengan fitur JSON, indexing, dan ekstensi. Minggu depan: **2. Data Types & Schema Design**.
