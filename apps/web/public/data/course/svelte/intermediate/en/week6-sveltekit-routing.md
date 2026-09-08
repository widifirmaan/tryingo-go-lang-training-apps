# SvelteKit Routing — Svelte Shop Map

> **Kategori:** Svelte | **Level:** Intermediate | **Minggu 6:** SvelteKit Routing

## Learning Objectives

- `src/routes/+page.svelte` → `/`, `src/routes/products/+page.svelte` → `/products`, `src/routes/products/[id]/+page.svelte` → `/products/1`
- `+layout.svelte` frame, `load` fetches data

---

## Why This Matters (Non-IT)

SvelteKit is like Next.js: folders = addresses. A 50-product shop doesn't hand-make 50 files — 1 `[id]` for all.

---

## Program: 3-Page SvelteKit Store

```
src/routes/
  +layout.svelte      # frame
  +page.svelte        # /
  products/
    +page.svelte      # /products
    [id]/
      +page.svelte    # /products/1
```

```svelte
<!-- src/routes/+layout.svelte -->
<nav><a href="/">Home</a> | <a href="/products">Products</a></nav>
<slot />

<!-- src/routes/products/+page.svelte -->
<script>
  let list = [{ id: 1, name: "Rice" }, { id: 2, name: "Spinach" }];
</script>
<ul>{#each list as p}<li><a href={`/products/${p.id}`}>{p.name}</a></li>{/each}</ul>

<!-- src/routes/products/[id]/+page.svelte -->
<script>
  import { page } from "$app/stores";
  $: id = $page.params.id;
</script>
<h1>Detail {id}</h1><a href="/products">Back</a>
```

`npm run dev` → `http://localhost:5173/products/1` → `id` automatic.

---

## Key Concepts

### Folders = Addresses, `[id]` = Wildcard
`products/[id]/+page.svelte` serves all `/products/*`; `$page.params.id` reads the value.

### `+layout.svelte` = Frame
Wraps all pages below it (nav, footer).

---

## Beginner Friendly Explanation

### Analogy: Mall Directory
- **Folders = floors**, **`[id]` = "any room" wildcard**, **`layout` = mall frame** around every floor.

### Step 0 — Prepare Device
- SvelteKit project (`npm create svelte@latest`), open `/products/1` directly.

### How the Computer Reads It
1. URL `/products/1` → matches `[id]` folder → renders its `+page.svelte`.
2. `$page.params.id` → `"1"`.

### 3 Must-Know Terms
1. **routes/layout/params**: floors/frame/wildcard

---

## Experiments

- **Green:** Visit `/products/2` → Detail 2?
- **Yellow:** Remove `[id]` folder → 404? Restore.
- **Red:** `<a href>` vs client nav → full reload? (SvelteKit enhances automatically.)

---

## Challenge

**3-Page Store:** Layout + Home + product list + `[id]` detail reading `$page.params.id`.

---

## Mini Glossary

- **routes/[id]/layout**: floors/wildcard/frame

---

## Summary

Week 6: **SvelteKit Map** — folders = addresses. Next: **Actions & Forms**.
