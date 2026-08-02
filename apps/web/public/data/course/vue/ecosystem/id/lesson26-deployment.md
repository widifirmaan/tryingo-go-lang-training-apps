# Deployment

> Vue | Ekosistem & Capstone | Pelajaran 26

## Tujuan Pembelajaran

- Membangun bundle produksi dengan vite build
- Mendeploy SPA ke Cloudflare Pages/Vercel/Netlify
- Mengonfigurasi SPA fallback (_redirects)
- Menggunakan env vars (VITE_ prefix)

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

## Penjelasan

## vite build
`npm run build` menghasilkan folder `dist/` (HTML/CSS/JS terminisasi + code-split). Deploy = mengunggah dist/ ke hosting statis mana pun. Test lokal: `npm run preview`.

## Cloudflare Pages / Vercel / Netlify
Ketiganya gratis untuk proyek kecil: hubungkan repo git → otomatis build + deploy tiap push. Untuk Cloudflare Pages: build command `npm run build`, output `dist`. Semua mendukung SPA.

## SPA Fallback
Router (createWebHistory) butuh semua URL mengarah ke index.html — jika tidak, refresh /about → 404. Cloudflare Pages: file `public/_redirects` berisi `/* /index.html 200`. Vercel/Netlify: konfigurasi serupa otomatis.

## Env Variables
`VITE_` prefix wajib agar variabel ter-expose ke client (`import.meta.env.VITE_API_URL`). Tanpa prefix, tidak akan muncul. Jangan pernah menaruh secret (API key server) di VITE_ — itu publik di bundle!

---

## Eksperimen

1. **vite build**
2. **Cloudflare Pages / Vercel / Netlify**
3. **SPA Fallback**
4. **Env Variables**

---

## Tantangan

Deploy proyek e-commerce kamu: (1) tambah `_redirects` dengan `/* /index.html 200`, (2) build + preview lokal, (3) deploy ke Cloudflare Pages (atau Vercel), (4) tambah VITE_API_VERSION dan tampilkan di halaman, (5) share URL-nya.

---

## Ringkasan

vite build → dist/. Deploy ke Cloudflare/Vercel/Netlify. SPA fallback _redirects. Env: VITE_ prefix (publik!). Lanjut: capstone.
