# Query Operators

> MongoDB | Module 5

## Learning Objectives

- Use $gt, $lt, $gte, $lte operators
- Use $in, $nin, $ne operators
- Use $and, $or, $not operators
- Use regex and text search

---

## Program: Advanced Queries

```javascript
// Compound conditions
db.users.find({
  $and: [
    { age: { $gte: 21 } },
    { status: "active" }
  ]
})

// $in operator
db.users.find({ name: { $in: ["Alice", "Bob"] } })

// $or operator
db.users.find({
  $or: [
    { role: "admin" },
    { role: "moderator" }
  ]
})
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

Module 5 of 16: **Query Operators**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Aggregation Pipeline**.
