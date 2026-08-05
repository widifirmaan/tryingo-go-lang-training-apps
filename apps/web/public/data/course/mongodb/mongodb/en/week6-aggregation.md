# Aggregation Pipeline

> MongoDB | Module 6

## Learning Objectives

- Understand aggregation pipeline
- Use $match, $group, $project
- Use $lookup for joins
- Create complex pipelines

---

## Program: Data Pipelines

```javascript
// Aggregation pipeline
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
      _id: "$userId",
      totalSpent: { $sum: "$amount" },
      orderCount: { $sum: 1 }
    }
  },
  { $sort: { totalSpent: -1 } }
])
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

Module 6 of 16: **Aggregation Pipeline**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Indexes & Performance**.
