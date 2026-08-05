# Backup & Restore

> MongoDB | Module 14

## Learning Objectives

- Use mongodump for backup
- Use mongorestore for restore
- Understand point-in-time backup
- Set up automated backup

---

## Program: Data Protection

```javascript
// Backup
mongodump --uri="mongodb://localhost:27017/mydb" --out=./backup

// Restore
mongorestore --uri="mongodb://localhost:27017" ./backup/mydb

// Backup with compression
mongodump --uri="mongodb://localhost:27017/mydb" --gzip --out=./backup
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

Module 14 of 16: **Backup & Restore**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Node.js Driver & Integration**.
