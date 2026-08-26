# Queries — Pesan Apa yang Mau

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 2:** Queries

## Tujuan Pembelajaran

- Argumen `produk(kategori: "Sembako")`, alias `murah: produk(kategori:"Sayur")`, fragment `...Fields`
- Variabel `$id: ID!` untuk aman

---

## Program

```graphql
query Cari($kategori: String!) {
  produk(kategori: $kategori) {
    nama
    harga
  }
}
# Variables: { "kategori": "Sembako" }

query Dua {
  murah: produk(kategori: "Sayur") { nama harga }
  mahal: produk(kategori: "Elektronik") { nama harga }
}

fragment Kartu on Produk { nama harga stok }

query {
  produk { ...Kartu }
}
```

---

## Ringkasan

Minggu 2: **Pesanan Canggih** — argumen, alias, fragment. Minggu depan: **Mutations**.
