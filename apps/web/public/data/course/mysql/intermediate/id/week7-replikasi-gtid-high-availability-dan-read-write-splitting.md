# Replikasi GTID, Semi-Sync & Read-Write Splitting

> **Kategori:** MySQL | **Level:** Konkurensi Transaksi, Replikasi & Skalabilitas Sharding | **Minggu 7:** Replikasi GTID, Semi-Sync & Read-Write Splitting

## Tujuan Pembelajaran

- Memahami topologi High Availability MySQL: Primary-Replica, Semi-Synchronous, dan Group Replication
- Mengonfigurasi replikasi modern berbasis GTID (Global Transaction Identifier) dan SOURCE_AUTO_POSITION
- Mendiagnosis lag replikasi melalui SHOW REPLICA STATUS (Seconds_Behind_Source)
- Merancang arsitektur Read-Write Splitting menggunakan database proxy (ProxySQL / MySQL Router)

---

## Program: Konfigurasi Replikasi Berbasis GTID dan Monitoring Status Replikasi Slave

```sql
-- 1. Configuration parameters on Primary (Source) node (in my.cnf / dynamic)
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
SHOW REPLICA STATUS\G

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
```

---

## Konsep Kunci

### Evolusi Replikasi: Dari Posisi Log ke GTID
Replikasi tradisional MySQL mengandalkan nama file binary log dan posisi byte offset (`mysql-bin.000004`, pos `1540`). Jika server Primary crash dan slave harus dialihkan ke node baru (failover), menghitung ulang koordinat posisi file ini sangat rentan kesalahan (*error-prone*). **GTID** (*Global Transaction Identifier*) memberikan identitas unik global (`server_uuid:sequence_number`) pada setiap transaksi yang di-commit. Replica cukup mengaktifkan `SOURCE_AUTO_POSITION = 1`, dan sistem secara otomatis menyinkronkan seluruh transaksi yang belum diterimanya.

### Mode Replikasi: Asynchronous vs Semi-Synchronous
- **Asynchronous** (Default): Primary menulis transaksi ke binlog lokal dan langsung merespons klien tanpa menunggu apakah Replica sudah menerima data. Jika Primary mati mendadak sebelum data terkirim, potensi data loss dapat terjadi.
- **Semi-Synchronous**: Primary menahan commit sampai setidaknya satu node Replica mengonfirmasi bahwa event binlog telah tersimpan di *relay log* miliknya. Menjamin data aman dari kehilangan tanpa mengorbankan latensi secara drastis.

### Arsitektur Read-Write Splitting
Dalam aplikasi berskala jutaan pengguna, 80-90% operasi adalah membaca data (`SELECT`). Arsitektur **Read-Write Splitting** menggunakan layer perantara seperti **ProxySQL** atau **MySQL Router**. Proxy secara cerdas mengarahkan operasi tulis (`INSERT/UPDATE/DELETE`) ke Primary node tunggal, sementara ratusan query baca didistribusikan merata ke sekumpulan Replica nodes.

---

---

## Penjelasan untuk Pemula

Bayangkan kantor redaksi surat kabar. Pemimpin redaksi (Primary Server) adalah satu-satunya orang yang berhak menulis dan mengubah berita utama. 

Setiap kali ada berita baru, kantor cabang di seluruh kota (Replica Servers) otomatis mencetak salinannya. Pembaca koran (pengguna aplikasi) membaca koran dari kantor cabang terdekat (Read Splitting), sehingga pemimpin redaksi tidak kelelahan melayani jutaan pembaca sendirian.

## Eksperimen

- Jalankan SHOW BINARY LOGS untuk melihat daftar file binlog yang aktif di server Primary
- Inspeksi variabel global @@GLOBAL.gtid_executed untuk melihat rentang GTID yang sudah dieksekusi
- Simulasikan replikasi tertunda dengan menyuntikkan query lambat di replica dan amati Seconds_Behind_Source
- Uji konfigurasi read-only pada replica dengan SET GLOBAL read_only = ON

---

## Tantangan

Rancang skema failover otomatis: buat prosedur pengecekan kesehatan yang mendeteksi matinya Primary dan mempromosikan salah satu Replica menjadi Primary baru menggunakan perintah `STOP REPLICA; RESET REPLICA ALL;`.

---

## Ringkasan

Anda telah menguasai arsitektur High Availability MySQL: replikasi berbasis GTID, proteksi data Semi-Synchronous, pemantauan lag replikasi, dan routing Read-Write Splitting.
