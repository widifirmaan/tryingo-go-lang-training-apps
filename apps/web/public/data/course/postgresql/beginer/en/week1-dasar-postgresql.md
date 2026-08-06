# PostgreSQL Basics & Tables

> **Kategori:** PostgreSQL | **Level:** Beginner | **Minggu 1:** PostgreSQL Basics & Tables

## Learning Objectives

- Understand PostgreSQL architecture
- Create databases and tables
- Use SERIAL/BIGSERIAL
- Understand constraints
- Run basic SELECT queries

---

## Program: Creating Database & Tables

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

## Key Concepts

### PostgreSQL Architecture
Open-source RDBMS supporting ACID.

### Data Types
INTEGER, DECIMAL, VARCHAR, TEXT, BOOLEAN, TIMESTAMP.

### Constraints
PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT.

### Basic Queries
SELECT with WHERE and aggregates.

---

## Experiments

- Add column with ALTER TABLE
- Create FOREIGN KEY
- Try ARRAY type
- RETURNING id

---

## Challenge

Build a library database: books, members, loans.

---

## Summary

Week 1 of 10: **PostgreSQL Basics & Tables** (Beginner).
