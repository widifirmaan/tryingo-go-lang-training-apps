# Transactions & ACID

> MySQL | Module 9

## Learning Objectives

- Understand ACID properties
- Use START TRANSACTION, COMMIT, ROLLBACK
- Understand isolation levels
- Implement inter-account transfer

---

## Program: Data Integrity

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 500000 WHERE id = 1;
UPDATE accounts SET balance = balance + 500000 WHERE id = 2;

COMMIT;
-- If error: ROLLBACK;
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

Module 9 of 16: **Transactions & ACID**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **Views & Functions**.
