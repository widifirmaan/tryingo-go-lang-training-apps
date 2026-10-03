# Declarative Partitioning, PgBouncer & Vacuum Tuning

> **Kategori:** PostgreSQL | **Level:** Konkurensi, Partisi & Arsitektur Enterprise | **Minggu 7:** Declarative Partitioning, PgBouncer & Vacuum Tuning

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

## Ringkasan

Anda telah menguasai arsitektur database skala besar: Declarative Table Partitioning, Partition Pruning, pemahaman siklus MVCC dan Autovacuum, serta skalabilitas koneksi dengan PgBouncer.
