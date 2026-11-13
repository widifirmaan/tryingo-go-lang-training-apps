# Replication & High Availability

## Learning Objectives

- Master-Slave replication
- Binary log
- CHANGE MASTER
- Slave status monitoring
- Group Replication

---

## Program: Replication Architecture & Lag

Replication copies changes from the primary to replicas. This program simulates the binlog, GTIDs, and lag detection.

```sql
-- Minimal binlog table (simulation)
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
ORDER BY behind DESC;
```

---

## Key Concepts

### Binlog format ROW vs STATEMENT

ROW mencatat perubahan per baris (aman, replay deterministik); STATEMENT menyimpan SQL asli (rawan NOW()/LIMIT non-deterministik).

### GTID

Identitas global per transaksi. Failover tidak perlu mencari posisi byte manual - cukup terapkan semua GTID yang belum diterapkan.

### Asinkron & Semi-sync

Default MySQL = asynchronous: primary lanjut tanpa menunggu replica (latensi rendah, lag mungkin). Semi-sync menunggu minimal satu replica menerima event.

### Read scaling

SELECT dikirim ke replica untuk meringankan primary; tulis tetap di primary - dua penulis paralel (split-brain) merusak konsistensi.

---

## Experiments

- Append a DELETE event to the binlog; observe which replica lags.
- Set replica-2 applied_gtid=0 - how many events must it apply?
- Turn the health query into an alert: only replicas with behind > 2.

---

## Challenge

Model failover: write the SQL promoting the replica with the highest applied_gtid to primary and re-slaving the rest.

---

## Summary

This week's material has been covered: Replication Architecture & Lag. Continue to the following week to deepen.
