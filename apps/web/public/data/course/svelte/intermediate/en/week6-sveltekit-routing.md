# SvelteKit Routing — Peta Warung Svelte

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 6:** SvelteKit Routing

## Tujuan Pembelajaran

- `src/routes/+page.svelte` → `/`, `src/routes/produk/+page.svelte` → `/produk`, `src/routes/produk/[id]/+page.svelte` → `/produk/1`
- `+layout.svelte` bingkai, `load` ambil data

---

## Kenapa Ini Penting Buat Kamu?

SvelteKit seperti Next.js: folder = alamat. Warung 50 produk tidak bikin 50 file manual — 1 `[id]` untuk semua.

---

## Program: Toko SvelteKit 3 Halaman

```
src/routes/
  +layout.svelte      # bingkai
  +page.svelte        # /
  produk/
    +page.svelte      # /produk
    [id]/
      +page.svelte    # /produk/1
```

```svelte
<!-- src/routes/+layout.svelte -->
<nav><a href="/">Beranda</a> | <a href="/produk">Produk</a></nav>
<slot />

<!-- src/routes/produk/+page.svelte -->
<script>
  let daftar = [{ id: 1, nama: "Beras" }, { id: 2, nama: "Bayam" }];
</script>
<ul>{#each daftar as p}<li><a href={`/produk/${p.id}`}>{p.nama}</a></li>{/each}</ul>

<!-- src/routes/produk/[id]/+page.svelte -->
<script>
  import { page } from "$app/stores";
  $: id = $page.params.id;
</script>
<h1>Detail {id}</h1><a href="/produk">Kembali</a>
```

`npm run dev` → `http://localhost:5173/produk/1` → `id` otomatis.

---

## Ringkasan

Minggu 6: **Peta SvelteKit** — folder = alamat. Minggu depan: **Actions & Forms**.
