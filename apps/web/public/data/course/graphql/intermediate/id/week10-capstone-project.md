# Capstone: E-Commerce GraphQL — Restoran Grand Opening

> **Kategori:** GraphQL | **Level:** Menengah | **Minggu 10:** Capstone: E-Commerce GraphQL
> **Prasyarat:** Minggu 9 — **Testing & Error**.

## Tujuan Pembelajaran

- Gabung W1-W9: `schema` + `resolvers` + `auth` + `DataLoader` + `subscription` + `test` jadi toko GraphQL produksi

---

## Kenapa Ini Penting Buat Kamu?

9 minggu terpisah — capstone buktikan gabung: HP hemat kuota (pilih field) + cepat (DataLoader) + live (subscription) + aman (auth) + teruji. Portfolio "GraphQL production-ready".

---

## Program: Restoran Lengkap (Checklist)

```javascript
// server.js — gabung semua
// typeDefs: Produk, Query (produk + args), Mutation (tambah/ubah/hapus + login), Subscription (stokHabis)
// resolvers: Query + Mutation (auth cek!) + Subscription + Produk.kategori (DataLoader!)
// context: JWT → user
// test: 4 hijau
```

Fitur wajib:
- [ ] `query` pilih field + argumen + fragment
- [ ] `mutation` auth (tanpa token ditolak)
- [ ] `Produk.kategori` via DataLoader (log 2 query, bukan 101)
- [ ] `subscription stokHabis` 2 tab bunyi
- [ ] 4 test HIJAU + deploy (`Railway`/`Vercel`)

**Tugas capstone:** URL publik + GraphiQL screenshot tambah produk + video 1 menit. **Selesai GraphQL 0→Ahli!** 🎉


```graphql
# Capstone = grand opening: baca + tulis + lapor dalam 1 struk
mutation {
  createOrder(customer: "Budi", items: [{product: "USB-C Hub", qty: 2}]) { id total status }
}
```
---

## Konsep Kunci

### Capstone = Gabung 9 Minggu
Menu + dapur + KTP + gerobak + bel + cicip = restoran.

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Grand Opening:** Semua checklist + URL + video. **Selesai GraphQL 0→Ahli!** 🎉

---
- **Checklist integrasi:** **Schema & Types** (Minggu 1) + **Queries** (Minggu 2) + **Mutations** (Minggu 3) + **Resolvers** (Minggu 4) + **Apollo Server** (Minggu 5) + **Authentication** (Minggu 6) + **DataLoader & N+1** (Minggu 7) + **Subscriptions** (Minggu 8) + **Testing & Error** (Minggu 9) → semua bagian di atas jalan bareng saat grand opening.
## Glosarium Mini

- **Capstone/deploy**: gabung/buka

---

## Ringkasan

Minggu 10 dari 10: **Grand Opening** (Level: Menengah). **Selesai GraphQL 0→Ahli dari nol!** 🎉
