# Performa & Tuning — Dokter Kartu MongoDB

> **Kategori:** MongoDB | **Level:** Menengah | **Minggu 8:** Performa & Tuning

## Tujuan Pembelajaran

- `.explain("executionStats")` baca `COLLSCAN` vs `IXSCAN` + `totalDocsExamined` + `executionTimeMillis` (sumber: mongodb.com/docs/manual/reference/explain)
- Compound index `{ kategori: 1, harga: -1 }` untuk saring+urut sekaligus

---

## Kenapa Ini Penting Buat Kamu?

100rb kartu tanpa index = 2 detik. Dengan compound index tepat = 0.01 detik. Index salah urutan (`{harga:-1, kategori:1}` untuk query kategori-dulu) = tidak dipakai (buang RAM!).

---

## Program: Bedah Kartu Lambat

```javascript
// Lambat: baca semua
db.produk.find({ kategori: "Sembako" }).sort({ harga: -1 })
  .explain("executionStats")
// COLLSCAN, totalDocsExamined: 100000, time: 1800ms

// Obat: compound index (urutan = urutan query!)
db.produk.createIndex({ kategori: 1, harga: -1 })

db.produk.find({ kategori: "Sembako" }).sort({ harga: -1 })
  .explain("executionStats")
// IXSCAN, totalDocsExamined: 12000, time: 12ms → 150x!

// Cek index terpakai + hapus yang tak perlu
db.produk.getIndexes()
db.produk.dropIndex("kategori_1")
```

---

## Konsep Kunci

### `COLLSCAN` vs `IXSCAN` = Baca-Semua vs Loncat
`totalDocsExamined` ≈ hasil = bagus. 100rb vs 3 hasil = buruk.

### Compound Index Urutan Penting
Query `kategori` + `sort harga` → index `{ kategori: 1, harga: -1 }` (sama urutan!).

---

## Penjelasan untuk Pemula

### Analogi: Dokter + Obat Tepat
- **explain = rontgen**, **index = obat**, **urutan salah = obat salah penyakit**.

### 3 Istilah Wajib
1. **COLLSCAN/IXSCAN**: semua/loncat
2. **Compound**: ganda-berurutan

---

## Eksperimen

- **Hijau:** `explain` sebelum/sesudah → `executionTimeMillis` turun?
- **Kuning:** Index `{harga:-1, kategori:1}` (terbalik) untuk query di atas → dipakai? (Tidak! Urutan penting.)
- **Merah:** 5 index tak terpakai → `INSERT` melambat? Hapus yang tak perlu.

---

## Tantangan

**Dokter Kartu:** 3 query lambat → `explain` catat → compound index tepat → `explain` buktikan 10x+ cepat.

---

## Glosarium Mini

- **explain/compound**: rontgen/ganda

---

## Ringkasan

Minggu 8 dari 10: **Dokter Kartu** (Level: Menengah). Gratis 150x. Minggu depan: **Change Streams**.
