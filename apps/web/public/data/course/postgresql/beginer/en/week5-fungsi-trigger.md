# Functions & Triggers

> **Kategori:** PostgreSQL | **Level:** Beginner | **Minggu 5:** Functions & Triggers

## Learning Objectives

- CREATE FUNCTION
- RETURNS TABLE
- Trigger
- PL/pgSQL: IF/ELSE
- DEFAULT params

---

## Program: PL/pgSQL Basics

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

## Key Concepts

### CREATE FUNCTION
Stored function.

### RETURNS TABLE
Returns row set.

### Trigger
Auto-executed on events.

### PL/pgSQL
DECLARE, IF/ELSE, RAISE.

### RAISE EXCEPTION
Stop with error.

---

## Experiments

- Discount function
- Audit trigger
- BEFORE vs AFTER
- LOOP for reports

---

## Challenge

Trigger system: auto stock, audit log, validation.

---

## Summary

Week 5 of 10: **Functions & Triggers** (Beginner).
