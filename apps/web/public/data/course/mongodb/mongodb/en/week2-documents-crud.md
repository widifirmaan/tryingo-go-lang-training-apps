# Documents & CRUD Operations

> MongoDB | Module 2

## Learning Objectives

- Understand MongoDB document structure
- Perform insert, find, update, delete
- Understand ObjectId and data types
- Use batch operations

---

## Program: Basic Operations

```javascript
// Insert multiple documents
db.users.insertMany([
  { name: "Alice", email: "alice@example.com", age: 25 },
  { name: "Bob", email: "bob@example.com", age: 30 }
])

// Find with filter
db.users.find({ age: { $gte: 25 } })

// Update
db.users.updateOne(
  { name: "Alice" },
  { $set: { age: 26 } }
)

// Delete
db.users.deleteOne({ name: "Bob" })
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

Module 2 of 16: **Documents & CRUD Operations**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Querying Documents**.
