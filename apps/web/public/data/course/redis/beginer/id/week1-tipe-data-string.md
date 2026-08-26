# Redis String — Laci Cepat

> **Kategori:** Redis | **Level:** Pemula | **Minggu 1:** Tipe Data String

## Tujuan Pembelajaran

- Redis = **laci cepat di meja** (RAM), bukan gudang (disk) — baca 0.1ms
- `SET nama "Budi"`, `GET nama`, `INCR counter`, `EXPIRE key 60` kadaluarsa
- `MSET/MGET` banyak sekaligus

---

## Kenapa Ini Penting Buat Kamu?

Keranjang belanja, sesi login, cache harga — butuh laci yang buka tutup super cepat, tidak perlu gudang berat.

---

## Program: Laci Cepat

Jalankan di `try.redis.io` atau `docker run -p 6379:6379 redis`.

```bash
SET pelanggan:1:nama "Budi"
GET pelanggan:1:nama
SET counter:pengunjung 0
INCR counter:pengunjung # +1
INCRBY counter:pengunjung 5 # +5
EXPIRE counter:pengunjung 60 # hilang 60 detik
TTL counter:pengunjung

MSET produk:1:harga 62000 produk:1:stok 10
MGET produk:1:harga produk:1:stok

SET stok:beras 10
DECR stok:beras # jual 1 → 9
GET stok:beras
```

---

## Konsep Kunci

### Laci vs Gudang
- **Redis = laci RAM**: cepat, hilang jika listrik mati (kecuali `PERSIST`).
- **Postgres = gudang disk**: lambat, awet.

### `INCR/DECR` = Hitung Otomatis
`INCR counter` tanpa ambil +1 manual — aman untuk banyak kasir.

### `EXPIRE` = Kadaluarsa
`SET sesi:123 "data" EX 3600` → hapus 1 jam.

---

## Ringkasan

Minggu 1: **Laci Cepat** — string & counter. Minggu depan: **Hash** — kartu di laci.
