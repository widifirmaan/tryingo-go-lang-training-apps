# Transactions & Pipelining

> Redis | Module 10

## Learning Objectives

- Understand MULTI, EXEC, DISCARD
- Use WATCH for optimistic locking
- Understand pipelining for performance
- Implement atomic counter with transactions

---

## Program: Atomic Operations

```redis
# Transaction
MULTI
SET user:1001 "Alice"
INCR counter
SET user:1002 "Bob"
EXEC

# Watch for optimistic locking
WATCH balance:account1
MULTI
DECRBY balance:account1 500000
INCRBY balance:account2 500000
EXEC

# Pipeline for performance
PING
PING
PING
PING
PING
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

Module 10 of 16: **Transactions & Pipelining**. Redis is a fast and flexible in-memory data store. Next week: **Lua Scripting**.
