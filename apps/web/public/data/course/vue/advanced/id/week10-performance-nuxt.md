# Performance — Warung Tetap Cepat (Vue/Nuxt)

> **Kategori:** Vue | **Level:** Lanjutan | **Minggu 10:** Performance

## Tujuan Pembelajaran

- `defineAsyncComponent` + `Suspense` muat lambat, `v-memo` cache

---

## Program

```vue
<script setup>
import { defineAsyncComponent } from "vue";
const Berat = defineAsyncComponent(() => import("./Berat.vue"));
</script>

<template>
  <Suspense><Berat /></Suspense>
</template>
```

---

## Ringkasan

Minggu 10: **Cepat** — async + Suspense.
