# Transaksi ACID, Tingkat Isolasi & Pessimistic Locking

> **Kategori:** PostgreSQL | **Level:** Konkurensi, Partisi & Arsitektur Enterprise | **Minggu 5:** Transaksi ACID, Tingkat Isolasi & Pessimistic Locking
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami empat pilar ACID (Atomicity, Consistency, Isolation, Durability) di PostgreSQL
- Membandingkan tingkat isolasi transaksi: Read Committed, Repeatable Read, dan Serializable
- Mencegah race condition (overselling stok) dengan Pessimistic Row-Level Locking (SELECT FOR UPDATE)
- Membangun sistem antrean job terdistribusi berkecepatan tinggi dengan SELECT FOR UPDATE SKIP LOCKED

---

## Program: Checkout Aman dari Race Condition Menggunakan SELECT FOR UPDATE

```sql
-- Demonstrate high-concurrency checkout preventing overselling
-- Transaction 1: Customer checkout workflow
BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- 1. Pessimistic Lock: Acquire exclusive row lock on the product to prevent concurrent race conditions
SELECT id, sku, title, price, stock_quantity
FROM products
WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
FOR UPDATE;

-- 2. Business Logic Validation in application layer:
-- Ensure stock_quantity >= requested_quantity (e.g. requested = 2)

-- 3. Deduct inventory safely
UPDATE products
SET stock_quantity = stock_quantity - 2
WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  AND stock_quantity >= 2;

-- 4. Create Order Record
INSERT INTO orders (id, customer_id, total_amount, status, shipping_address)
VALUES (
    gen_random_uuid(),
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    33000000.00,
    'PROCESSING',
    '{"street": "Sudirman No. 45", "city": "Jakarta", "postal_code": "10220"}'::jsonb
);

-- Commit atomically writes inventory deduction and order creation
COMMIT;

-- Demonstration of SKIP LOCKED for high-throughput background worker queue
BEGIN;
SELECT id, order_id, status
FROM orders
WHERE status = 'PROCESSING'
ORDER BY created_at ASC
LIMIT 1
FOR UPDATE SKIP LOCKED;

-- Worker processes the order...
UPDATE orders SET status = 'SHIPPED' WHERE id = '...';
COMMIT;
```

---

## Konsep Kunci

### Prinsip ACID dan Jaminan Integritas Transaksi
- **Atomicity**: Seluruh statement di dalam blok `BEGIN ... COMMIT` berhasil bersamaan, atau jika terjadi kegagalan satu saja, seluruh perubahan dibatalkan sepenuhnya (`ROLLBACK`).
- **Consistency**: Transaksi membawa database dari satu kondisi valid ke kondisi valid lainnya sesuai seluruh constraint.
- **Isolation**: Menentukan seberapa terisolasi perubahan data yang sedang berlangsung dari transaksi konkuren lainnya.
- **Durability**: Sekali transaksi di-commit, datanya dijamin tersimpan permanen di disk melalui mekanisme Write-Ahead Log (WAL), bahkan jika server mati mendadak.

### Tingkat Isolasi (Isolation Levels)
1. `READ COMMITTED` (Default PostgreSQL): Transaksi hanya dapat membaca data yang sudah di-commit. Mencegah Dirty Read, namun rentan Non-Repeatable Read.
2. `REPEATABLE READ`: Menjamin snapshot data yang dibaca tetap konsisten dari awal transaksi hingga akhir. Mencegah Phantom Read di PostgreSQL.
3. `SERIALIZABLE`: Tingkat isolasi tertinggi. Menjamin hasil eksekusi transaksi konkuren setara dengan jika transaksi dijalankan satu per satu secara serial (menggunakan SSI / Serializable Snapshot Isolation).

### Pessimistic Locking dengan SELECT FOR UPDATE
Ketika flash sale berlangsung dengan ribuan permintaan checkout bersamaan untuk sisa 1 unit barang, dua request dapat membaca `stock = 1` secara paralel dan sama-sama mengizinkan pembelian. Klausa `SELECT ... FOR UPDATE` mengunci baris produk tersebut secara eksklusif. Request kedua dipaksa menunggu hingga transaksi pertama selesai (`COMMIT` atau `ROLLBACK`), sehingga pembeli kedua akan membaca sisa stok terkini (`stock = 0`) dan transaksi ditolak dengan aman.

### SKIP LOCKED untuk Job Worker Queue
Dalam arsitektur worker pengiriman pesanan, jika beberapa worker menjalankan `SELECT ... FOR UPDATE`, worker kedua akan terblokir menunggu worker pertama. Dengan menambahkan klausa `SKIP LOCKED`, worker kedua langsung melewati baris yang sedang dikerjakan worker pertama dan mengambil baris berikutnya tanpa jeda antrean sama sekali.

---

---

## Penjelasan untuk Pemula

Bayangkan Anda dan orang lain sedang berusaha membeli tiket konser sisa 1 kursi terakhir di loket yang sama pada detik yang persis sama. 

Tanpa kunci transaksi (`SELECT FOR UPDATE`), kasir bisa mencetak tiket ganda untuk kursi yang sama. Dengan `SELECT FOR UPDATE`, saat pembeli pertama menyentuh tombol kursi, sistem langsung memberi gembok virtual pada kursi tersebut. Pembeli kedua harus menunggu 2 detik sampai pembayaran pembeli pertama selesai dan melihat status kursi sudah 'Sold Out'.

## Eksperimen

- Buka dua terminal psql konkuren, jalankan BEGIN dan SELECT FOR UPDATE di terminal 1, lalu coba UPDATE baris yang sama di terminal 2 untuk melihat blocking lock
- Lakukan COMMIT di terminal 1 dan amati terminal 2 langsung terlepas dari lock
- Uji tingkat isolasi SERIALIZABLE dan sengaja picu serialisation_failure 40001 dengan modifikasi data silang
- Simulasikan worker antrean dengan 3 query konkuren menggunakan FOR UPDATE SKIP LOCKED

---

## Tantangan

Implementasikan sistem transfer saldo rekening bank antar dua nasabah (`accounts` table): gunakan `SELECT FOR UPDATE` dengan pengurutan ID akun yang konsisten (misal: lock ID terkecil dahulu baru ID terbesar) untuk mencegah terjadinya deadlock sistem.

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
- **Parameter / Atribut:** `Nama tabel, definisi kolom, batasan (PK, FK, UNIQUE)`.
- **Perilaku & Efek Sistem:** Menyiapkan tabel database dengan validasi tipe data presisi dan integritas data ACID..
- **Contoh Penggunaan Praktis:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
- **Hasil Output yang Diharapkan:**
```output
Tabel users siap menerima baris data
```

### 2. `SELECT cols FROM tbl WHERE cond ORDER BY col LIMIT n;`
- **Fungsi Utama:** Query pembacaan dan penyaringan data.
- **Parameter / Atribut:** `Kolom list, Filter WHERE, Order, Limit`.
- **Perilaku & Efek Sistem:** Mengambil rekaman data yang memenuhi kriteria pengujian secara efisien..
- **Contoh Penggunaan Praktis:**
```sql
SELECT id, email FROM users WHERE created_at > NOW() - INTERVAL '7 days' ORDER BY created_at DESC LIMIT 10;
```
- **Hasil Output yang Diharapkan:**
```output
Mengembalikan 10 baris pengguna terbaru
```

### 3. `INSERT INTO tbl (cols) VALUES (vals) RETURNING id;`
- **Fungsi Utama:** Penyisipan baris baru dengan pengembalian nilai instan.
- **Parameter / Atribut:** `Kolom target, data masukan, klausa RETURNING`.
- **Perilaku & Efek Sistem:** Menyimpan baris baru dan langsung mengembalikan nilai kolom yang digenerasi otomatis..
- **Contoh Penggunaan Praktis:**
```sql
INSERT INTO users (email) VALUES ('alex@example.com') RETURNING id, created_at;
```
- **Hasil Output yang Diharapkan:**
```output
Mengembalikan ID UUID yang baru dibuat
```

### 4. `SELECT * FROM a INNER JOIN b ON a.id = b.a_id;`
- **Fungsi Utama:** Penggabungan relasi antar tabel (Join).
- **Parameter / Atribut:** `Nama tabel, kondisi pencocokan kunci relasi ON`.
- **Perilaku & Efek Sistem:** Menggabungkan baris dari dua tabel berdasarkan relasi foreign key..
- **Contoh Penggunaan Praktis:**
```sql
SELECT u.email, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;
```
- **Hasil Output yang Diharapkan:**
```output
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

Anda telah menguasai penanganan konkurensi data: prinsip ACID, spektrum isolation levels, pencegahan race condition dengan SELECT FOR UPDATE, dan antrean paralel tanpa blokir dengan SKIP LOCKED.
