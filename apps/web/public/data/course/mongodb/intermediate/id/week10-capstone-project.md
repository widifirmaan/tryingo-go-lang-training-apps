# Capstone: E-Commerce MongoDB — Toko Kartu Grand Opening

> **Kategori:** MongoDB | **Level:** Menengah | **Minggu 10:** Capstone: E-Commerce MongoDB
> **Prasyarat:** Minggu 9 — **Change Streams & Transactions**.

## Tujuan Pembelajaran

- Gabung W1-W9: `CRUD` + `index` + `aggregation` + `schema` + `replica` + `transaction` jadi toko kartu produksi

---

## Kenapa Ini Penting Buat Kamu?

9 minggu terpisah — capstone buktikan gabung: katalog cepat (index), laporan 1 pipa (`$facet`), desain benar (embed/order), aman (transaction), awet (replica). Portfolio "MongoDB production-ready".

---

## Program: Toko Kartu Lengkap (Checklist)

```javascript
// 1. Schema benar (W5): produk embed ulasan, pesanan reference
db.produk.insertOne({ nama: "Beras", harga: 62000, ulasan: [{ bintang: 5 }] })

// 2. Index (W3+W8): 
db.produk.createIndex({ kategori: 1, harga: -1 })

// 3. Laporan 1 pipa (W4+W6):
db.produk.aggregate([
  { $match: { stok: { $gt: 0 } } },
  { $facet: {
      perKategori: [{ $group: { _id: "$kategori", total: { $sum: 1 } } }],
      top3: [{ $sort: { harga: -1 } }, { $limit: 3 }]
  }}
])

// 4. Jual aman (W9): transaction kurang-stok + tambah-pesanan

// 5. Replica (W7): rs.status() 1 PRIMARY + 2 SECONDARY
```

**Tugas capstone:** `mongodump` backup + `explain` 3 query IXSCAN + laporan `$facet` screenshot. **Selesai MongoDB 0→Ahli!** 🎉

---

## Konsep Kunci

### Capstone = Gabung 9 Minggu
CRUD + index + pipa + desain + replica + transaksi = produksi.

---

## Tantangan

**Grand Opening:** Semua checklist + `mongodump` + restore ke DB baru + data sama. **Selesai MongoDB 0→Ahli!** 🎉

---

## Glosarium Mini

- **Capstone/mongodump**: gabung/cadangan

---

## Ringkasan

Minggu 10 dari 10: **Grand Opening** (Level: Menengah). **Selesai MongoDB 0→Ahli dari nol!** 🎉
