## Learning Objectives

- Setup createRouter and createWebHistory
- RouterLink for navigation, RouterView for rendering
- Dynamic routes: /user/:id with useRoute
- Navigation guards: beforeEach, beforeEnter
- Lazy loading: () => import() for code splitting

---

## Program: Vue Router: Routes & Guards

Router with dynamic routes, lazy loading, and navigation guards.

```vue
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('./views/Home.vue') },         // lazy
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

## Key Concepts

### Dynamic segments

:id di path; regex juga didukung (:id(\d+)) sebagai constraint; beberapa params bisa digabung dalam satu segmen.

### Lazy loading routes

import() async menempatkan komponen di chunk berbeda; aplikasi berukuran besar tetap kecil di initial bundle.

### Guards: beforeEach/perRoute

Guard bisa async; return false membatalkan navigasi, return object redirect mengarahkan ke rute lain.

### Nested views & components

<router-view> di dalam layout; name untuk outlet sibling - clean UI composition.

---

## Experiments

- Add per-route meta and read it in a global guard.
- Animate router-view transitions.
- Query param preservation across router.push.

---

## Challenge

Build a multi-step (nested) checkout with per-step guards and a store.

---

## Summary

This week's material has been covered: Vue Router: Routes & Guards. Continue to the following week to deepen.
