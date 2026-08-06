# Replication & High Availability

> **Kategori:** PostgreSQL | **Level:** Intermediate | **Minggu 9:** Replication & High Availability

## Learning Objectives

- WAL and streaming replication
- Primary/standby config
- Replication slots
- Logical replication
- Lag monitoring

---

## Program: Streaming Replication

```sql
-- KONFIGURASI PRIMARY (postgresql.conf)
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
    FROM pg_replication_slots;
```

---

## Key Concepts

### WAL
Log of all changes before writing.

### Streaming Replication
Primary sends WAL to standby.

### Replication Slots
Ensure WAL not deleted.

### Logical Replication
Replicate specific tables.

### Monitoring
pg_stat_replication for lag.

---

## Experiments

- Docker replication setup
- Measure lag with pgbench
- Logical replication
- Simulate failover

---

## Challenge

Setup replication: primary + standby + monitoring + failover.

---

## Summary

Week 9 of 10: **Replication & HA** (Intermediate).
