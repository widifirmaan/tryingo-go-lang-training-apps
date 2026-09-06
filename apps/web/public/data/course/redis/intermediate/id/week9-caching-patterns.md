# Caching Patterns — Strategi Laci Redis

> **Kategori:** Redis | **Level:** Menengah | **Minggu 9:** Caching Patterns

## Tujuan Pembelajaran

- Cache-Aside (baca laci dulu), Write-Through (tulis laci+DB), TTL + `EXPIRE`, anti `cache stampede` + `penetration` (sumber: redis.io/docs/manual/patterns + AWS caching whitepaper)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa pola, cache basi (harga lama) atau DB jebol saat laci kosong bareng (stampede 1000 request). Pola benar = cepat + benar.

---

## Program: 3 Pola Warung

```bash
# 1. Cache-Aside (paling umum): baca laci → tidak ada → DB → isi laci
GET produk:1
# (kosong) → SELECT dari DB → SET produk:1 ... EX 60

# 2. TTL wajib (anti basi):
SET produk:1 "..." EX 60  # 60 detik, lalu segar lagi

# 3. Stampede guard: kunci bangun
# SET lock:produk:1 1 NX EX 10  → hanya 1 yang ke DB, lain tunggu
SET lock:produk:1 1 NX EX 10

# 4. Penetration guard: cache juga "tidak ada" (ersects, TTL pendek)
SET produk:999 "NULL" EX 30
```

---

## Konsep Kunci

### Cache-Aside / Write-Through / TTL
- Aside: baca laci dulu (umum).
- Through: tulis laci + DB bareng (konsisten, lambat tulis).
- TTL: kadaluarsa wajib (anti basi selamanya).

### Stampede / Penetration = Serbuan
- Stampede: laci kosong bareng → 1000 ke DB. Obat: kunci `NX`.
- Penetration: tanya yang tidak ada terus → DB terus. Obat: cache `"NULL"` pendek.

---

## Penjelasan untuk Pemula

### Analogi: Laci Kasir + Aturan
- **Aside = cek laci dulu**, **TTL = label kadaluarsa**, **kunci NX = nomor antre 1 bangun**.

### 3 Istilah Wajib
1. **Aside/Through/TTL**: cek-dulu/tulis-bareng/kadaluarsa
2. **Stampede/penetration**: serbuan/tanya-ngawur

---

## Eksperimen

- **Hijau:** `SET x 1 EX 2` → tunggu 3 detik → `GET` hilang?
- **Kuning:** `SET k 1 NX` 2x → kedua `nil` (kunci dipegang)?
- **Merah:** Tanpa TTL + harga berubah → basi selamanya? Pasang TTL.

---

## Tantangan

**Laci Benar:** Cache-Aside + TTL 60 + kunci stampede + `"NULL"` penetration untuk `produk` + buktikan basi maks 60 detik.

---

## Glosarium Mini

- **Aside/TTL/NX**: cek/kadaluarsa/kunci

---

## Ringkasan

Minggu 9 dari 10: **Strategi Laci** (Level: Menengah). Cepat + benar. Minggu depan: **Capstone**.
