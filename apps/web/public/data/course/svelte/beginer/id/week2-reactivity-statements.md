# Reactivity Lanjutan — Kalkulator Otomatis `$:` dan Gudang Store

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 2:** Reactivity & Statements
> **Prasyarat:** Minggu 1 — **Dasar Svelte**.

## Tujuan Pembelajaran

- `$: total = beras * 12500` hitung otomatis saat `beras` berubah (sumber: svelte.dev/docs/svelte/$effect? Svelte 4: `$:` label)
- `$: if (...)` logika reaktif, `writable` + `$keranjang` gudang bersama (sumber: svelte.dev/docs/svelte/svelte-store)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `$:`, tiap `beras++` harus tulis `total = beras * 12500` manual — lupa 1 tempat, struk salah. Dengan `$:`, tulis sekali, Svelte hitung ulang otomatis. `writable` bagi keranjang ke 10 halaman tanpa props estafet.

---

## Program: Kasir Otomatis + Gudang

```svelte
<script>
  import { writable } from "svelte/store";

  let beras = 2;
  $: total = beras * 12500; // otomatis jika beras berubah
  $: if (total > 50000) console.log("Gratis ongkir!");

  const keranjang = writable([{ nama: "Beras", qty: 1 }]);
  function tambah() {
    $keranjang = [...$keranjang, { nama: "Telur", qty: 1 }];
  }
</script>

<p>Beras: {beras}kg — Total: Rp {total.toLocaleString("id-ID")}</p>
<button on:click={() => beras++}>+ Beras</button>
<button on:click={tambah}>+ Keranjang ({$keranjang.length})</button>

<ul>
  {#each $keranjang as item}
    <li>{item.nama} x{item.qty}</li>
  {/each}
</ul>
```

---

## Konsep Kunci

### `$:` = Kalkulator Otomatis
`$: total = beras * 12500` → tiap `beras` berubah, `total` hitung ulang. `$: console.log(...)` untuk efek.

### `writable` + `$` = Gudang Bersama
`writable([...])` buat, `$keranjang` baca/tulis di template, `keranjang.update()` di script.

---

## Penjelasan untuk Pemula

### Analogi: Kasir & Gudang Sentral
- **`$:` = kasir otomatis**: timbang berubah → total cetak ulang.
- **`writable` = gudang sentral**: 10 kasir ambil stok sama.

### Langkah 0 — Siapkan Device
- Sama W1: `npm run dev` di `5173`.

### Cara Komputer Membaca
1. `beras++` → Svelte tandai `beras` kotor → jalankan ulang `$: total = ...`.
2. `$keranjang = [...]` → semua `{$keranjang}` update.

### 3 Istilah Wajib
1. **`$:`**: kalkulator reaktif
2. **writable/$**: gudang/baca

---

## Eksperimen

- **Hijau:** `beras = 5` → total 62500 otomatis?
- **Kuning:** Hapus `$:` jadi `let total = ...` → klik + tidak update? (Itulah gunanya `$:`)
- **Merah:** `$keranjang.push(...)` langsung (tanpa `=`) → tidak update? Pakai `$keranjang = [...$keranjang, x]`.

---

## Tantangan

**Kasir Diskon Otomatis:** `let diskon = 10; $: totalDiskon = total * (1 - diskon/100);` + input `bind:value={diskon}` → total ikut saat ketik + `writable` keranjang 2 barang.
- **Sambungan (Minggu 1 — Dasar Svelte):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **$:/writable/$**: otomatis/gudang/baca
- **Reaktif**: ikut berubah

---

## Ringkasan

Minggu 2 dari 5: **Kalkulator Otomatis** (Level: Pemula). `$:` + store. Minggu depan: **Props** — bata LEGO.
