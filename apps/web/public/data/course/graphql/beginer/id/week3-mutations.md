# Mutations — Tulis & Ubah Warung GraphQL

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 3:** Mutations
> **Prasyarat:** Minggu 2 — **Queries**.

## Tujuan Pembelajaran

- `mutation { tambahProduk(input: {...}) { id nama } }` tulis, `input` amplop, pilih field balikan (sumber: graphql.org/learn/mutations)
- Bedakan `query` (baca) vs `mutation` (tulis) — tulis berurutan, baca boleh bareng

---

## Kenapa Ini Penting Buat Kamu?

Query hanya baca — tambah produk butuh tulis. Mutation = kasir tulis nota: kirim `input` 1 amplop → server simpan → kembalikan `id nama` yang diminta (tidak lebih). Beda REST `POST` yang balas full object.

---

## Program: Kasir Tulis Warung

```graphql
# 1. Tambah produk (input = amplop)
mutation {
  tambahProduk(input: { nama: "Gula", harga: 15000, stok: 20 }) {
    id
    nama
    harga
  }
}
# Balikan: { "data": { "tambahProduk": { "id": "4", "nama": "Gula", "harga": 15000 } } }

# 2. Ubah harga
mutation {
  ubahHarga(id: "4", harga: 14000) {
    nama
    harga
  }
}

# 3. Hapus (balikan Boolean)
mutation {
  hapusProduk(id: "4")
}
# Balikan: { "data": { "hapusProduk": true } }

# 4. 2 tulis sekaligus (berurutan! tidak bareng)
mutation Dua {
  a: tambahProduk(input: { nama: "Kopi", harga: 12000, stok: 5 }) { id nama }
  b: tambahProduk(input: { nama: "Teh", harga: 8000, stok: 5 }) { id nama }
}
```

---

## Konsep Kunci

### `mutation` vs `query` = Tulis vs Baca
`query` baca (boleh paralel), `mutation` tulis (berurutan 1-2-3).

### `input` = Amplop
`input: { nama, harga, stok }` 1 amplop, server buka + validasi.

### Pilih Balikan = Hemat
`{ id nama }` → dapat 2 field saja, bukan 10.

---

## Penjelasan untuk Pemula

### Analogi: Kasir Tulis Nota
- **Query = lihat etalase**, **mutation = tulis nota** (`tambahProduk`).
- **Input = formulir**: isi 1 lembar, serahkan.

### Langkah 0 — Siapkan Device
- Sama W1-W2: `GraphiQL`.

### Cara Komputer Membaca
1. `mutation { tambahProduk(input: {...}) { id } }` → resolver simpan → balas `{ data: { tambahProduk: { id } } }`.
2. `hapusProduk` → balas `true/false`.

### 3 Istilah Wajib
1. **Mutation/input**: tulis/amplop
2. **Resolver**: pelayan tulis

---

## Eksperimen

- **Hijau:** `tambahProduk` tanpa `harga` → error `wajib`?
- **Kuning:** Minta balikan hanya `id` → tanpa `nama`?
- **Merah:** 2 `tambahProduk` alias `a` + `b` → 2 ID beda?

---

## Tantangan

**Warung Tulis Lengkap:** `mutation` tambah 2 produk (`a`, `b`) → `query` cek ada → `mutation` ubah 1 harga → `query` cek berubah. 4 langkah berurutan.

---

## Glosarium Mini

- **Mutation/input/resolver**: tulis/amplop/pelayan

---

## Ringkasan

Minggu 3 dari 5: **Tulis Warung** (Level: Pemula). Bisa tambah/ubah/hapus. Minggu depan: **Resolvers** — dapur server.
