# Introduction to Redis & Setup

> Redis | Module 1

## Learning Objectives

- Understand Redis as an in-memory data store
- Install Redis and Redis CLI
- Understand key-value store concepts
- Run Redis and perform first SET/GET

---

## Program: Hello Redis

```redis
# Connect to Redis
redis-cli

# Set and Get
SET mykey "Hello, Redis!"
GET mykey

# Set with expiration
SET session:abc123 "user_data" EX 3600

# Check type
TYPE mykey

# Delete
DEL mykey
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

Module 1 of 16: **Introduction to Redis & Setup**. Redis is a fast and flexible in-memory data store. Next week: **Data Types Overview**.
