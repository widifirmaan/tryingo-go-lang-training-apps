# Vue Router

> **Kategori:** Vue | **Level:** Menengah | **Minggu 5:** Vue Router

## Tujuan Pembelajaran

- Setup createRouter dan createWebHistory
- RouterLink untuk navigasi, RouterView untuk render
- Dynamic routes: /user/:id dengan useRoute
- Navigation guards: beforeEach, beforeEnter
- Lazy loading: () => import() untuk code splitting

---

## Program: Vue Router: Rute & Guards

Router dengan rute dinamis, lazy loading, dan navigation guards.

```vue
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('./views/Home.vue') },         // dirender hanya saat dibutuhkan
  { path: '/products', component: () => import('./views/ProductList.vue') },
  { path: '/products/:id(\d+)', component: () => import('./views/ProductDetail.vue') },
  { path: '/admin', component: () => import('./views/Admin.vue'),
    meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

// Global guard
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !useAuth().isLogged) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }
});

// src/views/ProductDetail.vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();            // params, query, hash
const router = useRouter();          // push, replace, back
const productId = route.params.id;
router.replace('/products');
</script>
```

---

## Konsep Kunci

### Dynamic segments

:id di path; regex juga didukung (:id(\d+)) sebagai constraint; beberapa params bisa digabung dalam satu segmen.

### Lazy loading routes

import() async menempatkan komponen di chunk berbeda; aplikasi berukuran besar tetap kecil di initial bundle.

### Guards: beforeEach/perRoute

Guard bisa async; return false membatalkan navigasi, return object redirect mengarahkan ke rute lain.

### Nested views & components

<router-view> di dalam layout; name untuk outlet sibling - clean UI composition.

---

## Eksperimen

- Tambah meta.requiresRole lalu cek di guard global.
- Bungkus router-view dengan <Transition> mode out-in.
- Pertahankan query saat router.push ke route lain.

---

## Tantangan

Buat multi-step (nested) checkout keseluruhan dengan guards per langkah dan state store.

---

## Ringkasan

Materi minggu ini telah dibahas: Vue Router: Rute & Guards. Lanjut ke pekan berikutnya untuk memperdalam.
