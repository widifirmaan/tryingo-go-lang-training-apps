# Aggregations & Group By

> PostgreSQL | Module 6

## Learning Objectives

- Use COUNT, SUM, AVG, MIN, MAX
- Understand GROUP BY
- Use HAVING for group filtering
- Create aggregation reports

---

## Program: Analytics Queries

```sql
SELECT category_id, COUNT(*) as total_products,
       AVG(price) as avg_price,
       SUM(stock) as total_stock
FROM products
GROUP BY category_id
HAVING COUNT(*) > 5
ORDER BY avg_price DESC;
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

Module 6 of 16: **Aggregations & Group By**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **Subqueries & CTEs**.
