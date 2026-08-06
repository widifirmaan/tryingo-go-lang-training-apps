# MySQL Basics & Tables

> **Kategori:** MySQL | **Level:** Beginner | **Minggu 1:** MySQL Basics & Tables

## Learning Objectives

- Understand MySQL architecture
- Create databases and tables
- AUTO_INCREMENT primary key
- Understand constraints
- Run basic SELECT queries

---

## Program: Creating Database & Tables

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

## Key Concepts

### MySQL Architecture
Popular open-source RDBMS for web applications.

### Data Types
INT, DECIMAL, VARCHAR, TEXT, BOOLEAN, TIMESTAMP, ENUM.

### AUTO_INCREMENT
MySQL uses AUTO_INCREMENT for auto primary keys.

### Constraints
PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT, FOREIGN KEY.

### Basic Queries
SELECT with WHERE and aggregates.

---

## Experiments

- ALTER TABLE add column
- Foreign key
- ENUM type
- INSERT IGNORE

---

## Challenge

Library database: books, members, loans.

---

## Summary

Week 1 of 10: **MySQL Basics & Tables** (Beginner).
