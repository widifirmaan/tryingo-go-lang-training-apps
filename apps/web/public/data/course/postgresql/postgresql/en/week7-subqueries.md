# Subqueries & CTEs

> PostgreSQL | Module 7

## Learning Objectives

- Understand subqueries
- Use CTE (Common Table Expressions)
- Combine subqueries with JOINs
- Create layered queries

---

## Program: Complex Queries

```sql
WITH monthly_sales AS (
    SELECT DATE_TRUNC('month', created_at) as month,
           SUM(total) as revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', created_at)
)
SELECT * FROM monthly_sales
WHERE revenue > 1000000;
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

Module 7 of 16: **Subqueries & CTEs**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **Indexing & Performance**.
