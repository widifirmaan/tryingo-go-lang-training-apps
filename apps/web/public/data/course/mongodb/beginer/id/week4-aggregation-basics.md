# Aggregation Basics

> **Kategori:** MongoDB | **Level:** Pemula | **Minggu 4:** Aggregation Basics

## Tujuan Pembelajaran

- $match untuk filter
- $group untuk agregasi
- $project untuk bentuk output
- $unwind untuk expand array
- $sort dan $limit

---

## Program: Pipeline Agregasi

```javascript
async function main() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const produk = client.db('toko_db').collection('produk');

    // $match: filter
    const elektronik = await produk.aggregate([
        { $match: { kategori: 'Elektronik' } }
    ]).toArray();
    console.log('Elektronik:', elektronik.length);

    // $group: kelompokkan dan agregasi
    const perKategori = await produk.aggregate([
        { $group: {
            _id: '$kategori',
            totalProduk: { $sum: 1 },
            rataHarga: { $avg: '$harga' },
            maxHarga: { $max: '$harga' },
            totalStok: { $sum: '$stok' }
        }},
        { $sort: { totalProduk: -1 } }
    ]).toArray();
    console.log('Per kategori:', perKategori);

    // $project: bentuk output
    const ringkas = await produk.aggregate([
        { $project: {
            nama: 1,
            harga: 1,
            kategori: 1,
            nilaiStok: { $multiply: ['$harga', '$stok'] },
            _id: 0
        }},
        { $sort: { nilaiStok: -1 } },
        { $limit: 5 }
    ]).toArray();
    console.log('Top 5 nilai stok:', ringkas);

    // $unwind: expand array
    const tags = await produk.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]).toArray();
    console.log('Tags:', tags);

    // $count
n    const total = await produk.aggregate([
        { $match: { harga: { $gt: 500000 } } },
        { $count: 'produk_mahal' }
    ]).toArray();
    console.log('Produk mahal:', total);

    await client.close();
}
main().catch(console.error);
```

---

## Konsep Kunci

### Aggregasi Pipeline
Tahapan transformasi data: $match -> $group -> $project.

### $match
Filter dokumen, seperti WHERE di SQL.

### $group
Kelompokkan dan agregasi: $sum, $avg, $max, $min.

### $project
Bentuk output: pilih field, hitung field baru.

### $unwind
Expand array menjadi dokumen terpisah.

---

## Eksperimen

- $bucket untuk binning
- $facet untuk multi-aggregation
- $addFields
- Lookup sederhana

---

## Tantangan

Laporan penjualan: agregasi per kategori, top produk, statistik harga.

---

## Ringkasan

Minggu 4 dari 10: **Aggregation Basics** (Pemula).
