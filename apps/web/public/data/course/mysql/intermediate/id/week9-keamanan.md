# Keamanan & User Management

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 9:** Keamanan & User Management

## Tujuan Pembelajaran

- CREATE USER dan GRANT
- REVOKE privileges
- Role-based access
- SSL/TLS connection
- Backup dan restore

---

## Program: Keamanan Database

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

## Konsep Kunci

### User Management
Buat user dengan host spesifik.

### GRANT & REVOKE
Beri dan cabut privileges.

### Role
Kelompok privileges untuk assignment mudah.

### SSL
Koneksi encrypted ke database.

### Backup
mysqldump untuk logical backup.

---

## Eksperimen

- Row-level security
- Audit plugin
- Encrypted columns
- Password policy

---

## Tantangan

Setup keamanan: user, role, SSL, backup strategy.

---

## Ringkasan

Minggu 9 dari 10: **Keamanan & User Management** (Menengah).
