# Vue Router Basics

> Vue | Architecture & State | Lesson 15

## Learning Objectives

- Build multi-page SPAs with Vue Router
- Use RouterLink & RouterView
- Create dynamic routes with :params
- Read params with useRoute()

---

## Program: Vue Router Basics

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

## Explanation

## SPA & Router
An SPA is one HTML page; "navigating" = the router swaps components inside `<RouterView>` without a reload. `createWebHistory()` gives clean URLs (/about) instead of hashes (#/about).

## RouterLink
`<RouterLink to="/about">` renders an <a> with intercepted navigation — the SPA never reloads. Active classes are automatic: `.router-link-active` (great for menu styling).

## Dynamic Routes
`path: '/users/:id'` captures a URL segment as `route.params.id`. Access via `useRoute()`. Prefer route props (`props: true`) for clarity: the component receives id as a normal prop.

## Project Structure
Convention: `src/router/index.js` (config), `src/pages/` (page components), `src/components/` (UI components). Pages are full-screen; components are reusable parts. This is the same pattern Nuxt uses.

---

## Experiments

1. **SPA & Router**
2. **RouterLink**
3. **Dynamic Routes**
4. **Struktur Proyek**

---

## Challenge

Add a Products page: /products (list from useFetch) and /products/:id (detail). RouterLink to detail uses `:to="{ name: 'product', params: { id: p.id } }"`. Make UserPage receive id as a prop (`props: true`).

---

## Summary

Router = SPA without reload. RouterLink + RouterView. Dynamic :params routes. pages/ + router/ folder convention. Next: advanced routing.
