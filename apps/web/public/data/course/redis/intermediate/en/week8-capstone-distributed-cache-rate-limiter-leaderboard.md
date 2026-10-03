# Capstone Project: High-Throughput Cache, Limiter & Leaderboard

> **Kategori:** Redis | **Level:** Lua Scripting, Streams & Distributed Cluster | **Minggu 8:** Capstone Project: High-Throughput Cache, Limiter & Leaderboard

## Learning Objectives

- Synthesize all Redis data structures into a unified, high-throughput gaming backend architecture
- Implement Sliding Window Rate Limiting shielding transaction APIs from DDOS abuse
- Deploy Cache-Aside profiles using Hashes and eliminate Cache Avalanches with TTL Jitter
- Harmonize real-time Sorted Set Leaderboards with Redis Streams for persistent database synchronization

---

## Program: Unified Gaming Financial Engine: Cache-Aside, Sliding Rate Limiter, and Real-Time Leaderboard

```redis
# CAPSTONE PROJECT: High-Throughput In-Memory Cache, Rate Limiter & Leaderboard Engine
# Integrates Hashes, Sorted Sets, Lua Scripting, Streams, and Expiration Strategies

# ==============================================================================
# 1. SLIDING WINDOW RATE LIMITER (Protecting Payment Gateways & Gaming APIs)
# ==============================================================================
# Executed via atomic Lua Script (demonstrated as conceptual sequence)
# Ensures user 1001 cannot execute more than 5 transactions per 60 seconds
ZREMRANGEBYSCORE ratelimit:pay:usr_1001 0 1710072940000
ZADD ratelimit:pay:usr_1001 1710073000000 "tx_nonce_88921"
EXPIRE ratelimit:pay:usr_1001 60
ZCARD ratelimit:pay:usr_1001

# ==============================================================================
# 2. CACHE-ASIDE WITH HASHPACK (Ultra-Fast Player Profile Cache)
# ==============================================================================
# Store player profile using Hash with random TTL Jitter (300s + jitter)
HSET {player:1001}:profile name "Rizky Gamer" rank "Diamond" wallet_balance 450000 xp 12450
EXPIRE {player:1001}:profile 342

# Atomic experience point gain
HINCRBY {player:1001}:profile xp 150

# ==============================================================================
# 3. GLOBAL REAL-TIME COMPETITIVE LEADERBOARD (ZSET)
# ==============================================================================
# Synchronize XP to the global leaderboard
ZADD leaderboard:season_04 12600 "player:1001"
ZADD leaderboard:season_04 15800 "player:2004"
ZADD leaderboard:season_04 9400 "player:3005"

# Query Top 10 Elite Players with scores
ZREVRANGE leaderboard:season_04 0 9 WITHSCORES

# Fetch immediate neighbors of player:1001 (e.g. 1 rank above, 1 rank below)
ZREVRANK leaderboard:season_04 "player:1001"

# ==============================================================================
# 4. AUDIT & EVENT DISPATCH STREAM (Event-Driven Financial Journal)
# ==============================================================================
# Publish point mutation to durable Redis Stream for async relational database sync
XADD stream:gaming_events * event "XP_AWARDED" playerId "1001" xpGained 150 currentXP 12600 timestamp 1710073000000
```

---

## Key Concepts

### Capstone High-Throughput Gaming Engine Architecture
This capstone project synthesizes the breadth of Redis in-memory paradigms into an industrial-grade engine:
1. **API Gateway Ingress Defense**: The Sorted Set Sliding Window Rate Limiter intercepts and filters incoming transaction requests in real time, neutralizing traffic floods before primary storage is impacted.
2. **Memory-Dense Sub-Millisecond Profiles**: Player state leverages native `Hashes` with randomized TTL jitter, delivering sub-millisecond lookups while eliminating concurrent cache expirations (*Cache Avalanche*).
3. **Million-Scale Real-Time Leaderboards**: The `ZSET` competitive leaderboard calculates dynamic player ranks directly in RAM, bypassing slow relational disk sorting queries.
4. **Resilient Event Stream Hand-off**: Score mutations publish directly to `Redis Streams`, enabling asynchronous background worker pools to persist financial audit records durably into PostgreSQL.

---

---

## Beginner Friendly Explanation

Congratulations! You have constructed an ultra-high-speed backend engine worthy of a massive multiplayer online game or premier e-commerce platform.

From the gatekeeper turnstile repelling rogue bots (Rate Limiter), to lightning-fast player profile lookups (Hashes Cache), to a global leaderboard updating in real-time (ZSET Leaderboard), to a resilient message stream recording every player reward (Redis Streams)!

## Experiments

- Test the complete lifecycle: increment a player score in ZSET, update profile Hashes, and verify stream publication
- Simulate 10,000 requests per second across the rate limiter and observe sub-millisecond latencies
- Benchmark top-10 leaderboard reads in Redis versus a traditional relational SQL SELECT ... ORDER BY
- Inspect overall capstone memory allocations using the INFO memory command

---

## Challenge

Architect a multi-node Redlock distributed locking mechanism for player coin transfers: acquire locks across at least 3 of 5 independent Redis instances prior to mutating balances.

---

## Summary

Congratulations! You have mastered the comprehensive Redis continuum: Single-Threaded Event Loop, Strings, Hashes, Lists, Sets, Sorted Sets, HyperLogLog, Cache-Aside architectures, Stampede mitigation, Atomic Lua Scripts, Redis Streams, RDB/AOF durability, Sentinel HA, and a Unified Gaming Engine Capstone.
