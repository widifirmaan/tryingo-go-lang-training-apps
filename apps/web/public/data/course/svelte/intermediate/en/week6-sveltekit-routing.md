# SvelteKit Routing

## Learning Objectives

- File-based routing
- +page.svelte and +layout.svelte
- Dynamic routes: [id].svelte
- Load function for data fetching
- Navigate with goto()

---

## Program: SvelteKit Routing & Load Functions

File-based routing plus load functions that fetch data before render.

```svelte
<!-- src/routes/products/[id]/+page.svelte -->
<script lang="ts">
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
</script>

<h1>{data.product.name}</h1>
<p>{data.product.description}</p>
<a href="/products">← back to catalog</a>

<!-- src/routes/products/[id]/+page.ts -->
export const load = async ({ params, fetch }) => {
  const res = await fetch('/api/products/' + params.id);
  if (!res.ok) error(404, 'Product not found');
  return { product: await res.json() };
};

<!-- src/routes/products/+page.svelte -->
<script>
  import { link } from '@sveltejs/kit';
</script>
<nav>
  <a href="/products">List</a> |
  <a href="/products/new">New</a>
</nav>

<!-- Layout with plain <a> triggers client-side navigation -->
<!-- src/routes/+layout.svelte -->
<script>
  let { children } = $props();
</script>
{@render children()}
```

---

## Key Concepts

### File-based routing

+page.svelte = halaman; [id] = dynamic segment; (group)/grouped routes terlihat lebih lega tanpa menambah URL.

### load functions

Data diambil sebelum paint: load di +page.ts merespon params/fetch; relasi load result mengalir sebagai prop data.

### error() & redirects

error(404, msg) merender +error.svelte; redirect(302, '/login') juga bisa dipanggil di dalam load.

### Layout persistence

+layout.svelte bertahan sepanjang navigasi antar child routes - tempat ideal untuk sidebar/shell.

---

## Experiments

- Add an [id]/reviews route and render data.reviews.
- Make load() error(404) for id "999".
- Wrap +layout.svelte with a persistent <header>.

---

## Challenge

Create an admin section using a (group) so the admin layout only applies to pages inside it.

---

## Summary

This week's material has been covered: SvelteKit Routing & Load Functions. Continue to the following week to deepen.
