# Index & Optimasi Query

> **Kategori:** PostgreSQL | **Level:** Pemula | **Minggu 4:** Index & Optimasi Query

## Tujuan Pembelajaran

- B-tree index
- EXPLAIN ANALYZE
- Multi-column index
- Partial index
- Trade-off index

---

## Program: Performa Database

```sql
CREATE TABLE transaksi (
    id BIGSERIAL PRIMARY KEY,
    pelanggan_id INTEGER NOT NULL,
    produk_id INTEGER NOT NULL,
    jumlah INTEGER NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    tanggal DATE NOT NULL,
    metode_bayar VARCHAR(20)
);

INSERT INTO transaksi (pelanggan_id, produk_id, jumlah, total, tanggal, metode_bayar)
    SELECT (random()*100+1)::int, (random()*50+1)::int,
        (random()*10+1)::int, (random()*5000000+100000)::decimal(12,2),
        CURRENT_DATE - (random()*365)::int,
        (ARRAY['cash','transfer','ewallet'])[(random()*3)::int+1]
    FROM generate_series(1,1000);

EXPLAIN ANALYZE SELECT * FROM transaksi WHERE pelanggan_id = 42;

CREATE INDEX idx_transaksi_pelanggan ON transaksi(pelanggan_id);

EXPLAIN ANALYZE SELECT * FROM transaksi WHERE pelanggan_id = 42;

CREATE INDEX idx_transaksi_tanggal_bayar ON transaksi(tanggal, metode_bayar);

CREATE INDEX idx_transaksi_besar ON transaksi(total) WHERE total > 1000000;

SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'transaksi';

SELECT COUNT(*) AS total_rows, COUNT(DISTINCT pelanggan_id) AS unique_pelanggan FROM transaksi;
```

---

## Konsep Kunci

### B-tree Index
Struktur tree untuk mempercepat pencarian.

### EXPLAIN ANALYZE
Menunjukkan execution plan.

### Multi-Column Index
Urutan kolom penting.

### Partial Index
Index dengan WHERE clause.

### Trade-off
Index cepat SELECT, lambat INSERT/UPDATE.

---

## Eksperimen

- Bandingkan waktu query
- Index di kolom duplikat
- GIN index
- Analisis JOIN besar

---

## Tantangan

Tabel 10000+ baris, identifikasi slow query, tambah index, ukur perbaikan.

---

## Ringkasan

Minggu 4 dari 10: **Index & Optimasi** (Pemula).
