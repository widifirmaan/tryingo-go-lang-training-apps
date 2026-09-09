# Queries — Pesan Tepat yang Dimau (GraphQL)

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 2:** Queries
> **Prasyarat:** Minggu 1 — **Schema & Types**.

## Tujuan Pembelajaran

- `produk(kategori: "Sembako")` argumen saring, `murah: produk(...)` alias 2x, `fragment Kartu` potongan pakai ulang (sumber: graphql.org/learn/queries)
- Variabel `$kategori: String!` + JSON variables (aman, tanpa tempel string)

---

## Kenapa Ini Penting Buat Kamu?

REST `/api/produk` kirim SEMUA field (nama, harga, deskripsi, stok, created_at) padahal daftar HP butuh nama+harga saja → kuota boros. GraphQL minta `nama harga` → dapat itu saja. 1 endpoint `/graphql` untuk semua, tidak 20 endpoint.

---

## Program: Pesan Warung Tepat

```graphql
# 1. Argumen: saring di server
query {
  produk(kategori: "Sembako") {
    nama
    harga
  }
}

# 2. Alias: 2 pesanan sekaligus (murah + mahal)
query Dua {
  murah: produk(kategori: "Sayur") { nama harga }
  mahal: produk(kategori: "Sembako") { nama harga }
}

# 3. Fragment: potongan kartu pakai ulang
fragment Kartu on Produk {
  nama
  harga
  stok
}
query {
  produk { ...Kartu }
}

# 4. Variabel: aman (jangan tempel string!)
query Cari($kategori: String!) {
  produk(kategori: $kategori) {
    nama
    harga
  }
}
# Variables JSON: { "kategori": "Sembako" }
```

Coba di `onecompiler.com/graphql` atau `GraphiQL` (`/graphql` di server).

---

## Konsep Kunci

### Field Pilih = Hemat Kuota
Tulis yang dimau saja (`nama harga`), server kirim itu saja.

### Argumen/Alias/Fragment/Variabel = Alat Pesan
- `produk(kategori: "Sembako")` saring.
- `murah: produk(...)` 2 nama beda 1 query.
- `fragment` potongan kartu.
- `$kategori` variabel + JSON (anti SQL-injection ala GraphQL).

---

## Penjelasan untuk Pemula

### Analogi: Restoran Prasmanan vs Paket
- **REST = prasmanan paket**: pesan "paket A" dapat 10 lauk (maunya 2).
- **GraphQL = pesan ala carte**: tulis `nama harga` → dapat 2.

### Langkah 0 — Siapkan Device
- Sama W1: `GraphiQL` di browser (tanpa install) atau `onecompiler.com/graphql`.

### Cara Komputer Membaca
1. `query { produk { nama } }` → server cek schema → ambil `nama` tiap produk → JSON `{ data: { produk: [...] } }`.
2. Selalu bungkus `data` (atau `errors` jika gagal).

### 3 Istilah Wajib
1. **Query/field**: pesan/kolom
2. **Argumen/alias**: saring/nama ganda
3. **Fragment/variabel**: potongan/aman

---

## Eksperimen

- **Hijau:** Minta hanya `nama` (tanpa `harga`) → JSON tanpa harga?
- **Kuning:** 1 query 2 alias `a` + `b` kategori beda → 2 hasil?
- **Merah:** Tempel `kategori` langsung `"Say" + "ur"`? Jangan — pakai `$variabel`.

---

## Tantangan

**Warung Pesan Lengkap:** 1 query: `semua: produk { ...Kartu }` + `sayur: produk(kategori:"Sayur") { nama }` + variabel `$kat` untuk 1 lagi. 3 hasil 1 request.
- **Sambungan (Minggu 1 — Schema & Types):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Query/argumen/alias**: pesan/saring/ganda
- **Fragment/variabel**: potongan/aman

---

## Ringkasan

Minggu 2 dari 5: **Pesan Tepat** (Level: Pemula). Hemat kuota, 1 endpoint. Minggu depan: **Mutations** — tulis & ubah.
