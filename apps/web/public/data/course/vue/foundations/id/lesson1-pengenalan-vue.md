# Pengenalan Vue & Setup

> Vue | Foundasi Vue | Pelajaran 1

## Tujuan Pembelajaran

- Memahami Vue sebagai framework progresif
- Mengenal struktur Single-File Component (template/script/style)
- Menjalankan aplikasi pertama dengan Vite + createApp
- Menggunakan sintaks interpolasi {{ }} dan <script setup>

---

## Program: Pengenalan Vue & Setup

```vue
<script setup>
// <script setup> = Composition API langsung dari awal (rekomendasi resmi 2026).
// Options API (data/methods/computed) hanya perlu dikenal untuk membaca kode legacy.
import { ref } from 'vue'

const name = ref('Ayu')
const role = ref('Vue Developer')
const stack = ['Vue 3', 'Vite', 'Pinia']
</script>

<template>
  <h1>Halo, {{ name }}!</h1>
  <p>Peran: {{ role }}</p>
  <p>Stack: {{ stack.join(' + ') }}</p>
  <p>{{ name }} sedang belajar Vue pada {{ new Date().getFullYear() }}</p>
</template>

<style scoped>
h1 { color: #42B883; }
</style>

```

---

## Penjelasan

## Vue Itu Apa?
Vue adalah framework progresif: bisa dipakai sedikit-sedikit (menambah interaktivitas ke halaman HTML lama) atau penuh (SPA besar dengan Vite). Satu file .vue = satu komponen: template (HTML), script (logika JS), style (CSS scoped).

## createApp & Mounting
`createApp(App).mount('#app')` membuat instance aplikasi dan memasangnya ke elemen `<div id="app">` di index.html. Semua komponen berada di dalam pohon komponen yang berakar di App.vue.

## Interpolasi {{ }}
`{{ name }}` membaca nilai dari script setup. Ekspresi JS apa pun valid di dalamnya (contoh: `{{ stack.join(' + ') }}`), selama tidak punya side-effect.

## Kenapa <script setup>?
Satu-satunya API yang diajarkan di track ini (konsensus 2026: Vue Mastery, Vue School, docs resmi). Lebih ringkas, tipe-friendly, dan template langsung bisa memakai variabel script tanpa `return {}`.

---

## Eksperimen

1. **Vue Itu Apa?**
2. **createApp & Mounting**
3. **Interpolasi {{ }}**
4. **Kenapa <script setup>?**

---

## Tantangan

Ubah App.vue menjadi kartu profil: variabel name, age, city (ref). Tambahkan ekspresi interpolasi (misal `{{ name.length }}`, `{{ age + 1 }}`). Lalu coba hapus `<script setup>` dan tulis ulang dengan setup() + return — bandingkan mana yang lebih ringkas.

---

## Ringkasan

Vue = framework progresif. SFC = template + script + style. createApp().mount(). Interpolasi {{ }}. Composition API + <script setup> sejak awal. Lanjut: reaktivitas & ref().
