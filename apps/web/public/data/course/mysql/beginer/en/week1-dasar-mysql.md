# Dasar MySQL — Gudang Warung Versi MySQL

> **Kategori:** MySQL | **Level:** Pemula | **Minggu 1:** Dasar MySQL & Tabel

## Tujuan Pembelajaran

- Bedakan MySQL vs PostgreSQL: `AUTO_INCREMENT` vs `SERIAL`, `ENGINE=InnoDB`
- Buat `CREATE TABLE produk` dengan `INT AUTO_INCREMENT PRIMARY KEY`
- `INSERT`, `SELECT`, `WHERE`, `COUNT/AVG` — sama seperti PostgreSQL

---

## Kenapa Ini Penting Buat Kamu?

MySQL paling banyak dipakai UMKM (WordPress, toko online). Gudangnya mirip PostgreSQL, hanya mesin nomor beda: `AUTO_INCREMENT`.

---

## Program: Gudang MySQL

```sql
CREATE TABLE produk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    harga DECIMAL(10,2) NOT NULL,
    stok INT DEFAULT 0,
    kategori VARCHAR(50),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO produk (nama, harga, stok, kategori) VALUES
    ('Beras 5kg', 62000, 10, 'Sembako'),
    ('Bayam', 5000, 20, 'Sayur');

SELECT * FROM produk;
SELECT nama, harga FROM produk WHERE kategori = 'Sembako';
SELECT COUNT(*) AS total FROM produk;
```

**Coba tanpa install:** `db-fiddle.com` pilih MySQL 8 atau `onecompiler.com/mysql`.

---

## Konsep Kunci

### `AUTO_INCREMENT` = Mesin Nomor MySQL
Beda PostgreSQL `SERIAL`, MySQL `INT AUTO_INCREMENT`. Hasil sama 1,2,3.

### `ENGINE=InnoDB` = Tahan ACID
MySQL punya 2 mesin: `InnoDB` aman, `MyISAM` cepat tapi tidak aman — pakai `InnoDB`.

---

## Penjelasan untuk Pemula

### Analogi: Gudang MySQL vs PostgreSQL
- Dua merk gudang, rak sama, mesin nomor beda warna.

---

## Tantangan

Buat `pelanggan` MySQL `email VARCHAR(150) UNIQUE`, isi 2 baris, `SELECT AVG(harga)`.

---

## Ringkasan

Minggu 1: **MySQL Gudang** — mirip PostgreSQL, mesin nomor beda. Minggu depan: **CRUD**.
