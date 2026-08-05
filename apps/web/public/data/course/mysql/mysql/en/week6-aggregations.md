# Aggregations & Group By

> MySQL | Module 6

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

Module 6 of 16: **Aggregations & Group By**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **Subqueries & CTEs**.
