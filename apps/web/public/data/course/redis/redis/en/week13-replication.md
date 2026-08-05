# Replication & Sentinel

> Redis | Module 13

## Learning Objectives

- Understand Redis replication
- Configure master-replica setup
- Use Redis Sentinel for failover
- Understand read replicas and load balancing

---

## Program: High Availability

```redis
# Configure replication in redis.conf
# replicaof <masterip> <masterport>

# Check replication info
INFO replication

# Sentinel configuration
# sentinel monitor mymaster <masterip> <masterport> 2
# sentinel down-after-milliseconds mymaster 5000
# sentinel failover-timeout mymaster 10000

# Check sentinel
SENTINEL get-master-addr-by-name mymaster
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

Module 13 of 16: **Replication & Sentinel**. Redis is a fast and flexible in-memory data store. Next week: **Clustering & Scaling**.
