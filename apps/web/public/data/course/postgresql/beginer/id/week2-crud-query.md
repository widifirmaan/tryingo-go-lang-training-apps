## Kenapa Materi Ini Penting

PostgreSQL adalah database open source paling canggih: ACID penuh, JSON, indexing canggih, dan ekstensi luas. Perusahaan besar mengandalkan Postgres; SQL yang Anda pelajari bersifat portabel untuk semua relational databases.

Program latihan: *"Operasi Data Lengkap"*. Jalankan kode di Playground untuk mempelajari alur kerjanya.


## Tujuan Pembelajaran

- INSERT dengan RETURNING
- UPDATE dengan WHERE
- DELETE dengan WHERE
- Subquery di dalam query
- GROUP BY dengan HAVING

---

## Program: Operasi Data Lengkap

```sql
-- INSERT dengan RETURNING
INSERT INTO produk (nama, harga, stok, kategori) VALUES
    ('Webcam HD', 650000, 40, 'Aksesoris'),
    ('SSD 512GB', 950000, 35, 'Storage')
RETURNING *;

-- READ dengan kondisi
SELECT nama, harga FROM produk
    WHERE harga BETWEEN 500000 AND 3000000
    ORDER BY harga DESC;

SELECT kategori, COUNT(*) AS jumlah, AVG(harga) AS rata
    FROM produk GROUP BY kategori HAVING COUNT(*) >= 2;

-- UPDATE
UPDATE produk SET harga = harga * 0.9
    WHERE kategori = 'Aksesoris' RETURNING nama, harga;

UPDATE produk SET stok = stok - 5 WHERE nama = 'Laptop ASUS';

-- DELETE
DELETE FROM produk WHERE stok = 0;

-- Subquery
SELECT nama, harga FROM produk
    WHERE harga > (SELECT AVG(harga) FROM produk);

-- LIKE
SELECT * FROM produk WHERE nama LIKE '%Logitech%';
SELECT * FROM pelanggan WHERE kota ILIKE 'jakarta%';
```

---

## Konsep Kunci

### INSERT & RETURNING
RETURNING * mengembalikan baris yang baru dibuat.

### UPDATE
Ekspresi di SET: harga = harga * 0.9 untuk diskon.

### DELETE
Tanpa WHERE, semua baris terhapus!

### Subquery
Query di dalam tanda kurung.

### GROUP BY & HAVING
GROUP BY mengelompokkan, HAVING filter kelompok.

---

## Eksperimen

- INSERT multi-baris
- UPDATE dengan subquery
- ILIKE search
- Multiple GROUP BY

---

## Tantangan

Sistem inventory: update stok, hapus expired, laporan per kategori.

---

## Ringkasan

Minggu 2 dari 10: **CRUD & Query Lanjutan** (Pemula).
