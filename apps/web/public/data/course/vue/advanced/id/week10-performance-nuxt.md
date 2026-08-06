# Performance & Nuxt

> **Kategori:** Vue | **Level:** Lanjutan | **Minggu 10:** Performance & Nuxt

## Tujuan Pembelajaran

- defineAsyncComponent untuk lazy loading
- keep-alive untuk cache component state
- v-memo untuk conditional re-render
- Nuxt: file-based routing, auto-imports
- Nuxt: useFetch, useAsyncData, server routes

---

## Program: Optimasi & SSR

```vue
// Performance: lazy loading, keep-alive, v-memo
// Nuxt = meta-framework untuk Vue (SSR, file-based routing)
// const Heavy = defineAsyncComponent(() => import("./Heavy.vue"));
// <keep-alive><router-view /></keep-alive>
// <div v-memo="[value]">{{ value }}</div>
console.log('Performance & Nuxt siap digunakan');
```

---

## Konsep Kunci

### Lazy Loading
defineAsyncComponent + import() = load saat dibutuhkan.

### Keep-Alive
Cache component saat di-switch.

### Nuxt
Meta-framework: SSR, file routing, auto-import.

---

## Eksperimen

- Implementasikan lazy loading route
- Setup keep-alive untuk tabs
- Buat Nuxt project dengan pages
- Implementasikan server API route

---

## Tantangan

Buat blog dengan Nuxt: SSR, file-based routing, server API, layouts, middleware.

---

## Ringkasan

Minggu 10 dari 12: **Performance & Nuxt** (Level: Lanjutan). Minggu depan: **Animations & Transitions**.
