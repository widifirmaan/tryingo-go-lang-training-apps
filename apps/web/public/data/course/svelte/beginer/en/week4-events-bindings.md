# Events & Bindings — Svelte Ears & Strings

> **Kategori:** Svelte | **Level:** Beginner | **Minggu 4:** Events & Bindings

## Learning Objectives

- `on:click` ears, `bind:value` two-way strings, `bind:group` for radios, `on:input` typing

---

## Why This Matters (Non-IT)

A shop form without `bind` = typing never reaches `customer`. With `bind:value`, typing → `customer` automatically.

---

## Program: Svelte Shop Form

```svelte
<script>
  let customer = "";
  let qty = 1;
  let category = "staples";
  let list = [];
  function add(){ if(!customer.trim()) return; list = [...list, { id: Date.now(), customer, qty, category }]; customer = ""; }
</script>

<input bind:value={customer} placeholder="Name" />
<input type="number" bind:value={qty} min="1" />
<select bind:value={category}><option>staples</option><option>veggies</option></select>
<button on:click={add}>Add</button>

<ul>{#each list as p}<li>{p.customer} x{p.qty} ({p.category})</li>{/each}</ul>
```

---

## Key Concepts

### `on:` = Ears, `bind:` = Strings
`on:click` hears clicks; `bind:value` ties input ↔ variable both ways.

---

## Beginner Friendly Explanation

### Analogy: Ears & Puppet Strings
- **`on:click` = ears** hearing clicks, **`bind:value` = string** tying input to variable — pull either end, both move.

### Step 0 — Prepare Device
- Same as W1: `npm run dev`.

### How the Computer Reads It
1. Type "Bu" → `bind:value` sets `customer = "Bu"` → `{customer}` updates.
2. Click Add → `add()` pushes to `list` → `{#each}` re-renders.

### 3 Must-Know Terms
1. **on:/bind:**: hear/tie

---

## Experiments

- **Green:** Type name + click Add → list row appears?
- **Yellow:** Empty name + Add → rejected by guard?
- **Red:** `value={customer}` (one-way, no bind) → typing doesn't stick? Use `bind:`.

---

## Challenge

**Shop Form:** Name + qty + category + list + validation guard + clear after add.

---

## Mini Glossary

- **on/bind**: ears/strings

---

## Summary

Week 4: **Ears & Strings** — `on:` and `bind:`. Next: **Stores**.
