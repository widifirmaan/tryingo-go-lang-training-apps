# Security & Roles

> PostgreSQL | Module 12

## Learning Objectives

- Create users and roles
- Grant and revoke permissions
- Understand row-level security
- Implement schema isolation

---

## Program: Access Control

```sql
CREATE ROLE app_readonly WITH LOGIN PASSWORD 'secure_pass';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;
REVOKE INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM app_readonly;
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

Module 12 of 16: **Security & Roles**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **Backup & Restore**.
