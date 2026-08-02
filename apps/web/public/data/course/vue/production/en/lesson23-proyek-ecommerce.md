# Project: E-commerce

> Vue | Production-Grade | Lesson 23

## Learning Objectives

- Build an e-commerce app with a Pinia store
- Manage quantities & totals with getters
- Separate presentation components vs global state
- Apply all patterns: props, emits, store, computed

---

## Program: Project: E-commerce

```js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.qty, 0)
  )
  const count = computed(() =>
    items.value.reduce((sum, i) => sum + i.qty, 0)
  )

  function add(product) {
    const found = items.value.find((i) => i.id === product.id)
    if (found) found.qty += 1
    else items.value.push({ ...product, qty: 1 })
  }

  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, total, count, add, remove, clear }
})

```

---

## Explanation

## Phase 4 Checkpoint
This project brings it all together: computed (total/count), store actions (add/remove/clear), storeToRefs (safe destructuring), pure presentation components (ProductList only calls store actions). If this works, you are ready for production.

## Cart Logic in the Store
Quantity is business logic → lives in the store (getters + actions), not in components. ProductList and CartDrawer share one cart; both update automatically because they read the same ref (global Pinia state).

## Presentation vs State
`ProductList` is pure UI + calls `cart.add(p)` — it stores nothing. This is the smart/dumb pattern: "dumb" components call/display, "smart" components (App) orchestrate. Consistent and easy to test.

## On to the Capstone
All the ingredients are ready: form validation (19), transitions (20), performance (21), testing (22). The capstone (phase 5) combines them with ecosystem tools (Nuxt, i18n, deploy).

---

## Experiments

1. **Checkpoint Fase 4**
2. **Cart Logic di Store**
3. **Presentasi vs State**
4. **Lanjut ke Capstone**

---

## Challenge

Extend it: (1) category filter in ProductList (computed), (2) -/+ buttons per item in the drawer, (3) checkout form (name, email, address) with validation → success message + cart.clear(), (4) Vitest tests for the cart store (lesson-22 pattern).

---

## Summary

E-commerce: store holds business logic, pure presentation components. storeToRefs + getters. Phase 4 checkpoint complete. Next: the ecosystem phase.
