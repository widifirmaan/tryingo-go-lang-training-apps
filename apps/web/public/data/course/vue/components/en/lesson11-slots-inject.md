# Slots & Provide/Inject

> Vue | Components & Communication | Lesson 11

## Learning Objectives

- Insert content with slots (default & named)
- Create fallback content in slots
- Use scoped slots for data binding
- Avoid prop drilling with provide/inject

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

## Explanation

## Slot = Insertion Point
`<slot>` inside a component is a "hole" the parent fills. Layout components (cards, modals, pages) use slots to compose different content without hard-coding. Without slots, components cannot receive content.

## Named & Fallback
`<slot name="title">` is filled via `<template #title>`. Text inside the slot tag = fallback when the parent sends nothing. Pattern: `<slot>` (default) + `<slot name="header">`.

## Scoped Slots (advanced)
`<slot :item="item">` sends data from child to the parent's slot content — the parent receives it via `<template #default="{ item }">`. Great for generic lists that keep item logic in the child.

## Provide/Inject
`provide('theme', ref)` at the root; `inject('theme')` at any depth. Replaces 3+ level prop chains (prop drilling). Rule: use when >2 levels deep or many distant components share a value; for 1-2 levels, props stay clearer.

---

## Experiments

1. **Slot = Tempat Sisip**
2. **Named & Fallback**
3. **Scoped Slot (lanjutan)**
4. **Provide/Inject**

---

## Challenge

Build a TableGrid component with a scoped column slot: `<slot name="cell" :row="row">`. In App, render a user list with custom columns (bold name, action buttons). Add provide("currentUser") and show it in the deepest component.

---

## Summary

Slots: content holes (default/named/fallback/scoped). Provide/inject: pierces depth without prop drilling (>2 levels). Next: component project.
