# Update & Delete Dokumen

> **Kategori:** MongoDB | **Level:** Pemula | **Minggu 2:** Update & Delete Dokumen

## Tujuan Pembelajaran

- updateOne dan updateMany
- $set, $mul, $inc, $push, $pull
- upsert: update atau insert
- deleteOne dan deleteMany
- replaceOne

---

## Program: Modifikasi Data

```javascript
async function main() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const produk = client.db('toko_db').collection('produk');

    // UPDATE satu dokumen
    await produk.updateOne(
        { nama: 'Laptop ASUS' },
        { $set: { harga: 13000000, stok: 12 } }
    );

    // UPDATE banyak dokumen
    await produk.updateMany(
        { kategori: 'Aksesoris' },
        { $mul: { harga: 0.9 } }  // Diskon 10%
    );

    // UPDATE: tambah ke array
    await produk.updateOne(
        { nama: 'Laptop ASUS' },
        { $push: { tags: 'gaming' } }
    );

    // UPDATE: hapus dari array
    await produk.updateOne(
        { nama: 'Laptop ASUS' },
        { $pull: { tags: 'asus' } }
    );

    // UPSERT: update atau insert jika tidak ada
    await produk.updateOne(
        { nama: 'Webcam HD' },
        { $set: { harga: 650000, stok: 40, kategori: 'Aksesoris' } },
        { upsert: true }
    );

    // DELETE satu dokumen
    await produk.deleteOne({ nama: 'Headset Sony' });

    // DELETE banyak dokumen
    await produk.deleteMany({ stok: 0 });

    // REPLACE: ganti seluruh dokumen
    await produk.replaceOne(
        { nama: 'Mouse Logitech' },
        { nama: 'Mouse Logitech G502', harga: 450000, stok: 60, kategori: 'Aksesoris' }
    );

    const remaining = await produk.countDocuments();
    console.log('Sisa produk:', remaining);

    await client.close();
}
main().catch(console.error);
```

---

## Konsep Kunci

### Update Operators
$set: ubah nilai, $mul: kali, $inc: tambah.

### Array Operators
$push: tambah ke array, $pull: hapus dari array.

### Upsert
Update jika ada, insert jika tidak ada.

### Delete
deleteOne: hapus satu, deleteMany: hapus banyak.

### Replace
Ganti seluruh dokumen dengan yang baru.

---

## Eksperimen

- $inc untuk stok
- $addToSet (unique push)
- deleteMany dengan filter
- findAndModify

---

## Tantangan

Sistem inventory: update stok, hapus expired, upsert produk baru.

---

## Ringkasan

Minggu 2 dari 10: **Update & Delete Dokumen** (Pemula).
