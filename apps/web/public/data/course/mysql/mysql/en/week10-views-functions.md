# Views & Functions

> MySQL | Module 10

## Learning Objectives

- Create views for frequently used queries
- Create SQL functions
- Use stored procedures
- Understand triggers

---

## Program: Stored Logic

```sql
CREATE VIEW active_users AS
SELECT id, name, email, created_at
FROM users
WHERE active = TRUE;

DELIMITER //
CREATE FUNCTION get_user_order_count(p_user_id INT)
RETURNS INT
BEGIN
    DECLARE cnt INT;
    SELECT COUNT(*) INTO cnt FROM orders WHERE user_id = p_user_id;
    RETURN cnt;
END //
DELIMITER ;
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

Module 10 of 16: **Views & Functions**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **JSON Data Type**.
