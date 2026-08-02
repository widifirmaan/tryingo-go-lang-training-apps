# VueUse & i18n

> Vue | Ekosistem & Capstone | Pelajaran 25

## Tujuan Pembelajaran

- Menggunakan VueUse untuk utilitas reaktif (useDark, useStorage, useDebounceFn)
- Menerapkan i18n dengan vue-i18n (t(), locale)
- Menggabungkan state UI global (theme, locale)
- Membaca sumber VueUse untuk meniru polanya

---

## Program: VueUse & i18n

```vue
<script setup>
import { ref } from 'vue'
import { useDark, useDebounceFn, useStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const name = ref('Ayu')

// VueUse: dark mode reaktif (persist ke localStorage otomatis)
const isDark = useDark()
// VueUse: debounce 300ms
const debouncedNotify = useDebounceFn(() => {
  alert(t('search'))
}, 300)
// VueUse: storage reaktif
const history = useStorage('search-history', [])
</script>

<template>
  <h1>{{ t('title') }}</h1>
  <p>{{ t('greeting', { name }) }}</p>

  <button @click="isDark = !isDark">Mode {{ isDark ? 'terang' : 'gelap' }}</button>
  <button @click="locale = locale === 'id' ? 'en' : 'id'">Bahasa: {{ locale }}</button>
  <button @click="debouncedNotify">Debounce test</button>
  <input placeholder="Ketik untuk menambah history (tunggu 1 dtk)" @change="history.push($event.target.value)" />
  <ul><li v-for="h in history" :key="h">{{ h }}</li></ul>
</template>

```

---

## Penjelasan

## VueUse: 200+ Utilitas
`@vueuse/core` membungkus browser API ke dalam reaktivitas: `useDark` (theme + persist + prefers-color-scheme), `useStorage` (localStorage reaktif), `useDebounceFn` / `useThrottleFn`, `useFetch`, `useGeolocation`, dll. Setiap fungsi = composable — pola persis yang kamu pelajari di pelajaran 13. Jangan tulis ulang: cek VueUse dulu.

## VueUse adalah Curiculum
Membaca sumber VueUse adalah cara terbaik menginternalisasi struktur composable: ref + efek + cleanup + return. Setelah beberapa kali meniru, kamu bisa menulis sendiri.

## vue-i18n
`createI18n({ legacy: false, locale, messages })`; terjemahan via `t('key')` dan `t('greeting', { name })` untuk interpolasi. Ganti bahasa: `locale.value = 'en'` — semua teks ter-update reaktif.

## State UI Global: Theme & Locale
Theme + bahasa adalah state UI global lintas komponen: cocok untuk Pinia atau (dengan VueUse) cukup ref global + auto-persist. Jangan simpan di props per komponen — harus survive di seluruh app.

---

## Eksperimen

1. **VueUse: 200+ Utilitas**
2. **VueUse adalah Curiculum**
3. **vue-i18n**
4. **State UI Global: Theme & Locale**

---

## Tantangan

Lokalkan proyek e-commerce (pelajaran 23): semua label via t() (id/en), pilih bahasa di header, theme toggle useDark, riwayat pencarian dengan useStorage. Pastikan store cart tidak ikut terlokalisasi (data ≠ UI).

---

## Ringkasan

VueUse = browser API yang reaktif (useDark, useStorage, useDebounce). vue-i18n: t() + locale. Theme/locale = state global. Lanjut: deployment.
