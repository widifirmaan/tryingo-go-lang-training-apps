# Performance & Nuxt

> **Kategori:** Vue | **Level:** Advanced | **Minggu 10:** Performance & Nuxt

## Learning Objectives

- defineAsyncComponent for lazy loading
- keep-alive for component state caching
- v-memo for conditional re-render
- Nuxt: file-based routing, auto-imports
- Nuxt: useFetch, useAsyncData, server routes

---

## Program: Optimization & SSR

```vue
// Performance: lazy loading, keep-alive, v-memo
// Nuxt = meta-framework untuk Vue (SSR, file-based routing)
// const Heavy = defineAsyncComponent(() => import("./Heavy.vue"));
// <keep-alive><router-view /></keep-alive>
// <div v-memo="[value]">{{ value }}</div>
console.log('Performance & Nuxt siap digunakan');
```

---

## Key Concepts

### Lazy Loading
defineAsyncComponent for on-demand loading.

### Keep-Alive
Cache component state.

### Nuxt
Meta-framework with SSR, file routing.

---

## Experiments

- Implement lazy loading routes
- Setup keep-alive for tabs
- Create Nuxt project with pages
- Implement server API routes

---

## Challenge

Build a blog with Nuxt: SSR, file-based routing, server API, layouts, middleware.

---

## Summary

Week 10 of 12: **Performance & Nuxt** (Level: Advanced). Next week: **Animations & Transitions**.
