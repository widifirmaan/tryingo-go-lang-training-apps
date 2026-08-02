# Declarative Rendering & ref()

> Vue | Vue Foundations | Lesson 2

## Learning Objectives

- Understand the reactivity mental model: data changes → DOM updates
- Declare state with ref()
- Master the .value rules (required in script, auto-unwrapped in template)
- Why refs exist: so Vue can track access and mutation

---

## Program: Declarative Rendering & ref()

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const message = ref('Klik tombolnya!')

function increment() {
  count.value += 1
  message.value = count.value > 5 ? 'Luar biasa, teruskan!' : 'Bagus, lanjutkan!'
}

function reset() {
  count.value = 0
  message.value = 'Mulai lagi dari nol.'
}
</script>

<template>
  <h1>Counter: {{ count }}</h1>
  <p>{{ message }}</p>
  <button @click="increment">Tambah</button>
  <button @click="reset">Reset</button>
  <p>Di template ref otomatis terbuka (tanpa .value). Di script Wajib .value.</p>
</template>

<style scoped>
h1 { color: #42B883; }
</style>

```

---

## Explanation

## Mental Model: Data -> UI
You never write `document.getElementById(...)` to update the UI. You change state; Vue updates the DOM. This is declarative rendering: you state "what to show", not "how to change it".

## ref() & .value
`ref(0)` wraps a value in an object with a `.value` property. The rule: in `<script>` use `.value`; in templates it auto-unwraps (never write `count.value` in a template). The most common beginner bug: forgetting `.value` in script — check .value first with any bug.

## Why Refs?
Plain variables cannot be tracked. `.value` gives Vue the chance to track in the getter and trigger in the setter: when a component renders, Vue tracks every ref used; when a ref mutates, the components tracking it re-render.

## Deep Reactivity & Mutation
Refs are deeply reactive by default: mutating nested objects/arrays is still detected. Mutating a ref directly in event handlers is fine (e.g. `count.value += 1`).

---

## Experiments

1. **Mental Model: Data -> UI**
2. **ref() & .value**
3. **Kenapa Harus ref?**
4. **Reaktivitas mendalam & Mutasi**

---

## Challenge

Build a "study timer": seconds ref, start/pause button with setInterval, a reset stopwatch. Predict: does `count.value++` inside setInterval update the UI? Explain why (yes — because refs track mutation).

---

## Summary

Reactivity: change data → UI updates. ref() + .value (script) / auto-unwrap (template). Refs exist for tracking. Deeply reactive. Next: template directives.
