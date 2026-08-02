# Deployment

> Vue | Ecosystem & Capstone | Lesson 26

## Learning Objectives

- Build a production bundle with vite build
- Deploy SPAs to Cloudflare Pages/Vercel/Netlify
- Configure SPA fallback (_redirects)
- Use env vars (VITE_ prefix)

---

## Program: Deployment

```vue
<script setup>
import { ref, onMounted } from 'vue'

const env = import.meta.env
const ready = ref(false)

onMounted(() => {
  // import.meta.env tersedia saat build; VITE_ prefix = publik
  ready.value = true
})
</script>

<template>
  <h1>Portofolio — Siap Deploy</h1>
  <p v-if="ready">Mode: {{ env.MODE }} | Versi API: {{ env.VITE_API_VERSION || 'v1' }}</p>
  <ul>
    <li>Build statis: `npm run build` → folder dist/</li>
    <li>Hosting: Cloudflare Pages / Vercel / Netlify</li>
    <li>SPA fallback: semua route ke index.html (404 → app)</li>
    <li>Env vars: awalan VITE_ tersedia di client</li>
  </ul>
</template>

```

---

## Explanation

## vite build
`npm run build` produces a `dist/` folder (minified HTML/CSS/JS + code-split). Deploying = uploading dist/ to any static host. Test locally: `npm run preview`.

## Cloudflare Pages / Vercel / Netlify
All three are free for small projects: connect the git repo → automatic build + deploy on every push. For Cloudflare Pages: build command `npm run build`, output `dist`. All support SPAs.

## SPA Fallback
Router (createWebHistory) needs every URL to serve index.html — otherwise refreshing /about → 404. Cloudflare Pages: a `public/_redirects` file with `/* /index.html 200`. Vercel/Netlify: similar config, mostly automatic.

## Env Variables
The `VITE_` prefix is required to expose variables to the client (`import.meta.env.VITE_API_URL`). Without the prefix they never appear. NEVER put server secrets in VITE_ — they are public in the bundle!

---

## Experiments

1. **vite build**
2. **Cloudflare Pages / Vercel / Netlify**
3. **SPA Fallback**
4. **Env Variables**

---

## Challenge

Deploy your e-commerce project: (1) add `_redirects` with `/* /index.html 200`, (2) build + preview locally, (3) deploy to Cloudflare Pages (or Vercel), (4) add VITE_API_VERSION and show it on the page, (5) share the URL.

---

## Summary

vite build → dist/. Deploy to Cloudflare/Vercel/Netlify. SPA fallback _redirects. Env: VITE_ prefix (public!). Next: capstone.
