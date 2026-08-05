# Routing & Navigation

> Svelte | Pelajaran 5

## Tujuan Pembelajaran

- Memahami routing di Svelte: file-based routing dan $app/navigation\n- Menggunakan goto() untuk navigasi programmatic\n- Menggunakan $page store untuk mengakses route info\n- Membuat route pages dengan file-based routing

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

## Penjelasan

## File-based Routing
SvelteKit menggunakan file system untuk routing: src/routes/+page.svelte = halaman utama. src/routes/about/+page.svelte = /about.
## goto()
goto("/about") — navigasi programmatic. Gunakan di onclick atau use:action.
## $page Store
$page.url.pathname — path saat ini. $page.params — URL parameters. $page.data — page data.
## Link vs goto
<a href="/about"> — native anchor. use:goto={"/about"} — SvelteKit navigation (SPA, no full reload).

---

## Eksperimen

1. **## File-based Routing
SvelteKit menggunakan file system untuk routing: src/routes/+page.svelte = halaman utama. src/routes/about/+page.svelte = /about.
## goto()
goto("/about") — navigasi programmatic. Gunakan di onclick atau use:action.
## $page Store
$page.url.pathname — path saat ini. $page.params — URL parameters. $page.data — page data.
## Link vs goto
<a href="/about"> — native anchor. use:goto={"/about"} — SvelteKit navigation (SPA, no full reload).**

---

## Tantangan

Tingkatkan routing: (1) tambah route /users dengan daftar user, (2) tambah dynamic route /users/[id] untuk detail user, (3) tambah navigasi sidebar dengan active state berdasarkan $page.url.pathname, (4) buat breadcrumb navigation.

---

## Ringkasan

Routing = file-based. goto() = programmatic. $page = route info. Lanjut: forms dan data fetching.
