# Vue Router

> **Kategori:** Vue | **Level:** Menengah | **Minggu 5:** Vue Router

## Tujuan Pembelajaran

- Setup createRouter dan createWebHistory
- RouterLink untuk navigasi, RouterView untuk render
- Dynamic routes: /user/:id dengan useRoute
- Navigation guards: beforeEach, beforeEnter
- Lazy loading: () => import() untuk code splitting

---

## Program: Multi-Halaman

```vue
// Vue Router = official routing untuk Vue.js SPA
const routes = [
  { path: '/', name: 'home', component: { template: '<h1>Beranda</h1>' } },
  { path: '/about', name: 'about', component: { template: '<h1>Tentang</h1>' } },
  { path: '/user/:id', name: 'user', component: { template: '<h1>User {{ $route.params.id }}</h1>' } },
];
// const router = createRouter({ history: createWebHistory(), routes });
// router.beforeEach((to, from, next) => { ... });
console.log('Vue Router siap digunakan');
```

---

## Konsep Kunci

### Setup
createRouter + createWebHistory. Register di app.

### Navigation
<RouterLink to="/path"> = SPA navigation.

### Dynamic Routes
/path/:id -> useRoute().params.id.

### Guards
beforeEach = global guard. beforeEnter = per-route guard.

---

## Eksperimen

- Buat nested routes
- Implementasikan route guard untuk auth
- Tambah transition antar route
- Buat 404 Not Found page

---

## Tantangan

Buat blog app dengan routing: Home, Posts, Post Detail (/post/:slug), About.

---

## Ringkasan

Minggu 5 dari 12: **Vue Router** (Level: Menengah). Minggu depan: **Pinia State Management**.
