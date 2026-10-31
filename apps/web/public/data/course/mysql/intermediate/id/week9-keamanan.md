# Keamanan & User Management

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 9:** Keamanan & User Management

## Tujuan Pembelajaran

- CREATE USER dan GRANT
- REVOKE privileges
- Role-based access
- SSL/TLS connection
- Backup dan restore

---

## Program: User Management & Access Control

Program ini membangun model akses: peran, hak granular, audit trail, dan prinsip least privilege.

```sql
-- Model peran (MySQL asli: CREATE ROLE 'analyst')
CREATE TABLE roles (
  role_id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_name TEXT NOT NULL,
  can_select TEXT, can_insert TEXT, can_update TEXT, can_delete TEXT
);
INSERT INTO roles VALUES
 (1, 'admin', '*', '*', '*', '*'),
 (2, 'analyst', 'employees,orders,products', NULL, NULL, NULL),
 (3, 'app_runtime', 'orders', 'orders', 'orders', NULL);

-- User & pemetaan perannya
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  role_id INTEGER NOT NULL REFERENCES roles(role_id)
);
INSERT INTO users (username, role_id) VALUES ('svc_erp', 3), ('budi_analyst', 2);

-- Audit trail: siapa melakukan apa
CREATE TABLE audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT, action TEXT, table_name TEXT, at TEXT
);
INSERT INTO audit_log VALUES (1, 'svc_erp', 'INSERT', 'orders', '2026-01-20 09:00');
INSERT INTO audit_log VALUES (2, 'budi_analyst', 'SELECT', 'employees', '2026-01-20 09:15');

-- Auditor: aktivitas berbahaya — hapus oleh non-admin
SELECT a.username, a.action, a.table_name
FROM audit_log a
JOIN users u ON u.username = a.username
JOIN roles r ON r.role_id = u.role_id
WHERE a.action = 'DELETE' AND r.role_name <> 'admin';

-- Ikhtisar aktivitas per user
SELECT a.username, a.action, COUNT(*) AS total
FROM audit_log a GROUP BY a.username, a.action;
```

---

## Konsep Kunci

### GRANT granular

Di MySQL: GRANT SELECT, INSERT ON db.orders TO 'app'@'%' — scope bisa dibatasi per tabel, bahkan per kolom. Hindari hak ALL yang luas.

### Least privilege

Service account diberi hak minimal untuk jalur aplikasi, bukan admin. Bila akun bocor, dampaknya lebih kecil.

### Rotasi & audit

GRANT/REVOKE bersama audit_log mencatat: siapa, aksi apa, tabel mana, kapan. Gabungan ini wajib untuk kepatuhan (SOX, PCI-DSS).

### Anti SQL injection

Gunakan parameterized query (? / :param) di aplikasi; buang concatenation string yang membuka injeksi query.

---

## Eksperimen

- Tambah user baru dengan peran admin lalu cek semua aksesnya lewat JOIN roles.
- Catat aksi DELETE budi_analyst ke audit_log dan pastikan query deteksi menangkapnya.
- Tulis report: total aksi per username per hari.

---

## Tantangan

Perketat model: larang analyst men-query kolom `salary` — tambahkan tabel can_select_column lalu tulis detektor pelanggaran kolomnya.

---

## Ringkasan

Materi minggu ini telah dibahas: User Management & Access Control. Lanjut ke pekan berikutnya untuk memperdalam.
