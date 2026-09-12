# Vue Router — Peta Warung Vue

> **Kategori:** Vue | **Level:** Menengah | **Minggu 5:** Vue Router
> **Prasyarat:** Minggu 4 — **Components & Props**.

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

```javascript
// src/main.js — WAJIB daftarkan router (lupa = halaman kosong!)
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
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

## Eksperimen

- **Hijau:** Buka `/produk` → apa yang tampil? Coba `/produk/:id` → bedanya apa?
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus baris `import { createRouter, createWebHistory } from "vue-router";` → error apa? Pasang lagi.

## Tantangan

**Vue Router di Warungmu:** pakai `/produk`, `/produk/:id` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/produk`, `/produk/:id`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Components & Props** (Minggu 4): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- **Router/Link**: peta/pintu

## Ringkasan

Minggu 5: **Peta Vue** — Router tanpa reload. Minggu depan: **Pinia**.
