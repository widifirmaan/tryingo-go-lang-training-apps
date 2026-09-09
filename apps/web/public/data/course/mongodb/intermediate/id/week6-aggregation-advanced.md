# Aggregation Lanjutan — Pabrik 2 Lantai MongoDB

> **Kategori:** MongoDB | **Level:** Menengah | **Minggu 6:** Aggregation Lanjutan
> **Prasyarat:** Minggu 5 — **Schema Design**.

## Tujuan Pembelajaran

- `$lookup` gabung koleksi + `$unwind` buka array + `$facet` 2 laporan sekaligus (sumber: mongodb.com/docs/manual/aggregation)

---

## Kenapa Ini Penting Buat Kamu?

Laporan "total per pelanggan + top produk" tanpa `$facet` = 2 query + gabung di JS. Dengan 1 pipa `$facet`, 1 request 2 laporan. `$lookup` ganti 2 query jadi 1.

---

## Program: Pabrik 2 Lantai Warung

```javascript
// 1. $lookup: gabung pesanan + pelanggan (seperti JOIN)
db.pesanan.aggregate([
  { $lookup: {
      from: "pelanggan",
      localField: "pelanggan_email",
      foreignField: "email",
      as: "orang"
  }},
  { $unwind: "$orang" },  // buka array 1-elemen jadi objek
  { $project: { _id: 0, nama: "$orang.nama", total: 1 } }
])

// 2. $facet: 2 laporan 1 pipa
db.produk.aggregate([
  { $facet: {
      perKategori: [
        { $group: { _id: "$kategori", total: { $sum: "$harga" } } }
      ],
      termahal: [
        { $sort: { harga: -1 } },
        { $limit: 3 },
        { $project: { _id: 0, nama: 1, harga: 1 } }
      ]
  }}
])
```

---

## Konsep Kunci

### `$lookup` + `$unwind` = Gabung + Buka
`$lookup` tempel array, `$unwind` buka jadi baris (atau objek jika 1).

### `$facet` = 2 Pabrik Paralel
1 input → 2 pipa (`perKategori`, `termahal`) → 1 dokumen 2 hasil.

---

## Penjelasan untuk Pemula

### Analogi: Pabrik Bercabang
- **$lookup = stapler antar kardus**, **$facet = 2 lini produksi** dari 1 ban.

### Langkah 0 — Siapkan Device
- Sama W1: `mongosh` + `produk` + `pesanan` + `pelanggan`.

### Cara Komputer Membaca
1. `$lookup` → untuk tiap pesanan, cari pelanggan cocok → tempel array.
2. `$facet` → jalankan 2 sub-pipa atas input sama.

### 3 Istilah Wajib
1. **$lookup/$unwind**: gabung/buka
2. **$facet**: cabang-laporan

---

## Eksperimen

- **Hijau:** Tanpa `$unwind` → `orang` array 1 elemen? Dengan → objek?
- **Kuning:** `$facet` 1 cabang kosong → hasil `{}`?
- **Merah:** `$lookup` field salah (`emial`) → array kosong semua? Betulkan.

---

## Tantangan

**Pabrik Ganda:** `$lookup` pesanan+pelanggan → `$group` total per nama → `$facet` (perNama + top3) 1 pipa.
- **Sambungan (Minggu 5 — Schema Design):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **$lookup/$unwind/$facet**: gabung/buka/cabang

---

## Ringkasan

Minggu 6 dari 10: **Pabrik 2 Lantai** (Level: Menengah). 1 pipa 2 laporan. Minggu depan: **Replica Set**.
