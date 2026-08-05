# Backup & Restore

> PostgreSQL | Module 13

## Learning Objectives

- Use pg_dump for backup
- Use pg_restore for restore
- Understand point-in-time recovery
- Set up automated backup

---

## Program: Data Protection

```sql
-- Backup
pg_dump -U postgres -d mydb -f backup.sql

-- Restore
psql -U postgres -d mydb -f backup.sql

-- Backup with format
pg_dump -U postgres -d mydb -Fc -f backup.dump
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

Module 13 of 16: **Backup & Restore**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **Partitioning & Scaling**.
