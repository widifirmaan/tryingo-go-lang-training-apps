# Replikasi & High Availability

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 8:** Replikasi & High Availability

## Tujuan Pembelajaran

- Master-Slave replication
- Binary log
- CHANGE MAVE SLAVE
- Monitoring slave status
- Group Replication

---

## Program: MySQL Replication

```sql
-- KONFIGURASI MASTER (my.cnf)
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
SHOW SLAVE STATUS\G

-- Cek lag
SELECT
    Master_Log_File,
    Read_Master_Log_Pos,
    Seconds_Behind_Master
FROM performance_schema.replication_connection_status;

-- Group Replication (MySQL 8.0+)
-- SET GLOBAL group_replication_bootstrap_group=ON;
-- START GROUP_REPLICATION;
```

---

## Konsep Kunci

### Binary Log
Log semua perubahan data untuk replikasi.

### Master-Slave
Master tulis, slave baca replika data.

### CHANGE MASTER
Konfigurasi koneksi slave ke master.

### Monitoring
SHOW SLAVE STATUS untuk lag dan error.

### Group Replication
Multi-master replication MySQL 8.0+.

---

## Eksperimen

- Setup Docker replication
- Ukur lag
- Failover manual
- Read/write splitting

---

## Tantangan

Setup replikasi: master + slave + monitoring.

---

## Ringkasan

Minggu 8 dari 10: **Replikasi & HA** (Menengah).
