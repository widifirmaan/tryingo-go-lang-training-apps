# Pub/Sub Messaging

> Redis | Module 9

## Learning Objectives

- Understand Pub/Sub model
- Use PUBLISH, SUBSCRIBE, UNSUBSCRIBE
- Understand pattern matching in subscriptions
- Build real-time notification system

---

## Program: Real-time Messaging

```redis
# Publish/Subscribe
# Terminal 1 - Subscribe
SUBSCRIBE notifications

# Terminal 2 - Publish
PUBLISH notifications "New user registered!"
PUBLISH notifications "Order #123 shipped"

# Pattern subscription
PSUBSCRIBE notifications:*

# Unsubscribe
UNSUBSCRIBE notifications
PUNSUBSCRIBE notifications:*
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

Module 9 of 16: **Pub/Sub Messaging**. Redis is a fast and flexible in-memory data store. Next week: **Transactions & Pipelining**.
