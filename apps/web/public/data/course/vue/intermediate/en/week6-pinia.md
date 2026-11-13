## Learning Objectives

- defineStore: setup function or options style
- State: ref() for reactive state
- Getters: computed() for derived state
- Actions: functions to mutate state
- Stores across multiple components

---

## Program: Pinia State Management

Pinia store: refs, async actions, computed getters, and persistence.

```vue
// src/stores/cart.ts
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  // state (ref)
  const items = ref<{ id: number; name: string; price: number; qty: number }[]>([]);

  // getters (computed)
  const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0));
  const count = computed(() => items.value.reduce((n, i) => n + i.qty, 0));

  // actions
  function add(product: { id: number; name: string; price: number }, qty = 1) {
    const found = items.value.find((i) => i.id === product.id);
    if (found) found.qty += qty;
    else items.value.push({ ...product, qty });
  }
  async function checkout() {
    await api.post('/orders', { items: items.value, total: total.value });
    items.value = [];
  }

  return { items, total, count, add, checkout };
});

<!-- src/components/CartBadge.vue -->
<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
const cart = useCartStore();
</script>
<template>
  <span class="badge" :class="{ shake: cart.count > 5 }">
    Cart: {{ cart.count }} - {{ cart.total.toLocaleString() }}
  </span>
</template>
```

---

## Key Concepts

### Setup-store vs options

Setup store (defineStore('cart', () => { ... })) mengikuti composition API; options store lebih ringkas untuk state kecil. Hasilnya sama persis.

### Direct read, mutate via actions

Komponen boleh membaca state langsung, tetapi kapsulkan mutasi di action - mudah dilacak lewat Pinia devtools.

### State flow

component -> action -> API -> patch state -> computed derive: data mengalir satu arah, debugging mudah.

### Persistence & SSR

pinia-plugin-persistedstate menulis ke localStorage; plugin hydration membawa state server ke client saat SSR.

---

## Experiments

- Persist the cart and refresh - items remain.
- Add an undo stack for the last checkout.
- Track user-specific actions inside the store.

---

## Challenge

Add quantity adjust per item (increment/decrement + remove) as actions, with computed derived totals.

---

## Summary

This week's material has been covered: Pinia State Management. Continue to the following week to deepen.
