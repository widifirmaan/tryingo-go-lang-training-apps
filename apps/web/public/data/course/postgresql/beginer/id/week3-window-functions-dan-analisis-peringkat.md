# Window Functions, Partisi & Analisis Peringkat

> **Kategori:** PostgreSQL | **Level:** Dasar Relasional & SQL Lanjutan | **Minggu 3:** Window Functions, Partisi & Analisis Peringkat
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami perbedaan arsitektural antara Window Function (OVER clause) dan GROUP BY konvensional
- Menggunakan fungsi peringkat: ROW_NUMBER(), RANK(), dan DENSE_RANK()
- Menghitung perbandingan tren waktu dengan LAG(), LEAD(), dan running total akumulatif
- Mengonfigurasi frame jendela data: ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW

---

## Program: Analisis Running Total, Peringkat Produk, dan Perbandingan Bulan ke Bulan (MoM)

```sql
-- Window Functions: Calculate partitions without collapsing individual rows
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', created_at)::DATE AS sales_month,
        SUM(total_amount) AS monthly_revenue
    FROM orders
    WHERE status = 'PAID'
    GROUP BY DATE_TRUNC('month', created_at)
)
SELECT 
    sales_month,
    monthly_revenue,
    -- 1. Running total over time
    SUM(monthly_revenue) OVER (
        ORDER BY sales_month ASC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_revenue,
    
    -- 2. Previous month revenue using LAG
    LAG(monthly_revenue, 1) OVER (ORDER BY sales_month ASC) AS prev_month_revenue,
    
    -- 3. Month-over-month growth rate percentage
    ROUND(
        (monthly_revenue - LAG(monthly_revenue, 1) OVER (ORDER BY sales_month ASC)) 
        / NULLIF(LAG(monthly_revenue, 1) OVER (ORDER BY sales_month ASC), 0) * 100, 
        2
    ) AS mom_growth_pct
FROM monthly_sales;

-- Product ranking within category partitions
SELECT 
    p.title,
    p.price,
    p.attributes->>'brand' AS brand,
    -- Row number guarantees unique sequential numbering
    ROW_NUMBER() OVER (PARTITION BY p.attributes->>'brand' ORDER BY p.price DESC) AS row_num,
    -- Dense rank handles ties without skipping rank numbers
    DENSE_RANK() OVER (PARTITION BY p.attributes->>'brand' ORDER BY p.price DESC) AS price_rank,
    -- Calculate difference from average price of that specific brand
    ROUND(p.price - AVG(p.price) OVER (PARTITION BY p.attributes->>'brand'), 2) AS diff_from_brand_avg
FROM products p;
```

---

## Konsep Kunci

### Mekanisme Window Functions vs GROUP BY
Kelemahan utama `GROUP BY` adalah ia menciutkan (collapse) kumpulan baris menjadi satu baris agregat tunggal, menghilangkan detail baris individual. Sebaliknya, **Window Function** menghitung kalkulasi agregat atau peringkat pada sekumpulan baris terkait (disebut *window*) sembari mempertahankan seluruh baris data individual di hasil akhir.

### Klausa OVER: PARTITION BY dan ORDER BY
Klausa `OVER (...)` mendefinisikan batasan jendela kalkulasi:
- `PARTITION BY`: Membagi data menjadi subset terisolasi (misalnya mengelompokkan produk per kategori merek).
- `ORDER BY`: Mengurutkan baris dalam setiap partisi sebelum kalkulasi dijalankan (misalnya mengurutkan berdasarkan harga tertinggi).

### Perbedaan ROW_NUMBER, RANK, dan DENSE_RANK
- `ROW_NUMBER()`: Memberikan nomor urut sekuensial unik (1, 2, 3...) tanpa mempedulikan nilai yang sama (tie breaker acak).
- `RANK()`: Memberikan nomor peringkat yang sama untuk nilai kembar, namun melompati angka berikutnya (misal: 1, 2, 2, 4).
- `DENSE_RANK()`: Memberikan peringkat yang sama untuk nilai kembar tanpa melompati urutan (misal: 1, 2, 2, 3).

### Navigasi Relatif dengan LAG dan LEAD
Fungsi `LAG(kolom, n)` mengambil nilai dari `n` baris sebelumnya dalam partisi, sedangkan `LEAD(kolom, n)` melihat `n` baris ke depan. Kombinasi ini sangat esensial dalam analisis finansial untuk menghitung metrik MoM (*Month-over-Month*) dan deteksi anomali saldo.

---

---

## Penjelasan untuk Pemula

Bayangkan Anda sedang menonton perlombaan lari maraton. Jika Anda menggunakan `GROUP BY`, Anda hanya mendapatkan satu statistik: 'Waktu rata-rata seluruh pelari adalah 3 jam'. Anda kehilangan data siapa yang lari di urutan berapa.

Dengan Window Function, setiap pelari tetap berada di jalurnya masing-masing, namun di atas kepala masing-masing pelari tertera papan skor: 'Kamu pelari nomor 1 di kategori usia 20-an, dan kamu berada 15 detik lebih cepat dibanding pelari di belakangmu'.

## Eksperimen

- Ganti ROWS BETWEEN UNBOUNDED PRECEDING dengan 2 PRECEDING AND CURRENT ROW untuk membuat moving average 3 bulan
- Eksperimen dengan fungsi FIRST_VALUE() dan LAST_VALUE() untuk menampilkan produk termahal di tiap kategori
- Gunakan NTILE(4) OVER (ORDER BY price) untuk membagi produk menjadi 4 kuartil segmen harga (Budget, Mid, Premium, Ultra)
- Gunakan fungsi LEAD untuk memprediksi jeda durasi (selisih hari) antar pesanan setiap customer

---

## Tantangan

Tuliskan query analitik e-commerce yang menghitung saldo berjalan (*running balance*) persediaan gudang untuk setiap SKU produk: setiap transaksi stok masuk menambah running balance dan transaksi order keluar menguranginya, diurutkan strictly berdasarkan timestamp.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Full Table Scan Akibat Lupa Menambahkan Index
- **Gejala / Masalah:** Query SELECT menjadi lambat seiring bertambahnya jutaan baris data.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Tambahkan B-Tree Index pada kolom yang sering digunakan di klausa `WHERE`, `ORDER BY`, dan `JOIN`.

### 2. Lupa Menggunakan Transaksi pada Operasi Finansial/Multi-Tabel
- **Gejala / Masalah:** Data menjadi tidak konsisten jika terjadi error di tengah-tengah rentetan query.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu bungkus operasi dengan blok `BEGIN; ... COMMIT;` atau `ROLLBACK;` saat terjadi kegagalan.

### 3. Tipe Data Angka Desimal yang Keliru (`FLOAT` vs `NUMERIC`)
- **Gejala / Masalah:** Perhitungan saldo uang mengalami selisih desimal akibat floating-point precision error.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan tipe data `NUMERIC(15, 2)` untuk uang dan data finansial presisi tinggi.

---

## Ringkasan

Anda telah menguasai Window Functions di PostgreSQL: OVER, PARTITION BY, running totals, perbandingan tren temporal dengan LAG/LEAD, dan evaluasi ranking dengan ROW_NUMBER dan DENSE_RANK.
