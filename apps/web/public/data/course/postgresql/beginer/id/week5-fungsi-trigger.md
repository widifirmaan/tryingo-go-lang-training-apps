# Fungsi & Trigger

> **Kategori:** PostgreSQL | **Level:** Pemula | **Minggu 5:** Fungsi & Trigger

## Tujuan Pembelajaran

- CREATE FUNCTION dengan parameter
- RETURNS TABLE
- Trigger function
- PL/pgSQL: IF/ELSE, RAISE
- DEFAULT parameter

---

## Program: PL/pgSQL Dasar

```sql
CREATE OR REPLACE FUNCTION hitung_total_pajak(
    harga DECIMAL, persen_pajak DECIMAL DEFAULT 11
) RETURNS DECIMAL AS $$
BEGIN
    RETURN harga + (harga * persen_pajak / 100);
END;
$$ LANGUAGE plpgsql;

SELECT nama, harga, hitung_total_pajak(harga) FROM produk;

CREATE OR REPLACE FUNCTION produk_by_kategori(kat VARCHAR)
RETURNS TABLE(id INTEGER, nama VARCHAR, harga DECIMAL) AS $$
BEGIN
    RETURN QUERY SELECT p.id, p.nama, p.harga FROM produk p WHERE p.kategori = kat;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM produk_by_kategori('Elektronik');

CREATE OR REPLACE FUNCTION kurangi_stok() RETURNS TRIGGER AS $$
BEGIN
    UPDATE produk SET stok = stok - NEW.jumlah WHERE id = NEW.produk_id;
    IF (SELECT stok FROM produk WHERE id = NEW.produk_id) < 0 THEN
        RAISE EXCEPTION 'Stok tidak cukup';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_kurangi_stok AFTER INSERT ON detail_pesanan
    FOR EACH ROW EXECUTE FUNCTION kurangi_stok();
```

---

## Konsep Kunci

### CREATE FUNCTION
Fungsi tersimpan di database.

### RETURNS TABLE
Mengembalikan set baris.

### Trigger
Fungsi otomatis saat event.

### PL/pgSQL
DECLARE, IF/ELSE, RAISE.

### RAISE EXCEPTION
Hentikan eksekusi dengan error.

---

## Eksperimen

- Fungsi diskon
- Audit log trigger
- BEFORE vs AFTER
- LOOP untuk laporan

---

## Tantangan

Sistem trigger: auto-update stok, audit log, validasi.

---

## Ringkasan

Minggu 5 dari 10: **Fungsi & Trigger** (Pemula).
