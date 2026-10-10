# Advanced Aggregation

> **Kategori:** MongoDB | **Level:** Intermediate | **Minggu 6:** Advanced Aggregation

## Learning Objectives

- $facet for multi-aggregation
- $bucket for binning
- $addFields and $switch
- $merge to collection
- $setWindowFields

---

## Program: Complex Pipelines

```javascript
async function main() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const penjualan = client.db('toko_db').collection('penjualan');

    // $facet: multi-aggregation dalam satu query
    const facetResult = await penjualan.aggregate([
        { $facet: {
            perKategori: [
                { $group: { _id: '$kategori', total: { $sum: '$jumlah' } } },
                { $sort: { total: -1 } }
            ],
            statsHarga: [
                { $group: { _id: null,
                    avg: { $avg: '$harga' },
                    min: { $min: '$harga' },
                    max: { $max: '$harga' }
                }}
            ],
            topProduk: [
                { $sort: { jumlah: -1 } },
                { $limit: 5 }
            ]
        }}
    ]).toArray();

    // $bucket: binning data
    const buckets = await penjualan.aggregate([
        { $bucket: {
            groupBy: '$harga',
            boundaries: [0, 500000, 1000000, 5000000, 15000000],
            default: 'Lainnya',
            output: {
                count: { $sum: 1 },
                produk: { $push: '$nama' }
            }
        }}
    ]).toArray();

    // $addFields: tambah field computed
    const withMargin = await penjualan.aggregate([
        { $addFields: {
            hargaSetelahDiskon: { $multiply: ['$harga', 0.9] },
            kategoriHarga: {
                $switch: {
                    branches: [
                        { case: { $lt: ['$harga', 500000] }, then: 'Murah' },
                        { case: { $lt: ['$harga', 2000000] }, then: 'Sedang' }
                    ],
                    default: 'Mahal'
                }
            }
        }}
    ]).toArray();

    // $merge: output ke collection lain
    await penjualan.aggregate([
        { $group: {
            _id: '$kategori',
            totalPenjualan: { $sum: '$jumlah' },
            revenue: { $sum: { $multiply: ['$jumlah', '$harga'] } }
        }},
        { $merge: { into: 'laporan_kategori', whenMatched: 'replace' } }
    ]);

    await client.close();
}
main().catch(console.error);
```

---

## Key Concepts

### $facet
Multiple aggregation pipelines in one query.

### $bucket
Binning data into range categories.

### $addFields
Add computed fields to documents.

### $merge
Output aggregation to another collection.

### $setWindowFields
Window functions: $denseRank, $shift.

---

## Experiments

- $redact for access control
- $graphLookup for trees
- $unionWith
- Custom $function

---

## Challenge

Analytics dashboard: facet, bucket, merge to reports.

---

## Summary

Week 6 of 10: **Advanced Aggregation** (Intermediate).
