# Lifecycle & Watchers — Open, Watch, Close Vue Shop

> **Kategori:** Vue | **Level:** Intermediate | **Minggu 7:** Lifecycle & Watchers
> **Prerequisites:** Week 6 — **Pinia**.

## Learning Objectives

- `onMounted` open (fetch) + `onUnmounted` close (clean timers) (source: vuejs.org/guide/essentials/lifecycle)
- `watch(search, fn)` watches 1 + `watchEffect` auto-watches

---

## Why This Matters (Non-IT)

Fetching outside `onMounted` runs during SSR (server) → `window` errors. Timers without `onUnmounted` keep running after page change (leak!). `watch` searches automatically without buttons.

---

## Program: Open-Watch-Close Store

```vue
<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const list = ref([]);
const search = ref("");
const results = ref([]);
let timer = null;

onMounted(async () => {           // open: fetch once
  const res = await fetch("/api/products");
  list.value = await res.json();
  results.value = list.value;
  timer = setInterval(() => console.log("checking stock..."), 10000);
});

onUnmounted(() => clearInterval(timer));  // close: kill it!

watch(search, (fresh) => {        // watch search → filter
  results.value = list.value.filter(p =>
    p.name.toLowerCase().includes(fresh.toLowerCase()));
});
</script>

<template>
  <input v-model="search" placeholder="Search..." />
  <ul><li v-for="p in results" :key="p.id">{{ p.name }}</li></ul>
</template>
```

---

## Key Concepts

### `onMounted` / `onUnmounted` = Open / Close
`onMounted` after showing (safe fetch), `onUnmounted` before leaving (clean timers).

### `watch` vs `watchEffect` = Watch 1 / Auto
`watch(search, fn)` watches `search`. `watchEffect` watches everything read inside.

---

## Beginner Friendly Explanation

### Analogy: Open-Close Shop + CCTV
- **onMounted = open doors at 7** (fetch stock), **onUnmounted = close at 20** (kill lights/timers).
- **watch = search CCTV**: movement → record (filter).

### Step 0 — Prepare Device
- Same as Vue W1.

### How the Computer Reads It
1. Mount → `onMounted` → fetch → `list` filled.
2. Type → `search` changes → `watch` → `results` filtered.
3. Change page → `onUnmounted` → timer dead.

### 3 Must-Know Terms
1. **onMounted/onUnmounted**: open/close
2. **watch/watchEffect**: watch-1/auto

---

## Experiments

- **Green:** Type "ric" → results filter without buttons?
- **Yellow:** Delete `onUnmounted` → change page, console still "checking stock"? (Leak! Reattach.)
- **Red:** Fetch outside `onMounted` (direct setup) → runs 2x (SSR+client)? Move inside.

---

## Challenge

**Living Store:** `onMounted` fetch + `watch` search + `onUnmounted` kill interval + loading shown during fetch.
- **Link-up (Week 6 — Pinia):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **onMounted/onUnmounted/watch**: open/close/watch

---

## Summary

Week 7 of 12: **Open-Watch-Close** (Level: Intermediate). No leaks. Next: **Provide/Inject**.
