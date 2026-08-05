# Querying Documents

> MongoDB | Module 3

## Learning Objectives

- Write basic queries with find()
- Use filter operators
- Use projection to select fields
- Understand query execution plan

---

## Program: Read Operations

```javascript
// Basic find
db.users.find({ active: true })

// Filter with operators
db.users.find({ age: { $gte: 21, $lte: 30 } })

// Regex search
db.users.find({ name: /^A/ })

// Text search
db.users.find({ $text: { $search: "Alice" } })
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

Module 3 of 16: **Querying Documents**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Projections & Sorting**.
