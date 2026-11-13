# Replication & High Availability

> **Kategori:** PostgreSQL | **Level:** Intermediate | **Minggu 9:** Replication & High Availability

## Learning Objectives

- WAL and streaming replication
- Primary/standby config
- Replication slots
- Logical replication
- Lag monitoring

---

## Program: Simulating Streaming Replication

This program models PostgreSQL WAL streaming, the LSN position, and primary selection during failover.

```sql
-- WAL (Write-Ahead Log) - every change is logged first
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
LIMIT 1;
```

---

## Key Concepts

### WAL & LSN

PostgreSQL menulis WAL fisik (bukan log SQL); posisi diukur dengan LSN (byte offset). Commit aman karena WAL di-fsync sebelum transaksi dianggap sukses.

### Streaming replication

Standby mengunduh WAL terus-menerus dari primary; lag dan LSN terlihat di pg_stat_replication. Ini dasar semua alat failover otomatis (Patroni, dsb).

### Synchronous replication

Mode synchronous_commit menunggu minimal satu standby MENERIMA commit sebelum primary mengembalikan OK. Trade-off: failover tanpa kehilangan data, tetapi pesan bisa lambat saat standby bermasalah.

### Promotion & rewinding

Standby dipromosikan (pg_promote); primary lama harus di-rewind agar tidak punya divergent WAL sebelum masuk lagi sebagai standby.

---

## Experiments

- Append a new LSN to wal_archive and watch each standby's behind column change.
- Re-run the failover-candidate query with different replayed_lsn/lag combinations.
- Drop LIMIT 1 to display all candidates ranked.

---

## Challenge

Model RPO: insert wal_archive records for 5 minutes while standby-b is down - how many records would be lost if failover targeted that standby?

---

## Summary

This week's material has been covered: Simulating Streaming Replication. Continue to the following week to deepen.
