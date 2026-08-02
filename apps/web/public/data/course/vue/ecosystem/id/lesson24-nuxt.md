# Pengenalan Nuxt

> Vue | Ekosistem & Capstone | Pelajaran 24

## Tujuan Pembelajaran

- Memahami kapan Vue polos vs Nuxt
- Mengenal file-based routing, layouts, auto-import Nuxt
- Mengenal useFetch/useAsyncData (server state)
- Memutuskan: Nuxt butuh SEO/SSR, Vue polos untuk SPA

---

## Program: Pengenalan Nuxt

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

## Penjelasan

## Vue Polos vs Nuxt
Perdebatan 2026: belajar lewat Nuxt langsung (seperti Next.js untuk React) vs Vue polos dulu. Kesimpulan riset: Vue polos dulu — pola (composables, router, pinia) 100% transferable; Nuxt menambah konvensi + SSR. Pindah ke Nuxt saat butuh: SEO, SSR, API routes sendiri.

## Konvensi Nuxt (berbasis file)
`pages/` = routing otomatis (pages/about.vue → /about), `layouts/` = template halaman, `composables/` + `utils/` = auto-import (tanpa import manual), `app.vue` = root. Struktur project Vue kita sudah 80% mirip — itu sengaja.

## useFetch / useAsyncData
Nuxt membungkus fetching dengan cache, deduplikasi, dan SSR-aware state: `const { data, error, pending } = await useFetch('/api/x')`. Pola useFetch yang kamu tulis di pelajaran 14 adalah versi mini-nya.

## Server Routes
Nuxt bisa punya API sendiri: `server/api/posts.js` → `/api/posts`. Frontend + backend satu codebase (Nitro). Ini keunggulan utama beralih ke Nuxt.

---

## Eksperimen

1. **Vue Polos vs Nuxt**
2. **Konvensi Nuxt (berbasis file)**
3. **useFetch / useAsyncData**
4. **Server Routes**

---

## Tantangan

Rancang konversi proyek e-commerce (pelajaran 23) ke Nuxt: tuliskan daftar file yang berubah (pages/, layouts/, server/api/products.js) dan file yang tetap sama (stores/, composables/). Jelaskan per file apa bedanya. Tidak perlu menjalankan Nuxt — cukup rencana konversi tertulis.

---

## Ringkasan

Vue polos untuk SPA; Nuxt untuk SEO/SSR/API. Konvensi file-based: pages/layouts/auto-import. useFetch = versi mini useAsyncData. Lanjut: VueUse & i18n.
