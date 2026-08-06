# Aggregation Basics

> **Kategori:** MongoDB | **Level:** Beginner | **Minggu 4:** Aggregation Basics

## Learning Objectives

- $match for filtering
- $group for aggregation
- $project for shaping output
- $unwind for expanding arrays
- $sort and $limit

---

## Program: Aggregation Pipeline

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

## Key Concepts

### Aggregation Pipeline
Data transformation stages: $match -> $group -> $project.

### $match
Filter documents, like SQL WHERE.

### $group
Group and aggregate: $sum, $avg, $max, $min.

### $project
Shape output: select fields, compute new fields.

### $unwind
Expand array into separate documents.

---

## Experiments

- $bucket for binning
- $facet for multi-aggregation
- $addFields
- Simple lookup

---

## Challenge

Sales report: aggregation per category, top products, price statistics.

---

## Summary

Week 4 of 10: **Aggregation Basics** (Beginner).
