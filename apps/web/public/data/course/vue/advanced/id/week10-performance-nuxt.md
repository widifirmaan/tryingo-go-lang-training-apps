# Performance & Nuxt

## Tujuan Pembelajaran

- defineAsyncComponent untuk lazy loading
- keep-alive untuk cache component state
- v-memo untuk conditional re-render
- Nuxt: file-based routing, auto-imports
- Nuxt: useFetch, useAsyncData, server routes

---

## Program: Performa & Nuxt 3

Optimasi boot size, code splitting, lazy/async components, dan Nuxt untuk SSR / Prerendering.

```vue
// === Code splitting manual ===
const HeavyChart = defineAsyncComponent(() => import('./HeavyChart.vue'));

// v-memo: melompat re-render card yang tak berubah
<div v-memo="[item.id, item.qty]" class="row">
  <span>{{ item.name }}</span><span>{{ item.qty }}</span>
</div>

// === Nuxt 3: server rendering + data ===
// pages/index.vue
<script setup>
const { data: products, refresh } = await useAsyncData('products', () =>
  $fetch('/api/products')
);
</script>

// nuxt.config.ts pseudo-config:
// defineNuxtConfig({
//   ssr: true,                    // server rendering HTML siap SEO
//   nitro: { static: false },
//   experimental: { payloadExtraction: true },
// })

// Route-level: /about prerendered; /dashboard SSR; states via nuxt hooks
```

---

## Konsep Kunci

### Bundle analysis

Analisa chunk dengan rollup-plugin-visualizer: pecah chunk raksasa lewat lazy import.

### v-memo & keys

v-memo di tabel panjang melewati re-render saat deps ([item.id, item.qty]) tidak berubah - ukur sebelum dipakai luas.

### Nuxt SSR + hydration

SSR mengirim HTML SEO-ready; hydration menyalakan interaksi di client; waspadai hydration mismatch (angka acak, tanggal lokal).

### Prerender strategy

Halaman statik (landing) di-prerender; dashboard dinamis SSR; shell CSR untuk area login.

---

## Eksperimen

- Bench: log jumlah chunk sebelum/sesudah lazy import.
- Ukur v-memo pada tabel 1000 baris.
- Jalankan nuxi generate: berapa halaman prerender vs SSR.

---

## Tantangan

Profil Lighthouse: preload font, lazy gambar, lalu bandingkan lab + field data.

---

## Ringkasan

Materi minggu ini telah dibahas: Performa & Nuxt 3. Lanjut ke pekan berikutnya untuk memperdalam.
