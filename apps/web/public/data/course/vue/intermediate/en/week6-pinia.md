# Pinia — Shared Vue Shop Warehouse

> **Kategori:** Vue | **Level:** Intermediate | **Minggu 6:** Pinia State Management

## Learning Objectives

- `defineStore("cart", ...)` warehouse + `store.add()` mutate + read in template (source: pinia.vuejs.org)
- `app.use(createPinia())` install once in `main.js`

---

## Why This Matters (Non-IT)

Carts are used by header + list + checkout — 5-level prop relays exhaust + 1 forgotten = divergent data. Pinia = 1 central warehouse (Vuex replacement, simpler, official Vue).

---

## Program: Pinia Cart Warehouse

```bash
npm install pinia
```

```javascript
// stores/cart.js — warehouse (not a component!)
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCart = defineStore("cart", () => {
  const items = ref([]);
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0));
  function add(item) { items.value.push(item); }
  function remove(id) { items.value = items.value.filter(i => i.id !== id); }
  return { items, total, add, remove };
});
```

```javascript
// main.js — install once
import { createPinia } from "pinia";
app.use(createPinia());
```

```vue
<!-- Header.vue + List.vue — 2 users 1 warehouse -->
<script setup>
import { useCart } from "../stores/cart";
const cart = useCart();
</script>
<template>
  <p>Items: {{ cart.items.length }} | Total: Rp {{ cart.total }}</p>
  <button @click="cart.add({ id: 1, name: 'Rice', price: 62000, qty: 1 })">Add</button>
</template>
```

---

## Key Concepts

### `defineStore` + `useX` = Warehouse + Door
`defineStore("cart", setup-fn)` creates, `useCart()` takes in any component.

### `ref` + `computed` in Store = Contents + Auto Cashier
Same as components, but shared.

---

## Beginner Friendly Explanation

### Analogy: Mall Central Warehouse
- **Pinia = warehouse**: 10 shops take the same stock, `total` auto cashier.

### Step 0 — Prepare Device
- `npm install pinia` + `app.use(createPinia())` (forget = `getActivePinia was called` error!).

### How the Computer Reads It
1. First `useCart()` → creates store.
2. `add()` → `items` changes → all `{{ cart.total }}` update.

### 3 Must-Know Terms
1. **Store/defineStore**: warehouse/make
2. **use/createPinia**: take/install

---

## Experiments

- **Green:** Add in List → Header follows?
- **Yellow:** Forget `app.use(createPinia())` → what error? Install it.
- **Red:** 2 `defineStore("cart")` in different files → 2 different warehouses? (Same name = same!)

---

## Challenge

**3-Shop Mall:** `cart` store + `Header` (count) + `List` (add) + `Checkout` (total + clear).

---

## Mini Glossary

- **Pinia/store**: warehouse
- **defineStore/use**: make/take

---

## Summary

Week 6 of 12: **Shared Warehouse** (Level: Intermediate). 1 data for all. Next: **Lifecycle**.
