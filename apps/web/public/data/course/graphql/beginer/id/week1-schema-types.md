# Schema & Types — Menu Restoran

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 1:** Schema & Types

## Tujuan Pembelajaran

- GraphQL = **menu restoran**: client pesan "saya mau nama & harga saja", server kirim itu saja (tidak lebih)
- `type Produk { id: ID!, nama: String!, harga: Int! }` stiker menu
- `!` wajib, `[]` daftar, `query` ambil

---

## Kenapa Ini Penting Buat Kamu?

REST `/api/produk` kirim semua field (nama, harga, deskripsi, stok) padahal HP butuh harga saja → buang kuota. GraphQL minta pas.

---

## Program: Menu Produk

```graphql
# Schema — menu
type Produk {
  id: ID!
  nama: String!
  harga: Int!
  stok: Int
  kategori: String
}

type Query {
  produk: [Produk!]!
  produkById(id: ID!): Produk
}

# Query — pesan
query {
  produk {
    nama
    harga
  }
}

query {
  produkById(id: "1") {
    nama
    harga
    stok
  }
}
```

Coba di `onecompiler.com/graphql` atau `graphql.org/swapi-graphql`.

---

## Konsep Kunci

### Schema = Menu
`type Produk` daftar kolom yang ada.

### `!` & `[]`
`String!` wajib, `String` boleh kosong. `[Produk!]!` daftar wajib, isinya wajib.

### Query = Pesan
Minta field yang mau, dapat itu saja.

### Union & Interface = Menu Campur (graphql.org/learn/schema!)

Kadang hasil cari bisa 2 bentuk (Produk ATAU Kategori). `union` gabung, `interface` syarat wajib:

```graphql
union Hasil = Produk | Kategori

interface Node {
  id: ID!
}
type Produk implements Node {
  id: ID!
  nama: String!
  harga: Int!
}

# Query campur + pilih per bentuk:
query {
  cari(q: "beras") {
    ... on Produk { nama harga }
    ... on Kategori { nama }
  }
}
```

---

## Ringkasan

Minggu 1: **Menu** — schema & query dasar. Minggu depan: **Queries** lanjutan.
