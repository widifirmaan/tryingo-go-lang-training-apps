# Data Fetching

> Vue | Architecture & State | Lesson 14

## Learning Objectives

- Fetch data with fetch + async/await
- Handle 3 UI states: loading, error, empty
- Build a reusable useFetch composable
- Keep server state separate from local state

---

## Program: Data Fetching

```vue
<script setup>
import { useFetch } from './composables/useFetch'

const { data, error, loading, retry } = useFetch(
  'https://jsonplaceholder.typicode.com/users'
)
</script>

<template>
  <h1>Fetch Users</h1>
  <p v-if="loading">Memuat...</p>
  <p v-else-if="error">Gagal: {{ error }} <button @click="retry">Coba lagi</button></p>
  <p v-else-if="!data || data.length === 0">Tidak ada data.</p>
  <ul v-else>
    <li v-for="u in data" :key="u.id">{{ u.name }} — {{ u.email }}</li>
  </ul>
</template>

```

---

## Explanation

## Three Required States
Production apps always show 3 states: loading (spinner/text), error (message + retry button), and empty (no data). Chain `v-if` in order: `loading` → `error` → `empty` → data. Missing any one = poor UX.

## fetch + async/await
`await fetch(url)` → check `res.ok` → `await res.json()`. Do not forget to throw on HTTP errors (fetch does NOT throw for 404/500 by default!). `try/catch/finally` handles network errors and resets loading.

## Why useFetch?
Fetching logic (loading/error/data) is identical on every page. A composable = one place, used everywhere. This is the pattern Nuxt (`useFetch`) and TanStack Query/Pinia Colada use for server state.

## Server State != Local State
API data is not "app state" — do not put it in Pinia (lesson 17). Server state has its own lifecycle: refetch, invalidation, caching. Use useFetch/query libraries; Pinia is for cross-component UI state.

---

## Experiments

1. **Tiga Status Wajib**
2. **fetch + async/await**
3. **Mengapa useFetch?**
4. **Server State ≠ State Lokal**

---

## Challenge

Build a posts list + detail page: useFetch for /posts, click an item → useFetch /posts/{id}. Add an empty state when the search filter matches nothing. Simulate an error: change the URL to an invalid one, see the retry button work.

---

## Summary

3 states: loading/error/empty. fetch does not auto-throw — check res.ok. Reusable useFetch. Server state stays out of Pinia. Next: router.
