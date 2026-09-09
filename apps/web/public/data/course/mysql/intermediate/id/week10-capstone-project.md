# Capstone: E-Commerce Database — Gudang Warung Grand Opening

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 10:** Capstone: E-Commerce Database
> **Prasyarat:** Minggu 9 — **Keamanan**.

## Tujuan Pembelajaran

- Gabung W1-W9: `AUTO_INCREMENT` + `FK` + `INDEX` + `TRANSACTION` + `VIEW` + `TRIGGER` jadi gudang toko online produksi

---

## Kenapa Ini Penting Buat Kamu?

9 minggu terpisah — capstone buktikan gabung: gudang yang cepat (index), aman (transaksi + user), terpantau. Ini portfolio "MySQL production-ready".

---

## Program: Gudang Toko Lengkap (Checklist)

```sql
-- 1. Rak + tali (W1-W3)
CREATE TABLE kategori (id INT AUTO_INCREMENT PRIMARY KEY, nama VARCHAR(50)) ENGINE=InnoDB;
CREATE TABLE produk (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kategori_id INT,
  nama VARCHAR(100) NOT NULL,
  harga INT NOT NULL CHECK (harga > 0),
  stok INT DEFAULT 0,
  FOREIGN KEY (kategori_id) REFERENCES kategori(id)
) ENGINE=InnoDB;

-- 2. Index (W4+W7)
CREATE INDEX idx_kategori ON produk(kategori_id);
CREATE INDEX idx_nama ON produk(nama);

-- 3. User secukupnya (W9)
CREATE USER 'kasir'@'localhost' IDENTIFIED BY 'Kasir#2026!';
GRANT SELECT, INSERT, UPDATE ON warung.produk TO 'kasir'@'localhost';

-- 4. Laporan VIEW (baca gampang)
CREATE VIEW laporan AS
SELECT k.nama AS kategori, COUNT(*) AS jml, SUM(p.harga * p.stok) AS nilai
FROM produk p JOIN kategori k ON p.kategori_id = k.id
GROUP BY k.nama;

-- 5. Transaksi jual aman (W6)
START TRANSACTION;
UPDATE produk SET stok = stok - 2 WHERE id = 1 AND stok >= 2;
INSERT INTO pesanan (produk_id, qty) VALUES (1, 2);
COMMIT;

-- 6. Cek cepat (W7)
EXPLAIN SELECT * FROM produk WHERE kategori_id = 1;
```

**Tugas capstone:** File `warung.sql` lengkap + `mysqldump` backup + `EXPLAIN` 3 query (`ref`, bukan `ALL`) + screenshot `SHOW GRANTS`.

---

## Konsep Kunci

### Capstone = Gabung 9 Minggu
Rak + tali + index + transaksi + user + view = produksi.

---

## Penjelasan untuk Pemula

### Analogi: Grand Opening Gudang
- **W1-W4 fondasi** + **W6-W9 mesin** = gudang. **W10 = buka**.

### 3 Istilah Wajib
1. **VIEW/mysqldump**: jendela/cadangan

---

## Tantangan

**Grand Opening:** Semua checklist + `mysqldump warung > backup.sql` + hapus DB + `restore` dari backup + data kembali! **Selesai MySQL 0→Ahli!** 🎉

---

## Glosarium Mini

- **VIEW/mysqldump**: jendela/cadangan

---

## Ringkasan

Minggu 10 dari 10: **Grand Opening** (Level: Menengah). **Selesai MySQL 0→Ahli dari nol!** 🎉
