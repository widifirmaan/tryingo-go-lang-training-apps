# Filtering & Sorting

> PostgreSQL | Module 4

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

Module 4 of 16: **Filtering & Sorting**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **JOINs & Relationships**.
