# JSON Data Type

> MySQL | Module 11

## Learning Objectives

- Store JSON data in MySQL
- Use JSON_EXTRACT, JSON_SET functions
- Query JSON data
- Understand when to use JSON vs relational

---

## Program: Flexible Data

```sql
INSERT INTO products (name, metadata)
VALUES ('Laptop', '{"brand": "Dell", "ram": "16GB", "ssd": "512GB"}');

SELECT name, JSON_EXTRACT(metadata, '$.brand') as brand
FROM products
WHERE JSON_EXTRACT(metadata, '$.ram') = '16GB';
```

---

## Explanation

MySQL is the most popular open-source relational database in the world.
MySQL supports JSON, advanced indexing, stored procedures, and triggers.
Use the mysql client or MySQL Workbench to interact with the database.

---

## Experiments

- Change the query above and see the results
- Add a new table and create a relationship
- Try using EXPLAIN for query analysis

---

## Challenge

Build a database schema for a simple application using this weeks concepts.
Run queries and verify results in mysql client or MySQL Workbench.

---

## Summary

Module 11 of 16: **JSON Data Type**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **Security & Access Control**.
