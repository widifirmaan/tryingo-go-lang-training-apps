# Dokumen & CRUD — Kartu Fleksibel

> **Kategori:** MongoDB | **Level:** Pemula | **Minggu 1:** Dokumen & CRUD

## Tujuan Pembelajaran

- Paham MongoDB = **kardus kartu fleksibel** (JSON), bukan rak kaku SQL — tiap kartu bisa beda field
- `db.produk.insertOne({ nama: "Beras", harga: 62000 })` masukkan kartu
- `find()`, `findOne()`, `find({ kategori: "Sembako" })` saring, `countDocuments()`
- `_id` otomatis seperti KTP kartu

---

## Kenapa Ini Penting Buat Kamu?

Warung kadang kartu produk ada `stok`, kadang tidak. SQL harus isi semua kolom, Mongo **bebas** — kartu 1 ada `warna`, kartu 2 tidak, tidak error. Cocok untuk katalog yang sering ganti.

---

## Program: Kartu Mongo

Jalankan di **MongoDB Compass** atau `mongosh` (atau `onecompiler.com/mongodb`).

```javascript
// Bikin koleksi produk (otomatis jika belum ada)
db.produk.insertOne({ nama: "Beras 5kg", harga: 62000, stok: 10, kategori: "Sembako" })
db.produk.insertMany([
  { nama: "Bayam", harga: 5000, stok: 20, kategori: "Sayur" },
  { nama: "Telur", harga: 28000, stok: 15 },
  { nama: "Gula", harga: 15000, kategori: "Sembako" } // tanpa stok, boleh!
])

// Lihat
db.produk.find() // semua kartu
db.produk.find({ kategori: "Sembako" }) // saring
db.produk.findOne({ nama: "Bayam" }) // 1 kartu
db.produk.countDocuments() // hitung
db.produk.find({}, { nama: 1, harga: 1, _id: 0 }) // hanya 2 kolom

// Cari mirip
db.produk.find({ nama: /ber/i }) // regex: mengandung "ber"
```

**Tanpa install:** `mongodb.com` → Atlas Free → Connect → Compass, atau `onecompiler.com`.

---

## Konsep Kunci

### Dokumen = Kartu JSON
`{ nama: "Beras", harga: 62000 }` — tiap kartu bebas field.

### Koleksi = Kardus Kartu
`db.produk` kardus berisi banyak kartu. `insertOne/Many`, `find()`.

### `_id` = KTP Otomatis
Mongo buat `_id: ObjectId("...")` jika tidak diisi.

---

## Penjelasan untuk Pemula

### Analogi: Kardus Kartu Warung

- **SQL = rak kaku**: tiap baris harus isi semua kolom.
- **Mongo = kardus kartu**: kartu 1 ada `stok`, kartu 2 tidak — tidak apa.

---

## Eksperimen

- **Hijau:** `insertOne({ nama: "Kopi", harga: 12000 })` → `find({ nama: "Kopi" })`?
- **Kuning:** `find({ harga: { $gt: 10000 } })` → harga >10k?
- **Merah:** `find({}, { nama: 1 })` tanpa `_id:0` → `_id` ikut?

---

## Tantangan

**Kartu Pelanggan:** `db.pelanggan.insertMany([{ nama:"Budi", hp:"081", kota:"Jakarta"}, {nama:"Siti"}])` → `find({ kota: { $exists: false }})` cari tanpa kota.

---

## Glosarium Mini

- **Dokumen/Koleksi**: kartu/kardus
- **insert/find**: masuk/cari
- **_id**: KTP

---

## Ringkasan

Minggu 1: **Kartu Fleksibel** — masuk & cari kartu. Minggu depan: **Update & Hapus**.
