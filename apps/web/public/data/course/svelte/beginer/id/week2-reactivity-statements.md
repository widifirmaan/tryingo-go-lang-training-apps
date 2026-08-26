# Reactivity Lanjutan — $: dan Store

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 2:** Reactivity & Statements

## Tujuan Pembelajaran

- `$:` hitung, `$:` log ` $: console.log(total)`, dan `store` untuk bagi data antar halaman

---

## Program

```svelte
<script>
  import { writable } from "svelte/store";
  let beras = 2;
  $: total = beras * 12500;
  $: if (total > 50000) console.log("Gratis ongkir!");
  const keranjang = writable([{ nama: "Beras", qty: 1 }]);
  function tambah(){ $keranjang = [...$keranjang, { nama: "Telur", qty: 1 }]; }
</script>

<p>Total: {total}</p>
<button on:click={() => beras++}>+ Beras</button>
<button on:click={tambah}>+ Keranjang</button>
<ul>{#each $keranjang as item}<li>{item.nama} x{item.qty}</li>{/each}</ul>
```

---

## Ringkasan

Minggu 2: **Reaktivitas** — `$:` dan `store` bagi keranjang.
