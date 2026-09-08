# Clustering — Branched Redis Shop

> **Kategori:** Redis | **Level:** Intermediate | **Minggu 8:** Redis Cluster

## Learning Objectives

- `redis-cli --cluster create` 3 masters + 3 replicas, `16384 slots` splits data, automatic failover (source: redis.io/docs/management/scaling)

---

## Why This Matters (Non-IT)

1 dead Redis server → shop closes. With 6 nodes (3 masters + 3 standbys), 1 death → standby rises automatically. Data split across 16384 slots to 3 masters (no single pile-up).

---

## Program: Redis Branches (Docker)

```bash
# 6 nodes via compose (brief example)
docker compose up -d  # 6x redis:7 --cluster-enabled yes

# Form the cluster (1 master per 5461 slots)
redis-cli --cluster create 127.0.0.1:7000 ... :7005 --cluster-replicas 1 --cluster-yes

# Check + test failover
redis-cli -c -p 7000 SET cashier:1 open
redis-cli -c -p 7000 GET cashier:1
docker stop <master-1>  # kill 1!
redis-cli -c -p 7000 GET cashier:1  # still works (replica risen!)
```

`-c` = follows slot redirects (mandatory in cluster!).

---

## Key Concepts

### `16384 Slots` = Warehouse Plots
Data split into 16384 plots across masters. Key `cashier:1` hashes → plot → owning master.

### Replica + Failover = Standby Rises
Each master 1 replica. Master dies → replica auto-becomes master.

---

## Beginner Friendly Explanation

### Analogy: 3 Branches + Standbys
- **Master = branch**, **replica = deputy**, **slot = territory**. Branch closes → deputy opens.

### Step 0 — Prepare Device
- Docker compose 6 nodes + `create --cluster-replicas 1`.

### How the Computer Reads It
1. Key hashes → slot number → owning master serves it.
2. Master dies → failover → deputy serves same slots.

### 3 Must-Know Terms
1. **Cluster/slot/replica**: branch/plot/standby
2. **Failover/-c**: auto-replace/follow

---

## Experiments

- **Green:** `cluster info` → `cluster_state:ok`?
- **Yellow:** Without `-c`, `GET` cross-slot key → `MOVED` error? Add `-c`.
- **Red:** Kill master → `GET` works after failover?

---

## Challenge

**6-Node Branch:** Compose 6 + `create --cluster-replicas 1` + `SET/GET -c` + kill 1 master proving survival.

---

## Mini Glossary

- **Cluster/failover/slot**: branch/replace/plot

---

## Summary

Week 8 of 10: **Auto Branching** (Level: Intermediate). 1 death keeps shop open. Next: **Caching Patterns**.
