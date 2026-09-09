# SvelteKit Routing — Peta Warung Svelte

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 6:** SvelteKit Routing
> **Prasyarat:** Minggu 5 — **Stores**.

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

### Bonus: Load Data + API Server (inti SvelteKit — routing saja belum cukup!)

Halaman di atas data statis. Data asli: `+page.js` ambil DULU (server!), kirim sebagai `data`. API sendiri: `+server.js`.

```javascript
// src/routes/produk/+page.js — ambil sebelum tampil!
export async function load({ fetch }) {
  const res = await fetch("/api/produk"); // ke +server.js di bawah!
  return { daftar: await res.json() };    // jadi { data.daftar } di page!
}
```

```svelte
<!-- src/routes/produk/+page.svelte — pakai data -->
<script>
  export let data; // { daftar } dari load()!
</script>
<ul>{#each data.daftar as p}<li>{p.nama}</li>{/each}</ul>
```

```javascript
// src/routes/api/produk/+server.js — API sendiri!
import { json } from "@sveltejs/kit";

let daftar = [{ id: 1, nama: "Beras" }];

export function GET() {
  return json(daftar); // balas JSON
}
export async function POST({ request }) {
  const baru = await request.json();
  daftar = [...daftar, { id: Date.now(), ...baru }];
  return json(baru, { status: 201 });
}
```
- `load()` jalan di SERVER dulu → HTML sudah isi (SEO + cepat!). `+server.js` = `GET/POST/...` per file.

---

## Ringkasan

Minggu 6: **Peta SvelteKit** — folder = alamat. Minggu depan: **Actions & Forms**.
