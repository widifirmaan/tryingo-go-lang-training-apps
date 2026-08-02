# Nuxt Introduction

> Vue | Ecosystem & Capstone | Lesson 24

## Learning Objectives

- Understand when plain Vue vs Nuxt
- Know Nuxt file-based routing, layouts, auto-import
- Know useFetch/useAsyncData (server state)
- Decide: Nuxt for SEO/SSR, plain Vue for SPAs

---

## Program: Nuxt Introduction

```js
import { ref } from 'vue'

// Di Nuxt, composables + auto-import + useFetch bawaan:
//   const { data, error } = await useFetch('/api/posts')
export function useApi(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function run() {
    loading.value = true
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('HTTP ' + res.status)
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  run()
  return { data, error, loading }
}

```

---

## Explanation

## Plain Vue vs Nuxt
The 2026 debate: learn via Nuxt directly (like Next.js for React) vs plain Vue first. Research conclusion: plain Vue first — the patterns (composables, router, pinia) are 100% transferable; Nuxt adds conventions + SSR. Move to Nuxt when you need: SEO, SSR, your own API routes.

## Nuxt Conventions (file-based)
`pages/` = automatic routing (pages/about.vue → /about), `layouts/` = page templates, `composables/` + `utils/` = auto-import (no manual imports), `app.vue` = root. Our Vue project structure is already 80% similar — intentionally.

## useFetch / useAsyncData
Nuxt wraps fetching with caching, deduplication, and SSR-aware state: `const { data, error, pending } = await useFetch('/api/x')`. The useFetch you wrote in lesson 14 is its miniature version.

## Server Routes
Nuxt can host its own API: `server/api/posts.js` → `/api/posts`. Frontend + backend in one codebase (Nitro). This is the main reason to switch to Nuxt.

---

## Experiments

1. **Vue Polos vs Nuxt**
2. **Konvensi Nuxt (berbasis file)**
3. **useFetch / useAsyncData**
4. **Server Routes**

---

## Challenge

Plan the conversion of the e-commerce project (lesson 23) to Nuxt: list the files that change (pages/, layouts/, server/api/products.js) and the files that stay the same (stores/, composables/). Explain the difference per file. No need to run Nuxt — just a written conversion plan.

---

## Summary

Plain Vue for SPAs; Nuxt for SEO/SSR/APIs. File-based conventions: pages/layouts/auto-import. useFetch = mini useAsyncData. Next: VueUse & i18n.
