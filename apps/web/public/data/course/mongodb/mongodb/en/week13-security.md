# Security & Authentication

> MongoDB | Module 13

## Learning Objectives

- Create users and roles
- Grant CRUD privileges
- Understand role-based access control
- Enable authentication

---

## Program: Access Control

```javascript
// Create user with roles
db.createUser({
  user: "app_user",
  pwd: "secure_password",
  roles: [
    { role: "readWrite", db: "mydb" }
  ]
})

// Create custom role
db.createRole({
  role: "readOnly",
  privileges: [{
    resource: { db: "mydb", collection: "" },
    actions: ["find"]
  }],
  roles: []
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

Module 13 of 16: **Security & Authentication**. MongoDB is a flexible and scalable NoSQL document database. Next week: **Backup & Restore**.
