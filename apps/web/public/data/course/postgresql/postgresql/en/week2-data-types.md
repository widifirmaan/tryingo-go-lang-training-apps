# Data Types & Schema Design

> PostgreSQL | Module 2

## Learning Objectives

- Learn data types: integer, varchar, text, boolean, date, timestamp
- Design efficient schemas
- Understand normalization (1NF, 2NF, 3NF)
- Create tables with constraints

---

## Program: Schema Design

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at DATE DEFAULT CURRENT_DATE
);

-- Normalization: separate categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
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

Module 2 of 16: **Data Types & Schema Design**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **CRUD Operations**.
