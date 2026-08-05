# Partitioning & Scaling

> PostgreSQL | Module 14

## Learning Objectives

- Understand table partitioning
- Use range and list partitioning
- Optimize queries on large tables
- Understand tablespaces

---

## Program: Large Data

```sql
CREATE TABLE sales (
    id SERIAL,
    sale_date DATE NOT NULL,
    amount DECIMAL(12, 2),
    PRIMARY KEY (id, sale_date)
) PARTITION BY RANGE (sale_date);

CREATE TABLE sales_2025 PARTITION OF sales
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
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

Module 14 of 16: **Partitioning & Scaling**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **Extensions & Tools**.
