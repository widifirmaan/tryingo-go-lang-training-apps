# Resolvers — Dapur Server GraphQL

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 4:** Resolvers

## Tujuan Pembelajaran

- `resolvers = { Query: { produk: () => [...] }, Mutation: { tambahProduk: (_, { input }) => ... } }` dapur tiap field (sumber: apollographql.com/docs)
- `parent, args, context` = piring, pesanan, dapur bersama

---

## Kenapa Ini Penting Buat Kamu?

Schema (W1) hanya menu — tanpa resolver, pesan "tambahProduk" tidak ada yang masak (error `Cannot query field`). Resolver = koki tiap menu: `Query.produk` ambil rak, `Mutation.tambahProduk` simpan.

---

## Program: Dapur Warung Resolver

```javascript
// db.js — rak (sementara array, nanti DB beneran)
let produk = [
  { id: "1", nama: "Beras", harga: 62000 },
  { id: "2", nama: "Bayam", harga: 5000 },
];

// resolvers.js — koki tiap field
const resolvers = {
  Query: {
    produk: () => produk,                          // baca semua
    produkById: (_, { id }) => produk.find(p => p.id === id), // args = pesanan
  },
  Mutation: {
    tambahProduk: (_, { input }) => {              // input = amplop
      const baru = { id: String(Date.now()), ...input };
      produk.push(baru);
      return baru;
    },
    hapusProduk: (_, { id }) => {
      produk = produk.filter(p => p.id !== id);
      return true;
    },
  },
  // Field resolver: Produk.kategori ambil dari rak lain
  Produk: {
    kategori: (parent) => parent.kategori || "Umum",
  },
};

module.exports = { resolvers };
```

---

## Konsep Kunci

### `Query` / `Mutation` / `Produk` = Koki Menu/Kasir/Lauk
- `Query.produk` masak bacaan, `Mutation.tambahProduk` masak tulisan.
- `Produk.kategori` masak field khusus.

### `(parent, args, context)` = Piring/Pesanan/Dapur
- `parent` hasil induk, `args` pesanan (`{ id }`), `context` bersama (user login).

---

## Penjelasan untuk Pemula

### Analogi: Dapur Restoran
- **Schema = menu**, **resolver = koki**: tiap menu ada koki.
- **args = kertas pesanan**: `id: "1"`.

### Langkah 0 — Siapkan Device
- Sama W1: `node -v`, folder `warung-graphql` (server minggu depan).

### Cara Komputer Membaca
1. `query { produk { nama } }` → panggil `Query.produk()` → array → ambil `nama` tiap item.
2. `mutation { tambahProduk(input:...) }` → panggil `Mutation.tambahProduk(_, { input })` → push → balas.

### 3 Istilah Wajib
1. **Resolver**: koki field
2. **args/context**: pesanan/dapur
3. **parent**: hasil induk

---

## Eksperimen

- **Hijau:** `Query.produk()` langsung di node → array 2?
- **Kuning:** `tambahProduk` tanpa `input.nama` → `undefined`? Tambah validasi `if (!input.nama) throw new Error("Nama wajib")`.
- **Merah:** Hapus `Mutation` → `mutation { tambahProduk }` error `Cannot query field`? Pasang lagi.

---

## Tantangan

**Dapur Lengkap:** `Query.produk` + `produkByKategori(kategori)` (`filter`) + `Mutation.ubahHarga/hapusProduk` + `Produk.total = harga * stok` field resolver. Test 4 via `node` langsung (tanpa server).

---

## Glosarium Mini

- **Resolver/args/context**: koki/pesanan/dapur
- **parent**: induk

---

## Ringkasan

Minggu 4 dari 5: **Dapur Server** (Level: Pemula). Tiap menu ada koki. Minggu depan: **Apollo Server** — buka restoran.
