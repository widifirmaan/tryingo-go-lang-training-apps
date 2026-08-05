# JOINs & Relationships

> MySQL | Module 5

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

Module 5 of 16: **JOINs & Relationships**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **Aggregations & Group By**.
