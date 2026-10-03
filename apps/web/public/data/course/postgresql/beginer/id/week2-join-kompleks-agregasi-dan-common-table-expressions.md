# Join Kompleks, Agregasi & Common Table Expressions (CTE)

> **Kategori:** PostgreSQL | **Level:** Dasar Relasional & SQL Lanjutan | **Minggu 2:** Join Kompleks, Agregasi & Common Table Expressions (CTE)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menyusun query analitik terstruktur menggunakan Common Table Expressions (WITH clause)
- Memahami perbedaan mekanis INNER JOIN, LEFT JOIN, dan FULL OUTER JOIN dalam menjaga akurasi laporan
- Menggunakan fungsi agregasi (SUM, AVG, COUNT, MIN, MAX) dengan GROUP BY dan filter HAVING
- Mengelompokkan data berdasarkan dimensi waktu menggunakan fungsi DATE_TRUNC

---

## Program: Laporan Penjualan Bertingkat dengan CTE dan Filter Agregat HAVING

```sql
-- Common Table Expressions (CTE) for modular, readable data pipelines
WITH completed_orders AS (
    -- Step 1: Filter and normalize order financial totals
    SELECT 
        o.id AS order_id,
        o.customer_id,
        o.total_amount,
        o.created_at,
        DATE_TRUNC('month', o.created_at) AS order_month
    FROM orders o
    WHERE o.status IN ('PAID', 'PROCESSING', 'SHIPPED')
),
customer_summary AS (
    -- Step 2: Aggregate lifetime value per customer
    SELECT 
        co.customer_id,
        COUNT(co.order_id) AS total_orders,
        SUM(co.total_amount) AS lifetime_spent,
        AVG(co.total_amount) AS average_order_value,
        MAX(co.created_at) AS last_order_date
    FROM completed_orders co
    GROUP BY co.customer_id
),
top_product_lines AS (
    -- Step 3: Calculate product performance across all orders
    SELECT 
        p.id AS product_id,
        p.sku,
        p.title,
        SUM(oi.quantity) AS units_sold,
        SUM(oi.quantity * oi.unit_price) AS gross_revenue
    FROM products p
    INNER JOIN order_items oi ON p.id = oi.product_id
    INNER JOIN orders o ON oi.order_id = o.id
    WHERE o.status = 'PAID'
    GROUP BY p.id, p.sku, p.title
    HAVING SUM(oi.quantity) > 0
)
-- Step 4: Final analytical projection joining customer profiles
SELECT 
    c.full_name,
    c.email,
    COALESCE(cs.total_orders, 0) AS completed_orders,
    COALESCE(cs.lifetime_spent, 0.00) AS total_revenue_idr,
    ROUND(COALESCE(cs.average_order_value, 0.00), 2) AS avg_basket_size,
    CASE 
        WHEN COALESCE(cs.lifetime_spent, 0) >= 20000000 THEN 'VIP Platinum'
        WHEN COALESCE(cs.lifetime_spent, 0) >= 10000000 THEN 'Gold Member'
        WHEN COALESCE(cs.lifetime_spent, 0) > 0 THEN 'Active Regular'
        ELSE 'Prospect'
    END AS customer_segment
FROM customers c
LEFT JOIN customer_summary cs ON c.id = cs.customer_id
ORDER BY total_revenue_idr DESC;
```

---

## Konsep Kunci

### Modularitas Query dengan Common Table Expressions (CTE)
Klausa `WITH` (dikenal sebagai Common Table Expression atau CTE) memungkinkan Anda memecah query SQL raksasa yang rumit menjadi langkah-langkah deklaratif logis yang mudah dibaca. Setiap blok CTE bertindak seperti temporary result set yang hanya eksis selama durasi eksekusi query tunggal tersebut. Dibanding subquery bersarang (nested subqueries), CTE meningkatkan keterbacaan kode secara drastis dan memudahkan pemeliharaan logika bisnis tim.

### Semantik JOIN dan Penanganan Data Null
Saat menggabungkan tabel `customers` dan `orders`:
- `INNER JOIN` hanya mempertahankan baris yang memiliki kecocokan di kedua sisi. Customer yang belum pernah belanja akan tereliminasi.
- `LEFT JOIN` mempertahankan seluruh baris dari tabel kiri (`customers`) dan menyematkan `NULL` untuk kolom tabel kanan jika tidak ditemukan transaksi. Fungsi `COALESCE(nilai, default)` wajib digunakan untuk mengubah nilai `NULL` menjadi representasi valid (misalnya `0` untuk jumlah pesanan).

### Agregasi dan Perbedaan WHERE vs HAVING
Klausa `WHERE` mengevaluasi kondisi sebelum proses pengelompokan (`GROUP BY`) terjadi di mesin database. Sebaliknya, klausa `HAVING` menyaring hasil *setelah* agregasi dihitung. Sebagai contoh, `WHERE o.status = 'PAID'` memfilter baris sebelum dihitung, sedangkan `HAVING SUM(oi.quantity) > 10` menyaring kelompok produk yang total penjualannya melebihi 10 unit.

---

---

## Penjelasan untuk Pemula

Bayangkan CTE seperti menyiapkan bahan masakan di dapur restoran. Daripada melempar semua bahan sekaligus ke satu wajan besar (subquery berantakan), Anda menyiapkan baskom pertama untuk 'pesanan sukses', baskom kedua untuk 'total belanja tiap orang', dan baskom ketiga untuk 'produk terlaris'. 

Di akhir masakan, koki tinggal menyatukan bahan-bahan dari ketiga baskom tersebut dengan rapi dan elegan.

## Eksperimen

- Ubah LEFT JOIN menjadi INNER JOIN pada query utama dan perhatikan hilangnya customer yang belum memiliki order
- Tambahkan CTE baru untuk menghitung rasio pesanan yang dibatalkan (CANCELLED) per customer
- Gunakan fungsi DATE_TRUNC('week', o.created_at) untuk mengelompokkan omzet mingguan
- Eksperimen dengan menambahkan klausa HAVING lifetime_spent > 15000000 pada CTE customer_summary

---

## Tantangan

Tuliskan query CTE rekursif (`WITH RECURSIVE`) untuk menavigasi struktur kategori produk hierarkis pohon (parent-child categories) hingga kedalaman tak terbatas, menampilkan breadcrumb path lengkap (misal: "Elektronik > Komputer > Aksesoris > Mouse").

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

Anda telah menguasai penulisan pipeline query analitik modern menggunakan Common Table Expressions (CTE), pemahaman mendalam INNER vs LEFT JOIN, dan agregasi data dengan GROUP BY dan HAVING.
