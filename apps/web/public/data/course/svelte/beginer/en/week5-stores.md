# Stores — Gudang Bersama Svelte

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 5:** Stores

## Tujuan Pembelajaran

- `writable` gudang, `$store` baca, `store.set`/`update` ubah — 1 gudang untuk 10 komponen

---

## Program: Gudang Keranjang

```svelte
<!-- stores/keranjang.js -->
import { writable } from "svelte/store";
export const keranjang = writable([]);

<!-- App.svelte -->
<script>
  import { keranjang } from "./stores/keranjang.js";
  function tambah(){ $keranjang = [...$keranjang, { nama: "Beras", harga: 62000 }]; }
</script>

<button on:click={tambah}>Tambah Beras</button>
<p>Isi: {$keranjang.length}</p>
<ul>{#each $keranjang as item}<li>{item.nama}</li>{/each}</ul>
```

---

## Ringkasan

Minggu 5: **Gudang Bersama** — `writable` + `$`.
