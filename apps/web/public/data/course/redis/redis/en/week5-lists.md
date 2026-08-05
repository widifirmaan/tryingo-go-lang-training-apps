# Lists & Stack/Queue

> Redis | Module 5

## Learning Objectives

- Perform LPUSH, RPUSH, LRANGE
- Understand LPOP, RPOP for stack/queue
- Use LINSERT for insert before/after
- Use LREM to remove elements

---

## Program: List Operations

```redis
# List operations (as queue)
LPUSH queue:task "task1"
LPUSH queue:task "task2"
LPUSH queue:task "task3"

# Pop from right (FIFO)
RPOP queue:task

# Get range
LRANGE queue:task 0 -1

# List length
LLEN queue:task

# Get element by index
LINDEX queue:task 0

# Insert before/after
LINSERT queue:task BEFORE "task2" "task1.5"
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

Module 5 of 16: **Lists & Stack/Queue**. Redis is a fast and flexible in-memory data store. Next week: **Sets & Unique Collections**.
