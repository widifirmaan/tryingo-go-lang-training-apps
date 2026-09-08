# Schema Design — Kartu Rapi: Tempel atau Pisah?

> **Kategori:** MongoDB | **Level:** Pemula | **Minggu 5:** Schema Design Patterns

## Tujuan Pembelajaran

- **Embed** (tempel di kartu, 1-to-Few: alamat di pelanggan) vs **Reference** (pisah + `_id`, 1-to-Many: pesanan → pelanggan) (sumber: mongodb.com/docs/manual/data-modeling)
- `$lookup` gabung (JOIN-nya Mongo)

---

## Kenapa Ini Penting Buat Kamu?

Salah desain: pesanan 10.000 ditempel di kartu pelanggan → kartu raksasa 16MB limit, lambat. Benar: alamat (sedikit) tempel, pesanan (banyak) pisah + `$lookup` saat perlu.

---

## Program: Tempel vs Pisah

```javascript
// 1. EMBED — sedikit & sering dibaca bareng (alamat pelanggan)
db.pelanggan.insertOne({
  nama: "Budi",
  email: "budi@email.com",
  alamat: [
    { jalan: "Jl. Melati 12", kota: "Jakarta", utama: true },
    { jalan: "Jl. Mawar 3", kota: "Bekasi", utama: false }
  ]
})
// Baca 1x dapat semua: db.pelanggan.findOne({ email: "budi@email.com" })

// 2. REFERENCE — banyak & tumbuh terus (pesanan)
db.pesanan.insertOne({ pelanggan_email: "budi@email.com", total: 75000 })
db.pesanan.insertOne({ pelanggan_email: "budi@email.com", total: 32000 })

// 3. $lookup — gabung saat perlu (seperti JOIN)
db.pelanggan.aggregate([
  { $match: { email: "budi@email.com" } },
  { $lookup: {
      from: "pesanan",
      localField: "email",
      foreignField: "pelanggan_email",
      as: "riwayat"
  }}
])
// → { nama: "Budi", ..., riwayat: [{total:75000}, {total:32000}] }
```

---

## Konsep Kunci

### Embed = Tempel di Kartu
Cocok: sedikit (alamat 1-3), dibaca bareng, jarang berubah sendiri.

### Reference + `$lookup` = Pisah + Gabung Saat Perlu
Cocok: banyak (pesanan ribuan), tumbuh terus. `$lookup` = JOIN Mongo.

### Aturan Jempol (MongoDB Docs)
- 1-to-Few → embed. 1-to-Many → reference. Sering dibaca bareng → embed.

---

## Penjelasan untuk Pemula

### Analogi: Amplop & Arsip
- **Embed = tempel kwitansi di amplop pelanggan**: sedikit, buka amplop langsung lihat.
- **Reference = arsip terpisah + nomor**: 10.000 nota tidak muat di amplop → simpan di lemari, catat nomor.

### Langkah 0 — Siapkan Device
- Sama W1: `mongosh` + `pelanggan` + `pesanan`.

### Cara Komputer Membaca
1. `findOne` pelanggan → 1 dokumen sudah termasuk `alamat` (tanpa query lagi).
2. `$lookup` → cocokkan `email` = `pelanggan_email` → tempel array `riwayat`.

### 3 Istilah Wajib
1. **Embed/reference**: tempel/pisah
2. **$lookup**: gabung

---

## Eksperimen

- **Hijau:** `findOne` Budi → `alamat.length` 2?
- **Kuning:** Tanpa `$lookup`, `pesanan` tidak ikut `findOne` pelanggan? (benar, pisah)
- **Merah:** Tempel 1000 pesanan ke 1 pelanggan → dokumen >16MB error? (Itulah kenapa pisah!)

---

### Bonus: Validasi Skema — Satpam Koleksi (mongodb.com/docs/manual/schema-validation!)

Fleksibel ≠ bebas sampah! Kunci aturan di DB (bukan cuma di aplikasi — aplikasi bisa lupa!):

```javascript
db.createCollection("produk_rapi", {
  validator: {
    $jsonSchema: {
      required: ["nama", "harga"],
      properties: {
        nama: { bsonType: "string", minLength: 3 },
        harga: { bsonType: ["int", "double"], minimum: 0 }
      }
    }
  },
  validationAction: "error" // tolak (bukan warning!)
})

db.produk_rapi.insertOne({ nama: "X", harga: -5 }) // GAGAL: nama pendek + harga minus!
db.produk_rapi.insertOne({ nama: "Beras", harga: 62000 }) // lolos
```

---

## Tantangan

**Desain Warung Benar:** `produk` embed `ulasan` (sedikit, max 5) + `pesanan` reference `pelanggan_email` + `$lookup` laporan Budi. Tulis alasan tiap pilihan 1 kalimat. **Selesai Beginner MongoDB!**

---

## Glosarium Mini

- **Embed/reference/$lookup**: tempel/pisah/gabung
- **16MB**: batas kartu

---

## Ringkasan

Minggu 5 dari 5: **Desain Kartu** (Level: Pemula). **Selesai Beginner MongoDB!** Lanjut: **Aggregation Lanjutan** (Menengah).
