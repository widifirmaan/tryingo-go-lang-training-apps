# Schema & Types — Menu Restoran

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 1:** Schema & Types
> **Prasyarat:** Tidak ada — mulai dari nol.

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

## Eksperimen

- **Hijau:** Jalankan apa adanya, lalu ubah nilai `Produk` → output ikut berubah?
- **Kuning:** Ubah huruf besar-kecil `Produk` dan `Query` → masih jalan atau error?
- **Merah:** Salah ketik 1 huruf pada `Produk` → pesan error apa? Betulkan.

## Tantangan

**Schema & Types di Warungmu:** pakai `Produk`, `Query` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `Produk`, `Query`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Naikkan 1 tingkat: tambah 1 kasus gagal + pesan error yang jelas.

## Ringkasan

Minggu 1: **Menu** — schema & query dasar. Minggu depan: **Queries** lanjutan.
