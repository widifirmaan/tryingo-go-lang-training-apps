# Projections & Sorting

> MongoDB | Module 4

## Learning Objectives

- Use projection for efficiency
- Use sort() for ordering
- Use limit() and skip() for pagination
- Understand basic query optimization

---

## Program: Data Selection

```javascript
// Projection - select specific fields
db.users.find(
  { active: true },
  { name: 1, email: 1, _id: 0 }
)

// Sort and paginate
db.users.find()
  .sort({ createdAt: -1 })
  .skip(10)
  .limit(10)
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

Module 4 of 16: **Projections & Sorting**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Query Operators**.
