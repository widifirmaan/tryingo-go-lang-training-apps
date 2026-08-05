# Data Modeling Patterns

> MongoDB | Module 8

## Learning Objectives

- Understand embedded documents pattern
- Understand referencing pattern
- Choose between embedded and referencing
- Design schema for real applications

---

## Program: Schema Design

```javascript
// Embedded document pattern
{
  _id: ObjectId("..."),
  name: "Alice",
  address: {
    street: "Jl. Merdeka No. 1",
    city: "Jakarta",
    country: "Indonesia"
  }
}

// Referencing pattern
{
  _id: ObjectId("..."),
  name: "Order #1",
  userId: ObjectId("..."),
  items: [
    { productId: ObjectId("..."), qty: 2 }
  ]
}
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

Module 8 of 16: **Data Modeling Patterns**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Multi-Document Transactions**.
