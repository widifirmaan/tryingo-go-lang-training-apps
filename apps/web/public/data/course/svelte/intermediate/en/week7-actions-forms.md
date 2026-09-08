# Actions & Forms — Svelte Stamps & Forms (svelte.dev)

> **Kategori:** Svelte | **Level:** Intermediate | **Minggu 7:** Actions & Forms

## Learning Objectives

- `use:action` stamp on elements — `use:clickOutside` calls with `node` on mount, `$effect` cleanup on unmount (source: svelte.dev/docs/svelte/use)
- `bind:value` two-way strings + `on:submit|preventDefault` without reload

---

## Why This Matters (Non-IT)

A shop form without `bind:value` = typing never reaches `customer`. With `bind:value`, typing → `customer` automatically. `use:clickOutside` closes dropdowns on outside clicks without manual `document.addEventListener` per component.

---

## Program: Svelte Form & Stamp Shop (svelte.dev)

```svelte
<script>
  let customer = "";
  let list = [];
  function add(){ if(!customer.trim()) return; list = [...list, { id: Date.now(), customer }]; customer = ""; }

  // Action: outside-click stamp (svelte.dev)
  /** @type {import('svelte/action').Action} */
  function clickOutside(node) {
    $effect(() => {
      function handle(e){ if(!node.contains(e.target)) node.dispatchEvent(new CustomEvent("clickOutside")); }
      document.addEventListener("click", handle);
      return () => document.removeEventListener("click", handle);
    });
  }
</script>

<form on:submit|preventDefault={add}>
  <input bind:value={customer} placeholder="Name" />
  <button>Add</button>
</form>

<div use:clickOutside on:clickOutside={() => console.log("outside click")}>
  <p>Click outside this box → log</p>
</div>

<ul>{#each list as p}<li>{p.customer}</li>{/each}</ul>
```

**Source:** `svelte.dev/docs/svelte/use` — `use:action` + `$effect` cleanup.

---

## Key Concepts

### `use:clickOutside` = Stamp
`use:clickOutside` calls `clickOutside(node)` when the `div` mounts, `return () => removeEventListener` on unmount.

### `bind:value` = Two-Way String
`bind:value={customer}` typing ↔ `customer` automatic.

---

## Beginner Friendly Explanation

### Analogy: Stamps & Strings

- **`use:clickOutside` = stamp**: stuck on the `div`, active while the `div` exists, gone when it leaves.
- **`bind:value` = string**: pull the `input` string ↔ `customer`.

### Step 0 — Prepare Device

`npm create svelte@latest` + `npm run dev` on `5173` (done in W1).

### How the Computer Reads It

1. `<div use:clickOutside>` → calls `clickOutside(div)` → `addEventListener`.
2. Click outside the `div` → `dispatchEvent("clickOutside")` → `on:clickOutside` runs.

### 3 Must-Know Terms

1. **Action `use:`**: mount stamp
2. **bind:value**: two-way string
3. **$effect**: setup/cleanup

---

## Experiments

- **Green:** `bind:value={customer}` type "Budi" → `customer` becomes "Budi"?
- **Yellow:** Remove `$effect` cleanup → `removeEventListener` never runs, memory leak?
- **Red:** `use:clickOutside` without `on:clickOutside` → no log.

---

## Challenge

**Complete Stamp Shop:** `use:clickOutside` to close a category `dropdown` + `bind:value` 3 inputs (`name`, `qty`, `category`) + `on:submit|preventDefault` adding to `list`.

---

## Mini Glossary

- **use:action/$effect**: stamp/cleanup
- **bind:value**: string

---

## Summary

Week 7 of 12: **Stamps & Forms** (Level: Intermediate). Can `use:` and `bind`. Next: W8.
