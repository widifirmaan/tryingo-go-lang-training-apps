# Dasar MySQL & Tabel

> **Kategori:** MySQL | **Level:** Pemula | **Minggu 1:** Dasar MySQL & Tabel

## Tujuan Pembelajaran

- Memahami arsitektur MySQL
- Membuat database dan tabel
- AUTO_INCREMENT primary key
- Constraint: PK, NOT NULL, UNIQUE, DEFAULT
- Query SELECT dasar

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Database Client** (`cweijan.vscode-mysql-client2`): GUI viewer tabel, query runner, dan manajemen koneksi MySQL

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension cweijan.vscode-mysql-client2
```

---

### 2. Instalasi Runtime & Dependency (MySQL 8.0 (via Docker / Native))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
docker run -d --name mysql-dev -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=devdb -v mysqldata:/var/lib/mysql mysql:8.0
```

**macOS (Terminal / Homebrew):**
```bash
brew install mysql && brew services start mysql
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install -y mysql-server
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
docker exec -it mysql-dev mysql -u root -psecret -e "SELECT VERSION();"
```

Output yang diharapkan:
```output
8.0.xx
```

> 💡 **Tips Prasyarat:** Docker container MySQL mengisolasi database tanpa memerlukan service background Windows yang berat.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
docker exec -it mysql-dev mysql -u root -psecret devdb
```
- **Keterangan:** Membuka sesi terminal MySQL client untuk berinteraksi langsung dengan database.
- **Pindah ke direktori project:**
```bash
# Terhubung ke MySQL CLI
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
SHOW TABLES;
```
Akses di browser atau terminal: `localhost:3306`

> ℹ️ Daftar tabel database devdb ditampilkan.

**File Titik Masuk Utama (`schema.sql`):**
```sql
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO products (name, price, stock) 
VALUES ('Mechanical Keyboard', 89.99, 15);

SELECT * FROM products WHERE price < 100;
```
Skema tabel MySQL InnoDB dengan charset utf8mb4.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
database/
├── schema.sql           # Definisi DDL tabel
├── seed.sql             # Data awal
└── my.cnf               # Konfigurasi tuning MySQL
```
Struktur file database MySQL.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan selalu charset `utf8mb4` untuk mendukung seluruh karakter internasional dan emoji.
- Gunakan tipe `DECIMAL(10, 2)` untuk menyimpan nilai mata uang demi menghindari bug floating point.

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
