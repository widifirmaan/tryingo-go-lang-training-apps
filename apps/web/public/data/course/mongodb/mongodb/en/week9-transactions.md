# Multi-Document Transactions

> MongoDB | Module 9

## Learning Objectives

- Understand multi-document transactions
- Use startTransaction, commit, abort
- Understand write concerns
- Implement inter-account transfer

---

## Program: Data Integrity

```javascript
const session = client.startSession();

session.withTransaction(async () => {
  const accounts = db.collection("accounts");
  
  await accounts.updateOne(
    { _id: "account1" },
    { $inc: { balance: -500000 } },
    { session }
  );
  
  await accounts.updateOne(
    { _id: "account2" },
    { $inc: { balance: 500000 } },
    { session }
  );
});
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

Module 9 of 16: **Multi-Document Transactions**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Replica Sets & High Availability**.
