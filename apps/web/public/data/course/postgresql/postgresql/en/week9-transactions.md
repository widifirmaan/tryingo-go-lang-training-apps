# Transactions & ACID

> PostgreSQL | Module 9

## Learning Objectives

- Understand ACID properties
- Use BEGIN, COMMIT, ROLLBACK
- Understand isolation levels
- Implement inter-account transfer

---

## Program: Data Integrity

```sql
BEGIN;

UPDATE accounts SET balance = balance - 500000 WHERE id = 1;
UPDATE accounts SET balance = balance + 500000 WHERE id = 2;

COMMIT;
-- If error: ROLLBACK;
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

Module 9 of 16: **Transactions & ACID**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **Views & Functions**.
