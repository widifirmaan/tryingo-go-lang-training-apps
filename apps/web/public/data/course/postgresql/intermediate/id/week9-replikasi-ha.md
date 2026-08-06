# Replikasi & High Availability

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 9:** Replikasi & High Availability

## Tujuan Pembelajaran

- WAL dan streaming replication
- Konfigurasi primary/standby
- Replication slot
- Logical replication
- Monitoring lag

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

## Konsep Kunci

### WAL
Log semua perubahan sebelum ditulis ke data file.

### Streaming Replication
Primary kirim WAL records ke standby.

### Replication Slot
Pastikan WAL tidak dihapus sebelum diterima.

### Logical Replication
Replikasi tabel spesifik.

### Monitoring
pg_stat_replication untuk lag.

---

## Eksperimen

- Setup Docker replication
- Ukur lag dengan pgbench
- Logical replication
- Simulasi failover

---

## Tantangan

Setup replikasi: primary + standby + monitoring + failover.

---

## Ringkasan

Minggu 9 dari 10: **Replikasi & HA** (Menengah).
