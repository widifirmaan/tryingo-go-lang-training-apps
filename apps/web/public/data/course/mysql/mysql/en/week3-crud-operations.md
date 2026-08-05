# CRUD Operations

> MySQL | Module 3

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
SELECT * FROM users WHERE active = TRUE;

-- UPDATE
UPDATE users SET email = 'new@example.com' WHERE id = 1;

-- DELETE
DELETE FROM users WHERE id = 1;
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

Module 3 of 16: **CRUD Operations**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **Filtering & Sorting**.
