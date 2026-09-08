# Keamanan — Gembok Gudang MySQL

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 9:** Keamanan & User Management

## Tujuan Pembelajaran

- `CREATE USER 'kasir'@'localhost' IDENTIFIED BY '...'`, `GRANT SELECT, INSERT ON warung.produk` secukupnya (sumber: dev.mysql.com/doc/refman/8.0/en/privileges)
- Jangan root untuk app! `REVOKE` cabut, `mysql_secure_installation` awal

---

## Kenapa Ini Penting Buat Kamu?

App pakai `root` + SQL injection → hacker `DROP DATABASE` (root bisa semua!). Dengan user `kasir` (hanya SELECT/INSERT produk), jebol pun tidak bisa hapus. 90% jebol = password lemah + root.

---

## Program: Kunci Warung MySQL

```sql
-- 1. Amankan awal (jawab Y semua!)
-- mysql_secure_installation

-- 2. User secukupnya (prinsip least privilege!)
CREATE USER 'kasir'@'localhost' IDENTIFIED BY 'Kasir#2026!';
GRANT SELECT, INSERT ON warung.produk TO 'kasir'@'localhost';

CREATE USER 'lapor'@'%' IDENTIFIED BY 'Lapor#2026!';
GRANT SELECT ON warung.* TO 'lapor'@'%';

-- 3. Cabut jika perlu
REVOKE INSERT ON warung.produk FROM 'kasir'@'localhost';
DROP USER 'lapor'@'%';

-- 4. Cek siapa bisa apa
SHOW GRANTS FOR 'kasir'@'localhost';

-- 5. Test: login sebagai kasir
-- mysql -u kasir -p
-- DROP TABLE produk;  → ERROR 1142 (ditolak! bagus)
-- SELECT * FROM produk; → bisa
```

---

## Konsep Kunci

### `GRANT ... ON db.tabel` = Kunci Ruangan
`SELECT, INSERT ON warung.produk` — hanya 2 aksi, 1 tabel. Bukan `ALL`!

### Jangan `root` untuk App
`root` hanya manusia darurat. App = user khusus secukupnya.

### `mysql_secure_installation` = Gembok Awal
Hapus anonymous, matikan root remote, buang test DB.

---

## Penjelasan untuk Pemula

### Analogi: Kunci Kamar Kos
- **root = kunci master**: pegang pemilik.
- **kasir = kunci kamar**: buka kamarnya saja.
- **GRANT = tukang kunci**: ukir secukupnya.

### Langkah 0 — Siapkan Device
- MySQL lokal + akses root awal.

### Cara Komputer Membaca
1. Login `kasir` → MySQL cek `mysql.user` + `db` privileges.
2. `DROP` → tidak ada privilege → `ERROR 1142`.

### 3 Istilah Wajib
1. **GRANT/REVOKE**: beri/cabut
2. **Least privilege**: secukupnya

---

## Eksperimen

- **Hijau:** `SHOW GRANTS` kasir → hanya 2?
- **Kuning:** `GRANT ALL` ke `coba` → bisa DROP? (Jangan di produksi!) `REVOKE` + `DROP USER`.
- **Merah:** Password `123` → `crack` 1 detik? Ganti 12+ acak.

---

### Bonus: Backup & Restore (gembok + cadangan = aman beneran!)

```bash
mysqldump -u root -p warung > backup.sql       # CADANGKAN (teks SQL semua!)
mysql -u root -p warung_baru < backup.sql      # RESTORE ke DB baru
```
- Latihan wajib: backup → `DROP DATABASE warung;` → buat baru → restore → data kembali! Tanpa ini, gembok kuat tapi kebakaran tetap hilang semua.

---

## Tantangan

**Gudang Tergembok:** 3 user (`kasir` SELECT/INSERT produk, `lapor` SELECT semua, `admin` ALL) + buktikan `kasir` DROP ditolak + `SHOW GRANTS` 3 screenshot.

---

## Glosarium Mini

- **GRANT/REVOKE/privilege**: beri/cabut/izin

---

## Ringkasan

Minggu 9 dari 10: **Gembok Gudang** (Level: Menengah). Secukupnya. Minggu depan: **Capstone**.
