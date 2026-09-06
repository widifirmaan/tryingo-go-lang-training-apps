# Apollo Server — Buka Restoran GraphQL

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 5:** Apollo Server & Client

## Tujuan Pembelajaran

- `npm install @apollo/server graphql` + `startStandaloneServer(server, { listen: { port: 4000 } })` buka di `localhost:4000` (sumber: apollographql.com/docs)
- Gabung `typeDefs` (menu W1) + `resolvers` (dapur W4) → restoran jadi

---

## Kenapa Ini Penting Buat Kamu?

Menu + dapur tanpa restoran = tidak bisa pesan. Apollo Server = gedung restoran: 1 perintah, dapat `GraphiQL` coba-coba + endpoint `/` siap di-`fetch` HP.

---

## Program: Restoran Warung Jadi

```bash
npm init -y
npm install @apollo/server graphql
```

```javascript
// index.js — gedung (menu + dapur)
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = `#graphql
  type Produk { id: ID!, nama: String!, harga: Int!, stok: Int }
  type Query { produk: [Produk!]!, produkById(id: ID!): Produk }
  type Mutation { tambahProduk(nama: String!, harga: Int!): Produk! }
`;

let produk = [
  { id: "1", nama: "Beras", harga: 62000, stok: 10 },
  { id: "2", nama: "Bayam", harga: 5000, stok: 20 },
];

const resolvers = {
  Query: {
    produk: () => produk,
    produkById: (_, { id }) => produk.find(p => p.id === id),
  },
  Mutation: {
    tambahProduk: (_, { nama, harga }) => {
      const baru = { id: String(Date.now()), nama, harga, stok: 0 };
      produk.push(baru);
      return baru;
    },
  },
};

async function mulai() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
  console.log(`Restoran buka di ${url}`);
}
mulai();
```

Buka `http://localhost:4000` → GraphiQL → coba `query { produk { nama harga } }` + `mutation { tambahProduk(nama:"Gula", harga:15000) { id } }`.

---

## Konsep Kunci

### `typeDefs` + `resolvers` = Menu + Dapur
`ApolloServer({ typeDefs, resolvers })` gabung → restoran.

### `startStandaloneServer` = Buka Pintu
`listen: { port: 4000 }` → `http://localhost:4000`.

---

## Penjelasan untuk Pemula

### Analogi: Buka Restoran
- **typeDefs = menu**, **resolvers = koki**, **ApolloServer = gedung**, **port 4000 = alamat**.

### Langkah 0 — Siapkan Device
- `node -v` 20+, folder `warung-graphql`, `npm init -y`, install 2 paket.

### Cara Komputer Membaca
1. `node index.js` → server dengar 4000.
2. Browser kirim `query` → server panggil resolver → JSON `{ data }`.

### 3 Istilah Wajib
1. **ApolloServer/typeDefs**: gedung/menu
2. **startStandaloneServer**: buka pintu

---

## Eksperimen

- **Hijau:** `query { produk { nama } }` di GraphiQL → 2 nama?
- **Kuning:** Ganti port `4001` → buka `:4001`?
- **Merah:** Hapus 1 resolver → query itu error? Pasang lagi.

---

## Tantangan

**Restoran Lengkap:** `typeDefs` + `resolvers` (Query 2 + Mutation 2) + `node index.js` + GraphiQL screenshot tambah produk. **Selesai Beginner GraphQL!**

---

## Glosarium Mini

- **Apollo/typeDefs/resolvers**: gedung/menu/dapur
- **GraphiQL**: coba-coba

---

## Ringkasan

Minggu 5 dari 5: **Restoran Jadi** (Level: Pemula). **Selesai Beginner GraphQL!** Lanjut: **Auth & Client** (Menengah).
