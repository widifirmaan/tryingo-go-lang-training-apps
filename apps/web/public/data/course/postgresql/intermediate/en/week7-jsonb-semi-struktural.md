# JSONB Semi-Struktural — Kardus Campur

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 7:** JSONB Semi-Struktural

## Tujuan Pembelajaran

- `JSONB` kolom fleksibel seperti Mongo: `data JSONB`, `->>` ambil teks, `GIN` index

---

## Kenapa Ini Penting Buat Kamu?

Produk warung kadang ada `warna`, kadang tidak — `JSONB` tidak perlu `ALTER TABLE` tiap tambah field.

---

## Program: Kardus Campur

```sql
CREATE TABLE produk_fleksibel (
  id SERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  data JSONB
);

INSERT INTO produk_fleksibel (nama, data) VALUES
  ('Beras', '{"harga": 62000, "stok": 10}'),
  ('Bayam', '{"harga": 5000, "warna": "hijau"}');

SELECT nama, data->>'harga' AS harga FROM produk_fleksibel;
SELECT * FROM produk_fleksibel WHERE data->>'warna' = 'hijau';
CREATE INDEX idx_data_harga ON produk_fleksibel USING GIN (data);
```

---

## Ringkasan

Minggu 7: **Kardus Campur** — JSONB fleksibel.
