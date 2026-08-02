# Emits: Child → Parent

> Vue | Components & Communication | Lesson 9

## Learning Objectives

- Send data child → parent with emits
- Declare events with defineEmits
- Send payloads (id, values, events)
- Understand the pattern: props down, events up

---

## Program: Emits: Child → Parent

```vue
<script setup>
import { ref } from 'vue'
import TaskItem from './components/TaskItem.vue'

const tasks = ref([
  { id: 1, title: 'Belajar props', done: true },
  { id: 2, title: 'Belajar emits', done: false },
])

function handleToggle(id) {
  const t = tasks.value.find((task) => task.id === id)
  if (t) t.done = !t.done
}

function handleDelete(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}
</script>

<template>
  <h1>Emits: Anak ke Induk</h1>
  <TaskItem
    v-for="t in tasks"
    :key="t.id"
    :task="t"
    @toggle="handleToggle"
    @delete="handleDelete"
  />
  <p>{{ tasks.length }} tugas tersisa</p>
</template>

```

---

## Explanation

## Props Down, Events Up
Data flows one way down, events bubble up. A child never touches parent data; it notifies via `emit('toggle', id)` and the parent decides how to process it.

## defineEmits
`defineEmits(['toggle', 'delete'])` declares events (documentation + validation). In templates call `emit('delete', task.id)` directly or through a function. The parent listens: `@delete="handleDelete"`.

## Event Payloads
Events can carry any arguments: `emit('toggle', task.id)`, `emit('submit', { name, email })`. The parent handler receives them as first parameters — data is not wrapped in the raw event.

## When to Use Emits
Every time a child needs to "request" a change to parent-owned data: toggle, delete, submit, select. Rule: if the child changes something that is NOT its own local state → emits. Stay consistent with the lesson-5 form pattern: `@submit.prevent` + emitting an object payload.

---

## Experiments

1. **Props Turun, Events Naik**
2. **defineEmits**
3. **Payload Event**
4. **Kapan Menggunakan Emits**

---

## Challenge

Build a voting app: App has a candidates array; VoteButton emits "increment" + id payload; results update in App. Add a "reset all" button in App. Practice: events with object payloads `emit('vote', { id, by: 'user' })`.

---

## Summary

Events bubble up: emit(name, payload). defineEmits declares them. Props down + events up = a healthy two-way flow. Next: v-model on components.
