# Dasar PostgreSQL & Tabel

> **Kategori:** PostgreSQL | **Level:** Pemula | **Minggu 1:** Dasar PostgreSQL & Tabel

## Tujuan Pembelajaran

- Memahami arsitektur PostgreSQL
- Membuat database dan tabel
- Menggunakan SERIAL/BIGSERIAL
- Memahami constraint: PK, NOT NULL, UNIQUE, DEFAULT
- Query SELECT dasar dengan WHERE, COUNT, AVG

---

## Program: Membuat Database & Tabel

```sql
-- Membuat database & tabel
CREATE DATABASE toko_db;

CREATE TABLE produk (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    harga DECIMAL(10,2) NOT NULL,
    stok INTEGER DEFAULT 0,
    kategori VARCHAR(50),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pelanggan (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    kota VARCHAR(50),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO produk (nama, harga, stok, kategori) VALUES
    ('Laptop ASUS', 12500000, 15, 'Elektronik'),
    ('Mouse Logitech', 350000, 50, 'Aksesoris'),
    ('Keyboard Mechanical', 850000, 30, 'Aksesoris'),
    ('Monitor LG', 2800000, 20, 'Elektronik'),
    ('Headset Sony', 1200000, 25, 'Audio');

INSERT INTO pelanggan (nama, email, kota) VALUES
    ('Budi Santoso', 'budi@email.com', 'Jakarta'),
    ('Siti Rahayu', 'siti@email.com', 'Bandung'),
    ('Ahmad Wijaya', 'ahmad@email.com', 'Surabaya'),
    ('Dewi Lestari', 'dewi@email.com', 'Yogyakarta');

SELECT * FROM produk;
SELECT nama, harga FROM produk WHERE kategori = 'Elektronik';
SELECT COUNT(*) AS total_produk FROM produk;
SELECT AVG(harga) AS rata_harga FROM produk;
```

---

## Konsep Kunci

### Arsitektur PostgreSQL
PostgreSQL adalah RDBMS open-source yang mendukung ACID dan extensible.

### Tipe Data
INTEGER/BIGINT, DECIMAL, VARCHAR, TEXT, BOOLEAN, TIMESTAMP.

### Constraint
PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT.

### Query Dasar
SELECT, WHERE, COUNT, AVG, SUM.

---

## Eksperimen

- Tambah kolom dengan ALTER TABLE
- Buat FOREIGN KEY
- Coba ARRAY type
- RETURNING id

---

## Tantangan

Buat database perpustakaan: tabel buku, anggota, peminjaman.

---

## Ringkasan

Minggu 1 dari 10: **Dasar PostgreSQL & Tabel** (Pemula).
