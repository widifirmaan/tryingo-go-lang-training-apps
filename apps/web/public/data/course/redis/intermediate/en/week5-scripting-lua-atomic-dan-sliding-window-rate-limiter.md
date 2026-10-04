# Atomic Lua Scripting & Sliding Window Rate Limiter

> **Kategori:** Redis | **Level:** Lua Scripting, Streams & Distributed Cluster | **Minggu 5:** Atomic Lua Scripting & Sliding Window Rate Limiter
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand why Lua scripts evaluate with absolute atomicity inside the Redis Event Loop
- Operate EVAL, SCRIPT LOAD, and EVALSHA to eliminate network script transmission overhead
- Implement the Sliding Window Log Rate Limiting algorithm using Redis Sorted Sets (ZSET)
- Eliminate concurrency race conditions without deploying cumbersome external distributed locks

---

## Program: Sliding Window Log Rate Limiter Implementation via Atomic Lua Scripts

```redis
-- Lua Script for High-Precision Sliding Window Log Rate Limiter
-- Evaluated atomically within Redis memory (EVAL command)
-- KEYS[1]: Rate limit key (e.g. "ratelimit:ip_192.168.1.100")
-- ARGV[1]: Current Unix Timestamp in milliseconds
-- ARGV[2]: Window Size in milliseconds (e.g. 60000 for 1 minute)
-- ARGV[3]: Maximum Allowed Requests in window (e.g. 10)

local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local max_requests = tonumber(ARGV[3])
local clear_before = now - window

-- Step 1: Remove all log entries older than current sliding window
redis.call('ZREMRANGEBYSCORE', key, 0, clear_before)

-- Step 2: Count how many requests occurred in the active window
local current_requests = redis.call('ZCARD', key)

-- Step 3: Check if request threshold breached
if current_requests < max_requests then
    -- Under limit: Add current request timestamp as member and score
    redis.call('ZADD', key, now, now)
    -- Extend TTL to auto-expire idle keys
    redis.call('PEXPIRE', key, window)
    return {1, max_requests - current_requests - 1} -- Allowed (1), Remaining quota
else
    return {0, 0} -- Denied (0), 0 remaining
end

-- Invocation from redis-cli:
-- EVAL "local key = KEYS[1] ... return {1, 9}" 1 "ratelimit:ip_192.168.1.100" 1710072000000 60000 10
```

---

## Key Concepts

### The Guarantee of Absolute Lua Script Atomicity
In Redis, Lua scripts executed via `EVAL` or `EVALSHA` execute as an indivisible atomic primitive. While a Lua script executes, the Single-Threaded Event Loop locks out all other client operations. This yields unprecedented power: developers read state, execute complex branching logic (`if/else`), and write back mutations without requiring distributed locking protocols.

### The Precision of Sliding Window Log Rate Limiting
Primitive *Fixed Window* rate limiting suffers from boundary burst vulnerabilities: an attacker issuing 10 requests at second 59 and 10 requests at second 01 effectively fires 20 requests across a 2-second burst window.
**Sliding Window Log** resolves this with mathematical precision:
1. Employs a **Sorted Set** where Unix timestamps in milliseconds serve as both member and score.
2. Evicts expired timestamps falling outside the sliding window boundary (`ZREMRANGEBYSCORE 0 (now - window)`).
3. Measures active density via `ZCARD`. If within threshold, it records the request (`ZADD`).

### Bandwidth Optimization: SCRIPT LOAD and EVALSHA
Transmitting entire Lua script source payloads over the wire on high-frequency API endpoints exhausts network bandwidth. Issuing `SCRIPT LOAD` caches the compiled bytecode on the Redis server, returning an immutable 40-character SHA1 digest. Applications subsequently invoke `EVALSHA <sha1> ...` with zero network overhead.

---

---

## Beginner Friendly Explanation

Imagine a subway turnstile guarded by a vigilant security officer holding a stopwatch.
The rule states: 'Only 10 passengers may pass through within any rolling 60-second span'.
Whenever a commuter approaches, the guard checks their clipboard: they cross off entries stamped more than 60 seconds ago, and count the active records.

Because the guard examines and writes the clipboard in one uninterrupted motion without distraction (Lua Script Atomicity), nobody can sneak past!

## Experiments

- Load the Lua script into Redis using SCRIPT LOAD and execute it via EVALSHA
- Simulate rate limit rejection by firing 15 rapid requests and observing the return 0 (denied)
- Benchmark MULTI/EXEC transactions versus Lua scripts for conditional read-modify-write operations
- Trigger the lua-time-limit configuration and observe SCRIPT KILL mechanics during an intentional infinite loop

---

## Challenge

Craft an atomic Token Bucket Lua script: persist token volume and last_refill_timestamp, calculate replenishment proportional to elapsed time, and decrement 1 token upon request approval.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR IN-MEMORY SINGLE-THREADED REDIS               │
│                                                          │
│ Client TCP Request ──► I/O Multiplexing (epoll/kqueue)    │
│                              │                           │
│                              ▼                           │
│                 Pusat Eksekusi Command                   │
│                 (O(1) Super Cepat di RAM)                │
│                 ┌───────────────────────────┐            │
│                 │ STRINGS: 'user:1' -> JSON │            │
│                 │ HASHES:  'cart:9' -> Fields│           │
│                 │ SETS:    'online_users'   │            │
│                 │ STREAMS: 'event_log'      │            │
│                 └─────────────┬─────────────┘            │
│                               │                          │
│                               ▼                          │
│              Persistensi Latar Belakang (AOF / RDB)      │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `SET key value [EX seconds] / GET key`
- **Core Functionality:** Operation of string in-memory tercepat.
- **Parameters / Attributes:** `Key identifier, Value payload, Expiration (EX)`.
- **System Behavior & Return:** Persists dan mengambil cache data dalam hitungan sub-milidetik dengan batas kedaluwarsa otomatis..
- **Practical Code Example:**
```redis
SET session:user_99 '{"role":"admin"}' EX 3600
GET session:user_99
```
- **Expected Execution Output:**
```output
"{\"role\":\"admin\"}"
```

### 2. `HSET key field value / HGETALL key`
- **Core Functionality:** Struktur data Hash penyimpanan objek.
- **Parameters / Attributes:** `Key, Field name, Value`.
- **System Behavior & Return:** Persists banyak atribut objek di bawah satu key tanpa perlu serialisasi JSON berat..
- **Practical Code Example:**
```redis
HSET user:101 name "Alex" role "developer" active "true"
HGETALL user:101
```
- **Expected Execution Output:**
```output
1) "name" 2) "Alex" 3) "role" 4) "developer"
```

### 3. `LPUSH queue job / RPOP queue`
- **Core Functionality:** Struktur List untuk Message Queue FIFO.
- **Parameters / Attributes:** `Key queue, Payload job`.
- **System Behavior & Return:** Mengimplementasikan antrean tugas asinkron super cepat antar pekerja worker..
- **Practical Code Example:**
```redis
LPUSH email_queue "kirim_verifikasi_user_1"
RPOP email_queue
```
- **Expected Execution Output:**
```output
"kirim_verifikasi_user_1"
```

### 4. `PUBLISH channel message / SUBSCRIBE channel`
- **Core Functionality:** Pub/Sub komunikasi real-time event.
- **Parameters / Attributes:** `Channel name, Message payload`.
- **System Behavior & Return:** Menyiarkan pesan ke jutaan listener secara instan untuk chat atau notifikasi langsung..
- **Practical Code Example:**
```redis
PUBLISH notifications:global "Server maintenance jam 23:00"
```
- **Expected Execution Output:**
```output
(integer) 1 (Pesan terkirim ke 1 subscriber)
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

You have mastered atomic execution using Redis Lua scripts, SCRIPT LOAD / EVALSHA caching, and sliding window rate limiter implementations.
