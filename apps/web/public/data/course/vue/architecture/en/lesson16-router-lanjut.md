# Advanced Routing

> Vue | Architecture & State | Lesson 16

## Learning Objectives

- Create nested routes with children
- Protect routes with navigation guards
- Lazy-load routes with dynamic imports
- Handle 404 pages with catch-all

---

## Program: Advanced Routing

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

## Explanation

## Nested Routes
`children` creates nested routes: a layout (sidebar/header) as the parent component, child content in a second `<RouterView>` inside that layout. The classic dashboard pattern.

## Navigation Guards
`router.beforeEach((to) => ...)` runs before navigation. Return another route to redirect (`return { name: 'login' }`) or true/undefined to continue. `to.meta.requiresAuth` is per-route metadata — the standard page-protection pattern.

## Lazy Loading
`component: () => import(...)` code-splits per route: the chunk downloads on first visit. The initial bundle stays small, navigation stays fast. This is standard production practice — never statically import large pages.

## Catch-all 404
`{ path: '/:pathMatch(.*)*' }` catches URLs matching no route. Always have a friendly 404 page, never a blank screen.

---

## Experiments

1. **Nested Routes**
2. **Navigation Guards**
3. **Lazy Loading**
4. **Catch-all 404**

---

## Challenge

Add a second guard: /dashboard/settings requires `meta.requiresAuth` AND an "admin" role in localStorage. Simulate logout (clear localStorage + redirect to /). Make the whole dashboard lazy-loaded.

---

## Summary

Nested routes for layouts. Guards + meta for protection. Per-route lazy loading. Catch-all 404. Next: Pinia & the state ladder.
