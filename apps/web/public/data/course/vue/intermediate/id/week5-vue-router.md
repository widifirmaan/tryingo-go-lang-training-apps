# Vue Router — Peta Warung Vue

> **Kategori:** Vue | **Level:** Menengah | **Minggu 5:** Vue Router

## Tujuan Pembelajaran

- `npm install vue-router`, `createRouter` + `createWebHistory`, `routes` peta, `<RouterView>` etalase ganti, `<RouterLink>` pintu

---

## Kenapa Ini Penting Buat Kamu?

Sama seperti React Router — pindah tanpa reload header.

---

## Program: Toko Vue 3 Halaman

```bash
npm install vue-router
```

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Beranda from "../views/Beranda.vue";
import Daftar from "../views/Daftar.vue";
import Detail from "../views/Detail.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Beranda },
    { path: "/produk", component: Daftar },
    { path: "/produk/:id", component: Detail, props: true },
  ],
});
```

```vue
<!-- App.vue -->
<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <nav><RouterLink to="/">Beranda</RouterLink> | <RouterLink to="/produk">Produk</RouterLink></nav>
  <RouterView />
</template>

<!-- Detail.vue -->
<script setup>
const props = defineProps({ id: String });
</script>
<template><h1>Detail {{ id }}</h1><RouterLink to="/produk">Kembali</RouterLink></template>
```

---

## Ringkasan

Minggu 5: **Peta Vue** — Router tanpa reload. Minggu depan: **Pinia**.
