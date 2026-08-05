# Backup & Restore

> MySQL | Module 13

## Learning Objectives

- Use mysqldump for backup
- Use mysql for restore
- Understand point-in-time recovery
- Set up automated backup

---

## Program: Data Protection

```sql
-- Backup
mysqldump -u root -p mydb > backup.sql

-- Restore
mysql -u root -p mydb < backup.sql

-- Backup with single transaction
mysqldump -u root -p --single-transaction mydb > backup.sql
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

Module 13 of 16: **Backup & Restore**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **Partitioning & Scaling**.
