# Capstone: E-Commerce Database

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 10:** Capstone: E-Commerce Database

## Tujuan Pembelajaran

- Schema production-ready
- JSONB untuk atribut fleksibel
- Trigger auto-update
- Materialized View dashboard
- Window functions

---

## Program: Database Production-Ready

```sql
-- CAPSTONE: E-Commerce Database

CREATE TABLE categories (
    id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, slug VARCHAR(100) UNIQUE
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    name VARCHAR(200) NOT NULL, sku VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(12,2) NOT NULL, stock INTEGER DEFAULT 0,
    attributes JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL, city VARCHAR(50)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    status VARCHAR(20) DEFAULT 'pending',
    total DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL, unit_price DECIMAL(12,2) NOT NULL
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_products_attrs ON products USING GIN (attributes);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_timestamp
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE VIEW v_sales_report AS
SELECT c.name AS category, COUNT(DISTINCT o.id) AS total_orders,
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
JOIN categories c ON c.id = p.category_id
JOIN orders o ON o.id = oi.order_id
WHERE o.status = 'completed'
GROUP BY c.name;

CREATE MATERIALIZED VIEW mv_dashboard AS
SELECT
    (SELECT COUNT(*) FROM products) AS total_products,
    (SELECT COUNT(*) FROM customers) AS total_customers,
    (SELECT COALESCE(SUM(total),0) FROM orders WHERE status='completed') AS revenue;
```

---

## Konsep Kunci

### Schema Design
Relasi antar tabel dengan foreign key.

### JSONB
Atribut produk fleksibel.

### Trigger
Auto-update updated_at.

### Materialized View
Dashboard dengan data agregat.

### Window Functions
Ranking produk per kategori.

---

## Eksperimen

- Soft delete
- Full-text search
- Partitioning
- Audit log

---

## Tantangan

Deploy database e-commerce lengkap.

---

## Ringkasan

Minggu 10 dari 10: **Capstone: E-Commerce DB** (Menengah). Selesai!
