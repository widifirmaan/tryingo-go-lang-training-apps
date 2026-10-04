# Declarative Partitioning, PgBouncer & Vacuum Tuning

> **Kategori:** PostgreSQL | **Level:** Concurrency, Partitioning & Enterprise Architecture | **Minggu 7:** Declarative Partitioning, PgBouncer & Vacuum Tuning
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Implement Declarative Table Partitioning (Range, List, Hash) for multi-terabyte datasets
- Verify Partition Pruning efficiency in the PostgreSQL query planner
- Understand MVCC (Multi-Version Concurrency Control) mechanics and dead tuple lifecycle
- Tune Autovacuum daemon thresholds and design connection pooling with PgBouncer

---

## Program: Declarative Range Partitioning by Timestamp and MVCC Vacuum Monitoring

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

## Key Concepts

### The Imperative of Table Partitioning
When relational tables grow beyond tens of millions of records, index structures exceed the physical RAM capacity of the shared buffer pool. Every single lookup incurs expensive random disk I/O. **Declarative Partitioning** partitions a monolithic logical table into discrete physical storage partitions while keeping query interfaces completely transparent to applications.

### Partition Pruning Mechanics
**Partition Pruning** allows the query optimizer to analyze criteria in the `WHERE` clause. When searching for records within February 2026, the planner exclusively scans `telemetry_events_2026_q1`, completely bypassing all other seasonal partitions.

### MVCC and Dead Tuple Dynamics
PostgreSQL enforces ACID isolation through **MVCC** (*Multi-Version Concurrency Control*). An `UPDATE` does not mutate data in-place; it marks the original row as a *dead tuple* and inserts a fresh version. `DELETE` merely marks rows as dead. Without rigorous maintenance, dead tuples trigger catastrophic table bloat.

### Autovacuum Tuning and PgBouncer Pooling
The **Autovacuum** daemon cleans dead tuples, reclaiming space for incoming writes and updating query statistics. At the transport layer, each PostgreSQL client connection spawns a distinct backend OS process consuming significant memory. **PgBouncer** acts as a lightweight connection pooler, multiplexing thousands of concurrent client requests over a compact pool of server connections.

---

---

## Beginner Friendly Explanation

Imagine storing 10 years of shopping receipts inside one gigantic cardboard box. Looking for a receipt from last week requires rummaging through tens of thousands of dusty slips for hours.

Table Partitioning organizes receipts into labeled binders by quarter: Binder Q1, Q2, Q3. When searching for March records, you pull Binder Q1 off the shelf, completely ignoring the rest (Partition Pruning). Autovacuum is like the night cleaning crew shredding cancelled vouchers so your physical binders never overflow.

## Experiments

- Execute EXPLAIN on a partitioned query and verify pruning text: "Partitions: telemetry_events_2026_q1"
- Perform 1,000 iterative UPDATEs on a single row and witness the surge of n_dead_tup in pg_stat_user_tables
- Execute manual VACUUM (VERBOSE, ANALYZE) and verify the dead tuple reclamation in database statistics
- Simulate instant partition dropping via DROP TABLE telemetry_events_2026_q1 and compare its speed against DELETE

---

## Challenge

Configure a Hash Partitioning schema (`PARTITION BY HASH (customer_id)`) across 4 balanced shards (`MODULUS 4`) to evenly distribute transaction I/O load across a multi-tenant platform.

---

## Visual Mental Model & Architecture Flow

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

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `CREATE TABLE name ( col TYPE CONSTRAINT );`
- **Core Functionality:** Defines skema tabel relasional.
- **Parameters / Attributes:** `Nama tabel, definisi kolom, batasan (PK, FK, UNIQUE)`.
- **System Behavior & Return:** Menyiapkan tabel database dengan validasi tipe data presisi dan integritas data ACID..
- **Practical Code Example:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
- **Expected Execution Output:**
```output
Tabel users siap menerima baris data
```

### 2. `SELECT cols FROM tbl WHERE cond ORDER BY col LIMIT n;`
- **Core Functionality:** Query pembacaan dan penyaringan data.
- **Parameters / Attributes:** `Kolom list, Filter WHERE, Order, Limit`.
- **System Behavior & Return:** Retrieves rekaman data yang memenuhi kriteria pengujian secara efisien..
- **Practical Code Example:**
```sql
SELECT id, email FROM users WHERE created_at > NOW() - INTERVAL '7 days' ORDER BY created_at DESC LIMIT 10;
```
- **Expected Execution Output:**
```output
Mengembalikan 10 baris pengguna terbaru
```

### 3. `INSERT INTO tbl (cols) VALUES (vals) RETURNING id;`
- **Core Functionality:** Insertion of baris baru dengan pengembalian nilai instan.
- **Parameters / Attributes:** `Kolom target, data masukan, klausa RETURNING`.
- **System Behavior & Return:** Persists baris baru dan langsung mengembalikan nilai kolom yang digenerasi otomatis..
- **Practical Code Example:**
```sql
INSERT INTO users (email) VALUES ('alex@example.com') RETURNING id, created_at;
```
- **Expected Execution Output:**
```output
Mengembalikan ID UUID yang baru dibuat
```

### 4. `SELECT * FROM a INNER JOIN b ON a.id = b.a_id;`
- **Core Functionality:** Penggabungan relasi antar tabel (Join).
- **Parameters / Attributes:** `Nama tabel, kondisi pencocokan kunci relasi ON`.
- **System Behavior & Return:** Menggabungkan baris dari dua tabel berdasarkan relasi foreign key..
- **Practical Code Example:**
```sql
SELECT u.email, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;
```
- **Expected Execution Output:**
```output
Daftar transaksi pesanan beserta email pemilik akun
```

---

## Common Pitfalls & Debugging Tips

### 1. Sequential Table Scans on Large Tables
- **Symptom / Issue:** SELECT queries degrade in latency as table rows increase into millions.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Add B-Tree indexes on columns used in `WHERE`, `ORDER BY`, and `JOIN` clauses.

### 2. Missing Transactions for Multi-Step Operations
- **Symptom / Issue:** Leaves data in inconsistent partial states when middle operations fail.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always wrap operations in `BEGIN; ... COMMIT;` or `ROLLBACK;` blocks.

### 3. Using Inexact Floating Point for Currency
- **Symptom / Issue:** Floating point rounding errors corrupt financial accounting balances.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always use `NUMERIC(15, 2)` or `DECIMAL` for currency amounts.

---

## Summary

You have mastered enterprise database scaling: Declarative Table Partitioning, Partition Pruning, MVCC dead tuple lifecycles, Autovacuum tuning, and connection pooling with PgBouncer.
