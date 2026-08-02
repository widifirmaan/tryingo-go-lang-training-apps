# Lists & Events

> Vue | Vue Foundations | Lesson 4

## Learning Objectives

- Render lists with v-for and :key
- Understand key = identity, NOT position
- Handle events with v-on (@) + modifiers
- Pass event handler arguments with $event

---

## Program: Lists & Events

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Belajar Vue', done: false },
  { id: 2, name: 'Baca docs reaktivitas', done: true },
  { id: 3, name: 'Latihan v-for', done: false },
])

let nextId = 4

function addItem(event) {
  const text = event.target.value.trim()
  if (!text) return
  items.value.push({ id: nextId++, name: text, done: false })
  event.target.value = ''
}

function removeItem(id) {
  items.value = items.value.filter((item) => item.id !== id)
}

function toggleDone(id) {
  const item = items.value.find((i) => i.id === id)
  if (item) item.done = !item.done
}
</script>

<template>
  <h1>Daftar Belajar</h1>
  <input @keyup.enter="addItem" placeholder="Tulis tugas lalu Enter" />
  <ul>
    <li v-for="item in items" :key="item.id" :class="{ done: item.done }">
      <input type="checkbox" :checked="item.done" @change="toggleDone(item.id)" />
      {{ item.name }}
      <button @click.stop="removeItem(item.id)">hapus</button>
    </li>
  </ul>
  <p>Total: {{ items.length }} | Selesai: {{ items.filter((i) => i.done).length }}</p>
</template>

<style scoped>
.done { text-decoration: line-through; color: #888; }
li { margin: 0.4rem 0; }
button { margin-left: 0.5rem; }
</style>

```

---

## Explanation

## v-for + :key
`v-for="item in items"` renders one element per item. `:key` is REQUIRED for item identity. Key = data IDENTITY, not position: never `:key="index"` — when the list reorders or items hold internal state, index causes hard-to-trace bugs (VueConf Toronto: the bug needs reorder + stateful items).

## Events: v-on (@)
`@click` = `v-on:click`. Handlers can be statements (`count++`) or functions. Arguments: `@click="addItem($event)"` passes the raw event; for data: `@click="removeItem(item.id)"` (never write `item.id` without parentheses in a handler).

## Modifiers
`.stop` stops propagation (`@click.stop`), `.prevent` calls preventDefault (form submit), `.once` fires once, `.self` only when the target is the element itself. `@keyup.enter` for the Enter key.

## List Mutation
Mutating array methods (`push`, `splice`) are reactivity-detected; reassignment (`items.value = filter(...)`) also triggers updates. Never replace `items.value` with a new array in an event without reason — pick one pattern and stay consistent.

---

## Experiments

1. **v-for + :key**
2. **Event: v-on (@)**
3. **Modifiers**
4. **Mutasi List**

---

## Challenge

Extend it into a shopping list: items { id, name, qty }. +/- buttons for quantity. Filter buttons: All / Not bought. Explain why :key="item.id" is safer than :key="index" when deleting an item in the middle of the list.

---

## Summary

v-for + :key (identity!). v-on (@) + modifiers (.stop/.prevent/.once/.enter). Handler arguments. Array mutation is detected. Next: forms & v-model.
