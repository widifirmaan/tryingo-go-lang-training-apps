# Window Functions

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 6:** Window Functions

## Tujuan Pembelajaran

- ROW_NUMBER, RANK, DENSE_RANK
- LAG dan LEAD
- SUM/AVG dengan OVER
- PARTITION BY
- ROWS/RANGE frame

---

## Program: Analisis Data Lanjutan

```sql
CREATE TABLE penjualan (
    id SERIAL PRIMARY KEY, bulan VARCHAR(7),
    produk VARCHAR(50), kategori VARCHAR(30),
    jumlah INTEGER, revenue DECIMAL(12,2)
);

INSERT INTO penjualan VALUES
    (1,'2024-01','Laptop A','Elektronik',50,600000000),
    (2,'2024-01','Laptop B','Elektronik',30,360000000),
    (3,'2024-01','Mouse','Aksesoris',200,70000000),
    (4,'2024-02','Laptop A','Elektronik',45,540000000),
    (5,'2024-02','Laptop B','Elektronik',35,420000000),
    (6,'2024-02','Mouse','Aksesoris',180,63000000),
    (7,'2024-03','Laptop A','Elektronik',60,720000000),
    (8,'2024-03','Laptop B','Elektronik',40,480000000),
    (9,'2024-03','Mouse','Aksesoris',220,77000000);

SELECT produk, bulan, revenue,
    ROW_NUMBER() OVER (PARTITION BY bulan ORDER BY revenue DESC) AS ranking
    FROM penjualan;

SELECT produk, revenue,
    RANK() OVER (ORDER BY revenue DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY revenue DESC) AS dense_rank
    FROM penjualan;

SELECT bulan, produk, revenue,
    LAG(revenue) OVER (PARTITION BY produk ORDER BY bulan) AS prev_revenue,
    revenue - LAG(revenue) OVER (PARTITION BY produk ORDER BY bulan) AS perubahan
    FROM penjualan ORDER BY produk, bulan;

SELECT bulan, produk, revenue,
    SUM(revenue) OVER (PARTITION BY produk ORDER BY bulan) AS running_total
    FROM penjualan ORDER BY produk, bulan;

SELECT bulan, produk, revenue,
    AVG(revenue) OVER (PARTITION BY produk ORDER BY bulan
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg
    FROM penjualan ORDER BY produk, bulan;
```

---

## Konsep Kunci

### Window Functions
Menghitung di set baris terkait baris saat ini.

### ROW_NUMBER vs RANK
ROW_NUMBER unik. RANK skip untuk tie.

### LAG & LEAD
Akses baris sebelumnya/selanjutnya.

### OVER Clause
PARTITION BY, ORDER BY, ROWS/RANGE.

### Running Total
SUM() OVER (ORDER BY ...).

---

## Eksperimen

- YoY growth dengan LAG
- PERCENT_RANK
- FIRST_VALUE
- Deteksi outlier

---

## Tantangan

Laporan: ranking per bulan, MoM growth, running total.

---

## Ringkasan

Minggu 6 dari 10: **Window Functions** (Menengah).
