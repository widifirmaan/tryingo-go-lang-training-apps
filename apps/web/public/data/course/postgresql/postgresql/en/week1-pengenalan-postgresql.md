# Introduction to PostgreSQL & Setup

> PostgreSQL | Module 1

## Learning Objectives

- Understand PostgreSQL as an open-source RDBMS
- Install PostgreSQL and pgAdmin
- Understand relational database concepts
- Create your first database and table

---

## Program: Hello PostgreSQL

```sql
-- Connect to PostgreSQL
psql -U postgres -d mydb

-- Create a table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (name, email) VALUES ('Budi', 'budi@example.com');

-- Query all
SELECT * FROM users;
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

Module 1 of 16: **Introduction to PostgreSQL & Setup**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **Data Types & Schema Design**.
