# Collection Data Structures: Hashes, Lists & Sets

> **Kategori:** Redis | **Level:** In-Memory Data Structures & Caching Patterns | **Minggu 2:** Collection Data Structures: Hashes, Lists & Sets
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Leverage Redis Hashes for structured object representation and memory optimization (ziplist/listpack)
- Construct high-throughput FIFO background task queues using Lists (LPUSH and RPOP / BRPOP)
- Apply Sets for uniqueness guarantees and mathematical set algebra (SINTER, SUNION, SDIFF)
- Evaluate computational time complexity across Redis data structure operations (O(1) vs O(N))

---

## Program: Object Profiling with Hashes, FIFO Job Queue with Lists, and Unique Tags with Sets

```redis
# 1. HASHES: Ideal for representing structured objects without JSON serialization overhead
# Store user profile fields individually
HSET user:profile:1001 name "Dewi Sartika" email "dewi@example.com" login_count 1 tier "gold"

# Increment specific numerical hash field atomically
HINCRBY user:profile:1001 login_count 1

# Retrieve single field, multiple fields, or entire object
HGET user:profile:1001 email
HMGET user:profile:1001 name tier
HGETALL user:profile:1001

# 2. LISTS: Ordered sequence of strings implemented as dual-ended linked lists (Quicklist)
# Push jobs into a background worker queue (Producer)
LPUSH queue:email_jobs '{"to": "dewi@example.com", "template": "welcome"}'
LPUSH queue:email_jobs '{"to": "ahmad@example.com", "template": "invoice"}'

# Inspect queue length
LLEN queue:email_jobs

# Worker pops job from right (Consumer FIFO: First-In, First-Out)
RPOP queue:email_jobs

# Blocking Pop: Worker sleeps waiting for new jobs without polling CPU (timeout 5s)
# BRPOP queue:email_jobs 5

# 3. SETS: Unordered collection of unique strings (O(1) membership checks and mathematical unions)
# Add follower tags
SADD user:tags:1001 "tech" "investing" "crypto" "ai"
SADD user:tags:1002 "tech" "design" "ai" "gaming"

# Test membership: Does user 1001 have "investing" tag? (Returns 1)
SISMEMBER user:tags:1001 "investing"

# Mathematical Intersection: Find mutual interests between user 1001 and 1002
SINTER user:tags:1001 user:tags:1002

# Union: Combine all unique interests across both users
SUNION user:tags:1001 user:tags:1002

# Difference: Interests unique to user 1001 not shared by 1002
SDIFF user:tags:1001 user:tags:1002
```

---

## Key Concepts

### Hashes: Memory-Efficient Object Projections
Persisting structured user entities as serialized JSON Strings incurs network and CPU waste: updating an isolated attribute (e.g. `login_count`) forces the client to fetch the entire blob, deserialize, mutate, re-serialize, and upload it back. Redis **Hashes** allow granular, single-attribute mutations (`HINCRBY`, `HSET`). Internally, small hashes are compressed using memory-dense **listpack/ziplist** encodings.

### Lists: Dual-Ended Queues and Blocking Consumers
Redis **Lists** are structured as dual-ended linked lists (*quicklists*). Prepending to the head (`LPUSH`) and popping from the tail (`RPOP`) maintain strict $O(1)$ time complexity regardless of whether the list contains 10 or 10,000,000 items. The blocking variant `BRPOP` puts consumer threads to sleep, waking them the microsecond a producer pushes a job, eliminating polling loops.

### Sets: Set Theory Algebra and Relationship Graphs
Redis **Sets** store collections of unique, unordered strings. Insertions (`SADD`) and membership verifications (`SISMEMBER`) run in instantaneous $O(1)$ time. Their greatest strength is in-memory relational set algebra executed server-side:
- `SINTER`: Computes mathematical intersections (e.g. discovering mutual connections or shared tags).
- `SDIFF`: Calculates set differences. Calculations occur directly in Redis memory at microsecond speeds.

---

---

## Beginner Friendly Explanation

Think of Hashes like a personnel index card where individual lines (name, age, department) can be penciled in or erased independently without shredding the entire card.

Lists resemble a line of moviegoers buying tickets (FIFO queue): newcomers join the back of the line (LPUSH), and the box office serves whoever has waited at the front (RPOP).
Sets resemble a collector's badge bag: duplicates are physically rejected, and you can dump two bags together to instantly reveal which badges both collectors share (SINTER).

## Experiments

- Benchmark memory overhead (MEMORY USAGE) between 1,000 entities stored as JSON strings vs native Hashes
- Simulate task queueing: invoke BRPOP in session 1, then execute LPUSH in session 2 to witness instantaneous wakeups
- Pass 10 items containing 5 duplicates into SADD and observe that only unique elements persist
- Apply SPOP to extract and remove random items from a Set (ideal for raffle drawing algorithms)

---

## Challenge

Architect a basic collaborative filtering engine: track user category views in Sets (`user:views:{id}`), identifying users with overlapping affinities using `SINTERSTORE` and `SCARD`.

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

You have mastered Redis collection primitives: memory-dense Hashes, FIFO task queuing with Lists & BRPOP, and set algebra with Sets.
