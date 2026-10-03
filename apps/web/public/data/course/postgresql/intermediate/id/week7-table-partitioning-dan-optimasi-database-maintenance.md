# Declarative Partitioning, PgBouncer & Vacuum Tuning

> **Kategori:** PostgreSQL | **Level:** Konkurensi, Partisi & Arsitektur Enterprise | **Minggu 7:** Declarative Partitioning, PgBouncer & Vacuum Tuning
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Merancang Declarative Table Partitioning (Range, List, Hash) untuk mengelola data berukuran ratusan gigabyte
- Membuktikan efektivitas Partition Pruning pada query optimizer PostgreSQL
- Memahami model penyimpanan MVCC (Multi-Version Concurrency Control) dan siklus hidup Dead Tuples
- Mengonfigurasi parameter Autovacuum dan arsitektur Connection Pooling dengan PgBouncer

---

## Program: Implementasi Range Partitioning Berdasarkan Waktu dan Monitoring Vacuum MVCC

```sql
-- 1. Declarative Table Partitioning by Range (Date/Year)
DROP TABLE IF EXISTS telemetry_events CASCADE;

CREATE TABLE telemetry_events (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    device_id VARCHAR(50) NOT NULL,
    event_type VARCHAR(30) NOT NULL,
    payload JSONB NOT NULL,
    event_timestamp TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (id, event_timestamp) -- Partition key must be part of composite primary key
) PARTITION BY RANGE (event_timestamp);

-- 2. Create physical partition tables for specific quarterly ranges
CREATE TABLE telemetry_events_2026_q1 PARTITION OF telemetry_events
    FOR VALUES FROM ('2026-01-01 00:00:00+00') TO ('2026-04-01 00:00:00+00');

CREATE TABLE telemetry_events_2026_q2 PARTITION OF telemetry_events
    FOR VALUES FROM ('2026-04-01 00:00:00+00') TO ('2026-07-01 00:00:00+00');

CREATE TABLE telemetry_events_2026_q3 PARTITION OF telemetry_events
    FOR VALUES FROM ('2026-07-01 00:00:00+00') TO ('2026-10-01 00:00:00+00');

CREATE TABLE telemetry_events_default PARTITION OF telemetry_events DEFAULT;

-- Insert sample telemetry data across quarters
INSERT INTO telemetry_events (device_id, event_type, payload, event_timestamp) VALUES
('DEV-001', 'HEARTBEAT', '{"cpu": 12.4, "temp": 45}'::jsonb, '2026-02-15 10:00:00+00'),
('DEV-002', 'ALERT', '{"code": "VOLT_DROP"}'::jsonb, '2026-05-20 14:30:00+00');

-- 3. Verify Partition Pruning in execution plan: PostgreSQL scans ONLY q1 partition!
EXPLAIN (ANALYZE, COSTS OFF)
SELECT * FROM telemetry_events
WHERE event_timestamp >= '2026-02-01' AND event_timestamp < '2026-03-01';

-- 4. Monitor MVCC Dead Tuples and Autovacuum Health
SELECT 
    schemaname,
    relname AS table_name,
    n_live_tup AS live_tuples,
    n_dead_tup AS dead_tuples,
    ROUND(100.0 * n_dead_tup / NULLIF(n_live_tup + n_dead_tup, 0), 2) AS dead_tuple_ratio_pct,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;
```

---

## Konsep Kunci

### Mengapa Membutuhkan Table Partitioning?
Ketika sebuah tabel relasional membengkak melebihi puluhan juta baris atau ratusan gigabyte, ukuran index B-Tree tidak lagi muat di dalam RAM server (Buffer Pool). Akibatnya, setiap query pencarian memaksa operasi disk read I/O yang lambat. **Table Partitioning** memecah tabel logis tunggal menjadi beberapa tabel fisik yang lebih kecil tanpa mengubah cara aplikasi menulis query SQL.

### Partition Pruning: Efisiensi Pencarian Maksimal
Fitur **Partition Pruning** pada query optimizer secara otomatis membaca filter `WHERE` pada query Anda. Jika query mencari data bulan Februari 2026, PostgreSQL hanya akan memindai partisi `telemetry_events_2026_q1` dan sama sekali tidak menyentuh partisi kuartal lainnya. Hal ini memangkas waktu eksekusi hingga 90%+.

### Arsitektur MVCC dan Dead Tuples
PostgreSQL menggunakan model **MVCC** (*Multi-Version Concurrency Control*). Saat operasi `UPDATE` dijalankan, PostgreSQL tidak menimpa data lama di disk, melainkan menandai baris lama sebagai *dead tuple* dan menulis baris baru secara terpisah. Operasi `DELETE` hanya menandai baris sebagai tidak valid. Jika tidak dibersihkan, dead tuples menyebabkan fenomena *table bloat* (tabel membesar tanpa pertambahan data nyata).

### Autovacuum dan Connection Pooling PgBouncer
Proses latar belakang **Autovacuum** bertanggung jawab mereklamasi ruang kosong dari dead tuples agar dapat digunakan kembali oleh data baru. Di tingkat koneksi, setiap koneksi PostgreSQL mengonsumsi proses OS terpisah (~10MB RAM per koneksi). **PgBouncer** bertindak sebagai reverse proxy connection pooler ringan yang mengizinkan ribuan klien web konkuren dilayani hanya oleh puluhan koneksi database aktif.

---

---

## Penjelasan untuk Pemula

Bayangkan Anda menyimpan struk belanja selama 10 tahun di dalam satu kotak kardus raksasa. Jika Anda ingin mencari struk bulan lalu, Anda harus mengaduk-aduk ribuan struk berdebu selama berjam-jam. 

Table Partitioning seperti membagi struk ke dalam map terpisah: Map 2024, Map 2025, Map 2026. Saat mencari struk 2026, Anda langsung mengambil Map 2026 saja (Partition Pruning). Sedangkan Autovacuum seperti petugas kebersihan yang setiap malam menyapu struk yang sudah robek dan dibatalkan agar kotak tidak kepenuhan sampah.

## Eksperimen

- Jalankan EXPLAIN pada query partisi dan amati keterangan "Filter: ... Partitions: telemetry_events_2026_q1"
- Lakukan 1.000 kali UPDATE berturut-turut pada satu baris dan amati pertambahan n_dead_tup pada tabel pg_stat_user_tables
- Jalankan VACUUM (VERBOSE, ANALYZE) secara manual dan perhatikan pembersihan dead tuples di statistik
- Buat skenario drop partition instan dengan DROP TABLE telemetry_events_2026_q1 dan bandingkan kecepatannya dibanding DELETE jutaan baris

---

## Tantangan

Konfigurasi skema partisi Hash (`PARTITION BY HASH (customer_id)`) menjadi 4 partisi seimbang (`MODULUS 4`) untuk mendistribusikan beban I/O transaksi e-commerce multi-tenant secara merata.

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

Anda telah menguasai arsitektur database skala besar: Declarative Table Partitioning, Partition Pruning, pemahaman siklus MVCC dan Autovacuum, serta skalabilitas koneksi dengan PgBouncer.
