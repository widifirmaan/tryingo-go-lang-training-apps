# Capstone: SvelteKit App

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 10:** Capstone: SvelteKit App

## Tujuan Pembelajaran

- Menggabungkan semua konsep Svelte/SvelteKit
- SvelteKit: routing, actions, load functions
- Database integration dengan Prisma
- Auth dan protected routes
- Production deployment

---

## Program: Capstone SvelteKit: App Produksi

Capstone menyatukan routing SvelteKit, form actions, load + locals, dan pemilihan adapter deployment.

```svelte
<!-- Capstone: dashboard mini e-commerce (3 arsitektur) -->
<!-- src/routes/dashboard/+page.server.ts -->
export const load = async ({ locals }) => {
  const [orders, stats] = await Promise.all([
    locals.db.orders.latest(5),
    locals.db.orders.summaries(),
  ]);
  return { orders, stats };
};

<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  let { data } = $props();
</script>

<summary>
  <h1>Revenue: {data.stats.revenue}</h1>
  <p>Orders: {data.stats.count}</p>
</summary>

<table>
  {#each data.orders as o (o.id)}
    <tr><td>{o.customer}</td><td>{o.total}</td></tr>
  {/each}
</table>

<form method="POST" action="?/refresh" use:enhance>
  <button>Terapkan Refresh</button>
</form>
```

---

## Konsep Kunci

### load + locals

locals.db dipenuhi di hooks.server.ts — dependency injection pattern untuk koneksi DB per request (connection pool, request user).

### Form actions & invalidate

Form action + invalidateAll menyegarkan data load setelah mutasi — pola server-first sebelum memakai state global.

### Project structure

lib/ untuk service dan komponen reusable; routes/ untuk halaman; hooks.server.ts untuk middleware; alias $lib untuk import rapi.

### Deployment target

Pass up SvelteKit adapter: adapter-auto (Vercel/CF Pages), adapter-node (self-hosted), adapter-static (SSG).

---

## Eksperimen

- Tambah grafik revenue bulanan via chart library.
- Tampilkan skeleton loading saat fetch.
- Susun checklist build: pagination, error state, sidebar collapse.

---

## Tantangan

Ship it: pasang analytics, error tracking, dan lighthouse budget sebelum demo day.

---

## Ringkasan

Materi minggu ini telah dibahas: Capstone SvelteKit: App Produksi. Lanjut ke pekan berikutnya untuk memperdalam.
