# Pengenalan MySQL & Setup

> MySQL | Modul 1

## Tujuan Pembelajaran

- Mengenal MySQL sebagai RDBMS open-source paling populer
- Menginstall MySQL dan MySQL Workbench
- Memahami konsep database relasional
- Membuat database dan tabel pertama

---

## Program: Hello MySQL

```sql
-- Connect to MySQL
mysql -u root -p

-- Create a database
CREATE DATABASE mydb;
USE mydb;

-- Create a table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
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

Modul 1 dari 16: **Pengenalan MySQL & Setup**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **2. Data Types & Schema Design**.
