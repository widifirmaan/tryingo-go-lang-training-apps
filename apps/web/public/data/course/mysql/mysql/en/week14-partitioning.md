# Partitioning & Scaling

> MySQL | Module 14

## Learning Objectives

- Understand table partitioning
- Use range and list partitioning
- Optimize queries on large tables
- Understand tablespaces

---

## Program: Large Data

```sql
CREATE TABLE sales (
    id INT,
    sale_date DATE NOT NULL,
    amount DECIMAL(12, 2),
    PRIMARY KEY (id, sale_date)
) PARTITION BY RANGE (YEAR(sale_date)) (
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p2026 VALUES LESS THAN (2027)
);
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

Module 14 of 16: **Partitioning & Scaling**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **Stored Procedures & Triggers**.
