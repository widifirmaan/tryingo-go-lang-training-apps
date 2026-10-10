# Dasar PostgreSQL & Tabel

> **Kategori:** PostgreSQL | **Level:** Pemula | **Minggu 1:** Dasar PostgreSQL & Tabel

## Tujuan Pembelajaran

- Memahami arsitektur PostgreSQL
- Membuat database dan tabel
- Menggunakan SERIAL/BIGSERIAL
- Memahami constraint: PK, NOT NULL, UNIQUE, DEFAULT
- Query SELECT dasar dengan WHERE, COUNT, AVG

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **PostgreSQL Management** (`ckolkman.vscode-postgres`): Jalankan query SQL, jelajahi tabel, dan kelola database dari VS Code

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension ckolkman.vscode-postgres
```

---

### 2. Instalasi Runtime & Dependency (PostgreSQL 16 (via Docker / Native))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
docker run -d --name pg-dev -p 5432:5432 -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=devdb -v pgdata:/var/lib/postgresql/data postgres:16-alpine
```

**macOS (Terminal / Homebrew):**
```bash
brew install postgresql@16 && brew services start postgresql@16
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install -y postgresql postgresql-contrib
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
docker exec -it pg-dev psql -U postgres -d devdb -c "SELECT version();"
```

Output yang diharapkan:
```output
PostgreSQL 16.x ...
```

> 💡 **Tips Prasyarat:** Menjalankan PostgreSQL via Docker adalah metode tercepat tanpa mengotori instalasi host OS.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
docker exec -it pg-dev psql -U postgres -d devdb
```
- **Keterangan:** Membuka antarmuka interaktif psql terminal untuk menjalankan query DDL & DML.
- **Pindah ke direktori project:**
```bash
# Siap di terminal psql
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
SELECT * FROM users;
```
Akses di browser atau terminal: `localhost:5432`

> ℹ️ Hasil query tabular akan ditampilkan di terminal psql.

**File Titik Masuk Utama (`schema.sql`):**
```sql
-- Buat tabel dengan UUID dan JSONB
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Masukkan data uji
INSERT INTO users (name, email, preferences) 
VALUES ('John Coder', 'john@example.com', '{"theme": "dark", "newsletter": true}');

-- Query dengan operator JSONB
SELECT id, name, preferences->>'theme' AS selected_theme FROM users;
```
Skema tabel SQL dengan fitur native JSONB PostgreSQL.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
database/
├── migrations/
│   ├── 001_create_users.sql
│   └── 002_create_orders.sql
├── seeds/
│   └── 001_seed_dev_data.sql
└── docker-compose.yml
```
Struktur manajemen migrasi skema SQL terstruktur.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan perintah `\dt` di psql untuk melihat daftar tabel dan `\d nama_tabel` untuk melihat struktur kolom.
- Gunakan `EXPLAIN ANALYZE SELECT ...` untuk menganalisis performa query dan indeks.

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
