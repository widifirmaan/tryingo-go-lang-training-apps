# JSON & Document Queries

> PostgreSQL | Module 11

## Learning Objectives

- Store JSON data in PostgreSQL
- Use JSON operators (->, ->>, #>)
- Query JSON data
- Understand when to use JSON vs relational

---

## Program: Flexible Data

```sql
INSERT INTO products (name, metadata)
VALUES ('Laptop', '{"brand": "Dell", "ram": "16GB", "ssd": "512GB"}');

SELECT name, metadata->>'brand' as brand
FROM products
WHERE metadata->>'ram' = '16GB';
```

---

## Explanation

PostgreSQL is an open-source relational database that supports standard SQL and advanced features.
PostgreSQL supports JSON, advanced indexing, ACID transactions, and extensions like PostGIS.
Use psql to interact with the database from the command line.

---

## Experiments

- Change the query above and see the results
- Add a new table and create a relationship
- Try using EXPLAIN for query analysis

---

## Challenge

Build a database schema for a simple application using this weeks concepts.
Run queries and verify results in psql or pgAdmin.

---

## Summary

Module 11 of 16: **JSON & Document Queries**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **Security & Roles**.
