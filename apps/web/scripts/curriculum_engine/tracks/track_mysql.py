import sys
import os

def get_track():
    levels = [
        {
            'levelId': 'beginer',
            'nameId': 'Fondasi Relasional & Engine InnoDB',
            'nameEn': 'Relational Foundations & InnoDB Engine',
            'descId': 'Struktur penyimpanan InnoDB, primary clustered index, tipe data presisi, optimasi composite index, dan fitur modern MySQL 8+.',
            'descEn': 'InnoDB storage architecture, primary clustered indexing, precision data types, composite index optimization, and modern MySQL 8+ features.',
        },
        {
            'levelId': 'intermediate',
            'nameId': 'Konkurensi Transaksi, Replikasi & Skalabilitas Sharding',
            'nameEn': 'Transaction Concurrency, Replication & Sharding Scalability',
            'descId': 'Gap locks, next-key locking, deadlock detection, replikasi GTID multi-node, dan capstone financial ledger double-entry.',
            'descEn': 'Gap locks, next-key locking, deadlock detection, GTID multi-node replication, and double-entry financial ledger capstone.',
        }
    ]

    modules = [
        # WEEK 1
        {
            'week': 1,
            'level': 'beginer',
            'levelNameId': 'Fondasi Relasional & Engine InnoDB',
            'levelNameEn': 'Relational Foundations & InnoDB Engine',
            'topicId': 'arsitektur-innodb-skema-dan-tipe-data-presisi',
            'titleId': 'Arsitektur Mesin InnoDB, Skema & Tipe Data Presisi',
            'titleEn': 'InnoDB Engine Architecture, Schema & Precision Data Types',
            'language': 'sql',
            'programId': 'Skema Dompet Digital Finansial dengan Engine InnoDB dan Constraint Strict',
            'programEn': 'Financial Digital Wallet Schema with InnoDB Engine and Strict Constraints',
            'code': """-- Set strict SQL mode to prevent silent truncation and implicit conversions
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
""",
            'objectivesId': [
                'Memahami arsitektur internal penyimpanan MySQL: InnoDB vs MyISAM',
                'Mengonfigurasi sql_mode STRICT_TRANS_TABLES untuk pencegahan silent truncation bug',
                'Merancang primary key Clustered Index (BIGINT UNSIGNED vs UUID)',
                'Menggunakan DECIMAL untuk presisi mata uang dan penanganan charset utf8mb4'
            ],
            'objectivesEn': [
                'Understand MySQL internal storage architecture: InnoDB vs MyISAM',
                'Configure sql_mode STRICT_TRANS_TABLES to prevent dangerous silent truncation bugs',
                'Design high-throughput Clustered Index primary keys (BIGINT UNSIGNED vs UUID)',
                'Enforce DECIMAL currency precision and configure full utf8mb4 unicode collation'
            ],
            'explanationId': """### Arsitektur Mesin Penyimpanan InnoDB
Secara default sejak MySQL 5.5, **InnoDB** adalah mesin penyimpanan standar yang mendukung ACID (*Atomicity, Consistency, Isolation, Durability*). InnoDB menyimpan tabel menggunakan struktur **Clustered Index**, yang berarti seluruh data baris secara fisik diurutkan dan disimpan langsung di daun (*leaf nodes*) pohon B+Tree Primary Key. Memilih primary key yang sekuensial (seperti `BIGINT UNSIGNED AUTO_INCREMENT`) menjaga proses insert tetap efisien tanpa memicu *page splitting* disk yang mahal.

### Pentingnya sql_mode STRICT_TRANS_TABLES
Secara historis, konfigurasi bawaan MySQL kerap mengonversi data secara otomatis (*silent truncation*) jika nilai melebihi batas panjang kolom. Mengaktifkan `sql_mode = 'STRICT_TRANS_TABLES'` memastikan MySQL melempar error keras dan menggagalkan transaksi jika terdapat tipe data yang tidak cocok atau string yang melebihi batas kolom.

### Presisi DECIMAL vs FLOAT dan Encoding utf8mb4
- **DECIMAL(15, 2)**: Menyimpan angka pecahan secara exact representation (titik tetap). Sangat wajib digunakan untuk saldo finansial, persentase pajak, dan harga guna menghindari galat pembulatan biner `FLOAT`/`DOUBLE`.
- **utf8mb4**: Encoding UTF-8 sejati 4-byte di MySQL yang mendukung penuh karakter emoji modern dan simbol internasional. Karakteristik ini memerlukan batasan panjang kolom maksimal 191 karakter pada index lama (767-byte limit).""",
            'explanationEn': """### InnoDB Storage Engine Architecture
Since MySQL 5.5, **InnoDB** serves as the default storage engine providing full ACID compliance. InnoDB implements a **Clustered Index** architecture: actual table data rows are physically embedded directly within the leaf nodes of the primary key B+Tree. Selecting a sequential primary key (such as `BIGINT UNSIGNED AUTO_INCREMENT`) ensures append-only write patterns, completely avoiding expensive physical disk page splits.

### Strict SQL Modes vs Silent Truncation
Historically, default MySQL installations exhibited dangerous silent data truncations when payloads exceeded column specifications. Enforcing `sql_mode = 'STRICT_TRANS_TABLES'` instructs the parser to fail transactions immediately with hard exceptions whenever type invariants or column constraints are breached.

### DECIMAL Precision vs Floating-Point and utf8mb4 Collation
- **DECIMAL(15, 2)**: Employs exact fixed-point binary representation. Essential for monetary ledgers, tax computations, and asset valuation to eliminate floating-point rounding errors.
- **utf8mb4**: True 4-byte UTF-8 encoding accommodating modern emojis and complex Asian character sets. Requires indexing considerations (maximum 191 characters for default 767-byte prefix limits in older tables).""",
            'beginnerId': """Bayangkan database InnoDB seperti buku katalog hotel berbintang. Nomor kamar (`101, 102, 103`) adalah Primary Key. Karena kamar diurutkan rapi, resepsionis bisa langsung berjalan ke lantai dan pintu yang tepat dalam hitungan detik. 

Tipe `DECIMAL` seperti kasir bank yang menghitung uang logam satu per satu sampai sen terkecil, bukan menebak-nebak seperti kalkulator pembulatan biasa. Sedangkan `utf8mb4` memastikan aplikasi Anda bisa menerima nama dengan emoji bendera atau karakter huruf Arab/Jepang tanpa menjadi tanda tanya rusak (????).""",
            'beginnerEn': """Imagine an InnoDB table like a luxury hotel directory. Room numbers (`101, 102, 103`) serve as the Primary Key. Because rooms are physically sequential, front desk staff can march straight to the correct door in seconds.

The `DECIMAL` data type is like a meticulous bank teller counting physical pennies down to the exact fraction, eliminating rounding approximations. Meanwhile, `utf8mb4` guarantees that user profiles featuring flag emojis or Japanese characters display cleanly without mutating into garbled question marks (????).""",
            'experimentsId': [
                'Coba masukkan saldo negatif ke user_wallets dan amati penolakan oleh CHECK constraint',
                'Masukkan teks emoji ke kolom full_name dan verifikasi penyimpanan bersih menggunakan utf8mb4',
                'Bandingkan ukuran tabel dan kecepatan insert antara UUID sebagai primary key vs BIGINT AUTO_INCREMENT',
                'Uji perilaku sql_mode kosong vs STRICT_TRANS_TABLES saat memasukkan string 250 karakter ke VARCHAR(100)'
            ],
            'experimentsEn': [
                'Attempt inserting a negative balance into user_wallets and verify rejection by the CHECK constraint',
                'Insert emoji characters into full_name and verify seamless storage enabled by utf8mb4',
                'Benchmark table footprint and write latency between UUID primary keys versus BIGINT AUTO_INCREMENT',
                'Compare empty sql_mode versus STRICT_TRANS_TABLES behavior when inserting 250 characters into a VARCHAR(100)'
            ],
            'challengeId': 'Buat tabel `currency_exchange_rates` dengan pasangan mata uang (`base_currency`, `quote_currency`), nilai kurs bertipe `DECIMAL(18, 8)`, dan timestamp presisi mikrodetik `DATETIME(6)`.',
            'challengeEn': 'Build a `currency_exchange_rates` table featuring currency pairs (`base_currency`, `quote_currency`), exchange rate value with `DECIMAL(18, 8)`, and microsecond timestamp `DATETIME(6)`.',
            'summaryId': 'Anda telah memahami arsitektur internal InnoDB, keunggulan Clustered Index sekuensial, disiplin STRICT sql_mode, serta presisi data DECIMAL dan utf8mb4.',
            'summaryEn': 'You have mastered InnoDB engine fundamentals, sequential Clustered Indexing mechanics, STRICT sql_mode governance, and DECIMAL / utf8mb4 precision.'
        },

        # WEEK 2
        {
            'week': 2,
            'level': 'beginer',
            'levelNameId': 'Fondasi Relasional & Engine InnoDB',
            'levelNameEn': 'Relational Foundations & InnoDB Engine',
            'topicId': 'join-optimasi-agregasi-dan-subqueries',
            'titleId': 'Multi-Table Joins, Agregasi & Subquery Lanjutan',
            'titleEn': 'Multi-Table Joins, Aggregation & Advanced Subqueries',
            'language': 'sql',
            'programId': 'Laporan Rekonsiliasi Dompet Pengguna dengan Multi-Table Joins dan Agregasi',
            'programEn': 'User Wallet Reconciliation Report with Multi-Table Joins and Aggregation',
            'code': """-- Create transactions ledger table for reconciliation
CREATE TABLE wallet_ledgers (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    wallet_id BIGINT UNSIGNED NOT NULL,
    transaction_code VARCHAR(64) NOT NULL,
    direction ENUM('CREDIT', 'DEBIT') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    fee DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    status ENUM('PENDING', 'SUCCESS', 'FAILED') NOT NULL DEFAULT 'PENDING',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_tx_code (transaction_code),
    KEY idx_wallet_status_created (wallet_id, status, created_at),
    CONSTRAINT fk_ledger_wallet FOREIGN KEY (wallet_id) REFERENCES user_wallets(id)
) ENGINE=InnoDB;

-- Insert sample transactional entries
INSERT INTO wallet_ledgers (wallet_id, transaction_code, direction, amount, fee, status, created_at) VALUES
(1, 'TX-1001', 'CREDIT', 1000000.00, 0.00, 'SUCCESS', '2026-03-01 10:00:00'),
(1, 'TX-1002', 'DEBIT', 250000.00, 2500.00, 'SUCCESS', '2026-03-02 11:30:00'),
(1, 'TX-1003', 'DEBIT', 150000.00, 2500.00, 'SUCCESS', '2026-03-05 14:15:00'),
(2, 'TX-2001', 'CREDIT', 5000000.00, 0.00, 'SUCCESS', '2026-03-03 09:00:00'),
(2, 'TX-2002', 'CREDIT', 2000000.00, 0.00, 'FAILED', '2026-03-04 16:00:00');

-- Comprehensive user financial balance reconciliation query
SELECT 
    u.id AS user_id,
    u.full_name,
    u.email,
    w.currency,
    w.balance AS current_wallet_balance,
    COALESCE(ledger_summary.total_credit, 0.00) AS total_inflow,
    COALESCE(ledger_summary.total_debit, 0.00) AS total_outflow,
    COALESCE(ledger_summary.total_fees_paid, 0.00) AS total_fees,
    (COALESCE(ledger_summary.total_credit, 0.00) - COALESCE(ledger_summary.total_debit, 0.00) - COALESCE(ledger_summary.total_fees_paid, 0.00)) AS computed_net_flow
FROM app_users u
INNER JOIN user_wallets w ON u.id = w.user_id
LEFT JOIN (
    -- Subquery aggregate per wallet
    SELECT 
        l.wallet_id,
        SUM(CASE WHEN l.direction = 'CREDIT' THEN l.amount ELSE 0 END) AS total_credit,
        SUM(CASE WHEN l.direction = 'DEBIT' THEN l.amount ELSE 0 END) AS total_debit,
        SUM(l.fee) AS total_fees_paid,
        COUNT(l.id) AS successful_transactions_count
    FROM wallet_ledgers l
    WHERE l.status = 'SUCCESS'
    GROUP BY l.wallet_id
) AS ledger_summary ON w.id = ledger_summary.wallet_id
ORDER BY current_wallet_balance DESC;
""",
            'objectivesId': [
                'Menguasai penggabungan relasi multi-tabel dengan INNER JOIN dan LEFT JOIN',
                'Menggunakan conditional aggregation (SUM dengan ekspresi CASE WHEN)',
                'Mencegah duplikasi kalkulasi agregasi melalui derived tables / subqueries',
                'Memahami peran indeks foreign key dalam mempercepat eksekusi Join pada InnoDB'
            ],
            'objectivesEn': [
                'Master multi-table relational joins combining INNER and LEFT joins',
                'Implement conditional aggregations using SUM with inline CASE WHEN expressions',
                'Prevent Cartesian product calculation explosions using derived subqueries',
                'Understand foreign key indexing dynamics in accelerating InnoDB join queries'
            ],
            'explanationId': """### Optimasi Multi-Table Join pada Mesin InnoDB
Saat mengeksekusi perintah `JOIN`, pengoptimal query MySQL mengevaluasi urutan penggabungan tabel (*join order*). MySQL umumnya memilih tabel yang menghasilkan baris hasil saring terkecil sebagai pengemudi (*driving table*). Sangat krusial memastikan setiap kolom `FOREIGN KEY` memiliki index; jika tidak, MySQL terpaksa melakukan algoritma Block Nested-Loop (BNL) atau Hash Join yang membebani memori server.

### Agregasi Bersyarat (Conditional Aggregation)
Dalam pembukuan finansial, kita sering perlu memisahkan total dana masuk (`CREDIT`) dan dana keluar (`DEBIT`) dari satu kolom nilai transaksi yang sama. Pola `SUM(CASE WHEN direction = 'CREDIT' THEN amount ELSE 0 END)` memungkinkan kalkulasi multi-dimensi dilakukan dalam satu kali pembacaan data tabel (*single pass*), menghemat I/O secara drastis.

### Derived Tables vs JOIN Cartesian Product
Jika Anda langsung menggabungkan tabel `app_users` ke `user_wallets` lalu langsung ke `wallet_ledgers` dengan `GROUP BY u.id`, Anda berisiko memicu ledakan perkalian baris (*Cartesian product*) jika pengguna memiliki banyak dompet dan transaksi. Pola membungkus agregasi ke dalam subquery turunan (*derived table*) terlebih dahulu sebelum di-join ke tabel pengguna menjamin integritas perhitungan angka.""",
            'explanationEn': """### Optimizing Multi-Table Joins in InnoDB
During `JOIN` execution, the MySQL query optimizer determines the most efficient join order, typically choosing the relation with the most selective filter as the driving table. Indexing all `FOREIGN KEY` references is mandatory; absent indexes force MySQL to revert to expensive Block Nested-Loop (BNL) or in-memory Hash Joins.

### Conditional Aggregation Mechanics
Financial systems frequently require separating total inflows (`CREDIT`) and outflows (`DEBIT`) stored within a unified ledger amount column. The idiom `SUM(CASE WHEN direction = 'CREDIT' THEN amount ELSE 0 END)` calculates multi-dimensional business metrics within a single disk pass, significantly shrinking memory bandwidth.

### Derived Tables Preventing Cartesian Explosions
Joining `app_users` directly to `user_wallets` and subsequently to `wallet_ledgers` followed by a top-level `GROUP BY` introduces Cartesian multiplication hazards when users hold multiple currency accounts. Pre-aggregating ledger transactions inside an isolated derived table prior to joining top-level entities guarantees mathematical precision.""",
            'beginnerId': """Bayangkan Anda seorang akuntan yang memeriksa buku kasir. Jika Anda menghitung pemasukan dan pengeluaran dengan dua kali membaca buku dari awal sampai akhir, Anda membuang waktu dua kali lipat. 

Dengan conditional aggregation (`CASE WHEN`), Anda membuka halaman buku kasir sekali saja: tangan kiri mencatat uang masuk, tangan kanan mencatat uang keluar secara serempak.""",
            'beginnerEn': """Imagine acting as a bank auditor inspecting ledger books. If you tally inflows first and then reread the entire book from scratch to tally outflows, you burn double the time.

With conditional aggregation (`CASE WHEN`), you perform a single pass through the ledger: your left hand tallies deposits while your right hand simultaneously tallies withdrawals.""",
            'experimentsId': [
                'Ganti LEFT JOIN dengan INNER JOIN dan amati hilangnya user yang belum pernah memiliki riwayat transaksi',
                'Tambahkan filter HAVING total_inflow > 2000000 pada derived table dan lihat pengaruhnya pada laporan akhir',
                'Analisis perbedaan performa query dengan menambahkan 10.000 data dummy ke tabel wallet_ledgers',
                'Gunakan fungsi DATE_SUB(NOW(), INTERVAL 30 DAY) untuk membatasi transaksi hanya dalam 30 hari terakhir'
            ],
            'experimentsEn': [
                'Replace LEFT JOIN with INNER JOIN and observe the elimination of users with no transactional history',
                'Append a HAVING total_inflow > 2000000 clause inside the derived table and inspect final reports',
                'Profile query execution characteristics after seeding 10,000 synthetic rows into wallet_ledgers',
                'Incorporate DATE_SUB(NOW(), INTERVAL 30 DAY) to filter historical transactions strictly within 30 days'
            ],
            'challengeId': 'Tuliskan query untuk mendeteksi anomali selisih saldo (*balance drift*): bandingkan nilai `user_wallets.balance` dengan akumulasi `SUM(CREDIT) - SUM(DEBIT) - SUM(fee)` di `wallet_ledgers`, dan tampilkan hanya akun yang saldonya tidak klop.',
            'challengeEn': 'Write a balance discrepancy detection query: compare `user_wallets.balance` against `SUM(CREDIT) - SUM(DEBIT) - SUM(fee)` from `wallet_ledgers`, isolating strictly accounts exhibiting drift.',
            'summaryId': 'Anda telah menguasai optimasi multi-table joins, derived subquery aggregation, conditional aggregation dengan CASE WHEN, dan pencegahan Cartesian product pada MySQL.',
            'summaryEn': 'You have mastered multi-table join tuning, derived subquery aggregates, single-pass conditional aggregation with CASE WHEN, and Cartesian multiplication prevention in MySQL.'
        },

        # WEEK 3
        {
            'week': 3,
            'level': 'beginer',
            'levelNameId': 'Fondasi Relasional & Engine InnoDB',
            'levelNameEn': 'Relational Foundations & InnoDB Engine',
            'topicId': 'strategi-indexing-btree-dan-explain-format-json',
            'titleId': 'Indexing B+Tree, Composite Index & EXPLAIN FORMAT=JSON',
            'titleEn': 'B+Tree Indexing, Composite Index & EXPLAIN FORMAT=JSON',
            'language': 'sql',
            'programId': 'Covering Index Optimization dan Analisis EXPLAIN FORMAT=JSON di MySQL 8',
            'programEn': 'Covering Index Optimization and EXPLAIN FORMAT=JSON Profiling in MySQL 8',
            'code': """-- 1. Create realistic e-commerce audit logs table
CREATE TABLE security_audit_events (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    risk_score TINYINT UNSIGNED NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    -- Composite index designed for: WHERE user_id = ? AND event_type = ? ORDER BY created_at DESC
    KEY idx_user_event_time (user_id, event_type, created_at DESC),
    -- Covering index: includes all columns requested by security monitoring queries
    KEY idx_covering_alert (risk_score, created_at, user_id, ip_address)
) ENGINE=InnoDB;

-- 2. Analyze Execution Plan with JSON Format to inspect internal costs
EXPLAIN FORMAT=JSON
SELECT user_id, ip_address, created_at
FROM security_audit_events
WHERE risk_score >= 80
ORDER BY created_at DESC
LIMIT 50;

-- 3. Demonstration of Covering Index (Using index in Extra column)
EXPLAIN
SELECT risk_score, created_at, user_id, ip_address
FROM security_audit_events
WHERE risk_score = 90
ORDER BY created_at DESC;

-- 4. Check index usage statistics and cardinality
SHOW INDEX FROM security_audit_events;
""",
            'objectivesId': [
                'Memahami struktur internal B+Tree InnoDB: Root, Internal Node, dan Leaf Pages',
                'Menguasai Covering Index untuk mengeliminasi disk lookups ke tabel utama (Clustered Index)',
                'Mendiagnosis query plan mendalam menggunakan EXPLAIN FORMAT=JSON (query_cost, attached_condition)',
                'Menghindari jebakan index invalidation (penggunaan fungsi pada kolom index, wildcard terdepan)'
            ],
            'objectivesEn': [
                'Understand InnoDB internal B+Tree architecture: Root, Internal Nodes, and Leaf Pages',
                'Implement Covering Indexes to eliminate secondary table lookups to the Clustered Index',
                'Profile detailed query execution plans with EXPLAIN FORMAT=JSON (query_cost, attached_condition)',
                'Prevent index invalidation anti-patterns (wrapping columns in functions, leading wildcards)'
            ],
            'explanationId': """### Struktur Internal B+Tree dan Secondary Index
Di InnoDB, seluruh **Secondary Index** (indeks selain Primary Key) menyimpan nilai kolom indeks beserta nilai Primary Key dari baris tersebut. Ketika MySQL mencari baris menggunakan secondary index, ia menelusuri B+Tree indeks tersebut untuk menemukan Primary Key, lalu melakukan penelusuran kedua ke Clustered Index tabel utama untuk mengambil kolom lainnya (proses ini disebut *Bookmark Lookup*).

### Kekuatan Dahsyat Covering Index
Jika sebuah query `SELECT` hanya meminta kolom-kolom yang semuanya sudah tercakup di dalam satu Secondary Index, MySQL tidak perlu melakukan Bookmark Lookup ke Clustered Index disk. Di output `EXPLAIN`, ini ditandai dengan keterangan `Using index` di kolom `Extra`. **Covering Index** memberikan peningkatan performa hingga 10x - 100x lipat karena seluruh data dibaca langsung dari daun B+Tree indeks di RAM.

### Diagnostik Mendalam dengan EXPLAIN FORMAT=JSON
Output standar `EXPLAIN` berbentuk tabel terkadang menyembunyikan detail penting. Format `EXPLAIN FORMAT=JSON` menampilkan struktur hierarkis mesin pengoptimal:
- `query_cost`: Perkiraan kalkulasi biaya CPU dan I/O disk yang dibutuhkan.
- `used_columns`: Daftar kolom yang dibaca.
- `attached_condition`: Kondisi evaluasi filter pada baris data.
- `using_filesort`: Menandakan bahwa MySQL tidak dapat memanfaatkan urutan indeks untuk `ORDER BY` dan terpaksa melakukan pengurutan manual di memori/disk.""",
            'explanationEn': """### InnoDB B+Tree and Secondary Index Architecture
In InnoDB, every **Secondary Index** leaf node stores the indexed key values paired with the record's Clustered Index Primary Key. When MySQL queries records via a secondary index, it traverses the secondary tree to resolve the Primary Key, and subsequently performs a second traversal into the primary Clustered Index to retrieve remaining table columns (known as a *Bookmark Lookup*).

### The Power of Covering Indexes
If an executed query requests strictly attributes already residing inside the secondary index tree, MySQL bypasses the primary Clustered Index traversal entirely. In `EXPLAIN` output, this manifests as `Using index` in the `Extra` column. A **Covering Index** delivers 10x-100x performance gains because the dataset is satisfied directly from index pages in memory.

### Deep Profiling with EXPLAIN FORMAT=JSON
Standard tabular `EXPLAIN` output often obscures algorithmic optimizer decisions. `EXPLAIN FORMAT=JSON` reveals detailed diagnostic metrics:
- `query_cost`: Precise estimated computational cost balancing CPU cycles and disk page accesses.
- `used_columns`: Columns ingested during each execution phase.
- `attached_condition`: Exact predicate filters evaluated at storage engine level.
- `using_filesort`: Signals that index ordering was insufficient, forcing an explicit in-memory or temporary disk sort pass.""",
            'beginnerId': """Bayangkan Anda berada di perpustakaan. Buku-buku ditata rapi di rak lemari utama (Clustered Index). Anda mencari buku lewat laci kartu katalog kartu indeks pengarang (Secondary Index).

Jika kartu katalog tersebut hanya berisi nomor rak, Anda harus berjalan ke rak utama untuk melihat tebal buku dan penerbitnya (Bookmark Lookup). Tetapi jika di kartu katalog sudah tertulis lengkap nomor rak, penerbit, dan tahun terbit (Covering Index), Anda mendapatkan seluruh informasi saat itu juga tanpa perlu melangkah ke rak lemari utama!""",
            'beginnerEn': """Imagine a university library. The physical books reside on the primary shelves (Clustered Index). You search for titles using an author card catalog (Secondary Index).

If the catalog card only lists the book call number, you must physically walk over to the shelf to inspect its page count and publisher (Bookmark Lookup). But if the catalog card already lists the call number, publisher, and year (Covering Index), you answer your query instantly at the front desk without taking a single step toward the back shelves!""",
            'experimentsId': [
                'Bandingkan output EXPLAIN query dengan Covering Index vs query yang menyertakan SELECT *',
                'Analisis nilai query_cost pada EXPLAIN FORMAT=JSON sebelum dan sesudah penambahan composite index',
                'Buktikan terjadinya using_filesort saat urutan ORDER BY tidak mengikuti aturan urutan kolom composite index',
                'Jalankan SHOW STATUS LIKE \'Handler_read_%\' untuk melihat statistik pembacaan baris index internal'
            ],
            'experimentsEn': [
                'Compare EXPLAIN outputs between a Covering Index query versus an unindexed SELECT *',
                'Inspect query_cost shifts within EXPLAIN FORMAT=JSON before and after appending a composite index',
                'Provoke using_filesort by modifying ORDER BY columns out of alignment with the composite index prefix',
                'Inspect SHOW STATUS LIKE \'Handler_read_%\' to monitor internal storage engine index traversal counters'
            ],
            'challengeId': 'Rancang composite index optimal untuk query e-commerce: `WHERE store_id = 42 AND status = \'ACTIVE\' AND price BETWEEN 100000 AND 500000 ORDER BY created_at DESC LIMIT 20`, dan pastikan tidak memicu `using_filesort`.',
            'challengeEn': 'Design the optimal composite index for an e-commerce query: `WHERE store_id = 42 AND status = \'ACTIVE\' AND price BETWEEN 100000 AND 500000 ORDER BY created_at DESC LIMIT 20`, eliminating `using_filesort`.',
            'summaryId': 'Anda telah menguasai arsitektur B+Tree InnoDB, eliminasi bookmark lookup dengan Covering Index, dan profil eksekusi presisi dengan EXPLAIN FORMAT=JSON.',
            'summaryEn': 'You have mastered InnoDB B+Tree architecture, bookmark lookup elimination via Covering Indexes, and surgical execution profiling using EXPLAIN FORMAT=JSON.'
        },

        # WEEK 4
        {
            'week': 4,
            'level': 'beginer',
            'levelNameId': 'Fondasi Relasional & Engine InnoDB',
            'levelNameEn': 'Relational Foundations & InnoDB Engine',
            'topicId': 'full-text-search-virtual-columns-dan-json-mysql8',
            'titleId': 'Full-Text Search, Virtual Columns & JSON di MySQL 8+',
            'titleEn': 'Full-Text Search, Virtual Columns & JSON in MySQL 8+',
            'language': 'sql',
            'programId': 'Katalog Produk dengan Pencarian Full-Text Boolean dan Index Kolom Virtual JSON',
            'programEn': 'Product Catalog with Boolean Full-Text Search and JSON Virtual Column Indexing',
            'code': """-- 1. Create modern catalog table with JSON attributes and Full-Text index
CREATE TABLE catalog_products (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    sku VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    specifications JSON NOT NULL,
    -- Generated Virtual Column extracting brand from JSON without consuming disk space
    brand VARCHAR(100) GENERATED ALWAYS AS (specifications->>'$.brand') VIRTUAL,
    -- Generated Stored Column extracting weight for physical range filtering
    weight_kg DECIMAL(6, 2) GENERATED ALWAYS AS (CAST(specifications->>'$.weight_kg' AS DECIMAL(6,2))) STORED,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_catalog_sku (sku),
    -- Index on virtual generated column!
    KEY idx_product_brand (brand),
    -- Full-Text search index covering title and description
    FULLTEXT KEY ft_catalog_search (title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample product data with nested JSON payloads
INSERT INTO catalog_products (sku, title, description, specifications) VALUES
('LAP-PRO-16', 'MacBook Pro 16 M3 Max', 'Powerful laptop for software developers and machine learning engineering with extreme battery life.', 
 '{"brand": "Apple", "weight_kg": 2.14, "specs": {"ram": "64GB", "storage": "1TB SSD"}}'),
('LAP-AIR-15', 'MacBook Air 15 M3', 'Ultra-thin lightweight laptop ideal for digital nomads and daily productivity.', 
 '{"brand": "Apple", "weight_kg": 1.51, "specs": {"ram": "16GB", "storage": "512GB SSD"}}'),
('LAP-THINK-X1', 'Lenovo ThinkPad X1 Carbon', 'Rugged business flagship ultrabook with military grade carbon fiber durability.', 
 '{"brand": "Lenovo", "weight_kg": 1.12, "specs": {"ram": "32GB", "storage": "1TB SSD"}}');

-- 2. Boolean Mode Full-Text Search with Relevance Scoring
SELECT 
    id, title, brand, weight_kg,
    MATCH(title, description) AGAINST('+laptop +developer -gaming' IN BOOLEAN MODE) AS relevance_score
FROM catalog_products
WHERE MATCH(title, description) AGAINST('+laptop +developer -gaming' IN BOOLEAN MODE)
ORDER BY relevance_score DESC;

-- 3. Query JSON directly using JSON operators and virtual index
EXPLAIN
SELECT id, title, brand, specifications->'$.specs.ram' AS ram_size
FROM catalog_products
WHERE brand = 'Apple';
""",
            'objectivesId': [
                'Mengimplementasikan Full-Text Search (MATCH ... AGAINST) dalam Natural Language dan Boolean Mode',
                'Memahami perbedaan Generated Column tipe VIRTUAL vs STORED pada MySQL 8+',
                'Mengindeks atribut di dalam dokumen JSON melalui Virtual Columns',
                'Menggunakan operator fungsi JSON: ->, ->>, JSON_EXTRACT, dan JSON_CONTAINS'
            ],
            'objectivesEn': [
                'Implement Full-Text Search (MATCH ... AGAINST) in Natural Language and Boolean Mode',
                'Differentiate VIRTUAL vs STORED Generated Columns in MySQL 8+',
                'Index arbitrary JSON document attributes via Virtual Generated Columns',
                'Operate native JSON functions and operators: ->, ->>, JSON_EXTRACT, and JSON_CONTAINS'
            ],
            'explanationId': """### Full-Text Search InnoDB: Boolean Mode
Pencarian teks menggunakan klausa `LIKE '%keyword%'` memicu *Full Table Scan* yang sangat lambat karena tidak dapat memanfaatkan B+Tree. **Full-Text Index** InnoDB memecah teks menjadi token kata (*inverted index*). Dengan **Boolean Mode**, Anda dapat mengekspresikan logika pencarian canggih:
- `+kata`: Kata wajib muncul.
- `-kata`: Kata dilarang muncul.
- `kata*`: Pencarian prefiks wildcard kata.
- Operator ini juga menghitung skor relevansi matematis (*TF-IDF*).

### Generated Columns: VIRTUAL vs STORED
MySQL 8+ memungkinkan pembuatan kolom yang nilainya diturunkan dari ekspresi kolom lain:
- **VIRTUAL**: Nilai dihitung secara on-the-fly saat baris dibaca. Tidak mengonsumsi ruang disk penyimpanan tabel. Menariknya, MySQL mengizinkan pembuatan Secondary Index pada kolom Virtual!
- **STORED**: Nilai dihitung saat insert/update dan disimpan secara fisik di disk. Berguna jika kolom tersebut sering dijadikan bagian dari partisi tabel.

### Mengindeks Dokumen JSON Tanpa Migrasi Skema
Sebelum adanya Generated Column, data di dalam kolom `JSON` tidak dapat diindeks B+Tree. Dengan membuat Virtual Column `brand GENERATED ALWAYS AS (specifications->>'$.brand') VIRTUAL` lalu membuat index `KEY (brand)`, MySQL mampu mengeksekusi pencarian B+Tree ultra-cepat pada atribut JSON dinamis.""",
            'explanationEn': """### InnoDB Full-Text Indexing: Boolean Mode
Pattern matching with `LIKE '%keyword%'` triggers disastrous full table scans because leading wildcards invalidate B+Tree traversals. InnoDB **Full-Text Indexes** construct an inverted index mapping tokens to document positions. Under **Boolean Mode**, developers formulate expressive search queries:
- `+word`: Mandatory inclusion.
- `-word`: Strict exclusion.
- `word*`: Prefix wildcard matching.
- Statements compute relevance scores based on Term Frequency-Inverse Document Frequency (TF-IDF).

### Generated Columns: VIRTUAL vs STORED
MySQL 8+ features generated columns evaluated from deterministic expressions:
- **VIRTUAL**: Evaluated dynamically during read operations, consuming zero disk storage. Crucially, InnoDB permits creating B+Tree secondary indexes on Virtual columns!
- **STORED**: Evaluated and durably written to physical disk blocks upon INSERT/UPDATE. Ideal when referenced in table partitioning schemes.

### High-Speed Indexing of JSON Payloads
Traditionally, JSON attributes could not be traversed via B+Trees. By declaring a Virtual Generated Column `brand GENERATED ALWAYS AS (specifications->>'$.brand') VIRTUAL` and placing an index `KEY (brand)`, MySQL accelerates nested JSON queries to sub-millisecond B+Tree lookups.""",
            'beginnerId': """Bayangkan kolom JSON seperti kotak kardus tertutup berisi berbagai barang acak. Mencari merek laptop di dalam kotak kardus membutuhkan Anda membongkar kardus setiap saat. 

Virtual Column seperti menempelkan stiker label nama merek di luar kardus. Stiker itu tidak menambah berat kardus (hemat disk), dan petugas gudang bisa langsung membaca stiker tersebut dari jauh dengan cepat!""",
            'beginnerEn': """Think of a JSON column like a sealed cardboard box containing miscellaneous gadgets. Finding a specific brand requires opening every box individually.

A Virtual Column is like affixing an external label tag on the outside of the box indicating the brand. The tag adds zero physical weight (zero disk space), yet warehouse staff can spot it instantly from down the aisle!""",
            'experimentsId': [
                'Uji pencarian Boolean Full-Text dengan variasi operator + dan - dan amati relevansi hasil',
                'Jalankan EXPLAIN pada query WHERE brand = \'Apple\' untuk memverifikasi pemanfaatan index virtual',
                'Gunakan fungsi JSON_SEARCH() untuk mencari lokasi path suatu string di dalam dokumen JSON',
                'Coba buat index multi-valued pada array JSON menggunakan CAST(... AS UNSIGNED ARRAY)'
            ],
            'experimentsEn': [
                'Test Boolean Full-Text queries with various combinations of + and - operators and inspect relevance sorting',
                'Run EXPLAIN on WHERE brand = \'Apple\' to confirm secondary index usage on the virtual column',
                'Apply JSON_SEARCH() to locate the exact path of a given string inside nested JSON structures',
                'Experiment with MySQL 8 multi-valued indexes on JSON arrays using CAST(... AS UNSIGNED ARRAY)'
            ],
            'challengeId': 'Buat fitur autocomplete tag produk: simpan daftar tag dalam JSON array, buat Multi-Valued Index pada array tersebut, dan tulis query pencarian produk dengan `MEMBER OF()` atau `JSON_CONTAINS()`.',
            'challengeEn': 'Build a product tag autocomplete engine: store tags within a JSON array, generate a Multi-Valued Index, and craft queries utilizing `MEMBER OF()` or `JSON_CONTAINS()`.',
            'summaryId': 'Anda telah menguasai Full-Text Search Boolean mode di InnoDB, Generated Columns (VIRTUAL vs STORED), dan strategi indexing atribut dokumen JSON di MySQL 8+.',
            'summaryEn': 'You have mastered InnoDB Boolean Full-Text Search, Generated Columns (VIRTUAL vs STORED), and high-performance JSON document indexing in MySQL 8+.'
        },

        # WEEK 5
        {
            'week': 5,
            'level': 'intermediate',
            'levelNameId': 'Konkurensi Transaksi, Replikasi & Skalabilitas Sharding',
            'levelNameEn': 'Transaction Concurrency, Replication & Sharding Scalability',
            'topicId': 'locking-internals-gap-locks-dan-deadlock-detection',
            'titleId': 'Locking InnoDB: Record Lock, Gap Lock & Deadlock Analysis',
            'titleEn': 'InnoDB Locking: Record Locks, Gap Locks & Deadlock Analysis',
            'language': 'sql',
            'programId': 'Analisis Mekanisme Next-Key Locking dan Investigasi Deadlock Melalui ENGINE INNODB STATUS',
            'programEn': 'Next-Key Locking Analysis and Deadlock Investigation via ENGINE INNODB STATUS',
            'code': """-- Demonstrate InnoDB Row and Gap Locking mechanics under REPEATABLE READ
-- Setup dedicated account ledger
DROP TABLE IF EXISTS account_balances;
CREATE TABLE account_balances (
    account_id BIGINT UNSIGNED NOT NULL,
    owner_name VARCHAR(100) NOT NULL,
    balance DECIMAL(15, 2) NOT NULL,
    PRIMARY KEY (account_id)
) ENGINE=InnoDB;

INSERT INTO account_balances (account_id, owner_name, balance) VALUES
(10, 'Alice', 1000.00),
(20, 'Bob', 2500.00),
(30, 'Charlie', 5000.00);

-- Scenario A: Next-Key Lock (Record Lock + Gap Lock)
-- Under REPEATABLE READ, querying a range locks existing rows AND gaps between them
-- Session 1:
BEGIN;
SELECT * FROM account_balances 
WHERE account_id BETWEEN 15 AND 25 
FOR UPDATE;
-- Locks: Record 20, plus Gap (10, 20) and Gap (20, 30).
-- Concurrent INSERT of account_id 18 or 22 in Session 2 will be BLOCKED!

-- Scenario B: Deadlock Detection & Resolution
-- Session 1 locks account 10, then attempts to lock account 20
-- Session 2 locks account 20, then attempts to lock account 10
-- InnoDB background deadlock detector kills the smaller transaction automatically!

-- Inspect the latest deadlock details, locks, and buffer pool status
SHOW ENGINE INNODB STATUS;

-- Query active transaction locks from information_schema / performance_schema
SELECT 
    r.trx_id AS waiting_trx_id,
    r.trx_mysql_thread_id AS waiting_thread,
    b.trx_id AS blocking_trx_id,
    b.trx_mysql_thread_id AS blocking_thread
FROM performance_schema.data_lock_waits w
INNER JOIN information_schema.innodb_trx b ON b.trx_id = w.blocking_engine_transaction_id
INNER JOIN information_schema.innodb_trx r ON r.trx_id = w.requesting_engine_transaction_id;
""",
            'objectivesId': [
                'Memahami jenis-jenis lock internal InnoDB: Record Lock, Gap Lock, dan Next-Key Lock',
                'Mengetahui bagaimana Next-Key Lock mengeliminasi masalah Phantom Read pada level REPEATABLE READ',
                'Membaca dan menganalisis laporan LATEST DETECTED DEADLOCK di SHOW ENGINE INNODB STATUS',
                'Menerapkan pola pencegahan deadlock melalui standardisasi urutan penguncian sumber daya'
            ],
            'objectivesEn': [
                'Understand internal InnoDB lock primitives: Record Locks, Gap Locks, and Next-Key Locks',
                'Learn how Next-Key Locking mathematically eliminates Phantom Reads in REPEATABLE READ mode',
                'Parse and diagnose the LATEST DETECTED DEADLOCK report inside SHOW ENGINE INNODB STATUS',
                'Eliminate application deadlocks by standardizing resource locking sequences'
            ],
            'explanationId': """### Anatomi Kunci InnoDB: Record, Gap, dan Next-Key Lock
Pada tingkat isolasi default MySQL (`REPEATABLE READ`), InnoDB menggunakan algoritma penguncian yang sangat canggih:
- **Record Lock**: Mengunci indeks record spesifik yang sudah ada di tabel.
- **Gap Lock**: Mengunci celah ruang kosong di antara nilai-nilai indeks (misalnya rentang antara ID 10 dan 20), mencegah transaksi lain menyisipkan data baru (*INSERT*) di dalam celah tersebut.
- **Next-Key Lock**: Kombinasi Record Lock pada baris tersebut ditambah Gap Lock pada celah tepat sebelum baris tersebut. Mekanisme inilah yang mencegah munculnya *Phantom Read* di MySQL.

### Mekanisme Pendeteksian Deadlock Otomatis
**Deadlock** terjadi ketika Transaksi A mengunci Baris 1 dan menunggu Baris 2, sementara Transaksi B mengunci Baris 2 dan menunggu Baris 1. Keduanya saling menunggu selamanya. InnoDB memiliki thread latar belakang pendeteksi deadlock (*wait-for graph*). Ketika siklus deadlock terdeteksi, InnoDB otomatis memilih transaksi yang memodifikasi data paling sedikit sebagai korban (*victim*), membatalkannya (`ROLLBACK`), dan melempar error `1213: Deadlock found when trying to get lock`.

### Mendiagnosis lewat SHOW ENGINE INNODB STATUS
Perintah `SHOW ENGINE INNODB STATUS` menghasilkan laporan diagnostik paling komprehensif di MySQL. Bagian `LATEST DETECTED DEADLOCK` mencatat secara presisi statement SQL dari kedua transaksi, lock mode yang diminta (`lock_mode X`), nomor page disk tempat kunci berada, dan transaksi mana yang diputus sebagai korban.""",
            'explanationEn': """### InnoDB Lock Anatomy: Record, Gap, and Next-Key Locks
Under MySQL default `REPEATABLE READ` isolation, InnoDB enforces strict consistency via composite locking:
- **Record Lock**: Locks the physical index record.
- **Gap Lock**: Locks the open gap between adjacent index records (e.g. interval between ID 10 and 20), forbidding concurrent transactions from inserting new rows into the gap.
- **Next-Key Lock**: A composite lock combining a Record Lock on the indexed entry plus a Gap Lock on the preceding span. This invariant prevents Phantom Reads under REPEATABLE READ.

### Automated Deadlock Detection Engine
A **Deadlock** arises when Transaction A holds Row 1 and awaits Row 2, while Transaction B holds Row 2 and awaits Row 1. InnoDB runs a background cycle-detection algorithm maintaining an in-memory *wait-for graph*. Upon discovering a circular wait, InnoDB identifies the transaction with the fewest mutating writes as the victim, triggers an automated `ROLLBACK`, and emits error `1213: Deadlock found when trying to get lock`.

### Forensic Diagnostics with SHOW ENGINE INNODB STATUS
The command `SHOW ENGINE INNODB STATUS` provides deep telemetry. The `LATEST DETECTED DEADLOCK` section captures exact SQL statements, lock requests (`lock_mode X`), target page IDs, and rationales for victim selection.""",
            'beginnerId': """Bayangkan Anda dan teman Anda ingin menyusun puzzle dua keping terakhir. Keping A dipegang teman Anda, keping B dipegang Anda. 

Anda menolak menyerahkan keping B sebelum teman Anda memberikan keping A, dan teman Anda menolak menyerahkan keping A sebelum Anda memberikan keping B. Tanpa wasit (InnoDB Deadlock Detector), kalian berdua akan mematung selamanya. Wasit InnoDB akan meniup peluit, mengambil keping dari pemain yang paling santai, memintanya mengulang dari awal, sehingga pemain lainnya bisa menyelesaikan permainannya.""",
            'beginnerEn': """Imagine you and a friend holding the final two pieces of a puzzle. Your friend holds Piece A; you hold Piece B.

You refuse to surrender Piece B until your friend gives you Piece A, while your friend refuses to release Piece A until you hand over Piece B. Without a referee (the InnoDB Deadlock Detector), both of you would freeze indefinitely. The referee blows a whistle, forces one player to drop their piece and retry later, allowing the other player to complete the puzzle.""",
            'experimentsId': [
                'Buka dua session mysql CLI, simulasikan gap lock: Session 1 mengunci rentang id, amati Session 2 terblokir saat INSERT id di dalam celah',
                'Simulasikan skenario saling kunci silang antara dua baris untuk memicu error 1213 Deadlock',
                'Jalankan SHOW ENGINE INNODB STATUS dan temukan bagian LATEST DETECTED DEADLOCK',
                'Inspeksi tabel performance_schema.data_locks untuk melihat daftar kunci yang aktif secara granular'
            ],
            'experimentsEn': [
                'Open two mysql CLI sessions, simulate gap locking: session 1 locks an ID range, observe session 2 blocking on INSERT inside the gap',
                'Intentionally stage cross-locking between two rows to trigger error 1213 Deadlock',
                'Run SHOW ENGINE INNODB STATUS and examine the LATEST DETECTED DEADLOCK breakdown',
                'Query performance_schema.data_locks to inspect granular active lock structures'
            ],
            'challengeId': 'Tuliskan prosedur transfer saldo antar-rekening yang aman dari ancaman deadlock: terapkan algoritma pengurutan ID kunci (`LEAST(from_id, to_id)` dan `GREATEST(from_id, to_id)`) sebelum menjalankan `SELECT ... FOR UPDATE`.',
            'challengeEn': 'Craft a deadlock-free funds transfer transaction: enforce strict key ordering via `LEAST(from_id, to_id)` and `GREATEST(from_id, to_id)` prior to executing `SELECT ... FOR UPDATE`.',
            'summaryId': 'Anda telah menguasai arsitektur locking internal InnoDB: Record Lock, Gap Lock, Next-Key Lock, pencegahan Phantom Read, dan diagnosis forensik deadlock dengan SHOW ENGINE INNODB STATUS.',
            'summaryEn': 'You have mastered internal InnoDB locking mechanics: Record, Gap, and Next-Key locks, Phantom Read prevention, and deadlock forensics using SHOW ENGINE INNODB STATUS.'
        },

        # WEEK 6
        {
            'week': 6,
            'level': 'intermediate',
            'levelNameId': 'Konkurensi Transaksi, Replikasi & Skalabilitas Sharding',
            'levelNameEn': 'Transaction Concurrency, Replication & Sharding Scalability',
            'topicId': 'stored-procedures-triggers-dan-event-scheduler',
            'titleId': 'Stored Procedures, Triggers & Event Scheduler',
            'titleEn': 'Stored Procedures, Triggers & Event Scheduler',
            'language': 'sql',
            'programId': 'Sistem Maintenance Otomatis: Triggers Pembukuan dan Event Scheduler Purging',
            'programEn': 'Automated Maintenance System: Bookkeeping Triggers and Purging Event Scheduler',
            'code': """-- 1. Enable Event Scheduler in MySQL
SET GLOBAL event_scheduler = ON;

-- 2. Audit history table
CREATE TABLE wallet_balance_audit (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    wallet_id BIGINT UNSIGNED NOT NULL,
    old_balance DECIMAL(15, 2) NOT NULL,
    new_balance DECIMAL(15, 2) NOT NULL,
    changed_by VARCHAR(50) NOT NULL,
    changed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- 3. Trigger tracking balance mutations automatically
DELIMITER $$
CREATE TRIGGER trg_wallet_balance_update
AFTER UPDATE ON user_wallets
FOR EACH ROW
BEGIN
    IF OLD.balance <> NEW.balance THEN
        INSERT INTO wallet_balance_audit (wallet_id, old_balance, new_balance, changed_by, changed_at)
        VALUES (NEW.id, OLD.balance, NEW.balance, CURRENT_USER(), NOW());
    END IF;
END$$
DELIMITER ;

-- 4. Stored Procedure with Transaction and SQLEXCEPTION Error Handler
DELIMITER $$
CREATE PROCEDURE sp_transfer_funds(
    IN p_sender_wallet_id BIGINT UNSIGNED,
    IN p_receiver_wallet_id BIGINT UNSIGNED,
    IN p_amount DECIMAL(15, 2),
    OUT p_status_code VARCHAR(20)
)
proc_body: BEGIN
    DECLARE v_sender_balance DECIMAL(15, 2);
    
    -- Error Handler: Automatically rollback on any SQL error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_status_code = 'TRANSACTION_ERROR';
    END;

    IF p_amount <= 0 THEN
        SET p_status_code = 'INVALID_AMOUNT';
        LEAVE proc_body;
    END IF;

    START TRANSACTION;

    -- Lock sender wallet
    SELECT balance INTO v_sender_balance
    FROM user_wallets
    WHERE id = p_sender_wallet_id
    FOR UPDATE;

    IF v_sender_balance < p_amount THEN
        ROLLBACK;
        SET p_status_code = 'INSUFFICIENT_FUNDS';
        LEAVE proc_body;
    END IF;

    -- Debit sender
    UPDATE user_wallets 
    SET balance = balance - p_amount 
    WHERE id = p_sender_wallet_id;

    -- Credit receiver
    UPDATE user_wallets 
    SET balance = balance + p_amount 
    WHERE id = p_receiver_wallet_id;

    COMMIT;
    SET p_status_code = 'SUCCESS';
END$$
DELIMITER ;

-- 5. Automated Recurring Event Scheduler: Archive/Purge audit logs older than 90 days
DELIMITER $$
CREATE EVENT evt_purge_old_audit_logs
ON SCHEDULE EVERY 1 DAY
STARTS (CURRENT_TIMESTAMP + INTERVAL 1 HOUR)
DO
BEGIN
    DELETE FROM wallet_balance_audit
    WHERE changed_at < DATE_SUB(NOW(), INTERVAL 90 DAY);
END$$
DELIMITER ;
""",
            'objectivesId': [
                'Menguasai pemrograman prosedural MySQL dengan DELIMITER, variabel, dan handler kesalahan SQLEXCEPTION',
                'Membangun Trigger audit otomatis yang membandingkan nilai OLD dan NEW',
                'Mengimplementasikan Stored Procedure transaksi transfer dana dengan rollback otomatis',
                'Mengonfigurasi dan memonitor MySQL Event Scheduler untuk perawatan database otomatis'
            ],
            'objectivesEn': [
                'Master MySQL procedural scripting using DELIMITER, variables, and SQLEXCEPTION handlers',
                'Construct automated audit triggers comparing OLD and NEW row state variables',
                'Implement funds transfer Stored Procedures featuring automated rollback on failure',
                'Configure and monitor recurring background maintenance jobs using MySQL Event Scheduler'
            ],
            'explanationId': """### Bahasa Prosedural MySQL dan Peran DELIMITER
Sintaks SQL standar menggunakan titik koma (`;`) sebagai akhir statement. Di dalam Stored Procedure atau Trigger yang terdiri dari banyak baris instruksi, parser MySQL akan salah mengartikan titik koma internal sebagai akhir dari seluruh blok. Perintah `DELIMITER $$` mengubah karakter pembatas perintah sementara menjadi `$$`, memungkinkan penulisan blok kode kompleks hingga dikembalikan ke `DELIMITER ;`.

### Penanganan Error dengan SQLEXCEPTION Handlers
Di dalam Stored Procedure enterprise, kegagalan di tengah proses tidak boleh meninggalkan data dalam kondisi setengah ter-update. Blok `DECLARE EXIT HANDLER FOR SQLEXCEPTION` bertindak seperti blok `catch` di bahasa pemrograman modern. Jika terjadi error constraint atau kegagalan query, handler otomatis menjalankan `ROLLBACK` dan mengembalikan kode status error yang bersih ke pemanggil.

### Otomasi dengan MySQL Event Scheduler
Alih-alih bergantung pada cron job Linux eksternal yang rentan putus koneksi jaringan, MySQL memiliki mesin penjadwal tugas bawaan: **Event Scheduler** (`SET GLOBAL event_scheduler = ON`). Event Scheduler mengeksekusi tugas pemeliharaan berkala langsung di dalam server database, seperti pembersihan data sementara (*purging*), agregasi data harian, dan rotasi partisi.""",
            'explanationEn': """### Procedural Scripting and DELIMITER Mechanics
Standard SQL parsers interpret semicolons (`;`) as statement terminators. Within compound procedures or triggers, intermediate semicolons prematurely terminate the definition. The directive `DELIMITER $$` reassigns the delimiter sequence to `$$`, permitting complex procedural blocks until reset via `DELIMITER ;`.

### Transactional Resilience with SQLEXCEPTION Handlers
In enterprise procedures, partial execution corrupts ledger integrity. Declaring `DECLARE EXIT HANDLER FOR SQLEXCEPTION` operates identically to try-catch exception handling in modern languages. Upon encountering constraint violations or runtime faults, the handler intercepts execution, rolls back state mutations atomically, and surfaces error codes to client layers.

### In-Database Automation with the Event Scheduler
Instead of relying on fragile external OS cron jobs susceptible to network blips, MySQL embeds a native task daemon: the **Event Scheduler** (`SET GLOBAL event_scheduler = ON`). The scheduler executes temporal maintenance workflows directly inside the storage engine, including log compaction, daily rollups, and partition rotation.""",
            'beginnerId': """Bayangkan Stored Procedure seperti mesin ATM. Anda tidak bisa menarik uang dari rekening A lalu kabur sebelum uang masuk ke rekening B. 

Mesin ATM memiliki mekanisme darurat (`SQLEXCEPTION HANDLER`): jika mesin macet atau kertas struk habis di tengah proses, seluruh proses transaksi langsung dibatalkan otomatis dan uang Anda tetap aman. Sedangkan Event Scheduler seperti alarm jam weker yang otomatis berbunyi setiap jam 2 pagi untuk menyapu sampah-sampah kertas struk yang sudah kedaluwarsa.""",
            'beginnerEn': """Think of a Stored Procedure like an automated ATM. You cannot deduct money from Account A and walk away before Account B receives it.

The ATM features a failsafe mechanism (`SQLEXCEPTION HANDLER`): if the machine jams mid-transaction, everything cancels atomically and your funds remain safe. The Event Scheduler acts like an alarm clock ringing every morning at 2 AM to sweep up discarded, expired ATM receipts.""",
            'experimentsId': [
                'Panggil procedure sp_transfer_funds dengan saldo pemicu INSUFFICIENT_FUNDS dan amati keluaran status code',
                'Lakukan update saldo secara manual dan verifikasi bahwa baris baru otomatis tercatat di wallet_balance_audit',
                'Inspeksi daftar event scheduler yang sedang aktif menggunakan query SHOW EVENTS',
                'Coba paksa error duplicate key di dalam procedure untuk menguji apakah EXIT HANDLER mengeksekusi ROLLBACK'
            ],
            'experimentsEn': [
                'Invoke sp_transfer_funds with funds triggering INSUFFICIENT_FUNDS and verify the return status',
                'Update balances manually and verify automated audit capture within wallet_balance_audit',
                'Inspect scheduled background jobs using SHOW EVENTS',
                'Force a duplicate key collision inside the procedure to verify atomic rollback by the EXIT HANDLER'
            ],
            'challengeId': 'Kembangkan procedure `sp_transfer_funds` dengan menambahkan pencatatan entri debit dan kredit ke tabel `wallet_ledgers` secara atomic di dalam transaksi yang sama.',
            'challengeEn': 'Enhance `sp_transfer_funds` to atomically write double-entry debit and credit records into `wallet_ledgers` within the same transaction scope.',
            'summaryId': 'Anda telah menguasai logika server-side MySQL: Stored Procedures dengan exception handler, Triggers audit integritas, dan automasi penjadwalan dengan Event Scheduler.',
            'summaryEn': 'You have mastered MySQL server-side programming: robust Stored Procedures with exception handling, automated audit Triggers, and periodic task automation via the Event Scheduler.'
        },

        # WEEK 7
        {
            'week': 7,
            'level': 'intermediate',
            'levelNameId': 'Konkurensi Transaksi, Replikasi & Skalabilitas Sharding',
            'levelNameEn': 'Transaction Concurrency, Replication & Sharding Scalability',
            'topicId': 'replikasi-gtid-high-availability-dan-read-write-splitting',
            'titleId': 'Replikasi GTID, Semi-Sync & Read-Write Splitting',
            'titleEn': 'GTID Replication, Semi-Sync & Read-Write Splitting',
            'language': 'sql',
            'programId': 'Konfigurasi Replikasi Berbasis GTID dan Monitoring Status Replikasi Slave',
            'programEn': 'GTID-Based Replication Configuration and Replica Health Monitoring',
            'code': """-- 1. Configuration parameters on Primary (Source) node (in my.cnf / dynamic)
-- enforce_gtid_consistency = ON
-- gtid_mode = ON
-- binlog_format = ROW
-- log_bin = mysql-bin

-- 2. Create dedicated replication user with encrypted authentication
CREATE USER IF NOT EXISTS 'repl_user'@'%' IDENTIFIED BY 'SuperSecureReplPass2026!';
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'repl_user'@'%';
FLUSH PRIVILEGES;

-- 3. Configure Replica (Replica) node using Global Transaction Identifiers (GTID)
-- CHANGE REPLICATION SOURCE TO
--     SOURCE_HOST = '10.0.0.1',
--     SOURCE_PORT = 3306,
--     SOURCE_USER = 'repl_user',
--     SOURCE_PASSWORD = 'SuperSecureReplPass2026!',
--     SOURCE_AUTO_POSITION = 1, -- Automatically matches GTID sets without manual log file coordinates
--     SOURCE_SSL = 1;

-- START REPLICA;

-- 4. Monitor Replica Status and Replication Lag
SHOW REPLICA STATUS\\G

-- Query Performance Schema for Replication Lag & Thread Health
SELECT 
    channel_name,
    service_state AS io_thread_state,
    last_error_number,
    last_error_message
FROM performance_schema.replication_connection_status;

SELECT 
    channel_name,
    service_state AS sql_thread_state,
    last_error_number,
    last_error_message
FROM performance_schema.replication_applier_status_by_coordinator;

-- Calculate replication lag in seconds
SELECT 
    channel_name,
    COUNT_TRANSACTIONS_IN_QUEUE AS transactions_queued,
    COUNT_TRANSACTIONS_CHECKED AS transactions_applied
FROM performance_schema.replication_applier_status;
""",
            'objectivesId': [
                'Memahami topologi High Availability MySQL: Primary-Replica, Semi-Synchronous, dan Group Replication',
                'Mengonfigurasi replikasi modern berbasis GTID (Global Transaction Identifier) dan SOURCE_AUTO_POSITION',
                'Mendiagnosis lag replikasi melalui SHOW REPLICA STATUS (Seconds_Behind_Source)',
                'Merancang arsitektur Read-Write Splitting menggunakan database proxy (ProxySQL / MySQL Router)'
            ],
            'objectivesEn': [
                'Understand MySQL High Availability topologies: Primary-Replica, Semi-Synchronous, and Group Replication',
                'Configure modern GTID (Global Transaction Identifier) replication with SOURCE_AUTO_POSITION',
                'Diagnose and remediate replication lag through SHOW REPLICA STATUS (Seconds_Behind_Source)',
                'Architect Read-Write Splitting routing layers using database proxies (ProxySQL / MySQL Router)'
            ],
            'explanationId': """### Evolusi Replikasi: Dari Posisi Log ke GTID
Replikasi tradisional MySQL mengandalkan nama file binary log dan posisi byte offset (`mysql-bin.000004`, pos `1540`). Jika server Primary crash dan slave harus dialihkan ke node baru (failover), menghitung ulang koordinat posisi file ini sangat rentan kesalahan (*error-prone*). **GTID** (*Global Transaction Identifier*) memberikan identitas unik global (`server_uuid:sequence_number`) pada setiap transaksi yang di-commit. Replica cukup mengaktifkan `SOURCE_AUTO_POSITION = 1`, dan sistem secara otomatis menyinkronkan seluruh transaksi yang belum diterimanya.

### Mode Replikasi: Asynchronous vs Semi-Synchronous
- **Asynchronous** (Default): Primary menulis transaksi ke binlog lokal dan langsung merespons klien tanpa menunggu apakah Replica sudah menerima data. Jika Primary mati mendadak sebelum data terkirim, potensi data loss dapat terjadi.
- **Semi-Synchronous**: Primary menahan commit sampai setidaknya satu node Replica mengonfirmasi bahwa event binlog telah tersimpan di *relay log* miliknya. Menjamin data aman dari kehilangan tanpa mengorbankan latensi secara drastis.

### Arsitektur Read-Write Splitting
Dalam aplikasi berskala jutaan pengguna, 80-90% operasi adalah membaca data (`SELECT`). Arsitektur **Read-Write Splitting** menggunakan layer perantara seperti **ProxySQL** atau **MySQL Router**. Proxy secara cerdas mengarahkan operasi tulis (`INSERT/UPDATE/DELETE`) ke Primary node tunggal, sementara ratusan query baca didistribusikan merata ke sekumpulan Replica nodes.""",
            'explanationEn': """### Replication Evolution: Coordinate Logs vs GTID
Legacy MySQL replication relied on explicit binary log filenames and byte offsets (`mysql-bin.000004`, pos `1540`). During catastrophic primary failovers, recalibrating coordinates across replicas was notoriously fragile. **GTID** (*Global Transaction Identifiers*) binds every committed transaction to an immutable unique identifier (`server_uuid:sequence_number`). Replicas simply declare `SOURCE_AUTO_POSITION = 1`, delegating synchronization negotiation entirely to the engine.

### Replication Modes: Asynchronous vs Semi-Synchronous
- **Asynchronous** (Default): The Primary writes locally and immediately acknowledges clients without waiting for replica transmission. An ungraceful primary crash risks silent data loss.
- **Semi-Synchronous**: The Primary blocks transaction completion until at least one replica acknowledges receiving the event into its in-memory *relay log*, providing robust crash survival.

### Read-Write Splitting Architecture
In high-throughput systems, 80-90% of traffic is read-intensive (`SELECT`). **Read-Write Splitting** deploys routing intermediaries like **ProxySQL** or **MySQL Router**. The proxy transparently routes write mutations (`INSERT/UPDATE/DELETE`) to the single Primary authority while load-balancing read workloads across an elastic pool of Read Replicas.""",
            'beginnerId': """Bayangkan kantor redaksi surat kabar. Pemimpin redaksi (Primary Server) adalah satu-satunya orang yang berhak menulis dan mengubah berita utama. 

Setiap kali ada berita baru, kantor cabang di seluruh kota (Replica Servers) otomatis mencetak salinannya. Pembaca koran (pengguna aplikasi) membaca koran dari kantor cabang terdekat (Read Splitting), sehingga pemimpin redaksi tidak kelelahan melayani jutaan pembaca sendirian.""",
            'beginnerEn': """Imagine a newspaper publishing house. The Editor-in-Chief (Primary Server) is the sole authority permitted to author or modify breaking headlines.

Whenever a story publishes, regional satellite offices (Replica Servers) automatically receive identical telegraph copies. Citizens (application users) read papers distributed from their local branch (Read Splitting), preventing the Editor-in-Chief from being crushed under the weight of millions of inquiries.""",
            'experimentsId': [
                'Jalankan SHOW BINARY LOGS untuk melihat daftar file binlog yang aktif di server Primary',
                'Inspeksi variabel global @@GLOBAL.gtid_executed untuk melihat rentang GTID yang sudah dieksekusi',
                'Simulasikan replikasi tertunda dengan menyuntikkan query lambat di replica dan amati Seconds_Behind_Source',
                'Uji konfigurasi read-only pada replica dengan SET GLOBAL read_only = ON'
            ],
            'experimentsEn': [
                'Execute SHOW BINARY LOGS to view active binary log sequences on the Primary node',
                'Inspect the global variable @@GLOBAL.gtid_executed to examine executed GTID sets',
                'Simulate replication delay by running a heavy table alter on the replica and track Seconds_Behind_Source',
                'Enforce read-only protection on the replica instance via SET GLOBAL read_only = ON'
            ],
            'challengeId': 'Rancang skema failover otomatis: buat prosedur pengecekan kesehatan yang mendeteksi matinya Primary dan mempromosikan salah satu Replica menjadi Primary baru menggunakan perintah `STOP REPLICA; RESET REPLICA ALL;`.',
            'challengeEn': 'Architect an automated failover workflow: write a health-check script that detects Primary node failure and promotes an elected Replica to Primary authority via `STOP REPLICA; RESET REPLICA ALL;`.',
            'summaryId': 'Anda telah menguasai arsitektur High Availability MySQL: replikasi berbasis GTID, proteksi data Semi-Synchronous, pemantauan lag replikasi, dan routing Read-Write Splitting.',
            'summaryEn': 'You have mastered MySQL High Availability architecture: GTID replication, Semi-Synchronous durability, replica lag telemetry, and Read-Write Splitting routing.'
        },

        # WEEK 8 - CAPSTONE
        {
            'week': 8,
            'level': 'intermediate',
            'levelNameId': 'Konkurensi Transaksi, Replikasi & Skalabilitas Sharding',
            'levelNameEn': 'Transaction Concurrency, Replication & Sharding Scalability',
            'topicId': 'capstone-high-availability-financial-ledger',
            'titleId': 'Capstone Project: High-Availability Financial Ledger',
            'titleEn': 'Capstone Project: High-Availability Financial Ledger',
            'language': 'sql',
            'programId': 'Sistem Pembukuan Berpasangan (Double-Entry) dengan Kunci Idempotensi dan Audit Mutasi',
            'programEn': 'Double-Entry Bookkeeping Ledger with Idempotency Keys and Audit Mutations',
            'code': """-- CAPSTONE: High-Availability Financial Ledger & Sharded Transaction Store
-- Incorporates InnoDB Clustered Indexes, Double-Entry Bookkeeping, Idempotency, and Audit Trails

CREATE DATABASE IF NOT EXISTS core_ledger CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE core_ledger;

-- 1. Accounts Master Table (Assets, Liabilities, Equity, Revenue, Expense)
CREATE TABLE chart_of_accounts (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    account_number VARCHAR(32) NOT NULL,
    account_type ENUM('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE') NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    current_balance DECIMAL(18, 4) NOT NULL DEFAULT 0.0000,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_account_no (account_number)
) ENGINE=InnoDB;

-- 2. Journal Entries Header (Guarantees Idempotency from API Gateways)
CREATE TABLE journal_entries (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    idempotency_key VARCHAR(64) NOT NULL,
    reference_id VARCHAR(64) NOT NULL,
    description VARCHAR(255) NOT NULL,
    posted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_idempotency (idempotency_key),
    KEY idx_journal_posted (posted_at)
) ENGINE=InnoDB;

-- 3. Journal Lines (Double-Entry: Sum of Debits MUST EQUAL Sum of Credits)
CREATE TABLE journal_lines (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    journal_entry_id BIGINT UNSIGNED NOT NULL,
    account_id BIGINT UNSIGNED NOT NULL,
    direction ENUM('DEBIT', 'CREDIT') NOT NULL,
    amount DECIMAL(18, 4) NOT NULL CHECK (amount > 0.0000),
    PRIMARY KEY (id),
    KEY idx_entry_account (journal_entry_id, account_id),
    CONSTRAINT fk_lines_entry FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id) ON DELETE RESTRICT,
    CONSTRAINT fk_lines_account FOREIGN KEY (account_id) REFERENCES chart_of_accounts(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 4. Stored Procedure for Atomic Double-Entry Financial Posting
DELIMITER $$
CREATE PROCEDURE post_double_entry_transaction(
    IN p_idempotency_key VARCHAR(64),
    IN p_reference_id VARCHAR(64),
    IN p_description VARCHAR(255),
    IN p_debit_account_id BIGINT UNSIGNED,
    IN p_credit_account_id BIGINT UNSIGNED,
    IN p_amount DECIMAL(18, 4),
    OUT p_journal_id BIGINT UNSIGNED,
    OUT p_status_code VARCHAR(30)
)
proc_body: BEGIN
    DECLARE v_existing_id BIGINT UNSIGNED;

    -- Exit on any SQL error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_status_code = 'SYSTEM_ERROR';
    END;

    -- Check idempotency key first to prevent duplicate charges
    SELECT id INTO v_existing_id
    FROM journal_entries
    WHERE idempotency_key = p_idempotency_key;

    IF v_existing_id IS NOT NULL THEN
        SET p_journal_id = v_existing_id;
        SET p_status_code = 'IDEMPOTENT_DUPLICATE_ACCEPTED';
        LEAVE proc_body;
    END IF;

    IF p_debit_account_id = p_credit_account_id THEN
        SET p_status_code = 'IDENTICAL_ACCOUNTS_FORBIDDEN';
        LEAVE proc_body;
    END IF;

    START TRANSACTION;

    -- Insert Journal Header
    INSERT INTO journal_entries (idempotency_key, reference_id, description)
    VALUES (p_idempotency_key, p_reference_id, p_description);

    SET p_journal_id = LAST_INSERT_ID();

    -- Insert Debit Line
    INSERT INTO journal_lines (journal_entry_id, account_id, direction, amount)
    VALUES (p_journal_id, p_debit_account_id, 'DEBIT', p_amount);

    -- Insert Credit Line
    INSERT INTO journal_lines (journal_entry_id, account_id, direction, amount)
    VALUES (p_journal_id, p_credit_account_id, 'CREDIT', p_amount);

    -- Mutate Account Balances atomically with lock ordering (lower ID locked first to prevent deadlock)
    IF p_debit_account_id < p_credit_account_id THEN
        UPDATE chart_of_accounts SET current_balance = current_balance + p_amount WHERE id = p_debit_account_id;
        UPDATE chart_of_accounts SET current_balance = current_balance - p_amount WHERE id = p_credit_account_id;
    ELSE
        UPDATE chart_of_accounts SET current_balance = current_balance - p_amount WHERE id = p_credit_account_id;
        UPDATE chart_of_accounts SET current_balance = current_balance + p_amount WHERE id = p_debit_account_id;
    END IF;

    COMMIT;
    SET p_status_code = 'SUCCESS';
END$$
DELIMITER ;
""",
            'objectivesId': [
                'Mengintegrasikan seluruh materi kurikulum MySQL dalam sebuah capstone ledger finansial enterprise',
                'Menerapkan prinsip akuntansi double-entry: total mutasi Debit harus selalu seimbang dengan Credit',
                'Mengimplementasikan jaminan Idempotensi menggunakan kueri unik idempotency_key',
                'Mencegah deadlock secara matematis melalui pengurutan lock ID akun terstandarisasi'
            ],
            'objectivesEn': [
                'Synthesize the full MySQL curriculum into an enterprise financial ledger capstone',
                'Enforce strict double-entry bookkeeping: aggregate Debit mutations must strictly equal Credit totals',
                'Implement API Idempotency guarantees leveraging unique idempotency_key constraints',
                'Mathematically eliminate deadlocks through standardized ascending account lock ordering'
            ],
            'explanationId': """### Arsitektur Capstone Financial Ledger
Proyek capstone ini membangun fondasi sistem finansial perbankan modern di atas mesin MySQL InnoDB:
1. **Prinsip Pembukuan Berpasangan (Double-Entry Bookkeeping)**: Setiap pergerakan uang selalu dicatat sebagai dua sisi berpasangan (`DEBIT` dan `CREDIT`). Uang tidak pernah tercipta atau lenyap begitu saja; ia hanya berpindah dari satu akun aset/liabilitas ke akun lainnya.
2. **Kunci Idempotensi (Idempotency Keys)**: Pada sistem pembayaran, jika koneksi internet terputus tepat saat tombol bayar ditekan, aplikasi klien akan mengirimkan permintaan ulang (*retry*). Kolom `idempotency_key UNIQUE` memastikan transaksi dengan kunci yang sama tidak pernah memotong saldo nasabah dua kali.
3. **Pencegahan Deadlock Melalui Pengurutan Kunci**: Dengan memastikan akun dengan ID lebih kecil selalu dikunci terlebih dahulu sebelum akun dengan ID lebih besar (`IF debit_id < credit_id`), siklus melingkar (*circular wait*) dieliminasi secara matematis.""",
            'explanationEn': """### Capstone Financial Ledger Architecture
This capstone establishes the core architectural foundation of modern banking engines on MySQL InnoDB:
1. **Double-Entry Bookkeeping Principles**: Every monetary motion is logged as a balanced pair (`DEBIT` and `CREDIT`). Capital is never arbitrarily created or destroyed; it strictly transfers across asset, liability, and equity classifications.
2. **API Idempotency Guarantees**: In network payment workflows, gateway timeouts frequently prompt automated client retries. The `idempotency_key UNIQUE` constraint ensures replayed payloads acknowledge existing records without duplicate balance deductions.
3. **Mathematical Deadlock Elimination**: Standardizing lock acquisition order in ascending sequence (`IF debit_id < credit_id`) prevents the circular lock acquisition cycles that trigger engine deadlocks.""",
            'beginnerId': """Selamat! Anda telah membangun sistem perbankan nyata. Sistem pembukuan berpasangan ini adalah fondasi yang digunakan oleh seluruh bank di dunia sejak ratusan tahun lalu: setiap uang yang masuk ke dompet Anda, pasti berasal dari suatu sumber lain. 

Kunci idempotensi melindungi nasabah Anda agar uangnya tidak terpotong dua kali saat sinyal HP putus-nyambung, dan pengurutan kunci memastikan server database Anda tidak pernah macet (*deadlock*)!""",
            'beginnerEn': """Congratulations! You have constructed a true institutional banking ledger. Double-entry bookkeeping has powered global commerce for centuries: every penny entering your wallet originated from an identifiable counter-account.

Idempotency keys protect customers from double-billing during mobile connectivity drops, and ascending lock ordering guarantees your database server never freezes under deadlock contention!""",
            'experimentsId': [
                'Panggil sp_transfer_funds dua kali berturut-turut dengan idempotency_key yang sama dan amati kode IDEMPOTENT_DUPLICATE_ACCEPTED',
                'Coba transfer dengan debit_account_id yang sama dengan credit_account_id untuk melihat proteksi constraint',
                'Buat query verifikasi integritas pembukuan: periksa apakah SUM(Debit) == SUM(Credit) di tabel journal_lines',
                'Simulasikan transaksi konkuren 100 thread untuk membuktikan sistem bebas dari deadlock'
            ],
            'experimentsEn': [
                'Invoke sp_transfer_funds iteratively with identical idempotency_key values to observe IDEMPOTENT_DUPLICATE_ACCEPTED',
                'Attempt initiating a transfer where debit and credit accounts match to verify constraint guards',
                'Run a ledger integrity audit query: verify that global SUM(Debit) strictly equals SUM(Credit)',
                'Simulate 100 concurrent execution threads to empirically confirm zero deadlock incidents'
            ],
            'challengeId': 'Kembangkan sistem sharding horizontal untuk tabel `journal_lines`: gunakan declarative partitioning berdasarkan range bulan `posted_at`, dan tambahkan foreign key constraint terintegrasi.',
            'challengeEn': 'Architect horizontal table sharding for `journal_lines`: apply declarative range partitioning by `posted_at` month intervals while maintaining referential integrity.',
            'summaryId': 'Selamat! Anda telah menguasai seluruh spektrum teknologi MySQL: dari arsitektur InnoDB, Clustered Index, Covering Index, Full-Text & JSON, Gap Locks & Deadlocks, Stored Procedures, GTID Replication, hingga Capstone Double-Entry Financial Ledger.',
            'summaryEn': 'Congratulations! You have mastered the comprehensive MySQL continuum: InnoDB storage internals, Clustered Indexing, Covering Indexes, Full-Text & JSON, Gap Locking, Stored Procedures, GTID Replication, and a Double-Entry Financial Ledger Capstone.'
        }
    ]

    return {
        'slug': 'mysql',
        'track_name': 'MySQL',
        'levels': levels,
        'modules': modules
    }
