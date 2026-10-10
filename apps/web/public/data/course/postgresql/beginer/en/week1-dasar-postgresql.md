# PostgreSQL Basics & Tables

> **Kategori:** PostgreSQL | **Level:** Beginner | **Minggu 1:** PostgreSQL Basics & Tables

## Learning Objectives

- Understand PostgreSQL architecture
- Create databases and tables
- Use SERIAL/BIGSERIAL
- Understand constraints
- Run basic SELECT queries

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **PostgreSQL Management** (`ckolkman.vscode-postgres`): Run SQL queries, inspect tables, and manage Postgres connections

Or install all recommended extensions at once via terminal:
```bash
code --install-extension ckolkman.vscode-postgres
```

---

### 2. Runtime & Dependency Installation (PostgreSQL 16 (via Docker / Native))
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
docker run -d --name pg-dev -p 5432:5432 -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=devdb -v pgdata:/var/lib/postgresql/data postgres:16-alpine
```

**macOS (Terminal / Homebrew):**
```bash
brew install postgresql@16 && brew services start postgresql@16
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install -y postgresql postgresql-contrib
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
docker exec -it pg-dev psql -U postgres -d devdb -c "SELECT version();"
```

Expected output:
```output
PostgreSQL 16.x ...
```

> 💡 **Prerequisite Note:** Running PostgreSQL via Docker provides the cleanest local setup with zero host pollution.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
docker exec -it pg-dev psql -U postgres -d devdb
```
- **Details:** Launches the interactive psql terminal to execute DDL and DML queries.
- **Navigate to the project directory:**
```bash
# Siap di terminal psql
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
SELECT * FROM users;
```
Open in browser or terminal: `localhost:5432`

> ℹ️ Tabular query output prints directly in the psql console.

**Initial Entry File (`schema.sql`):**
```sql
-- Buat tabel dengan UUID dan JSONB
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Masukkan data uji
INSERT INTO users (name, email, preferences) 
VALUES ('John Coder', 'john@example.com', '{"theme": "dark", "newsletter": true}');

-- Query dengan operator JSONB
SELECT id, name, preferences->>'theme' AS selected_theme FROM users;
```
SQL schema illustrating native PostgreSQL JSONB indexing.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
database/
├── migrations/
│   ├── 001_create_users.sql
│   └── 002_create_orders.sql
├── seeds/
│   └── 001_seed_dev_data.sql
└── docker-compose.yml
```
Structured layout for SQL schema migrations and seed scripts.

---

### 6. Beginner Tips & Best Practices
- Use `\dt` in psql to list all tables and `\d table_name` to inspect column structures.
- Run `EXPLAIN ANALYZE SELECT ...` to profile query execution plans and index utilization.

---

## Program: Creating Database & Tables

```sql
-- Membuat database & tabel
CREATE DATABASE toko_db;

CREATE TABLE produk (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    harga DECIMAL(10,2) NOT NULL,
    stok INTEGER DEFAULT 0,
    kategori VARCHAR(50),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pelanggan (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    kota VARCHAR(50),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO produk (nama, harga, stok, kategori) VALUES
    ('Laptop ASUS', 12500000, 15, 'Elektronik'),
    ('Mouse Logitech', 350000, 50, 'Aksesoris'),
    ('Keyboard Mechanical', 850000, 30, 'Aksesoris'),
    ('Monitor LG', 2800000, 20, 'Elektronik'),
    ('Headset Sony', 1200000, 25, 'Audio');

INSERT INTO pelanggan (nama, email, kota) VALUES
    ('Budi Santoso', 'budi@email.com', 'Jakarta'),
    ('Siti Rahayu', 'siti@email.com', 'Bandung'),
    ('Ahmad Wijaya', 'ahmad@email.com', 'Surabaya'),
    ('Dewi Lestari', 'dewi@email.com', 'Yogyakarta');

SELECT * FROM produk;
SELECT nama, harga FROM produk WHERE kategori = 'Elektronik';
SELECT COUNT(*) AS total_produk FROM produk;
SELECT AVG(harga) AS rata_harga FROM produk;
```

---

## Key Concepts

### PostgreSQL Architecture
Open-source RDBMS supporting ACID.

### Data Types
INTEGER, DECIMAL, VARCHAR, TEXT, BOOLEAN, TIMESTAMP.

### Constraints
PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT.

### Basic Queries
SELECT with WHERE and aggregates.

---

## Experiments

- Add column with ALTER TABLE
- Create FOREIGN KEY
- Try ARRAY type
- RETURNING id

---

## Challenge

Build a library database: books, members, loans.

---

## Summary

Week 1 of 10: **PostgreSQL Basics & Tables** (Beginner).
