# Transitions & Teleport

> Vue | Production-Grade | Lesson 20

## Learning Objectives

- Animate element enter/leave with Transition
- Animate lists with TransitionGroup (+key!)
- Swap components with <component :is>
- Render outside the DOM tree with Teleport

---

## Program: Transitions & Teleport

```vue
<script setup>
import { ref } from 'vue'

const show = ref(false)
const items = ref(['Item 1', 'Item 2', 'Item 3'])
const dynamic = ref('card-a')

const components = {
  'card-a': { template: '<p class="dyn">Kartu A</p>' },
  'card-b': { template: '<p class="dyn">Kartu B</p>' },
}
</script>

<template>
  <h1>Transisi & Teleport</h1>

  <button @click="show = !show">Toggle Kotak</button>
  <Transition name="fade">
    <div v-if="show" class="box">Muncul & hilang dengan animasi</div>
  </Transition>

  <h2>TransitionGroup (list)</h2>
  <button @click="items.push('Item ' + (items.length + 1))">Tambah</button>
  <button @click="items.shift()">Hapus pertama</button>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item">{{ item }}</li>
  </TransitionGroup>

  <h2>Komponen Dinamis</h2>
  <select v-model="dynamic">
    <option value="card-a">Kartu A</option>
    <option value="card-b">Kartu B</option>
  </select>
  <component :is="components[dynamic]" />

  <h2>Teleport</h2>
  <Teleport to="body">
    <p class="teletip">Saya di-render di &lt;body&gt;, bukan di sini!</p>
  </Teleport>
</template>

<style scoped>
.box { padding: 1rem; border: 1px solid #42B883; border-radius: 8px; margin: 0.5rem 0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.list-enter-active, .list-leave-active { transition: all 0.3s; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(20px); }
.dyn { border: 1px dashed #42B883; padding: 0.6rem; border-radius: 8px; }
.teletip { position: fixed; bottom: 1rem; right: 1rem; background: #42B883; color: #fff; padding: 0.6rem 1rem; border-radius: 8px; }
</style>

```

---

## Explanation

## Transition
`<Transition>` wraps a single element: `enter-from/enter-active/enter-to` and `leave-*` classes apply automatically when v-if/v-show changes. CSS animation lives in the component stylesheet. For swapping elements (counters), add :key so the transition runs between values.

## TransitionGroup
For LISTS: requires `:key` (identity! lesson 4) on every item — without keys Vue cannot tell which item entered/left/moved. `list-*` classes + `move` animate positions.

## Dynamic Components
`<component :is="...">` swaps components when the :is value changes. Often combined with `<KeepAlive>` (state preserved when switching) and tab panels.

## Teleport
`<Teleport to="body">` moves DOM rendering to a target (body, modal root) without changing component logic. Used for: modals (overflow-free), tooltips, toasts. The lesson-12 modal uses this pattern.

---

## Experiments

1. **Transition**
2. **TransitionGroup**
3. **Komponen Dinamis**
4. **Teleport**

---

## Challenge

Build a toast notification system: Teleport to body + TransitionGroup, toasts {id, message, type}, auto-dismiss after 3s (setTimeout + remove). Slide-in-from-right animation. Bonus: a "clear all" button with animation.

---

## Summary

Transition (single element), TransitionGroup (lists + :key!), dynamic <component :is>, Teleport (body). Modals + toasts = real patterns. Next: performance.
