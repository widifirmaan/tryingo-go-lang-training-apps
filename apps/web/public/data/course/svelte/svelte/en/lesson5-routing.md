# Routing & Navigation

> Svelte | Lesson 5

## Learning Objectives

- Understand Svelte routing: file-based routing and $app/navigation\n- Use goto() for programmatic navigation\n- Use $page store to access route info\n- Create route pages with file-based routing

---

## Program: Svelte

```svelte
<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
</script>

<nav>
  <a href="/" use:goto>Beranda</a>
  <a href="/about" use:goto>Tentang</a>
  <a href="/contact" use:goto>Kontak</a>
</nav>

<main>
  {#if $page.url.pathname === "/"}
    <h1>Beranda</h1>
    <p>Selamat datang di aplikasi Svelte.</p>
  {:else if $page.url.pathname === "/about"}
    <h1>Tentang</h1>
    <p>Ini adalah aplikasi Svelte routing demo.</p>
  {:else if $page.url.pathname === "/contact"}
    <h1>Kontak</h1>
    <p>Hubungi kami di kontak@example.com</p>
  {/if}
</main>
```

---

## Explanation

## File-based Routing
SvelteKit uses file system for routing: src/routes/+page.svelte = home page. src/routes/about/+page.svelte = /about.
## goto()
goto("/about") — programmatic navigation. Use in onclick or use:action.
## $page Store
$page.url.pathname — current path. $page.params — URL parameters. $page.data — page data.
## Link vs goto
<a href="/about"> — native anchor. use:goto={"/about"} — SvelteKit navigation (SPA, no full reload).

---

## Experiments

1. **## File-based Routing
SvelteKit uses file system for routing: src/routes/+page.svelte = home page. src/routes/about/+page.svelte = /about.
## goto()
goto("/about") — programmatic navigation. Use in onclick or use:action.
## $page Store
$page.url.pathname — current path. $page.params — URL parameters. $page.data — page data.
## Link vs goto
<a href="/about"> — native anchor. use:goto={"/about"} — SvelteKit navigation (SPA, no full reload).**

---

## Challenge

Level up routing: (1) add /users route with user list, (2) add dynamic route /users/[id] for user detail, (3) add sidebar navigation with active state based on $page.url.pathname, (4) create breadcrumb navigation.

---

## Summary

Routing = file-based. goto() = programmatic. $page = route info. Next: forms and data fetching.
