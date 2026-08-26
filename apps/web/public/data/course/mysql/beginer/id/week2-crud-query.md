# CRUD MySQL — Isi, Lihat, Ubah, Hapus

> **Kategori:** MySQL | **Level:** Pemula | **Minggu 2:** CRUD & Query

## Tujuan Pembelajaran

- `INSERT/SELECT/UPDATE/DELETE` sama, `LIMIT`, `LIKE`, `BETWEEN` — MySQL identik

---

## Program

```sql
SELECT * FROM produk WHERE stok > 5 ORDER BY harga DESC LIMIT 2;
SELECT * FROM produk WHERE nama LIKE '%ber%';
UPDATE produk SET harga = 6000 WHERE nama = 'Bayam';
DELETE FROM produk WHERE stok = 0;
ALTER TABLE produk ADD COLUMN diskon INT DEFAULT 0;
```

**Hati-hati:** `UPDATE/DELETE` tanpa `WHERE` = semua! Cek `SELECT` dulu.

---

## Ringkasan

Minggu 2: **CRUD MySQL** — sama gudang, beda merk. Minggu depan: **JOIN**.
