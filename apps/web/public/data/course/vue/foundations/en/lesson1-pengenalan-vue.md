# Vue Intro & Setup

> Vue | Vue Foundations | Lesson 1

## Learning Objectives

- Understand Vue as a progressive framework
- Know the Single-File Component structure (template/script/style)
- Run a first app with Vite + createApp
- Use {{ }} interpolation and <script setup>

---

## Program: Vue Intro & Setup

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

## Explanation

## What Is Vue?
Vue is a progressive framework: you can adopt it gradually (adding interactivity to an old HTML page) or fully (large SPAs with Vite). One .vue file = one component: template (HTML), script (JS logic), style (scoped CSS).

## createApp & Mounting
`createApp(App).mount('#app')` creates the app instance and attaches it to the `<div id="app">` element in index.html. All components live in a component tree rooted at App.vue.

## {{ }} Interpolation
`{{ name }}` reads a value from the script setup. Any JS expression is valid inside (e.g. `{{ stack.join(' + ') }}`), as long as it has no side effects.

## Why <script setup>?
The only API taught in this track (2026 consensus: Vue Mastery, Vue School, official docs). More concise, type-friendly, and the template can use script variables directly without a `return {}`.

---

## Experiments

1. **Vue Itu Apa?**
2. **createApp & Mounting**
3. **Interpolasi {{ }}**
4. **Kenapa <script setup>?**

---

## Challenge

Turn App.vue into a profile card: name, age, city variables (ref). Add interpolation expressions (e.g. `{{ name.length }}`, `{{ age + 1 }}`). Then remove `<script setup>` and rewrite with setup() + return — compare which is more concise.

---

## Summary

Vue = progressive framework. SFC = template + script + style. createApp().mount(). {{ }} interpolation. Composition API + <script setup> from the start. Next: reactivity & ref().
