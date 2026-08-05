# State Management & Stores

> Svelte | Lesson 8

## Learning Objectives

- Understand custom stores for cross-component state management\n- Understand derived stores for computed state\n- Create store actions to encapsulate logic\n- Use stores for global state without prop drilling

---

## Program: Svelte

```svelte
<script>
  import { countStore, doubleStore } from "./stores/counter";
  import { goto } from "$app/navigation";
</script>

<h1>Svelte State Management</h1>

<p>Count: {$countStore}</p>
<p>Double: {$doubleStore}</p>

<button on:click={() => countStore.update(n => n + 1)}>+</button>
<button on:click={() => countStore.update(n => n - 1)}>-</button>
<button on:click={() => countStore.set(0)}>Reset</button>

<button on:click={() => goto("/about")}>Ke About</button>
```

---

## Explanation

## Custom Stores
Custom store = object with subscribe, set, update methods. Can add custom logic inside.
## Derived Stores
derived(store, fn) — computes new value from another store reactively. Automatically updates when source store changes.
## Store Actions
Functions that modify store value. Can be exported from store file and imported in any component.
## Global State
Stores allow state to be shared across all components without prop drilling. Just import store and use $store syntax.

---

## Experiments

1. **## Custom Stores
Custom store = object with subscribe, set, update methods. Can add custom logic inside.
## Derived Stores
derived(store, fn) — computes new value from another store reactively. Automatically updates when source store changes.
## Store Actions
Functions that modify store value. Can be exported from store file and imported in any component.
## Global State
Stores allow state to be shared across all components without prop drilling. Just import store and use $store syntax.**

---

## Challenge

Level up state management: (1) create auth store (user, login, logout), (2) create theme store (light/dark mode), (3) create cart store (add, remove, total), (4) create notification store (add, remove, auto-dismiss).

---

## Summary

Custom store = global state. Derived = computed. Actions = logic. Next: final project.
