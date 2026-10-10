# Security & User Management

> **Kategori:** MySQL | **Level:** Intermediate | **Minggu 9:** Security & User Management

## Learning Objectives

- CREATE USER and GRANT
- REVOKE privileges
- Role-based access
- SSL/TLS connections
- Backup and restore

---

## Program: Database Security

```sql
-- User management
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'strong_password';
CREATE USER 'readonly_user'@'%' IDENTIFIED BY 'readonly_pass';

-- Grant privileges
GRANT SELECT, INSERT, UPDATE ON toko_db.produk TO 'app_user'@'localhost';
GRANT SELECT ON toko_db.* TO 'readonly_user'@'%';

-- Revoke
REVOKE UPDATE ON toko_db.produk FROM 'app_user'@'localhost';

-- Lihat grants
SHOW GRANTS FOR 'app_user'@'localhost';

-- Role (MySQL 8.0+)
CREATE ROLE 'app_read', 'app_write';
GRANT SELECT ON toko_db.* TO 'app_read';
GRANT INSERT, UPDATE ON toko_db.* TO 'app_write';
GRANT 'app_read', 'app_write' TO 'app_user'@'localhost';
SET DEFAULT ROLE ALL TO 'app_user'@'localhost';

-- SSL/TLS
-- REQUIRE SSL pada user
ALTER USER 'app_user'@'localhost' REQUIRE SSL;

-- Audit: cek login gagal
SELECT user, host, account_locked
    FROM mysql.user WHERE account_locked = 'Y';

-- Backup
-- mysqldump -u root -p toko_db > backup.sql

-- Restore
-- mysql -u root -p toko_db < backup.sql
```

---

## Key Concepts

### User Management
Create users with specific hosts.

### GRANT & REVOKE
Grant and revoke privileges.

### Roles
Privilege groups for easy assignment.

### SSL
Encrypted database connections.

### Backup
mysqldump for logical backup.

---

## Experiments

- Row-level security
- Audit plugin
- Encrypted columns
- Password policy

---

## Challenge

Setup security: users, roles, SSL, backup strategy.

---

## Summary

Week 9 of 10: **Security & User Management** (Intermediate).
