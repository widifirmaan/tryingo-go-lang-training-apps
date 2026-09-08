# Props & Components — Svelte LEGO Bricks

> **Kategori:** Svelte | **Level:** Beginner | **Minggu 3:** Props & Components

## Learning Objectives

- `export let name` receives an envelope from the parent (source: svelte.dev/docs Svelte 4 `export let`)
- `createEventDispatcher` + `dispatch("buy", name)` reports back, parent hears `on:buy`
- `<slot>` free-fill hole

---

## Why This Matters (Non-IT)

50 products all in `App` → 500 lines. With `Card` bricks, `App` is only a 3-line `{#each}` — add products without writing new cards. `dispatch` lets child buttons add to the parent cart.

---

## Program: Svelte Brick Catalog

```svelte
<!-- Card.svelte — brick -->
<script>
  export let name;
  export let price;
  export let stock = 10;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div style="border: 1px solid #ddd; padding: 12px; border-radius: 8px;">
  <h3>{name}</h3>
  <p>Rp {price.toLocaleString("en-US")} — Stock: {stock}</p>
  <button on:click={() => dispatch("buy", name)} disabled={stock <= 0}>
    {stock > 0 ? "Buy" : "Out"}
  </button>
  <slot><small>Free delivery &gt;Rp 100,000</small></slot>
</div>
```

```svelte
<!-- +page.svelte — assemble -->
<script>
  import Card from "./Card.svelte";
  let list = [
    { name: "Rice", price: 62000, stock: 5 },
    { name: "Spinach", price: 5000, stock: 0 },
  ];
  let cart = [];
  function handleBuy(e) {
    cart = [...cart, e.detail];
    alert("Buy " + e.detail);
  }
</script>

{#each list as p}
  <Card name={p.name} price={p.price} stock={p.stock} on:buy={handleBuy} />
{/each}
<p>Cart: {cart.join(", ") || "empty"}</p>
```

---

## Key Concepts

### `export let` = Incoming Envelope
`export let name` → parent sends `name="Rice"`. `export let stock = 10` default when unsent.

### `dispatch` + `on:` = Bell & Ears
Child `dispatch("buy", name)` rings bell → parent `on:buy={handleBuy}` hears, `e.detail` = name.

### `<slot>` = LEGO Hole
Parent writes inside `<Card>...</Card>` → child renders `<slot />`.

---

## Beginner Friendly Explanation

### Analogy: Labeled Bricks & Bells
- **Props = writing on bricks**, **dispatch = doorbell**, **slot = empty box**.

### Step 0 — Prepare Device
- Same as W1: `npm run dev`.

### How the Computer Reads It
1. `<Card name="Rice" />` → `export let name` = "Rice".
2. Click Buy → `dispatch("buy", "Rice")` → `handleBuy(e)` with `e.detail` = "Rice".

### 3 Must-Know Terms
1. **export let/dispatch/on:**: receive/report/hear
2. **slot**: fill hole

---

## Experiments

- **Green:** `stock={0}` → "Out" button + `disabled`?
- **Yellow:** `dispatch("buy", { name, price })` object → `e.detail.name`?
- **Red:** Child sets `name = "X"` directly → warning? (Don't mutate props, send events!)

---

## Challenge

**Complete Brick Shop:** `Card` (`export let` + `dispatch` + `slot`) + `App` (`{#each}` 4 products + `cart` + `reduce` total).

---

## Mini Glossary

- **export let/dispatch/slot**: receive/report/hole
- **e.detail**: bell content

---

## Summary

Week 3 of 5: **LEGO Bricks** (Level: Beginner). Split & report. Next: **Events** — ears & strings.
