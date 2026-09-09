# Set — Tas Tag Unik Redis

> **Kategori:** Redis | **Level:** Pemula | **Minggu 4:** Set
> **Prasyarat:** Minggu 3 — **List**.

## Tujuan Pembelajaran

- `SADD tags "sayur" "segar"` tas unik (kembar otomatis 1), `SMEMBERS`, `SISMEMBER`, `SREM` (sumber: redis.io/docs/data-types/sets)
- `SINTER` irisan, `SUNION` gabung, `SDIFF` selisih — untuk tag & kategori

---

## Kenapa Ini Penting Buat Kamu?

Produk punya tag `["sayur","segar","sayur"]` — duplikat bikin filter ganda. Set otomatis unik. `SINTER` cari "produk yang sayur DAN promo" tanpa loop.

---

## Program: Tas Tag Warung

```bash
SADD tags:beras "sembako" "pokok" "promo"
SADD tags:bayam "sayur" "segar" "promo"
SADD tags:beras "sembako"
SMEMBERS tags:beras
SISMEMBER tags:beras "promo"
SINTER tags:beras tags:bayam
SUNION tags:beras tags:bayam
SDIFF tags:beras tags:bayam
SREM tags:beras "pokok"
SRANDMEMBER tags:bayam
```

---

## Konsep Kunci

### Set = Tas Unik Tak Berurutan
`SADD` tambah (kembar diabaikan), `SMEMBERS` lihat, `SISMEMBER` cek, `SREM` buang.

### `SINTER/SUNION/SDIFF` = Operasi Himpunan
Irisan / gabung / selisih 2 tas — untuk filter tag.

---

## Penjelasan untuk Pemula

### Analogi: Tas Belanja Unik
- **Set = tas**: masukkan "sayur" 2x tetap 1.
- **SINTER = yang sama di 2 tas**.

### Langkah 0 — Siapkan Device
- Sama W1.

### Cara Komputer Membaca
1. `SADD tags:beras "sembako"` → tambah jika belum ada.
2. `SINTER a b` → bandingkan, keluarkan yang ada di keduanya.

### 3 Istilah Wajib
1. **Set/SADD/SMEMBERS**: tas/tambah/lihat
2. **SINTER/SUNION**: iris/gabung

---

## Eksperimen

- **Hijau:** `SADD` "promo" 2x → `SMEMBERS` 1?
- **Kuning:** `SINTER` beras & bayam → "promo"?
- **Merah:** `SDIFF` beras bayam → hanya milik beras?

---

## Tantangan

**Tag Warung:** 3 produk `SADD` tag masing-masing → `SINTER` 2 produk → `SUNION` semua → `SISMEMBER` cek "promo".
- **Sambungan (Minggu 3 — List):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Set/SADD/SMEMBERS**: tas/tambah/lihat
- **SINTER/SUNION/SDIFF**: iris/gabung/selisih

---

## Ringkasan

Minggu 4 dari 5: **Tas Unik** (Level: Pemula). Tag anti-duplikat + irisan. Minggu depan: **Sorted Set** — ranking.
