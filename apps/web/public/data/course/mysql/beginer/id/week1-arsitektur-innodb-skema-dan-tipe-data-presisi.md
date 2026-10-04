# Arsitektur Mesin InnoDB, Skema & Tipe Data Presisi

> **Kategori:** MySQL | **Level:** Fondasi Relasional & Engine InnoDB | **Minggu 1:** Arsitektur Mesin InnoDB, Skema & Tipe Data Presisi
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami arsitektur internal penyimpanan MySQL: InnoDB vs MyISAM
- Mengonfigurasi sql_mode STRICT_TRANS_TABLES untuk pencegahan silent truncation bug
- Merancang primary key Clustered Index (BIGINT UNSIGNED vs UUID)
- Menggunakan DECIMAL untuk presisi mata uang dan penanganan charset utf8mb4

---

## Program: Skema Dompet Digital Finansial dengan Engine InnoDB dan Constraint Strict

```sql
-- Set strict SQL mode to prevent silent truncation and implicit conversions
SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION,ONLY_FULL_GROUP_BY';

-- 1. Create clean database schema
CREATE DATABASE IF NOT EXISTS finwallet CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE finwallet;

-- Drop tables in reverse foreign key order
DROP TABLE IF EXISTS wallet_ledgers;
DROP TABLE IF EXISTS user_wallets;
DROP TABLE IF EXISTS app_users;

-- 2. Users table using BIGINT UNSIGNED for massive scale
CREATE TABLE app_users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    uuid CHAR(36) NOT NULL,
    email VARCHAR(191) NOT NULL, -- 191 chars for utf8mb4 index safety in older engines
    full_name VARCHAR(100) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_uuid (uuid),
    UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Wallets table with DECIMAL financial precision
CREATE TABLE user_wallets (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'IDR',
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    locked_balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    version INT UNSIGNED NOT NULL DEFAULT 1, -- For optimistic locking
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_user_currency (user_id, currency),
    CONSTRAINT fk_wallet_user FOREIGN KEY (user_id) 
        REFERENCES app_users(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT chk_positive_balance CHECK (balance >= 0.00),
    CONSTRAINT chk_positive_locked CHECK (locked_balance >= 0.00)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample records
INSERT INTO app_users (uuid, email, full_name) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'ahmad.rizky@example.com', 'Ahmad Rizky Pratama'),
('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'dina.lestari@example.com', 'Dina Lestari');

INSERT INTO user_wallets (user_id, currency, balance) VALUES
(1, 'IDR', 5000000.00),
(2, 'IDR', 12500000.00);

-- Query with strict collation verification
SELECT u.id, u.uuid, u.email, w.currency, w.balance, w.updated_at
FROM app_users u
INNER JOIN user_wallets w ON u.id = w.user_id;
```

---

## Konsep Kunci

### Arsitektur Mesin Penyimpanan InnoDB
Secara default sejak MySQL 5.5, **InnoDB** adalah mesin penyimpanan standar yang mendukung ACID (*Atomicity, Consistency, Isolation, Durability*). InnoDB menyimpan tabel menggunakan struktur **Clustered Index**, yang berarti seluruh data baris secara fisik diurutkan dan disimpan langsung di daun (*leaf nodes*) pohon B+Tree Primary Key. Memilih primary key yang sekuensial (seperti `BIGINT UNSIGNED AUTO_INCREMENT`) menjaga proses insert tetap efisien tanpa memicu *page splitting* disk yang mahal.

### Pentingnya sql_mode STRICT_TRANS_TABLES
Secara historis, konfigurasi bawaan MySQL kerap mengonversi data secara otomatis (*silent truncation*) jika nilai melebihi batas panjang kolom. Mengaktifkan `sql_mode = 'STRICT_TRANS_TABLES'` memastikan MySQL melempar error keras dan menggagalkan transaksi jika terdapat tipe data yang tidak cocok atau string yang melebihi batas kolom.

### Presisi DECIMAL vs FLOAT dan Encoding utf8mb4
- **DECIMAL(15, 2)**: Menyimpan angka pecahan secara exact representation (titik tetap). Sangat wajib digunakan untuk saldo finansial, persentase pajak, dan harga guna menghindari galat pembulatan biner `FLOAT`/`DOUBLE`.
- **utf8mb4**: Encoding UTF-8 sejati 4-byte di MySQL yang mendukung penuh karakter emoji modern dan simbol internasional. Karakteristik ini memerlukan batasan panjang kolom maksimal 191 karakter pada index lama (767-byte limit).

---

---

## Penjelasan untuk Pemula

Bayangkan database InnoDB seperti buku katalog hotel berbintang. Nomor kamar (`101, 102, 103`) adalah Primary Key. Karena kamar diurutkan rapi, resepsionis bisa langsung berjalan ke lantai dan pintu yang tepat dalam hitungan detik. 

Tipe `DECIMAL` seperti kasir bank yang menghitung uang logam satu per satu sampai sen terkecil, bukan menebak-nebak seperti kalkulator pembulatan biasa. Sedangkan `utf8mb4` memastikan aplikasi Anda bisa menerima nama dengan emoji bendera atau karakter huruf Arab/Jepang tanpa menjadi tanda tanya rusak (????).

## Eksperimen

- Coba masukkan saldo negatif ke user_wallets dan amati penolakan oleh CHECK constraint
- Masukkan teks emoji ke kolom full_name dan verifikasi penyimpanan bersih menggunakan utf8mb4
- Bandingkan ukuran tabel dan kecepatan insert antara UUID sebagai primary key vs BIGINT AUTO_INCREMENT
- Uji perilaku sql_mode kosong vs STRICT_TRANS_TABLES saat memasukkan string 250 karakter ke VARCHAR(100)

---

## Tantangan

Buat tabel `currency_exchange_rates` dengan pasangan mata uang (`base_currency`, `quote_currency`), nilai kurs bertipe `DECIMAL(18, 8)`, dan timestamp presisi mikrodetik `DATETIME(6)`.

---

## Model Mental & Diagram Alur Visual

![Diagram Relasi Relasional & Eksekusi Query Joins](/diagrams/sql-joins.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ MESIN PENYIMPANAN INNODB MYSQL                           │
│                                                          │
│ SQL Parser & Optimizer ──► Buffer Pool (RAM Cache)       │
│                                  │                       │
│                 ┌────────────────┴────────────────┐      │
│                 ▼                                 ▼      │
│     Clustered Index (B+ Tree)              Redo Log WAL  │
│     (Data tersimpan berurut PK)            (Crash Safe)  │
│                 │                                 │      │
│                 ▼                                 ▼      │
│            Tabel .ibd Disk               Binlog (Replika)│
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `CREATE TABLE name ( id INT AUTO_INCREMENT PRIMARY KEY, ... )`
- **Fungsi Utama:** Definisi tabel mesin penyimpanan InnoDB.
- **Parameter / Atribut:** `Column types (INT, VARCHAR, DECIMAL), Constraints`.
- **Perilaku & Efek Sistem:** Menyusun skema tabel MySQL berkinerja tinggi dengan indeks kunci utama berurut otomatis..
- **Contoh Penggunaan Praktis:**
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(50) NOT NULL UNIQUE,
  price DECIMAL(12, 2) NOT NULL,
  in_stock BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;
```
- **Hasil Output yang Diharapkan:**
```output
Tabel products InnoDB siap digunakan
```

### 2. `SELECT * FROM tbl WHERE cond LIMIT offset, count`
- **Fungsi Utama:** Paginasi data efisien MySQL.
- **Parameter / Atribut:** `LIMIT offset, row_count`.
- **Perilaku & Efek Sistem:** Mengambil potongan data per halaman untuk optimasi waktu muat aplikasi..
- **Contoh Penggunaan Praktis:**
```sql
SELECT id, sku, price FROM products WHERE in_stock = 1 ORDER BY id DESC LIMIT 0, 10;
```
- **Hasil Output yang Diharapkan:**
```output
10 produk pertama untuk halaman 1
```

### 3. `START TRANSACTION; ... COMMIT; / ROLLBACK;`
- **Fungsi Utama:** Kontrol transaksi ACID multi-tahap.
- **Parameter / Atribut:** `ACID guarantees`.
- **Perilaku & Efek Sistem:** Memastikan serangkaian operasi query berhasil seluruhnya atau dibatalkan saat ada kesalahan..
- **Contoh Penggunaan Praktis:**
```sql
START TRANSACTION;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;
```
- **Hasil Output yang Diharapkan:**
```output
Saldo berhasil dipindahkan secara atomik
```

### 4. `EXPLAIN SELECT ...`
- **Fungsi Utama:** Analisis rencana eksekusi query (Query Plan).
- **Parameter / Atribut:** `Query SELECT`.
- **Perilaku & Efek Sistem:** Memeriksa apakah query memanfaatkan indeks (Using index) atau mengalami Full Table Scan lambat..
- **Contoh Penggunaan Praktis:**
```sql
EXPLAIN SELECT * FROM products WHERE sku = 'LAP-001';
```
- **Hasil Output yang Diharapkan:**
```output
Menampilkan estimasi baris dan indeks yang digunakan
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Menggunakan Charset Lawas `utf8` alih-alih `utf8mb4`
- **Gejala / Masalah:** Karakter emoji atau aksara non-Latin memicu error `Incorrect string value`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu setel charset ke `utf8mb4` dan collation ke `utf8mb4_unicode_ci` pada tabel dan database.

### 2. Tipe Penyimpanan Tanggal (`TIMESTAMP` vs `DATETIME`)
- **Gejala / Masalah:** Tahun 2038 bug pada kolom TIMESTAMP atau inkonsistensi zona waktu server.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `DATETIME` untuk tanggal independen zona waktu atau simpan dalam format UTC eksplisit.

### 3. Lupa Mematikan Autocommit pada Operasi Batch Besar
- **Gejala / Masalah:** Proses batch insert ribuan data memakan waktu sangat lama karena commit per baris.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Jalankan dalam transaksi tunggal `START TRANSACTION; ... COMMIT;` untuk kecepatan maksimal.

---

## Ringkasan

Anda telah memahami arsitektur internal InnoDB, keunggulan Clustered Index sekuensial, disiplin STRICT sql_mode, serta presisi data DECIMAL dan utf8mb4.
