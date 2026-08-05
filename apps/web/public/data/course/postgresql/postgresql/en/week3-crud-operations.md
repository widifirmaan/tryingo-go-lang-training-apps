# CRUD Operations

> PostgreSQL | Module 3

## Learning Objectives

- Perform INSERT, SELECT, UPDATE, DELETE
- Understand WHERE clause
- Use LIMIT and OFFSET
- Understand LIKE and IN operators

---

## Program: Basic Queries

```sql
-- INSERT
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');

-- SELECT
SELECT * FROM users WHERE active = true;

-- UPDATE
UPDATE users SET email = 'new@example.com' WHERE id = 1;

-- DELETE
DELETE FROM users WHERE id = 1;
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

Module 3 of 16: **CRUD Operations**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **Filtering & Sorting**.
