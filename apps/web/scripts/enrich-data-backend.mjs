// Enrichment data: mysql, postgresql, redis, nodejs, django
// Structure: DATA_SQL[slug][themeKey] = { titleId/En, introId/En, lang, codeId/En, concepts, expsId/En, serId/En }
export const DATA_SQL = {
  mysql: {
    "week6-transaksi-acid": {
      titleId: "Simulasi Transaksi Transfer", titleEn: "Transfer Transaction Simulation",
      introId: "Program ini mensimulasikan transfer saldo antar rekening lengkap dengan pencatatan mutasi, seperti yang dijalankan aplikasi perbankan sungguhan.",
      introEn: "This program simulates a fund transfer between accounts complete with ledger entries, exactly what a real banking app executes.",
      lang: "sql",
      codeId: `-- Simulasi transfer antar rekening (prinsip ACID)
-- Playground menjalankan SQLite; di MySQL asli bungkus langkah ini
-- dengan START TRANSACTION ... COMMIT / ROLLBACK.

-- Pindahkan 10 juta dari Eko (id=5) ke Dewi (id=4)
UPDATE employees SET salary = salary - 10000000 WHERE id = 5;
UPDATE employees SET salary = salary + 10000000 WHERE id = 4;

-- Tabel mutasi untuk jejak audit
CREATE TABLE transfers (
  transfer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_id INTEGER NOT NULL,
  to_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  transfer_date TEXT NOT NULL
);
INSERT INTO transfers (from_id, to_id, amount, transfer_date)
VALUES (5, 4, 10000000, '2026-01-20');

-- Verifikasi: total payroll tidak boleh berubah
SELECT SUM(salary) AS total_payroll FROM employees;

-- Audit: gabungkan nama pengirim dan penerima
SELECT t.transfer_id,
       s.name AS pengirim,
       r.name AS penerima,
       t.amount, t.transfer_date
FROM transfers t
JOIN employees s ON s.id = t.from_id
JOIN employees r ON r.id = t.to_id;`,
      codeEn: `-- Funds transfer simulation (ACID in practice)
-- The playground runs SQLite; on real MySQL wrap the steps in
-- START TRANSACTION ... COMMIT / ROLLBACK.

-- Move 10M from Eko (id=5) to Dewi (id=4)
UPDATE employees SET salary = salary - 10000000 WHERE id = 5;
UPDATE employees SET salary = salary + 10000000 WHERE id = 4;

-- Ledger table for the audit trail
CREATE TABLE transfers (
  transfer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_id INTEGER NOT NULL,
  to_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  transfer_date TEXT NOT NULL
);
INSERT INTO transfers (from_id, to_id, amount, transfer_date)
VALUES (5, 4, 10000000, '2026-01-20');

-- Verification: total payroll must stay unchanged
SELECT SUM(salary) AS total_payroll FROM employees;

-- Audit: join sender and receiver names
SELECT t.transfer_id,
       s.name AS sender,
       r.name AS receiver,
       t.amount, t.transfer_date
FROM transfers t
JOIN employees s ON s.id = t.from_id
JOIN employees r ON r.id = t.to_id;`,
      concepts: [
        ["Atomicity (Atomicitas)", "Semua langkah transfer adalah satu unit: jika satu UPDATE gagal, semuanya dibatalkan. Tanpa ini uang bisa \"menghilang\" di tengah proses."],
        ["Consistency (Konsistensi)", "Constraint (PRIMARY KEY, NOT NULL) menjaga data tetap valid sebelum dan sesudah transaksi. Total payroll yang tetap adalah sanity check-nya."],
        ["Isolation (Isolasi)", "Klien bersamaan tidak boleh melihat \"setengah transfer\". Default MySQL InnoDB = REPEATABLE READ: transaksi membaca snapshot data."],
        ["Durability (Durabilitas)", "Setelah COMMIT sukses, data aman walau server mati detik berikutnya — InnoDB menulis ke redo log sebelum mengakui COMMIT."],
      ],
      expsId: ["Coba jumlah transfer 5.000.000 lalu bandingkan hasil SUM sebelum & sesudah.", "Tambah kolom `note TEXT` pada transfers dan isi alasan transfer.", "Tulis SELECT yang mendeteksi transfer bila saldo pengirim kurang dari amount."],
      expsEn: ["Try a 5,000,000 transfer and compare SUM before vs after.", "Add a `note TEXT` column to transfers and fill in a reason.", "Write the SELECT that would reject transfers when the sender lacks funds."],
      serId: "Buat potongan gaji 10% untuk seluruh karyawan dan catat setiap potongan ke tabel transfers sebagai iuran kas perusahaan.",
      serEn: "Build a 10% payroll deduction for every employee and log each cut into the transfers table as company treasury income.",
    },
    "week7-performa-tuning": {
      titleId: "Menganalisis Query dengan EXPLAIN", titleEn: "Analyzing Queries with EXPLAIN",
      introId: "Tuning dimulai dari membaca rencana eksekusi: apakah index dipakai, di mana full scan terjadi, lalu perbaiki.",
      introEn: "Tuning starts with the execution plan: is an index used, where the full scan happens, then fix it.",
      lang: "sql",
      codeId: `-- Query awal: semua pesanan Januari kategori Electronics
SELECT o.customer, p.name, p.price
FROM orders o
JOIN products p ON p.id = o.product_id
WHERE p.category = 'Electronics' AND o.order_date LIKE '2024-01%';

-- Rencana eksekusi (SQLite meniru EXPLAIN MySQL)
EXPLAIN QUERY PLAN
SELECT customer FROM orders WHERE order_date LIKE '2024-01%';

-- Optimasi 1: index pada kolom yang difilter
CREATE INDEX idx_orders_date ON orders(order_date);
EXPLAIN QUERY PLAN
SELECT customer FROM orders WHERE order_date LIKE '2024-01%';

-- Anti-pattern: fungsi di kolom berindex memaksa full scan
EXPLAIN QUERY PLAN
SELECT customer FROM orders WHERE SUBSTR(order_date, 1, 7) = '2024-01';

-- Aggregate yang sering dipakai dashboard
SELECT department, ROUND(AVG(salary), 0) AS rata_gaji
FROM employees
GROUP BY department
ORDER BY rata_gaji DESC;`,
      codeEn: `-- Starting query: every January order in Electronics
SELECT o.customer, p.name, p.price
FROM orders o
JOIN products p ON p.id = o.product_id
WHERE p.category = 'Electronics' AND o.order_date LIKE '2024-01%';

-- Execution plan (SQLite mirrors MySQL EXPLAIN)
EXPLAIN QUERY PLAN
SELECT customer FROM orders WHERE order_date LIKE '2024-01%';

-- Fix 1: index on the filtered column
CREATE INDEX idx_orders_date ON orders(order_date);
EXPLAIN QUERY PLAN
SELECT customer FROM orders WHERE order_date LIKE '2024-01%';

-- Anti-pattern: a function on an indexed column forces a full scan
EXPLAIN QUERY PLAN
SELECT customer FROM orders WHERE SUBSTR(order_date, 1, 7) = '2024-01';

-- Dashboard-style aggregation
SELECT department, ROUND(AVG(salary), 0) AS avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;`,
      concepts: [
        ["Membaca EXPLAIN", "SCAN TABLE = membaca seluruh baris (mahal di jutaan data); SEARCH ... USING INDEX berarti index B-tree dipakai. Bandingkan angka estimated rows sebelum dan sesudah."],
        ["Aturan SARGable", "Tulis filter dengan kolom \"telanjang\". SUBSTR(order_date,1,7)=... menghancurkan index; LIKE '2024-01%' tetap baik karena prefix."],
        ["Index punya biaya", "Index mempercepat SELECT namun memperlambat INSERT/UPDATE/DELETE dan menambah storage. Beri index hanya pada kolom yang sering dipakai filter/JOIN."],
        ["Ukur, jangan menduga", "Gunakan EXPLAIN dan statistik runtime (SHOW PROFILE di MySQL) sebelum berharap optimasi bekerja. Ukur dahulu, baru optimasi."],
      ],
      expsId: ["Buat index gabungan (product_id, order_date) pada orders; bandingkan rencana JOIN-nya.", "Ubah aggregate: total nilai order per bulan yang diurutkan menurun.", "Cari departemen dengan rata-rata gaji di atas 80 juta lewat HAVING, lalu jalankan EXPLAIN-nya."],
      expsEn: ["Create a composite index (product_id, order_date) on orders and re-inspect the JOIN plan.", "Reshape the aggregation: total order value per month, sorted descending.", "Use HAVING to find departments averaging above 80M, then EXPLAIN it."],
      serId: "Tulis query lambat buatanmu sendiri, jalankan EXPLAIN, lalu tambahkan index yang memperbaikinya dan buktikan lewat EXPLAIN baru.",
      serEn: "Write your own slow query, EXPLAIN it, add an index that fixes it, and prove it with a new EXPLAIN.",
    },
    "week8-replikasi": {
      titleId: "Arsitektur Replikasi & Lag", titleEn: "Replication Architecture & Lag",
      introId: "Replikasi menyalin perubahan dari primary ke replica. Program ini mensimulasikan binlog, GTID, dan deteksi lag.",
      introEn: "Replication copies changes from the primary to replicas. This program simulates the binlog, GTIDs, and lag detection.",
      lang: "sql",
      codeId: `-- Tabel binlog sederhana (simulasi)
CREATE TABLE binlog (
  gtid INTEGER PRIMARY KEY AUTOINCREMENT,
  event TEXT NOT NULL,           -- INSERT/UPDATE/DELETE
  payload TEXT NOT NULL,         -- data yang direplikasi
  logged_at TEXT NOT NULL
);

-- Perubahan di primary selalu dicatat sebelum dikirim ke replica
INSERT INTO binlog (event, payload, logged_at)
VALUES ('INSERT', '{"id":6,"name":"Fajar","dept":"QA"}', '2026-01-20T10:00:00Z');
INSERT INTO binlog (event, payload, logged_at)
VALUES ('UPDATE', '{"id":3,"salary":100000000}', '2026-01-20T10:05:00Z');

-- Posisi ter-applied per replica (+ lag)
CREATE TABLE replica_state (
  replica_name TEXT PRIMARY KEY,
  applied_gtid INTEGER NOT NULL,
  lag_seconds INTEGER NOT NULL
);
INSERT INTO replica_state VALUES ('replica-1', 1, 3);
INSERT INTO replica_state VALUES ('replica-2', 1, 0);

-- Event yang belum diterapkan per replica
SELECT r.replica_name, ev.gtid, ev.event, ev.payload
FROM replica_state r
JOIN binlog ev ON ev.gtid > r.applied_gtid
ORDER BY r.replica_name, ev.gtid;

-- Kesehatan replikasi: behind tinggi = risiko data stale
SELECT replica_name,
       applied_gtid AS applied,
       (SELECT MAX(gtid) FROM binlog) - applied_gtid AS behind,
       lag_seconds
FROM replica_state
ORDER BY behind DESC;`,
      codeEn: `-- Minimal binlog table (simulation)
CREATE TABLE binlog (
  gtid INTEGER PRIMARY KEY AUTOINCREMENT,
  event TEXT NOT NULL,           -- INSERT/UPDATE/DELETE
  payload TEXT NOT NULL,         -- replicated payload
  logged_at TEXT NOT NULL
);

-- Primary always logs BEFORE sending to replicas
INSERT INTO binlog (event, payload, logged_at)
VALUES ('INSERT', '{"id":6,"name":"Fajar","dept":"QA"}', '2026-01-20T10:00:00Z');
INSERT INTO binlog (event, payload, logged_at)
VALUES ('UPDATE', '{"id":3,"salary":100000000}', '2026-01-20T10:05:00Z');

-- Applied position per replica (+ lag)
CREATE TABLE replica_state (
  replica_name TEXT PRIMARY KEY,
  applied_gtid INTEGER NOT NULL,
  lag_seconds INTEGER NOT NULL
);
INSERT INTO replica_state VALUES ('replica-1', 1, 3);
INSERT INTO replica_state VALUES ('replica-2', 1, 0);

-- Events not yet applied per replica
SELECT r.replica_name, ev.gtid, ev.event, ev.payload
FROM replica_state r
JOIN binlog ev ON ev.gtid > r.applied_gtid
ORDER BY r.replica_name, ev.gtid;

-- Replication health: high behind = stale-read risk
SELECT replica_name,
       applied_gtid AS applied,
       (SELECT MAX(gtid) FROM binlog) - applied_gtid AS behind,
       lag_seconds
FROM replica_state
ORDER BY behind DESC;`,
      concepts: [
        ["Binlog format ROW vs STATEMENT", "ROW mencatat perubahan per baris (aman, replay deterministik); STATEMENT menyimpan SQL asli (rawan NOW()/LIMIT non-deterministik)."],
        ["GTID", "Identitas global per transaksi. Failover tidak perlu mencari posisi byte manual — cukup terapkan semua GTID yang belum diterapkan."],
        ["Asinkron & Semi-sync", "Default MySQL = asynchronous: primary lanjut tanpa menunggu replica (latensi rendah, lag mungkin). Semi-sync menunggu minimal satu replica menerima event."],
        ["Read scaling", "SELECT dikirim ke replica untuk meringankan primary; tulis tetap di primary — dua penulis paralel (split-brain) merusak konsistensi."],
      ],
      expsId: ["Tambahkan event DELETE ke binlog; lihat replica mana yang tertinggal.", "Set applied_gtid=0 untuk replica-2 — berapa event harus diterapkan?", "Ubah query kesehatan jadi alert: hanya tampilkan replica dengan behind > 2."],
      expsEn: ["Append a DELETE event to the binlog; observe which replica lags.", "Set replica-2 applied_gtid=0 — how many events must it apply?", "Turn the health query into an alert: only replicas with behind > 2."],
      serId: "Modelkan failover: tulis SQL yang mempromosikan replica dengan applied_gtid terbesar jadi primary dan geser sisanya.",
      serEn: "Model failover: write the SQL promoting the replica with the highest applied_gtid to primary and re-slaving the rest.",
    },
    "week9-keamanan": {
      titleId: "User Management & Access Control", titleEn: "User Management & Access Control",
      introId: "Program ini membangun model akses: peran, hak granular, audit trail, dan prinsip least privilege.",
      introEn: "This program builds an access model: roles, granular rights, an audit trail, and least privilege.",
      lang: "sql",
      codeId: `-- Model peran (MySQL asli: CREATE ROLE 'analyst')
CREATE TABLE roles (
  role_id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_name TEXT NOT NULL,
  can_select TEXT, can_insert TEXT, can_update TEXT, can_delete TEXT
);
INSERT INTO roles VALUES
 (1, 'admin', '*', '*', '*', '*'),
 (2, 'analyst', 'employees,orders,products', NULL, NULL, NULL),
 (3, 'app_runtime', 'orders', 'orders', 'orders', NULL);

-- User & pemetaan perannya
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  role_id INTEGER NOT NULL REFERENCES roles(role_id)
);
INSERT INTO users (username, role_id) VALUES ('svc_erp', 3), ('budi_analyst', 2);

-- Audit trail: siapa melakukan apa
CREATE TABLE audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT, action TEXT, table_name TEXT, at TEXT
);
INSERT INTO audit_log VALUES (1, 'svc_erp', 'INSERT', 'orders', '2026-01-20 09:00');
INSERT INTO audit_log VALUES (2, 'budi_analyst', 'SELECT', 'employees', '2026-01-20 09:15');

-- Auditor: aktivitas berbahaya — hapus oleh non-admin
SELECT a.username, a.action, a.table_name
FROM audit_log a
JOIN users u ON u.username = a.username
JOIN roles r ON r.role_id = u.role_id
WHERE a.action = 'DELETE' AND r.role_name <> 'admin';

-- Ikhtisar aktivitas per user
SELECT a.username, a.action, COUNT(*) AS total
FROM audit_log a GROUP BY a.username, a.action;`,
      codeEn: `-- Role model (real MySQL: CREATE ROLE 'analyst')
CREATE TABLE roles (
  role_id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_name TEXT NOT NULL,
  can_select TEXT, can_insert TEXT, can_update TEXT, can_delete TEXT
);
INSERT INTO roles VALUES
 (1, 'admin', '*', '*', '*', '*'),
 (2, 'analyst', 'employees,orders,products', NULL, NULL, NULL),
 (3, 'app_runtime', 'orders', 'orders', 'orders', NULL);

-- Users and their role mapping
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  role_id INTEGER NOT NULL REFERENCES roles(role_id)
);
INSERT INTO users (username, role_id) VALUES ('svc_erp', 3), ('budi_analyst', 2);

-- Audit trail: who did what
CREATE TABLE audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT, action TEXT, table_name TEXT, at TEXT
);
INSERT INTO audit_log VALUES (1, 'svc_erp', 'INSERT', 'orders', '2026-01-20 09:00');
INSERT INTO audit_log VALUES (2, 'budi_analyst', 'SELECT', 'employees', '2026-01-20 09:15');

-- Auditor: dangerous activity — deletes by non-admins
SELECT a.username, a.action, a.table_name
FROM audit_log a
JOIN users u ON u.username = a.username
JOIN roles r ON r.role_id = u.role_id
WHERE a.action = 'DELETE' AND r.role_name <> 'admin';

-- Activity overview per user
SELECT a.username, a.action, COUNT(*) AS total
FROM audit_log a GROUP BY a.username, a.action;`,
      concepts: [
        ["GRANT granular", "Di MySQL: GRANT SELECT, INSERT ON db.orders TO 'app'@'%' — scope bisa dibatasi per tabel, bahkan per kolom. Hindari hak ALL yang luas."],
        ["Least privilege", "Service account diberi hak minimal untuk jalur aplikasi, bukan admin. Bila akun bocor, dampaknya lebih kecil."],
        ["Rotasi & audit", "GRANT/REVOKE bersama audit_log mencatat: siapa, aksi apa, tabel mana, kapan. Gabungan ini wajib untuk kepatuhan (SOX, PCI-DSS)."],
        ["Anti SQL injection", "Gunakan parameterized query (? / :param) di aplikasi; buang concatenation string yang membuka injeksi query."],
      ],
      expsId: ["Tambah user baru dengan peran admin lalu cek semua aksesnya lewat JOIN roles.", "Catat aksi DELETE budi_analyst ke audit_log dan pastikan query deteksi menangkapnya.", "Tulis report: total aksi per username per hari."],
      expsEn: ["Add a new admin user and verify every grant via the roles JOIN.", "Log a budi_analyst DELETE action and ensure the detector catches it.", "Write a report: total actions per username per day."],
      serId: "Perketat model: larang analyst men-query kolom `salary` — tambahkan tabel can_select_column lalu tulis detektor pelanggaran kolomnya.",
      serEn: "Tighten the model: forbid analysts from querying the `salary` column — add a column-grant table and write its violation detector.",
    },
  },

  postgresql: {
    "week9-replikasi-ha": {
      titleId: "Simulasi Streaming Replication", titleEn: "Simulating Streaming Replication",
      introId: "Program memodelkan WAL streaming PostgreSQL, posisi LSN, dan pemilihan primary saat failover.",
      introEn: "This program models PostgreSQL WAL streaming, the LSN position, and primary selection during failover.",
      lang: "sql",
      codeId: `-- WAL (Write-Ahead Log) — setiap perubahan ditulis duluan ke log
CREATE TABLE wal_archive (
  lsn INTEGER PRIMARY KEY,       -- Log Sequence Number
  record TEXT NOT NULL,          -- tipe perubahan + payload
  commit_time TEXT NOT NULL
);
INSERT INTO wal_archive VALUES (100, 'UPDATE employees SET salary=90000000 WHERE id=1', '2026-01-20T10:00:00Z');
INSERT INTO wal_archive VALUES (110, 'INSERT orders VALUES (6, ...)', '2026-01-20T10:00:05Z');

-- Standby streaming dari LSN tertentu
CREATE TABLE standby_state (
  standby_name TEXT PRIMARY KEY,
  replayed_lsn INTEGER NOT NULL,
  lag_seconds INTEGER NOT NULL
);
INSERT INTO standby_state VALUES ('standby-a', 110, 0);
INSERT INTO standby_state VALUES ('standby-b', 100, 5);

-- Data WAL yang belum di-replay per standby
SELECT s.standby_name, w.lsn, w.record
FROM standby_state s
JOIN wal_archive w ON w.lsn > s.replayed_lsn
ORDER BY s.standby_name, w.lsn;

-- Kandidat primary saat failover: replay terjauh + lag terkecil
SELECT s.standby_name,
       s.replayed_lsn,
       (SELECT MAX(lsn) FROM wal_archive) - s.replayed_lsn AS behind,
       s.lag_seconds
FROM standby_state s
ORDER BY s.replayed_lsn DESC, s.lag_seconds ASC
LIMIT 1;`,
      codeEn: `-- WAL (Write-Ahead Log) — every change is logged first
CREATE TABLE wal_archive (
  lsn INTEGER PRIMARY KEY,       -- Log Sequence Number
  record TEXT NOT NULL,          -- change type + payload
  commit_time TEXT NOT NULL
);
INSERT INTO wal_archive VALUES (100, 'UPDATE employees SET salary=90000000 WHERE id=1', '2026-01-20T10:00:00Z');
INSERT INTO wal_archive VALUES (110, 'INSERT orders VALUES (6, ...)', '2026-01-20T10:00:05Z');

-- Standbys streaming from a given LSN
CREATE TABLE standby_state (
  standby_name TEXT PRIMARY KEY,
  replayed_lsn INTEGER NOT NULL,
  lag_seconds INTEGER NOT NULL
);
INSERT INTO standby_state VALUES ('standby-a', 110, 0);
INSERT INTO standby_state VALUES ('standby-b', 100, 5);

-- WAL records not yet replayed per standby
SELECT s.standby_name, w.lsn, w.record
FROM standby_state s
JOIN wal_archive w ON w.lsn > s.replayed_lsn
ORDER BY s.standby_name, w.lsn;

-- Failover candidate: furthest replay + smallest lag
SELECT s.standby_name,
       s.replayed_lsn,
       (SELECT MAX(lsn) FROM wal_archive) - s.replayed_lsn AS behind,
       s.lag_seconds
FROM standby_state s
ORDER BY s.replayed_lsn DESC, s.lag_seconds ASC
LIMIT 1;`,
      concepts: [
        ["WAL & LSN", "PostgreSQL menulis WAL fisik (bukan log SQL); posisi diukur dengan LSN (byte offset). Commit aman karena WAL di-fsync sebelum transaksi dianggap sukses."],
        ["Streaming replication", "Standby mengunduh WAL terus-menerus dari primary; lag dan LSN terlihat di pg_stat_replication. Ini dasar semua alat failover otomatis (Patroni, dsb)."],
        ["Synchronous replication", "Mode synchronous_commit menunggu minimal satu standby MENERIMA commit sebelum primary mengembalikan OK. Trade-off: failover tanpa kehilangan data, tetapi pesan bisa lambat saat standby bermasalah."],
        ["Promotion & rewinding", "Standby dipromosikan (pg_promote); primary lama harus di-rewind agar tidak punya divergent WAL sebelum masuk lagi sebagai standby."],
      ],
      expsId: ["Tambahkan LSN baru ke wal_archive lalu amati kolom behind tiap standby berubah.", "Jalankan query kandidat failover dengan beberapa kombinasi replayed_lsn dan lag yang berbeda.", "Hapus LIMIT 1 untuk menampilkan semua kandidat yang diurutkan."],
      expsEn: ["Append a new LSN to wal_archive and watch each standby's behind column change.", "Re-run the failover-candidate query with different replayed_lsn/lag combinations.", "Drop LIMIT 1 to display all candidates ranked."],
      serId: "Modelkan RPO: sisipkan perubahan ke wal_archive selama 5 menit sementara standby-b mati — berapa banyak record yang hilang bila ada failover ke stand-by itu?",
      serEn: "Model RPO: insert wal_archive records for 5 minutes while standby-b is down — how many records would be lost if failover targeted that standby?",
    },
  },

  redis: {
    "week2-hash": {
      titleId: "Operasi Hash: Kartu Profil Mahasiswa", titleEn: "Hash Operations: Student Profile Card",
      introId: "Hash menyimpan field-value dalam satu kunci. Program membangun CRUD kartu pelajar penuh, termasuk membaca beberapa field sekaligus.",
      introEn: "A hash stores field-value pairs in one key. This program builds a full student profile card, including multi-field reads.",
      lang: "redis",
      codeId: `# === Kartu Mahasiswa sebagai Hash ===
HSET student:42 nim "2201234" nama "Budi Santoso" ipk 3.75 semester 5
HMGET student:42 nama ipk
HGETALL student:42

# === Inkrement kecil: naikkan semester lewat HINCRBY ===
HINCRBY student:42 semester 1
HGET student:42 semester

# === HSETNX: buat field hanya bila belum ada ===
HSETNX student:42 status "aktif"
HGET student:42 status

# === HDEL dan HLEN ===
HDEL student:42 nim
HLEN student:42
HKEYS student:42

# === Hash kedua ===
DEL student:133
HSET student:133 nama "Siti Rahma" ipk 3.9 semester 3
HGETALL student:133`,
      codeEn: `# === A student card as a hash ===
HSET student:42 nim "2201234" nama "Budi Santoso" ipk 3.75 semester 5
HMGET student:42 nama ipk
HGETALL student:42

# === Small increments: bump semester with HINCRBY ===
HINCRBY student:42 semester 1
HGET student:42 semester

# === HSETNX: create-if-absent ===
HSETNX student:42 status "aktif"
HGET student:42 status

# === HDEL and HLEN ===
HDEL student:42 nim
HLEN student:42
HKEYS student:42

# === A second hash ===
DEL student:133
HSET student:133 nama "Siti Rahma" ipk 3.9 semester 3
HGETALL student:133`,
      concepts: [
        ["Field-level access", "HSET/HGET memutasi satu field tanpa membaca seluruh objek — lebih hemat bandwidth ketimbang menaruh kunci per field."],
        ["Incremental semantics", "HINCRBY bekerja untuk nilai integer; HSETNX membuat field hanya bila belum ada (mencegah beberapa worker salin menimpa satu sama lain)."],
        ["Kelebihan & kelemahan", "Hash melayani akses field parsial dengan murah, tetapi HGETALL menyerialisasi seluruh objek: untuk profil yang sangat besar, pecah ke beberapa hash."],
        ["Object caching", "Hash + EXPIRE memberi pola cache objek: data panas di Redis (big TTL), source of truth tetap di database."],
      ],
      expsId: ["Buat kartu student:43 dengan semester=1 lalu naikkan menjadi 8 langkah demi langkah.", "Simulasikan kelulusan: HDEL status lalu HSET status \"lulus\".", "Tulis HMGET berisi hanya field numerik (ipk, semester) dan baca hasilnya."],
      expsEn: ["Build student:43 with semester=1, then bump it to 8 step by step.", "Simulate graduation: HDEL status then HSET status \"lulus\".", "Write HMGET with only the numeric fields (ipk, semester) and read the result."],
      serId: "Buat hash \"leaderboard:kelas\" berisi nama dan nilai terbaik tiap kelas (field per kelas): gunakan HGETALL lalu bayangkan cara agregasinya di aplikasi.",
      serEn: "Create a \"leaderboard:kelas\" hash holding each class's top score (one field per class): HGETALL it, then think how your app would aggregate it.",
    },
    "week6-pub-sub": {
      titleId: "Messaging: Pub/Sub & Streams", titleEn: "Messaging: Pub/Sub & Streams",
      introId: "Dua gaya messaging: Pub/Sub (kirim-dan-lupakan, tanpa persistensi) dan Streams (event log durabel dengan offset).",
      introEn: "Two messaging styles: Pub/Sub (fire-and-forget, no persistence) and Streams (durable event log with offsets).",
      lang: "redis",
      codeId: `# === PUB/SUB: channel notifikasi ===
PUBLISH channel:order "order:2001"
SUBSCRIBE channel:order
# (Pesan yang di-publish TANPA subscriber aktif langsung HILANG)

# === STREAMS: log durabel ===
XADD stream:orders * id 2001 customer "Budi" total 250000
XADD stream:orders * id 2002 customer "Siti" total 180000
XADD stream:orders * id 2003 customer "Andi" total 320000
XLEN stream:orders
XRANGE stream:orders - +

# === Consumer groups (Redis asli — di sini cukup paham konsepnya) ===
# XGROUP CREATE stream:orders group-a 0
# XREADGROUP GROUP group-a c1 COUNT 1 STREAMS stream:orders >
# XACK stream:orders group-a <entry-id>`,
      codeEn: `# === PUB/SUB: notification channel ===
PUBLISH channel:order "order:2001"
SUBSCRIBE channel:order
# (A message published WITHOUT an active subscriber is lost)

# === STREAMS: a durable log ===
XADD stream:orders * id 2001 customer "Budi" total 250000
XADD stream:orders * id 2002 customer "Siti" total 180000
XADD stream:orders * id 2003 customer "Andi" total 320000
XLEN stream:orders
XRANGE stream:orders - +

# === Consumer groups (real Redis — understand the concept here) ===
# XGROUP CREATE stream:orders group-a 0
# XREADGROUP GROUP group-a c1 COUNT 1 STREAMS stream:orders >
# XACK stream:orders group-a <entry-id>`,
      concepts: [
        ["Pub/Sub vs Streams", "Pub/Sub = fire-and-forget: tidak ada persistensi, subscriber harus online. Streams = log append-only permanen dengan offset; konsumen bisa baca ulang riwayat."],
        ["XADD & ID", "ID stream auto-generasi <ms>-<seq> menjamin urutan waktu. XRANGE dan XLEN membaca dari riwayat bila subscriber sempat offline."],
        ["Consumer groups", "XGROUP + XREADGROUP membagi aliran antar consumer, mirip Kafka; XACK menandai pesan selesai; XPENDING menemukan pesan setengah jalan."],
        ["Use cases", "Pub/Sub cocok untuk broadcast realtime (chat, notifikasi langsung); Streams cocok untuk audit trail, antrian tugas, dan event sourcing."],
      ],
      expsId: ["Jalankan XLEN setelah tiga XADD; bandingkan dengan prediksi sebelum mencoba.", "Tambahkan XADD untuk analis keempat lalu amati struktur field-nya lewat XRANGE.", "Coba PUBLISH lalu SUBSCRIBE di menit terakhir dan bandingkan hasil kedua pola pesan."],
      expsEn: ["Run XLEN after three XADDs and compare against your prediction.", "Add a fourth XADD then inspect its fields via XRANGE.", "Try PUBLISH then SUBSCRIBE and contrast how each delivery model behaves."],
      serId: "Bangun mini event-sourcing: XADD setiap perubahan order, lalu gunakan XLEN dan XREADGROUP timbul seleksi penghitungan ulang saldo secara logis.",
      serEn: "Build mini event-sourcing: XADD every order change, then reason about replaying the stream with XLEN and XRANGE to rebuild state.",
    },
    "week8-clustering": {
      titleId: "Redis Cluster & Sharding", titleEn: "Redis Cluster & Sharding",
      introId: "Cluster membagi keyspace ke 16384 slot via CRC16 dari nama kunci. Program membangun intuisi slot dan penempatan node.",
      introEn: "A Redis Cluster shards the keyspace into 16384 slots computed by CRC16 over the key name. Build slot intuition and node placement.",
      lang: "redis",
      codeId: `# HASH SLOT: CRC16(key) mod 16384 (Redis asli). Simulator ini menyiapkan intuisinya:

# Keyspace lama: semua kunci di satu node
SET user:42:cart "laptop"
SET user:42:prefs "dark"
GET user:42:cart

# Hash tags: kunci dengan {tag} yang sama mendarat di slot yang sama
DEL user:{42}:cart user:{42}:prefs
SET user:{42}:cart "laptop"
SET user:{42}:prefs "dark"
GET user:{42}:cart
GET user:{42}:prefs

# Di Redis asli:
#   CLUSTER INFO            # state, slots_assigned
#   CLUSTER SLOTS           # pemetaan range slot -> node
#   CLUSTER KEYSLOT user:42 # slot CRC16 untuk satu kunci
#   CLUSTER MEET <ip> <port>
# Multi-kunci (MSET/pipeline) hanya legal antar kunci slot yang sama.`,
      codeEn: `# HASH SLOT: CRC16(key) mod 16384 on real Redis. This simulator builds the intuition:

# Flat keyspace: every key on one node
SET user:42:cart "laptop"
SET user:42:prefs "dark"
GET user:42:cart

# Hash tags: keys sharing {tag} land on the SAME slot
DEL user:{42}:cart user:{42}:prefs
SET user:{42}:cart "laptop"
SET user:{42}:prefs "dark"
GET user:{42}:cart
GET user:{42}:prefs

# On real Redis:
#   CLUSTER INFO            # state, slots_assigned
#   CLUSTER SLOTS           # slot ranges mapped to nodes
#   CLUSTER KEYSLOT user:42 # CRC16 slot for one key
#   CLUSTER MEET <ip> <port>
# Multi-key ops (MSET/pipeline) are legal only between same-slot keys.`,
      concepts: [
        ["16384 slots", "Slot mendistribusikan data secara deterministik (CRC16) tanpa koordinator pusat — dengan menambah node, rentang slot dipindahkan, bukan dihitung ulang seluruh keyspace."],
        ["Slot resilience", "Tiap master memiliki rentang slot plus replica. Ketika master hilang, quorum mempromosikan replica-nya menjadi master baru."],
        ["Hash tags", "user:{42}:cart dan user:{42}:prefs ibarat bundle sauran sama slot — transaksi/pipeline multi-kunci legal hanya antar kunci dengan tag sama."],
        ["Limitasi", "MSET, pipelines, dan script Lua terbatas pada kunci satu slot. Rancang tag pada kunci terlebih dahulu sebelum memasang cluster."],
      ],
      expsId: ["Coba predict: apakah user:1 dan user:2 bisa mendarat di slot yang sama? Cari jawaban di Redis asli.", "Tulis versi dua kunci dengan hash tag berbeda dan amati perbedaannya.", "Sketsa penghitungan CRC16 sederhana lalu bandingkan dengan CLUSTER KEYSLOT."],
      expsEn: ["Predict: could user:1 and user:2 ever share a slot? Verify on real Redis.", "Write the two-key version with DIFFERENT hash tags and observe the difference.", "Sketch a simple CRC16 walkthrough and compare it to CLUSTER KEYSLOT."],
      serId: "Rancang skema sharding untuk 1M pengguna: buat layout kunci, tags untuk data yang harus co-located, dan rencana resharding saat node ditambah.",
      serEn: "Design a sharding schema for 1M users: key layout, tags for co-located data, and a resharding plan when nodes are added.",
    },
    "week9-caching-patterns": {
      titleId: "Cache-Aside, TTL & Anti-Pattern", titleEn: "Cache-Aside, TTL & Anti-Patterns",
      introId: "Program menunjukkan pola cache-aside end-to-end: cache miss, penulisan ulang, TTL, dan jebakan stampede.",
      introEn: "This program demonstrates the cache-aside pattern end to end: cache miss, writes, TTL, and the stampede pitfall.",
      lang: "redis",
      codeId: `# === Alur CACHE-ASIDE READ ===
# 1. Cek cache
GET cache:product:1
# 2. Miss -> ambil dari DB... lalu tulis ke cache:
SET cache:product:1 "Laptop|15000000|25" EX 300
DEL cache:product:1

# === Alur WRITE (invalidasi saat data berubah) ===
SET cache:product:1 "Laptop|15500000|24" EX 300
DEL cache:product:1
# ...pembacaan berikutnya akan mengisi ulang nilai baru

# === Overseeing TTL ===
SET session:abc "uid=42" EX 3600
TTL session:abc

# === ANTI-PATTERN: cache stampede (thundering herd) ===
# key expired TEPAT saat 1000 request datang -> semuanya kena DB.
# Solusi: mutex (SETNX) atau refresh lebih awal lewat background worker:
SET cache:popular:post "rendered-html" EX 590
# refresh SEBELUM expiry oleh worker, bukan di jalur request`,
      codeEn: `# === CACHE-ASIDE READ flow ===
# 1. Check cache
GET cache:product:1
# 2. Miss -> fetch from the DB... then write to cache:
SET cache:product:1 "Laptop|15000000|25" EX 300
DEL cache:product:1

# === WRITE flow (invalidate on change) ===
SET cache:product:1 "Laptop|15500000|24" EX 300
DEL cache:product:1
# ...new reads repopulate the fresh value

# === TTL watch ===
SET session:abc "uid=42" EX 3600
TTL session:abc

# === ANTI-PATTERN: cache stampede (thundering herd) ===
# Key expires EXACTLY when 1000 requests arrive -> they all hit the DB.
# Fixes: a mutex (SETNX) or early refresh via a background worker:
SET cache:popular:post "rendered-html" EX 590
# Refresh BEFORE expiry from a worker, not on the request path`,
      concepts: [
        ["Cache-aside vs write-through", "Cache-aside: aplikasi mengelola cache sendiri (paling umum, paling fleksibel). Write-through: tiap penulisan DB juga menulis cache (konsisten, biaya tulis tinggi)."],
        ["TTL & evict", "EX memberi masa hidup kunci; kunci mati otomatis setelah TTL. Pengusiran LRU (maxmemory) berlaku bila memori penuh."],
        ["Stampede & mitigasinya", "Kunci panas yang expired bersamaan menggantung DB. Mitigasi: mutex SETNX saat recompute, atau jitter/early refresh agar expiry tidak serempak."],
        ["Invalidation", "DEL saat UPDATE/DELETE (cache-aside klasik), atau bump versi nama kunci (cache busting). Sinkronisasi cache & DB adalah bagian terberat sistem terdistribusi."],
      ],
      expsId: ["GET kunci yang belum pernah di-set — amati jawabannya (miss).", "SET dengan EX 5 lalu jalankan TTL berulang sampai nilainya -2 (expired).", "Pasangkan SET EX 30 dengan TTL langsung — perhatikan angkanya."],
      expsEn: ["GET a key you never set — inspect the miss response.", "SET with EX 5 then poll TTL repeatedly until it returns -2 (expired).", "Pair a SET EX 30 with an immediate TTL — watch the numbers."],
      serId: "Rancang protokol caching (GET, SET, DEL, TTL per order) untuk satu alur bisnis, lalu kembangkan analisis modus ketika salah, misal saat deploy atau DB failover.",
      serEn: "Design a caching protocol (GET/SET/DEL/TTL per order) for one business flow, then analyze its failure modes on deploy or DB failover.",
    },
  },

  nodejs: {
    "week5-express-server": {
      titleId: "HTTP Server Dari Nol Lalu Express", titleEn: "HTTP Server From Scratch, Then Express",
      introId: "Program membangun server dengan modul http murni lalu bermigrasi ke Express agar routing, middleware, dan error handling rapi.",
      introEn: "The program builds a server with the plain http module, then moves to Express for routing, middleware, and error handling.",
      lang: "javascript",
      codeId: `// Bagian 1: Server http murni (simulasi agar bisa jalan di browser)
const routerMap = {
  '/': () => 'Halo dari Tryngo Node Server!',
  '/health': () => JSON.stringify({ status: 'ok', uptime: '12h' }),
};

function handleRequest(method, url) {
  console.log(\`[router] \${method} \${url}\`);
  const handler = routerMap[url];
  if (!handler) { console.log('  -> 404 Not Found'); return; }
  console.log('  -> 200 OK:', handler());
}
handleRequest('GET', '/');
handleRequest('GET', '/health');
handleRequest('GET', '/tidak-ada');

// Bagian 2: Mini-Express — router + middleware + error handling
const middlewareStack = [
  (req, next) => { console.log(\`[logger] \${req.method} \${req.url}\`); return next(); },
  (req, next) => (req.url === '/admin' ? 'Error: hanya admin!' : next()),
  (req, next) => \`Data untuk \${req.url}\`,
];
function dispatch(req) {
  let i = 0;
  const next = () => (i < middlewareStack.length ? middlewareStack[i++](req, next) : '404');
  try {
    console.log('[response]', dispatchSafe(req, next));
  } catch (err) {
    console.log('[error handler]', err.message);
  }
}
function dispatchSafe(req, next) {
  const result = next();
  if (typeof result === 'string' && result.startsWith('Error:')) throw new Error(result);
  return result;
}
dispatch({ method: 'GET', url: '/api/users' });
dispatch({ method: 'GET', url: '/admin' });`,
      codeEn: `// Part 1: a bare http server (simulated so it runs in the browser)
const routerMap = {
  '/': () => 'Hello from the Tryngo Node Server!',
  '/health': () => JSON.stringify({ status: 'ok', uptime: '12h' }),
};

function handleRequest(method, url) {
  console.log(\`[router] \${method} \${url}\`);
  const handler = routerMap[url];
  if (!handler) { console.log('  -> 404 Not Found'); return; }
  console.log('  -> 200 OK:', handler());
}
handleRequest('GET', '/');
handleRequest('GET', '/health');
handleRequest('GET', '/missing');

// Part 2: Mini-Express — router + middleware + error handling
const middlewareStack = [
  (req, next) => { console.log(\`[logger] \${req.method} \${req.url}\`); return next(); },
  (req, next) => (req.url === '/admin' ? 'Error: admins only!' : next()),
  (req, next) => \`Data for \${req.url}\`,
];
function dispatch(req) {
  let i = 0;
  const next = () => (i < middlewareStack.length ? middlewareStack[i++](req, next) : '404');
  try {
    console.log('[response]', dispatchSafe(req, next));
  } catch (err) {
    console.log('[error handler]', err.message);
  }
}
function dispatchSafe(req, next) {
  const result = next();
  if (typeof result === 'string' && result.startsWith('Error:')) throw new Error(result);
  return result;
}
dispatch({ method: 'GET', url: '/api/users' });
dispatch({ method: 'GET', url: '/admin' });`,
      concepts: [
        ["Event loop & non-blocking I/O", "Node single-threaded namun I/O asinkron: beban CPU-berat tetap menghambat; konsumsi memori rendah walau traffic tinggi (inilah daya saingnya terhadap Nginx)."],
        ["Middleware (Express)", "Alur req -> [logger, body parser, auth] -> handler -> res. Setiap middleware bisa memanggil next(); tanpa next() rantai berhenti."],
        ["Routing", "Express menyederhanakan routing http: app.get('/api/:id', handler) memberi params dan query otomatis, jauh lebih nyaman daripada peta URL manual."],
        ["Error handling", "Middleware (err, req, res, next) menangkap exception: tanpa itu respons biner/mentah dizinkan lolos dan server bisa crash. Tambatkan satu sebagai filter terakhir."],
      ],
      expsId: ["Tambahkan route '/about' yang mengembalikan HTML kecil.", "Buat route dinamis: '/users/42' dengan parsing URL manual.", "Tulis middleware error (err, ...) yang menjawab status 500."],
      expsEn: ["Add a route returning a small HTML page.", "Implement a dynamic route: /users/42 with manual URL parsing.", "Write an error middleware (err, ...) that answers with 500."],
      serId: "Upgrade '/health': tambahkan penggunaan memori dan nomor versi. Jaga agar seluruh rantai middleware tetap di bawah 2 ms.",
      serEn: "Upgrade '/health': add memory usage and a version number. Keep the whole middleware chain under 2 ms.",
    },
  },

  django: {
    "week7-admin-panel": {
      titleId: "Membangun Admin Panel", titleEn: "Building the Admin Panel",
      introId: "Program menyusun model toko (Produk, Pesanan), mendaftarkannya ke Django Admin lengkap dengan list_filter, search, dan inline.",
      introEn: "The program sets up store models (Product, Order), registers them to Django Admin with list_filter, search, and inlines.",
      lang: "python",
      codeId: `"""Django Admin: toko mini lengkap dengan filter & inline."""
from django.contrib import admin
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    def __str__(self): return self.name

class Order(models.Model):
    STATUS = (('new', 'Baru'), ('paid', 'Dibayar'), ('shipped', 'Dikirim'))
    customer = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS, default='new')
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    def __str__(self): return f'#{self.id} {self.customer}'

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    qty = models.PositiveIntegerField(default=1)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock')
    search_fields = ('name',)
    list_filter = ('stock',)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'status', 'total')
    list_filter = ('status',)
    ordering = ('-id',)
    inlines = (OrderItemInline,)

# Terhubung di urls.py: path('admin/', admin.site.urls)
print('Admin aktif: /admin/ — login dengan akun superuser dari createsuperuser')`,
      codeEn: `"""Django Admin: a mini shop with filters and inlines."""
from django.contrib import admin
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    def __str__(self): return self.name

class Order(models.Model):
    STATUS = (('new', 'New'), ('paid', 'Paid'), ('shipped', 'Shipped'))
    customer = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS, default='new')
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    def __str__(self): return f'#{self.id} {self.customer}'

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    qty = models.PositiveIntegerField(default=1)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock')
    search_fields = ('name',)
    list_filter = ('stock',)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'status', 'total')
    list_filter = ('status',)
    ordering = ('-id',)
    inlines = (OrderItemInline,)

# Wire in urls.py: path('admin/', admin.site.urls)
print('Admin live at /admin/ — log in with an account created by createsuperuser')`,
      concepts: [
        ["Auto CRUD admin", "Cukup register() untuk UI lengkap: list, edit, create, delete, plus log audit; tanpa menulis template satu baris."],
        ["list_display & search_fields", "list_display menentukan kolom tabel; search_fields menjalankan LIKE di kolom terpilih; list_filter menambah sidebar filter bawaan."],
        ["Inline", "TabularInline menampilkan OrderItem dalam form Order — parent dan children diedit pada satu layar."],
        ["on_delete", "PROTECT mencegah penghapusan Product yang masih dipakai; CASCADE memusnahkan item ketika Order dihapus."],
      ],
      expsId: ["Tambahkan field harga-jual di Product dan muat di list_display.", "Konfigurasikan action massal: set_status_paid untuk banyak order sekaligus.", "Ganti OrderItemInline ke StackedInline lalu bandingkan tampilannya."],
      expsEn: ["Add a discount price field to Product and expose it in list_display.", "Configure bulk actions: set_status_paid for multiple orders.", "Switch OrderItemInline to StackedInline and compare the UI."],
      serId: "Tambahkan model Category + relasi M2M ke product — lalu saring pakai list_filter=('category__name',).",
      serEn: "Add a Category model with M2M products — then filter via list_filter=(\"category__name\",).",
    },
    "week8-rest-api": {
      titleId: "REST API dengan DRF ViewSet", titleEn: "REST API with DRF ViewSets",
      introId: "Program menyusun serializer, ViewSet, router, dan permissions — siap diekspos ke /api/orders/.",
      introEn: "The program stitches serializers, ViewSets, routers, and permissions — ready to serve under /api/orders/.",
      lang: "python",
      codeId: `"""DRF: CRUD untuk model Order."""
from rest_framework import serializers, viewsets, permissions
from rest_framework.routers import DefaultRouter
from django.urls import path, include

# Serializer: model -> JSON
class OrderSerializer(serializers.ModelSerializer):
    item_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'status', 'total', 'item_count']

# Relasi: select_related/prefetch_related menghindari query N+1
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related('customer').prefetch_related('items')
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = self.queryset
        status = self.request.query_params.get('status')
        if status:
            qs = qs.filter(status=status)
        return qs

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [path('api/', include(router.urls))]

# Endpoint yang dihasilkan router:
# GET    /api/orders/          list (dengan ?status=paid)
# POST   /api/orders/          create
# GET    /api/orders/1/        retrieve
# PUT/PATCH /api/orders/1/     update
# DELETE /api/orders/1/        destroy
# Auth lanjutan: token/session diaktifkan terpisah di settings.py`,
      codeEn: `"""DRF: CRUD over the Order model."""
from rest_framework import serializers, viewsets, permissions
from rest_framework.routers import DefaultRouter
from django.urls import path, include

# Serializer: model -> JSON
class OrderSerializer(serializers.ModelSerializer):
    item_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'status', 'total', 'item_count']

# N+1 avoidance via select_related/prefetch_related on the queryset
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related('customer').prefetch_related('items')
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = self.queryset
        status = self.request.query_params.get('status')
        if status:
            qs = qs.filter(status=status)
        return qs

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [path('api/', include(router.urls))]

# Endpoints the router generates:
# GET    /api/orders/          list (with ?status=paid)
# POST   /api/orders/          create
# GET    /api/orders/1/        retrieve
# PUT/PATCH /api/orders/1/     update
# DELETE /api/orders/1/        destroy
# Advanced auth wiring lives in settings.py`,
      concepts: [
        ["Serializer mapping", "ModelSerializer memetakan field model -> field JSON otomatis; validasi tipe (Decimal, Date) ikut bekerja out-of-the-box."],
        ["Router & endpoint", "DefaultRouter menghasilkan URL untuk 5 aksi CRUD (+ custom @action); cara satu baris untuk membangun API REST."],
        ["Filtering query params", "get_queryset membaca query_params.get('status'); seperti ini filter dinamis dibangun. Untuk skala besar pakai django-filter."],
        ["Permissions", "IsAuthenticatedOrReadOnly menutup semua penulisan bagi tamu; peran berbasis objek atau DRF throttling bisa menambah pertahanan."],
      ],
      expsId: ["Tambahkan filter ?customer= pada get_queryset.", "Buat ProductSerializer lalu router.register('products', ...).", "Batasi POST hanya untuk admin (IsAdminUser)."],
      expsEn: ["Add a ?customer= filter in get_queryset.", "Create a ProductSerializer then router.register(\"products\", ...).", "Restrict POST to admins only (IsAdminUser)."],
      serId: "Implementasi custom @action(detail=True) -> POST /api/orders/1/pay/ yang mengubah status dan total.",
      serEn: "Add a custom @action(detail=True) -> POST /api/orders/1/pay/ that updates status and total.",
    },
    "week10-caching": {
      titleId: "Caching: Backend & Decorator", titleEn: "Caching Backends & Decorators",
      introId: "Cache dari sisi Django: cache backend (Redis), decorator per-view, cache di fragment template, dan invalidation.",
      introEn: "Caching the Django way: cache backends (Redis), per-view decorators, template fragments, and invalidation.",
      lang: "python",
      codeId: `"""Caching dashboard overview."""
# 1. Deklarasi cache di settings.py:
#    CACHES = {'default': {'BACKEND': 'django.core.cache.backends.redis.RedisCache',
#                           'LOCATION': 'redis://127.0.0.1:6379/1'}}
from django.core.cache import cache
from django.views.decorators.cache import cache_page

# 2. Per-view decorator (mem-cache hasil semua GET request)
@cache_page(60)                # cache 60 detik
def dashboard(request):
    # 3. Low-level: query mahal di-cache manual
    stats = cache.get('stats:overview')
    if stats is None:
        # ...query agregasi yang mahal...
        stats = {'orders': 834, 'revenue': '105jt', 'hit_rate': '94%'}
        cache.set('stats:overview', stats, timeout=300)
    return stats

# 4. Invalidasi saat data berubah:
def invalidate_overview(_sender, **_kwargs):
    cache.delete('stats:overview')

# 5. Template fragment cache:
#    {% load cache %} {% cache 300 product_list "v2" %} ... {% endcache %}

stats = dashboard(None)          # pertama: miss (query dihitung)
stats = dashboard(None)          # kedua: hit
print('[dashboard] stats:', stats['orders'], 'orders, hit rate', stats['hit_rate'])
cache.delete('stats:overview')   # expire manual
print('[invalidate] siap menyegarkan statistik berikutnya')`,
      codeEn: `"""Caching an overview dashboard."""
# 1. settings.py wiring:
#    CACHES = {'default': {'BACKEND': 'django.core.cache.backends.redis.RedisCache',
#                           'LOCATION': 'redis://127.0.0.1:6379/1'}}
from django.core.cache import cache
from django.views.decorators.cache import cache_page

# 2. Per-view decorator (caches the GET response)
@cache_page(60)                # cache for 60 seconds
def dashboard(request):
    # 3. Low-level cache for expensive queries
    stats = cache.get('stats:overview')
    if stats is None:
        # ...expensive aggregation query...
        stats = {'orders': 834, 'revenue': '105M', 'hit_rate': '94%'}
        cache.set('stats:overview', stats, timeout=300)
    return stats

# 4. Invalidate when data changes:
def invalidate_overview(_sender, **_kwargs):
    cache.delete('stats:overview')

# 5. Template fragment cache:
#    {% load cache %} {% cache 300 product_list "v2" %} ... {% endcache %}

stats = dashboard(None)          # first call: miss (computed)
stats = dashboard(None)          # second call: hit
print('[dashboard] stats:', stats['orders'], 'orders, hit rate', stats['hit_rate'])
cache.delete('stats:overview')   # explicitly expire
print('[invalidate] ready for the next stat refresh')`,
      concepts: [
        ["Layer cache", "Ada beberapa tingkat: query cache, view cache (hasil GET penuh), template fragment cache, dan low-level cache.set. Pilih level sesuai seberapa mudah datanya membusuk."],
        ["Cache key design", "stats:overview vs stats:overview:v1 — prefix versi memudahkan invalidasi massal (naikkan versi saat deploy)."],
        ["Decorator vs TTL manual", "cache_page men-cache GET; POST tidak di-cache. cache.set(..., timeout=N) adalah jalur atomik TTL manual untuk proses latar."],
        ["Hit-rate observability", "Pantau hit-rate lewat statistik Redis (keyspace_hits/misses); hit-rate mengukur seberapa efektif strategi caching yang diterapkan."],
      ],
      expsId: ["Ukur hit-rate: muat dashboard 10 kali dan hitung berapa yang hit.", "Ubah TTL ke 30 detik lalu refresh lewat worker.", "Tambahkan panggilan cache.delete ketika checkout selesai."],
      expsEn: ["Measure the hit rate: load the dashboard 10 times and count hits.", "Change TTL to 30 seconds, or refresh early via a worker.", "Trigger cache.delete on completed checkout."],
      serId: "Rancang statistik \"sellers top\": hitung sekali lewat cache.set + invalidasi yang dipasang ke signal order-paid, dengan TTI singkat.",
      serEn: "Compute a \"top sellers\" stat: cache.set once plus invalidation wired to the order-paid signal, with a short TTI.",
    },
    "week11-deployment": {
      titleId: "Deploy: WSGI, Static & Healthcheck", titleEn: "Deployment: WSGI, Static & Healthchecks",
      introId: "Program menutup jalur produksi: WSGI server, collectstatic, environment secrets, docker Compose, dan healthcheck.",
      introEn: "The program closes the production loop: a WSGI server, collectstatic, env secrets, Docker Compose, and healthchecks.",
      lang: "python",
      codeId: `"""Checklist deployment Django (simulasi run via checks)."""
import os

# === settings.py: config dari environment ===
DEBUG = os.getenv('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'tryngo.example.com').split(',')
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']   # jangan di-hardcode!
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# === Command runtime ===
# python manage.py migrate          # DB schema
# python manage.py collectstatic    # static files -> STATIC_ROOT
# gunicorn config.wsgi:application --workers 4 --bind 0.0.0.0:8000

# === Gunicorn + nginx: nginx serve static, gunicorn dynamic only ===

# === Dockerfile skeleton ===
# FROM python:3.12-slim
# ENV PYTHONDONTWRITEBYTECODE 1 PYTHONUNBUFFERED 1
# COPY requirements.txt /app/ ; RUN pip install -r /app/requirements.txt
# COPY . /app ; RUN python manage.py collectstatic --noinput
# ENTRYPOINT ["gunicorn","config.wsgi:application","--bind","0.0.0.0:8000"]

# === Healthcheck (untuk kubernetes/compose) ===
import subprocess
def healthcheck():
    result = subprocess.run(['curl', '-sf', 'http://localhost:8000/health/'], capture_output=True)
    return result.returncode == 0

print('healthcheck OK' if healthcheck() else 'healthcheck FAIL')`,
      codeEn: `"""Django deployment checklist (simulated checks)."""
import os

# === settings.py: env-driven config ===
DEBUG = os.getenv('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'tryngo.example.com').split(',')
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']   # never hardcode!
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# === Runtime commands ===
# python manage.py migrate          # DB schema
# python manage.py collectstatic    # static files -> STATIC_ROOT
# gunicorn config.wsgi:application --workers 4 --bind 0.0.0.0:8000

# === Gunicorn + nginx: nginx serves static, gunicorn dynamic only ===

# === Dockerfile skeleton ===
# FROM python:3.12-slim
# ENV PYTHONDONTWRITEBYTECODE 1 PYTHONUNBUFFERED 1
# COPY requirements.txt /app/ ; RUN pip install -r /app/requirements.txt
# COPY . /app ; RUN python manage.py collectstatic --noinput
# ENTRYPOINT ["gunicorn","config.wsgi:application","--bind","0.0.0.0:8000"]

# === Healthcheck (kubernetes/compose) ===
import subprocess
def healthcheck():
    result = subprocess.run(['curl', '-sf', 'http://localhost:8000/health/'], capture_output=True)
    return result.returncode == 0

print('healthcheck OK' if healthcheck() else 'healthcheck FAIL')`,
      concepts: [
        ["WSGI vs ASGI", "WSGI sinkron: gunicorn menuntut request dalam form handler(function, response). ASGI (uvicorn/daphne) untuk async + websocket; pilih sesuai kebutuhan realtime."],
        ["12-factor app", "Config via environment (DEBUG, SECRET_KEY) — bukan file settings lokal; 12-factor memungkinkan container dibangun/dirombak bebas."],
        ["Static & media", "collectstatic mengagregasi file ke STATIC_ROOT lalu disajikan nginx/CDN; media (upload user) dipisah ke object storage (S3/R2), bukan disk container."],
        ["Healthcheck & graceful shutdown", "Healthcheck menentukan kapan container SIAP menerima traffic; saat dikirim SIGTERM, gunicorn menunggu request aktif selesai (graceful)."],
      ],
      expsId: ["Deploy simulasi: jalankan urutan yang umum migrate, collectstatic, gunicorn.", "Tambahkan endpoint /health/ dengan status DB (SELECT 1).", "Tulis docker-compose.yml lengkap: db (postgres), redis, web."],
      expsEn: ["Simulate a full deploy: migrate, collectstatic, gunicorn in sequence.", "Add a /health/ endpoint checking the DB (SELECT 1).", "Write a full docker-compose.yml: db (postgres), redis, web."],
      serId: "Tulis skrip CI/CD: build image, push, SSH ke server, docker compose pull && up -d, smoke test /health/.",
      serEn: "Write the CI/CD script: build image, push, SSH to server, docker compose pull && up -d, smoke test /health/.",
    },
  },
};
