# JOIN & Relasi Tabel

> **Kategori:** PostgreSQL | **Level:** Pemula | **Minggu 3:** JOIN & Relasi Tabel

## Tujuan Pembelajaran

- FOREIGN KEY dan referential integrity
- INNER JOIN
- LEFT JOIN
- Multi-JOIN 3+ tabel
- Agregasi dengan JOIN

---

## Program: Query Multi-Tabel

```sql
CREATE TABLE pesanan (
    id SERIAL PRIMARY KEY,
    pelanggan_id INTEGER REFERENCES pelanggan(id),
    tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending'
);

CREATE TABLE detail_pesanan (
    id SERIAL PRIMARY KEY,
    pesanan_id INTEGER REFERENCES pesanan(id),
    produk_id INTEGER REFERENCES produk(id),
    jumlah INTEGER NOT NULL,
    harga_satuan DECIMAL(10,2) NOT NULL
);

INSERT INTO pelanggan (nama, email, kota) VALUES ('Rudi', 'rudi@mail.com', 'Medan');
INSERT INTO pesanan (pelanggan_id, status) VALUES (1,'completed'),(2,'completed'),(1,'pending');
INSERT INTO detail_pesanan (pesanan_id, produk_id, jumlah, harga_satuan) VALUES
    (1,1,1,12500000),(1,2,2,350000),(2,3,1,850000),(3,4,1,2800000);

-- INNER JOIN
SELECT p.nama AS pelanggan, ps.tanggal, ps.status
    FROM pesanan ps INNER JOIN pelanggan p ON p.id = ps.pelanggan_id;

-- LEFT JOIN
SELECT p.nama, COALESCE(COUNT(ps.id),0) AS total
    FROM pelanggan p LEFT JOIN pesanan ps ON p.id = ps.pelanggan_id
    GROUP BY p.nama;

-- Multi-JOIN 3 tabel
SELECT p.nama AS pelanggan, pr.nama AS produk,
    dp.jumlah, dp.harga_satuan,
    (dp.jumlah * dp.harga_satuan) AS subtotal
    FROM detail_pesanan dp
    JOIN pesanan ps ON ps.id = dp.pesanan_id
    JOIN pelanggan p ON p.id = ps.pelanggan_id
    JOIN produk pr ON pr.id = dp.produk_id
    ORDER BY subtotal DESC;
```

---

## Konsep Kunci

### FOREIGN KEY
REFERENCES memastikan data terkait ada.

### INNER JOIN
Hanya baris yang cocok di kedua tabel.

### LEFT JOIN
Semua baris kiri muncul.

### Multi-JOIN
Chain JOIN ... ON ...

### Agregasi + JOIN
GROUP BY dengan JOIN untuk laporan.

---

## Eksperimen

- RIGHT JOIN
- FULL OUTER JOIN
- Self-join
- Revenue per kota

---

## Tantangan

Database e-commerce: top 5 pelanggan, produk terlaris, revenue bulanan.

---

## Ringkasan

Minggu 3 dari 10: **JOIN & Relasi Tabel** (Pemula).
