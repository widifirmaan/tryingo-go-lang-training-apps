# Capstone: SaaS Dashboard

## Learning Objectives

- Combine all Vue concepts in one project
- Composition API + Pinia + Router pattern
- Component architecture: reusable, composable
- Testing: unit, integration, e2e
- Production build and deployment

---

## Program: Capstone: SaaS Dashboard

Combines routing, store, provide/inject, testing, and deployment.

```vue
<!-- Capstone: SaaS analytics dashboard -->
<!-- src/main.ts -->
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import { provideTheme } from '@/composables/useTheme';
import './style.css';

const app = createApp(App);
app.use(createPinia()).use(router);
app.provide('apiBase', import.meta.env.VITE_API_BASE);
provideTheme();
app.mount('#app');

<!-- src/App.vue shell -->
<template>
  <header>
    <ThemeToggle />
    <CartBadge />            <!-- Pinia state -->
  </header>
  <router-view />            <!-- lazy routes -->
  <Teleport to="body">
    <Modals />
  </Teleport>
</template>

<!-- Feature slice pattern -->
<!-- src/features/orders/ -->
// api.ts       - /api/orders endpoints
// store.ts     - defineStore('orders', () => {...})
// components/  - OrdersTable.vue, OrderRow.vue
// views/       - OrdersList.vue (route-loaded)
// Router: lazy per feature: () => import('@/features/orders/views/OrdersList.vue')
```

---

## Key Concepts

### Architecture layout

features/ per domain (orders, products) memisahkan tanggung jawab dan menghasilkan chunk lazy per fitur.

### DI & config

main.ts: provide apiBase, konsumsi di API clients - konfigurasi tanpa duplikasi.

### Route lazy-loading

Chunk per feature; pasang juga meta (requiresAuth) di level route.

### Testing & deploy

Unit menguji store + komponen; E2E happy path; deploy: build + CDN (static) atau SSR via Nuxt.

---

## Experiments

- Add a settings feature with per-user UI preferences.
- Run coverage reports and expand tests.
- Deploy checklist: DX, CI, performance budget.

---

## Challenge

Write an architecture README so a new dev onboards in 10 minutes.

---

## Summary

This week's material has been covered: Capstone: SaaS Dashboard. Continue to the following week to deepen.
