# Hash — Kartu Produk di Laci Redis

> **Kategori:** Redis | **Level:** Pemula | **Minggu 2:** Hash
> **Prasyarat:** Minggu 1 — **Redis String**.

## Tujuan Pembelajaran

- `HSET produk:1 nama "Beras" harga 62000` kartu banyak field 1 kunci (sumber: redis.io/docs/data-types/hashes)
- `HGET`, `HGETALL`, `HINCRBY produk:1 stok -1` kurang stok atomik, `HDEL`, `EXISTS`
- Kapan Hash vs String: kartu vs 1 nilai

---

## Kenapa Ini Penting Buat Kamu?

Produk punya 4 data (nama, harga, stok, kategori). Dengan String butuh 4 kunci (`produk:1:nama`...). Dengan Hash 1 kunci `produk:1` isi 4 field — rapi + `HINCRBY stok -1` aman untuk 2 kasir bareng (atomik, tidak rebutan).

---

## Program: Kartu di Laci

Jalankan di `try.redis.io` atau `docker run -p 6379:6379 -d redis` + `redis-cli`.

```bash
HSET produk:1 nama "Beras 5kg" harga 62000 stok 10 kategori "Sembako"
HGET produk:1 nama
HGETALL produk:1
HINCRBY produk:1 stok -1
HGET produk:1 stok
HDEL produk:1 kategori
EXISTS produk:1
TTL produk:1
DEL produk:1
```

---

## Konsep Kunci

### Hash = Kartu di Laci
`HSET produk:1 field value ...` — 1 kunci, banyak field. `HGETALL` ambil semua.

### `HINCRBY` = Kurang/Tambah Aman
`HINCRBY produk:1 stok -1` atomik — 2 kasir jual bareng tidak tabrakan (beda `GET`+`SET` manual).

### Hash vs String
- String: 1 kunci 1 nilai (`SET nama "Budi"`).
- Hash: 1 kunci banyak field (kartu produk).

---

## Penjelasan untuk Pemula

### Analogi: Kartu di Laci Meja
- **String = secarik kertas**: 1 info.
- **Hash = kartu nama**: nama + harga + stok 1 kartu.

### Langkah 0 — Siapkan Device
- Sama W1: `try.redis.io` (browser) atau `docker` + `redis-cli`.

### Cara Komputer Membaca
1. `HSET produk:1 stok 10` → simpan field `stok=10` di hash `produk:1` (RAM).
2. `HINCRBY produk:1 stok -1` → baca + kurang + tulis sekaligus (atomik).

### 3 Istilah Wajib
1. **Hash/HSET/HGET**: kartu/tulis/baca
2. **HINCRBY**: tambah atomik
3. **Atomik**: tidak rebutan

---

## Eksperimen

- **Hijau:** `HGETALL produk:1` → 4 field?
- **Kuning:** `HINCRBY produk:1 stok -5` → stok 5?
- **Merah:** 2x `HINCRBY -1` cepat → tepat -2 (atomik)? Bandingkan `GET`+`SET` manual yang bisa tabrakan.

---

## Tantangan

**Kartu Lengkap:** `HSET pelanggan:1 nama Budi poin 100` → `HINCRBY pelanggan:1 poin 50` → `HGETALL` → `EXPIRE pelanggan:1 3600` → `TTL`.

---

## Glosarium Mini

- **Hash/HSET/HGETALL**: kartu/tulis/baca-semua
- **HINCRBY/EXPIRE**: atomik/kadaluarsa

---

## Ringkasan

Minggu 2 dari 5: **Kartu di Laci** (Level: Pemula). Bisa kartu + kurang aman. Minggu depan: **List** — antrian.
