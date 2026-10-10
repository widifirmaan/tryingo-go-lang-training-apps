# Update & Delete Documents

> **Kategori:** MongoDB | **Level:** Beginner | **Minggu 2:** Update & Delete Documents

## Learning Objectives

- updateOne and updateMany
- $set, $mul, $inc, $push, $pull
- upsert: update or insert
- deleteOne and deleteMany
- replaceOne

---

## Program: Data Modification

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

## Key Concepts

### Update Operators
$set: set value, $mul: multiply, $inc: increment.

### Array Operators
$push: add to array, $pull: remove from array.

### Upsert
Update if exists, insert if not.

### Delete
deleteOne: delete one, deleteMany: delete many.

### Replace
Replace entire document.

---

## Experiments

- $inc for stock
- $addToSet (unique push)
- deleteMany with filter
- findAndModify

---

## Challenge

Inventory system: update stock, delete expired, upsert new products.

---

## Summary

Week 2 of 10: **Update & Delete Documents** (Beginner).
