# Stored Procedures & Triggers

> MySQL | Module 15

## Learning Objectives

- Create stored procedures
- Create triggers for automation
- Use events scheduler
- Understand cursors and looping

---

## Program: Automation

```sql
DELIMITER //
CREATE PROCEDURE update_stock(IN p_product_id INT, IN p_quantity INT)
BEGIN
    UPDATE products SET stock = stock - p_quantity
    WHERE id = p_product_id AND stock >= p_quantity;
END //
DELIMITER ;

-- Trigger example
CREATE TRIGGER after_order_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products SET stock = stock - NEW.quantity
    WHERE id = NEW.product_id;
END;
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

Module 15 of 16: **Stored Procedures & Triggers**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **Capstone: E-commerce Database**.
