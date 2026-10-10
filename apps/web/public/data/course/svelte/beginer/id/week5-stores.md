# Svelte Stores

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 5:** Svelte Stores

## Tujuan Pembelajaran

- writable store untuk mutable state
- derived store untuk derived state
- Custom store dengan methods
- $ prefix untuk auto-subscribe
- readable store untuk read-only state

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

## Konsep Kunci

### writable
writable(initial). set(), update(), subscribe().

### derived
derived(store, callback). Computed dari store lain.

### Auto-subscribe
$store = subscribe otomatis.

---

## Eksperimen

- Buat custom store dengan async actions
- Implementasikan store persistence
- Buat store dengan multiple derived
- Gunakan readable store

---

## Tantangan

Buat shopping cart dengan stores: cart store, total derived store, add/remove actions.

---

## Ringkasan

Minggu 5 dari 10: **Svelte Stores** (Level: Pemula). Selesai fase Beginner! Minggu depan: **SvelteKit Routing**.
