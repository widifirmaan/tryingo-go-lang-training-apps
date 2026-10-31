# Props & Components

> **Kategori:** Svelte | **Level:** Beginner | **Minggu 3:** Props & Components

## Why This Matters

Svelte compiles reactivity at build time — no virtual DOM, tiny bundles, fast runtime. Its "write HTML, get reactivity" philosophy makes it arguably the most delightful framework to learn.

Week 3 — themed **"Props & Components"** — centers on the practice program *"Product Components"*. Run the program in the Playground first, tweak it little by little, then read through the key concepts.


## Learning Objectives

- export let for prop definition
- Default values for props
- Spread props: {...props}
- Component composition
- Slot for dynamic content

---

## Program: Props & Component Composition

The program writes a ProductCard component with props rendered over an {#each} loop.

```svelte
<!-- ProductCard.svelte -->
<script lang="ts">
  let { name, price, emoji = '📦' } = $props();
  let formatted = $derived(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price));
</script>

<div class="card">
  <span class="emoji">{emoji}</span>
  <h3>{name}</h3>
  <p class="price">{formatted}</p>
</div>

<!-- App.svelte -->
<script lang="ts">
  import ProductCard from './ProductCard.svelte';
  const products = [
    { name: 'Laptop', price: 1500, emoji: '💻' },
    { name: 'Mouse', price: 25 },
    { name: 'Monitor', price: 450, emoji: '🖥️' },
  ];
</script>

{#each products as p (p.name)}
  <ProductCard name={p.name} price={p.price} emoji={p.emoji} />
{/each}
```

---

## Key Concepts

### Rune $props

let { name, price } = $props() mendestrukturisasi props; default value juga bisa (emoji='📦').

### Keyed each

{#each items as item (item.id)} memberi identitas: elemen DOM dipakai ulang dengan cerdas saat daftar berubah.

### $derived

Nilai ter-derive otomatis diperbarui ketika input berubah — tanpa watch/effect manual.

### Composition

Komponen kecil reusable = design system; tiap parent bisa memasang banyak instance dengan props berbeda tanpa duplikasi markup.

---

## Experiments

- Add a `badge` prop shown when price > 1000.
- Change the default emoji for Mouse to 🖱️.
- Add a "checkout" button per card and observe each card's state.

---

## Challenge

Create a <StatBadge label value color /> component and use it on three cards to show remaining stock.

---

## Summary

This week's material has been covered: Props & Component Composition. Continue to the following week to deepen.
