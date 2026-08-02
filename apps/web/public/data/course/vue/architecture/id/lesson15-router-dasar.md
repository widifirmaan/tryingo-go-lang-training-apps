# Vue Router Dasar

> Vue | Arsitektur & State | Pelajaran 15

## Tujuan Pembelajaran

- Membangun multi-page SPA dengan Vue Router
- Menggunakan RouterLink & RouterView
- Membuat dynamic routes dengan :params
- Membaca param dengan useRoute()

---

## Program: Vue Router Dasar

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import UserPage from '../pages/UserPage.vue'
import AboutPage from '../pages/AboutPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/users/:id', name: 'user', component: UserPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

```

---

## Penjelasan

## SPA & Router
SPA = satu halaman HTML; "pindah halaman" = router menukar komponen di `<RouterView>` tanpa reload. `createWebHistory()` memberi URL bersih (/about) tanpa hash (#/about).

## RouterLink
`<RouterLink to="/about">` merender <a> dengan navigasi terinterupsi — SPA tidak reload. Class aktif otomatis: `.router-link-active` (cocok untuk styling menu).

## Dynamic Routes
`path: '/users/:id'` menangkap segmen URL sebagai `route.params.id`. Akses via `useRoute()`. Ganti dengan prop routes (`props: true`) untuk kejelasan: komponen menerima id sebagai prop biasa.

## Struktur Proyek
Konvensi: `src/router/index.js` (konfigurasi), `src/pages/` (komponen halaman), `src/components/` (komponen UI). Halaman = full-screen; komponen = bagian reusable. Ini pola yang sama di Nuxt.

---

## Eksperimen

1. **SPA & Router**
2. **RouterLink**
3. **Dynamic Routes**
4. **Struktur Proyek**

---

## Tantangan

Tambah halaman Produk: /products (list dari useFetch) dan /products/:id (detail). RouterLink ke detail memakai `:to="{ name: 'product', params: { id: p.id } }"`. Ubah UserPage menerima id sebagai prop (`props: true`).

---

## Ringkasan

Router = SPA tanpa reload. RouterLink + RouterView. Dynamic routes :params. Konvensi folder pages/ + router/. Lanjut: router lanjutan.
