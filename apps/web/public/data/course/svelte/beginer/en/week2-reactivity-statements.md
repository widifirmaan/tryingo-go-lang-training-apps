# Advanced Reactivity — Auto `$:` Calculator and Store Warehouse

> **Kategori:** Svelte | **Level:** Beginner | **Minggu 2:** Reactivity & Statements
> **Prerequisites:** Week 1 — **Svelte Basics**.

## Learning Objectives

- `$: total = rice * 12500` auto-calcs when `rice` changes (source: svelte.dev/docs Svelte 4 `$:` labels)
- `$: if (...)` reactive logic, `writable` + `$cart` shared warehouse (source: svelte.dev/docs/svelte/svelte-store)

---

## Why This Matters (Non-IT)

Without `$:`, every `rice++` needs a manual `total = rice * 12500` — forget 1 place, receipt wrong. With `$:`, write once, Svelte recalculates automatically. `writable` shares carts across 10 pages without prop relays.

---

## Program: Auto Cashier + Warehouse

```svelte
<script>
  import { writable } from "svelte/store";

  let rice = 2;
  $: total = rice * 12500; // automatic when rice changes
  $: if (total > 50000) console.log("Free delivery!");

  const cart = writable([{ name: "Rice", qty: 1 }]);
  function add() {
    $cart = [...$cart, { name: "Eggs", qty: 1 }];
  }
</script>

<p>Rice: {rice}kg — Total: Rp {total.toLocaleString("en-US")}</p>
<button on:click={() => rice++}>+ Rice</button>
<button on:click={add}>+ Cart ({$cart.length})</button>

<ul>
  {#each $cart as item}
    <li>{item.name} x{item.qty}</li>
  {/each}
</ul>
```

---

## Key Concepts

### `$:` = Auto Calculator
`$: total = rice * 12500` → every `rice` change recalculates `total`. `$: console.log(...)` for effects.

### `writable` + `$` = Shared Warehouse
`writable([...])` creates, `$cart` reads/writes in template, `cart.update()` in script.

---

## Beginner Friendly Explanation

### Analogy: Auto Cashier & Central Warehouse
- **`$:` = auto cashier**: scale changes → receipt reprints.
- **`writable` = central warehouse**: 10 cashiers take the same stock.

### Step 0 — Prepare Device
- Same as W1: `npm run dev` on `5173`.

### How the Computer Reads It
1. `rice++` → Svelte marks `rice` dirty → re-runs `$: total = ...`.
2. `$cart = [...]` → all `{$cart}` update.

### 3 Must-Know Terms
1. **`$:`**: reactive calculator
2. **writable/$**: warehouse/read

---

## Experiments

- **Green:** `rice = 5` → total 62500 automatically?
- **Yellow:** Remove `$:` to `let total = ...` → clicking + doesn't update? (That's what `$:` is for!)
- **Red:** Direct `$cart.push(...)` (no `=`) → no update? Use `$cart = [...$cart, x]`.

---

## Challenge

**Auto Discount Cashier:** `let discount = 10; $: totalAfter = total * (1 - discount/100);` + input `bind:value={discount}` → total follows typing + `writable` cart with 2 items.

---

## Mini Glossary

- **$:/writable/$**: auto/warehouse/read
- **Reactive**: follows changes

---

## Summary

Week 2 of 5: **Auto Calculator** (Level: Beginner). `$:` + store. Next: **Props** — LEGO bricks.
