# Props & Components

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 3:** Props & Components

## Tujuan Pembelajaran

- export let untuk definisi props
- Default values untuk props
- Spread props: {...props}
- Component composition
- Slot untuk konten dinamis

---

## Program: Komponen Produk

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

## Konsep Kunci

### Props
export let name = prop definition. Parent: <Comp name="value" />.

### Default Values
export let name = "default".

### Slots
<slot /> = konten dari parent.

---

## Eksperimen

- Buat komponen dengan multiple props
- Tambah named slots
- Implementasikan slot props
- Buat komponen dengan events

---

## Tantangan

Buat product catalog: ProductCard, ProductList, CartSummary.

---

## Ringkasan

Minggu 3 dari 10: **Props & Components** (Level: Pemula). Minggu depan: **Events & Bindings**.
