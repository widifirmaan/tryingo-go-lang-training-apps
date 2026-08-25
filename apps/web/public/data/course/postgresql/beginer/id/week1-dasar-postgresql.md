# Dasar PostgreSQL — Gudang Excel Raksasa

> **Kategori:** PostgreSQL | **Level:** Pemula | **Minggu 1:** Dasar PostgreSQL & Tabel

## Tujuan Pembelajaran

- Memahami DB seperti **Excel raksasa** yang aman (tidak hilang saat listrik mati) — PostgreSQL = gudang gratis
- Buat gudang `CREATE DATABASE toko_db` dan rak `CREATE TABLE produk` dengan kolom
- Paham `SERIAL` nomor otomatis, `PRIMARY KEY` KTP barang, `NOT NULL` wajib isi
- Masukkan `INSERT` dan ambil `SELECT *`, saring `WHERE`, hitung `COUNT/AVG`

---

## Kenapa Ini Penting Buat Kamu?

Warung catat di buku tulis hilang kena banjir. Excel hilang jika laptop rusak. **Database = gudang yang dikunci, ada CCTV (ACID), muat jutaan baris**. Hari ini bikin gudang pertama: rak produk dan rak pelanggan.

---

## Program: Bikin Gudang Toko

Jalankan di **Supabase SQL Editor** (gratis, tanpa install) atau `psql`.

```sql
-- 1. Bikin gudang (sekali)
CREATE DATABASE toko_db;
-- (di Supabase, gudang sudah ada — langsung bikin rak)

-- 2. Bikin rak PRODUK — seperti bikin tabel Excel dengan header
CREATE TABLE produk (
    id SERIAL PRIMARY KEY,              -- nomor otomatis 1,2,3... + KTP
    nama VARCHAR(100) NOT NULL,         -- teks wajib isi, max 100 huruf
    harga DECIMAL(10,2) NOT NULL,       -- angka uang 10 digit, 2 desimal
    stok INTEGER DEFAULT 0,             -- jika tidak isi, 0
    kategori VARCHAR(50),               -- boleh kosong
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- cap waktu otomatis
);

-- 3. Bikin rak PELANGGAN
CREATE TABLE pelanggan (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL, -- UNIQUE = email tidak boleh kembar
    kota VARCHAR(50),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Masukkan barang (INSERT) — seperti isi baris Excel
INSERT INTO produk (nama, harga, stok, kategori) VALUES
    ('Beras 5kg', 62000, 10, 'Sembako'),
    ('Bayam', 5000, 20, 'Sayur'),
    ('Telur 1kg', 28000, 15, 'Protein');

INSERT INTO pelanggan (nama, email, kota) VALUES
    ('Budi Santoso', 'budi@email.com', 'Jakarta'),
    ('Siti Rahayu', 'siti@email.com', 'Bandung');

-- 5. Ambil & hitung (SELECT)
SELECT * FROM produk; -- lihat semua
SELECT nama, harga FROM produk WHERE kategori = 'Sembako'; -- saring
SELECT COUNT(*) AS total_produk FROM produk; -- hitung baris
SELECT AVG(harga) AS rata_harga FROM produk; -- rata-rata
```

**Cara tanpa install (untuk non-IT):**
1. Buka `supabase.com` → Sign up → New Project → `toko_db`
2. Kiri → `SQL Editor` → tempel kode → `Run` → lihat `Success`

**Cara lokal (opsional):** Install `postgresql.org` → buka `psql` → `\c toko_db`.

---

## Konsep Kunci

### PostgreSQL = Gudang Gratis & Aman
`ACID` = jika listrik mati saat tulis, tidak setengah jadi. Excel tidak.

### Rak = TABLE, Kolom = Header
`VARCHAR(100)` teks pendek, `INTEGER` angka bulat, `DECIMAL(10,2)` uang, `TIMESTAMP` waktu.

### `SERIAL` + `PRIMARY KEY` = Nomor + KTP
`SERIAL` auto 1,2,3. `PRIMARY KEY` = KTP unik, tidak boleh kembar.

### `INSERT` Isi, `SELECT` Ambil
`INSERT INTO produk (nama,harga) VALUES ('Beras',62000)` → `SELECT * FROM produk WHERE stok > 5`.

---

## Penjelasan untuk Pemula

### Analogi: Gudang Warung

- **Database = gedung gudang**: `toko_db` gedung.
- **Table = rak**: `produk` rak 1, `pelanggan` rak 2.
- **Kolom = label rak**: `nama`, `harga`.
- **Baris = kardus**: 1 kardus = 1 produk.
- **`SERIAL` = mesin nomor**: tiap kardus masuk, mesin cap nomor otomatis.

### 3 Istilah Wajib

1. **Table**: rak
2. **Primary Key**: KTP baris
3. **SELECT/INSERT**: ambil/isi

---

## Eksperimen

- **Hijau:** `INSERT INTO produk (nama,harga) VALUES ('Gula',15000)` → `SELECT *`?
- **Kuning:** `SELECT * FROM produk WHERE harga > 10000` → apa?
- **Merah:** Coba `INSERT` email kembar `budi@email.com` → error `UNIQUE`?

---

## Tantangan

**Gudang Perpustakaan:** Buat `buku(id SERIAL PK, judul VARCHAR NOT NULL, stok INT DEFAULT 0)` + `anggota(id,nama,email UNIQUE)` → `INSERT` 3 buku, 2 anggota → `SELECT COUNT(*)` → `AVG(stok)`?

---

## Glosarium Mini

- **DATABASE/TABLE**: gudang/rak
- **SERIAL/PRIMARY KEY**: nomor/KTP
- **VARCHAR/INTEGER**: teks/angka
- **SELECT/INSERT**: ambil/isi

---

## Ringkasan

Minggu 1 dari 10: **Gudang & Rak** (Level: Pemula). Bisa bikin gudang, rak, isi, dan hitung. Minggu depan: **CRUD** — ubah & hapus.
