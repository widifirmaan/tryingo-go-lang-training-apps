# Hashes

> Redis | Module 4

## Learning Objectives

- Create hashes with HSET, HGET
- Use HMSET and HMGET
- Understand HGETALL and HKEYS
- Use HINCRBY for atomic increment

---

## Program: Hash Operations

```redis
# Hash operations
HSET user:1001 name "Alice" email "alice@example.com" age 25

# Get single field
HGET user:1001 name

# Get all fields
HGETALL user:1001

# Get all field names
HKEYS user:1001

# Get all values
HVALS user:1001

# Increment hash field
HINCRBY user:1001 age 1

# Check field exists
HEXISTS user:1001 email
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

Module 4 of 16: **Hashes**. Redis is a fast and flexible in-memory data store. Next week: **Lists & Stack/Queue**.
