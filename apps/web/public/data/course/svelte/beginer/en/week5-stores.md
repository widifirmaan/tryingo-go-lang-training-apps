# Stores — Advanced Shared Svelte Warehouse

> **Kategori:** Svelte | **Level:** Beginner | **Minggu 5:** Stores
> **Prerequisites:** Week 4 — **Events & Bindings**.

## Learning Objectives

- Split `stores/cart.js` (`writable`, auto-total `derived`, `readable` clock) — 1 warehouse 10 components (source: svelte.dev/docs/svelte/svelte-store)
- `store.set()` replaces, `store.update()` changes from old, `$store` in template

---

## Why This Matters (Non-IT)

Carts are used by header (count), pages (list), checkout (total) — 5-level prop relays exhaust + 1 forgotten = divergent data. Store = 1 central warehouse, everyone reads the same. `derived` totals automatically without manual calc per add.

---

## Program: Complete Cart Warehouse

```javascript
// stores/cart.js — warehouse (not a component!)
import { writable, derived } from "svelte/store";

export const cart = writable([]);
export const total = derived(cart, ($c) =>
  $c.reduce((s, i) => s + i.price * i.qty, 0)
);

export function add(item) {
  cart.update((c) => [...c, item]); // update from old
}
export function clear() {
  cart.set([]); // replace all
}
```

```svelte
<!-- App.svelte — 3 users 1 warehouse -->
<script>
  import { cart, total, add, clear } from "./stores/cart.js";
</script>

<header>Cart: {$cart.length} | Total: Rp {$total.toLocaleString("en-US")}</header>
<button on:click={() => add({ name: "Rice", price: 62000, qty: 1 })}>Add Rice</button>
<button on:click={clear}>Clear</button>
<ul>{#each $cart as item}<li>{item.name} x{item.qty}</li>{/each}</ul>
```

---

## Key Concepts

### `writable` / `readable` / `derived` = 3 Warehouses
- `writable` free change, `derived` auto-calcs from other warehouses, `readable` read-only (clock).

### `set` / `update` / `$` = Replace/Change/Read
`set([])` replaces, `update(c => [...c, x])` changes from old, `$cart` reads in template.

---

## Beginner Friendly Explanation

### Analogy: Mall Central Warehouse
- **writable = warehouse**, **derived = auto cashier** (total follows), **$ = reading door**.

### Step 0 — Prepare Device
- Same as W1. Plain `stores/cart.js` file (not `.svelte`).

### How the Computer Reads It
1. `add(...)` → `update` → new warehouse → all `$cart` + `derived total` update.

### 3 Must-Know Terms
1. **writable/derived**: warehouse/auto-cashier
2. **set/update**: replace/change

---

## Experiments

- **Green:** `add` 2x → header + list + total follow?
- **Yellow:** `total` without manual calls — automatic after `add`?
- **Red:** Direct `cart.push(...)` (no set/update) → no update? Use `update`.

---

## Challenge

**3-Shop Mall:** `cart` store + `Header` (count) + `List` (add) + `Checkout` (`total` derived + `clear`). **Beginner Svelte DONE!**
- **Link-up (Week 4 — Events & Bindings):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **writable/derived/$**: warehouse/cashier/read

---

## Summary

Week 5: **Shared Warehouse** — stores. **Beginner Svelte DONE!** Next: **SvelteKit** (Intermediate).
