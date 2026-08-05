# Replica Sets & High Availability

> MongoDB | Module 10

## Learning Objectives

- Understand replica sets
- Configure primary and secondary nodes
- Understand read preferences
- Configure automatic failover

---

## Program: Replication

```javascript
// Replica set configuration
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "node1:27017", priority: 2 },
    { _id: 1, host: "node2:27017", priority: 1 },
    { _id: 2, host: "node3:27017", priority: 1, arbiterOnly: true }
  ]
})

// Read from secondary
 db.users.find().readPref("secondaryPreferred")
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

Module 10 of 16: **Replica Sets & High Availability**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Sharding & Horizontal Scaling**.
