# Composables

> Vue | Architecture & State | Lesson 13

## Learning Objectives

- Extract stateful logic into composables (use prefix)
- Understand instance state vs shared state
- Write your own composables: useCounter, useLocalStorage
- Mirror patterns from VueUse (200+ utilities)

---

## Program: Composables

```vue
<script setup>
import { useCounter } from './composables/useCounter'
import { useLocalStorage } from './composables/useLocalStorage'

// Setiap pemanggilan composable = state instance TERPISAH
const a = useCounter(0)
const b = useCounter(100)

const savedNotes = useLocalStorage('notes', ['Belajar composables'])
</script>

<template>
  <h1>Dua Counter Independen</h1>
  <p>Counter A: {{ a.count.value }} <button @click="a.increment()">+1</button></p>
  <p>Counter B: {{ b.count.value }} <button @click="b.increment()">+1</button></p>

  <h2>useLocalStorage (persist)</h2>
  <ul>
    <li v-for="(n, i) in savedNotes.value" :key="i">{{ n }}</li>
  </ul>
</template>

```

---

## Explanation

## What Is a Composable?
An ordinary function that uses Vue reactivity (ref, computed, watch) and returns state + methods. This is the MAIN payoff of the Composition API: logic reuse without mixins (which cause naming collisions and hidden dependencies).

## Instance vs Shared State
Refs INSIDE the composable function = per-instance state (each call gets its own instance — see counter A vs B). Refs OUTSIDE the function = shared global state. Placing a ref in the wrong place is the classic "accidental state sharing" bug.

## Conventions
The `use` prefix is required (signals reactivity usage). Return an object of refs + functions. Cleanup: return a function that tears down intervals/listeners (called in onUnmounted).

## When NOT to Extract
Do not extract 3 lines used by a single component. Extract when: used by 2+ components, or complex logic cluttering a component (>20 related lines). Read the VueUse source to internalize the patterns.

---

## Experiments

1. **Apa Itu Composable?**
2. **State Instance vs Bersama**
3. **Konvensi Penulisan**
4. **Kapan TIDAK Mengekstrak**

---

## Challenge

Write useClock (a running seconds interval with onUnmounted cleanup) and useDebounce (a delayed value). Use both in App: a live clock + a search input that only processes 300ms after typing stops.

---

## Summary

Composable = reusable stateful logic (use-). Refs inside = per instance; outside = shared. Cleanup in onUnmounted. Do not over-extract. Next: data fetching.
