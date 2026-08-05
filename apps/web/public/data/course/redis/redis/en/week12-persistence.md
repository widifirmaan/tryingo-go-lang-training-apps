# Persistence & RDB/AOF

> Redis | Module 12

## Learning Objectives

- Understand RDB persistence
- Use BGSAVE for background save
- Understand AOF persistence
- Configure hybrid RDB+AOF for durability

---

## Program: Data Durability

```redis
# Save RDB snapshot
SAVE
BGSAVE

# Check last save time
LASTSAVE

# Configure RDB in redis.conf
# save 900 1
# save 300 10
# save 60 10000

# Enable AOF
# appendonly yes
# appendfilename "appendonly.aof"
# appendfsync everysec

# Check persistence info
INFO persistence
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

Module 12 of 16: **Persistence & RDB/AOF**. Redis is a fast and flexible in-memory data store. Next week: **Replication & Sentinel**.
