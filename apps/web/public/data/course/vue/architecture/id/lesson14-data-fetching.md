# Data Fetching

> Vue | Arsitektur & State | Pelajaran 14

## Tujuan Pembelajaran

- Mengambil data dengan fetch + async/await
- Menangani 3 status UI: loading, error, empty
- Membangun composable useFetch reusable
- Menyusun state server terpisah dari state lokal

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

## Penjelasan

## Tiga Status Wajib
App produksi selalu menampilkan 3 status: loading (spinner/teks), error (pesan + tombol retry), dan empty (tidak ada data). `v-if` berurutan: `loading` → `error` → `empty` → data. Lewat satu status saja = UX jelek.

## fetch + async/await
`await fetch(url)` → cek `res.ok` → `await res.json()`. Jangan lupa throw saat HTTP error (fetch tidak throw otomatis untuk 404/500!). `try/catch/finally` menangani error jaringan dan reset loading.

## Mengapa useFetch?
Logika fetching (loading/error/data) identik di setiap halaman. Composable = satu tempat, dipakai di mana saja. Pola ini yang dipakai Nuxt (`useFetch`) dan TanStack Query/Pinia Colada untuk server state.

## Server State ≠ State Lokal
Data dari API bukan "state app" — jangan masukkan ke Pinia (pelajaran 17). Server state punya siklus hidup sendiri: refetch, invalidasi, cache. Gunakan useFetch/query library; Pinia untuk state UI lintas komponen.

---

## Eksperimen

1. **Tiga Status Wajib**
2. **fetch + async/await**
3. **Mengapa useFetch?**
4. **Server State ≠ State Lokal**

---

## Tantangan

Bangun halaman daftar posting + detail: useFetch untuk /posts, klik item → useFetch /posts/{id}. Tambahkan status empty ketika filter pencarian tidak cocok. Simulasikan error: ubah URL jadi URL tidak valid, lihat tombol retry bekerja.

---

## Ringkasan

3 status: loading/error/empty. fetch tidak throw otomatis — cek res.ok. useFetch reusable. Server state terpisah dari Pinia. Lanjut: router.
