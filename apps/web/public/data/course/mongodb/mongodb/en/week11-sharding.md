# Sharding & Horizontal Scaling

> MongoDB | Module 11

## Learning Objectives

- Understand sharding concepts
- Configure shard keys
- Use mongos router
- Understand chunk migration

---

## Program: Scale Out

```javascript
// Enable sharding
sh.enableSharding("mydb")

// Shard a collection
sh.shardCollection(
  "mydb.users",
  { userId: "hashed" }
)

// Add shards
sh.addShard("replicaSet1/host1:27017")
```

---

## Explanation

MongoDB is a NoSQL document database that stores data in JSON-like documents.
MongoDB supports aggregation pipelines, advanced indexing, multi-document transactions, and sharding.
Use mongosh or MongoDB Compass to interact with the database.

---

## Experiments

- Change the query above and see the results
- Add a new document and try aggregation
- Try creating an index and analyze query performance

---

## Challenge

Build a database schema for a simple application using this weeks concepts.
Run queries and verify results in mongosh or MongoDB Compass.

---

## Summary

Module 11 of 16: **Sharding & Horizontal Scaling**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Change Streams & Events**.
