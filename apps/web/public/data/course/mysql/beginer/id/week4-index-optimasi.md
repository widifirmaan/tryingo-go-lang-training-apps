# Index & Optimasi Query

> **Kategori:** MySQL | **Level:** Pemula | **Minggu 4:** Index & Optimasi Query

## Tujuan Pembelajaran

- B-tree index di MySQL
- EXPLAIN untuk query plan
- Multi-column index
- Index cardinality
- Trade-off index

---

## Program: Performa Database

```sql
CREATE TABLE transaksi (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pelanggan_id INT NOT NULL,
    produk_id INT NOT NULL,
    jumlah INT NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    tanggal DATE NOT NULL,
    metode_bayar VARCHAR(20),
    INDEX idx_pelanggan (pelanggan_id),
    INDEX idx_tanggal (tanggal)
);

EXPLAIN SELECT * FROM transaksi WHERE pelanggan_id = 42;

CREATE INDEX idx_tanggal_bayar ON transaksi(tanggal, metode_bayar);

EXPLAIN SELECT * FROM transaksi
    WHERE tanggal BETWEEN '2024-01-01' AND '2024-06-30'
    AND metode_bayar = 'transfer';

SELECT COUNT(*) AS total_rows,
    COUNT(DISTINCT pelanggan_id) AS unique_pelanggan
    FROM transaksi;

SHOW INDEX FROM transaksi;
```

---

## Konsep Kunci

### B-tree Index
Default index MySQL (InnoDB). Mempercepat pencarian.

### EXPLAIN
Menunjukkan execution plan MySQL.

### Multi-Column Index
Index pada multiple kolom. Leftmost prefix rule.

### Cardinality
Unik values dalam index. Semakin tinggi semakin efektif.

### Trade-off
Index cepat SELECT, lambat INSERT/UPDATE.

---

## Eksperimen

- Bandingkan query time
- Covering index
- Index pada kolom duplikat
- Force index

---

## Tantangan

Tabel besar, identifikasi slow query, tambah index.

---

## Ringkasan

Minggu 4 dari 10: **Index & Optimasi** (Pemula).
