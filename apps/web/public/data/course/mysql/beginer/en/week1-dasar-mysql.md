# MySQL Basics & Tables

> **Kategori:** MySQL | **Level:** Beginner | **Minggu 1:** MySQL Basics & Tables

## Learning Objectives

- Understand MySQL architecture
- Create databases and tables
- AUTO_INCREMENT primary key
- Understand constraints
- Run basic SELECT queries

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Database Client** (`cweijan.vscode-mysql-client2`): Database viewer, query runner, and MySQL table manager

Or install all recommended extensions at once via terminal:
```bash
code --install-extension cweijan.vscode-mysql-client2
```

---

### 2. Runtime & Dependency Installation (MySQL 8.0 (via Docker / Native))
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
docker run -d --name mysql-dev -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=devdb -v mysqldata:/var/lib/mysql mysql:8.0
```

**macOS (Terminal / Homebrew):**
```bash
brew install mysql && brew services start mysql
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install -y mysql-server
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
docker exec -it mysql-dev mysql -u root -psecret -e "SELECT VERSION();"
```

Expected output:
```output
8.0.xx
```

> 💡 **Prerequisite Note:** Docker encapsulates MySQL cleanly without installing heavy background host services.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
docker exec -it mysql-dev mysql -u root -psecret devdb
```
- **Details:** Opens interactive MySQL terminal prompt attached to devdb.
- **Navigate to the project directory:**
```bash
# Terhubung ke MySQL CLI
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
SHOW TABLES;
```
Open in browser or terminal: `localhost:3306`

> ℹ️ Lists all registered database tables.

**Initial Entry File (`schema.sql`):**
```sql
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO products (name, price, stock) 
VALUES ('Mechanical Keyboard', 89.99, 15);

SELECT * FROM products WHERE price < 100;
```
MySQL InnoDB table definition with modern utf8mb4 charset.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
database/
├── schema.sql           # Definisi DDL tabel
├── seed.sql             # Data awal
└── my.cnf               # Konfigurasi tuning MySQL
```
MySQL database project layout.

---

### 6. Beginner Tips & Best Practices
- Always use `utf8mb4` charset to guarantee complete emoji and unicode character support.
- Use `DECIMAL(10, 2)` for monetary values to avoid binary floating-point precision errors.

---

## Program: Creating Database & Tables

```sql
CREATE DATABASE toko_db;
USE toko_db;

CREATE TABLE produk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    harga DECIMAL(10,2) NOT NULL,
    stok INT DEFAULT 0,
    kategori VARCHAR(50),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pelanggan (
    id INT AUTO_INCREMENT PRIMARY KEY,
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

### MySQL Architecture
Popular open-source RDBMS for web applications.

### Data Types
INT, DECIMAL, VARCHAR, TEXT, BOOLEAN, TIMESTAMP, ENUM.

### AUTO_INCREMENT
MySQL uses AUTO_INCREMENT for auto primary keys.

### Constraints
PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT, FOREIGN KEY.

### Basic Queries
SELECT with WHERE and aggregates.

---

## Experiments

- ALTER TABLE add column
- Foreign key
- ENUM type
- INSERT IGNORE

---

## Challenge

Library database: books, members, loans.

---

## Summary

Week 1 of 10: **MySQL Basics & Tables** (Beginner).
