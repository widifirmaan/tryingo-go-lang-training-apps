# Index — Daftar Isi Kartu

> **Kategori:** MongoDB | **Level:** Pemula | **Minggu 3:** Index

## Tujuan Pembelajaran

- `createIndex({ email: 1 })` daftar isi 1 = naik, -1 = turun, `unique: true`
- `explain("executionStats")` lihat `COLLSCAN` (baca semua) vs `IXSCAN` (index)
- Kapan index: `WHERE`, `sort`, `unique`

---

## Program

```javascript
db.pelanggan.createIndex({ email: 1 }, { unique: true })
db.produk.createIndex({ kategori: 1 })
db.produk.find({ kategori: "Sembako" }).explain("executionStats") // IXSCAN jika ada index
db.produk.getIndexes()
db.produk.dropIndex("kategori_1")
```

---

## Ringkasan

Minggu 3: **Index Mongo** — daftar isi kartu biar 100rb kartu tetap cepat.
