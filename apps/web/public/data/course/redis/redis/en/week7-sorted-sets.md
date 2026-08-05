# Sorted Sets & Rankings

> Redis | Module 7

## Learning Objectives

- Perform ZADD, ZRANGE, ZREVRANGE
- Understand ZSCORE and ZRANK
- Use ZUNIONSTORE and ZINTERSTORE
- Use ZREM to remove from sorted set

---

## Program: Ranking Operations

```redis
# Sorted set operations
ZADD leaderboard 100 "player1"
ZADD leaderboard 200 "player2"
ZADD leaderboard 150 "player3"

# Get all with scores
ZRANGE leaderboard 0 -1 WITHSCORES

# Get top 3
ZREVRANGE leaderboard 0 2 WITHSCORES

# Get score
ZSCORE leaderboard "player1"

# Get rank (0-based)
ZRANK leaderboard "player1"

# Count in range
ZCOUNT leaderboard 100 200

# Union of sorted sets
ZUNIONSTORE merged 2 leaderboard other_leaderboard
```

---

## Explanation

Redis is an in-memory data store used as a database, cache, and message broker.
Redis supports various data types: string, hash, list, set, and sorted set.
Redis also supports pub/sub messaging, Lua scripting, and clustering for scalability.

---

## Experiments

- Change the command above and see the results
- Try another data type and compare performance
- Try using Lua scripting for atomic operations

---

## Challenge

Build a simple application using this weeks concepts.
Run commands in redis-cli and verify the results.

---

## Summary

Module 7 of 16: **Sorted Sets & Rankings**. Redis is a fast and flexible in-memory data store. Next week: **Expiration & TTL**.
