# Replica Set & Sharding — MongoDB Warehouse Branches

> **Kategori:** MongoDB | **Level:** Intermediate | **Minggu 7:** Replica Set & Sharding
> **Prerequisites:** Week 6 — **Advanced Aggregation**.

## Learning Objectives

- Replica Set (1 primary + 2 secondaries, automatic failover) + `rs.status()` checks (source: mongodb.com/docs/manual/replication)
- Sharding (`shard key`) splits 1 million cards across 3 warehouses

---

## Why This Matters (Non-IT)

Mongo server dies → shop closes. Replica Set: 1 dies → secondary rises in <10 seconds (automatic!). 10 million cards → sharding splits across 3 servers (no single pile-up).

---

## Program: Mongo Branches (Docker)

```bash
# 3 nodes 1 command (learning example)
docker compose up -d  # mongo1, mongo2, mongo3 --replSet rs0

# Form the team (on one of them):
mongosh --eval 'rs.initiate({_id: "rs0", members: [
  {_id: 0, host: "mongo1:27017"},
  {_id: 1, host: "mongo2:27017"},
  {_id: 2, host: "mongo3:27017", arbiterOnly: false}
]})'

# Check + write + kill the primary!
mongosh --eval 'rs.status()' | grep -E 'stateStr|name'
# Write on primary → read on secondary (readPreference=secondary)
# docker stop <primary> → secondary auto-promotes to primary!
```

---

## Key Concepts

### Replica Set = Team of 3 (1 Boss + 2 Deputies)
Write to primary, reads may go secondary. Primary dies → voting → deputy rises.

### Sharding = Split Warehouse
`shard key` (e.g. `city`) decides which card goes to which warehouse. `mongos` receptionist routes.

---

## Beginner Friendly Explanation

### Analogy: 3 Branches + Territories
- **Replica = photocopy branch**: center writes, branches copy every second.
- **Sharding = territories**: Jakarta cards in JKT warehouse, Surabaya in SBY.

### Step 0 — Prepare Device
- Docker + compose file for 3 mongo nodes, `rs.initiate` once.

### How the Computer Reads It
1. Write on primary → oplog entry → secondaries replay.
2. Primary dies → election → deputy becomes primary in seconds.

### 3 Must-Know Terms
1. **Primary/secondary**: boss/deputy
2. **Failover/shard**: auto-replace/split

---

## Experiments

- **Green:** `rs.status()` → 1 PRIMARY + 2 SECONDARY?
- **Yellow:** Write on primary → read on secondary present (seconds delay)?
- **Red:** Kill primary → PRIMARY moves? Restart old one → becomes secondary?

---

## Challenge

**3-Node Team:** Compose 3 + `initiate` + write 5 + kill primary + prove reads/writes keep working.

---

## Mini Glossary

- **Replica/shard/mongos**: team/split/receptionist

---

## Summary

Week 7 of 10: **Auto Team** (Level: Intermediate). 1 death keeps shop open. Next: **Tuning**.
