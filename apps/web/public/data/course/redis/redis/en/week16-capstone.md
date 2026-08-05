# Capstone: Real-time Leaderboard

> Redis | Module 16

## Learning Objectives

- Design a Real-time Leaderboard
- Combine all Redis concepts
- Optimize for high performance
- Prepare Redis deployment

---

## Program: Full Project

```redis
# Real-time Leaderboard with Redis
# Features:
# - ZADD for score updates
# - ZREVRANGE for top players
# - ZRANK for player position
# - Pub/Sub for live updates
# - Expiration for session management
# - Lua scripts for atomic score updates
# - Persistence for data durability
# - Cluster for horizontal scaling
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

Module 16 of 16: **Capstone: Real-time Leaderboard**. Redis is a fast and flexible in-memory data store. Next week: **Complete! 🎉**.
