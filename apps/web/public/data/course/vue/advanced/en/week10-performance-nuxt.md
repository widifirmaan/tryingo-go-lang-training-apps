# Performance & Nuxt — Lightning Vue Shop

> **Kategori:** Vue | **Level:** Advanced | **Minggu 10:** Performance & Nuxt

## Learning Objectives

- `defineAsyncComponent(() => import("./Heavy.vue"))` + `<Suspense>` lazy load (source: vuejs.org/guide/best-practices/performance)
- Nuxt: `npx nuxi init shop` + `useFetch` + free SSR (source: nuxt.com)

---

## Why This Matters (Non-IT)

A 500KB admin page bundled into home → 5-second open, customers flee. With async + Nuxt SSR, home 50KB (0.5s) + Google reads SEO (empty SPAs don't!).

---

## Program: Lightning Vue Shop

```vue
<script setup>
import { defineAsyncComponent } from "vue";
// Heavy downloads ONLY when used!
const Chart = defineAsyncComponent(() => import("./Chart.vue"));
</script>

<template>
  <h1>Home (light!)</h1>
  <Suspense>
    <Chart />
    <template #fallback><p>Loading chart...</p></template>
  </Suspense>
</template>
```

```bash
# Nuxt: SSR + automatic file routing (like Next.js!)
npx nuxi init shop-nuxt
cd shop-nuxt && npm install && npm run dev
# pages/index.vue → /, pages/products/[id].vue → /products/1
```

```vue
<!-- pages/products/index.vue — Nuxt fetches on server -->
<script setup>
const { data } = await useFetch("/api/products"); // SSR! HTML arrives filled
</script>
<template><li v-for="p in data" :key="p.id">{{ p.name }}</li></template>
```

---

## Key Concepts

### `defineAsyncComponent` + `Suspense` = Load When Needed
Auto split → downloads on render, shows `fallback` first.

### Nuxt = Vue's Next.js
`pages/` = routes, `useFetch` SSR, `nuxi` CLI.

---

## Beginner Friendly Explanation

### Analogy: Lightning Store
- **Async = back warehouse**: heavy goods fetched on request.
- **Nuxt = ready shophouse**: routing + SSR included.

### Step 0 — Prepare Device
- Plain Vue + `npx nuxi init` for Nuxt.

### How the Computer Reads It
1. `import("./Chart.vue")` → separate split chunk.
2. Render → download chunk → show.

### 3 Must-Know Terms
1. **Async/Suspense/Nuxt**: lazy/wait/ready-shop

---

## Experiments

- **Green:** Network tab → `Chart` separate chunk?
- **Yellow:** No `Suspense` → empty first? Add fallback.
- **Red:** All plain `import`s → 1 giant chunk? (That's why async!)

---

## Challenge

**Lightning Shop:** Light home + async `Chart` + `Nuxt` 2 pages + `useFetch` + Network screenshot 2 chunks.

---

## Mini Glossary

- **Async/Nuxt/useFetch**: lazy/shop/fetch-server

---

## Summary

Week 10 of 12: **Lightning** (Level: Advanced). 5s → 0.5s. Next: **Animation**.
