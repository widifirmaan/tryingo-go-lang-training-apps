# Aggregation Lanjutan

> **Kategori:** MongoDB | **Level:** Menengah | **Minggu 6:** Aggregation Lanjutan

## Tujuan Pembelajaran

- $facet untuk multi-aggregation
- $bucket untuk binning
- $addFields dan $switch
- $merge ke collection lain
- $setWindowFields

---

## Program: Pipeline Kompleks

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

## Konsep Kunci

### $facet
Multiple aggregation pipelines dalam satu query.

### $bucket
Binning data ke dalam kategori rentang.

### $addFields
Tambah field computed ke dokumen.

### $merge
Output aggregation ke collection lain.

### $setWindowFunctions
Window functions: $denseRank, $shift.

---

## Eksperimen

- $redact untuk access control
- $graphLookup untuk tree
- $unionWith
- Custom $function

---

## Tantangan

Dashboard analytics: facet, bucket, merge ke laporan.

---

## Ringkasan

Minggu 6 dari 10: **Aggregation Lanjutan** (Menengah).
