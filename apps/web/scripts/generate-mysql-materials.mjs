import { BaseGenerator } from './lib/base-generator.mjs';

const gen = new BaseGenerator('mysql', 'MySQL');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Dasar MySQL: tabel, query, join, index, stored procedure.',
    descEn: 'MySQL fundamentals: tables, queries, joins, indexes, stored procedures.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'MySQL lanjutan: transaksi, performa, replikasi, keamanan, proyek.',
    descEn: 'Advanced MySQL: transactions, performance, replication, security, project.',
  },
];

const MODULES = [
  {
    week: 1, level: 'beginer', topicId: 'dasar-mysql',
    titleId: 'Dasar MySQL & Tabel', titleEn: 'MySQL Basics & Tables',
    programId: 'Membuat Database & Tabel', programEn: 'Creating Database & Tables',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'sql',
    code: `CREATE DATABASE toko_db;
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
SELECT AVG(harga) AS rata_harga FROM produk;`,
    objectivesId: ["Memahami arsitektur MySQL","Membuat database dan tabel","AUTO_INCREMENT primary key","Constraint: PK, NOT NULL, UNIQUE, DEFAULT","Query SELECT dasar"],
    objectivesEn: ["Understand MySQL architecture","Create databases and tables","AUTO_INCREMENT primary key","Understand constraints","Run basic SELECT queries"],
    explanationId: `### Arsitektur MySQL
MySQL adalah RDBMS open-source populer untuk web application.

### Tipe Data
INT, DECIMAL, VARCHAR, TEXT, BOOLEAN, TIMESTAMP, ENUM.

### AUTO_INCREMENT
MySQL menggunakan AUTO_INCREMENT untuk primary key otomatis.

### Constraint
PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT, FOREIGN KEY.

### Query Dasar
SELECT, WHERE, COUNT, AVG, SUM.`,
    explanationEn: `### MySQL Architecture
Popular open-source RDBMS for web applications.

### Data Types
INT, DECIMAL, VARCHAR, TEXT, BOOLEAN, TIMESTAMP, ENUM.

### AUTO_INCREMENT
MySQL uses AUTO_INCREMENT for auto primary keys.

### Constraints
PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT, FOREIGN KEY.

### Basic Queries
SELECT with WHERE and aggregates.`,
    experimentsId: ["ALTER TABLE tambah kolom","Foreign key","ENUM type","INSERT dengan IGNORE"],
    experimentsEn: ["ALTER TABLE add column","Foreign key","ENUM type","INSERT IGNORE"],
    challengeId: `Database perpustakaan: buku, anggota, peminjaman.`,
    challengeEn: `Library database: books, members, loans.`,
    summaryId: `Minggu 1 dari 10: **Dasar MySQL & Tabel** (Pemula).`,
    summaryEn: `Week 1 of 10: **MySQL Basics & Tables** (Beginner).`,
  },
  {
    week: 2, level: 'beginer', topicId: 'crud-query',
    titleId: 'CRUD & Query Lanjutan', titleEn: 'CRUD & Advanced Queries',
    programId: 'Operasi Data Lengkap', programEn: 'Complete Data Operations',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'sql',
    code: `INSERT INTO produk (nama, harga, stok, kategori) VALUES
    ('Webcam HD', 650000, 40, 'Aksesoris'),
    ('SSD 512GB', 950000, 35, 'Storage');

SELECT nama, harga FROM produk
    WHERE harga BETWEEN 500000 AND 3000000
    ORDER BY harga DESC;

SELECT kategori, COUNT(*) AS jumlah, AVG(harga) AS rata
    FROM produk GROUP BY kategori HAVING COUNT(*) >= 2;

UPDATE produk SET harga = harga * 0.9
    WHERE kategori = 'Aksesoris';

UPDATE produk SET stok = stok - 5 WHERE nama = 'Laptop ASUS';

DELETE FROM produk WHERE stok = 0;

SELECT nama, harga FROM produk
    WHERE harga > (SELECT AVG(harga) FROM produk);

SELECT * FROM produk WHERE nama LIKE '%Logitech%';
SELECT * FROM pelanggan WHERE kota LIKE 'Jakarta%';`,
    objectivesId: ["INSERT data","UPDATE dengan WHERE","DELETE dengan WHERE","Subquery","GROUP BY HAVING"],
    objectivesEn: ["INSERT data","UPDATE with WHERE","DELETE with WHERE","Subqueries","GROUP BY HAVING"],
    explanationId: `### INSERT
Menambah baris baru ke tabel.

### UPDATE
Ubah data dengan WHERE clause.

### DELETE
Hapus data dengan WHERE.

### Subquery
Query di dalam query.

### GROUP BY & HAVING
GROUP BY mengelompokkan, HAVING filter kelompok.`,
    explanationEn: `### INSERT
Add new rows to table.

### UPDATE
Modify data with WHERE.

### DELETE
Remove data with WHERE.

### Subqueries
Query inside query.

### GROUP BY & HAVING
GROUP BY groups, HAVING filters.`,
    experimentsId: ["INSERT IGNORE","UPDATE dengan subquery","LIKE wildcard","Multiple GROUP BY"],
    experimentsEn: ["INSERT IGNORE","UPDATE with subquery","LIKE wildcard","Multiple GROUP BY"],
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
    id INT AUTO_INCREMENT PRIMARY KEY,
    pelanggan_id INT,
    tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (pelanggan_id) REFERENCES pelanggan(id)
);

CREATE TABLE detail_pesanan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pesanan_id INT,
    produk_id INT,
    jumlah INT NOT NULL,
    harga_satuan DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pesanan_id) REFERENCES pesanan(id),
    FOREIGN KEY (produk_id) REFERENCES produk(id)
);

INSERT INTO pelanggan (nama, email, kota) VALUES ('Rudi', 'rudi@mail.com', 'Medan');
INSERT INTO pesanan (pelanggan_id, status) VALUES (1,'completed'),(2,'completed'),(1,'pending');
INSERT INTO detail_pesanan (pesanan_id, produk_id, jumlah, harga_satuan) VALUES
    (1,1,1,12500000),(1,2,2,350000),(2,3,1,850000),(3,4,1,2800000);

SELECT p.nama AS pelanggan, ps.tanggal, ps.status
    FROM pesanan ps INNER JOIN pelanggan p ON p.id = ps.pelanggan_id;

SELECT p.nama, COALESCE(COUNT(ps.id),0) AS total
    FROM pelanggan p LEFT JOIN pesanan ps ON p.id = ps.pelanggan_id
    GROUP BY p.nama;

SELECT p.nama AS pelanggan, pr.nama AS produk,
    dp.jumlah, dp.harga_satuan,
    (dp.jumlah * dp.harga_satuan) AS subtotal
    FROM detail_pesanan dp
    JOIN pesanan ps ON ps.id = dp.pesanan_id
    JOIN pelanggan p ON p.id = ps.pelanggan_id
    JOIN produk pr ON pr.id = dp.produk_id
    ORDER BY subtotal DESC;`,
    objectivesId: ["FOREIGN KEY","INNER JOIN","LEFT JOIN","Multi-JOIN","Agregasi JOIN"],
    objectivesEn: ["FOREIGN KEY","INNER JOIN","LEFT JOIN","Multi-JOIN","Aggregation JOIN"],
    explanationId: `### FOREIGN KEY
Memastikan referential integrity antar tabel.

### INNER JOIN
Hanya baris yang cocok.

### LEFT JOIN
Semua baris kiri muncul.

### Multi-JOIN
Chain JOIN untuk multiple tabel.

### Agregasi + JOIN
GROUP BY dengan JOIN.`,
    explanationEn: `### FOREIGN KEY
Ensures referential integrity.

### INNER JOIN
Only matching rows.

### LEFT JOIN
All left rows appear.

### Multi-JOIN
Chain JOIN for multiple tables.

### Aggregation + JOIN
GROUP BY with JOIN.`,
    experimentsId: ["RIGHT JOIN","FULL OUTER JOIN","Self-join","Revenue per kota"],
    experimentsEn: ["RIGHT JOIN","FULL OUTER JOIN","Self-join","Revenue per city"],
    challengeId: `E-commerce DB: top 5 pelanggan, produk terlaris.`,
    challengeEn: `E-commerce DB: top 5 customers, best-sellers.`,
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
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pelanggan_id INT NOT NULL,
    produk_id INT NOT NULL,
    jumlah INT NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    tanggal DATE NOT NULL,
    metode_bayar VARCHAR(20),
    INDEX idx_pelanggan (pelanggan_id),
    INDEX idx_tanggal (tanggal)
);

EXPLAIN SELECT * FROM transaksi WHERE pelanggan_id = 42;

CREATE INDEX idx_tanggal_bayar ON transaksi(tanggal, metode_bayar);

EXPLAIN SELECT * FROM transaksi
    WHERE tanggal BETWEEN '2024-01-01' AND '2024-06-30'
    AND metode_bayar = 'transfer';

SELECT COUNT(*) AS total_rows,
    COUNT(DISTINCT pelanggan_id) AS unique_pelanggan
    FROM transaksi;

SHOW INDEX FROM transaksi;`,
    objectivesId: ["B-tree index di MySQL","EXPLAIN untuk query plan","Multi-column index","Index cardinality","Trade-off index"],
    objectivesEn: ["B-tree index in MySQL","EXPLAIN for query plan","Multi-column index","Index cardinality","Index trade-off"],
    explanationId: `### B-tree Index
Default index MySQL (InnoDB). Mempercepat pencarian.

### EXPLAIN
Menunjukkan execution plan MySQL.

### Multi-Column Index
Index pada multiple kolom. Leftmost prefix rule.

### Cardinality
Unik values dalam index. Semakin tinggi semakin efektif.

### Trade-off
Index cepat SELECT, lambat INSERT/UPDATE.`,
    explanationEn: `### B-tree Index
Default MySQL (InnoDB) index.

### EXPLAIN
Shows MySQL execution plan.

### Multi-Column Index
Index on multiple columns. Leftmost prefix rule.

### Cardinality
Unique values in index.

### Trade-off
Fast SELECT, slower writes.`,
    experimentsId: ["Bandingkan query time","Covering index","Index pada kolom duplikat","Force index"],
    experimentsEn: ["Compare query time","Covering index","Index on dup column","Force index"],
    challengeId: `Tabel besar, identifikasi slow query, tambah index.`,
    challengeEn: `Large table, identify slow queries, add indexes.`,
    summaryId: `Minggu 4 dari 10: **Index & Optimasi** (Pemula).`,
    summaryEn: `Week 4 of 10: **Indexes & Optimization** (Beginner).`,
  },
  {
    week: 5, level: 'beginer', topicId: 'stored-procedure',
    titleId: 'Stored Procedure & Function', titleEn: 'Stored Procedures & Functions',
    programId: 'Prosedur Tersimpan', programEn: 'Stored Procedures',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'sql',
    code: `DELIMITER //

CREATE PROCEDURE hitung_total_pajak(
    IN harga DECIMAL(10,2),
    IN persen_pajak DECIMAL(5,2),
    OUT total DECIMAL(10,2)
)
BEGIN
    SET total = harga + (harga * persen_pajak / 100);
END //

DELIMITER ;

CALL hitung_total_pajak(100000, 11, @result);
SELECT @result AS total_dengan_pajak;

DELIMITER //

CREATE FUNCTION diskon_by_total(total_belanja DECIMAL(12,2))
RETURNS DECIMAL(12,2)
DETERMINISTIC
BEGIN
    DECLARE diskon DECIMAL(12,2);
    IF total_belanja >= 1000000 THEN
        SET diskon = total_belanja * 0.1;
    ELSEIF total_belanja >= 500000 THEN
        SET diskon = total_belanja * 0.05;
    ELSE
        SET diskon = 0;
    END IF;
    RETURN diskon;
END //

DELIMITER ;

SELECT nama, harga, diskon_by_total(harga) AS diskon FROM produk;

DELIMITER //

CREATE PROCEDURE laporan_penjualan(IN bulan VARCHAR(7))
BEGIN
    SELECT kategori, COUNT(*) AS jumlah, SUM(harga * stok) AS nilai_stok
    FROM produk GROUP BY kategori;
END //

DELIMITER ;

CALL laporan_penjualan('2024-01');`,
    objectivesId: ["CREATE PROCEDURE dengan parameter IN/OUT","CREATE FUNCTION deterministic","IF/ELSE dalam prosedur","DECLARE variabel","CALL prosedur"],
    objectivesEn: ["CREATE PROCEDURE with IN/OUT params","CREATE FUNCTION deterministic","IF/ELSE in procedures","DECLARE variables","CALL procedures"],
    explanationId: `### Stored Procedure
Prosedur tersimpan di database. Parameter: IN, OUT, INOUT.

### Function
Fungsi mengembalikan nilai. Harus DETERMINISTIC atau READS SQL DATA.

### IF/ELSE
Kondisi dalam prosedur MySQL.

### DECLARE
Deklarasi variabel lokal.

### CALL
Memanggil stored procedure.`,
    explanationEn: `### Stored Procedure
Stored procedure in database. Params: IN, OUT, INOUT.

### Function
Returns a value. Must be DETERMINISTIC.

### IF/ELSE
Conditional in MySQL procedures.

### DECLARE
Local variable declaration.

### CALL
Call stored procedure.`,
    experimentsId: ["Procedure dengan cursor","Function kalkulasi","Error handler","Loop dalam prosedur"],
    experimentsEn: ["Procedure with cursor","Calculation function","Error handler","Loop in procedure"],
    challengeId: `Sistem prosedur: kalkulasi diskon, laporan stok, validasi data.`,
    challengeEn: `Procedure system: discount calculation, stock report, data validation.`,
    summaryId: `Minggu 5 dari 10: **Stored Procedure & Function** (Pemula).`,
    summaryEn: `Week 5 of 10: **Stored Procedures & Functions** (Beginner).`,
  },
  {
    week: 6, level: 'intermediate', topicId: 'transaksi-acid',
    titleId: 'Transaksi & ACID', titleEn: 'Transactions & ACID',
    programId: 'Manajemen Transaksi', programEn: 'Transaction Management',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'sql',
    code: `-- ACID Transaction
START TRANSACTION;

UPDATE produk SET stok = stok - 5 WHERE id = 1;
UPDATE produk SET stok = stok + 5 WHERE id = 2;

-- Cek hasil
SELECT id, nama, stok FROM produk WHERE id IN (1, 2);

COMMIT;

-- Rollback example
START TRANSACTION;

UPDATE produk SET harga = harga * 2 WHERE kategori = 'Elektronik';

-- Oops, salah! Rollback
ROLLBACK;

SELECT id, nama, harga FROM produk WHERE kategori = 'Elektronik';

-- Savepoint
START TRANSACTION;

UPDATE produk SET stok = stok - 10 WHERE id = 1;
SAVEPOINT sebelum_update_harga;

UPDATE produk SET harga = harga * 1.1 WHERE id = 1;

-- Rollback ke savepoint
ROLLBACK TO SAVEPOINT sebelum_update_harga;

COMMIT;

-- Isolation Level
SELECT @@transaction_isolation;
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Locking
SELECT * FROM produk WHERE id = 1 FOR UPDATE;

START TRANSACTION;
SELECT * FROM produk WHERE kategori = 'Elektronik' FOR UPDATE;
-- Proses bisnis...
COMMIT;`,
    objectivesId: ["START TRANSACTION, COMMIT, ROLLBACK","SAVEPOINT dan ROLLBACK TO","ACID properties","Isolation levels","Locking dengan FOR UPDATE"],
    objectivesEn: ["START TRANSACTION, COMMIT, ROLLBACK","SAVEPOINT and ROLLBACK TO","ACID properties","Isolation levels","Locking with FOR UPDATE"],
    explanationId: `### ACID
Atomicity, Consistency, Isolation, Durability.

### COMMIT & ROLLBACK
COMMIT simpan permanen. ROLLBACK batalkan.

### SAVEPOINT
Titik rollback di dalam transaksi.

### Isolation Levels
READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE.

### Locking
FOR UPDATE mengunci baris untuk transaksi lain.`,
    explanationEn: `### ACID
Atomicity, Consistency, Isolation, Durability.

### COMMIT & ROLLBACK
COMMIT saves permanently. ROLLBACK cancels.

### SAVEPOINT
Rollback point within transaction.

### Isolation Levels
READ UNCOMMITTED to SERIALIZABLE.

### Locking
FOR UPDATE locks rows.`,
    experimentsId: ["Deadlock scenario","Gap locking","Optimistic locking","Transaction log"],
    experimentsEn: ["Deadlock scenario","Gap locking","Optimistic locking","Transaction log"],
    challengeId: `Sistem transfer saldo: transaksi aman dengan rollback.`,
    challengeEn: `Balance transfer system: safe transactions with rollback.`,
    summaryId: `Minggu 6 dari 10: **Transaksi & ACID** (Menengah).`,
    summaryEn: `Week 6 of 10: **Transactions & ACID** (Intermediate).`,
  },
  {
    week: 7, level: 'intermediate', topicId: 'performa-tuning',
    titleId: 'Performa & Tuning', titleEn: 'Performance & Tuning',
    programId: 'Optimasi MySQL', programEn: 'MySQL Optimization',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'sql',
    code: `EXPLAIN ANALYZE
    SELECT p.nama, SUM(dp.jumlah * dp.harga_satuan) AS total
    FROM detail_pesanan dp
    JOIN pesanan ps ON ps.id = dp.pesanan_id
    JOIN pelanggan p ON p.id = ps.pelanggan_id
    WHERE ps.tanggal > DATE_SUB(NOW(), INTERVAL 30 DAY)
    GROUP BY p.nama ORDER BY total DESC;

-- Query cache & optimizer
SELECT @@query_cache_type;
SELECT @@innodb_buffer_pool_size;

-- Slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;

-- Cek status
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Slow_queries';
SHOW STATUS LIKE 'Innodb_buffer_pool_read%';

-- Cek proses aktif
SHOW PROCESSLIST;

-- Optimize table
OPTIMIZE TABLE produk;

-- Analisis tabel
ANALYZE TABLE produk;

-- Konfigurasi penting
-- innodb_buffer_pool_size = 70% RAM
-- innodb_log_file_size = 1GB
-- max_connections = 200
-- query_cache_size = 64M
-- tmp_table_size = 256M`,
    objectivesId: ["EXPLAIN ANALYZE","Slow query log","InnoDB buffer pool","Monitoring status","OPTIMIZE TABLE"],
    objectivesEn: ["EXPLAIN ANALYZE","Slow query log","InnoDB buffer pool","Status monitoring","OPTIMIZE TABLE"],
    explanationId: `### EXPLAIN ANALYZE
Menunjukkan execution plan dan waktu.

### Slow Query Log
Catat query lambat untuk analisis.

### InnoDB Buffer Pool
Cache data dan index di memory.

### Monitoring
SHOW STATUS untuk metrik server.

### OPTIMIZE
Defragmentasi tabel InnoDB.`,
    explanationEn: `### EXPLAIN ANALYZE
Shows execution plan and time.

### Slow Query Log
Log slow queries for analysis.

### InnoDB Buffer Pool
Cache data and indexes in memory.

### Monitoring
SHOW STATUS for server metrics.

### OPTIMIZE
Defragment InnoDB tables.`,
    experimentsId: ["Tuning buffer pool","Query cache","Partitioning","Connection pooling"],
    experimentsEn: ["Buffer pool tuning","Query cache","Partitioning","Connection pooling"],
    challengeId: `Optimasi: identifikasi slow query, tuning config.`,
    challengeEn: `Optimize: identify slow queries, tune config.`,
    summaryId: `Minggu 7 dari 10: **Performa & Tuning** (Menengah).`,
    summaryEn: `Week 7 of 10: **Performance & Tuning** (Intermediate).`,
  },
  {
    week: 8, level: 'intermediate', topicId: 'replikasi',
    titleId: 'Replikasi & High Availability', titleEn: 'Replication & High Availability',
    programId: 'MySQL Replication', programEn: 'MySQL Replication',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'sql',
    code: `-- KONFIGURASI MASTER (my.cnf)
-- server-id = 1
-- log-bin = mysql-bin
-- binlog-format = ROW

CREATE USER 'replicator'@'%' IDENTIFIED BY 'secure_pass';
GRANT REPLICATION SLAVE ON *.* TO 'replicator'@'%';

FLUSH TABLES WITH READ LOCK;
SHOW MASTER STATUS;
-- Catat File dan Position
UNLOCK TABLES;

-- KONFIGURASI SLAVE (my.cnf)
-- server-id = 2
-- relay-log = mysql-relay-bin
-- read-only = 1

-- Di slave:
-- CHANGE MASTER TO
--     MASTER_HOST='master_host',
--     MASTER_USER='replicator',
--     MASTER_PASSWORD='secure_pass',
--     MASTER_LOG_FILE='mysql-bin.000001',
--     MASTER_LOG_POS=1234;

START SLAVE;

-- Cek status slave
SHOW SLAVE STATUS\\G

-- Cek lag
SELECT
    Master_Log_File,
    Read_Master_Log_Pos,
    Seconds_Behind_Master
FROM performance_schema.replication_connection_status;

-- Group Replication (MySQL 8.0+)
-- SET GLOBAL group_replication_bootstrap_group=ON;
-- START GROUP_REPLICATION;`,
    objectivesId: ["Master-Slave replication","Binary log","CHANGE MAVE SLAVE","Monitoring slave status","Group Replication"],
    objectivesEn: ["Master-Slave replication","Binary log","CHANGE MASTER","Slave status monitoring","Group Replication"],
    explanationId: `### Binary Log
Log semua perubahan data untuk replikasi.

### Master-Slave
Master tulis, slave baca replika data.

### CHANGE MASTER
Konfigurasi koneksi slave ke master.

### Monitoring
SHOW SLAVE STATUS untuk lag dan error.

### Group Replication
Multi-master replication MySQL 8.0+.`,
    explanationEn: `### Binary Log
Log of all data changes for replication.

### Master-Slave
Master writes, slave reads replicated data.

### CHANGE MASTER
Configure slave connection to master.

### Monitoring
SHOW SLAVE STATUS for lag and errors.

### Group Replication
Multi-master replication MySQL 8.0+.`,
    experimentsId: ["Setup Docker replication","Ukur lag","Failover manual","Read/write splitting"],
    experimentsEn: ["Docker replication setup","Measure lag","Manual failover","Read/write splitting"],
    challengeId: `Setup replikasi: master + slave + monitoring.`,
    challengeEn: `Setup replication: master + slave + monitoring.`,
    summaryId: `Minggu 8 dari 10: **Replikasi & HA** (Menengah).`,
    summaryEn: `Week 8 of 10: **Replication & HA** (Intermediate).`,
  },
  {
    week: 9, level: 'intermediate', topicId: 'keamanan',
    titleId: 'Keamanan & User Management', titleEn: 'Security & User Management',
    programId: 'Keamanan Database', programEn: 'Database Security',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'sql',
    code: `-- User management
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'strong_password';
CREATE USER 'readonly_user'@'%' IDENTIFIED BY 'readonly_pass';

-- Grant privileges
GRANT SELECT, INSERT, UPDATE ON toko_db.produk TO 'app_user'@'localhost';
GRANT SELECT ON toko_db.* TO 'readonly_user'@'%';

-- Revoke
REVOKE UPDATE ON toko_db.produk FROM 'app_user'@'localhost';

-- Lihat grants
SHOW GRANTS FOR 'app_user'@'localhost';

-- Role (MySQL 8.0+)
CREATE ROLE 'app_read', 'app_write';
GRANT SELECT ON toko_db.* TO 'app_read';
GRANT INSERT, UPDATE ON toko_db.* TO 'app_write';
GRANT 'app_read', 'app_write' TO 'app_user'@'localhost';
SET DEFAULT ROLE ALL TO 'app_user'@'localhost';

-- SSL/TLS
-- REQUIRE SSL pada user
ALTER USER 'app_user'@'localhost' REQUIRE SSL;

-- Audit: cek login gagal
SELECT user, host, account_locked
    FROM mysql.user WHERE account_locked = 'Y';

-- Backup
-- mysqldump -u root -p toko_db > backup.sql

-- Restore
-- mysql -u root -p toko_db < backup.sql`,
    objectivesId: ["CREATE USER dan GRANT","REVOKE privileges","Role-based access","SSL/TLS connection","Backup dan restore"],
    objectivesEn: ["CREATE USER and GRANT","REVOKE privileges","Role-based access","SSL/TLS connections","Backup and restore"],
    explanationId: `### User Management
Buat user dengan host spesifik.

### GRANT & REVOKE
Beri dan cabut privileges.

### Role
Kelompok privileges untuk assignment mudah.

### SSL
Koneksi encrypted ke database.

### Backup
mysqldump untuk logical backup.`,
    explanationEn: `### User Management
Create users with specific hosts.

### GRANT & REVOKE
Grant and revoke privileges.

### Roles
Privilege groups for easy assignment.

### SSL
Encrypted database connections.

### Backup
mysqldump for logical backup.`,
    experimentsId: ["Row-level security","Audit plugin","Encrypted columns","Password policy"],
    experimentsEn: ["Row-level security","Audit plugin","Encrypted columns","Password policy"],
    challengeId: `Setup keamanan: user, role, SSL, backup strategy.`,
    challengeEn: `Setup security: users, roles, SSL, backup strategy.`,
    summaryId: `Minggu 9 dari 10: **Keamanan & User Management** (Menengah).`,
    summaryEn: `Week 9 of 10: **Security & User Management** (Intermediate).`,
  },
  {
    week: 10, level: 'intermediate', topicId: 'capstone-project',
    titleId: 'Capstone: E-Commerce Database', titleEn: 'Capstone: E-Commerce Database',
    programId: 'Database Production-Ready', programEn: 'Production-Ready Database',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'sql',
    code: `-- CAPSTONE: E-Commerce MySQL Database

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(200) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    stock INT DEFAULT 0,
    attributes JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    INDEX idx_category (category_id),
    INDEX idx_sku (sku)
);

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    city VARCHAR(50)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    status ENUM('pending','paid','shipped','completed','cancelled') DEFAULT 'pending',
    total DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    INDEX idx_customer (customer_id),
    INDEX idx_status (status)
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

DELIMITER //
CREATE TRIGGER trg_update_stock
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products SET stock = stock - NEW.quantity WHERE id = NEW.product_id;
END //
DELIMITER ;

CREATE VIEW v_sales_report AS
SELECT c.name AS category, COUNT(DISTINCT o.id) AS total_orders,
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
JOIN categories c ON c.id = p.category_id
JOIN orders o ON o.id = oi.order_id
WHERE o.status = 'completed'
GROUP BY c.name;`,
    objectivesId: ["Schema production-ready","ENUM type","JSON column","Trigger auto-update","View untuk laporan"],
    objectivesEn: ["Production-ready schema","ENUM type","JSON column","Auto-update trigger","Views for reports"],
    explanationId: `### Schema Design
Relasi antar tabel dengan foreign key.

### ENUM
Tipe data pilihan: status order.

### JSON
Atribut produk fleksibel.

### Trigger
Auto-update stok setelah order.

### View
Laporan penjualan per kategori.`,
    explanationEn: `### Schema Design
Table relations with foreign keys.

### ENUM
Choice data type: order status.

### JSON
Flexible product attributes.

### Triggers
Auto-update stock after order.

### Views
Sales reports per category.`,
    experimentsId: ["Partitioning","Full-text search","Soft delete","Audit log"],
    experimentsEn: ["Partitioning","Full-text search","Soft delete","Audit log"],
    challengeId: `Deploy database e-commerce MySQL lengkap.`,
    challengeEn: `Deploy complete MySQL e-commerce database.`,
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
