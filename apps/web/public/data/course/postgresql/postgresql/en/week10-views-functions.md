# Views & Functions

> PostgreSQL | Module 10

## Learning Objectives

- Create views for frequently used queries
- Create SQL functions
- Use stored procedures
- Understand materialized views

---

## Program: Stored Logic

```sql
CREATE VIEW active_users AS
SELECT id, name, email, created_at
FROM users
WHERE active = true;

CREATE FUNCTION get_user_order_count(p_user_id INTEGER)
RETURNS INTEGER AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM orders WHERE user_id = p_user_id);
END;
$$ LANGUAGE plpgsql;
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

Module 10 of 16: **Views & Functions**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **JSON & Document Queries**.
