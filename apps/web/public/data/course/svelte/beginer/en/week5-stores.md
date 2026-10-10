# Svelte Stores

> **Kategori:** Svelte | **Level:** Beginner | **Minggu 5:** Svelte Stores

## Learning Objectives

- writable store for mutable state
- derived store for derived state
- Custom store with methods
- $ prefix for auto-subscribe
- readable store for read-only state

---

## Program: State Management

```svelte
<!-- Stores = shared state antar komponen -->
<!-- stores.js -->
import { writable, derived } from 'svelte/store';
export const count = writable(0);
export const doubled = derived(count, $count => $count * 2);
function createCount() {
  const { subscribe, set, update } = writable(0);
  return { subscribe, increment: () => update(n => n + 1), reset: () => set(0) };
}
export const counter = createCount();
<!-- Component.svelte -->
<script>
  import { count, doubled, counter } from './stores.js';
</script>
<p>Count: {$count} | Doubled: {$doubled}</p>
<button on:click={counter.increment}>+</button>
<!-- $ = auto-subscribe ke store -->
```

---

## Key Concepts

### writable
writable(initial) with set, update, subscribe.

### derived
derived from other stores.

### Auto-subscribe
$store for auto-subscription.

---

## Experiments

- Create custom store with async actions
- Implement store persistence
- Create store with multiple derived
- Use readable store

---

## Challenge

Build a shopping cart with stores: cart store, total derived store, add/remove actions.

---

## Summary

Week 5 of 10: **Svelte Stores** (Level: Beginner). Beginner phase complete! Next week: **SvelteKit Routing**.
