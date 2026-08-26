# Update & Delete — Ubah dan Buang Kartu

> **Kategori:** MongoDB | **Level:** Pemula | **Minggu 2:** Update & Delete

## Tujuan Pembelajaran

- `updateOne({nama:"Beras"}, {$set:{harga:65000}})` ubah 1, `updateMany` ubah banyak
- `$inc: { stok: -1 }` tambah/kurang, `$push` tambah ke array
- `deleteOne`, `deleteMany`, `findOneAndUpdate` ambil & ubah sekaligus
- `upsert: true` buat jika belum ada

---

## Kenapa Ini Penting Buat Kamu?

Harga naik, stok berkurang 1 tiap jual — harus ubah kartu, bukan bikin baru.

---

## Program

```javascript
// Ubah harga Bayam
db.produk.updateOne({ nama: "Bayam" }, { $set: { harga: 6000 } })

// Tambah stok +5 untuk semua Sembako
db.produk.updateMany({ kategori: "Sembako" }, { $inc: { stok: 5 } })

// Tambah tag array
db.produk.updateOne({ nama: "Beras 5kg" }, { $push: { tag: "promo" } })

// Hapus yang stok 0
db.produk.deleteMany({ stok: 0 })

// Upsert: update jika ada, insert jika belum
db.produk.updateOne({ nama: "Kopi" }, { $set: { harga: 12000 } }, { upsert: true })

// Ambil & ubah
db.produk.findOneAndUpdate({ nama: "Gula" }, { $inc: { stok: -1 } }, { returnDocument: "after" })
```

---

## Konsep Kunci

### `$set`/`$inc`/`$push`
`$set` ganti, `$inc` tambah, `$push` masukkan ke array.

### `upsert` = Update or Insert
Jika `nama:"Kopi"` belum ada, buat baru.

---

## Ringkasan

Minggu 2: **Ubah & Hapus** — kartu bisa diedit, stok bisa kurang. Minggu depan: **Index**.
