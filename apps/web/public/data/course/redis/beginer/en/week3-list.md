# List — Antrian Kasir Redis

> **Kategori:** Redis | **Level:** Pemula | **Minggu 3:** List

## Tujuan Pembelajaran

- `RPUSH antrian Budi` masuk kanan, `LPOP antrian` keluar kiri (FIFO), `LRANGE antrian 0 -1` intip (sumber: redis.io/docs/data-types/lists)
- `BLPOP` tunggu jika kosong (antrian pesanan), `LLEN` panjang

---

## Kenapa Ini Penting Buat Kamu?

Pesanan online datang 10 bareng — proses 1 per 1 berurutan (FIFO). List = antrian: `RPUSH` (masuk), `LPOP` (layani). `BLPOP` kasir tunggu otomatis jika kosong, tidak `while` boros CPU.

---

## Program: Antrian Pesanan

```bash
RPUSH antrian "Budi:beras" "Siti:bayam" "Andi:telur"
LRANGE antrian 0 -1
LLEN antrian
LPOP antrian
LRANGE antrian 0 -1
BLPOP antrian 30
```

---

## Konsep Kunci

### `RPUSH` + `LPOP` = FIFO
Masuk kanan, keluar kiri — seperti antrian kasir.

### `LRANGE 0 -1` = Intip Semua
`0` awal, `-1` akhir. `LRANGE antrian 0 1` 2 terdepan.

### `BLPOP` = Tunggu Sabar
`BLPOP antrian 30` tunggu 30 detik jika kosong (untuk worker).

---

## Penjelasan untuk Pemula

### Analogi: Antrian Kasir
- **List = barisan**: `RPUSH` orang datang, `LPOP` dilayani.
- **BLPOP = kasir tunggu**: tidak teriak "ada yang mau bayar?" tiap detik.

### Langkah 0 — Siapkan Device
- Sama W1: `try.redis.io` / `redis-cli`.

### Cara Komputer Membaca
1. `RPUSH antrian "Budi"` → tambah kanan.
2. `LPOP antrian` → ambil + hapus kiri.

### 3 Istilah Wajib
1. **LPUSH/RPUSH/LPOP**: kiri/masuk-kiri/keluar-kiri (FIFO = RPUSH+LPOP)
2. **LRANGE/LLEN**: intip/panjang
3. **BLPOP**: tunggu blokir

---

## Eksperimen

- **Hijau:** `RPUSH` 3 → `LLEN` 3? `LPOP` → yang pertama keluar?
- **Kuning:** `LRANGE antrian 0 0` → hanya terdepan?
- **Merah:** `BLPOP kosong 5` → tunggu 5 detik lalu `(nil)`? Di terminal lain `RPUSH` saat tunggu → langsung dapat?

---

## Tantangan

**Antrian Warung:** `RPUSH pesanan ...` 5 pesanan → `while` `LPOP` + `print` sampai kosong (`LLEN` 0) → `BLPOP` demo tunggu.

---

## Glosarium Mini

- **List/LPUSH/LPOP**: antrian/masuk/keluar
- **BLPOP/LRANGE**: tunggu/intip

---

## Ringkasan

Minggu 3 dari 5: **Antrian** (Level: Pemula). FIFO + tunggu sabar. Minggu depan: **Set** — tas unik.
