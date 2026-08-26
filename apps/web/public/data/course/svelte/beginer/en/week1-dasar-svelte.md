# Dasar Svelte — Kompilasi Ajaib Tanpa Virtual DOM

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 1:** Dasar Svelte

## Tujuan Pembelajaran

- Paham Svelte = **kompilasi ajaib**: tulis `let count = 0` biasa, Svelte ubah jadi reaktif otomatis — tanpa `ref` atau `useState`
- Buat `npm create svelte@latest warung-svelte`, `npm run dev` di `5173`
- `let` biasa reaktif, `on:click` klik, `{nama}` stiker

---

## Kenapa Ini Penting Buat Kamu?

Vue butuh `ref`, React butuh `useState`. Svelte **cukup `let`** — paling mirip buku tulis biasa. Cocok untuk non-IT yang pusing dengan `.value`.

---

## Program: Warung Svelte Pertama

`src/routes/+page.svelte`

```svelte
<script>
  let namaWarung = "Warung Bu Siti";
  let pelanggan = "Budi";
  let berasKg = 2;
  let hargaPerKg = 12500;
  $: total = berasKg * hargaPerKg; // $: = hitung otomatis jika berasKg berubah

  function tambah() { berasKg += 1; }
</script>

<h1>{namaWarung} 🥬</h1>
<p>Halo {pelanggan}, total: Rp {total.toLocaleString("id-ID")}</p>

<input bind:value={pelanggan} placeholder="Nama" />
<button on:click={tambah}>+ Beras ({berasKg}kg)</button>
<button on:click={() => berasKg -= 1} disabled={berasKg <= 0}>−</button>

{#if total > 50000}
  <p style="color: green;">Gratis ongkir!</p>
{:else}
  <p>Belanja lagi Rp {(50000 - total).toLocaleString("id-ID")}</p>
{/if}

<style>
  button { padding: 6px 12px; margin: 4px; border-radius: 8px; }
</style>
```

**Jalankan:**
```
npm create svelte@latest warung-svelte
cd warung-svelte
npm install
npm run dev
# Buka http://localhost:5173 → ganti src/routes/+page.svelte
```

---

## Konsep Kunci

### `let` Biasa = Reaktif
`let count = 0; count += 1` → HTML `{count}` otomatis update. Tidak perlu `ref`.

### `$:` = Kalkulator Otomatis
`$: total = berasKg * harga` → jika `berasKg` ganti, `total` hitung ulang.

### `on:click` & `bind:value`
`on:click={tambah}`, `bind:value={pelanggan}` 2 arah.

### `{#if}` & `{#each}`
`{#if total>50000}...{:else}...{/if}`, `{#each daftar as item}...{/each}`

---

## Penjelasan untuk Pemula

### Analogi: Buku Ajaib
- **Svelte = buku yang tulisannya bergerak**: tulis `let`, buku otomatis ubah angka di halaman lain (`$:`).

---

## Tantangan

Tambah `let diskon=10; $: totalDiskon = total * (1 - diskon/100)` + input `bind:value={diskon}`.

---

## Ringkasan

Minggu 1: **Svelte Ajaib** — `let` biasa reaktif. Minggu depan: **Reactivity** lanjutan.
