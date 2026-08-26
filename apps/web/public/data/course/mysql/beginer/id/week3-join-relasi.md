# JOIN MySQL — Gabung Rak

> **Kategori:** MySQL | **Level:** Pemula | **Minggu 3:** JOIN & Relasi

## Tujuan Pembelajaran

- `FOREIGN KEY`, `INNER JOIN`, `LEFT JOIN`, `GROUP BY` — sama PostgreSQL

---

## Program

```sql
CREATE TABLE pesanan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pelanggan_id INT,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pelanggan_id) REFERENCES pelanggan(id)
);
SELECT pelanggan.nama, pesanan.total FROM pelanggan INNER JOIN pesanan ON pelanggan.id = pesanan.pelanggan_id;
SELECT pelanggan.nama, COUNT(pesanan.id) FROM pelanggan LEFT JOIN pesanan ON pelanggan.id = pesanan.pelanggan_id GROUP BY pelanggan.nama;
```

---

## Ringkasan

Minggu 3: **JOIN MySQL** — gabung rak jadi laporan.
