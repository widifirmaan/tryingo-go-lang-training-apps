# Testing & Error — Cicip Restoran GraphQL

> **Kategori:** GraphQL | **Level:** Menengah | **Minggu 9:** Testing & Error Handling
> **Prasyarat:** Minggu 8 — **Subscriptions**.

## Tujuan Pembelajaran

- Uji resolver langsung (tanpa server): `Query.produk()` + `expect` (vitest)
- Error rapi: `throw new GraphQLError("...", { extensions: { code: "TIDAK_ADA" } })` (bukan `Error` mentah)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa uji, ubah resolver → HP crash ketahuan pelanggan. Tanpa kode error, HP tidak tahu "tidak ada" vs "server mati" (pesan beda!). 

---

## Program: Cicip Dapur GraphQL

```javascript
// resolvers.test.js
import { test, expect } from "vitest";
import { resolvers } from "./resolvers.js";

test("produk ada 2", async () => {
  const hasil = await resolvers.Query.produk();
  expect(hasil.length).toBe(2);
});

test("tambah tanpa nama ditolak", async () => {
  await expect(resolvers.Mutation.tambahProduk(null, {}))
    .rejects.toThrow("Nama wajib");
});
```

```javascript
// Error berkode (bukan mentah!)
const { GraphQLError } = require("graphql");
if (!produk) {
  throw new GraphQLError("Produk tidak ada", {
    extensions: { code: "TIDAK_ADA", id },
  });
}
// HP baca: errors[0].extensions.code === "TIDAK_ADA" → tampil "habis"
```

---

## Konsep Kunci

### Uji Resolver = Cicip Dapur
Panggil fungsi langsung + `expect` — tanpa `node server.js`.

### `GraphQLError` + `extensions.code` = Alarm Berkode
HP bedakan `TIDAK_ADA` (tampil habis) vs `SERVER_MATI` (coba lagi).

---

## Penjelasan untuk Pemula

### Analogi: Cicip + Alarm Kebakaran
- **Test = cicip**: masak → cicip mesin.
- **extensions.code = jenis alarm**: kebakaran vs pintu.

### 3 Istilah Wajib
1. **vitest/GraphQLError**: cicip/alarm-berkode

---

## Eksperimen

- **Hijau:** Ubah resolver rusak → test merah?
- **Kuning:** `Error` mentah vs `GraphQLError` → HP terima `extensions`?
- **Merah:** Test tanpa `await` → lulus palsu? (Promise tidak ditunggu!)

---

## Tantangan

**Restoran Teruji:** 4 test (Query 2 + Mutation 1 + error 1) HIJAU + 2 `extensions.code` beda.

---

## Glosarium Mini

- **vitest/GraphQLError**: cicip/alarm

---

## Ringkasan

Minggu 9 dari 10: **Cicip Berkode** (Level: Menengah). Ubah berani. Minggu depan: **Capstone**.
