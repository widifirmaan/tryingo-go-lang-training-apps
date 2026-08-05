# Introduction to MongoDB & Setup

> MongoDB | Module 1

## Learning Objectives

- Understand MongoDB as a NoSQL document database
- Install MongoDB and MongoDB Compass
- Understand documents and collections
- Create your first database and collection

---

## Program: Hello MongoDB

```javascript
// Connect to MongoDB
mongosh "mongodb://localhost:27017"

// Create a database and collection
use mydb
 db.createCollection("users")

// Insert a document
db.users.insertOne({
  name: "Budi",
  email: "budi@example.com",
  createdAt: new Date()
})

// Query all
db.users.find().pretty()
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

Module 1 of 16: **Introduction to MongoDB & Setup**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Documents & CRUD Operations**.
