# Strategi Indexing (B-Tree, GIN, Partial) & EXPLAIN ANALYZE

> **Kategori:** PostgreSQL | **Level:** Dasar Relasional & SQL Lanjutan | **Minggu 4:** Strategi Indexing (B-Tree, GIN, Partial) & EXPLAIN ANALYZE
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami struktur internal index B-Tree vs GIN (Generalized Inverted Index)
- Merancang Composite Index yang efisien berdasarkan aturan kolom selektif paling kiri (Leftmost Prefix)
- Menghemat ukuran disk dan overhead penulisan menggunakan Partial Index dan Expression Index
- Membaca dan mendiagnosis hasil EXPLAIN (ANALYZE, BUFFERS): Sequential Scan vs Index Scan vs Bitmap Heap Scan

---

## Program: Implementasi Indeks B-Tree, GIN untuk JSONB, dan Benchmarking EXPLAIN ANALYZE

```sql
-- 1. Standard B-Tree index on foreign keys to accelerate JOIN operations
CREATE INDEX idx_orders_customer_id ON orders (customer_id);

-- 2. Composite index on status and created_at for dashboard timeline queries
CREATE INDEX idx_orders_status_created ON orders (status, created_at DESC);

-- 3. Partial Index: Index only unpaid or pending orders (saves disk space & write overhead)
CREATE INDEX idx_orders_pending_processing ON orders (created_at)
WHERE status IN ('PENDING', 'PROCESSING');

-- 4. Expression Index: Case-insensitive search on email
CREATE INDEX idx_customers_email_lower ON customers (LOWER(email));

-- 5. GIN (Generalized Inverted Index) on JSONB for lightning-fast attribute search
CREATE INDEX idx_products_attributes_gin ON products USING GIN (attributes);

-- Benchmark query performance using EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
EXPLAIN (ANALYZE, BUFFERS)
SELECT 
    id, sku, title, price, attributes
FROM products
WHERE attributes @> '{"brand": "Logitech"}';

-- Benchmark Partial Index query
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total_amount, created_at
FROM orders
WHERE status = 'PENDING'
ORDER BY created_at DESC
LIMIT 10;
```

---

## Konsep Kunci

### Anatomi Index B-Tree dan Prinsip Leftmost Prefix
Index default di PostgreSQL adalah **B-Tree** (Balanced Tree). B-Tree mengurutkan data secara terstruktur dengan kompleksitas pencarian $O(\log N)$. Saat membuat composite index `(status, created_at)`, PostgreSQL dapat menggunakannya jika query memfilter kolom pertama (`status`), atau keduanya. Namun jika query hanya memfilter `created_at` tanpa `status`, index composite tersebut tidak dapat dimanfaatkan secara optimal (aturan Leftmost Prefix).

### Efisiensi Maksimal dengan Partial Index
Dalam tabel transaksi jutaan baris, 95% data berstatus `COMPLETED` atau `CANCELLED`. Query operasional harian biasanya hanya peduli pada 5% data aktif berstatus `PENDING` atau `PROCESSING`. **Partial Index** (`WHERE status IN ('PENDING', 'PROCESSING')`) hanya menyimpan pointer baris yang memenuhi kondisi tersebut. Ukuran index menjadi sangat kecil, muat sepenuhnya di RAM buffer, dan tidak memperlambat insert baris berstatus lain.

### GIN Index untuk Dokumen JSONB
Index B-Tree standar tidak dapat mengindeks isi internal array atau nested key di dalam kolom `JSONB`. **GIN** (*Generalized Inverted Index*) memecah setiap key-value pair di dalam JSONB menjadi entri indeks terpisah. Hal ini membuat operator query containment seperti `attributes @> '{"brand": "Logitech"}'` dieksekusi secara instan tanpa melakukan full table scan.

### Membaca EXPLAIN ANALYZE
- `Seq Scan`: Database membaca setiap blok data dari awal hingga akhir disk (sangat lambat untuk tabel besar).
- `Index Scan`: Database menelusuri B-Tree dan langsung mengambil tuple baris dari heap disk.
- `Bitmap Heap Scan`: Database membuat peta bit blok memori yang relevan sebelum membacanya secara efisien dari disk.
- `Buffers: shared hit`: Menunjukkan berapa banyak page blok data yang sudah tersimpan di RAM cache tanpa perlu I/O disk.

---

---

## Penjelasan untuk Pemula

Bayangkan buku ensiklopedia 2.000 halaman. Jika Anda mencari kata 'Revolusi Industri' tanpa indeks di halaman belakang, Anda harus membalik halaman satu per satu dari halaman 1 (Sequential Scan). 

Indeks B-Tree seperti indeks alfabetis di buku. Partial Index seperti indeks khusus yang hanya mencatat bab-bab penting yang sedang diujikan besok pagi, sehingga buklet indeksnya hanya setebal 2 halaman dan bisa Anda kantongi dengan mudah.

## Eksperimen

- Jalankan EXPLAIN ANALYZE sebelum dan sesudah membuat index GIN pada products dan bandingkan execution time-nya
- Coba buat index ekspresi UPPER(sku) dan uji apakah pencarian WHERE UPPER(sku) = 'LAPTOP-X1' menggunakan index scan
- Inspeksi ukuran disk index menggunakan query pg_size_pretty(pg_relation_size('idx_products_attributes_gin'))
- Buat skenario di mana PostgreSQL memilih Sequential Scan alih-alih Index Scan karena ukuran tabel sampel masih terlalu kecil

---

## Tantangan

Buat trigram index menggunakan ekstensi `pg_trgm` pada kolom `products.title` dan gunakan `EXPLAIN ANALYZE` untuk membuktikan kecepatan pencarian teks fuzzy `ILIKE '%think%'`.

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

Anda telah menguasai strategi indexing PostgreSQL: B-Tree composite, GIN untuk dokumen JSONB, optimasi partial index hemat memori, dan diagnosis performa query dengan EXPLAIN ANALYZE.
