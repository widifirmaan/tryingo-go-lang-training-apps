# Filtering & Sorting

> MySQL | Module 4

## Learning Objectives

- Use ORDER BY for sorting
- Understand WHERE with AND, OR, NOT
- Use BETWEEN and IS NULL
- Create efficient filtering queries

---

## Program: Advanced Queries

```sql
SELECT * FROM orders
WHERE total > 100000
  AND status = 'completed'
  AND created_at BETWEEN '2025-01-01' AND '2025-12-31'
ORDER BY created_at DESC
LIMIT 10;
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

Module 4 of 16: **Filtering & Sorting**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **JOINs & Relationships**.
