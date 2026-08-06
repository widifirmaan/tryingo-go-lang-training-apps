# Capstone: E-Commerce Database

> **Kategori:** MySQL | **Level:** Intermediate | **Minggu 10:** Capstone: E-Commerce Database

## Learning Objectives

- Production-ready schema
- ENUM type
- JSON column
- Auto-update trigger
- Views for reports

---

## Program: Production-Ready Database

```sql
-- CAPSTONE: E-Commerce MySQL Database

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(200) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    stock INT DEFAULT 0,
    attributes JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    INDEX idx_category (category_id),
    INDEX idx_sku (sku)
);

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    city VARCHAR(50)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    status ENUM('pending','paid','shipped','completed','cancelled') DEFAULT 'pending',
    total DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    INDEX idx_customer (customer_id),
    INDEX idx_status (status)
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

DELIMITER //
CREATE TRIGGER trg_update_stock
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products SET stock = stock - NEW.quantity WHERE id = NEW.product_id;
END //
DELIMITER ;

CREATE VIEW v_sales_report AS
SELECT c.name AS category, COUNT(DISTINCT o.id) AS total_orders,
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
JOIN categories c ON c.id = p.category_id
JOIN orders o ON o.id = oi.order_id
WHERE o.status = 'completed'
GROUP BY c.name;
```

---

## Key Concepts

### Schema Design
Table relations with foreign keys.

### ENUM
Choice data type: order status.

### JSON
Flexible product attributes.

### Triggers
Auto-update stock after order.

### Views
Sales reports per category.

---

## Experiments

- Partitioning
- Full-text search
- Soft delete
- Audit log

---

## Challenge

Deploy complete MySQL e-commerce database.

---

## Summary

Week 10 of 10: **Capstone: E-Commerce DB** (Intermediate). Complete!
