# Sets & Unique Collections

> Redis | Module 6

## Learning Objectives

- Perform SADD, SREM, SMEMBERS
- Understand SINTER, SUNION, SDIFF
- Use SISMEMBER for membership test
- Use SRANDMEMBER for random selection

---

## Program: Set Operations

```redis
# Set operations
SADD tags:post1 "javascript" "web" "frontend"
SADD tags:post2 "javascript" "backend" "api"

# Get all members
SMEMBERS tags:post1

# Set intersection
SINTER tags:post1 tags:post2

# Set union
SUNION tags:post1 tags:post2

# Set difference
SDIFF tags:post1 tags:post2

# Check membership
SISMEMBER tags:post1 "javascript"

# Random member
SRANDMEMBER tags:post1 2
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

Module 6 of 16: **Sets & Unique Collections**. Redis is a fast and flexible in-memory data store. Next week: **Sorted Sets & Rankings**.
