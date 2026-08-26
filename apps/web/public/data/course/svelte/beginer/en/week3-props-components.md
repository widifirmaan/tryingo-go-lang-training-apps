# Props & Components — Bata Svelte

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 3:** Props & Components

## Tujuan Pembelajaran

- `export let nama` terima props, `createEventDispatcher` lapor balik

---

## Program

```svelte
<!-- Kartu.svelte -->
<script>
  export let nama;
  export let harga;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div style="border: 1px solid #ddd; padding: 12px; border-radius: 8px;">
  <h3>{nama}</h3>
  <p>Rp {harga}</p>
  <button on:click={() => dispatch("beli", nama)}>Beli</button>
  <slot>Default</slot>
</div>

<!-- +page.svelte -->
<script>
  import Kartu from "./Kartu.svelte";
  let daftar = [{ nama: "Beras", harga: 62000 }];
  function handleBeli(e){ alert("Beli " + e.detail); }
</script>

{#each daftar as p}
  <Kartu nama={p.nama} harga={p.harga} on:beli={handleBeli} />
{/each}
```

---

## Ringkasan

Minggu 3: **Bata Svelte** — `export let` dan `dispatch`.
