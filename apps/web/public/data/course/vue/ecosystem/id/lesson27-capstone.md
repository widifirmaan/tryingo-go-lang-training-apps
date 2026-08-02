# Capstone: SaaS Starter

> Vue | Ekosistem & Capstone | Pelajaran 27

## Tujuan Pembelajaran

- Membangun capstone dengan semua pola yang dipelajari
- Menjalankan siklus: fitur → tes → commit → deploy
- Menerapkan auth, proteksi route, dark mode
- Menyajikan hasil akhir sebagai portfolio

---

## Program: Capstone: SaaS Starter

```vue
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<template>
  <nav>
    <RouterLink to="/">Beranda</RouterLink>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
    <button @click="isDark = !isDark">Tema</button>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

```

---

## Penjelasan

## Checkpoint Akhir
Capstone = SaaS starter yang menggabungkan: Pinia session (auth + persist), router guard (proteksi + redirect), VueUse (dark mode), dan pola komponen yang rapi. Setiap baris harus bisa kamu jelaskan — kalau ada yang tidak, ulangi pelajaran terkait.

## Siklus Profesional
Alur kerja bootcamp: kerjakan SATU fitur → tulis tes untuk logikanya → commit (pesan jelas) → lanjut. Bukan menulis semua lalu commit sekali. Git history yang rapi = bukti kerja yang bisa ditunjukkan ke perekrut.

## Ekspansi Capstone
Tambahan yang lazim: i18n (t() + locale switch), komponen UI reusable (Modal, Toast, Tabs dari pelajaran 12), halaman 404, empty states untuk semua list, dan error boundary. Pilih 2-3, jangan semuanya.

## Jadi Portfolio
Deploy (pelajaran 26), tulis README: apa app-nya, stack, fitur, cara run. Screenshot + demo URL. Satu app selesai & rapi > lima app setengah jadi. Selamat — kamu sekarang Vue Developer.

---

## Eksperimen

1. **Checkpoint Akhir**
2. **Siklus Profesional**
3. **Ekspansi Capstone**
4. **Jadi Portfolio**

---

## Tantangan

Rencanakan dan kerjakan: (1) 3 fitur baru di atas starter ini (mis. notes CRUD dengan persist, profil user, halaman 404), (2) tes Vitest untuk 2 store/logika, (3) i18n id/en, (4) deploy + README. Target: semua checklist capstone tercentang.

---

## Ringkasan

Capstone merangkum semua fase. Siklus: fitur → tes → commit. Auth + guard + dark mode. Deploy + README = portfolio. Selamat, kamu Vue Developer!
