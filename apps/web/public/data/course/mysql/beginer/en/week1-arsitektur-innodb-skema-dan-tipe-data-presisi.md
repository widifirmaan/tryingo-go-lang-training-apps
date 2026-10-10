# InnoDB Engine Architecture, Schema & Precision Data Types

> **Kategori:** MySQL | **Level:** Relational Foundations & InnoDB Engine | **Minggu 1:** InnoDB Engine Architecture, Schema & Precision Data Types
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand MySQL internal storage architecture: InnoDB vs MyISAM
- Configure sql_mode STRICT_TRANS_TABLES to prevent dangerous silent truncation bugs
- Design high-throughput Clustered Index primary keys (BIGINT UNSIGNED vs UUID)
- Enforce DECIMAL currency precision and configure full utf8mb4 unicode collation

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

## Program: Financial Digital Wallet Schema with InnoDB Engine and Strict Constraints

```sql
-- Set strict SQL mode to prevent silent truncation and implicit conversions
SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION,ONLY_FULL_GROUP_BY';

-- 1. Create clean database schema
CREATE DATABASE IF NOT EXISTS finwallet CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE finwallet;

-- Drop tables in reverse foreign key order
DROP TABLE IF EXISTS wallet_ledgers;
DROP TABLE IF EXISTS user_wallets;
DROP TABLE IF EXISTS app_users;

-- 2. Users table using BIGINT UNSIGNED for massive scale
CREATE TABLE app_users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    uuid CHAR(36) NOT NULL,
    email VARCHAR(191) NOT NULL, -- 191 chars for utf8mb4 index safety in older engines
    full_name VARCHAR(100) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_uuid (uuid),
    UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Wallets table with DECIMAL financial precision
CREATE TABLE user_wallets (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'IDR',
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    locked_balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    version INT UNSIGNED NOT NULL DEFAULT 1, -- For optimistic locking
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_user_currency (user_id, currency),
    CONSTRAINT fk_wallet_user FOREIGN KEY (user_id) 
        REFERENCES app_users(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT chk_positive_balance CHECK (balance >= 0.00),
    CONSTRAINT chk_positive_locked CHECK (locked_balance >= 0.00)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample records
INSERT INTO app_users (uuid, email, full_name) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'ahmad.rizky@example.com', 'Ahmad Rizky Pratama'),
('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'dina.lestari@example.com', 'Dina Lestari');

INSERT INTO user_wallets (user_id, currency, balance) VALUES
(1, 'IDR', 5000000.00),
(2, 'IDR', 12500000.00);

-- Query with strict collation verification
SELECT u.id, u.uuid, u.email, w.currency, w.balance, w.updated_at
FROM app_users u
INNER JOIN user_wallets w ON u.id = w.user_id;
```

---

## Key Concepts

### InnoDB Storage Engine Architecture
Since MySQL 5.5, **InnoDB** serves as the default storage engine providing full ACID compliance. InnoDB implements a **Clustered Index** architecture: actual table data rows are physically embedded directly within the leaf nodes of the primary key B+Tree. Selecting a sequential primary key (such as `BIGINT UNSIGNED AUTO_INCREMENT`) ensures append-only write patterns, completely avoiding expensive physical disk page splits.

### Strict SQL Modes vs Silent Truncation
Historically, default MySQL installations exhibited dangerous silent data truncations when payloads exceeded column specifications. Enforcing `sql_mode = 'STRICT_TRANS_TABLES'` instructs the parser to fail transactions immediately with hard exceptions whenever type invariants or column constraints are breached.

### DECIMAL Precision vs Floating-Point and utf8mb4 Collation
- **DECIMAL(15, 2)**: Employs exact fixed-point binary representation. Essential for monetary ledgers, tax computations, and asset valuation to eliminate floating-point rounding errors.
- **utf8mb4**: True 4-byte UTF-8 encoding accommodating modern emojis and complex Asian character sets. Requires indexing considerations (maximum 191 characters for default 767-byte prefix limits in older tables).

---

---

## Beginner Friendly Explanation

Imagine an InnoDB table like a luxury hotel directory. Room numbers (`101, 102, 103`) serve as the Primary Key. Because rooms are physically sequential, front desk staff can march straight to the correct door in seconds.

The `DECIMAL` data type is like a meticulous bank teller counting physical pennies down to the exact fraction, eliminating rounding approximations. Meanwhile, `utf8mb4` guarantees that user profiles featuring flag emojis or Japanese characters display cleanly without mutating into garbled question marks (????).

## Experiments

- Attempt inserting a negative balance into user_wallets and verify rejection by the CHECK constraint
- Insert emoji characters into full_name and verify seamless storage enabled by utf8mb4
- Benchmark table footprint and write latency between UUID primary keys versus BIGINT AUTO_INCREMENT
- Compare empty sql_mode versus STRICT_TRANS_TABLES behavior when inserting 250 characters into a VARCHAR(100)

---

## Challenge

Build a `currency_exchange_rates` table featuring currency pairs (`base_currency`, `quote_currency`), exchange rate value with `DECIMAL(18, 8)`, and microsecond timestamp `DATETIME(6)`.

---

## Visual Mental Model & Architecture Flow

![Diagram Relasi Relasional & Eksekusi Query Joins](/diagrams/sql-joins.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ MESIN PENYIMPANAN INNODB MYSQL                           │
│                                                          │
│ SQL Parser & Optimizer ──► Buffer Pool (RAM Cache)       │
│                                  │                       │
│                 ┌────────────────┴────────────────┐      │
│                 ▼                                 ▼      │
│     Clustered Index (B+ Tree)              Redo Log WAL  │
│     (Data tersimpan berurut PK)            (Crash Safe)  │
│                 │                                 │      │
│                 ▼                                 ▼      │
│            Tabel .ibd Disk               Binlog (Replika)│
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `CREATE TABLE name ( id INT AUTO_INCREMENT PRIMARY KEY, ... )`
- **Core Functionality:** Definisi tabel mesin penyimpanan InnoDB.
- **Parameters / Attributes:** `Column types (INT, VARCHAR, DECIMAL), Constraints`.
- **System Behavior & Return:** Menyusun skema tabel MySQL berkinerja tinggi dengan indeks kunci utama berurut otomatis..
- **Practical Code Example:**
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(50) NOT NULL UNIQUE,
  price DECIMAL(12, 2) NOT NULL,
  in_stock BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;
```
- **Expected Execution Output:**
```output
Tabel products InnoDB siap digunakan
```

### 2. `SELECT * FROM tbl WHERE cond LIMIT offset, count`
- **Core Functionality:** Paginasi data efisien MySQL.
- **Parameters / Attributes:** `LIMIT offset, row_count`.
- **System Behavior & Return:** Retrieves potongan data per halaman untuk optimasi waktu muat aplikasi..
- **Practical Code Example:**
```sql
SELECT id, sku, price FROM products WHERE in_stock = 1 ORDER BY id DESC LIMIT 0, 10;
```
- **Expected Execution Output:**
```output
10 produk pertama untuk halaman 1
```

### 3. `START TRANSACTION; ... COMMIT; / ROLLBACK;`
- **Core Functionality:** Kontrol transaksi ACID multi-tahap.
- **Parameters / Attributes:** `ACID guarantees`.
- **System Behavior & Return:** Memastikan serangkaian operasi query berhasil seluruhnya atau dibatalkan saat ada kesalahan..
- **Practical Code Example:**
```sql
START TRANSACTION;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;
```
- **Expected Execution Output:**
```output
Saldo berhasil dipindahkan secara atomik
```

### 4. `EXPLAIN SELECT ...`
- **Core Functionality:** Analisis rencana eksekusi query (Query Plan).
- **Parameters / Attributes:** `Query SELECT`.
- **System Behavior & Return:** Memeriksa apakah query memanfaatkan indeks (Using index) atau mengalami Full Table Scan lambat..
- **Practical Code Example:**
```sql
EXPLAIN SELECT * FROM products WHERE sku = 'LAP-001';
```
- **Expected Execution Output:**
```output
Menampilkan estimasi baris dan indeks yang digunakan
```

---

## Common Pitfalls & Debugging Tips

### 1. Legacy `utf8` Instead of `utf8mb4`
- **Symptom / Issue:** Throws `Incorrect string value` when saving 4-byte Unicode characters (emojis).
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Set default database and table character set to `utf8mb4` with `utf8mb4_unicode_ci`.

### 2. TIMESTAMP 2038 Boundary & Timezone Shifts
- **Symptom / Issue:** Epoch overflow bugs on older tables or unexpected timezone conversions.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Store UTC explicitly or choose `DATETIME` for timezone-neutral timestamps.

### 3. Failing to Batch Inserts
- **Symptom / Issue:** Per-row autocommit causes massive disk write bottlenecks on large imports.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Wrap batch imports in a single `START TRANSACTION; ... COMMIT;` block.

---

## Summary

You have mastered InnoDB engine fundamentals, sequential Clustered Indexing mechanics, STRICT sql_mode governance, and DECIMAL / utf8mb4 precision.
