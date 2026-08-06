# SvelteKit Routing

> **Kategori:** Svelte | **Level:** Intermediate | **Minggu 6:** SvelteKit Routing

## Learning Objectives

- File-based routing
- +page.svelte and +layout.svelte
- Dynamic routes: [id].svelte
- Load function for data fetching
- Navigate with goto()

---

## Program: Multi-Page App

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

## Key Concepts

### File-based Routing
routes/folder = URL.

### Dynamic Routes
[id] for parameters.

### Load Function
load() returns data.

### Navigation
goto for programmatic.

---

## Experiments

- Create nested routes
- Implement dynamic route
- Add layout wrapper
- Create 404 page

---

## Challenge

Build a blog app with SvelteKit: Home, Posts, Post Detail (/post/[slug]), About.

---

## Summary

Week 6 of 10: **SvelteKit Routing** (Level: Intermediate). Next week: **Actions & Forms**.
