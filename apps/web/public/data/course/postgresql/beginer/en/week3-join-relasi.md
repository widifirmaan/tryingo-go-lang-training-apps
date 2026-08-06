# JOINs & Table Relations

> **Kategori:** PostgreSQL | **Level:** Beginner | **Minggu 3:** JOINs & Table Relations

## Learning Objectives

- FOREIGN KEY integrity
- INNER JOIN
- LEFT JOIN
- Multi-JOIN 3+ tables
- Aggregation with JOIN

---

## Program: Multi-Table Queries

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

## Key Concepts

### FOREIGN KEY
REFERENCES ensures related data exists.

### INNER JOIN
Only matching rows.

### LEFT JOIN
All left rows appear.

### Multi-JOIN
Chain JOIN ... ON ...

### Aggregation + JOIN
GROUP BY with JOIN.

---

## Experiments

- RIGHT JOIN
- FULL OUTER JOIN
- Self-join
- Revenue per city

---

## Challenge

E-commerce DB: top 5 customers, best-sellers, monthly revenue.

---

## Summary

Week 3 of 10: **JOINs & Table Relations** (Beginner).
