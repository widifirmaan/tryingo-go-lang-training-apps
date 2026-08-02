# Components & SFC

> Vue | Components & Communication | Lesson 7

## Learning Objectives

- Break UI into small components
- Build a component tree (parent → child)
- Import & use components with <script setup>
- Isolate styles with scoped

---

## Program: Components & SFC

```vue
<script setup>
import ProfileCard from './components/ProfileCard.vue'
import StatsRow from './components/StatsRow.vue'

const name = 'Ayu'
const role = 'Vue Developer'
const stats = [
  { label: 'Lesson', value: 7 },
  { label: 'Latihan', value: 12 },
  { label: 'Materi', value: 3 },
]
</script>

<template>
  <main>
    <h1>Halaman Profil</h1>
    <ProfileCard :name="name" :role="role" />
    <StatsRow :stats="stats" />
  </main>
</template>

```

---

## Explanation

## Why Components?
A giant single file is unmaintainable. A component is a reusable UI block with its own logic. Rule: split when a component exceeds ~100 lines or when a part is clearly reusable (cards, stat rows, buttons).

## Import & Use
With <script setup>, `import ProfileCard from ...` is enough — the component variable is directly available in the template. Naming: PascalCase for components (`ProfileCard.vue`, not `profileCard.vue`).

## style scoped
`<style scoped>` adds a unique data attribute so the CSS only applies inside that component — preventing class clashes across components. Without scoped, global classes can overwrite each other.

## One File, One Component
File name = component name. Use a single `src/components/` directory. App.vue remains the root that composes everything (App = "page", components = "parts").

---

## Experiments

1. **Kenapa Komponen?**
2. **Import & Pakai**
3. **style scoped**
4. **Aturan Satu File Satu Komponen**

---

## Challenge

Split the product card from lesson 3 into: ProductCard.vue (presentation) and App.vue (state). Add a BadgePromo component used inside ProductCard. Notice: three levels of component tree.

---

## Summary

Components = reusable blocks. Auto-import via <script setup>. PascalCase. scoped styles. Split when big/reusable. Next: props.
