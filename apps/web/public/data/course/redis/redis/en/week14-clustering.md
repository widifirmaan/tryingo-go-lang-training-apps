# Clustering & Scaling

> Redis | Module 14

## Learning Objectives

- Understand Redis Cluster
- Configure slot distribution
- Use redis-cli for cluster management
- Understand hash tags for key distribution

---

## Program: Distributed Redis

```redis
# Create cluster
redis-cli --cluster create   127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002   127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005   --cluster-replicas 1

# Check cluster info
redis-cli -c CLUSTER INFO

# Check nodes
redis-cli -c CLUSTER NODES

# Add slots to node
redis-cli -c CLUSTER ADDSLOTS 0 1 2 3
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

Module 14 of 16: **Clustering & Scaling**. Redis is a fast and flexible in-memory data store. Next week: **Security & ACL**.
