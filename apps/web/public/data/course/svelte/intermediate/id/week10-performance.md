# Performance — Warung Cepat SvelteKit

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 10:** Performance

## Tujuan Pembelajaran

- `load` + `fetch` cache, `prerender` untuk halaman statis

---

## Program

```javascript
// src/routes/produk/+page.js
export const prerender = true;
export async function load({ fetch }){
  const res = await fetch("https://api.warung.com/produk");
  return { produk: await res.json() };
}
```

`prerender = true` → HTML jadi saat build, cepat.

---

## Ringkasan

Minggu 10: **Cepat** — `prerender` + `load`.
