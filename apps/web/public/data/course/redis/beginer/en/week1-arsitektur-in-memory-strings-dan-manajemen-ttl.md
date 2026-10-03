# In-Memory Architecture, Strings & TTL (Time-To-Live) Management

> **Kategori:** Redis | **Level:** In-Memory Data Structures & Caching Patterns | **Minggu 1:** In-Memory Architecture, Strings & TTL (Time-To-Live) Management
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Redis Single-Threaded Event Loop architecture and epoll/kqueue I/O multiplexing
- Master String data types and atomic numeric mutations: INCR, INCRBY, DECR
- Manage cache lifecycle using EX, PX, EXPIRE parameters and TTL introspection
- Implement rudimentary distributed locking primitives using SET with NX and EX flags

---

## Program: User Session Management and Atomic Counters with Expiration

```redis
# Redis CLI Commands Demonstration
# 1. Store serialized JSON session with explicit Time-To-Live (3600 seconds)
SET session:usr_8921 '{"userId": 8921, "role": "admin", "tenant": "corp_alpha"}' EX 3600

# 2. Check remaining lifetime in seconds
TTL session:usr_8921

# 3. Retrieve session payload
GET session:usr_8921

# 4. Atomic Counter: Page visit counter incrementing safely under high concurrency
INCR stats:page_views:home:2026-03-10

# Increment by custom batch step
INCRBY stats:page_views:home:2026-03-10 15

# Set expiration on the metrics key (keep for 7 days = 604800 seconds)
EXPIRE stats:page_views:home:2026-03-10 604800

# 5. Conditional Insertion (SETNX: Set if Not Exists) - Foundational Distributed Mutex
# Sets lock key ONLY if it does not already exist, with 10-second automatic safety release
SET lock:order_processing:ord_9901 "worker_node_01" NX EX 10

# Attempting to acquire the same lock concurrently fails (returns nil)
SET lock:order_processing:ord_9901 "worker_node_02" NX EX 10

# Safe lock release
DEL lock:order_processing:ord_9901

# 6. Bulk read and write operations to minimize network round trips (pipelining benefits)
MSET config:maintenance_mode "false" config:max_upload_mb "50" config:api_version "v2.1"
MGET config:maintenance_mode config:max_upload_mb
```

---

## Key Concepts

### Why Redis is Blazing Fast: The Single-Threaded Event Loop
A widespread fallacy assumes multi-threaded systems are universally faster. Redis processes over 100,000 operations per second on a single CPU core thanks to its **Single-Threaded Event Loop**:
1. Datasets reside purely in **RAM** (nanosecond memory bus access vs millisecond physical disk latency).
2. Zero thread lock contention, zero race conditions on mutating structures, and zero CPU context-switching overhead.
3. Powered by **I/O Multiplexing** (`epoll` on Linux, `kqueue` on macOS) handling tens of thousands of concurrent client connections over non-blocking sockets.

### Binary-Safe Strings and Atomic Math
Redis **Strings** are strictly binary-safe and can store arbitrary payloads up to 512MB: plaintext, serialized JSON blobs, binary Protocol Buffers, or numerical scalars. When storing numeric strings, Redis enables atomic scalar operations like `INCRBY`. Atomic execution is absolute: 1,000 concurrent threads issuing `INCR` increment the counter by exactly 1,000 with zero lost updates.

### SET NX EX: The Mutex Lock Primitive
The statement `SET key value NX EX seconds`:
- `NX` (*Not Exists*): Writes the key exclusively if it does not currently exist. Returns *nil* upon collision.
- `EX`: Injects an atomic Time-To-Live countdown in seconds. This prevents perpetual deadlocks: if the worker holding the lock crashes ungracefully, Redis automatically purges the lock key upon expiry.

---

---

## Beginner Friendly Explanation

Think of Redis like a single, superhumanly fast barista at an espresso bar. Because this lone barista holds every order purely in their mind (RAM) rather than writing on paper notepads (Disk), they serve 100 customers per second without colliding into other staff.

`SET NX` is like sliding the 'Occupied' sign on a restroom door. If the door is already latched, nobody else can enter. The `EX 10` timer guarantees the lock pops open automatically after 10 minutes if someone passes out inside.

## Experiments

- Set a key with EX 5, poll TTL iteratively each second until it transitions to -2 (key expired and pruned)
- Execute INCRBY against a non-numeric string to inspect ERR value is not an integer or out of range
- Run a local throughput benchmark using the official redis-benchmark utility: redis-benchmark -q -n 100000 -c 50
- Compare KEYS * versus SCAN 0 MATCH session:* and understand why KEYS is strictly forbidden in production

---

## Challenge

Architect a basic per-minute API Rate Limiter by IP address using `INCR` and conditionally triggering `EXPIRE 60` only when the counter initializes to 1.

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

You have mastered the Redis Single-Threaded Event Loop, binary-safe Strings and atomic counters, TTL lifecycle management, and foundational mutex locking via SET NX EX.
