# Proyek: Mini Dashboard

> Vue | Arsitektur & State | Pelajaran 18

## Tujuan Pembelajaran

- Mengintegrasikan Pinia + Router + guard dalam satu app
- Menyimpan session auth di store global
- Melindungi route berdasarkan state store
- Menyusun struktur proyek: stores/, pages/, router/

---

## Program: Proyek: Mini Dashboard

```js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const user = ref(JSON.parse(localStorage.getItem('demo-user') ?? 'null'))

  const isLoggedIn = computed(() => user.value !== null)

  function login(name) {
    user.value = { name }
    localStorage.setItem('demo-user', JSON.stringify(user.value))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('demo-user')
  }

  return { user, isLoggedIn, login, logout }
})

```

---

## Penjelasan

## Arsitektur App Nyata
Pola produksi: `src/stores/` (state global: session, tasks), `src/pages/` (halaman), `src/router/` (route + guard). Halaman tidak pernah menyimpan user di state lokal — guard butuh store yang sama agar bisa menilai akses.

## Guard + Store
`router.beforeEach` membaca `useSessionStore().isLoggedIn` — store dan guard berbagi satu sumber kebenaran. Inilah alasan utama auth hidup di Pinia: semua komponen + router melihat state yang sama.

## Komposisi Store
Satu store per concern: `session` (auth) dan `tasks` (data tugas) terpisah. Store bertukar data secara eksplisit bila perlu (import store dalam store — jarang). Jangan buat satu `useAppStore` raksasa.

## Checkpoint
Sebelum lanjut, kamu harus bisa: (1) membangun halaman login yang menyimpan user global, (2) melindungi route dengan guard dari store, (3) logout yang mereset state + redirect. Jika masih bingung antara ref lokal dan store: tanya "apakah state ini perlu survive navigasi?".

---

## Eksperimen

1. **Arsitektur App Nyata**
2. **Guard + Store**
3. **Komposisi Store**
4. **Checkpoint**

---

## Tantangan

Perluas dashboard: (1) role admin vs user (login dengan checkbox admin), (2) halaman /dashboard/settings khusus admin (guard membaca meta + role), (3) persist tasks ke localStorage. Commit tiap fitur.

---

## Ringkasan

Pinia + Router + guard = arsitektur app nyata. Session di store, guard membaca store. Store per concern. Checkpoint: login/proteksi/logout. Lanjut: production-grade.
