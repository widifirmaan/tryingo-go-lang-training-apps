# Data Types & Schema Design

> MySQL | Module 2

## Learning Objectives

- Learn data types: INT, VARCHAR, TEXT, BOOLEAN, DATE, DATETIME
- Design efficient schemas
- Understand normalization (1NF, 2NF, 3NF)
- Create tables with constraints

---

## Program: Schema Design

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATE DEFAULT (CURRENT_DATE)
);

-- Normalization: separate categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
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

Module 2 of 16: **Data Types & Schema Design**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **CRUD Operations**.
