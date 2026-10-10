# Vue Router

> **Kategori:** Vue | **Level:** Intermediate | **Minggu 5:** Vue Router

## Learning Objectives

- Setup createRouter and createWebHistory
- RouterLink for navigation, RouterView for rendering
- Dynamic routes: /user/:id with useRoute
- Navigation guards: beforeEach, beforeEnter
- Lazy loading: () => import() for code splitting

---

## Program: Multi-Page App

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

## Key Concepts

### Setup
createRouter + createWebHistory.

### Navigation
RouterLink for SPA nav.

### Dynamic Routes
useRoute().params for URL params.

### Guards
beforeEach global, beforeEnter per-route.

---

## Experiments

- Create nested routes
- Implement route guard for auth
- Add transitions between routes
- Create 404 Not Found page

---

## Challenge

Build a blog app with routing: Home, Posts, Post Detail (/post/:slug), About.

---

## Summary

Week 5 of 12: **Vue Router** (Level: Intermediate). Next week: **Pinia State Management**.
