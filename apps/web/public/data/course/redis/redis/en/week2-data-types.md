# Data Types Overview

> Redis | Module 2

## Learning Objectives

- Learn Redis basic data types
- Understand string, hash, list, set, sorted set
- Use TYPE and KEYS commands
- Understand TTL and data expiration

---

## Program: Key-Value Basics

```redis
# List all keys
KEYS *

# Check type of a key
TYPE mykey

# Get all string keys
KEYS string:*

# Get all hash keys
KEYS hash:*

# Memory usage
MEMORY USAGE mykey
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

Module 2 of 16: **Data Types Overview**. Redis is a fast and flexible in-memory data store. Next week: **Strings & Binary Safe Data**.
