# Replication — MySQL Warehouse Branches

> **Kategori:** MySQL | **Level:** Intermediate | **Minggu 8:** Replikasi & High Availability

## Learning Objectives

- Primary writes + Replica reads (`CHANGE MASTER TO` + `START SLAVE`), `SHOW SLAVE STATUS` checks `Seconds_Behind_Master` (source: dev.mysql.com/doc/refman/8.0/en/replication)
- `read-only = 1` on replica (rejects stray writes)

---

## Why This Matters (Non-IT)

24-hour shops: main DB dies → store closes. With a replica, reads move to the branch (store stays open for reading). Heavy reports on replica → primary stays cool for transactions.

---

## Program: MySQL Read Branch

```ini
# my.cnf PRIMARY (unique id!)
[mysqld]
server-id = 1
log-bin = mysql-bin
```

```ini
# my.cnf REPLICA
[mysqld]
server-id = 2
read-only = 1
```

```sql
-- On PRIMARY: create replication user
CREATE USER 'repl'@'%' IDENTIFIED BY 'secret';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';

-- On REPLICA: connect
CHANGE MASTER TO
  MASTER_HOST = 'primary-ip',
  MASTER_USER = 'repl',
  MASTER_PASSWORD = 'secret',
  MASTER_AUTO_POSITION = 1;
START SLAVE;

-- Health check (on REPLICA):
SHOW SLAVE STATUS\G
-- Slave_IO_Running: Yes, Slave_SQL_Running: Yes
-- Seconds_Behind_Master: 0 (not late!)
```

Test: `INSERT` on primary → 1 second → `SELECT` on replica present!

---

## Key Concepts

### Primary/Replica = Write/Read
Write to primary, read from replica. `read-only` stops stray writes.

### Unique `server-id` + Binlog
Each server a different ID. Binlog records all writes for copying.

### `Seconds_Behind_Master` = Lateness
0 = healthy. 3600 = 1 hour late (danger!).

---

## Beginner Friendly Explanation

### Analogy: Head Office & Branch
- **Primary = head office**: receives deposits (writes).
- **Replica = branch**: photocopies the book every second, serves viewing (reads).

### Step 0 — Prepare Device
- 2 MySQLs (2 `docker run` ports 3306 + 3307) + different `server-id`.

### How the Computer Reads It
1. `INSERT` on primary → writes binlog.
2. Replica pulls binlog → replays → exactly equal.

### 3 Must-Know Terms
1. **Primary/replica**: write/read
2. **Binlog/behind**: log/late

---

## Experiments

- **Green:** `INSERT` on primary → `SELECT` on replica 1 second later present?
- **Yellow:** Kill replica 1 minute → `Behind` rises? Restart → catches to 0?
- **Red:** Write directly to replica → `read-only` error? (Good, prevents!)

---

## Challenge

**Shop Branch:** Primary + replica + `INSERT` 5 → `SELECT` 5 on replica + `SHOW SLAVE STATUS` 2 Yeses + screenshot.

---

## Mini Glossary

- **Replica/binlog/behind**: branch/log/late

---

## Summary

Week 8 of 10: **Warehouse Branch** (Level: Intermediate). Write 1, read many. Next: **Security**.
