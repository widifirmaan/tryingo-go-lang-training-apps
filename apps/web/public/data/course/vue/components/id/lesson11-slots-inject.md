# Slots & Provide/Inject

> Vue | Komponen & Komunikasi | Pelajaran 11

## Tujuan Pembelajaran

- Menyisipkan konten dengan slots (default & named)
- Membuat fallback content di slot
- Menggunakan scoped slots untuk data binding
- Menghindari prop drilling dengan provide/inject

---

## Program: Slots & Provide/Inject

```vue
<script setup>
import { ref, provide } from 'vue'
import PageCard from './components/PageCard.vue'
import ThemeText from './components/ThemeText.vue'

const theme = ref('light')
provide('theme', theme)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <button @click="toggleTheme">Tema: {{ theme }}</button>

  <PageCard title="Default Slot">
    Konten ini masuk ke slot default.
  </PageCard>

  <PageCard>
    <template #title>Judul Kustom (named slot)</template>
    <p>Slot bisa berisi komponen lain, termasuk ThemeText:</p>
    <ThemeText />
  </PageCard>
</template>

```

---

## Penjelasan

## Slot = Tempat Sisip
`<slot>` di komponen adalah "lubang" yang diisi parent. Komponen layout (kartu, modal, halaman) memakai slot agar bisa menyusun konten berbeda tanpa hard-code. Tanpa slot, komponen tidak bisa menerima konten.

## Named & Fallback
`<slot name="title">` diisi via `<template #title>`. Teks di dalam tag slot = fallback saat parent tidak mengirim. Pola: `<slot>` (default) + `<slot name="header">`.

## Scoped Slot (lanjutan)
`<slot :item="item">` mengirim data dari child ke konten slot parent — parent menerimanya via `<template #default="{ item }">`. Berguna untuk list generic yang tetap memegang logika item di child.

## Provide/Inject
`provide('theme', ref)` di root; `inject('theme')` di komponen sedalam apa pun. Menggantikan rantai props 3+ level (prop drilling). Aturan: pakai saat >2 level atau banyak komponen jauh memakai nilai yang sama; untuk 1-2 level, props tetap lebih jelas.

---

## Eksperimen

1. **Slot = Tempat Sisip**
2. **Named & Fallback**
3. **Scoped Slot (lanjutan)**
4. **Provide/Inject**

---

## Tantangan

Buat komponen TableGrid dengan scoped slot kolom: `<slot name="cell" :row="row">`. Di App, render daftar user dengan kolom kustom (nama tebal, aksi tombol). Tambahkan provide('currentUser') dan tampilkan di komponen terdalam.

---

## Ringkasan

Slot: lubang konten (default/named/fallback/scoped). Provide/inject: menembus kedalaman tanpa prop drilling (>2 level). Lanjut: proyek komponen.
