# Vue Router — Vue Shop Map

> **Kategori:** Vue | **Level:** Intermediate | **Minggu 5:** Vue Router
> **Prerequisites:** Week 4 — **Components & Props**.

## Learning Objectives

- `npm install vue-router`, `createRouter` + `createWebHistory`, `routes` map, `<RouterView>` swapping showcase, `<RouterLink>` door

---

## Why This Matters (Non-IT)

Same as React Router — move without reloading the header.

---

## Program: 3-Page Vue Store

```bash
npm install vue-router
```

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import List from "../views/List.vue";
import Detail from "../views/Detail.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/products", component: List },
    { path: "/products/:id", component: Detail, props: true },
  ],
});
```

```javascript
// src/main.js — MUST register router (forgotten = blank pages!)
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
```

```vue
<!-- App.vue -->
<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <nav><RouterLink to="/">Home</RouterLink> | <RouterLink to="/products">Products</RouterLink></nav>
  <RouterView />
</template>

<!-- Detail.vue -->
<script setup>
const props = defineProps({ id: String });
</script>
<template><h1>Detail {{ id }}</h1><RouterLink to="/products">Back</RouterLink></template>
```

---

## Key Concepts

### `createRouter` / `routes` / `RouterView`
`routes` array = the map; `RouterView` = slot showing the matched page; `RouterLink` = doors.

---

## Beginner Friendly Explanation

### Analogy: Mall Map
- **Router = map**, **`RouterView` = stage** swapping scenes, **`RouterLink` = doors**.

### Step 0 — Prepare Device
- Vue project + `npm install vue-router`, click links, watch URL vs reload.

### How the Computer Reads It
1. URL `/products/1` → router matches `:id` route → renders `Detail` with `id` prop.
2. `RouterLink` → changes URL without reload.

### 3 Must-Know Terms
1. **Router/View/Link**: map/stage/doors

---

## Experiments

- **Green:** `RouterLink` vs `<a>` → reload blink? Keep `RouterLink`.
- **Yellow:** Unknown path → blank? Add `/:pathMatch(.*)` catch-all.
- **Red:** Missing `props: true` → `id` undefined? Add it.

---

## Challenge

**3-Page Store:** Home + product list with `RouterLink`s to `Detail/:id` + catch-all NotFound.

---

## Mini Glossary

- **Router/Link**: map/doors

---

## Summary

Week 5: **Vue Map** — Router without reload. Next: **Pinia**.
