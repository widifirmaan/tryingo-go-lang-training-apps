# Pinia State Management

> **Kategori:** Vue | **Level:** Intermediate | **Minggu 6:** Pinia State Management

## Learning Objectives

- defineStore: setup function or options style
- State: ref() for reactive state
- Getters: computed() for derived state
- Actions: functions to mutate state
- Stores across multiple components

---

## Program: Store & Cart

```vue
// Pinia = official state management untuk Vue
// export const useCartStore = defineStore("cart", () => {
//   const items = ref([]);
//   const totalItems = computed(() => items.value.reduce((s, i) => s + i.quantity, 0));
//   function addItem(product) { ... }
//   function removeItem(id) { ... }
//   return { items, totalItems, addItem, removeItem };
// });
console.log('Pinia State Management siap digunakan');
```

---

## Key Concepts

### Setup Store
defineStore with setup function.

### State
ref() for reactive state.

### Getters
computed() for derived values.

### Actions
Functions to mutate state.

---

## Experiments

- Create multiple stores
- Implement async action
- Add store persistence
- Create store with modules pattern

---

## Challenge

Build an e-commerce with Pinia: product store, cart store, user store.

---

## Summary

Week 6 of 12: **Pinia State Management** (Level: Intermediate). Next week: **Lifecycle & Watchers**.
