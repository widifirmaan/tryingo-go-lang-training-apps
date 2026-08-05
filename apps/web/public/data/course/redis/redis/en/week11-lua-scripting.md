# Lua Scripting

> Redis | Module 11

## Learning Objectives

- Understand Lua scripting in Redis
- Use EVAL and EVALSHA
- Understand KEYS and ARGV
- Implement atomic operations with Lua

---

## Program: Server-Side Scripts

```redis
# Lua script
EVAL "return redis.call('GET', KEYS[1])" 1 mykey

# Script with arguments
EVAL "local current = tonumber(redis.call('GET', KEYS[1]) or '0'); redis.call('SET', KEYS[1], current + tonumber(ARGV[1])); return current + tonumber(ARGV[1])" 1 counter 10

# Store and reuse script
SCRIPT LOAD "return redis.call('GET', KEYS[1])"
SCRIPT EXIST <sha1>
SCRIPT FLUSH
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

Module 11 of 16: **Lua Scripting**. Redis is a fast and flexible in-memory data store. Next week: **Persistence & RDB/AOF**.
