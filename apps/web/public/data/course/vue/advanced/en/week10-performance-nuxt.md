# Performance & Nuxt

> **Kategori:** Vue | **Level:** Advanced | **Minggu 10:** Performance & Nuxt

## Learning Objectives

- defineAsyncComponent for lazy loading
- keep-alive for component state caching
- v-memo for conditional re-render
- Nuxt: file-based routing, auto-imports
- Nuxt: useFetch, useAsyncData, server routes

---

## Program: Performance & Nuxt 3

Performance tuning, code splitting, lazy and async components, then Nuxt for SSR/prerendering.

```vue
// === Manual code splitting ===
const HeavyChart = defineAsyncComponent(() => import('./HeavyChart.vue'));

// v-memo: skip re-render when deps unchanged
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

// nuxt.config.ts:
// defineNuxtConfig({
//   ssr: true,                    // SEO-ready HTML at first byte
//   nitro: { static: false },
//   experimental: { payloadExtraction: true },
// })

// Route-level: /about prerendered; /dashboard SSR; states via nuxt hooks
```

---

## Key Concepts

### Bundle analysis

Analisa chunk dengan rollup-plugin-visualizer: pecah chunk raksasa lewat lazy import.

### v-memo & keys

v-memo di tabel panjang melewati re-render saat deps ([item.id, item.qty]) tidak berubah — ukur sebelum dipakai luas.

### Nuxt SSR + hydration

SSR mengirim HTML SEO-ready; hydration menyalakan interaksi di client; waspadai hydration mismatch (angka acak, tanggal lokal).

### Prerender strategy

Halaman statik (landing) di-prerender; dashboard dinamis SSR; shell CSR untuk area login.

---

## Experiments

- Bench: log chunk count before/after lazy import.
- Benchmark v-memo on a 1000-row table.
- Run nuxi generate to see prerendered vs SSR pages.

---

## Challenge

Profile Lighthouse: preload fonts, lazy images, then benchmark lab + field data.

---

## Summary

This week's material has been covered: Performance & Nuxt 3. Continue to the following week to deepen.
