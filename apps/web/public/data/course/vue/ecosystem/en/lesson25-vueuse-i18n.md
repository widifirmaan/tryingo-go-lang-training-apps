# VueUse & i18n

> Vue | Ecosystem & Capstone | Lesson 25

## Learning Objectives

- Use VueUse reactive utilities (useDark, useStorage, useDebounceFn)
- Apply i18n with vue-i18n (t(), locale)
- Combine global UI state (theme, locale)
- Read the VueUse source to copy its patterns

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

## Explanation

## VueUse: 200+ Utilities
`@vueuse/core` wraps browser APIs into reactivity: `useDark` (theme + persist + prefers-color-scheme), `useStorage` (reactive localStorage), `useDebounceFn` / `useThrottleFn`, `useFetch`, `useGeolocation`, etc. Every function is a composable — exactly the pattern you learned in lesson 13. Do not rewrite: check VueUse first.

## VueUse as Curriculum
Reading the VueUse source is the best way to internalize composable structure: refs + effects + cleanup + return. After mimicking a few times, you can write your own.

## vue-i18n
`createI18n({ legacy: false, locale, messages })`; translate via `t('key')` and `t('greeting', { name })` for interpolation. Switch language: `locale.value = 'en'` — all texts update reactively.

## Global UI State: Theme & Locale
Theme + language are cross-component global UI state: fit for Pinia or (with VueUse) just global refs with auto-persist. Never store them in per-component props — they must survive across the whole app.

---

## Experiments

1. **VueUse: 200+ Utilitas**
2. **VueUse adalah Curiculum**
3. **vue-i18n**
4. **State UI Global: Theme & Locale**

---

## Challenge

Localize the e-commerce project (lesson 23): all labels via t() (id/en), a language picker in the header, a useDark theme toggle, search history with useStorage. Make sure the cart store stays unlocalized (data != UI).

---

## Summary

VueUse = reactive browser APIs (useDark, useStorage, useDebounce). vue-i18n: t() + locale. Theme/locale = global state. Next: deployment.
