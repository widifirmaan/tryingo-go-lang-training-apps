# Introduction to MySQL & Setup

> MySQL | Module 1

## Learning Objectives

- Understand MySQL as the most popular open-source RDBMS
- Install MySQL and MySQL Workbench
- Understand relational database concepts
- Create your first database and table

---

## Program: Hello MySQL

```sql
-- Connect to MySQL
mysql -u root -p

-- Create a database
CREATE DATABASE mydb;
USE mydb;

-- Create a table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
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

Module 1 of 16: **Introduction to MySQL & Setup**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **Data Types & Schema Design**.
