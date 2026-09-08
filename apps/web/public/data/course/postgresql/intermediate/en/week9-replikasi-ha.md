# Replication & HA — Warehouse Branches

> **Kategori:** PostgreSQL | **Level:** Intermediate | **Minggu 9:** Replikasi & HA

## Learning Objectives

- `replica` reads, `primary` writes, `pg_basebackup` copies, `failover` if primary dies

---

## Why This Matters (Non-IT)

Shops open 24 hours — if the main warehouse dies, the replica branch takes over.

---

## Program: Replication

```bash
# Primary: postgresql.conf: wal_level = replica
# Replica: pg_basebackup -h primary -D /var/lib/postgresql/data -R
# Check: SELECT * FROM pg_stat_replication;
```

---

## Key Concepts

### Primary / Replica / Failover
Primary serves writes, replicas serve reads + stand by; failover promotes a replica.

---

## Beginner Friendly Explanation

### Analogy: Branch Warehouses
- **Primary = head warehouse**, **replica = branch copies** receiving every update; head down → branch promoted.

### Step 0 — Prepare Device
- Two Postgres instances (or read-only configs), `pg_basebackup` docs.

### How the Computer Reads It
1. Primary streams WAL → replica replays → identical copy.
2. `pg_stat_replication` lists connected replicas.

### 3 Must-Know Terms
1. **primary/replica/failover**: head/branch/takeover

---

## Experiments

- **Green:** `pg_stat_replication` → replica listed?
- **Yellow:** Write to replica → rejected (read-only)?
- **Red:** Kill primary → manual failover promotes replica? Practice restore.

---

## Challenge

**Branch Setup:** Configure 1 primary + 1 replica + verify `pg_stat_replication` + test failover + document steps.

---

## Mini Glossary

- **replica/failover**: branch/takeover

---

## Summary

Week 9: **Warehouse Branches** — replication. Next: **Capstone**.
