# State Ladder & Pinia

> Vue | Architecture & State | Lesson 17

## Learning Objectives

- Master the "state ladder": local → lift → provide/inject → Pinia
- Create stores with defineStore (setup syntax)
- Use getters & actions
- Know when NOT to use Pinia

---

## Program: State Ladder & Pinia

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from './stores/cart'

const cart = useCartStore()

// storeToRefs: destructuring aman — menjaga reaktivitas!
const { items, total } = storeToRefs(cart)
</script>

<template>
  <h1>Keranjang (Pinia)</h1>
  <button @click="cart.add({ id: 2, name: 'Vue T-Shirt', price: 185000 })">
    Tambah T-Shirt
  </button>
  <ul>
    <li v-for="i in items" :key="i.id">
      {{ i.name }} x{{ i.qty }} — Rp{{ (i.price * i.qty).toLocaleString('id-ID') }}
      <button @click="cart.remove(i.id)">hapus</button>
    </li>
  </ul>
  <p><strong>Total: Rp{{ total.toLocaleString('id-ID') }}</strong></p>
</template>

```

---

## Explanation

## The State Ladder (decision order)
Before reaching for Pinia, ask in order: (1) server data? → query library/useFetch, (2) must survive refresh/link? → URL/query params, (3) used by one component + its children? → local ref, (4) used by a few siblings? → lift to the closest common parent, (5) used by many far-apart components? → Pinia. Almost all state stops at steps 3-4. Climb only when it actually hurts.

## Setup Store = Composable
`defineStore('cart', () => { ... })` is exactly like a composable: ref (state), computed (getters), functions (actions). "If you understand ref/computed, you already know 80% of Pinia." No Vuex-style mutation layer.

## storeToRefs
Destructuring a store (`const { items } = cart`) breaks reactivity — the same trap as reactive(). You MUST use `storeToRefs(cart)` for state; methods/actions can be called directly as `cart.add()`.

## When NOT to Use Pinia
One component → no. Form drafts → no (they live in the component). Server data → no (different lifecycle). Dropdown toggles → no. Pinia is for: cross-route UI state that must survive navigation (cart, user auth, theme, notifications).

---

## Experiments

1. **State Ladder (tangga keputusan)**
2. **Setup Store = Composable**
3. **storeToRefs**
4. **Kapan TIDAK Pakai Pinia**

---

## Challenge

Extend the store: add a `clear()` action, a `count` getter, and localStorage persistence (watch inside the store). Make a second App — the cart is GLOBAL: changes in one component are instantly visible in another (unlike instance composables).

---

## Summary

State ladder: start local, climb gradually. Setup stores = global composables. storeToRefs required. Pinia for cross-route state. Next: dashboard project.
