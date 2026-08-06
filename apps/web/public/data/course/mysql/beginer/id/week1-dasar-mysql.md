# Dasar MySQL & Tabel

> **Kategori:** MySQL | **Level:** Pemula | **Minggu 1:** Dasar MySQL & Tabel

## Tujuan Pembelajaran

- Memahami arsitektur MySQL
- Membuat database dan tabel
- AUTO_INCREMENT primary key
- Constraint: PK, NOT NULL, UNIQUE, DEFAULT
- Query SELECT dasar

---

## Program: Membuat Database & Tabel

```sql
CREATE DATABASE toko_db;
USE toko_db;

CREATE TABLE produk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    harga DECIMAL(10,2) NOT NULL,
    stok INT DEFAULT 0,
    kategori VARCHAR(50),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pelanggan (
    id INT AUTO_INCREMENT PRIMARY KEY,
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

### Arsitektur MySQL
MySQL adalah RDBMS open-source populer untuk web application.

### Tipe Data
INT, DECIMAL, VARCHAR, TEXT, BOOLEAN, TIMESTAMP, ENUM.

### AUTO_INCREMENT
MySQL menggunakan AUTO_INCREMENT untuk primary key otomatis.

### Constraint
PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT, FOREIGN KEY.

### Query Dasar
SELECT, WHERE, COUNT, AVG, SUM.

---

## Eksperimen

- ALTER TABLE tambah kolom
- Foreign key
- ENUM type
- INSERT dengan IGNORE

---

## Tantangan

Database perpustakaan: buku, anggota, peminjaman.

---

## Ringkasan

Minggu 1 dari 10: **Dasar MySQL & Tabel** (Pemula).
