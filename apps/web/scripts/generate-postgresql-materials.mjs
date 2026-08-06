import { BaseGenerator } from './lib/base-generator.mjs';

const gen = new BaseGenerator('postgresql', 'PostgreSQL');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Dasar SQL dan PostgreSQL: tabel, query, join, index, fungsi.',
    descEn: 'SQL and PostgreSQL fundamentals.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'PostgreSQL lanjutan: window functions, JSONB, performa, replikasi, proyek.',
    descEn: 'Advanced PostgreSQL: window functions, JSONB, performance, replication, project.',
  },
];

const MODULES = [
  {
    week: 1, level: 'beginer', topicId: 'dasar-postgresql',
    titleId: 'Dasar PostgreSQL & Tabel', titleEn: 'PostgreSQL Basics & Tables',
    programId: 'Membuat Database & Tabel', programEn: 'Creating Database & Tables',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'sql',
    code: `-- Membuat database & tabel
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
SELECT AVG(harga) AS rata_harga FROM produk;`,
    objectivesId: ["Memahami arsitektur PostgreSQL","Membuat database dan tabel","Menggunakan SERIAL/BIGSERIAL","Memahami constraint: PK, NOT NULL, UNIQUE, DEFAULT","Query SELECT dasar dengan WHERE, COUNT, AVG"],
    objectivesEn: ["Understand PostgreSQL architecture","Create databases and tables","Use SERIAL/BIGSERIAL","Understand constraints","Run basic SELECT queries"],
    explanationId: `### Arsitektur PostgreSQL
PostgreSQL adalah RDBMS open-source yang mendukung ACID dan extensible.

### Tipe Data
INTEGER/BIGINT, DECIMAL, VARCHAR, TEXT, BOOLEAN, TIMESTAMP.

### Constraint
PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT.

### Query Dasar
SELECT, WHERE, COUNT, AVG, SUM.`,
    explanationEn: `### PostgreSQL Architecture
Open-source RDBMS supporting ACID.

### Data Types
INTEGER, DECIMAL, VARCHAR, TEXT, BOOLEAN, TIMESTAMP.

### Constraints
PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT.

### Basic Queries
SELECT with WHERE and aggregates.`,
    experimentsId: ["Tambah kolom dengan ALTER TABLE","Buat FOREIGN KEY","Coba ARRAY type","RETURNING id"],
    experimentsEn: ["Add column with ALTER TABLE","Create FOREIGN KEY","Try ARRAY type","RETURNING id"],
    challengeId: `Buat database perpustakaan: tabel buku, anggota, peminjaman.`,
    challengeEn: `Build a library database: books, members, loans.`,
    summaryId: `Minggu 1 dari 10: **Dasar PostgreSQL & Tabel** (Pemula).`,
    summaryEn: `Week 1 of 10: **PostgreSQL Basics & Tables** (Beginner).`,
  },
  {
    week: 2, level: 'beginer', topicId: 'crud-query',
    titleId: 'CRUD & Query Lanjutan', titleEn: 'CRUD & Advanced Queries',
    programId: 'Operasi Data Lengkap', programEn: 'Complete Data Operations',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'sql',
    code: `-- INSERT dengan RETURNING
INSERT INTO produk (nama, harga, stok, kategori) VALUES
    ('Webcam HD', 650000, 40, 'Aksesoris'),
    ('SSD 512GB', 950000, 35, 'Storage')
RETURNING *;

-- READ dengan kondisi
SELECT nama, harga FROM produk
    WHERE harga BETWEEN 500000 AND 3000000
    ORDER BY harga DESC;

SELECT kategori, COUNT(*) AS jumlah, AVG(harga) AS rata
    FROM produk GROUP BY kategori HAVING COUNT(*) >= 2;

-- UPDATE
UPDATE produk SET harga = harga * 0.9
    WHERE kategori = 'Aksesoris' RETURNING nama, harga;

UPDATE produk SET stok = stok - 5 WHERE nama = 'Laptop ASUS';

-- DELETE
DELETE FROM produk WHERE stok = 0;

-- Subquery
SELECT nama, harga FROM produk
    WHERE harga > (SELECT AVG(harga) FROM produk);

-- LIKE
SELECT * FROM produk WHERE nama LIKE '%Logitech%';
SELECT * FROM pelanggan WHERE kota ILIKE 'jakarta%';`,
    objectivesId: ["INSERT dengan RETURNING","UPDATE dengan WHERE","DELETE dengan WHERE","Subquery di dalam query","GROUP BY dengan HAVING"],
    objectivesEn: ["INSERT with RETURNING","UPDATE with WHERE","DELETE with WHERE","Subqueries","GROUP BY with HAVING"],
    explanationId: `### INSERT & RETURNING
RETURNING * mengembalikan baris yang baru dibuat.

### UPDATE
Ekspresi di SET: harga = harga * 0.9 untuk diskon.

### DELETE
Tanpa WHERE, semua baris terhapus!

### Subquery
Query di dalam tanda kurung.

### GROUP BY & HAVING
GROUP BY mengelompokkan, HAVING filter kelompok.`,
    explanationEn: `### INSERT & RETURNING
RETURNING * returns newly created rows.

### UPDATE
Expressions in SET clause.

### DELETE
Without WHERE, all rows deleted!

### Subqueries
Query inside parentheses.

### GROUP BY & HAVING
GROUP BY groups, HAVING filters groups.`,
    experimentsId: ["INSERT multi-baris","UPDATE dengan subquery","ILIKE search","Multiple GROUP BY"],
    experimentsEn: ["Multi-row INSERT","UPDATE with subquery","ILIKE search","Multiple GROUP BY"],
    challengeId: `Sistem inventory: update stok, hapus expired, laporan per kategori.`,
    challengeEn: `Inventory system: update stock, delete expired, category reports.`,
    summaryId: `Minggu 2 dari 10: **CRUD & Query Lanjutan** (Pemula).`,
    summaryEn: `Week 2 of 10: **CRUD & Advanced Queries** (Beginner).`,
  },
  {
    week: 3, level: 'beginer', topicId: 'join-relasi',
    titleId: 'JOIN & Relasi Tabel', titleEn: 'JOINs & Table Relations',
    programId: 'Query Multi-Tabel', programEn: 'Multi-Table Queries',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'sql',
    code: `CREATE TABLE pesanan (
    id SERIAL PRIMARY KEY,
    pelanggan_id INTEGER REFERENCES pelanggan(id),
    tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending'
);

CREATE TABLE detail_pesanan (
    id SERIAL PRIMARY KEY,
    pesanan_id INTEGER REFERENCES pesanan(id),
    produk_id INTEGER REFERENCES produk(id),
    jumlah INTEGER NOT NULL,
    harga_satuan DECIMAL(10,2) NOT NULL
);

INSERT INTO pelanggan (nama, email, kota) VALUES ('Rudi', 'rudi@mail.com', 'Medan');
INSERT INTO pesanan (pelanggan_id, status) VALUES (1,'completed'),(2,'completed'),(1,'pending');
INSERT INTO detail_pesanan (pesanan_id, produk_id, jumlah, harga_satuan) VALUES
    (1,1,1,12500000),(1,2,2,350000),(2,3,1,850000),(3,4,1,2800000);

-- INNER JOIN
SELECT p.nama AS pelanggan, ps.tanggal, ps.status
    FROM pesanan ps INNER JOIN pelanggan p ON p.id = ps.pelanggan_id;

-- LEFT JOIN
SELECT p.nama, COALESCE(COUNT(ps.id),0) AS total
    FROM pelanggan p LEFT JOIN pesanan ps ON p.id = ps.pelanggan_id
    GROUP BY p.nama;

-- Multi-JOIN 3 tabel
SELECT p.nama AS pelanggan, pr.nama AS produk,
    dp.jumlah, dp.harga_satuan,
    (dp.jumlah * dp.harga_satuan) AS subtotal
    FROM detail_pesanan dp
    JOIN pesanan ps ON ps.id = dp.pesanan_id
    JOIN pelanggan p ON p.id = ps.pelanggan_id
    JOIN produk pr ON pr.id = dp.produk_id
    ORDER BY subtotal DESC;`,
    objectivesId: ["FOREIGN KEY dan referential integrity","INNER JOIN","LEFT JOIN","Multi-JOIN 3+ tabel","Agregasi dengan JOIN"],
    objectivesEn: ["FOREIGN KEY integrity","INNER JOIN","LEFT JOIN","Multi-JOIN 3+ tables","Aggregation with JOIN"],
    explanationId: `### FOREIGN KEY
REFERENCES memastikan data terkait ada.

### INNER JOIN
Hanya baris yang cocok di kedua tabel.

### LEFT JOIN
Semua baris kiri muncul.

### Multi-JOIN
Chain JOIN ... ON ...

### Agregasi + JOIN
GROUP BY dengan JOIN untuk laporan.`,
    explanationEn: `### FOREIGN KEY
REFERENCES ensures related data exists.

### INNER JOIN
Only matching rows.

### LEFT JOIN
All left rows appear.

### Multi-JOIN
Chain JOIN ... ON ...

### Aggregation + JOIN
GROUP BY with JOIN.`,
    experimentsId: ["RIGHT JOIN","FULL OUTER JOIN","Self-join","Revenue per kota"],
    experimentsEn: ["RIGHT JOIN","FULL OUTER JOIN","Self-join","Revenue per city"],
    challengeId: `Database e-commerce: top 5 pelanggan, produk terlaris, revenue bulanan.`,
    challengeEn: `E-commerce DB: top 5 customers, best-sellers, monthly revenue.`,
    summaryId: `Minggu 3 dari 10: **JOIN & Relasi Tabel** (Pemula).`,
    summaryEn: `Week 3 of 10: **JOINs & Table Relations** (Beginner).`,
  },
  {
    week: 4, level: 'beginer', topicId: 'index-optimasi',
    titleId: 'Index & Optimasi Query', titleEn: 'Indexes & Query Optimization',
    programId: 'Performa Database', programEn: 'Database Performance',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'sql',
    code: `CREATE TABLE transaksi (
    id BIGSERIAL PRIMARY KEY,
    pelanggan_id INTEGER NOT NULL,
    produk_id INTEGER NOT NULL,
    jumlah INTEGER NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    tanggal DATE NOT NULL,
    metode_bayar VARCHAR(20)
);

INSERT INTO transaksi (pelanggan_id, produk_id, jumlah, total, tanggal, metode_bayar)
    SELECT (random()*100+1)::int, (random()*50+1)::int,
        (random()*10+1)::int, (random()*5000000+100000)::decimal(12,2),
        CURRENT_DATE - (random()*365)::int,
        (ARRAY['cash','transfer','ewallet'])[(random()*3)::int+1]
    FROM generate_series(1,1000);

EXPLAIN ANALYZE SELECT * FROM transaksi WHERE pelanggan_id = 42;

CREATE INDEX idx_transaksi_pelanggan ON transaksi(pelanggan_id);

EXPLAIN ANALYZE SELECT * FROM transaksi WHERE pelanggan_id = 42;

CREATE INDEX idx_transaksi_tanggal_bayar ON transaksi(tanggal, metode_bayar);

CREATE INDEX idx_transaksi_besar ON transaksi(total) WHERE total > 1000000;

SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'transaksi';

SELECT COUNT(*) AS total_rows, COUNT(DISTINCT pelanggan_id) AS unique_pelanggan FROM transaksi;`,
    objectivesId: ["B-tree index","EXPLAIN ANALYZE","Multi-column index","Partial index","Trade-off index"],
    objectivesEn: ["B-tree index","EXPLAIN ANALYZE","Multi-column index","Partial index","Index trade-off"],
    explanationId: `### B-tree Index
Struktur tree untuk mempercepat pencarian.

### EXPLAIN ANALYZE
Menunjukkan execution plan.

### Multi-Column Index
Urutan kolom penting.

### Partial Index
Index dengan WHERE clause.

### Trade-off
Index cepat SELECT, lambat INSERT/UPDATE.`,
    explanationEn: `### B-tree Index
Tree structure for fast lookups.

### EXPLAIN ANALYZE
Shows execution plan.

### Multi-Column Index
Column order matters.

### Partial Index
Index with WHERE clause.

### Trade-off
Fast SELECT, slower writes.`,
    experimentsId: ["Bandingkan waktu query","Index di kolom duplikat","GIN index","Analisis JOIN besar"],
    experimentsEn: ["Compare query time","Index on dup column","GIN index","Analyze large JOINs"],
    challengeId: `Tabel 10000+ baris, identifikasi slow query, tambah index, ukur perbaikan.`,
    challengeEn: `10k+ rows table, identify slow queries, add indexes, measure improvement.`,
    summaryId: `Minggu 4 dari 10: **Index & Optimasi** (Pemula).`,
    summaryEn: `Week 4 of 10: **Indexes & Optimization** (Beginner).`,
  },
  {
    week: 5, level: 'beginer', topicId: 'fungsi-trigger',
    titleId: 'Fungsi & Trigger', titleEn: 'Functions & Triggers',
    programId: 'PL/pgSQL Dasar', programEn: 'PL/pgSQL Basics',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'sql',
    code: `CREATE OR REPLACE FUNCTION hitung_total_pajak(
    harga DECIMAL, persen_pajak DECIMAL DEFAULT 11
) RETURNS DECIMAL AS $$
BEGIN
    RETURN harga + (harga * persen_pajak / 100);
END;
$$ LANGUAGE plpgsql;

SELECT nama, harga, hitung_total_pajak(harga) FROM produk;

CREATE OR REPLACE FUNCTION produk_by_kategori(kat VARCHAR)
RETURNS TABLE(id INTEGER, nama VARCHAR, harga DECIMAL) AS $$
BEGIN
    RETURN QUERY SELECT p.id, p.nama, p.harga FROM produk p WHERE p.kategori = kat;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM produk_by_kategori('Elektronik');

CREATE OR REPLACE FUNCTION kurangi_stok() RETURNS TRIGGER AS $$
BEGIN
    UPDATE produk SET stok = stok - NEW.jumlah WHERE id = NEW.produk_id;
    IF (SELECT stok FROM produk WHERE id = NEW.produk_id) < 0 THEN
        RAISE EXCEPTION 'Stok tidak cukup';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_kurangi_stok AFTER INSERT ON detail_pesanan
    FOR EACH ROW EXECUTE FUNCTION kurangi_stok();`,
    objectivesId: ["CREATE FUNCTION dengan parameter","RETURNS TABLE","Trigger function","PL/pgSQL: IF/ELSE, RAISE","DEFAULT parameter"],
    objectivesEn: ["CREATE FUNCTION","RETURNS TABLE","Trigger","PL/pgSQL: IF/ELSE","DEFAULT params"],
    explanationId: `### CREATE FUNCTION
Fungsi tersimpan di database.

### RETURNS TABLE
Mengembalikan set baris.

### Trigger
Fungsi otomatis saat event.

### PL/pgSQL
DECLARE, IF/ELSE, RAISE.

### RAISE EXCEPTION
Hentikan eksekusi dengan error.`,
    explanationEn: `### CREATE FUNCTION
Stored function.

### RETURNS TABLE
Returns row set.

### Trigger
Auto-executed on events.

### PL/pgSQL
DECLARE, IF/ELSE, RAISE.

### RAISE EXCEPTION
Stop with error.`,
    experimentsId: ["Fungsi diskon","Audit log trigger","BEFORE vs AFTER","LOOP untuk laporan"],
    experimentsEn: ["Discount function","Audit trigger","BEFORE vs AFTER","LOOP for reports"],
    challengeId: `Sistem trigger: auto-update stok, audit log, validasi.`,
    challengeEn: `Trigger system: auto stock, audit log, validation.`,
    summaryId: `Minggu 5 dari 10: **Fungsi & Trigger** (Pemula).`,
    summaryEn: `Week 5 of 10: **Functions & Triggers** (Beginner).`,
  },
  {
    week: 6, level: 'intermediate', topicId: 'window-functions',
    titleId: 'Window Functions', titleEn: 'Window Functions',
    programId: 'Analisis Data Lanjutan', programEn: 'Advanced Data Analysis',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'sql',
    code: `CREATE TABLE penjualan (
    id SERIAL PRIMARY KEY, bulan VARCHAR(7),
    produk VARCHAR(50), kategori VARCHAR(30),
    jumlah INTEGER, revenue DECIMAL(12,2)
);

INSERT INTO penjualan VALUES
    (1,'2024-01','Laptop A','Elektronik',50,600000000),
    (2,'2024-01','Laptop B','Elektronik',30,360000000),
    (3,'2024-01','Mouse','Aksesoris',200,70000000),
    (4,'2024-02','Laptop A','Elektronik',45,540000000),
    (5,'2024-02','Laptop B','Elektronik',35,420000000),
    (6,'2024-02','Mouse','Aksesoris',180,63000000),
    (7,'2024-03','Laptop A','Elektronik',60,720000000),
    (8,'2024-03','Laptop B','Elektronik',40,480000000),
    (9,'2024-03','Mouse','Aksesoris',220,77000000);

SELECT produk, bulan, revenue,
    ROW_NUMBER() OVER (PARTITION BY bulan ORDER BY revenue DESC) AS ranking
    FROM penjualan;

SELECT produk, revenue,
    RANK() OVER (ORDER BY revenue DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY revenue DESC) AS dense_rank
    FROM penjualan;

SELECT bulan, produk, revenue,
    LAG(revenue) OVER (PARTITION BY produk ORDER BY bulan) AS prev_revenue,
    revenue - LAG(revenue) OVER (PARTITION BY produk ORDER BY bulan) AS perubahan
    FROM penjualan ORDER BY produk, bulan;

SELECT bulan, produk, revenue,
    SUM(revenue) OVER (PARTITION BY produk ORDER BY bulan) AS running_total
    FROM penjualan ORDER BY produk, bulan;

SELECT bulan, produk, revenue,
    AVG(revenue) OVER (PARTITION BY produk ORDER BY bulan
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg
    FROM penjualan ORDER BY produk, bulan;`,
    objectivesId: ["ROW_NUMBER, RANK, DENSE_RANK","LAG dan LEAD","SUM/AVG dengan OVER","PARTITION BY","ROWS/RANGE frame"],
    objectivesEn: ["ROW_NUMBER, RANK, DENSE_RANK","LAG and LEAD","SUM/AVG with OVER","PARTITION BY","ROWS/RANGE frames"],
    explanationId: `### Window Functions
Menghitung di set baris terkait baris saat ini.

### ROW_NUMBER vs RANK
ROW_NUMBER unik. RANK skip untuk tie.

### LAG & LEAD
Akses baris sebelumnya/selanjutnya.

### OVER Clause
PARTITION BY, ORDER BY, ROWS/RANGE.

### Running Total
SUM() OVER (ORDER BY ...).`,
    explanationEn: `### Window Functions
Calculate over related rows.

### ROW_NUMBER vs RANK
ROW_NUMBER unique. RANK skips.

### LAG & LEAD
Access prev/next rows.

### OVER Clause
PARTITION BY, ORDER BY, frames.

### Running Total
SUM() OVER (ORDER BY ...).`,
    experimentsId: ["YoY growth dengan LAG","PERCENT_RANK","FIRST_VALUE","Deteksi outlier"],
    experimentsEn: ["YoY growth with LAG","PERCENT_RANK","FIRST_VALUE","Outlier detection"],
    challengeId: `Laporan: ranking per bulan, MoM growth, running total.`,
    challengeEn: `Report: monthly ranking, MoM growth, running total.`,
    summaryId: `Minggu 6 dari 10: **Window Functions** (Menengah).`,
    summaryEn: `Week 6 of 10: **Window Functions** (Intermediate).`,
  },
  {
    week: 7, level: 'intermediate', topicId: 'jsonb-semi-struktural',
    titleId: 'JSONB & Semi-Structured Data', titleEn: 'JSONB & Semi-Structured Data',
    programId: 'Dokument di PostgreSQL', programEn: 'Documents in PostgreSQL',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'sql',
    code: `CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50),
    payload JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO events (event_type, payload) VALUES
    ('user_signup', '{"user_id":101,"name":"Budi","email":"budi@mail.com","tags":["premium","mobile"]}'),
    ('purchase', '{"user_id":101,"items":[{"product":"Laptop","price":12500000}],"total":12500000,"payment":"credit_card"}'),
    ('page_view', '{"user_id":101,"page":"/products","duration_ms":45000,"referrer":"google.com"}');

SELECT id, payload->>'name' AS nama, payload->>'email' AS email
    FROM events WHERE event_type = 'user_signup';

SELECT id, jsonb_array_elements_text(payload->'tags') AS tag
    FROM events WHERE event_type = 'user_signup';

SELECT * FROM events WHERE payload @> '{"user_id":101}';
SELECT * FROM events WHERE payload->>'payment' = 'credit_card';
SELECT * FROM events WHERE payload ? 'referrer';

UPDATE events SET payload = payload || '{"status":"processed"}'::jsonb
    WHERE event_type = 'purchase';

UPDATE events SET payload = jsonb_set(payload, '{name}', '"Budi Santoso"')
    WHERE event_type = 'user_signup';

CREATE INDEX idx_events_payload ON events USING GIN (payload);

SELECT event_type, COUNT(*) AS total,
    SUM((payload->>'total')::numeric) AS revenue
    FROM events GROUP BY event_type;`,
    objectivesId: ["Tipe JSONB","Operator -> dan ->>","@> containment operator","jsonb_set dan ||","GIN index"],
    objectivesEn: ["JSONB type","Operators -> and ->>","@> containment","jsonb_set and ||","GIN index"],
    explanationId: `### JSONB
Format binary untuk JSON di PostgreSQL.

### Operator Akses
-> JSON object, ->> text.

### Operator Query
@>: containment, ?: key exists.

### Update JSONB
||: merge, jsonb_set: replace at path.

### GIN Index
Index khusus untuk JSONB.`,
    explanationEn: `### JSONB
Binary format for JSON.

### Access Operators
-> JSON object, ->> text.

### Query Operators
@>: containment, ?: key exists.

### JSONB Updates
||: merge, jsonb_set: replace.

### GIN Index
Special index for JSONB.`,
    experimentsId: ["Filter nested JSON","jsonb_array_elements","Agregasi JSONB","CHECK validation"],
    experimentsEn: ["Filter nested JSON","jsonb_array_elements","JSONB aggregation","CHECK validation"],
    challengeId: `Tabel produk dengan atribut fleksibel (JSONB).`,
    challengeEn: `Products table with flexible attributes (JSONB).`,
    summaryId: `Minggu 7 dari 10: **JSONB & Semi-Structured Data** (Menengah).`,
    summaryEn: `Week 7 of 10: **JSONB & Semi-Structured Data** (Intermediate).`,
  },
  {
    week: 8, level: 'intermediate', topicId: 'performa-tuning',
    titleId: 'Performa & Tuning', titleEn: 'Performance & Tuning',
    programId: 'Optimasi PostgreSQL', programEn: 'PostgreSQL Optimization',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'sql',
    code: `EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
    SELECT p.nama, SUM(dp.jumlah * dp.harga_satuan) AS total
    FROM detail_pesanan dp
    JOIN pesanan ps ON ps.id = dp.pesanan_id
    JOIN pelanggan p ON p.id = ps.pelanggan_id
    WHERE ps.tanggal > CURRENT_DATE - INTERVAL '30 days'
    GROUP BY p.nama ORDER BY total DESC;

CREATE MATERIALIZED VIEW mv_penjualan_bulanan AS
SELECT
    DATE_TRUNC('month', ps.tanggal) AS bulan,
    pr.kategori,
    COUNT(*) AS total_transaksi,
    SUM(dp.jumlah) AS total_unit,
    SUM(dp.jumlah * dp.harga_satuan) AS total_revenue
FROM detail_pesanan dp
JOIN pesanan ps ON ps.id = dp.pesanan_id
JOIN produk pr ON pr.id = dp.produk_id
GROUP BY DATE_TRUNC('month', ps.tanggal), pr.kategori;

REFRESH MATERIALIZED VIEW mv_penjualan_bulanan;
SELECT * FROM mv_penjualan_bulanan ORDER BY bulan DESC;

VACUUM ANALYZE produk;

SELECT relname, n_dead_tup, last_vacuum
    FROM pg_stat_user_tables
    WHERE n_dead_tup > 0 ORDER BY n_dead_tup DESC;

SELECT indexrelname, idx_scan AS times_used
    FROM pg_stat_user_indexes ORDER BY idx_scan DESC;

SELECT relname, pg_size_pretty(pg_total_relation_size(relid)) AS total_size
    FROM pg_stat_user_tables ORDER BY pg_total_relation_size(relid) DESC;`,
    objectivesId: ["EXPLAIN dengan BUFFERS","Materialized View","VACUUM dan ANALYZE","Konfigurasi PostgreSQL","Monitoring pg_stat"],
    objectivesEn: ["EXPLAIN with BUFFERS","Materialized View","VACUUM and ANALYZE","PostgreSQL config","pg_stat monitoring"],
    explanationId: `### EXPLAIN BUFFERS
Menunjukkan I/O, cache hit, waktu query.

### Materialized View
Simpan hasil query berat.

### VACUUM
Bersihkan dead tuples. ANALYZE update statistik.

### Konfigurasi
shared_buffers 25% RAM, work_mem untuk sort.

### Monitoring
pg_stat_user_tables untuk aktivitas tabel.`,
    explanationEn: `### EXPLAIN BUFFERS
Shows I/O, cache hit, query time.

### Materialized View
Store heavy query results.

### VACUUM
Clean dead tuples. ANALYZE updates stats.

### Configuration
shared_buffers 25% RAM.

### Monitoring
pg_stat_user_tables for table activity.`,
    experimentsId: ["MV dengan index","VACUUM FULL vs biasa","Slow query log","work_mem tuning"],
    experimentsEn: ["MV with index","VACUUM FULL vs regular","Slow query log","work_mem tuning"],
    challengeId: `Optimasi: 5 slow query, tambah index, materialized view.`,
    challengeEn: `Optimize: 5 slow queries, add indexes, materialized view.`,
    summaryId: `Minggu 8 dari 10: **Performa & Tuning** (Menengah).`,
    summaryEn: `Week 8 of 10: **Performance & Tuning** (Intermediate).`,
  },
  {
    week: 9, level: 'intermediate', topicId: 'replikasi-ha',
    titleId: 'Replikasi & High Availability', titleEn: 'Replication & High Availability',
    programId: 'Streaming Replication', programEn: 'Streaming Replication',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'sql',
    code: `-- KONFIGURASI PRIMARY (postgresql.conf)
-- wal_level = replica
-- max_wal_senders = 10
-- hot_standby = on

CREATE USER replicator WITH REPLICATION ENCRYPTED PASSWORD 'secure_pass';

SELECT * FROM pg_create_physical_replication_slot('standby_slot');

-- pg_basebackup -h primary_host -D /data -U replicator -P -Xs -R

-- Cek status replikasi (primary)
SELECT
    client_addr, state, sent_lsn, replay_lsn,
    (sent_lsn - replay_lsn) AS replication_lag
    FROM pg_stat_replication;

-- Cek status (standby)
SELECT
    last_msg_receipt_time,
    EXTRACT(EPOCH FROM (now() - last_msg_receipt_time)) AS lag_seconds
    FROM pg_stat_wal_receiver;

-- Logical Replication
CREATE PUBLICATION pub_produk FOR TABLE produk;

-- Monitoring lag
SELECT slot_name, confirmed_flush_lsn,
    (pg_current_wal_lsn() - confirmed_flush_lsn) AS lag_bytes
    FROM pg_replication_slots;`,
    objectivesId: ["WAL dan streaming replication","Konfigurasi primary/standby","Replication slot","Logical replication","Monitoring lag"],
    objectivesEn: ["WAL and streaming replication","Primary/standby config","Replication slots","Logical replication","Lag monitoring"],
    explanationId: `### WAL
Log semua perubahan sebelum ditulis ke data file.

### Streaming Replication
Primary kirim WAL records ke standby.

### Replication Slot
Pastikan WAL tidak dihapus sebelum diterima.

### Logical Replication
Replikasi tabel spesifik.

### Monitoring
pg_stat_replication untuk lag.`,
    explanationEn: `### WAL
Log of all changes before writing.

### Streaming Replication
Primary sends WAL to standby.

### Replication Slots
Ensure WAL not deleted.

### Logical Replication
Replicate specific tables.

### Monitoring
pg_stat_replication for lag.`,
    experimentsId: ["Setup Docker replication","Ukur lag dengan pgbench","Logical replication","Simulasi failover"],
    experimentsEn: ["Docker replication setup","Measure lag with pgbench","Logical replication","Simulate failover"],
    challengeId: `Setup replikasi: primary + standby + monitoring + failover.`,
    challengeEn: `Setup replication: primary + standby + monitoring + failover.`,
    summaryId: `Minggu 9 dari 10: **Replikasi & HA** (Menengah).`,
    summaryEn: `Week 9 of 10: **Replication & HA** (Intermediate).`,
  },
  {
    week: 10, level: 'intermediate', topicId: 'capstone-project',
    titleId: 'Capstone: E-Commerce Database', titleEn: 'Capstone: E-Commerce Database',
    programId: 'Database Production-Ready', programEn: 'Production-Ready Database',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'sql',
    code: `-- CAPSTONE: E-Commerce Database

CREATE TABLE categories (
    id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, slug VARCHAR(100) UNIQUE
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    name VARCHAR(200) NOT NULL, sku VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(12,2) NOT NULL, stock INTEGER DEFAULT 0,
    attributes JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL, city VARCHAR(50)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    status VARCHAR(20) DEFAULT 'pending',
    total DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL, unit_price DECIMAL(12,2) NOT NULL
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_products_attrs ON products USING GIN (attributes);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_timestamp
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE VIEW v_sales_report AS
SELECT c.name AS category, COUNT(DISTINCT o.id) AS total_orders,
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
JOIN categories c ON c.id = p.category_id
JOIN orders o ON o.id = oi.order_id
WHERE o.status = 'completed'
GROUP BY c.name;

CREATE MATERIALIZED VIEW mv_dashboard AS
SELECT
    (SELECT COUNT(*) FROM products) AS total_products,
    (SELECT COUNT(*) FROM customers) AS total_customers,
    (SELECT COALESCE(SUM(total),0) FROM orders WHERE status='completed') AS revenue;`,
    objectivesId: ["Schema production-ready","JSONB untuk atribut fleksibel","Trigger auto-update","Materialized View dashboard","Window functions"],
    objectivesEn: ["Production-ready schema","JSONB for flexible attrs","Auto-update trigger","Materialized View dashboard","Window functions"],
    explanationId: `### Schema Design
Relasi antar tabel dengan foreign key.

### JSONB
Atribut produk fleksibel.

### Trigger
Auto-update updated_at.

### Materialized View
Dashboard dengan data agregat.

### Window Functions
Ranking produk per kategori.`,
    explanationEn: `### Schema Design
Table relations with foreign keys.

### JSONB
Flexible product attributes.

### Triggers
Auto-update timestamps.

### Materialized Views
Aggregated dashboard data.

### Window Functions
Product ranking per category.`,
    experimentsId: ["Soft delete","Full-text search","Partitioning","Audit log"],
    experimentsEn: ["Soft delete","Full-text search","Partitioning","Audit log"],
    challengeId: `Deploy database e-commerce lengkap.`,
    challengeEn: `Deploy complete e-commerce database.`,
    summaryId: `Minggu 10 dari 10: **Capstone: E-Commerce DB** (Menengah). Selesai!`,
    summaryEn: `Week 10 of 10: **Capstone: E-Commerce DB** (Intermediate). Complete!`,
  },
];

for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week,
    topicId: m.topicId,
    titleId: m.titleId,
    titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
