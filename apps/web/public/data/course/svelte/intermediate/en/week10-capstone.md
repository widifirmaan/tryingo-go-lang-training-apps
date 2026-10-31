# Capstone: SvelteKit App

> **Kategori:** Svelte | **Level:** Intermediate | **Minggu 10:** Capstone: SvelteKit App

## Learning Objectives

- Combine all Svelte/SvelteKit concepts
- SvelteKit: routing, actions, load functions
- Database integration with Prisma
- Auth and protected routes
- Production deployment

---

## Program: SvelteKit Capstone: Production App

The finale bring together SvelteKit routing, form actions, stores, and deployment.

```svelte
<!-- Capstone: mini e-commerce dashboard -->
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
  <button>Refresh stats</button>
</form>
```

---

## Key Concepts

### load + locals

locals.db dipenuhi di hooks.server.ts — dependency injection pattern untuk koneksi DB per request (connection pool, request user).

### Form actions & invalidate

Form action + invalidateAll menyegarkan data load setelah mutasi — pola server-first sebelum memakai state global.

### Project structure

lib/ untuk service dan komponen reusable; routes/ untuk halaman; hooks.server.ts untuk middleware; alias $lib untuk import rapi.

### Deployment target

Pass up SvelteKit adapter: adapter-auto (Vercel/CF Pages), adapter-node (self-hosted), adapter-static (SSG).

---

## Experiments

- Add a monthly revenue chart with a chart library.
- Load skeleton states during fetches.
- Build a checklist: pagination, error states, responsive sidebar.

---

## Challenge

Ship it: connect analytics, error tracking, and a performance budget before demo day.

---

## Summary

This week's material has been covered: SvelteKit Capstone: Production App. Continue to the following week to deepen.
