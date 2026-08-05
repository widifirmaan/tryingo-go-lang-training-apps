# Expiration & TTL

> Redis | Module 8

## Learning Objectives

- Understand TTL and EXPIRE
- Use PERSIST to remove expiration
- Use SETEX for set with expiration
- Understand volatile TTL and data eviction

---

## Program: Time-Based Data

```redis
# Set expiration
SET temp "data" EX 60
SET temp2 "data2" PX 5000

# Check remaining TTL
TTL temp
PTTL temp2

# Remove expiration
PERSIST temp

# Set with NX (only if not exists)
SET lock:resource "locked" NX EX 30

# Set with XX (only if exists)
SET counter "updated" XX
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

Module 8 of 16: **Expiration & TTL**. Redis is a fast and flexible in-memory data store. Next week: **Pub/Sub Messaging**.
