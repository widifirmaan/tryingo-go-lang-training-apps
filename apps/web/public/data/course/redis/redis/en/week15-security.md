# Security & ACL

> Redis | Module 15

## Learning Objectives

- Understand Redis ACL
- Configure user authentication
- Grant command permissions
- Use TLS for encrypted connections

---

## Program: Access Control

```redis
# ACL configuration
ACL SETUSER admin on >mypassword ~* +@all
ACL SETUSER readonly on >readonlypass ~* +@read

# List users
ACL LIST

# Test authentication
AUTH admin mypassword

# Enable ACL in redis.conf
# requirepass <master-password>
# user default on ><password> ~* +@all

# TLS configuration
# tls-port 6379
# tls-cert-file redis.crt
# tls-key-file redis.key
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

Module 15 of 16: **Security & ACL**. Redis is a fast and flexible in-memory data store. Next week: **Capstone: Real-time Leaderboard**.
