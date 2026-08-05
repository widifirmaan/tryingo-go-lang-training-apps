# Security & Access Control

> MySQL | Module 12

## Learning Objectives

- Create users and roles
- Grant and revoke permissions
- Understand row-level security
- Implement schema isolation

---

## Program: Access Control

```sql
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_pass';
GRANT SELECT ON mydb.* TO 'app_user'@'localhost';
REVOKE INSERT, UPDATE, DELETE ON mydb.* FROM 'app_user'@'localhost';
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

Module 12 of 16: **Security & Access Control**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **Backup & Restore**.
