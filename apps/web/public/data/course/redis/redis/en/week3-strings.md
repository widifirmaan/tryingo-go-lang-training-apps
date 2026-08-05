# Strings & Binary Safe Data

> Redis | Module 3

## Learning Objectives

- Perform SET, GET, MSET, MGET
- Understand string operations
- Use INCR, DECR for counters
- Use APPEND and STRLEN

---

## Program: String Operations

```redis
# Basic string operations
SET counter 0
GET counter

# Increment counter
INCR counter
INCR counter
GET counter

# Decrement
DECR counter

# Append to string
SET message "Hello"
APPEND message " World"
GET message

# Get string length
STRLEN message

# Multiple set/get
MSET name1 "Alice" name2 "Bob"
MGET name1 name2
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

Module 3 of 16: **Strings & Binary Safe Data**. Redis is a fast and flexible in-memory data store. Next week: **Hashes**.
