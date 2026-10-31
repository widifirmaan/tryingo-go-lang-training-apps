# Security & User Management

> **Kategori:** MySQL | **Level:** Intermediate | **Minggu 9:** Security & User Management

## Learning Objectives

- CREATE USER and GRANT
- REVOKE privileges
- Role-based access
- SSL/TLS connections
- Backup and restore

---

## Program: User Management & Access Control

This program builds an access model: roles, granular rights, an audit trail, and least privilege.

```sql
-- Role model (real MySQL: CREATE ROLE 'analyst')
CREATE TABLE roles (
  role_id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_name TEXT NOT NULL,
  can_select TEXT, can_insert TEXT, can_update TEXT, can_delete TEXT
);
INSERT INTO roles VALUES
 (1, 'admin', '*', '*', '*', '*'),
 (2, 'analyst', 'employees,orders,products', NULL, NULL, NULL),
 (3, 'app_runtime', 'orders', 'orders', 'orders', NULL);

-- Users and their role mapping
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  role_id INTEGER NOT NULL REFERENCES roles(role_id)
);
INSERT INTO users (username, role_id) VALUES ('svc_erp', 3), ('budi_analyst', 2);

-- Audit trail: who did what
CREATE TABLE audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT, action TEXT, table_name TEXT, at TEXT
);
INSERT INTO audit_log VALUES (1, 'svc_erp', 'INSERT', 'orders', '2026-01-20 09:00');
INSERT INTO audit_log VALUES (2, 'budi_analyst', 'SELECT', 'employees', '2026-01-20 09:15');

-- Auditor: dangerous activity — deletes by non-admins
SELECT a.username, a.action, a.table_name
FROM audit_log a
JOIN users u ON u.username = a.username
JOIN roles r ON r.role_id = u.role_id
WHERE a.action = 'DELETE' AND r.role_name <> 'admin';

-- Activity overview per user
SELECT a.username, a.action, COUNT(*) AS total
FROM audit_log a GROUP BY a.username, a.action;
```

---

## Key Concepts

### GRANT granular

Di MySQL: GRANT SELECT, INSERT ON db.orders TO 'app'@'%' — scope bisa dibatasi per tabel, bahkan per kolom. Hindari hak ALL yang luas.

### Least privilege

Service account diberi hak minimal untuk jalur aplikasi, bukan admin. Bila akun bocor, dampaknya lebih kecil.

### Rotasi & audit

GRANT/REVOKE bersama audit_log mencatat: siapa, aksi apa, tabel mana, kapan. Gabungan ini wajib untuk kepatuhan (SOX, PCI-DSS).

### Anti SQL injection

Gunakan parameterized query (? / :param) di aplikasi; buang concatenation string yang membuka injeksi query.

---

## Experiments

- Add a new admin user and verify every grant via the roles JOIN.
- Log a budi_analyst DELETE action and ensure the detector catches it.
- Write a report: total actions per username per day.

---

## Challenge

Tighten the model: forbid analysts from querying the `salary` column — add a column-grant table and write its violation detector.

---

## Summary

This week's material has been covered: User Management & Access Control. Continue to the following week to deepen.
