# Relational Modeling, DDL & Modern Data Types (UUID, JSONB)

> **Kategori:** PostgreSQL | **Level:** Relational Foundations & Advanced SQL | **Minggu 1:** Relational Modeling, DDL & Modern Data Types (UUID, JSONB)
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Design 3NF relational database schemas with UUID primary keys using gen_random_uuid()
- Enforce strict data integrity with CHECK, UNIQUE, NOT NULL, and foreign key cascade rules
- Leverage modern JSONB data types and query with JSON operators (->, ->>, @>)
- Understand financial precision NUMERIC types and timezone-aware TIMESTAMPTZ

---

## Program: E-Commerce Schema with UUIDv7, JSONB Metadata, and Constraint Validation

```sql
-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables for idempotent execution
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- 1. Customers table with generated UUID and check constraints
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    profile_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT email_format_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- 2. Products table with inventory check and numeric precision
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders table with status enum-like check
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (total_amount >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (status IN ('PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'CANCELLED')),
    shipping_address JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Order items table with composite uniqueness
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    quantity INT NOT NULL CHECK (quantity > 0),
    CONSTRAINT unique_order_product UNIQUE (order_id, product_id)
);

-- Insert sample records
INSERT INTO customers (email, full_name, profile_metadata) VALUES
('budi.santoso@example.com', 'Budi Santoso', '{"tier": "gold", "preferences": {"newsletter": true, "currency": "IDR"}}'::jsonb),
('siti.aminah@example.com', 'Siti Aminah', '{"tier": "silver", "preferences": {"newsletter": false, "currency": "IDR"}}'::jsonb);

INSERT INTO products (sku, title, price, stock_quantity, attributes) VALUES
('LAPTOP-X1', 'ThinkBook Ultra 14', 16500000.00, 25, '{"brand": "Lenovo", "specs": {"ram": "16GB", "ssd": "512GB"}}'::jsonb),
('MOUSE-WL', 'Precision Wireless Mouse', 350000.00, 100, '{"brand": "Logitech", "color": "Graphite", "dpi": 4000}'::jsonb);

-- Query using JSONB operator ->> to extract text fields
SELECT 
    c.full_name,
    c.email,
    c.profile_metadata->>'tier' AS customer_tier,
    c.profile_metadata->'preferences'->>'currency' AS preferred_currency
FROM customers c;
```

---

## Key Concepts

### Modern Relational Architecture and UUID vs Serial
In modern distributed systems, sequential serial integers (`1, 2, 3...`) carry significant risks: they expose business volume to ID enumeration attacks and cause collisions when merging data across multi-region nodes. PostgreSQL provides a native 128-bit `UUID` type that guarantees global uniqueness without centralized coordination. The `pgcrypto` extension enables `gen_random_uuid()` for fast, cryptographically secure key generation.

### Bulletproof Integrity through Database Constraints
PostgreSQL serves as the ultimate source of truth for business integrity. `CHECK` constraints validate critical business invariants directly at the storage level, such as regex validation for email formats `CHECK (email ~* '...')` and inventory sanity checks `CHECK (stock_quantity >= 0)`. Foreign keys configured with `ON DELETE RESTRICT` prevent orphaned records and protect financial referential integrity.

### Semi-Structured Flexibility with JSONB
The `JSONB` data type stores JSON documents in a decomposed binary format rather than raw strings. Operator `->>` extracts JSON properties as native text, while `->` preserves JSON objects. JSONB offers the perfect balance: relational ACID guarantees for structured columns, combined with schema-less agility for user preferences, dynamic e-commerce attributes, and webhook payloads.

---

---

## Beginner Friendly Explanation

Imagine a relational database as a bank's vault filing system. Structured columns like account numbers and balances require fixed precision (`NUMERIC`) so not a single cent is ever lost to floating-point rounding errors.

UUID is like an international passport number that is globally unique across the entire world. Meanwhile, `JSONB` is like a clear transparent pouch inside each folder—you can store flexible preferences like 'language choice' or 'theme mode' without having to rebuild the physical vault shelves.

## Experiments

- Insert an invalid email without an @ symbol and inspect PostgreSQL constraint violation error message
- Use the JSONB containment operator @> to search customers with IDR currency: profile_metadata @> '{"preferences": {"currency": "IDR"}}'
- Alter table products to add an inventory status column: active, discontinued, out_of_stock using a CHECK constraint
- Insert an order and attempt deleting its parent customer to verify ON DELETE RESTRICT in action

---

## Challenge

Design an `invoices` table schema referencing `orders`, featuring a structured `invoice_number` (e.g. INV-2026-000001), payment status, due date timestamp, and gateway transaction metadata stored as JSONB.

---

## Visual Mental Model & Architecture Flow

![Diagram Relasi Antar Tabel & SQL Joins](/diagrams/sql-joins.svg)

```diagram
┌────────────────────┐                 ┌────────────────────┐
│   TABLE: users     │                 │   TABLE: orders    │
├────────────────────┤                 ├────────────────────┤
│ id (PK: UUID)      │ ◄── Relasi 1-N ─┤ id (PK: UUID)      │
│ email (UNIQUE)     │                 │ user_id (FK -> PK) │
│ created_at         │                 │ total_amount       │
└────────────────────┘                 └────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `CREATE TABLE name ( col TYPE CONSTRAINT );`
- **Core Functionality:** Defines skema tabel relasional.
- **Parameters / Attributes:** `Nama tabel, definisi kolom, batasan (PK, FK, UNIQUE)`.
- **System Behavior & Return:** Menyiapkan tabel database dengan validasi tipe data presisi dan integritas data ACID..
- **Practical Code Example:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
- **Expected Execution Output:**
```output
Tabel users siap menerima baris data
```

### 2. `SELECT cols FROM tbl WHERE cond ORDER BY col LIMIT n;`
- **Core Functionality:** Query pembacaan dan penyaringan data.
- **Parameters / Attributes:** `Kolom list, Filter WHERE, Order, Limit`.
- **System Behavior & Return:** Retrieves rekaman data yang memenuhi kriteria pengujian secara efisien..
- **Practical Code Example:**
```sql
SELECT id, email FROM users WHERE created_at > NOW() - INTERVAL '7 days' ORDER BY created_at DESC LIMIT 10;
```
- **Expected Execution Output:**
```output
Mengembalikan 10 baris pengguna terbaru
```

### 3. `INSERT INTO tbl (cols) VALUES (vals) RETURNING id;`
- **Core Functionality:** Insertion of baris baru dengan pengembalian nilai instan.
- **Parameters / Attributes:** `Kolom target, data masukan, klausa RETURNING`.
- **System Behavior & Return:** Persists baris baru dan langsung mengembalikan nilai kolom yang digenerasi otomatis..
- **Practical Code Example:**
```sql
INSERT INTO users (email) VALUES ('alex@example.com') RETURNING id, created_at;
```
- **Expected Execution Output:**
```output
Mengembalikan ID UUID yang baru dibuat
```

### 4. `SELECT * FROM a INNER JOIN b ON a.id = b.a_id;`
- **Core Functionality:** Penggabungan relasi antar tabel (Join).
- **Parameters / Attributes:** `Nama tabel, kondisi pencocokan kunci relasi ON`.
- **System Behavior & Return:** Menggabungkan baris dari dua tabel berdasarkan relasi foreign key..
- **Practical Code Example:**
```sql
SELECT u.email, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;
```
- **Expected Execution Output:**
```output
Daftar transaksi pesanan beserta email pemilik akun
```

---

## Common Pitfalls & Debugging Tips

### 1. Sequential Table Scans on Large Tables
- **Symptom / Issue:** SELECT queries degrade in latency as table rows increase into millions.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Add B-Tree indexes on columns used in `WHERE`, `ORDER BY`, and `JOIN` clauses.

### 2. Missing Transactions for Multi-Step Operations
- **Symptom / Issue:** Leaves data in inconsistent partial states when middle operations fail.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always wrap operations in `BEGIN; ... COMMIT;` or `ROLLBACK;` blocks.

### 3. Using Inexact Floating Point for Currency
- **Symptom / Issue:** Floating point rounding errors corrupt financial accounting balances.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always use `NUMERIC(15, 2)` or `DECIMAL` for currency amounts.

---

## Summary

You have mastered modern relational schema design using UUID primary keys, database-level integrity constraints, financial NUMERIC precision, and flexible binary JSONB data types.
