# SvelteKit Routing

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 6:** SvelteKit Routing

## Tujuan Pembelajaran

- File-based routing: routes/folder
- +page.svelte dan +layout.svelte
- Dynamic routes: [id].svelte
- Load function untuk data fetching
- Navigate dengan goto()

---

## Program: Multi-Halaman

```svelte
<!-- SvelteKit = meta-framework untuk Svelte (routing, SSR) -->
<!-- File-based routing: src/routes/ -->
<!-- +page.svelte = page component -->
<!-- +layout.svelte = layout wrapper -->
<!-- [id].svelte = dynamic route -->
<!-- +error.svelte = error page -->
<script>
  export let data; // dari load function
</script>
<h1>{data.title}</h1>
<a href="/about">Tentang</a>
<a href="/products/123">Detail</a>
```

---

## Konsep Kunci

### File-based Routing
routes/folder/+page.svelte = /folder.

### Dynamic Routes
[id].svelte = parameter dinamis.

### Load Function
+page.js: load() return data ke component.

### Navigation
goto("/path") = programmatic navigate.

---

## Eksperimen

- Buat nested routes
- Implementasikan dynamic route
- Tambah layout wrapper
- Buat 404 page

---

## Tantangan

Buat blog app dengan SvelteKit: Home, Posts, Post Detail (/post/[slug]), About.

---

## Ringkasan

Minggu 6 dari 10: **SvelteKit Routing** (Level: Menengah). Minggu depan: **Actions & Forms**.
