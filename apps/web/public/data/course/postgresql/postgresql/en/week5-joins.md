# JOINs & Relationships

> PostgreSQL | Module 5

## Learning Objectives

- Understand INNER JOIN, LEFT JOIN, RIGHT JOIN
- Use JOIN for multi-table queries
- Understand self-join
- Use aliases for clarity

---

## Program: Multi-table Queries

```sql
SELECT o.id, u.name, o.total
FROM orders o
INNER JOIN users u ON o.user_id = u.id
LEFT JOIN payments p ON o.id = p.order_id
WHERE o.status = 'completed';
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

Module 5 of 16: **JOINs & Relationships**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **Aggregations & Group By**.
