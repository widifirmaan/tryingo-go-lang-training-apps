# Svelte Basics — Magic Compilation Without Virtual DOM

> **Kategori:** Svelte | **Level:** Beginner | **Minggu 1:** Dasar Svelte

## Learning Objectives

- Understand Svelte = **magic compilation**: write plain `let count = 0`, Svelte turns it reactive automatically — no `ref` or `useState`
- Create `npm create svelte@latest shop-svelte`, `npm run dev` on `5173`
- Plain `let` is reactive, `on:click` clicks, `{name}` stickers

---

## Why This Matters (Non-IT)

Vue needs `ref`, React needs `useState`. Svelte needs only **`let`** — closest to an ordinary notebook. Perfect for non-IT learners dizzy from `.value`.

---

## Program: First Svelte Shop

`src/routes/+page.svelte`

```svelte
<script>
  let shopName = "Siti's Shop";
  let customer = "Budi";
  let riceKg = 2;
  let pricePerKg = 12500;
  $: total = riceKg * pricePerKg; // $: = auto-calc when riceKg changes

  function add() { riceKg += 1; }
</script>

<h1>{shopName} 🥬</h1>
<p>Hello {customer}, total: Rp {total.toLocaleString("en-US")}</p>

<input bind:value={customer} placeholder="Name" />
<button on:click={add}>+ Rice ({riceKg}kg)</button>
<button on:click={() => riceKg -= 1} disabled={riceKg <= 0}>−</button>

{#if total > 50000}
  <p style="color: green;">Free delivery!</p>
{:else}
  <p>Shop Rp {(50000 - total).toLocaleString("en-US")} more</p>
{/if}

<style>
  button { padding: 6px 12px; margin: 4px; border-radius: 8px; }
</style>
```

**Run:**
```
npm create svelte@latest shop-svelte
cd shop-svelte
npm install
npm run dev
# Open http://localhost:5173 → edit src/routes/+page.svelte
```

---

## Key Concepts

### Plain `let` = Reactive
`let count = 0; count += 1` → HTML `{count}` auto-updates. No `ref` needed.

### `$:` = Auto Calculator
`$: total = riceKg * price` → when `riceKg` changes, `total` recalculates.

### `on:click` & `bind:value`
`on:click={add}`, `bind:value={customer}` two-way.

### `{#if}` & `{#each}`
`{#if total>50000}...{:else}...{/if}`, `{#each list as item}...{/each}`

---

## Beginner Friendly Explanation

### Analogy: Magic Notebook
- **Svelte = notebook whose writing moves**: write `let`, the book auto-changes numbers on other pages (`$:`).

### Step 0 — Prepare Device
- Node + `npm create svelte@latest`, open `5173`, edit `+page.svelte`.

### How the Computer Reads It
1. `riceKg += 1` → Svelte marks dirty → updates `{riceKg}` + `$: total`.
2. `bind:value={customer}` → typing updates variable, variable updates input.

### 3 Must-Know Terms
1. **let/$:/bind**: plain/auto/two-way

---

## Experiments

- **Green:** Type in the input → greeting name changes live?
- **Yellow:** Remove `$:` → total frozen after clicking +? (That's why `$:`!)
- **Red:** `disabled={riceKg <= 0}` removed → negative kg? Keep guard.

---

## Challenge

Add `let discount=10; $: totalAfter = total * (1 - discount/100)` + input `bind:value={discount}`.

---

## Mini Glossary

- **let/$:/bind**: plain/auto/tie

---

## Summary

Week 1: **Magic Svelte** — plain `let` is reactive. Next: **Reactivity** deep-dive.
