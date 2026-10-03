# Sorted Sets (ZSET) & HyperLogLog for Big Data

> **Kategori:** Redis | **Level:** In-Memory Data Structures & Caching Patterns | **Minggu 3:** Sorted Sets (ZSET) & HyperLogLog for Big Data
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Sorted Set internal structures (SkipList + Hash Table achieving O(log N) operations)
- Construct real-time competitive Leaderboards using ZADD, ZINCRBY, and ZREVRANK
- Understand probabilistic Cardinality Estimation algorithms via HyperLogLog
- Save gigabytes of RAM using HyperLogLog (strict 12KB fixed footprint) to estimate millions of unique visitors

---

## Program: Real-Time Gaming Leaderboard with ZSET and Unique Visitor Counting with HyperLogLog

```redis
# 1. SORTED SETS (ZSET): Elements sorted by a floating-point score (SkipList + HashTable)
# Add players and initial game scores
ZADD leaderboard:weekly 1450 "player:alpha"
ZADD leaderboard:weekly 2800 "player:bravo"
ZADD leaderboard:weekly 1950 "player:charlie"
ZADD leaderboard:weekly 3200 "player:delta"

# Increment player score atomically when they complete a quest (+350 points)
ZINCRBY leaderboard:weekly 350 "player:alpha"

# Get Top 3 highest scoring players with their scores (0-indexed, descending)
ZREVRANGE leaderboard:weekly 0 2 WITHSCORES

# Determine exact rank of a specific player (0-indexed rank: 0 is highest)
ZREVRANK leaderboard:weekly "player:bravo"

# Inspect the exact score of a player
ZSCORE leaderboard:weekly "player:bravo"

# Count total players who scored between 1500 and 3000 points
ZCOUNT leaderboard:weekly 1500 3000

# Paginated Leaderboard Query: Get players ranked 10 to 20
ZREVRANGE leaderboard:weekly 10 20 WITHSCORES

# 2. HYPERLOGLOG (HLL): Probabilistic data structure for estimating cardinalities of billions of items
# Uses ONLY 12KB of fixed memory with standard error of <= 0.81%!
# Track unique daily visitors across distributed servers
PFADD uvc:2026-03-10 "user_ip_192.168.1.1" "user_ip_192.168.1.2" "user_ip_192.168.1.3"
PFADD uvc:2026-03-10 "user_ip_192.168.1.1" # Duplicate entry: will NOT increase cardinality!

# Get estimated unique count
PFCOUNT uvc:2026-03-10

# Merge multiple daily HyperLogLogs into a weekly unique visitor metric without recalculating
PFADD uvc:2026-03-11 "user_ip_192.168.1.1" "user_ip_192.168.1.9"
PFMERGE uvc:weekly_rollup uvc:2026-03-10 uvc:2026-03-11
PFCOUNT uvc:weekly_rollup
```

---

## Key Concepts

### Sorted Set (ZSET) Architecture: SkipLists Deconstructed
**Sorted Sets** represent one of Redis's crown achievements. Each element binds a string member to a floating-point score. Under the hood, Redis couples dual data structures:
1. **Hash Table**: Maps member identifiers to their score in $O(1)$ time.
2. **SkipList**: A multi-tiered probabilistic data structure maintaining continuous score ordering, enabling range queries and ranking in $O(\log N)$ time.
This enables microsecond ranking queries across leaderboards containing tens of millions of active contestants.

### HyperLogLog: Big Data Probabilistic Mathematics
Tracking 100 million daily Unique Visitors using standard Sets (`SADD`) to store UUID strings consumes upwards of **4 Gigabytes of RAM**.
**HyperLogLog (HLL)** implements probabilistic cardinality estimation. Its mathematical properties are extraordinary:
- It maintains a strictly fixed memory footprint of **12 Kilobytes**, whether counting 1,000 or 1,000,000,000 unique records!
- The standard error rate is mathematically bounded at **<= 0.81%**, which is negligible for web analytics, ad impressions, and event tracking.

---

---

## Beginner Friendly Explanation

Imagine a real-time racing leaderboard (Sorted Set). Whenever a car overtakes a rival, its points update and its position on the stadium jumbotron shifts upward instantaneously.

HyperLogLog is like a bouncer at a stadium concert using a probabilistic clicker counter. The bouncer does not transcribe every visitor's national ID into thousands of thick ledger notebooks (wasting gigabytes of paper). By observing statistical hash bit patterns, a tiny 12KB index card estimates 1,000,000 attendees with 99.2% accuracy!

## Experiments

- Seed 10,000 randomized scores into a ZSET and measure the latency of ZREVRANK lookups
- Execute ZREMRANGEBYRANK to prune a leaderboard to the top 100 contenders, purging trailing entries
- Benchmark MEMORY USAGE of a Set holding 100,000 UUIDs versus a HyperLogLog counting the same dataset
- Apply PFMERGE to merge 7 daily visitor HyperLogLogs into an aggregate weekly unique visitor metric

---

## Challenge

Architect a time-decayed leaderboard: calculate final scores via `raw_points - (completion_seconds * 0.01)`, crafting queries extracting the top 10 players and their point delta from first place.

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

You have mastered Sorted Sets (ZSET) for real-time microsecond leaderboards and HyperLogLog for high-cardinality big data estimation within a fixed 12KB memory envelope.
