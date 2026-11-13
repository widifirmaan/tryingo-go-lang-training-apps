# Capstone: SaaS Dashboard

> **Kategori:** Vue | **Level:** Lanjutan | **Minggu 12:** Capstone: SaaS Dashboard

## Tujuan Pembelajaran

- Menggabungkan semua konsep Vue dalam satu proyek
- Composition API + Pinia + Router pattern
- Component architecture: reusable, composable
- Testing: unit, integration, e2e
- Production build dan deployment

---

## Program: Capstone: SaaS Dashboard

Menggabungkan semua bagian dari routing, store, provide/inject, testing, dan deployment.

```vue
<!-- Capstone: SaaS analytics dashboard -->
<!-- src/main.ts: -->
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

<!-- src/App.vue: shell -->
<template>
  <header>
    <ThemeToggle />
    <CartBadge />            <!-- Pinia state -->
  </header>
  <router-view />            <!-- lazy routes -->
  <Teleport to="body">
    <Modals />               <!-- global modals -->
  </Teleport>
</template>

<!-- feature slice pattern -->
<!-- src/features/orders/ -->
// api.ts       - endpoints /api/orders
// store.ts     - defineStore('orders', () => {...})
// components/  - OrdersTable.vue, OrderRow.vue
// views/       - OrdersList.vue (route-driven via lazy import)
// Router: lazy per feature: () => import('@/features/orders/views/OrdersList.vue')
```

---

## Konsep Kunci

### Architecture layout

features/ per domain (orders, products) memisahkan tanggung jawab dan menghasilkan chunk lazy per fitur.

### DI & config

main.ts: provide apiBase, konsumsi di API clients - konfigurasi tanpa duplikasi.

### Route lazy-loading

Chunk per feature; pasang juga meta (requiresAuth) di level route.

### Testing & deploy

Unit menguji store + komponen; E2E happy path; deploy: build + CDN (static) atau SSR via Nuxt.

---

## Eksperimen

- Tambahkan feature 'settings' untuk preferensi UI per user.
- Jalankan coverage dan tambahkan test.
- Susun deploy checklist: CI, budget performa.

---

## Tantangan

Kumpulkan semua kickoffs: tulis README arsitektur + onboarding 10 menit untuk dev baru.

---

## Ringkasan

Materi minggu ini telah dibahas: Capstone: SaaS Dashboard. Lanjut ke pekan berikutnya untuk memperdalam.
