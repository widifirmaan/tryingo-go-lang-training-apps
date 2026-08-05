# Subqueries & CTEs

> MySQL | Module 7

## Learning Objectives

- Understand subqueries
- Use CTE (Common Table Expressions)
- Combine subqueries with JOINs
- Create layered queries

---

## Program: Complex Queries

```sql
WITH monthly_sales AS (
    SELECT DATE_FORMAT(created_at, '%Y-%m') as month,
           SUM(total) as revenue
    FROM orders
    GROUP BY DATE_FORMAT(created_at, '%Y-%m')
)
SELECT * FROM monthly_sales
WHERE revenue > 1000000;
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

Module 7 of 16: **Subqueries & CTEs**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **Indexing & Performance**.
