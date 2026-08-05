# Change Streams & Events

> MongoDB | Module 12

## Learning Objectives

- Understand change streams
- Use watch() for real-time updates
- Filter change events
- Build real-time notification system

---

## Program: Real-time Data

```javascript
// Watch for changes
const changeStream = db.collection("users").watch([
  { $match: { "operationType": "insert" } }
])

changeStream.on("change", (change) => {
  console.log("New document:", change.fullDocument)
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

Module 12 of 16: **Change Streams & Events**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Security & Authentication**.
