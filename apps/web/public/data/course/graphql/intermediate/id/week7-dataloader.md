# DataLoader & N+1 — Gerobak Sekaligus GraphQL

> **Kategori:** GraphQL | **Level:** Menengah | **Minggu 7:** DataLoader & N+1 Problem
> **Prasyarat:** Minggu 6 — **Authentication**.

## Tujuan Pembelajaran

- N+1: 100 produk → 1 query daftar + 100 query kategori = 101x (lambat!) (sumber: github.com/graphql/dataloader)
- `new DataLoader(keys => batchFn(keys))` kumpulkan 1 detik → 1 query `WHERE id IN (...)`

---

## Kenapa Ini Penting Buat Kamu?

Daftar 100 produk + kategori tiap baris = 101 query DB (10 detik). Dengan DataLoader, 2 query (0.1 detik) — 100x cepat. Tanpa ini, GraphQL lambat di produksi.

---

## Program: Gerobak Warung

```javascript
const DataLoader = require("dataloader");

// Tanpa DataLoader (N+1): 1 + 100 query!
// Produk: { kategori: p => db.kategori(p.kategoriId) } ← 100x!

// Dengan DataLoader: 1 + 1 query
const kategoriLoader = new DataLoader(async (ids) => {
  const rows = await db.kategoriByIds(ids); // 1 query IN (...)
  return ids.map(id => rows.find(r => r.id === id)); // urut sesuai ids!
});

const resolvers = {
  Produk: {
    kategori: (parent) => kategoriLoader.load(parent.kategoriId),
  },
};
```


```graphql
# DataLoader = 1Packet-: 2 pesanan sekaligus via alias, hemat antrean N+1
query Dua {
  murah: product(id: "2") { name price }
  mahal: product(id: "6") { name price }
}
```
---

## Konsep Kunci

### N+1 = 1 + N Query
Daftar (1) + tiap baris (N). DataLoader kumpulkan → 1 batch.

### `load()` + Batch = Gerobak
`load(id)` naik gerobak, gerobak jalan 1x per tick dengan semua penumpang.

---

## Penjelasan untuk Pemula

### Analogi: Ojek vs Bus
- **Tanpa DataLoader = 100 ojek** (mahal).
- **DataLoader = 1 bus**: kumpulkan penumpang 1 tick, jalan sekali.

### 3 Istilah Wajib
1. **N+1/batch/load**: 101x/gerobak/naik

---

## Eksperimen

- **Hijau:** Log tiap query kategori → 100 baris? Dengan DataLoader → 1?
- **Kuning:** `load` id sama 2x → cache (1x)?
- **Merah:** Return urutan acak dari batch → data tertukar? (Wajib urut sesuai ids!)

---

## Tantangan

**Warung Cepat:** `Produk.kategori` via DataLoader + log hitung query: 101 → 2. Screenshot.

---

## Glosarium Mini

- **DataLoader/N+1**: gerobak/101x

---

## Ringkasan

Minggu 7 dari 10: **Gerobak Sekaligus** (Level: Menengah). 100x cepat. Minggu depan: **Subscriptions**.
