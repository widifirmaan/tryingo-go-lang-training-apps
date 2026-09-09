# Props & Components — Bata LEGO Svelte

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 3:** Props & Components
> **Prasyarat:** Minggu 2 — **Reactivity Lanjutan**.

## Tujuan Pembelajaran

- `export let nama` terima amplop dari induk (sumber: svelte.dev/docs/svelte/$props? Svelte 4: `export let`)
- `createEventDispatcher` + `dispatch("beli", nama)` lapor balik, induk dengar `on:beli`
- `<slot>` lubang isi bebas

---

## Kenapa Ini Penting Buat Kamu?

50 produk jika semua di `App` → 500 baris. Dengan `Kartu` bata, `App` hanya `{#each}` 3 baris — tambah produk tanpa tulis kartu baru. `dispatch` biar tombol di anak bisa tambah keranjang induk.

---

## Program: Katalog Bata Svelte

```svelte
<!-- Kartu.svelte — bata -->
<script>
  export let nama;
  export let harga;
  export let stok = 10;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div style="border: 1px solid #ddd; padding: 12px; border-radius: 8px;">
  <h3>{nama}</h3>
  <p>Rp {harga.toLocaleString("id-ID")} — Stok: {stok}</p>
  <button on:click={() => dispatch("beli", nama)} disabled={stok <= 0}>
    {stok > 0 ? "Beli" : "Habis"}
  </button>
  <slot><small>Gratis ongkir &gt;100rb</small></slot>
</div>
```

```svelte
<!-- +page.svelte — susun -->
<script>
  import Kartu from "./Kartu.svelte";
  let daftar = [
    { nama: "Beras", harga: 62000, stok: 5 },
    { nama: "Bayam", harga: 5000, stok: 0 },
  ];
  let keranjang = [];
  function handleBeli(e) {
    keranjang = [...keranjang, e.detail];
    alert("Beli " + e.detail);
  }
</script>

{#each daftar as p}
  <Kartu nama={p.nama} harga={p.harga} stok={p.stok} on:beli={handleBeli} />
{/each}
<p>Keranjang: {keranjang.join(", ") || "kosong"}</p>
```

---

## Konsep Kunci

### `export let` = Amplop Masuk
`export let nama` → induk kirim `nama="Beras"`. `export let stok = 10` default jika tidak dikirim.

### `dispatch` + `on:` = Bel & Telinga
Anak `dispatch("beli", nama)` tekan bel → induk `on:beli={handleBeli}` dengar, `e.detail` = nama.

### `<slot>` = Lubang LEGO
Induk tulis di dalam `<Kartu>...</Kartu>` → anak tampilkan `<slot />`.

---

## Penjelasan untuk Pemula

### Analogi: Bata Bertulis & Bel
- **Props = tulisan di bata**, **dispatch = bel pintu**, **slot = kotak kosong**.

### Langkah 0 — Siapkan Device
- Sama W1: `npm run dev`.

### Cara Komputer Membaca
1. `<Kartu nama="Beras" />` → `export let nama` = "Beras".
2. Klik Beli → `dispatch("beli", "Beras")` → `handleBeli(e)` dengan `e.detail` = "Beras".

### 3 Istilah Wajib
1. **export let/dispatch/on:**: terima/lapor/dengar
2. **slot**: lubang isi

---

## Eksperimen

- **Hijau:** `stok={0}` → tombol "Habis" + `disabled`?
- **Kuning:** `dispatch("beli", { nama, harga })` objek → `e.detail.nama`?
- **Merah:** Anak `nama = "X"` langsung → warning? (Jangan ubah props, kirim event!)

---

## Tantangan

**Warung Bata Lengkap:** `Kartu` (`export let` + `dispatch` + `slot`) + `App` (`{#each}` 4 produk + `keranjang` + total `reduce`).

---

## Glosarium Mini

- **export let/dispatch/slot**: terima/lapor/lubang
- **e.detail**: isi bel

---

## Ringkasan

Minggu 3 dari 5: **Bata LEGO** (Level: Pemula). Bagi & lapor. Minggu depan: **Events** — telinga & tali.
