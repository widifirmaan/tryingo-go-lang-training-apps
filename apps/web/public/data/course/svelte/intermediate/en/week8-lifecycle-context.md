# Lifecycle & Context — Svelte Shop Lifecycle (svelte.dev)

> **Kategori:** Svelte | **Level:** Intermediate | **Minggu 8:** Lifecycle & Context

## Learning Objectives

- `onMount` opens shop (fetch), `onDestroy` closes (clear), `setContext("shop", {...})` + `getContext` warehouse without props (source: svelte.dev)

---

## Why This Matters (Non-IT)

Without `onMount`, `fetch` in `script` runs during server render (SSR) — error. With `onMount`, fetch only runs in the browser after mount. `setContext` shares `shop` with 10 components without prop relays.

---

## Program: Svelte Lifecycle & Warehouse (svelte.dev)

```svelte
<script>
  import { onMount, onDestroy, setContext, getContext } from "svelte";
  import { writable } from "svelte/store";

  // Warehouse without props
  setContext("shop", { name: "Siti", open: "07.00" });

  let products = [];
  onMount(async () => {
    console.log("Open shop");
    // fetch only in browser
    const res = await fetch("/api/products");
    products = await res.json();
    return () => console.log("Close shop");
  });

  onDestroy(() => console.log("Destroy"));

  // Take in child component
  const shop = getContext("shop");
</script>

<p>Shop: {shop.name} — Open {shop.open}</p>
<ul>{#each products as p}<li>{p.name}</li>{/each}</ul>
```

**Source:** `svelte.dev/docs/svelte/lifecycle` and `context`.

---

## Key Concepts

### `onMount`/`onDestroy` = Open/Close
`onMount` runs after browser mount, `onDestroy` before removal.

### `setContext`/`getContext` = Warehouse Without Props
`setContext("shop", {...})` at parent, `getContext("shop")` in 10-deep child without `props`.

---

## Beginner Friendly Explanation

### Analogy: Open/Close Shop

- **`onMount` = open doors at 7**: fetch products.
- **`onDestroy` = close at 20**: kill timers.
- **`setContext` = notice board**: write "Siti's Shop" on the board, everyone sees.

### Step 0 — Prepare Device

Same as W1: `npm run dev` on `5173`.

### How the Computer Reads It
1. Browser mounts → `onMount` → fetch → `products` filled.
2. Child `getContext("shop")` → board value, no props relayed.

### 3 Must-Know Terms

1. **onMount/onDestroy**: open/close
2. **setContext/getContext**: board/warehouse

---

## Experiments

- **Green:** `onMount` `console.log("Open")` → when does it log?
- **Yellow:** `setContext` without `getContext` → nothing?
- **Red:** `fetch` outside `onMount` → SSR error?

---

## Challenge

**Complete Lifecycle Shop:** `onMount` fetch `list`, `setContext("shop", {name})`, child `getContext` display, `onDestroy` `clearInterval`.

---

## Mini Glossary

- **onMount/onDestroy/context**: lifecycle/warehouse

---

## Summary

Week 8 of 12: **Lifecycle** — open/close/context. Next: **Transitions**.
