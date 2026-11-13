## Tujuan Pembelajaran

- File-based routing: routes/folder
- +page.svelte dan +layout.svelte
- Dynamic routes: [id].svelte
- Load function untuk data fetching
- Navigate dengan goto()

---

## Program: SvelteKit Routing & Load Functions

File-based routing + load functions untuk mengambil data sebelum render.

```svelte
<!-- src/routes/products/[id]/+page.svelte -->
<script lang="ts">
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
</script>

<h1>{data.product.name}</h1>
<p>{data.product.description}</p>
<a href="/products">← kembali ke katalog</a>

<!-- src/routes/products/[id]/+page.ts -->
export const load = async ({ params, fetch }) => {
  const res = await fetch('/api/products/' + params.id);
  if (!res.ok) error(404, 'Produk tidak ditemukan');
  return { product: await res.json() };
};

<!-- src/routes/products/+page.svelte -->
<script>
  import { link } from '@sveltejs/kit';
</script>
<nav>
  <a href="/products">Daftar</a> |
  <a href="/products/new">Baru</a>
</nav>

<!-- Layout dengan <a> biasa memicu client-side navigation -->
<!-- src/routes/+layout.svelte -->
<script>
  let { children } = $props();
</script>
{@render children()}
```

---

## Konsep Kunci

### File-based routing

+page.svelte = halaman; [id] = dynamic segment; (group)/grouped routes terlihat lebih lega tanpa menambah URL.

### load functions

Data diambil sebelum paint: load di +page.ts merespon params/fetch; relasi load result mengalir sebagai prop data.

### error() & redirects

error(404, msg) merender +error.svelte; redirect(302, '/login') juga bisa dipanggil di dalam load.

### Layout persistence

+layout.svelte bertahan sepanjang navigasi antar child routes - tempat ideal untuk sidebar/shell.

---

## Eksperimen

- Tambahkan route [id]/reviews dan tampilkan data.reviews
- Ubah load() melempar error(404) untuk id '999'.
- Selipkan +layout.svelte dengan <header> yang bertahan saat navigasi.

---

## Tantangan

Buat bagian admin memakai (group) sehingga layout admin hanya berlaku untuk halaman di dalamnya.

---

## Ringkasan

Materi minggu ini telah dibahas: SvelteKit Routing & Load Functions. Lanjut ke pekan berikutnya untuk memperdalam.
