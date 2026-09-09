# Aggregation Dasar — Pabrik Laporan MongoDB

> **Kategori:** MongoDB | **Level:** Pemula | **Minggu 4:** Aggregation Basics
> **Prasyarat:** Minggu 3 — **Index**.

## Tujuan Pembelajaran

- `aggregate([{ $match }, { $group }])` pipa laporan: saring → kelompok → hitung (sumber: mongodb.com/docs/manual/aggregation)
- `$match` saring, `$group: { _id: "$kategori", total: { $sum: "$harga" } }` kelompok, `$sort` urut

---

## Kenapa Ini Penting Buat Kamu?

Bos tanya "total per kategori?" — tanpa aggregation, ambil semua ke JS lalu loop manual (lambat, boros RAM). Dengan 1 pipa `aggregate`, Mongo hitung di server → kirim hasil jadi 3 baris.

---

## Program: Laporan Warung 1 Pipa

```javascript
// Total & rata per kategori
db.produk.aggregate([
  { $match: { stok: { $gt: 0 } } },              // 1. saring stok > 0
  { $group: {                                     // 2. kelompok per kategori
      _id: "$kategori",
      total: { $sum: "$harga" },
      rata: { $avg: "$harga" },
      jumlah: { $sum: 1 }
  }},
  { $sort: { total: -1 } }                        // 3. urut total besar dulu
])

// Contoh hasil:
// { _id: "Sembako", total: 124000, rata: 62000, jumlah: 2 }

// Tahap tambahan: hanya tampilkan nama+total
db.produk.aggregate([
  { $project: { _id: 0, nama: 1, total: { $multiply: ["$harga", "$stok"] } } },
  { $sort: { total: -1 } },
  { $limit: 3 }
])
```

---

## Konsep Kunci

### Pipa `[]` = Ban Berjalan Pabrik
Dokumen masuk `$match` → keluar → masuk `$group` → keluar → `$sort`. Tiap tahap ubah bentuk.

### `$match` / `$group` / `$sort` / `$project` / `$limit` = Mesin
Saring / kelompok-hitung / urut / pilih kolom / potong.

### `$namaField` = Ambil Nilai
`"$harga"` = nilai field harga dokumen itu.

---

## Penjelasan untuk Pemula

### Analogi: Pabrik Laporan
- **Dokumen = kardus** masuk ban berjalan, tiap mesin (`$match`, `$group`) kerjakan, keluar laporan jadi.

### Langkah 0 — Siapkan Device
- Sama W1: `mongosh` + koleksi `produk` isi 5 (W1-W2).

### Cara Komputer Membaca
1. `$match: { stok: { $gt: 0 } }` → buang stok 0.
2. `$group: { _id: "$kategori" }` → kumpulkan per kategori → hitung `$sum`.

### 3 Istilah Wajib
1. **Pipeline/stage**: pipa/mesin
2. **$match/$group**: saring/kelompok

---

## Eksperimen

- **Hijau:** Hapus `$match` → total ikut stok 0? Pasang lagi.
- **Kuning:** `$sort: { total: 1 }` → kecil dulu?
- **Merah:** `$group: { _id: null, semua: { $sum: 1 } }` → hitung semua 1 baris?

---

## Tantangan

**Laporan Warung Lengkap:** Pipa `match stok>0` → `group` per `kategori` (`total $sum`, `rata $avg`, `jumlah $sum:1`) → `sort total DESC` → tambah `$limit: 2` 2 teratas. Screenshot.
- **Sambungan (Minggu 3 — Index):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **aggregate/$match/$group**: pabrik/saring/kelompok
- **$sort/$limit/$project**: urut/potong/pilih

---

## Ringkasan

Minggu 4 dari 5: **Pabrik Laporan** (Level: Pemula). 1 pipa ganti 20 baris JS. Minggu depan: **Schema Design** — kartu rapi.
