# Router Lanjutan

> Vue | Arsitektur & State | Pelajaran 16

## Tujuan Pembelajaran

- Membuat nested routes dengan children
- Melindungi route dengan navigation guards
- Lazy loading route dengan dynamic import
- Menangani halaman 404 dengan catch-all

---

## Program: Router Lanjutan

```js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/HomePage.vue') },
  {
    path: '/dashboard',
    component: () => import('../pages/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'dashboard', component: () => import('../pages/DashboardHome.vue') },
      { path: 'settings', name: 'settings', component: () => import('../pages/DashboardSettings.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard: proteksi route
router.beforeEach((to) => {
  const isLoggedIn = localStorage.getItem('demo-auth') === '1'
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router

```

---

## Penjelasan

## Nested Routes
`children` membuat route bertingkat: layout (sidebar/header) sebagai komponen induk, konten anak di `<RouterView>` kedua di dalam layout. Pattern dashboard klasik.

## Navigation Guards
`router.beforeEach((to) => ...)` dijalankan sebelum navigasi. Kembalikan route lain untuk redirect (`return { name: 'login' }`) atau true/undefined untuk lanjut. `to.meta.requiresAuth` = metadata per route — pola proteksi halaman standar.

## Lazy Loading
`component: () => import(...)` memecah kode per route: chunk diunduh saat pertama kali dikunjungi. Bundle awal kecil, navigasi tetap cepat. Ini praktik standar produksi — jangan import statis untuk halaman besar.

## Catch-all 404
`{ path: '/:pathMatch(.*)*' }` menangkap URL yang tidak cocok route mana pun. Selalu punya halaman 404 yang ramah, bukan layar putih.

---

## Eksperimen

1. **Nested Routes**
2. **Navigation Guards**
3. **Lazy Loading**
4. **Catch-all 404**

---

## Tantangan

Tambahkan guard kedua: route /dashboard/settings hanya bisa diakses jika `meta.requiresAuth` DAN role "admin" ada di localStorage. Simulasikan logout (hapus localStorage + redirect ke /). Jadikan seluruh dashboard lazy-loaded.

---

## Ringkasan

Nested routes untuk layout. Guards + meta untuk proteksi. Lazy loading per route. Catch-all 404. Lanjut: Pinia & state ladder.
