# Pemodelan Relasional, DDL & Tipe Data Modern (UUID, JSONB)

> **Kategori:** PostgreSQL | **Level:** Dasar Relasional & SQL Lanjutan | **Minggu 1:** Pemodelan Relasional, DDL & Tipe Data Modern (UUID, JSONB)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Merancang skema database relasional 3NF dengan primary key UUID default gen_random_uuid()
- Menggunakan constraint integritas data: CHECK, UNIQUE, NOT NULL, dan FOREIGN KEY cascade rules
- Memanfaatkan tipe data modern JSONB dan mengoperasikan operator JSON (->, ->>, @>)
- Memahami tipe data presisi keuangan NUMERIC dan zona waktu akurat TIMESTAMPTZ

---

## Program: Skema E-Commerce dengan UUIDv7, JSONB Metadata, dan Validasi Constraint

```sql
-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables for idempotent execution
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- 1. Customers table with generated UUID and check constraints
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    profile_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT email_format_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- 2. Products table with inventory check and numeric precision
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders table with status enum-like check
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (total_amount >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (status IN ('PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'CANCELLED')),
    shipping_address JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Order items table with composite uniqueness
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    quantity INT NOT NULL CHECK (quantity > 0),
    CONSTRAINT unique_order_product UNIQUE (order_id, product_id)
);

-- Insert sample records
INSERT INTO customers (email, full_name, profile_metadata) VALUES
('budi.santoso@example.com', 'Budi Santoso', '{"tier": "gold", "preferences": {"newsletter": true, "currency": "IDR"}}'::jsonb),
('siti.aminah@example.com', 'Siti Aminah', '{"tier": "silver", "preferences": {"newsletter": false, "currency": "IDR"}}'::jsonb);

INSERT INTO products (sku, title, price, stock_quantity, attributes) VALUES
('LAPTOP-X1', 'ThinkBook Ultra 14', 16500000.00, 25, '{"brand": "Lenovo", "specs": {"ram": "16GB", "ssd": "512GB"}}'::jsonb),
('MOUSE-WL', 'Precision Wireless Mouse', 350000.00, 100, '{"brand": "Logitech", "color": "Graphite", "dpi": 4000}'::jsonb);

-- Query using JSONB operator ->> to extract text fields
SELECT 
    c.full_name,
    c.email,
    c.profile_metadata->>'tier' AS customer_tier,
    c.profile_metadata->'preferences'->>'currency' AS preferred_currency
FROM customers c;
```

---

## Konsep Kunci

### Arsitektur Relasional Modern dan UUID vs Serial
Dalam sistem terdistribusi modern, auto-increment integer serial (`1, 2, 3...`) memiliki kelemahan kritis: mudah ditebak (ID enumeration attack) dan rentan konflik saat data digabungkan dari multi-node atau multi-region. PostgreSQL menyediakan tipe data `UUID` (128-bit) yang menjamin keunikan global tanpa perlu koordinasi terpusat. Ekstensi `pgcrypto` menyediakan fungsi `gen_random_uuid()` standar kriptografi untuk alokasi primary key instan.

### Ketahanan Integritas Data dengan Constraint
Database PostgreSQL bertindak sebagai benteng terakhir integritas data aplikasi. Constraint `CHECK` memverifikasi aturan bisnis langsung di tingkat penyimpanan, misalnya ekspresi regex untuk format email `CHECK (email ~* '...')` dan validasi non-negatif `CHECK (stock_quantity >= 0)`. Constraint `FOREIGN KEY` dengan klausa `ON DELETE RESTRICT` mencegah penghapusan entitas induk jika data relasi masih tersisa, melindungi konsistensi referensial finansial.

### Fleksibilitas Semi-Terstruktur dengan JSONB
Tipe data `JSONB` menyimpan dokumen JSON dalam format biner yang sudah di-parse dan diindeks, bukan string mentah (`JSON`). Operator `->>` mengekstrak field sebagai teks murni, sedangkan operator `->` mempertahankan tipe objek JSON. JSONB sangat ideal untuk menyimpan preferensi pengguna, metadata dinamis produk, dan payload respons pihak ketiga tanpa perlu migrasi skema tabel secara berkala.

---

---

## Penjelasan untuk Pemula

Bayangkan database relasional seperti sistem arsip lemari besi di bank. Kolom terstruktur seperti nomor rekening dan saldo harus memiliki tipe angka pasti (`NUMERIC`) agar tidak ada selisih satu sen pun akibat pembulatan floating-point. 

UUID seperti nomor paspor internasional unik yang tidak akan tertukar dengan siapapun di seluruh dunia. Sedangkan kolom `JSONB` seperti map transparan di dalam map berkas Anda—Anda bisa menyelipkan catatan fleksibel seperti 'bahasa favorit' atau 'tema aplikasi' tanpa harus merombak struktur rak lemari besi Anda.

## Eksperimen

- Coba masukkan email yang tidak valid tanpa simbol @ dan perhatikan pesan error constraint violation PostgreSQL
- Gunakan operator JSONB containment @> untuk mencari customer dengan preferensi currency IDR: profile_metadata @> '{"preferences": {"currency": "IDR"}}'
- Modifikasi table products dengan menambahkan kolom status stock: active, discontinued, out_of_stock menggunakan CHECK constraint
- Buat pesanan baru dan coba hapus customer terkait untuk melihat perlindungan ON DELETE RESTRICT bekerja

---

## Tantangan

Rancang skema tabel `invoices` yang berelasi ke `orders`, dengan kolom `invoice_number` berformat tahun dan 6 digit sequence (misal: INV-2026-000001), status pelunasan, timestamp jatuh tempo, dan metadata gateway pembayaran dalam bentuk JSONB.

---

## Model Mental & Diagram Alur Visual

![Diagram Relasi Antar Tabel & SQL Joins](/diagrams/sql-joins.svg)

```diagram
┌────────────────────┐                 ┌────────────────────┐
│   TABLE: users     │                 │   TABLE: orders    │
├────────────────────┤                 ├────────────────────┤
│ id (PK: UUID)      │ ◄── Relasi 1-N ─┤ id (PK: UUID)      │
│ email (UNIQUE)     │                 │ user_id (FK -> PK) │
│ created_at         │                 │ total_amount       │
└────────────────────┘                 └────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `CREATE TABLE name ( col TYPE CONSTRAINT );`
- **Fungsi Utama:** Mendefinisikan skema tabel relasional.
- **Parameter / Atribut:** `Nama tabel, definisi kolom, batasan (PK, FK, NOT NULL)`.
- **Perilaku & Efek Sistem:** Menyiapkan tabel database dengan validasi tipe data presisi dan integritas data.
- **Contoh Penggunaan Praktis:**
```javascript
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
- **Hasil Output yang Diharapkan:**
```text
Tabel users siap menerima baris data
```

### 2. `SELECT cols FROM tbl WHERE cond ORDER BY col LIMIT n;`
- **Fungsi Utama:** Query pembacaan dan penyaringan data.
- **Parameter / Atribut:** `Daftar kolom, kondisi WHERE, klausa urutan dan limit`.
- **Perilaku & Efek Sistem:** Mengambil rekaman data yang memenuhi kriteria pengujian secara efisien.
- **Contoh Penggunaan Praktis:**
```javascript
SELECT id, email FROM users WHERE created_at > NOW() - INTERVAL '7 days' ORDER BY created_at DESC LIMIT 10;
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan 10 baris pengguna terbaru
```

### 3. `INSERT INTO tbl (cols) VALUES (vals) RETURNING id;`
- **Fungsi Utama:** Penyisipan baris baru dengan pengembalian nilai instan.
- **Parameter / Atribut:** `Kolom target, data masukan, klausa RETURNING`.
- **Perilaku & Efek Sistem:** Menyimpan data baru dan langsung mengembalikan nilai kolom yang digenerasi otomatis (seperti ID atau timestamp).
- **Contoh Penggunaan Praktis:**
```javascript
INSERT INTO users (email) VALUES ('alex@example.com') RETURNING id, created_at;
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan ID UUID yang baru dibuat
```

### 4. `SELECT * FROM a INNER JOIN b ON a.id = b.a_id;`
- **Fungsi Utama:** Penggabungan relasi antar tabel (Join).
- **Parameter / Atribut:** `Nama tabel, kondisi pencocokan kunci relasi ON`.
- **Perilaku & Efek Sistem:** Menggabungkan baris dari dua tabel berdasarkan relasi foreign key.
- **Contoh Penggunaan Praktis:**
```javascript
SELECT u.email, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;
```
- **Hasil Output yang Diharapkan:**
```text
Daftar transaksi pesanan beserta email pemilik akun
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Full Table Scan Akibat Lupa Menambahkan Index
- **Gejala / Masalah:** Query SELECT menjadi lambat seiring bertambahnya jutaan baris data.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Tambahkan B-Tree Index pada kolom yang sering digunakan di klausa `WHERE`, `ORDER BY`, dan `JOIN`.

### 2. Lupa Menggunakan Transaksi pada Operasi Finansial/Multi-Tabel
- **Gejala / Masalah:** Data menjadi tidak konsisten jika terjadi error di tengah-tengah rentetan query.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu bungkus operasi dengan blok `BEGIN; ... COMMIT;` atau `ROLLBACK;` saat terjadi kegagalan.

### 3. Tipe Data Angka Desimal yang Keliru (`FLOAT` vs `NUMERIC`)
- **Gejala / Masalah:** Perhitungan saldo uang mengalami selisih desimal akibat floating-point precision error.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan tipe data `NUMERIC(15, 2)` untuk uang dan data finansial presisi tinggi.

---

## Ringkasan

Anda telah menguasai perancangan skema relasional modern dengan primary key UUID, integritas constraint level database, tipe angka presisi finansial NUMERIC, dan fleksibilitas JSONB biner.
