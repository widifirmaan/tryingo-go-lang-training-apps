# Indexing & Performance

> PostgreSQL | Module 8

## Learning Objectives

- Understand B-tree indexes
- Create indexes on frequently queried columns
- Understand covering indexes
- Analyze queries with EXPLAIN

---

## Program: Query Optimization

```sql
-- Create index
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Analyze query
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 1;
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

Module 8 of 16: **Indexing & Performance**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **Transactions & ACID**.
