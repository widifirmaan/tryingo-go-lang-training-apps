# JSONB Semi-Struktural — Kardus Campur

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 7:** JSONB Semi-Struktural
> **Prasyarat:** Minggu 6 — **Window Functions**.

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

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**JSONB Semi-Struktural di Warungmu:** pakai `produk_fleksibel` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `produk_fleksibel`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Window Functions** (Minggu 6): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 7: **Kardus Campur** — JSONB fleksibel. Minggu depan: **Performa Tuning**.
