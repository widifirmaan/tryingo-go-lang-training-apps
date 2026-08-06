# Replication & High Availability

> **Kategori:** MySQL | **Level:** Intermediate | **Minggu 8:** Replication & High Availability

## Learning Objectives

- Master-Slave replication
- Binary log
- CHANGE MASTER
- Slave status monitoring
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

## Key Concepts

### Binary Log
Log of all data changes for replication.

### Master-Slave
Master writes, slave reads replicated data.

### CHANGE MASTER
Configure slave connection to master.

### Monitoring
SHOW SLAVE STATUS for lag and errors.

### Group Replication
Multi-master replication MySQL 8.0+.

---

## Experiments

- Docker replication setup
- Measure lag
- Manual failover
- Read/write splitting

---

## Challenge

Setup replication: master + slave + monitoring.

---

## Summary

Week 8 of 10: **Replication & HA** (Intermediate).
