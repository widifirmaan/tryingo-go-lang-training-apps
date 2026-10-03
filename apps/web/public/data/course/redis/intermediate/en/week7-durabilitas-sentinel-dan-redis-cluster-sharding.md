# Durability (RDB/AOF), Sentinel HA & Redis Cluster

> **Kategori:** Redis | **Level:** Lua Scripting, Streams & Distributed Cluster | **Minggu 7:** Durability (RDB/AOF), Sentinel HA & Redis Cluster
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Compare disk persistence mechanics: RDB (Point-in-Time Snapshots) vs AOF (Append-Only Log)
- Evaluate performance vs durability trade-offs across appendfsync policies: always, everysec, and no
- Configure Redis Sentinel for automated master health monitoring and zero-downtime failovers
- Master Redis Cluster horizontal sharding (16,384 Hash Slots) and Hash Tag ({...}) colocations

---

## Program: RDB vs AOF Durability Configuration and 16,384 Hash Slots Cluster Architecture

```redis
# 1. Durability Configuration in redis.conf
# RDB (Snapshotting) configuration: save <seconds> <changes>
# save 900 1
# save 300 10
# save 60 10000

# AOF (Append-Only File) configuration - recommended for zero data-loss
# appendonly yes
# appendfilename "appendonly.aof"
# appendfsync everysec  # Options: always (slowest), everysec (balanced), no (OS decides)

# Trigger background snapshotting manually without blocking main event loop
BGSAVE

# Trigger AOF background rewrite to compact file size
BGREWRITEAOF

# 2. Redis Sentinel Commands for High Availability & Automated Failover
# Connect to Sentinel port (default 26379)
# SENTINEL masters
# SENTINEL get-master-addr-by-name mymaster
# SENTINEL failover mymaster  # Manual failover drill

# 3. Redis Cluster: 16,384 Hash Slots Sharding Architecture
# Every key is mapped to a slot via CRC16(key) mod 16384
CLUSTER INFO
CLUSTER NODES

# Hash Tags: Ensure related keys hash to the EXACT same slot and physical node!
# The string inside curly braces {} dictates the slot calculation:
MSET {user:1001}:profile "data" {user:1001}:orders "order_list" {user:1001}:tokens "auth"
# All three keys land on the identical hash slot! Multi-key operations are permitted!

# Inspect slot assignment of a key
CLUSTER KEYSLOT "{user:1001}:profile"
```

---

## Key Concepts

### Persistence Trade-offs: RDB vs AOF
While Redis operates primarily in-memory, durability guarantees are preserved via two complementary mechanisms:
- **RDB (Redis Database Snapshots)**: Emits compact point-in-time binary snapshots of memory to disk at scheduled intervals via background `fork()` processes. Drawback: ungraceful power loss risks losing data accumulated since the last snapshot.
- **AOF (Append-Only File)**: Logs every write mutation command sequentially. Configuring `appendfsync everysec` strikes the optimal balance: memory buffers are flushed to disk every second, bounding maximum theoretical data loss to 1 second while maintaining high throughput.

### High Availability with Redis Sentinel
In standard Master-Replica setups, replica failover requires active orchestration. **Redis Sentinel** operates as an independent quorum of distributed monitoring daemons. Upon confirming master unresponsiveness via consensus, Sentinel autonomously promotes an elected replica to master authority, reconfigures sibling nodes, and notifies client connection pools.

### Redis Cluster: 16,384 Hash Slots and Hash Tags
For dataset footprints exceeding single-machine RAM limits (multi-terabyte scaling):
- **Redis Cluster** partitions keyspace into **16,384 Hash Slots**. Each master node hosts an assigned slot partition (e.g. Node 1: slots 0-5460).
- Keys are mapped via `HASH_SLOT = CRC16(key) mod 16384`.
- **Hash Tags**: Multi-key operations (`MGET`, Lua scripts) fail if target keys reside on disparate physical shards. Encapsulating routing keys in curly brackets `{user:1001}:profile` and `{user:1001}:orders` forces the hash calculator to evaluate strictly the bracketed substring, guaranteeing identical slot colocation.

---

---

## Beginner Friendly Explanation

Imagine keeping a journal of your life.
RDB is like taking a panoramic photograph of your room once a week. If you lose something on Wednesday, last Sunday's photo cannot tell you where you set your keys on Tuesday.
AOF is like scribbling an indelible log line every time you move: '10:00 AM bought coffee, 10:01 AM bought pastry'. After a blackout, you reconstruct the room by replaying the log.

Sentinel is like a committee of 3 bodyguards watching the team captain: if the captain collapses, the guards confer, elect the vice-captain as new leader, and direct the convoy without stopping!

## Experiments

- Execute BGSAVE and observe the generation of the binary dump.rdb image on disk
- Inspect appendonly.aof with a text editor to witness RESP protocol serialization
- Compute the hash slot mapping of arbitrary keys via CLUSTER KEYSLOT
- Demonstrate that sharing hash tags like {tenant_42}:users and {tenant_42}:settings guarantees identical keyslot assignment

---

## Challenge

Execute a controlled cluster failover drill: issue `SENTINEL failover <master-name>` or `CLUSTER FAILOVER`, measuring client recovery reconnection latency.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `CREATE TABLE name ( col TYPE CONSTRAINT );`
- **Core Functionality:** Relational schema definition.
- **Parameters / Attributes:** `Column names, Data types, Constraints (PK/FK/NOT NULL)`.
- **System Behavior & Return:** Constructs strongly typed database tables with guaranteed relational integrity.
- **Practical Code Example:**
```javascript
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  balance NUMERIC(10, 2) DEFAULT 0.00
);
```
- **Expected Execution Output:**
```text
Initializes accounts table ready for ACID transactions
```

### 2. `SELECT cols FROM tbl WHERE cond ORDER BY col LIMIT n;`
- **Core Functionality:** Declarative relational data retrieval.
- **Parameters / Attributes:** `Column list, Filter predicates, Ordering, Paging limit`.
- **System Behavior & Return:** Fetches matching database records with predictable execution plan optimization.
- **Practical Code Example:**
```javascript
SELECT id, email, balance FROM accounts WHERE balance > 0 ORDER BY balance DESC LIMIT 5;
```
- **Expected Execution Output:**
```text
Returns top 5 funded customer accounts
```

### 3. `INSERT INTO tbl (cols) VALUES (vals) RETURNING id;`
- **Core Functionality:** Atomic record insertion with immediate return.
- **Parameters / Attributes:** `Columns, Insert values, RETURNING clause`.
- **System Behavior & Return:** Persists new row data and returns computed primary keys or defaults without an extra query.
- **Practical Code Example:**
```javascript
INSERT INTO accounts (email) VALUES ('dev@tryngo.com') RETURNING id;
```
- **Expected Execution Output:**
```text
Returns newly allocated UUID primary key
```

### 4. `SELECT * FROM a INNER JOIN b ON a.id = b.a_id;`
- **Core Functionality:** Multi-table relational join.
- **Parameters / Attributes:** `Table identifiers, ON match predicate`.
- **System Behavior & Return:** Correlates rows across related tables matching foreign key references.
- **Practical Code Example:**
```javascript
SELECT a.email, t.amount FROM accounts a INNER JOIN transactions t ON a.id = t.account_id;
```
- **Expected Execution Output:**
```text
Consolidates account holders with their transaction history
```


---

## Common Pitfalls & Debugging Tips

### 1. Omitting Time-To-Live (TTL) on Cached Keys
- **Symptom / Issue:** Fills server RAM over time and triggers out-of-memory eviction crashes.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always assign an explicit TTL: `SET key val EX 3600` (1 hour).

### 2. Running `KEYS *` in Production
- **Symptom / Issue:** Redis is single-threaded; `KEYS *` locks the entire database server.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use non-blocking cursor-based iteration via the `SCAN` command.

### 3. Storing Giant Monolithic Blobs
- **Symptom / Issue:** Spikes network latency during roundtrips and degrades Redis throughput.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Decompose large objects into Redis Hashes (`HSET`) or cache only essential fields.

---

## Summary

You have mastered persistence and distributed Redis architecture: RDB vs AOF durability, Sentinel automated failover orchestration, and 16,384 Hash Slot partitioning with Hash Tags.
