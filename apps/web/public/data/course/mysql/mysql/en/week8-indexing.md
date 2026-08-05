# Indexing & Performance

> MySQL | Module 8

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
EXPLAIN SELECT * FROM orders WHERE user_id = 1;
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

Module 8 of 16: **Indexing & Performance**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **Transactions & ACID**.
