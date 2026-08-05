# Indexes & Performance

> MongoDB | Module 7

## Learning Objectives

- Understand B-tree indexes in MongoDB
- Create indexes on frequently queried fields
- Understand compound indexes
- Analyze queries with explain()

---

## Program: Query Optimization

```javascript
// Create index
db.users.createIndex({ email: 1 }, { unique: true })

// Compound index
db.orders.createIndex({ userId: 1, createdAt: -1 })

// Analyze query
db.users.find({ email: "alice@example.com" }).explain("executionStats")
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

Module 7 of 16: **Indexes & Performance**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Data Modeling Patterns**.
