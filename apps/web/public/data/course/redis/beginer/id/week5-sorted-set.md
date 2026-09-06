# Sorted Set — Papan Ranking Warung Redis

> **Kategori:** Redis | **Level:** Pemula | **Minggu 5:** Sorted Set

## Tujuan Pembelajaran

- `ZADD laris 100 "beras"` papan skor, `ZRANGE` naik, `ZREVRANGE` turun (juara dulu), `ZINCRBY` tambah skor (sumber: redis.io/docs/data-types/sorted-sets)
- `ZRANGEBYSCORE` saring skor, `ZCOUNT` hitung

---

## Kenapa Ini Penting Buat Kamu?

"Top 5 terlaris" tanpa sorted set = ambil semua + `sort` di JS tiap buka (lambat). Dengan `ZREVRANGE laris 0 4`, Redis simpan sudah urut → 1 perintah.

---

## Program: Papan Terlaris

```bash
ZADD laris 100 "beras" 250 "minyak" 180 "telur"
ZRANGE laris 0 -1 WITHSCORES
ZREVRANGE laris 0 2 WITHSCORES
ZINCRBY laris 50 "beras"
ZREVRANGE laris 0 2 WITHSCORES
ZRANGEBYSCORE laris 100 200
ZCOUNT laris 100 200
ZREM laris "telur"
```

---

## Konsep Kunci

### Sorted Set = Papan Ranking
`ZADD papan skor member` — unik member, urut skor. `ZINCRBY` tambah skor atomik.

### `ZRANGE` vs `ZREVRANGE` = Naik vs Turun
`ZRANGE 0 2` 3 terbawah, `ZREVRANGE 0 2` 3 teratas (juara).

---

## Penjelasan untuk Pemula

### Analogi: Papan Klasemen
- **Member = tim**, **score = poin**, `ZREVRANGE 0 2` = 3 besar.

### Langkah 0 — Siapkan Device
- Sama W1.

### Cara Komputer Membaca
1. `ZADD laris 100 "beras"` → simpan + sisipkan urut.
2. `ZREVRANGE laris 0 2` → ambil 3 skor tertinggi.

### 3 Istilah Wajib
1. **ZADD/ZRANGE**: papan/lihat
2. **ZINCRBY**: tambah skor

---

## Eksperimen

- **Hijau:** `ZREVRANGE laris 0 0` → juara 1?
- **Kuning:** `ZINCRBY laris 200 "beras"` → juara ganti?
- **Merah:** `ZADD laris 100 "beras"` lagi (skor sama) → tetap 1 member (update, bukan duplikat)?

---

## Tantangan

**Warung Ranking:** `ZADD` 5 produk → `ZREVRANGE 0 2` top 3 → `ZINCRBY` jual 30 → top 3 baru → `ZRANGEBYSCORE 100 200`. **Selesai Beginner Redis!**

---

## Glosarium Mini

- **Sorted Set/ZADD/ZREVRANGE**: papan/tambah/juara
- **ZINCRBY/ZCOUNT**: skor/hitung

---

## Ringkasan

Minggu 5 dari 5: **Papan Ranking** (Level: Pemula). **Selesai Beginner Redis!** Lanjut: **Expire & Pub/Sub** (Menengah).
