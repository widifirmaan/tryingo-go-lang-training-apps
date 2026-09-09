# Animations & Transitions — Smooth Vue Shop

> **Kategori:** Vue | **Level:** Advanced | **Minggu 11:** Animations & Transitions
> **Prerequisites:** Week 10 — **Performance & Nuxt**.

## Learning Objectives

- `<Transition name="fade">` + CSS `.fade-enter-active` + `<TransitionGroup>` lists (source: vuejs.org/guide/built-ins/transition)

---

## Why This Matters (Non-IT)

Adding/removing products vanishing instantly → harsh, customers startled. With `Transition`, enter slides + exit fades 0.3s — feels premium.

---

## Program: Smooth Shop List

```vue
<script setup>
import { ref } from "vue";
const list = ref([{ id: 1, name: "Rice" }]);
function add() { list.value.push({ id: Date.now(), name: "Spinach" }); }
function remove(id) { list.value = list.value.filter(p => p.id !== id); }
</script>

<template>
  <button @click="add">Add Spinach</button>
  <TransitionGroup name="slide" tag="ul">
    <li v-for="p in list" :key="p.id">
      {{ p.name }} <button @click="remove(p.id)">Remove</button>
    </li>
  </TransitionGroup>
</template>

<style>
.slide-enter-active, .slide-leave-active { transition: all 0.3s; }
.slide-enter-from { opacity: 0; transform: translateX(30px); }
.slide-leave-to { opacity: 0; transform: translateX(-30px); }
</style>
```

---

## Key Concepts

### `<Transition>` / `<TransitionGroup>` = 1 / Many
`Transition` 1 element, `TransitionGroup` lists (mandatory `:key`!).

### `name="slide"` + 4 Classes = Motion Rules
`slide-enter-from/active` enter, `slide-leave-to/active` exit.

---

## Beginner Friendly Explanation

### Analogy: Mall Sliding Doors
- **Transition = sliding door**: smooth enter/exit, not vanishing walls.

### Step 0 — Prepare Device
- Same as Vue W1.

### How the Computer Reads It
1. Add item → Vue inserts `enter-from` class → animates → releases.
2. Remove → `leave-to` class → 0.3s → then removes DOM.

### 3 Must-Know Terms
1. **Transition/Group**: one/many
2. **enter/leave**: in/out

---

## Experiments

- **Green:** `0.3s` → `1s` → dramatically slow?
- **Yellow:** Remove `:key` → broken animation + warning?
- **Red:** No CSS classes → instant (not smooth)? Add them.

---

## Challenge

**Complete Smooth Shop:** Add/remove + `TransitionGroup` + 4-class CSS + different in/out directions.

---

## Mini Glossary

- **Transition/enter/leave**: motion/in/out

---

## Summary

Week 11 of 12: **Smooth** (Level: Advanced). Feels premium. Next: **Capstone**.
