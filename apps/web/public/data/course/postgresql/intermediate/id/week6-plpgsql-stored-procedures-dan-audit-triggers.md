# PL/pgSQL, Stored Procedures & Audit Triggers

> **Kategori:** PostgreSQL | **Level:** Konkurensi, Partisi & Arsitektur Enterprise | **Minggu 6:** PL/pgSQL, Stored Procedures & Audit Triggers

## Tujuan Pembelajaran

- Memahami sintaks dan paradigma pemrograman prosedural PL/pgSQL
- Membangun trigger berbasis event (INSERT, UPDATE, DELETE) dengan variabel khusus TG_OP, NEW, dan OLD
- Menciptakan sistem Audit Trail finansial yang mencatat perubahan state dalam format JSONB
- Membedakan peran fungsi (RETURNS value) dengan Stored Procedure (CALL dengan manajemen transaksi)

---

## Program: Sistem Audit Trail Finansial Otomatis Menggunakan Trigger PL/pgSQL

```sql
-- 1. Create dedicated audit log table for tamper-evident tracking
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
```

---

## Konsep Kunci

### Bahasa Prosedural PL/pgSQL
PostgreSQL tidak hanya mendukung SQL deklaratif, namun juga memiliki bahasa prosedural bawaan yang kuat: **PL/pgSQL**. PL/pgSQL memungkinkan penulisan variabel, kondisional (`IF / ELSE`), perulangan (`LOOP`), penanganan eksepsi (`BEGIN ... EXCEPTION`), dan pemanggilan query dinamis langsung di dalam mesin database dengan latensi jaringan nol.

### Trigger dan Variabel Spesial
Trigger adalah fungsi yang dipicu secara otomatis oleh database ketika event modifikasi data terjadi (`BEFORE` atau `AFTER` operasi `INSERT`, `UPDATE`, atau `DELETE`). Di dalam body trigger, PostgreSQL menyediakan variabel kontekstual:
- `TG_OP`: Berisi string event aktif (`'INSERT'`, `'UPDATE'`, atau `'DELETE'`).
- `NEW`: Tuple baris baru yang sedang dimasukkan atau hasil modifikasi.
- `OLD`: Tuple baris lama sebelum operasi update atau delete dilakukan.
- `to_jsonb(NEW)`: Mengonversi seluruh baris data tabel menjadi objek JSONB secara instan.

### Function vs Stored Procedure
- **Function** (`CREATE FUNCTION ... RETURNS ...`): Dieksekusi melalui statement `SELECT`. Function tidak dapat memulai atau melakukan `COMMIT` transaksi secara mandiri karena ia harus terikat pada transaksi pemanggilnya.
- **Stored Procedure** (`CREATE PROCEDURE ...`): Diperkenalkan pada PostgreSQL 11 dan dipanggil menggunakan perintah `CALL`. Keunggulan utamanya adalah kemampuannya mengelola transaksi sendiri, seperti menjalankan loop batching besar dan melakukan `COMMIT` bertahap di tengah proses untuk mengosongkan memory lock.

---

---

## Penjelasan untuk Pemula

Bayangkan Stored Procedure seperti program robot pintar di dalam brankas bank. Alih-alih Anda bolak-balik mengirim 1.000 surat ke kasir bank untuk menaikkan harga 1.000 barang satu per satu (menghabiskan waktu perjalanan), Anda cukup mengirim satu perintah: 'Robot, naikkan semua harga barang merek Logitech sebesar 10%'. 

Trigger seperti kamera CCTV otomatis: setiap kali ada yang mengubah angka harga barang di etalase, kamera otomatis memotret harga lama dan harga baru lalu menyimpannya di buku catatan audit.

## Eksperimen

- Lakukan UPDATE harga pada salah satu produk dan verifikasi bahwa baris baru otomatis tercatat di audit_logs
- Uji logika IS DISTINCT FROM dengan mengupdate nama produk dengan nilai yang sama persis dan amati bahwa trigger tidak mencatat log redundan
- Tambahkan exception handling pada procedure bulk_adjust_prices untuk membatalkan proses jika persentase kenaikan negatif
- Buat trigger BEFORE INSERT yang otomatis memformat teks sku menjadi huruf kapital UPPER()

---

## Tantangan

Bangun sistem Soft Delete menggunakan trigger `BEFORE DELETE`: alih-alih menghapus baris secara fisik, trigger mengubah kolom `deleted_at = CURRENT_TIMESTAMP`, memindahkan data ke tabel riwayat arsip, dan mengembalikan `NULL` untuk membatalkan penghapusan fisik.

---

## Ringkasan

Anda telah menguasai logika server-side PostgreSQL: PL/pgSQL, arsitektur trigger otomatis untuk audit trail kepatuhan perbankan, dan Stored Procedures untuk eksekusi batching otonom.
