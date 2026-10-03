import sys
import os

def get_track():
    levels = [
        {
            'levelId': 'beginer',
            'nameId': 'Dasar Relasional & SQL Lanjutan',
            'nameEn': 'Relational Foundations & Advanced SQL',
            'descId': 'Fondasi pemodelan data relasional, tipe data modern (JSONB, UUID), CTE, window functions, dan optimasi query plan dengan index.',
            'descEn': 'Relational modeling foundations, modern data types (JSONB, UUID), CTEs, window functions, and query plan optimization with indexing.',
        },
        {
            'levelId': 'intermediate',
            'nameId': 'Konkurensi, Partisi & Arsitektur Enterprise',
            'nameEn': 'Concurrency, Partitioning & Enterprise Architecture',
            'descId': 'ACID isolation levels, row-level locking, PL/pgSQL triggers, declarative table partitioning, dan capstone e-commerce engine.',
            'descEn': 'ACID isolation levels, row-level locking, PL/pgSQL triggers, declarative table partitioning, and capstone e-commerce engine.',
        }
    ]

    modules = [
        # WEEK 1
        {
            'week': 1,
            'level': 'beginer',
            'levelNameId': 'Dasar Relasional & SQL Lanjutan',
            'levelNameEn': 'Relational Foundations & Advanced SQL',
            'topicId': 'pemodelan-relasional-ddl-dan-tipe-data-modern',
            'titleId': 'Pemodelan Relasional, DDL & Tipe Data Modern (UUID, JSONB)',
            'titleEn': 'Relational Modeling, DDL & Modern Data Types (UUID, JSONB)',
            'language': 'sql',
            'programId': 'Skema E-Commerce dengan UUIDv7, JSONB Metadata, dan Validasi Constraint',
            'programEn': 'E-Commerce Schema with UUIDv7, JSONB Metadata, and Constraint Validation',
            'code': """-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables for idempotent execution
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- 1. Customers table with generated UUID and check constraints
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    profile_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT email_format_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
);

-- 2. Products table with inventory check and numeric precision
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders table with status enum-like check
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (total_amount >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (status IN ('PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'CANCELLED')),
    shipping_address JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Order items table with composite uniqueness
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    quantity INT NOT NULL CHECK (quantity > 0),
    CONSTRAINT unique_order_product UNIQUE (order_id, product_id)
);

-- Insert sample records
INSERT INTO customers (email, full_name, profile_metadata) VALUES
('budi.santoso@example.com', 'Budi Santoso', '{"tier": "gold", "preferences": {"newsletter": true, "currency": "IDR"}}'::jsonb),
('siti.aminah@example.com', 'Siti Aminah', '{"tier": "silver", "preferences": {"newsletter": false, "currency": "IDR"}}'::jsonb);

INSERT INTO products (sku, title, price, stock_quantity, attributes) VALUES
('LAPTOP-X1', 'ThinkBook Ultra 14', 16500000.00, 25, '{"brand": "Lenovo", "specs": {"ram": "16GB", "ssd": "512GB"}}'::jsonb),
('MOUSE-WL', 'Precision Wireless Mouse', 350000.00, 100, '{"brand": "Logitech", "color": "Graphite", "dpi": 4000}'::jsonb);

-- Query using JSONB operator ->> to extract text fields
SELECT 
    c.full_name,
    c.email,
    c.profile_metadata->>'tier' AS customer_tier,
    c.profile_metadata->'preferences'->>'currency' AS preferred_currency
FROM customers c;
""",
            'objectivesId': [
                'Merancang skema database relasional 3NF dengan primary key UUID default gen_random_uuid()',
                'Menggunakan constraint integritas data: CHECK, UNIQUE, NOT NULL, dan FOREIGN KEY cascade rules',
                'Memanfaatkan tipe data modern JSONB dan mengoperasikan operator JSON (->, ->>, @>)',
                'Memahami tipe data presisi keuangan NUMERIC dan zona waktu akurat TIMESTAMPTZ'
            ],
            'objectivesEn': [
                'Design 3NF relational database schemas with UUID primary keys using gen_random_uuid()',
                'Enforce strict data integrity with CHECK, UNIQUE, NOT NULL, and foreign key cascade rules',
                'Leverage modern JSONB data types and query with JSON operators (->, ->>, @>)',
                'Understand financial precision NUMERIC types and timezone-aware TIMESTAMPTZ'
            ],
            'explanationId': """### Arsitektur Relasional Modern dan UUID vs Serial
Dalam sistem terdistribusi modern, auto-increment integer serial (`1, 2, 3...`) memiliki kelemahan kritis: mudah ditebak (ID enumeration attack) dan rentan konflik saat data digabungkan dari multi-node atau multi-region. PostgreSQL menyediakan tipe data `UUID` (128-bit) yang menjamin keunikan global tanpa perlu koordinasi terpusat. Ekstensi `pgcrypto` menyediakan fungsi `gen_random_uuid()` standar kriptografi untuk alokasi primary key instan.

### Ketahanan Integritas Data dengan Constraint
Database PostgreSQL bertindak sebagai benteng terakhir integritas data aplikasi. Constraint `CHECK` memverifikasi aturan bisnis langsung di tingkat penyimpanan, misalnya ekspresi regex untuk format email `CHECK (email ~* '...')` dan validasi non-negatif `CHECK (stock_quantity >= 0)`. Constraint `FOREIGN KEY` dengan klausa `ON DELETE RESTRICT` mencegah penghapusan entitas induk jika data relasi masih tersisa, melindungi konsistensi referensial finansial.

### Fleksibilitas Semi-Terstruktur dengan JSONB
Tipe data `JSONB` menyimpan dokumen JSON dalam format biner yang sudah di-parse dan diindeks, bukan string mentah (`JSON`). Operator `->>` mengekstrak field sebagai teks murni, sedangkan operator `->` mempertahankan tipe objek JSON. JSONB sangat ideal untuk menyimpan preferensi pengguna, metadata dinamis produk, dan payload respons pihak ketiga tanpa perlu migrasi skema tabel secara berkala.""",
            'explanationEn': """### Modern Relational Architecture and UUID vs Serial
In modern distributed systems, sequential serial integers (`1, 2, 3...`) carry significant risks: they expose business volume to ID enumeration attacks and cause collisions when merging data across multi-region nodes. PostgreSQL provides a native 128-bit `UUID` type that guarantees global uniqueness without centralized coordination. The `pgcrypto` extension enables `gen_random_uuid()` for fast, cryptographically secure key generation.

### Bulletproof Integrity through Database Constraints
PostgreSQL serves as the ultimate source of truth for business integrity. `CHECK` constraints validate critical business invariants directly at the storage level, such as regex validation for email formats `CHECK (email ~* '...')` and inventory sanity checks `CHECK (stock_quantity >= 0)`. Foreign keys configured with `ON DELETE RESTRICT` prevent orphaned records and protect financial referential integrity.

### Semi-Structured Flexibility with JSONB
The `JSONB` data type stores JSON documents in a decomposed binary format rather than raw strings. Operator `->>` extracts JSON properties as native text, while `->` preserves JSON objects. JSONB offers the perfect balance: relational ACID guarantees for structured columns, combined with schema-less agility for user preferences, dynamic e-commerce attributes, and webhook payloads.""",
            'beginnerId': """Bayangkan database relasional seperti sistem arsip lemari besi di bank. Kolom terstruktur seperti nomor rekening dan saldo harus memiliki tipe angka pasti (`NUMERIC`) agar tidak ada selisih satu sen pun akibat pembulatan floating-point. 

UUID seperti nomor paspor internasional unik yang tidak akan tertukar dengan siapapun di seluruh dunia. Sedangkan kolom `JSONB` seperti map transparan di dalam map berkas Anda—Anda bisa menyelipkan catatan fleksibel seperti 'bahasa favorit' atau 'tema aplikasi' tanpa harus merombak struktur rak lemari besi Anda.""",
            'beginnerEn': """Imagine a relational database as a bank's vault filing system. Structured columns like account numbers and balances require fixed precision (`NUMERIC`) so not a single cent is ever lost to floating-point rounding errors.

UUID is like an international passport number that is globally unique across the entire world. Meanwhile, `JSONB` is like a clear transparent pouch inside each folder—you can store flexible preferences like 'language choice' or 'theme mode' without having to rebuild the physical vault shelves.""",
            'experimentsId': [
                'Coba masukkan email yang tidak valid tanpa simbol @ dan perhatikan pesan error constraint violation PostgreSQL',
                'Gunakan operator JSONB containment @> untuk mencari customer dengan preferensi currency IDR: profile_metadata @> \'{"preferences": {"currency": "IDR"}}\'',
                'Modifikasi table products dengan menambahkan kolom status stock: active, discontinued, out_of_stock menggunakan CHECK constraint',
                'Buat pesanan baru dan coba hapus customer terkait untuk melihat perlindungan ON DELETE RESTRICT bekerja'
            ],
            'experimentsEn': [
                'Insert an invalid email without an @ symbol and inspect PostgreSQL constraint violation error message',
                'Use the JSONB containment operator @> to search customers with IDR currency: profile_metadata @> \'{"preferences": {"currency": "IDR"}}\'',
                'Alter table products to add an inventory status column: active, discontinued, out_of_stock using a CHECK constraint',
                'Insert an order and attempt deleting its parent customer to verify ON DELETE RESTRICT in action'
            ],
            'challengeId': 'Rancang skema tabel `invoices` yang berelasi ke `orders`, dengan kolom `invoice_number` berformat tahun dan 6 digit sequence (misal: INV-2026-000001), status pelunasan, timestamp jatuh tempo, dan metadata gateway pembayaran dalam bentuk JSONB.',
            'challengeEn': 'Design an `invoices` table schema referencing `orders`, featuring a structured `invoice_number` (e.g. INV-2026-000001), payment status, due date timestamp, and gateway transaction metadata stored as JSONB.',
            'summaryId': 'Anda telah menguasai perancangan skema relasional modern dengan primary key UUID, integritas constraint level database, tipe angka presisi finansial NUMERIC, dan fleksibilitas JSONB biner.',
            'summaryEn': 'You have mastered modern relational schema design using UUID primary keys, database-level integrity constraints, financial NUMERIC precision, and flexible binary JSONB data types.'
        },

        # WEEK 2
        {
            'week': 2,
            'level': 'beginer',
            'levelNameId': 'Dasar Relasional & SQL Lanjutan',
            'levelNameEn': 'Relational Foundations & Advanced SQL',
            'topicId': 'join-kompleks-agregasi-dan-common-table-expressions',
            'titleId': 'Join Kompleks, Agregasi & Common Table Expressions (CTE)',
            'titleEn': 'Complex Joins, Aggregations & Common Table Expressions (CTE)',
            'language': 'sql',
            'programId': 'Laporan Penjualan Bertingkat dengan CTE dan Filter Agregat HAVING',
            'programEn': 'Hierarchical Sales Report using CTEs and HAVING Aggregate Filters',
            'code': """-- Common Table Expressions (CTE) for modular, readable data pipelines
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
""",
            'objectivesId': [
                'Menyusun query analitik terstruktur menggunakan Common Table Expressions (WITH clause)',
                'Memahami perbedaan mekanis INNER JOIN, LEFT JOIN, dan FULL OUTER JOIN dalam menjaga akurasi laporan',
                'Menggunakan fungsi agregasi (SUM, AVG, COUNT, MIN, MAX) dengan GROUP BY dan filter HAVING',
                'Mengelompokkan data berdasarkan dimensi waktu menggunakan fungsi DATE_TRUNC'
            ],
            'objectivesEn': [
                'Construct modular, maintainable analytical queries using Common Table Expressions (WITH clauses)',
                'Understand semantic differences between INNER, LEFT, and FULL OUTER joins to ensure reporting accuracy',
                'Apply aggregation functions (SUM, AVG, COUNT, MIN, MAX) with GROUP BY and HAVING filters',
                'Bucket time-series transaction records using DATE_TRUNC'
            ],
            'explanationId': """### Modularitas Query dengan Common Table Expressions (CTE)
Klausa `WITH` (dikenal sebagai Common Table Expression atau CTE) memungkinkan Anda memecah query SQL raksasa yang rumit menjadi langkah-langkah deklaratif logis yang mudah dibaca. Setiap blok CTE bertindak seperti temporary result set yang hanya eksis selama durasi eksekusi query tunggal tersebut. Dibanding subquery bersarang (nested subqueries), CTE meningkatkan keterbacaan kode secara drastis dan memudahkan pemeliharaan logika bisnis tim.

### Semantik JOIN dan Penanganan Data Null
Saat menggabungkan tabel `customers` dan `orders`:
- `INNER JOIN` hanya mempertahankan baris yang memiliki kecocokan di kedua sisi. Customer yang belum pernah belanja akan tereliminasi.
- `LEFT JOIN` mempertahankan seluruh baris dari tabel kiri (`customers`) dan menyematkan `NULL` untuk kolom tabel kanan jika tidak ditemukan transaksi. Fungsi `COALESCE(nilai, default)` wajib digunakan untuk mengubah nilai `NULL` menjadi representasi valid (misalnya `0` untuk jumlah pesanan).

### Agregasi dan Perbedaan WHERE vs HAVING
Klausa `WHERE` mengevaluasi kondisi sebelum proses pengelompokan (`GROUP BY`) terjadi di mesin database. Sebaliknya, klausa `HAVING` menyaring hasil *setelah* agregasi dihitung. Sebagai contoh, `WHERE o.status = 'PAID'` memfilter baris sebelum dihitung, sedangkan `HAVING SUM(oi.quantity) > 10` menyaring kelompok produk yang total penjualannya melebihi 10 unit.""",
            'explanationEn': """### Query Modularity with Common Table Expressions (CTEs)
The `WITH` clause (Common Table Expression / CTE) empowers developers to decompose unwieldy, deeply nested SQL queries into sequential, readable logical stages. Each CTE functions as an ephemeral, named result set evaluated within the scope of the parent statement. Unlike convoluted nested subqueries, CTEs drastically improve code readability, maintainability, and debugging ergonomics.

### Relational JOIN Semantics and NULL Handling
When correlating customers and their respective purchases:
- `INNER JOIN` strictly produces records where keys exist on both sides. Inactive customers with zero orders are excluded.
- `LEFT JOIN` preserves all records from the primary relation (`customers`), populating missing foreign attributes with `NULL`. Combining this with `COALESCE(val, fallback)` guarantees clean defaults (e.g. converting `NULL` order counts into `0`).

### Aggregation Mechanics: WHERE vs HAVING
The `WHERE` clause filters individual table rows *prior* to `GROUP BY` execution. In contrast, the `HAVING` clause evaluates filtering criteria *after* aggregate calculations are materialized. For example, `WHERE o.status = 'PAID'` filters individual transaction status, whereas `HAVING SUM(oi.quantity) > 10` evaluates aggregate product volumes.""",
            'beginnerId': """Bayangkan CTE seperti menyiapkan bahan masakan di dapur restoran. Daripada melempar semua bahan sekaligus ke satu wajan besar (subquery berantakan), Anda menyiapkan baskom pertama untuk 'pesanan sukses', baskom kedua untuk 'total belanja tiap orang', dan baskom ketiga untuk 'produk terlaris'. 

Di akhir masakan, koki tinggal menyatukan bahan-bahan dari ketiga baskom tersebut dengan rapi dan elegan.""",
            'beginnerEn': """Think of CTEs like preparing mise en place ingredients in a professional kitchen. Instead of dumping every ingredient into one giant chaotic frying pan (nested subquery hell), you prep bowl #1 for 'paid orders', bowl #2 for 'per-customer lifetime spend', and bowl #3 for 'top selling items'. 

At plating time, you effortlessly combine the contents of these prepped bowls into a pristine culinary presentation.""",
            'experimentsId': [
                'Ubah LEFT JOIN menjadi INNER JOIN pada query utama dan perhatikan hilangnya customer yang belum memiliki order',
                'Tambahkan CTE baru untuk menghitung rasio pesanan yang dibatalkan (CANCELLED) per customer',
                'Gunakan fungsi DATE_TRUNC(\'week\', o.created_at) untuk mengelompokkan omzet mingguan',
                'Eksperimen dengan menambahkan klausa HAVING lifetime_spent > 15000000 pada CTE customer_summary'
            ],
            'experimentsEn': [
                'Switch the primary LEFT JOIN to an INNER JOIN and observe the exclusion of zero-order customers',
                'Add a new CTE stage calculating the cancellation ratio per customer',
                'Apply DATE_TRUNC(\'week\', o.created_at) to aggregate weekly revenue buckets',
                'Experiment with adding HAVING lifetime_spent > 15000000 inside the customer_summary CTE'
            ],
            'challengeId': 'Tuliskan query CTE rekursif (`WITH RECURSIVE`) untuk menavigasi struktur kategori produk hierarkis pohon (parent-child categories) hingga kedalaman tak terbatas, menampilkan breadcrumb path lengkap (misal: "Elektronik > Komputer > Aksesoris > Mouse").',
            'challengeEn': 'Write a recursive CTE (`WITH RECURSIVE`) querying a hierarchical category tree (parent-child self-referential table) displaying the full breadcrumb path (e.g. "Electronics > Computers > Accessories > Mouse").',
            'summaryId': 'Anda telah menguasai penulisan pipeline query analitik modern menggunakan Common Table Expressions (CTE), pemahaman mendalam INNER vs LEFT JOIN, dan agregasi data dengan GROUP BY dan HAVING.',
            'summaryEn': 'You have mastered modern analytical query pipelines using Common Table Expressions (CTEs), nuanced INNER vs LEFT JOIN mechanics, and robust aggregation with GROUP BY and HAVING.'
        },

        # WEEK 3
        {
            'week': 3,
            'level': 'beginer',
            'levelNameId': 'Dasar Relasional & SQL Lanjutan',
            'levelNameEn': 'Relational Foundations & Advanced SQL',
            'topicId': 'window-functions-dan-analisis-peringkat',
            'titleId': 'Window Functions, Partisi & Analisis Peringkat',
            'titleEn': 'Window Functions, Partitioning & Ranking Analytics',
            'language': 'sql',
            'programId': 'Analisis Running Total, Peringkat Produk, dan Perbandingan Bulan ke Bulan (MoM)',
            'programEn': 'Running Total Calculation, Product Ranking, and Month-over-Month (MoM) Growth',
            'code': """-- Window Functions: Calculate partitions without collapsing individual rows
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
""",
            'objectivesId': [
                'Memahami perbedaan arsitektural antara Window Function (OVER clause) dan GROUP BY konvensional',
                'Menggunakan fungsi peringkat: ROW_NUMBER(), RANK(), dan DENSE_RANK()',
                'Menghitung perbandingan tren waktu dengan LAG(), LEAD(), dan running total akumulatif',
                'Mengonfigurasi frame jendela data: ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW'
            ],
            'objectivesEn': [
                'Understand the architectural distinction between Window Functions (OVER clause) and GROUP BY',
                'Implement ranking functions: ROW_NUMBER(), RANK(), and DENSE_RANK()',
                'Calculate time-series delta comparisons using LAG(), LEAD(), and cumulative running totals',
                'Configure custom analytical window frames: ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW'
            ],
            'explanationId': """### Mekanisme Window Functions vs GROUP BY
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
Fungsi `LAG(kolom, n)` mengambil nilai dari `n` baris sebelumnya dalam partisi, sedangkan `LEAD(kolom, n)` melihat `n` baris ke depan. Kombinasi ini sangat esensial dalam analisis finansial untuk menghitung metrik MoM (*Month-over-Month*) dan deteksi anomali saldo.""",
            'explanationEn': """### Window Functions vs Conventional GROUP BY
The core limitation of `GROUP BY` is row collapse: multiple source rows are condensed into a single aggregated record, erasing individual item granularity. **Window Functions** compute aggregate values, running statistics, or ranking across a defined subset of rows (the *window*) while strictly preserving every single input row in the result set.

### Deconstructing the OVER Clause
The `OVER (...)` clause governs how the analytical engine partitions and sorts data:
- `PARTITION BY`: Divides the dataset into distinct subsets (e.g. ranking products independently per manufacturer brand).
- `ORDER BY`: Dictates the sequencing order applied to rows within that specific partition.

### Ranking Distinctions: ROW_NUMBER vs RANK vs DENSE_RANK
- `ROW_NUMBER()`: Assigns a strict sequential identifier (1, 2, 3, 4...) with arbitrary tie-breaking.
- `RANK()`: Assigns identical rankings to tied values, skipping subsequent ranks (e.g. 1, 2, 2, 4).
- `DENSE_RANK()`: Assigns identical rankings to ties without skipping subsequent numbers (e.g. 1, 2, 2, 3).

### Temporal Time-Travel with LAG and LEAD
`LAG(column, offset)` accesses values from prior rows within the partition window, while `LEAD(column, offset)` inspects future rows. These primitives form the foundation of financial time-series analysis, calculating Month-over-Month (MoM) growth rates and running moving averages.""",
            'beginnerId': """Bayangkan Anda sedang menonton perlombaan lari maraton. Jika Anda menggunakan `GROUP BY`, Anda hanya mendapatkan satu statistik: 'Waktu rata-rata seluruh pelari adalah 3 jam'. Anda kehilangan data siapa yang lari di urutan berapa.

Dengan Window Function, setiap pelari tetap berada di jalurnya masing-masing, namun di atas kepala masing-masing pelari tertera papan skor: 'Kamu pelari nomor 1 di kategori usia 20-an, dan kamu berada 15 detik lebih cepat dibanding pelari di belakangmu'.""",
            'beginnerEn': """Imagine watching a marathon race. If you run a `GROUP BY`, you only get a single flattened metric: 'The average runner finished in 3 hours'. You lose the identity of individual athletes.

With Window Functions, every single runner stays clearly visible on the track, but floating above each runner is a personalized digital leaderboard: 'You rank #1 in the under-30 category, and you are currently 15 seconds ahead of the runner behind you'.""",
            'experimentsId': [
                'Ganti ROWS BETWEEN UNBOUNDED PRECEDING dengan 2 PRECEDING AND CURRENT ROW untuk membuat moving average 3 bulan',
                'Eksperimen dengan fungsi FIRST_VALUE() dan LAST_VALUE() untuk menampilkan produk termahal di tiap kategori',
                'Gunakan NTILE(4) OVER (ORDER BY price) untuk membagi produk menjadi 4 kuartil segmen harga (Budget, Mid, Premium, Ultra)',
                'Gunakan fungsi LEAD untuk memprediksi jeda durasi (selisih hari) antar pesanan setiap customer'
            ],
            'experimentsEn': [
                'Replace ROWS BETWEEN UNBOUNDED PRECEDING with 2 PRECEDING AND CURRENT ROW to produce a 3-month moving average',
                'Experiment with FIRST_VALUE() and LAST_VALUE() to display the top priced item across each category',
                'Use NTILE(4) OVER (ORDER BY price) to bucket products into four pricing quartiles (Budget, Mid, Premium, Luxury)',
                'Apply LEAD to determine the day delta interval between successive orders for each customer'
            ],
            'challengeId': 'Tuliskan query analitik e-commerce yang menghitung saldo berjalan (*running balance*) persediaan gudang untuk setiap SKU produk: setiap transaksi stok masuk menambah running balance dan transaksi order keluar menguranginya, diurutkan strictly berdasarkan timestamp.',
            'challengeEn': 'Write an e-commerce inventory query computing running ledger balance per product SKU: stock reception transactions add to the balance while customer fulfillment subtracts, ordered strictly by transaction timestamp.',
            'summaryId': 'Anda telah menguasai Window Functions di PostgreSQL: OVER, PARTITION BY, running totals, perbandingan tren temporal dengan LAG/LEAD, dan evaluasi ranking dengan ROW_NUMBER dan DENSE_RANK.',
            'summaryEn': 'You have mastered PostgreSQL Window Functions: OVER, PARTITION BY, running totals, temporal delta tracking with LAG/LEAD, and multi-tier ranking with ROW_NUMBER and DENSE_RANK.'
        },

        # WEEK 4
        {
            'week': 4,
            'level': 'beginer',
            'levelNameId': 'Dasar Relasional & SQL Lanjutan',
            'levelNameEn': 'Relational Foundations & Advanced SQL',
            'topicId': 'strategi-indexing-dan-analisis-query-plan',
            'titleId': 'Strategi Indexing (B-Tree, GIN, Partial) & EXPLAIN ANALYZE',
            'titleEn': 'Indexing Strategies (B-Tree, GIN, Partial) & EXPLAIN ANALYZE',
            'language': 'sql',
            'programId': 'Implementasi Indeks B-Tree, GIN untuk JSONB, dan Benchmarking EXPLAIN ANALYZE',
            'programEn': 'B-Tree, GIN JSONB Index Implementation, and EXPLAIN ANALYZE Benchmarking',
            'code': """-- 1. Standard B-Tree index on foreign keys to accelerate JOIN operations
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
""",
            'objectivesId': [
                'Memahami struktur internal index B-Tree vs GIN (Generalized Inverted Index)',
                'Merancang Composite Index yang efisien berdasarkan aturan kolom selektif paling kiri (Leftmost Prefix)',
                'Menghemat ukuran disk dan overhead penulisan menggunakan Partial Index dan Expression Index',
                'Membaca dan mendiagnosis hasil EXPLAIN (ANALYZE, BUFFERS): Sequential Scan vs Index Scan vs Bitmap Heap Scan'
            ],
            'objectivesEn': [
                'Understand internal storage mechanics of B-Tree vs GIN (Generalized Inverted Index)',
                'Design high-performance Composite Indexes adhering to the Leftmost Prefix rule',
                'Minimize disk footprint and write overhead using Partial and Expression Indexes',
                'Interpret and diagnose EXPLAIN (ANALYZE, BUFFERS) profiles: Seq Scan vs Index Scan vs Bitmap Heap Scan'
            ],
            'explanationId': """### Anatomi Index B-Tree dan Prinsip Leftmost Prefix
Index default di PostgreSQL adalah **B-Tree** (Balanced Tree). B-Tree mengurutkan data secara terstruktur dengan kompleksitas pencarian $O(\\log N)$. Saat membuat composite index `(status, created_at)`, PostgreSQL dapat menggunakannya jika query memfilter kolom pertama (`status`), atau keduanya. Namun jika query hanya memfilter `created_at` tanpa `status`, index composite tersebut tidak dapat dimanfaatkan secara optimal (aturan Leftmost Prefix).

### Efisiensi Maksimal dengan Partial Index
Dalam tabel transaksi jutaan baris, 95% data berstatus `COMPLETED` atau `CANCELLED`. Query operasional harian biasanya hanya peduli pada 5% data aktif berstatus `PENDING` atau `PROCESSING`. **Partial Index** (`WHERE status IN ('PENDING', 'PROCESSING')`) hanya menyimpan pointer baris yang memenuhi kondisi tersebut. Ukuran index menjadi sangat kecil, muat sepenuhnya di RAM buffer, dan tidak memperlambat insert baris berstatus lain.

### GIN Index untuk Dokumen JSONB
Index B-Tree standar tidak dapat mengindeks isi internal array atau nested key di dalam kolom `JSONB`. **GIN** (*Generalized Inverted Index*) memecah setiap key-value pair di dalam JSONB menjadi entri indeks terpisah. Hal ini membuat operator query containment seperti `attributes @> '{"brand": "Logitech"}'` dieksekusi secara instan tanpa melakukan full table scan.

### Membaca EXPLAIN ANALYZE
- `Seq Scan`: Database membaca setiap blok data dari awal hingga akhir disk (sangat lambat untuk tabel besar).
- `Index Scan`: Database menelusuri B-Tree dan langsung mengambil tuple baris dari heap disk.
- `Bitmap Heap Scan`: Database membuat peta bit blok memori yang relevan sebelum membacanya secara efisien dari disk.
- `Buffers: shared hit`: Menunjukkan berapa banyak page blok data yang sudah tersimpan di RAM cache tanpa perlu I/O disk.""",
            'explanationEn': """### B-Tree Anatomy and the Leftmost Prefix Rule
PostgreSQL defaults to **B-Tree** (Balanced Tree) indexing, storing sorted node pointers to achieve $O(\\log N)$ lookup performance. When declaring a composite index `(status, created_at)`, PostgreSQL leverages it when queries match the primary key prefix (`status`) or both. If a query only filters by `created_at`, the index cannot be traversed efficiently due to the Leftmost Prefix principle.

### High-Throughput Partial Indexing
In real-world tables with tens of millions of records, 95% are historical (`COMPLETED` or `CANCELLED`). Real-time fulfillment workers only care about the 5% active workload (`PENDING`). A **Partial Index** (`WHERE status IN ('PENDING', 'PROCESSING')`) indexes strictly matching rows. It drastically shrinks memory consumption, remains cached in RAM, and completely eliminates write amplification on finished orders.

### GIN Indexes for Deep JSONB Documents
Standard B-Trees cannot index internal key paths or nested document values within a `JSONB` column. A **GIN** (*Generalized Inverted Index*) breaks down every internal JSON key-value pair into searchable inverted posting lists. Consequently, deep containment lookups like `attributes @> '{"brand": "Logitech"}'` execute in sub-milliseconds.

### Diagnosing EXPLAIN ANALYZE Execution Plans
- `Seq Scan`: Full sequential scan reading every page on disk (detrimental at scale).
- `Index Scan`: Traverses the index tree and performs random I/O reads on heap pages.
- `Bitmap Heap Scan`: Combines index pointers into an in-memory bitmap before fetching disk pages sequentially.
- `Buffers: shared hit`: Measures cache hits served directly from shared memory RAM buffers, avoiding disk latency.""",
            'beginnerId': """Bayangkan buku ensiklopedia 2.000 halaman. Jika Anda mencari kata 'Revolusi Industri' tanpa indeks di halaman belakang, Anda harus membalik halaman satu per satu dari halaman 1 (Sequential Scan). 

Indeks B-Tree seperti indeks alfabetis di buku. Partial Index seperti indeks khusus yang hanya mencatat bab-bab penting yang sedang diujikan besok pagi, sehingga buklet indeksnya hanya setebal 2 halaman dan bisa Anda kantongi dengan mudah.""",
            'beginnerEn': """Imagine a 2,000-page historical encyclopedia. If you search for 'Industrial Revolution' without an index, you must flip through every single page from page 1 to the end (Sequential Scan).

A B-Tree index is like the alphabetical index at the back. A Partial Index is like a pocket-sized cheat sheet indexing only the 3 exam chapters you need to review today, making it ultralight, lightning fast to consult, and easy to keep in memory.""",
            'experimentsId': [
                'Jalankan EXPLAIN ANALYZE sebelum dan sesudah membuat index GIN pada products dan bandingkan execution time-nya',
                'Coba buat index ekspresi UPPER(sku) dan uji apakah pencarian WHERE UPPER(sku) = \'LAPTOP-X1\' menggunakan index scan',
                'Inspeksi ukuran disk index menggunakan query pg_size_pretty(pg_relation_size(\'idx_products_attributes_gin\'))',
                'Buat skenario di mana PostgreSQL memilih Sequential Scan alih-alih Index Scan karena ukuran tabel sampel masih terlalu kecil'
            ],
            'experimentsEn': [
                'Execute EXPLAIN ANALYZE before and after creating the GIN index on products and observe the execution time variance',
                'Create an expression index on UPPER(sku) and verify if WHERE UPPER(sku) = \'LAPTOP-X1\' uses an Index Scan',
                'Inspect the physical index disk footprint using pg_size_pretty(pg_relation_size(\'idx_products_attributes_gin\'))',
                'Observe why the PostgreSQL query planner prefers a Sequential Scan when tables contain very few test rows'
            ],
            'challengeId': 'Buat trigram index menggunakan ekstensi `pg_trgm` pada kolom `products.title` dan gunakan `EXPLAIN ANALYZE` untuk membuktikan kecepatan pencarian teks fuzzy `ILIKE \'%think%\'`.',
            'challengeEn': 'Set up a trigram index using the `pg_trgm` extension on `products.title` and use `EXPLAIN ANALYZE` to demonstrate accelerated fuzzy text matching with `ILIKE \'%think%\'`.',
            'summaryId': 'Anda telah menguasai strategi indexing PostgreSQL: B-Tree composite, GIN untuk dokumen JSONB, optimasi partial index hemat memori, dan diagnosis performa query dengan EXPLAIN ANALYZE.',
            'summaryEn': 'You have mastered PostgreSQL indexing strategies: composite B-Trees, GIN for JSONB payloads, memory-efficient partial indexes, and execution profiling with EXPLAIN ANALYZE.'
        },

        # WEEK 5
        {
            'week': 5,
            'level': 'intermediate',
            'levelNameId': 'Konkurensi, Partisi & Arsitektur Enterprise',
            'levelNameEn': 'Concurrency, Partitioning & Enterprise Architecture',
            'topicId': 'transaksi-acid-isolation-level-dan-pessimistic-locking',
            'titleId': 'Transaksi ACID, Tingkat Isolasi & Pessimistic Locking',
            'titleEn': 'ACID Transactions, Isolation Levels & Pessimistic Locking',
            'language': 'sql',
            'programId': 'Checkout Aman dari Race Condition Menggunakan SELECT FOR UPDATE',
            'programEn': 'Race-Condition Proof Checkout using SELECT FOR UPDATE Row Locking',
            'code': """-- Demonstrate high-concurrency checkout preventing overselling
-- Transaction 1: Customer checkout workflow
BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- 1. Pessimistic Lock: Acquire exclusive row lock on the product to prevent concurrent race conditions
SELECT id, sku, title, price, stock_quantity
FROM products
WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
FOR UPDATE;

-- 2. Business Logic Validation in application layer:
-- Ensure stock_quantity >= requested_quantity (e.g. requested = 2)

-- 3. Deduct inventory safely
UPDATE products
SET stock_quantity = stock_quantity - 2
WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  AND stock_quantity >= 2;

-- 4. Create Order Record
INSERT INTO orders (id, customer_id, total_amount, status, shipping_address)
VALUES (
    gen_random_uuid(),
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    33000000.00,
    'PROCESSING',
    '{"street": "Sudirman No. 45", "city": "Jakarta", "postal_code": "10220"}'::jsonb
);

-- Commit atomically writes inventory deduction and order creation
COMMIT;

-- Demonstration of SKIP LOCKED for high-throughput background worker queue
BEGIN;
SELECT id, order_id, status
FROM orders
WHERE status = 'PROCESSING'
ORDER BY created_at ASC
LIMIT 1
FOR UPDATE SKIP LOCKED;

-- Worker processes the order...
UPDATE orders SET status = 'SHIPPED' WHERE id = '...';
COMMIT;
""",
            'objectivesId': [
                'Memahami empat pilar ACID (Atomicity, Consistency, Isolation, Durability) di PostgreSQL',
                'Membandingkan tingkat isolasi transaksi: Read Committed, Repeatable Read, dan Serializable',
                'Mencegah race condition (overselling stok) dengan Pessimistic Row-Level Locking (SELECT FOR UPDATE)',
                'Membangun sistem antrean job terdistribusi berkecepatan tinggi dengan SELECT FOR UPDATE SKIP LOCKED'
            ],
            'objectivesEn': [
                'Master the four ACID pillars (Atomicity, Consistency, Isolation, Durability) in PostgreSQL',
                'Compare transaction isolation levels: Read Committed, Repeatable Read, and Serializable',
                'Prevent concurrency race conditions (inventory overselling) with Pessimistic Locking (SELECT FOR UPDATE)',
                'Build resilient, lock-free background job queues using SELECT FOR UPDATE SKIP LOCKED'
            ],
            'explanationId': """### Prinsip ACID dan Jaminan Integritas Transaksi
- **Atomicity**: Seluruh statement di dalam blok `BEGIN ... COMMIT` berhasil bersamaan, atau jika terjadi kegagalan satu saja, seluruh perubahan dibatalkan sepenuhnya (`ROLLBACK`).
- **Consistency**: Transaksi membawa database dari satu kondisi valid ke kondisi valid lainnya sesuai seluruh constraint.
- **Isolation**: Menentukan seberapa terisolasi perubahan data yang sedang berlangsung dari transaksi konkuren lainnya.
- **Durability**: Sekali transaksi di-commit, datanya dijamin tersimpan permanen di disk melalui mekanisme Write-Ahead Log (WAL), bahkan jika server mati mendadak.

### Tingkat Isolasi (Isolation Levels)
1. `READ COMMITTED` (Default PostgreSQL): Transaksi hanya dapat membaca data yang sudah di-commit. Mencegah Dirty Read, namun rentan Non-Repeatable Read.
2. `REPEATABLE READ`: Menjamin snapshot data yang dibaca tetap konsisten dari awal transaksi hingga akhir. Mencegah Phantom Read di PostgreSQL.
3. `SERIALIZABLE`: Tingkat isolasi tertinggi. Menjamin hasil eksekusi transaksi konkuren setara dengan jika transaksi dijalankan satu per satu secara serial (menggunakan SSI / Serializable Snapshot Isolation).

### Pessimistic Locking dengan SELECT FOR UPDATE
Ketika flash sale berlangsung dengan ribuan permintaan checkout bersamaan untuk sisa 1 unit barang, dua request dapat membaca `stock = 1` secara paralel dan sama-sama mengizinkan pembelian. Klausa `SELECT ... FOR UPDATE` mengunci baris produk tersebut secara eksklusif. Request kedua dipaksa menunggu hingga transaksi pertama selesai (`COMMIT` atau `ROLLBACK`), sehingga pembeli kedua akan membaca sisa stok terkini (`stock = 0`) dan transaksi ditolak dengan aman.

### SKIP LOCKED untuk Job Worker Queue
Dalam arsitektur worker pengiriman pesanan, jika beberapa worker menjalankan `SELECT ... FOR UPDATE`, worker kedua akan terblokir menunggu worker pertama. Dengan menambahkan klausa `SKIP LOCKED`, worker kedua langsung melewati baris yang sedang dikerjakan worker pertama dan mengambil baris berikutnya tanpa jeda antrean sama sekali.""",
            'explanationEn': """### ACID Guarantees in PostgreSQL
- **Atomicity**: All operations within `BEGIN ... COMMIT` succeed atomically or roll back completely upon error (`ROLLBACK`).
- **Consistency**: Invariants and schema constraints are strictly enforced before and after state transitions.
- **Isolation**: Governs transaction visibility boundaries amidst concurrent executions.
- **Durability**: Once committed, changes are durably persisted to non-volatile disk storage via the Write-Ahead Log (WAL).

### Isolation Level Spectrum
1. `READ COMMITTED` (PostgreSQL Default): Only sees data committed before the query began. Eliminates Dirty Reads but permits Non-Repeatable Reads.
2. `REPEATABLE READ`: Freezes an immutable snapshot across the entire transaction lifespan, preventing phantom reads.
3. `SERIALIZABLE`: The strictest level. Guarantees that concurrent transactions produce identical results to strict serial execution using Serializable Snapshot Isolation (SSI).

### Concurrency Defense: SELECT FOR UPDATE
During high-traffic flash sales with remaining inventory of 1 unit, concurrent requests reading `stock = 1` simultaneously would both deduct inventory, plunging stock into negative numbers. `SELECT ... FOR UPDATE` acquires an exclusive row-level lock. Concurrent transactions attempting to inspect or modify that specific row are placed on hold until the lock-holding transaction commits.

### Non-Blocking Queues with SKIP LOCKED
When multiple background worker processes poll for pending jobs, `FOR UPDATE` causes idle workers to block on lock contention. Appending `SKIP LOCKED` instructs subsequent workers to skip currently locked rows and instantly claim the next available task, achieving zero-latency worker parallelization.""",
            'beginnerId': """Bayangkan Anda dan orang lain sedang berusaha membeli tiket konser sisa 1 kursi terakhir di loket yang sama pada detik yang persis sama. 

Tanpa kunci transaksi (`SELECT FOR UPDATE`), kasir bisa mencetak tiket ganda untuk kursi yang sama. Dengan `SELECT FOR UPDATE`, saat pembeli pertama menyentuh tombol kursi, sistem langsung memberi gembok virtual pada kursi tersebut. Pembeli kedua harus menunggu 2 detik sampai pembayaran pembeli pertama selesai dan melihat status kursi sudah 'Sold Out'.""",
            'beginnerEn': """Imagine you and another fan simultaneously trying to book the very last seat at a concert ticket counter.

Without pessimistic locking (`SELECT FOR UPDATE`), the ticketing agent could accidentally print two tickets for the exact same seat. With `SELECT FOR UPDATE`, the moment agent #1 clicks the seat, an exclusive virtual padlock locks onto it. Agent #2 is held for 2 seconds until agent #1 finishes payment, immediately seeing that the seat is now 'Sold Out'.""",
            'experimentsId': [
                'Buka dua terminal psql konkuren, jalankan BEGIN dan SELECT FOR UPDATE di terminal 1, lalu coba UPDATE baris yang sama di terminal 2 untuk melihat blocking lock',
                'Lakukan COMMIT di terminal 1 dan amati terminal 2 langsung terlepas dari lock',
                'Uji tingkat isolasi SERIALIZABLE dan sengaja picu serialisation_failure 40001 dengan modifikasi data silang',
                'Simulasikan worker antrean dengan 3 query konkuren menggunakan FOR UPDATE SKIP LOCKED'
            ],
            'experimentsEn': [
                'Open two concurrent psql sessions, run BEGIN and SELECT FOR UPDATE in session 1, then attempt updating the row in session 2 to witness lock contention',
                'Execute COMMIT in session 1 and observe session 2 immediately acquiring the lock and proceeding',
                'Test SERIALIZABLE isolation and intentionally provoke serialization failure 40001 via cross-modifications',
                'Simulate parallel task dispatching using concurrent FOR UPDATE SKIP LOCKED statements'
            ],
            'challengeId': 'Implementasikan sistem transfer saldo rekening bank antar dua nasabah (`accounts` table): gunakan `SELECT FOR UPDATE` dengan pengurutan ID akun yang konsisten (misal: lock ID terkecil dahulu baru ID terbesar) untuk mencegah terjadinya deadlock sistem.',
            'challengeEn': 'Implement a bank balance transfer transaction between two customers: use `SELECT FOR UPDATE` with strictly ordered account IDs (lock smaller ID first, then larger) to mathematically eliminate deadlock hazards.',
            'summaryId': 'Anda telah menguasai penanganan konkurensi data: prinsip ACID, spektrum isolation levels, pencegahan race condition dengan SELECT FOR UPDATE, dan antrean paralel tanpa blokir dengan SKIP LOCKED.',
            'summaryEn': 'You have mastered transactional concurrency: ACID foundations, isolation level nuances, race condition prevention via SELECT FOR UPDATE, and non-blocking worker pools with SKIP LOCKED.'
        },

        # WEEK 6
        {
            'week': 6,
            'level': 'intermediate',
            'levelNameId': 'Konkurensi, Partisi & Arsitektur Enterprise',
            'levelNameEn': 'Concurrency, Partitioning & Enterprise Architecture',
            'topicId': 'plpgsql-stored-procedures-dan-audit-triggers',
            'titleId': 'PL/pgSQL, Stored Procedures & Audit Triggers',
            'titleEn': 'PL/pgSQL, Stored Procedures & Audit Triggers',
            'language': 'sql',
            'programId': 'Sistem Audit Trail Finansial Otomatis Menggunakan Trigger PL/pgSQL',
            'programEn': 'Automated Financial Audit Trail System Using PL/pgSQL Triggers',
            'code': """-- 1. Create dedicated audit log table for tamper-evident tracking
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    operation VARCHAR(10) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
    record_id UUID NOT NULL,
    old_data JSONB,
    new_data JSONB,
    changed_by VARCHAR(100) NOT NULL DEFAULT CURRENT_USER,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. PL/pgSQL Function acting as trigger handler
CREATE OR REPLACE FUNCTION process_audit_log()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO audit_logs (table_name, operation, record_id, new_data)
        VALUES (TG_TABLE_NAME, TG_OP, NEW.id, to_jsonb(NEW));
        RETURN NEW;
    ELSIF (TG_OP = 'UPDATE') THEN
        -- Only record audit if values actually changed
        IF (NEW IS DISTINCT FROM OLD) THEN
            INSERT INTO audit_logs (table_name, operation, record_id, old_data, new_data)
            VALUES (TG_TABLE_NAME, TG_OP, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
        END IF;
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO audit_logs (table_name, operation, record_id, old_data)
        VALUES (TG_TABLE_NAME, TG_OP, OLD.id, to_jsonb(OLD));
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach trigger to products table for changes monitoring
DROP TRIGGER IF EXISTS trg_audit_products ON products;
CREATE TRIGGER trg_audit_products
AFTER INSERT OR UPDATE OR DELETE ON products
FOR EACH ROW EXECUTE FUNCTION process_audit_log();

-- 4. Stored Procedure for atomic bulk price adjustment with transaction control
CREATE OR REPLACE PROCEDURE bulk_adjust_prices(
    brand_filter TEXT, 
    percentage_increase NUMERIC
)
LANGUAGE plpgsql AS $$
DECLARE
    affected_rows INT;
BEGIN
    -- Update prices based on brand attribute
    UPDATE products
    SET price = ROUND(price * (1 + percentage_increase / 100), 2)
    WHERE attributes->>'brand' = brand_filter;

    GET DIAGNOSTICS affected_rows = ROW_COUNT;
    RAISE NOTICE 'Successfully updated prices for % products of brand %', affected_rows, brand_filter;
END;
$$;

-- Test invocation
CALL bulk_adjust_prices('Logitech', 10.0);

-- Query the audit logs to inspect changes
SELECT 
    id, table_name, operation, record_id, 
    old_data->>'price' AS old_price, 
    new_data->>'price' AS new_price, 
    changed_at
FROM audit_logs
ORDER BY id DESC;
""",
            'objectivesId': [
                'Memahami sintaks dan paradigma pemrograman prosedural PL/pgSQL',
                'Membangun trigger berbasis event (INSERT, UPDATE, DELETE) dengan variabel khusus TG_OP, NEW, dan OLD',
                'Menciptakan sistem Audit Trail finansial yang mencatat perubahan state dalam format JSONB',
                'Membedakan peran fungsi (RETURNS value) dengan Stored Procedure (CALL dengan manajemen transaksi)'
            ],
            'objectivesEn': [
                'Master syntax and procedural programming patterns in PL/pgSQL',
                'Implement event-driven triggers with contextual variables (TG_OP, NEW, OLD)',
                'Build a tamper-evident financial audit trail capturing state transitions in JSONB',
                'Distinguish functions (RETURNS value) from Stored Procedures (CALL with transaction control)'
            ],
            'explanationId': """### Bahasa Prosedural PL/pgSQL
PostgreSQL tidak hanya mendukung SQL deklaratif, namun juga memiliki bahasa prosedural bawaan yang kuat: **PL/pgSQL**. PL/pgSQL memungkinkan penulisan variabel, kondisional (`IF / ELSE`), perulangan (`LOOP`), penanganan eksepsi (`BEGIN ... EXCEPTION`), dan pemanggilan query dinamis langsung di dalam mesin database dengan latensi jaringan nol.

### Trigger dan Variabel Spesial
Trigger adalah fungsi yang dipicu secara otomatis oleh database ketika event modifikasi data terjadi (`BEFORE` atau `AFTER` operasi `INSERT`, `UPDATE`, atau `DELETE`). Di dalam body trigger, PostgreSQL menyediakan variabel kontekstual:
- `TG_OP`: Berisi string event aktif (`'INSERT'`, `'UPDATE'`, atau `'DELETE'`).
- `NEW`: Tuple baris baru yang sedang dimasukkan atau hasil modifikasi.
- `OLD`: Tuple baris lama sebelum operasi update atau delete dilakukan.
- `to_jsonb(NEW)`: Mengonversi seluruh baris data tabel menjadi objek JSONB secara instan.

### Function vs Stored Procedure
- **Function** (`CREATE FUNCTION ... RETURNS ...`): Dieksekusi melalui statement `SELECT`. Function tidak dapat memulai atau melakukan `COMMIT` transaksi secara mandiri karena ia harus terikat pada transaksi pemanggilnya.
- **Stored Procedure** (`CREATE PROCEDURE ...`): Diperkenalkan pada PostgreSQL 11 dan dipanggil menggunakan perintah `CALL`. Keunggulan utamanya adalah kemampuannya mengelola transaksi sendiri, seperti menjalankan loop batching besar dan melakukan `COMMIT` bertahap di tengah proses untuk mengosongkan memory lock.""",
            'explanationEn': """### Procedural Power with PL/pgSQL
PostgreSQL features an industrial procedural language: **PL/pgSQL**. It enables control structures (`IF/ELSE`), iterative loops (`FOR/WHILE`), exception handling (`BEGIN...EXCEPTION`), and dynamic SQL execution directly in memory within the database engine with zero network round-trip latency.

### Trigger Machinery and Contextual Variables
Triggers fire automatically when data modification events occur (`BEFORE` or `AFTER` on `INSERT`, `UPDATE`, or `DELETE`). PostgreSQL injects critical execution context into the runtime:
- `TG_OP`: Contains the triggering operation (`'INSERT'`, `'UPDATE'`, `'DELETE'`).
- `NEW`: Holds the incoming record payload for inserts/updates.
- `OLD`: Contains the previous record state prior to update/deletion.
- `to_jsonb(NEW)`: Serializes entire table rows into JSONB structures instantly.

### Functions vs Stored Procedures
- **Functions** (`CREATE FUNCTION ... RETURNS ...`): Invoked via `SELECT`. Functions cannot commit or roll back transactions independently because they execute within the transaction context of the invoking query.
- **Stored Procedures** (`CREATE PROCEDURE ...`): Introduced in PostgreSQL 11 and invoked via `CALL`. Their crucial differentiator is native transaction autonomy: procedures can commit batch updates iteratively during long-running bulk migrations to prevent transaction bloat.""",
            'beginnerId': """Bayangkan Stored Procedure seperti program robot pintar di dalam brankas bank. Alih-alih Anda bolak-balik mengirim 1.000 surat ke kasir bank untuk menaikkan harga 1.000 barang satu per satu (menghabiskan waktu perjalanan), Anda cukup mengirim satu perintah: 'Robot, naikkan semua harga barang merek Logitech sebesar 10%'. 

Trigger seperti kamera CCTV otomatis: setiap kali ada yang mengubah angka harga barang di etalase, kamera otomatis memotret harga lama dan harga baru lalu menyimpannya di buku catatan audit.""",
            'beginnerEn': """Think of a Stored Procedure like an automated robot residing inside the bank vault. Instead of dispatching 1,000 courier letters back and forth to update 1,000 prices individually (wasting network bandwidth), you dispatch a single master command: 'Robot, increase all Logitech prices by 10%'.

Triggers act like security surveillance cameras: whenever any staff member touches a price tag, the sensor snaps a photo of the old tag and new tag, instantly writing an indelible log to the audit ledger.""",
            'experimentsId': [
                'Lakukan UPDATE harga pada salah satu produk dan verifikasi bahwa baris baru otomatis tercatat di audit_logs',
                'Uji logika IS DISTINCT FROM dengan mengupdate nama produk dengan nilai yang sama persis dan amati bahwa trigger tidak mencatat log redundan',
                'Tambahkan exception handling pada procedure bulk_adjust_prices untuk membatalkan proses jika persentase kenaikan negatif',
                'Buat trigger BEFORE INSERT yang otomatis memformat teks sku menjadi huruf kapital UPPER()'
            ],
            'experimentsEn': [
                'Perform an UPDATE on a product price and verify that an entry is automatically appended to audit_logs',
                'Verify the IS DISTINCT FROM logic by updating a product with identical values to confirm redundant logging is bypassed',
                'Incorporate exception handling inside bulk_adjust_prices to abort if negative price percentages are supplied',
                'Construct a BEFORE INSERT trigger that automatically sanitizes product SKUs to UPPER() casing'
            ],
            'challengeId': 'Bangun sistem Soft Delete menggunakan trigger `BEFORE DELETE`: alih-alih menghapus baris secara fisik, trigger mengubah kolom `deleted_at = CURRENT_TIMESTAMP`, memindahkan data ke tabel riwayat arsip, dan mengembalikan `NULL` untuk membatalkan penghapusan fisik.',
            'challengeEn': 'Build a Soft Delete mechanism using a `BEFORE DELETE` trigger: instead of physically removing tuples, the trigger populates `deleted_at = CURRENT_TIMESTAMP`, archives previous states, and returns `NULL` to intercept physical deletion.',
            'summaryId': 'Anda telah menguasai logika server-side PostgreSQL: PL/pgSQL, arsitektur trigger otomatis untuk audit trail kepatuhan perbankan, dan Stored Procedures untuk eksekusi batching otonom.',
            'summaryEn': 'You have mastered PostgreSQL server-side logic: PL/pgSQL, event-driven triggers for financial regulatory audit trails, and Stored Procedures for autonomous batching workflows.'
        },

        # WEEK 7
        {
            'week': 7,
            'level': 'intermediate',
            'levelNameId': 'Konkurensi, Partisi & Arsitektur Enterprise',
            'levelNameEn': 'Concurrency, Partitioning & Enterprise Architecture',
            'topicId': 'table-partitioning-dan-optimasi-database-maintenance',
            'titleId': 'Declarative Partitioning, PgBouncer & Vacuum Tuning',
            'titleEn': 'Declarative Partitioning, PgBouncer & Vacuum Tuning',
            'language': 'sql',
            'programId': 'Implementasi Range Partitioning Berdasarkan Waktu dan Monitoring Vacuum MVCC',
            'programEn': 'Declarative Range Partitioning by Timestamp and MVCC Vacuum Monitoring',
            'code': """-- 1. Declarative Table Partitioning by Range (Date/Year)
DROP TABLE IF EXISTS telemetry_events CASCADE;

CREATE TABLE telemetry_events (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    device_id VARCHAR(50) NOT NULL,
    event_type VARCHAR(30) NOT NULL,
    payload JSONB NOT NULL,
    event_timestamp TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (id, event_timestamp) -- Partition key must be part of composite primary key
) PARTITION BY RANGE (event_timestamp);

-- 2. Create physical partition tables for specific quarterly ranges
CREATE TABLE telemetry_events_2026_q1 PARTITION OF telemetry_events
    FOR VALUES FROM ('2026-01-01 00:00:00+00') TO ('2026-04-01 00:00:00+00');

CREATE TABLE telemetry_events_2026_q2 PARTITION OF telemetry_events
    FOR VALUES FROM ('2026-04-01 00:00:00+00') TO ('2026-07-01 00:00:00+00');

CREATE TABLE telemetry_events_2026_q3 PARTITION OF telemetry_events
    FOR VALUES FROM ('2026-07-01 00:00:00+00') TO ('2026-10-01 00:00:00+00');

CREATE TABLE telemetry_events_default PARTITION OF telemetry_events DEFAULT;

-- Insert sample telemetry data across quarters
INSERT INTO telemetry_events (device_id, event_type, payload, event_timestamp) VALUES
('DEV-001', 'HEARTBEAT', '{"cpu": 12.4, "temp": 45}'::jsonb, '2026-02-15 10:00:00+00'),
('DEV-002', 'ALERT', '{"code": "VOLT_DROP"}'::jsonb, '2026-05-20 14:30:00+00');

-- 3. Verify Partition Pruning in execution plan: PostgreSQL scans ONLY q1 partition!
EXPLAIN (ANALYZE, COSTS OFF)
SELECT * FROM telemetry_events
WHERE event_timestamp >= '2026-02-01' AND event_timestamp < '2026-03-01';

-- 4. Monitor MVCC Dead Tuples and Autovacuum Health
SELECT 
    schemaname,
    relname AS table_name,
    n_live_tup AS live_tuples,
    n_dead_tup AS dead_tuples,
    ROUND(100.0 * n_dead_tup / NULLIF(n_live_tup + n_dead_tup, 0), 2) AS dead_tuple_ratio_pct,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;
""",
            'objectivesId': [
                'Merancang Declarative Table Partitioning (Range, List, Hash) untuk mengelola data berukuran ratusan gigabyte',
                'Membuktikan efektivitas Partition Pruning pada query optimizer PostgreSQL',
                'Memahami model penyimpanan MVCC (Multi-Version Concurrency Control) dan siklus hidup Dead Tuples',
                'Mengonfigurasi parameter Autovacuum dan arsitektur Connection Pooling dengan PgBouncer'
            ],
            'objectivesEn': [
                'Implement Declarative Table Partitioning (Range, List, Hash) for multi-terabyte datasets',
                'Verify Partition Pruning efficiency in the PostgreSQL query planner',
                'Understand MVCC (Multi-Version Concurrency Control) mechanics and dead tuple lifecycle',
                'Tune Autovacuum daemon thresholds and design connection pooling with PgBouncer'
            ],
            'explanationId': """### Mengapa Membutuhkan Table Partitioning?
Ketika sebuah tabel relasional membengkak melebihi puluhan juta baris atau ratusan gigabyte, ukuran index B-Tree tidak lagi muat di dalam RAM server (Buffer Pool). Akibatnya, setiap query pencarian memaksa operasi disk read I/O yang lambat. **Table Partitioning** memecah tabel logis tunggal menjadi beberapa tabel fisik yang lebih kecil tanpa mengubah cara aplikasi menulis query SQL.

### Partition Pruning: Efisiensi Pencarian Maksimal
Fitur **Partition Pruning** pada query optimizer secara otomatis membaca filter `WHERE` pada query Anda. Jika query mencari data bulan Februari 2026, PostgreSQL hanya akan memindai partisi `telemetry_events_2026_q1` dan sama sekali tidak menyentuh partisi kuartal lainnya. Hal ini memangkas waktu eksekusi hingga 90%+.

### Arsitektur MVCC dan Dead Tuples
PostgreSQL menggunakan model **MVCC** (*Multi-Version Concurrency Control*). Saat operasi `UPDATE` dijalankan, PostgreSQL tidak menimpa data lama di disk, melainkan menandai baris lama sebagai *dead tuple* dan menulis baris baru secara terpisah. Operasi `DELETE` hanya menandai baris sebagai tidak valid. Jika tidak dibersihkan, dead tuples menyebabkan fenomena *table bloat* (tabel membesar tanpa pertambahan data nyata).

### Autovacuum dan Connection Pooling PgBouncer
Proses latar belakang **Autovacuum** bertanggung jawab mereklamasi ruang kosong dari dead tuples agar dapat digunakan kembali oleh data baru. Di tingkat koneksi, setiap koneksi PostgreSQL mengonsumsi proses OS terpisah (~10MB RAM per koneksi). **PgBouncer** bertindak sebagai reverse proxy connection pooler ringan yang mengizinkan ribuan klien web konkuren dilayani hanya oleh puluhan koneksi database aktif.""",
            'explanationEn': """### The Imperative of Table Partitioning
When relational tables grow beyond tens of millions of records, index structures exceed the physical RAM capacity of the shared buffer pool. Every single lookup incurs expensive random disk I/O. **Declarative Partitioning** partitions a monolithic logical table into discrete physical storage partitions while keeping query interfaces completely transparent to applications.

### Partition Pruning Mechanics
**Partition Pruning** allows the query optimizer to analyze criteria in the `WHERE` clause. When searching for records within February 2026, the planner exclusively scans `telemetry_events_2026_q1`, completely bypassing all other seasonal partitions.

### MVCC and Dead Tuple Dynamics
PostgreSQL enforces ACID isolation through **MVCC** (*Multi-Version Concurrency Control*). An `UPDATE` does not mutate data in-place; it marks the original row as a *dead tuple* and inserts a fresh version. `DELETE` merely marks rows as dead. Without rigorous maintenance, dead tuples trigger catastrophic table bloat.

### Autovacuum Tuning and PgBouncer Pooling
The **Autovacuum** daemon cleans dead tuples, reclaiming space for incoming writes and updating query statistics. At the transport layer, each PostgreSQL client connection spawns a distinct backend OS process consuming significant memory. **PgBouncer** acts as a lightweight connection pooler, multiplexing thousands of concurrent client requests over a compact pool of server connections.""",
            'beginnerId': """Bayangkan Anda menyimpan struk belanja selama 10 tahun di dalam satu kotak kardus raksasa. Jika Anda ingin mencari struk bulan lalu, Anda harus mengaduk-aduk ribuan struk berdebu selama berjam-jam. 

Table Partitioning seperti membagi struk ke dalam map terpisah: Map 2024, Map 2025, Map 2026. Saat mencari struk 2026, Anda langsung mengambil Map 2026 saja (Partition Pruning). Sedangkan Autovacuum seperti petugas kebersihan yang setiap malam menyapu struk yang sudah robek dan dibatalkan agar kotak tidak kepenuhan sampah.""",
            'beginnerEn': """Imagine storing 10 years of shopping receipts inside one gigantic cardboard box. Looking for a receipt from last week requires rummaging through tens of thousands of dusty slips for hours.

Table Partitioning organizes receipts into labeled binders by quarter: Binder Q1, Q2, Q3. When searching for March records, you pull Binder Q1 off the shelf, completely ignoring the rest (Partition Pruning). Autovacuum is like the night cleaning crew shredding cancelled vouchers so your physical binders never overflow.""",
            'experimentsId': [
                'Jalankan EXPLAIN pada query partisi dan amati keterangan "Filter: ... Partitions: telemetry_events_2026_q1"',
                'Lakukan 1.000 kali UPDATE berturut-turut pada satu baris dan amati pertambahan n_dead_tup pada tabel pg_stat_user_tables',
                'Jalankan VACUUM (VERBOSE, ANALYZE) secara manual dan perhatikan pembersihan dead tuples di statistik',
                'Buat skenario drop partition instan dengan DROP TABLE telemetry_events_2026_q1 dan bandingkan kecepatannya dibanding DELETE jutaan baris'
            ],
            'experimentsEn': [
                'Execute EXPLAIN on a partitioned query and verify pruning text: "Partitions: telemetry_events_2026_q1"',
                'Perform 1,000 iterative UPDATEs on a single row and witness the surge of n_dead_tup in pg_stat_user_tables',
                'Execute manual VACUUM (VERBOSE, ANALYZE) and verify the dead tuple reclamation in database statistics',
                'Simulate instant partition dropping via DROP TABLE telemetry_events_2026_q1 and compare its speed against DELETE'
            ],
            'challengeId': 'Konfigurasi skema partisi Hash (`PARTITION BY HASH (customer_id)`) menjadi 4 partisi seimbang (`MODULUS 4`) untuk mendistribusikan beban I/O transaksi e-commerce multi-tenant secara merata.',
            'challengeEn': 'Configure a Hash Partitioning schema (`PARTITION BY HASH (customer_id)`) across 4 balanced shards (`MODULUS 4`) to evenly distribute transaction I/O load across a multi-tenant platform.',
            'summaryId': 'Anda telah menguasai arsitektur database skala besar: Declarative Table Partitioning, Partition Pruning, pemahaman siklus MVCC dan Autovacuum, serta skalabilitas koneksi dengan PgBouncer.',
            'summaryEn': 'You have mastered enterprise database scaling: Declarative Table Partitioning, Partition Pruning, MVCC dead tuple lifecycles, Autovacuum tuning, and connection pooling with PgBouncer.'
        },

        # WEEK 8 - CAPSTONE
        {
            'week': 8,
            'level': 'intermediate',
            'levelNameId': 'Konkurensi, Partisi & Arsitektur Enterprise',
            'levelNameEn': 'Concurrency, Partitioning & Enterprise Architecture',
            'topicId': 'capstone-high-concurrency-ecommerce-relational-engine',
            'titleId': 'Capstone Project: High-Concurrency E-Commerce Relational Engine',
            'titleEn': 'Capstone Project: High-Concurrency E-Commerce Relational Engine',
            'language': 'sql',
            'programId': 'Engine E-Commerce Lengkap: Partisi Transaksi, Locking Stok Flash Sale & Audit Trail',
            'programEn': 'Full E-Commerce Engine: Transaction Partitioning, Flash Sale Stock Locking & Audit Trail',
            'code': """-- CAPSTONE: High-Concurrency E-Commerce Relational Engine
-- Integrates UUID, JSONB, Window Analytics, PL/pgSQL Triggers, Partitioning, and Locking

-- 1. Partitioned Orders Table by Year
CREATE TABLE IF NOT EXISTS orders_engine (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL,
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00 CHECK (total_amount >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (status IN ('PENDING', 'PROCESSING', 'PAID', 'SHIPPED', 'CANCELLED')),
    checkout_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

CREATE TABLE IF NOT EXISTS orders_engine_2026 PARTITION OF orders_engine
    FOR VALUES FROM ('2026-01-01 00:00:00+00') TO ('2027-01-01 00:00:00+00');

-- 2. Stored Procedure for Atomic Flash-Sale Purchase Execution
CREATE OR REPLACE PROCEDURE execute_checkout(
    p_customer_id UUID,
    p_product_id UUID,
    p_quantity INT,
    OUT p_order_id UUID,
    OUT p_status_code TEXT
)
LANGUAGE plpgsql AS $$
DECLARE
    v_available_stock INT;
    v_unit_price NUMERIC(12, 2);
    v_total NUMERIC(14, 2);
    v_new_order_id UUID;
BEGIN
    -- Step A: Pessimistic Row Lock on Product
    SELECT stock_quantity, price 
    INTO v_available_stock, v_unit_price
    FROM products
    WHERE id = p_product_id
    FOR UPDATE;

    IF NOT FOUND THEN
        p_status_code := 'PRODUCT_NOT_FOUND';
        RETURN;
    END IF;

    -- Step B: Validate Inventory
    IF v_available_stock < p_quantity THEN
        p_status_code := 'INSUFFICIENT_STOCK';
        RETURN;
    END IF;

    -- Step C: Deduct Stock Atomically
    UPDATE products
    SET stock_quantity = stock_quantity - p_quantity
    WHERE id = p_product_id;

    -- Step D: Create Partitioned Order
    v_total := v_unit_price * p_quantity;
    v_new_order_id := gen_random_uuid();

    INSERT INTO orders_engine (id, customer_id, total_amount, status, checkout_metadata, created_at)
    VALUES (
        v_new_order_id,
        p_customer_id,
        v_total,
        'PAID',
        jsonb_build_object('product_id', p_product_id, 'quantity', p_quantity, 'ip', '192.168.1.100'),
        CURRENT_TIMESTAMP
    );

    p_order_id := v_new_order_id;
    p_status_code := 'SUCCESS';
END;
$$;

-- 3. Executive Dashboard View utilizing Window Functions
CREATE OR REPLACE VIEW v_executive_sales_summary AS
WITH daily_metrics AS (
    SELECT 
        DATE_TRUNC('day', created_at)::DATE AS sales_date,
        COUNT(id) AS daily_transactions,
        SUM(total_amount) AS daily_revenue
    FROM orders_engine
    WHERE status = 'PAID'
    GROUP BY DATE_TRUNC('day', created_at)
)
SELECT 
    sales_date,
    daily_transactions,
    daily_revenue,
    SUM(daily_revenue) OVER (ORDER BY sales_date ASC) AS running_cumulative_revenue,
    ROUND(
        daily_revenue - AVG(daily_revenue) OVER (
            ORDER BY sales_date ASC ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ), 2
    ) AS delta_from_7day_moving_avg
FROM daily_metrics;

-- 4. Verification queries
SELECT * FROM v_executive_sales_summary;
""",
            'objectivesId': [
                'Mengintegrasikan seluruh materi arsitektur PostgreSQL dalam sebuah capstone engine e-commerce production-grade',
                'Mengimplementasikan Stored Procedure transaksi checkout atomic dengan validasi locking dan output parameters',
                'Menggabungkan Declarative Partitioning dengan reporting view analitik berbasis Window Functions',
                'Memastikan sistem tahan terhadap race condition stok dan siap melayani throughput transaksi tinggi'
            ],
            'objectivesEn': [
                'Synthesize all architectural PostgreSQL disciplines into a production-grade e-commerce engine capstone',
                'Implement an atomic checkout Stored Procedure with pessimistic locking and OUT parameters',
                'Harmonize Declarative Table Partitioning with high-velocity Window Analytics views',
                'Ensure bulletproof concurrency defenses against inventory overselling under high concurrency'
            ],
            'explanationId': """### Arsitektur Capstone E-Commerce Relational Engine
Proyek capstone ini mensintesiskan seluruh kapabilitas enterprise PostgreSQL ke dalam satu arsitektur terpadu:
1. **Pemisahan Partisi Fisik (`PARTITION BY RANGE`)**: Seluruh jutaan transaksi historis terdistribusi ke partisi tahunan tanpa mengorbankan integritas kunci komposit.
2. **Keamanan Konkurensi Prosedural**: Stored Procedure `execute_checkout` mengisolasi seluruh logika pengurangan inventaris dan pembuatan order dalam satu batas transaksi aman. Penggunaan `FOR UPDATE` menjamin tidak akan terjadi *overselling* meskipun ratusan checkout diproses bersamaan.
3. **Dokumentasi Metadata Fleksibel**: Kolom `checkout_metadata` berbasis `JSONB` menyimpan snapshot audit pembelian dan IP klien tanpa perlu perubahan skema.
4. **Analitik Eksekutif Real-Time**: View `v_executive_sales_summary` menggunakan window frames `7 PRECEDING` untuk menghitung pergerakan tren omzet harian secara instan.""",
            'explanationEn': """### Capstone E-Commerce Engine Architecture
This capstone project synthesizes enterprise PostgreSQL capabilities into a coherent, industrial-grade relational system:
1. **Physical Partitioning (`PARTITION BY RANGE`)**: High-velocity order volumes are segmented into annual storage partitions without compromising primary key uniqueness.
2. **Procedural Concurrency Defense**: The `execute_checkout` procedure encapsulates inventory deduction and order generation within an isolated transaction boundary. `FOR UPDATE` row locks eliminate race hazards during high-concurrency peak events.
3. **Flexible JSONB Metadata**: The `checkout_metadata` column persists audit snapshots and client details without triggering schema migrations.
4. **Real-Time Executive Analytics**: The `v_executive_sales_summary` view utilizes sliding analytical window frames (`7 PRECEDING`) to calculate moving average volatility and cumulative revenue in real time.""",
            'beginnerId': """Selamat! Anda telah membangun sistem inti toko online sekelas e-commerce besar. Mulai dari penyimpanan data rapi (tabel partisi), kasir cerdas yang tidak pernah salah hitung barang (Stored Procedure checkout), perlindungan gembok agar barang tidak dijual dua kali (pessimistic locking), hingga layar dashboard bos yang otomatis menghitung omzet harian (Window Function View).""",
            'beginnerEn': """Congratulations! You have constructed the core engine of an enterprise-tier e-commerce platform. From partitioned storage, to an atomic checkout procedure, to locking padlocks preventing double-spending, up to an automated executive analytics dashboard powered by window functions.""",
            'experimentsId': [
                'Panggil procedure execute_checkout dengan kuantitas yang melebihi sisa stok dan periksa kode status INSUFFICIENT_STOCK',
                'Gunakan fungsi pg_sleep() di dalam procedure untuk menguji perilaku locking transaksi secara langsung',
                'Kembangkan view v_executive_sales_summary dengan menambahkan metrik DENSE_RANK() hari dengan omzet tertinggi',
                'Jalankan EXPLAIN ANALYZE pada query view untuk melihat efisiensi scanning partisi'
            ],
            'experimentsEn': [
                'Invoke procedure execute_checkout with quantity exceeding inventory and verify status INSUFFICIENT_STOCK',
                'Inject pg_sleep() inside the procedure to inspect concurrent locking mechanics interactively',
                'Enhance v_executive_sales_summary by incorporating DENSE_RANK() for peak revenue days',
                'Run EXPLAIN ANALYZE on the executive view to inspect partition pruning efficiency'
            ],
            'challengeId': 'Perluas capstone engine dengan menambahkan sistem voucher diskon: tabel `vouchers` dengan limit kuota pemakaian, dan modifikasi procedure `execute_checkout` agar mengunci voucher dengan `FOR UPDATE`, memvalidasi tanggal aktif, dan mengurangi kuota voucher secara atomic.',
            'challengeEn': 'Extend the capstone engine with a promotional voucher mechanism: create a `vouchers` table with quota caps, and modify `execute_checkout` to lock the voucher via `FOR UPDATE`, validate expiration, and deduct quota atomically.',
            'summaryId': 'Selamat! Anda telah menyelesaikan seluruh kurikulum PostgreSQL dari pemodelan relasional dasar hingga arsitektur enterprise: UUID, JSONB, CTE, Window Functions, B-Tree & GIN Indexes, Concurrency Locking, PL/pgSQL Triggers, Partitioning, dan Capstone E-Commerce Engine.',
            'summaryEn': 'Congratulations! You have completed the entire PostgreSQL curriculum from foundations to enterprise architecture: UUID, JSONB, CTEs, Window Functions, B-Tree & GIN Indexing, Concurrency Locking, PL/pgSQL Triggers, Partitioning, and a Capstone E-Commerce Engine.'
        }
    ]

    return {
        'slug': 'postgresql',
        'track_name': 'PostgreSQL',
        'levels': levels,
        'modules': modules
    }
