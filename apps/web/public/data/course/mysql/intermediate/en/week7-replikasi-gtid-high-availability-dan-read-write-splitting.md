# GTID Replication, Semi-Sync & Read-Write Splitting

> **Kategori:** MySQL | **Level:** Transaction Concurrency, Replication & Sharding Scalability | **Minggu 7:** GTID Replication, Semi-Sync & Read-Write Splitting
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand MySQL High Availability topologies: Primary-Replica, Semi-Synchronous, and Group Replication
- Configure modern GTID (Global Transaction Identifier) replication with SOURCE_AUTO_POSITION
- Diagnose and remediate replication lag through SHOW REPLICA STATUS (Seconds_Behind_Source)
- Architect Read-Write Splitting routing layers using database proxies (ProxySQL / MySQL Router)

---

## Program: GTID-Based Replication Configuration and Replica Health Monitoring

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

## Key Concepts

### Replication Evolution: Coordinate Logs vs GTID
Legacy MySQL replication relied on explicit binary log filenames and byte offsets (`mysql-bin.000004`, pos `1540`). During catastrophic primary failovers, recalibrating coordinates across replicas was notoriously fragile. **GTID** (*Global Transaction Identifiers*) binds every committed transaction to an immutable unique identifier (`server_uuid:sequence_number`). Replicas simply declare `SOURCE_AUTO_POSITION = 1`, delegating synchronization negotiation entirely to the engine.

### Replication Modes: Asynchronous vs Semi-Synchronous
- **Asynchronous** (Default): The Primary writes locally and immediately acknowledges clients without waiting for replica transmission. An ungraceful primary crash risks silent data loss.
- **Semi-Synchronous**: The Primary blocks transaction completion until at least one replica acknowledges receiving the event into its in-memory *relay log*, providing robust crash survival.

### Read-Write Splitting Architecture
In high-throughput systems, 80-90% of traffic is read-intensive (`SELECT`). **Read-Write Splitting** deploys routing intermediaries like **ProxySQL** or **MySQL Router**. The proxy transparently routes write mutations (`INSERT/UPDATE/DELETE`) to the single Primary authority while load-balancing read workloads across an elastic pool of Read Replicas.

---

---

## Beginner Friendly Explanation

Imagine a newspaper publishing house. The Editor-in-Chief (Primary Server) is the sole authority permitted to author or modify breaking headlines.

Whenever a story publishes, regional satellite offices (Replica Servers) automatically receive identical telegraph copies. Citizens (application users) read papers distributed from their local branch (Read Splitting), preventing the Editor-in-Chief from being crushed under the weight of millions of inquiries.

## Experiments

- Execute SHOW BINARY LOGS to view active binary log sequences on the Primary node
- Inspect the global variable @@GLOBAL.gtid_executed to examine executed GTID sets
- Simulate replication delay by running a heavy table alter on the replica and track Seconds_Behind_Source
- Enforce read-only protection on the replica instance via SET GLOBAL read_only = ON

---

## Challenge

Architect an automated failover workflow: write a health-check script that detects Primary node failure and promotes an elected Replica to Primary authority via `STOP REPLICA; RESET REPLICA ALL;`.

---

## Visual Mental Model & Architecture Flow

![Diagram Relasi Relasional & Eksekusi Query Joins](/diagrams/sql-joins.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ MESIN PENYIMPANAN INNODB MYSQL                           │
│                                                          │
│ SQL Parser & Optimizer ──► Buffer Pool (RAM Cache)       │
│                                  │                       │
│                 ┌────────────────┴────────────────┐      │
│                 ▼                                 ▼      │
│     Clustered Index (B+ Tree)              Redo Log WAL  │
│     (Data tersimpan berurut PK)            (Crash Safe)  │
│                 │                                 │      │
│                 ▼                                 ▼      │
│            Tabel .ibd Disk               Binlog (Replika)│
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `CREATE TABLE name ( id INT AUTO_INCREMENT PRIMARY KEY, ... )`
- **Core Functionality:** Definisi tabel mesin penyimpanan InnoDB.
- **Parameters / Attributes:** `Column types (INT, VARCHAR, DECIMAL), Constraints`.
- **System Behavior & Return:** Menyusun skema tabel MySQL berkinerja tinggi dengan indeks kunci utama berurut otomatis..
- **Practical Code Example:**
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(50) NOT NULL UNIQUE,
  price DECIMAL(12, 2) NOT NULL,
  in_stock BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;
```
- **Expected Execution Output:**
```text
Tabel products InnoDB siap digunakan
```

### 2. `SELECT * FROM tbl WHERE cond LIMIT offset, count`
- **Core Functionality:** Paginasi data efisien MySQL.
- **Parameters / Attributes:** `LIMIT offset, row_count`.
- **System Behavior & Return:** Retrieves potongan data per halaman untuk optimasi waktu muat aplikasi..
- **Practical Code Example:**
```sql
SELECT id, sku, price FROM products WHERE in_stock = 1 ORDER BY id DESC LIMIT 0, 10;
```
- **Expected Execution Output:**
```text
10 produk pertama untuk halaman 1
```

### 3. `START TRANSACTION; ... COMMIT; / ROLLBACK;`
- **Core Functionality:** Kontrol transaksi ACID multi-tahap.
- **Parameters / Attributes:** `ACID guarantees`.
- **System Behavior & Return:** Memastikan serangkaian operasi query berhasil seluruhnya atau dibatalkan saat ada kesalahan..
- **Practical Code Example:**
```sql
START TRANSACTION;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;
```
- **Expected Execution Output:**
```text
Saldo berhasil dipindahkan secara atomik
```

### 4. `EXPLAIN SELECT ...`
- **Core Functionality:** Analisis rencana eksekusi query (Query Plan).
- **Parameters / Attributes:** `Query SELECT`.
- **System Behavior & Return:** Memeriksa apakah query memanfaatkan indeks (Using index) atau mengalami Full Table Scan lambat..
- **Practical Code Example:**
```sql
EXPLAIN SELECT * FROM products WHERE sku = 'LAP-001';
```
- **Expected Execution Output:**
```text
Menampilkan estimasi baris dan indeks yang digunakan
```

---

## Common Pitfalls & Debugging Tips

### 1. Legacy `utf8` Instead of `utf8mb4`
- **Symptom / Issue:** Throws `Incorrect string value` when saving 4-byte Unicode characters (emojis).
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Set default database and table character set to `utf8mb4` with `utf8mb4_unicode_ci`.

### 2. TIMESTAMP 2038 Boundary & Timezone Shifts
- **Symptom / Issue:** Epoch overflow bugs on older tables or unexpected timezone conversions.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Store UTC explicitly or choose `DATETIME` for timezone-neutral timestamps.

### 3. Failing to Batch Inserts
- **Symptom / Issue:** Per-row autocommit causes massive disk write bottlenecks on large imports.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Wrap batch imports in a single `START TRANSACTION; ... COMMIT;` block.

---

## Summary

You have mastered MySQL High Availability architecture: GTID replication, Semi-Synchronous durability, replica lag telemetry, and Read-Write Splitting routing.
