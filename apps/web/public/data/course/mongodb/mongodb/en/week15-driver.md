# Node.js Driver & Integration

> MongoDB | Module 15

## Learning Objectives

- Install MongoDB Node.js driver
- Connect to MongoDB
- Perform CRUD via driver
- Use connection pooling

---

## Program: App Integration

```javascript
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

async function main() {
  await client.connect();
  const db = client.db("mydb");
  const users = db.collection("users");
  
  // Insert
  await users.insertOne({ name: "Alice", email: "alice@example.com" });
  
  // Find
  const user = await users.findOne({ name: "Alice" });
  console.log(user);
  
  await client.close();
}

main();
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

Module 15 of 16: **Node.js Driver & Integration**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Capstone: Blog API with MongoDB**.
