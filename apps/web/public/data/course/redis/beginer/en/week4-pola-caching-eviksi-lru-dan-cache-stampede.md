# Caching Patterns, LRU Eviction & Stampede Mitigation

> **Kategori:** Redis | **Level:** In-Memory Data Structures & Caching Patterns | **Minggu 4:** Caching Patterns, LRU Eviction & Stampede Mitigation
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master architectural caching patterns: Cache-Aside, Write-Through, Write-Behind, and Refresh-Ahead
- Configure Redis eviction policies: allkeys-lru, volatile-lru, allkeys-lfu, and noeviction
- Diagnose the three catastrophic caching hazards: Penetration, Breakdown (Stampede), and Avalanche
- Implement Mutex Locking and Probabilistic Early Expiration (XFetch) to neutralize the Dogpile Effect

---

## Program: Simulation of Cache-Aside Pattern, Maxmemory Policies, and LRU Eviction

```redis
# 1. Inspect and configure maximum memory limits and eviction policies
CONFIG SET maxmemory 256mb

# Configure eviction algorithm: volatile-lru (evict least recently used keys with an expire set)
# Other options: allkeys-lru, allkeys-lfu, volatile-ttl, noeviction
CONFIG SET maxmemory-policy allkeys-lru

# 2. Inspect memory metrics and eviction stats
INFO memory

# 3. Cache-Aside Pattern workflow in application pseudocode:
# Step A: Check if key exists in Redis Cache
# GET product:details:prod_5501
# Step B: If found (CACHE HIT) -> return immediately
# Step C: If nil (CACHE MISS) -> Query PostgreSQL/MySQL
# Step D: Populate Redis cache with TTL to avoid stale data
SET product:details:prod_5501 '{"title": "Mechanical Keyboard", "price": 1200000}' EX 300

# 4. Mitigation of Cache Stampede (Dogpile Effect) using Mutex Locking
# When a hot key expires, hundreds of concurrent requests attempt to query DB simultaneously.
# Only the thread that successfully acquires this mutex lock queries the DB!
SET lock:rebuild:product:5501 "worker_uuid" NX EX 5

# Inspect eviction count to monitor if memory is under pressure
INFO stats
```

---

## Key Concepts

### The Industry Standard: Cache-Aside Architecture
Under the **Cache-Aside** paradigm:
1. Application processes query Redis first.
2. Upon discovery (**Cache Hit**), payloads return to clients within sub-millisecond latencies.
3. Upon absence (**Cache Miss**), the application queries primary storage (PostgreSQL/MySQL), populates Redis with an explicit TTL, and serves the response.
4. During underlying database mutations, the application explicitly invalidates (deletes) the Redis key.

### Eviction Strategies under Memory Pressure
When Redis memory reaches the `maxmemory` threshold, it invokes its eviction policy:
- `allkeys-lru`: Evicts the Least Recently Used keys across the entire dataset.
- `volatile-lru`: Restricts LRU eviction strictly to keys bearing explicit TTL expirations.
- `allkeys-lfu`: Evicts based on Least Frequently Used access counters.
- `noeviction`: Fails incoming writes with hard out-of-memory errors (`OOM command not allowed when used memory > 'maxmemory'`).

### The Three Critical Caching Failure Modes
1. **Cache Penetration**: Clients request non-existent entities (e.g. `id: -999`), bypassing cache and saturating the relational DB. Solved via *Bloom Filters* or caching negative null markers.
2. **Cache Breakdown (Stampede / Dogpile Effect)**: A heavily frequented key expires, prompting thousands of concurrent threads to simultaneously flood primary storage to rebuild it. Solved via *Distributed Mutex Locks*.
3. **Cache Avalanche**: Large tranches of cache keys expire at the exact same second, shifting massive loads to the database. Solved via *Randomized TTL Jitter*.

---

---

## Beginner Friendly Explanation

Imagine managing a print shop near a university campus.
Cache-Aside is like pre-printing 5 copies of the top exam study guide and keeping them on the front counter. When a student requests it (Cache Hit), you hand it over in one second. When someone requests an obscure thesis (Cache Miss), you walk to the back storage archives to make a fresh copy.

LRU eviction means that when your front counter is cluttered, study guides that haven't been requested all morning are returned to the back shelves. A Cache Stampede is when that study guide runs out right as 500 panicking students charge the counter simultaneously!

## Experiments

- Set maxmemory to 2MB on a local instance, push payloads and verify evicted_keys incrementing in INFO stats
- Simulate a Cache Avalanche: inject 100 keys with identical 5-second expirations and witness the collapse in INFO keyspace
- Implement TTL jitter: TTL = 300 + Math.floor(Math.random() * 60) and observe smoothed expiration intervals
- Configure noeviction mode and observe the hard OOM exception raised when pushing data past memory limits

---

## Challenge

Implement a mutex-based Cache Stampede guard: upon a cache miss, issue `SET lock:{key} NX EX 5`. If acquired, query the DB and refresh cache; if locked, poll with exponential backoff and 50ms sleeps.

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

You have mastered enterprise Caching patterns (Cache-Aside), memory eviction policies (allkeys-lru), and mitigation strategies against Cache Penetration, Avalanche, and Stampedes.
