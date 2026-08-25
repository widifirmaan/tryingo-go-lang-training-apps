# Index & Optimasi — Daftar Isi Biar Cari Cepat

> **Kategori:** PostgreSQL | **Level:** Pemula | **Minggu 4:** Index & Optimasi

## Tujuan Pembelajaran

- `CREATE INDEX` — daftar isi buku, cari `WHERE email = '...'` dari 1 detik jadi 0.01 detik
- `EXPLAIN` lihat rencana: `Seq Scan` (baca semua) vs `Index Scan` (loncat)
- Kapan index: kolom sering `WHERE/JOIN/ORDER BY`, jangan di kolom jarang

---

## Kenapa Ini Penting Buat Kamu?

Gudang 10 baris tidak terasa. 100 ribu baris, cari `email` tanpa index = baca semua kardus. Dengan index = buka daftar isi langsung ke rak.

---

## Program: Index Warung

```sql
-- Tanpa index: cari email harus baca semua (Seq Scan)
EXPLAIN SELECT * FROM pelanggan WHERE email = 'siti@email.com';

-- Bikin index (daftar isi)
CREATE INDEX idx_pelanggan_email ON pelanggan(email);
CREATE INDEX idx_produk_kategori ON produk(kategori);

-- Sekarang cari lagi → Index Scan (cepat)
EXPLAIN SELECT * FROM pelanggan WHERE email = 'siti@email.com';

-- Index untuk JOIN cepat
CREATE INDEX idx_pesanan_pelanggan ON pesanan(pelanggan_id);

-- Lihat index yang ada
SELECT indexname FROM pg_indexes WHERE tablename = 'pelanggan';

-- Hapus jika tidak perlu (hemat tulis)
DROP INDEX idx_produk_kategori;

-- Tips: jangan index semua! Tiap INSERT jadi lambat (harus update daftar isi)
```

---

## Konsep Kunci

### Index = Daftar Isi
Tanpa index: baca halaman 1-300. Dengan index: buka daftar isi → halaman 42.

### `EXPLAIN` = Rencana
`EXPLAIN SELECT ...` tampilkan `Seq Scan` vs `Index Scan` + cost.

### Kapan Index
- Sering `WHERE email`, `JOIN pelanggan_id`, `ORDER BY harga` → index
- Kolom `kota` jarang saring → tidak perlu.

---

## Penjelasan untuk Pemula

### Analogi: Buku Telepon

- **Tanpa index = cari nama dengan baca tiap halaman**.
- **Dengan index = daftar isi abjad**: cari "Siti" → S → halaman 200.

---

## Eksperimen

- **Hijau:** `EXPLAIN` sebelum & sesudah `CREATE INDEX` → cost turun?
- **Kuning:** `DROP INDEX` → `EXPLAIN` balik `Seq Scan`?
- **Merah:** Bikin index di `stok` yang jarang WHERE → tulis `INSERT` jadi lebih lambat (cek waktu).

---

## Tantangan

**Perpustakaan:** `CREATE INDEX idx_buku_judul ON buku(judul)` → `EXPLAIN SELECT * FROM buku WHERE judul LIKE 'Java%'` → Index Scan? Tambah `idx_anggota_email`.

---

## Glosarium Mini

- **Index**: daftar isi
- **EXPLAIN**: rencana
- **Seq/Index Scan**: baca semua/loncat

---

## Ringkasan

Minggu 4: **Index** — gudang besar tetap cepat. Selesai Beginner DB! Minggu depan: **Fungsi & Trigger** (Menengah).
