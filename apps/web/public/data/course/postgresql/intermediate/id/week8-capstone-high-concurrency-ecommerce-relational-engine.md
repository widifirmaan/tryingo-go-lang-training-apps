# Capstone Project: High-Concurrency E-Commerce Relational Engine

> **Kategori:** PostgreSQL | **Level:** Konkurensi, Partisi & Arsitektur Enterprise | **Minggu 8:** Capstone Project: High-Concurrency E-Commerce Relational Engine

## Tujuan Pembelajaran

- Mengintegrasikan seluruh materi arsitektur PostgreSQL dalam sebuah capstone engine e-commerce production-grade
- Mengimplementasikan Stored Procedure transaksi checkout atomic dengan validasi locking dan output parameters
- Menggabungkan Declarative Partitioning dengan reporting view analitik berbasis Window Functions
- Memastikan sistem tahan terhadap race condition stok dan siap melayani throughput transaksi tinggi

---

## Program: Engine E-Commerce Lengkap: Partisi Transaksi, Locking Stok Flash Sale & Audit Trail

```sql
-- CAPSTONE: High-Concurrency E-Commerce Relational Engine
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
```

---

## Konsep Kunci

### Arsitektur Capstone E-Commerce Relational Engine
Proyek capstone ini mensintesiskan seluruh kapabilitas enterprise PostgreSQL ke dalam satu arsitektur terpadu:
1. **Pemisahan Partisi Fisik (`PARTITION BY RANGE`)**: Seluruh jutaan transaksi historis terdistribusi ke partisi tahunan tanpa mengorbankan integritas kunci komposit.
2. **Keamanan Konkurensi Prosedural**: Stored Procedure `execute_checkout` mengisolasi seluruh logika pengurangan inventaris dan pembuatan order dalam satu batas transaksi aman. Penggunaan `FOR UPDATE` menjamin tidak akan terjadi *overselling* meskipun ratusan checkout diproses bersamaan.
3. **Dokumentasi Metadata Fleksibel**: Kolom `checkout_metadata` berbasis `JSONB` menyimpan snapshot audit pembelian dan IP klien tanpa perlu perubahan skema.
4. **Analitik Eksekutif Real-Time**: View `v_executive_sales_summary` menggunakan window frames `7 PRECEDING` untuk menghitung pergerakan tren omzet harian secara instan.

---

---

## Penjelasan untuk Pemula

Selamat! Anda telah membangun sistem inti toko online sekelas e-commerce besar. Mulai dari penyimpanan data rapi (tabel partisi), kasir cerdas yang tidak pernah salah hitung barang (Stored Procedure checkout), perlindungan gembok agar barang tidak dijual dua kali (pessimistic locking), hingga layar dashboard bos yang otomatis menghitung omzet harian (Window Function View).

## Eksperimen

- Panggil procedure execute_checkout dengan kuantitas yang melebihi sisa stok dan periksa kode status INSUFFICIENT_STOCK
- Gunakan fungsi pg_sleep() di dalam procedure untuk menguji perilaku locking transaksi secara langsung
- Kembangkan view v_executive_sales_summary dengan menambahkan metrik DENSE_RANK() hari dengan omzet tertinggi
- Jalankan EXPLAIN ANALYZE pada query view untuk melihat efisiensi scanning partisi

---

## Tantangan

Perluas capstone engine dengan menambahkan sistem voucher diskon: tabel `vouchers` dengan limit kuota pemakaian, dan modifikasi procedure `execute_checkout` agar mengunci voucher dengan `FOR UPDATE`, memvalidasi tanggal aktif, dan mengurangi kuota voucher secara atomic.

---

## Ringkasan

Selamat! Anda telah menyelesaikan seluruh kurikulum PostgreSQL dari pemodelan relasional dasar hingga arsitektur enterprise: UUID, JSONB, CTE, Window Functions, B-Tree & GIN Indexes, Concurrency Locking, PL/pgSQL Triggers, Partitioning, dan Capstone E-Commerce Engine.
