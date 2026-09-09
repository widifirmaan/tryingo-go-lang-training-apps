# Performance & Nuxt — Warung Kilat Vue

> **Kategori:** Vue | **Level:** Lanjutan | **Minggu 10:** Performance & Nuxt
> **Prasyarat:** Minggu 9 — **Testing Vue**.

## Tujuan Pembelajaran

- `defineAsyncComponent(() => import("./Berat.vue"))` + `<Suspense>` muat lambat (sumber: vuejs.org/guide/best-practices/performance)
- Nuxt: `npx nuxi init warung` + `useFetch` + SSR gratis (sumber: nuxt.com)

---

## Kenapa Ini Penting Buat Kamu?

Halaman admin 500KB ikut di beranda → buka 5 detik, pelanggan kabur. Dengan async + Nuxt SSR, beranda 50KB (0.5 detik) + SEO Google baca (SPA kosong tidak!).

---

## Program: Kilat Warung Vue

```vue
<script setup>
import { defineAsyncComponent } from "vue";
// Berat diunduh HANYA saat dipakai!
const Grafik = defineAsyncComponent(() => import("./Grafik.vue"));
</script>

<template>
  <h1>Beranda (ringan!)</h1>
  <Suspense>
    <Grafik />
    <template #fallback><p>Memuat grafik...</p></template>
  </Suspense>
</template>
```

```bash
# Nuxt: SSR + routing file otomatis (seperti Next.js!)
npx nuxi init warung-nuxt
cd warung-nuxt && npm install && npm run dev
# pages/index.vue → /, pages/produk/[id].vue → /produk/1
```

```vue
<!-- pages/produk/index.vue — Nuxt ambil server -->
<script setup>
const { data } = await useFetch("/api/produk"); // SSR! HTML sudah isi
</script>
<template><li v-for="p in data" :key="p.id">{{ p.nama }}</li></template>
```

---

## Konsep Kunci

### `defineAsyncComponent` + `Suspense` = Muat Saat Perlu
Split otomatis → unduh saat render, tampil `fallback` dulu.

### Nuxt = Next.js-nya Vue
`pages/` = route, `useFetch` SSR, `nuxi` CLI.

---

## Penjelasan untuk Pemula

### Analogi: Toko Kilat
- **Async = gudang belakang**: barang berat diambil saat diminta.
- **Nuxt = ruko jadi**: routing + SSR sudah termasuk.

### Langkah 0 — Siapkan Device
- Vue biasa + `npx nuxi init` untuk Nuxt.

### Cara Komputer Membaca
1. `import("./Grafik.vue")` → split chunk terpisah.
2. Render → unduh chunk → tampil.

### 3 Istilah Wajib
1. **Async/Suspense/Nuxt**: lambat/tunggu/ruko-jadi

---

## Eksperimen

- **Hijau:** Network tab → `Grafik` chunk terpisah?
- **Kuning:** Tanpa `Suspense` → kosong dulu? Pasang fallback.
- **Merah:** Semua `import` biasa → 1 chunk raksasa? (Itulah kenapa async!)

---

## Tantangan

**Warung Kilat:** Beranda ringan + `Grafik` async + `Nuxt` 2 halaman + `useFetch` + Network screenshot 2 chunk.
- **Sambungan (Minggu 9 — Testing Vue):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Async/Nuxt/useFetch**: lambat/ruko/ambil-server

---

## Ringkasan

Minggu 10 dari 12: **Kilat** (Level: Lanjutan). 5 detik → 0.5. Minggu depan: **Animasi**.
