# Props & Components

> **Kategori:** Svelte | **Level:** Beginner | **Minggu 3:** Props & Components

## Learning Objectives

- export let for prop definition
- Default values for props
- Spread props: {...props}
- Component composition
- Slot for dynamic content

---

## Program: Product Components

```svelte
<!-- Props = data dari parent ke child -->
<!-- Child: ProductCard.svelte -->
<script>
  export let name;
  export let price;
  export let isAvailable = true;
</script>
<div class="card">
  <h3>{name}</h3>
  <p>Rp {price.toLocaleString("id-ID")}</p>
  <button disabled={!isAvailable} on:click>Tambah</button>
</div>
<!-- Parent: App.svelte -->
<script>
  import ProductCard from './ProductCard.svelte';
  let products = [{ name: 'Laptop', price: 15000000, isAvailable: true }];
</script>
{#each products as product}
  <ProductCard name={product.name} price={product.price} />
{/each}
```

---

## Key Concepts

### Props
export let for prop definition.

### Default Values
export let with default.

### Slots
<slot /> for parent content.

---

## Experiments

- Create component with multiple props
- Add named slots
- Implement slot props
- Create component with events

---

## Challenge

Build a product catalog: ProductCard, ProductList, CartSummary.

---

## Summary

Week 3 of 10: **Props & Components** (Level: Beginner). Next week: **Events & Bindings**.
