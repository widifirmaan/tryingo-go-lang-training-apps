# Stores — Gudang Bersama Svelte Lanjutan

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 5:** Stores
> **Prasyarat:** Minggu 4 — **Events & Bindings**.

## Tujuan Pembelajaran

- Pisah `stores/keranjang.js` (`writable`, `derived` total otomatis, `readable` jam) — 1 gudang 10 komponen (sumber: svelte.dev/docs/svelte/svelte-store)
- `store.set()` ganti, `store.update()` ubah dari lama, `$store` di template

---

## Kenapa Ini Penting Buat Kamu?

Keranjang dipakai header (jumlah), halaman (daftar), checkout (total) — props estafet 5 level melelahkan + lupa 1 = beda data. Store = 1 gudang sentral, semua baca sama. `derived` total otomatis tanpa hitung manual tiap tambah.

---

## Program: Gudang Keranjang Lengkap

```javascript
// stores/keranjang.js — gudang (bukan komponen!)
import { writable, derived } from "svelte/store";

export const keranjang = writable([]);
export const total = derived(keranjang, ($k) =>
  $k.reduce((s, i) => s + i.harga * i.qty, 0)
);

export function tambah(item) {
  keranjang.update((k) => [...k, item]); // update dari lama
}
export function kosongkan() {
  keranjang.set([]); // ganti total
}
```

```svelte
<!-- App.svelte — 3 pemakai 1 gudang -->
<script>
  import { keranjang, total, tambah, kosongkan } from "./stores/keranjang.js";
</script>

<header>Keranjang: {$keranjang.length} | Total: Rp {$total.toLocaleString("id-ID")}</header>
<button on:click={() => tambah({ nama: "Beras", harga: 62000, qty: 1 })}>Tambah Beras</button>
<button on:click={kosongkan}>Kosongkan</button>
<ul>{#each $keranjang as item}<li>{item.nama} x{item.qty}</li>{/each}</ul>
```

---

## Konsep Kunci

### `writable` / `readable` / `derived` = 3 Gudang
- `writable` ubah bebas, `derived` hitung otomatis dari gudang lain, `readable` hanya baca (jam).

### `set` / `update` / `$` = Ganti/Ubah/Baca
`set([])` ganti, `update(k => [...k, x])` ubah dari lama, `$keranjang` baca di template.

---

## Penjelasan untuk Pemula

### Analogi: Gudang Sentral Mal
- **writable = gudang**, **derived = kasir otomatis** (total ikut), **$ = pintu baca**.

### Langkah 0 — Siapkan Device
- Sama W1. File `stores/keranjang.js` biasa (bukan `.svelte`).

### Cara Komputer Membaca
1. `tambah(...)` → `update` → gudang baru → semua `$keranjang` + `derived total` update.

### 3 Istilah Wajib
1. **writable/derived**: gudang/kasir-otomatis
2. **set/update**: ganti/ubah

---

## Eksperimen

- **Hijau:** `tambah` 2x → header + daftar + total ikut?
- **Kuning:** `total` tanpa panggil manual — otomatis setelah `tambah`?
- **Merah:** `keranjang.push(...)` langsung (tanpa set/update) → tidak update? Pakai `update`.

---

## Tantangan

**Mal 3 Toko:** `keranjang` store + `Header` (jumlah) + `Daftar` (tambah) + `Checkout` (`total` derived + `kosongkan`). **Selesai Beginner Svelte!**
- **Sambungan (Minggu 4 — Events & Bindings):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **writable/derived/readable**: gudang/otomatis/baca
- **set/update/$**: ganti/ubah/baca

---

## Ringkasan

Minggu 5 dari 5: **Gudang Sentral** (Level: Pemula). **Selesai Beginner Svelte!** Lanjut: **SvelteKit** (Menengah).
