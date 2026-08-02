# Performance

> Vue | Production-Grade | Lesson 21

## Learning Objectives

- Code-split with defineAsyncComponent
- Use shallowRef for large data
- Know when optimization is NEEDED (not premature)
- Use nextTick for precise timing

---

## Program: Performance

```vue
<script setup>
import { ref, shallowRef, defineAsyncComponent, nextTick } from 'vue'

// 1) Lazy: komponen berat diunduh saat pertama dirender
const HeavyWidget = defineAsyncComponent(() =>
  import('./components/HeavyWidget.vue')
)

// 2) shallowRef: data besar yang diganti utuh, tanpa deep tracking
const rows = shallowRef(
  Array.from({ length: 2000 }, (_, i) => ({ id: i, label: 'Baris ' + i }))
)

const loaded = ref(false)

async function loadHeavy() {
  loaded.value = true
  // 3) nextTick: baca DOM sesudah Vue selesai update
  await nextTick()
  console.log('HeavyWidget dirender, DOM sudah siap')
}
</script>

<template>
  <h1>Perfomasi</h1>
  <button @click="loadHeavy">Muat Widget Berat</button>
  <HeavyWidget v-if="loaded" />

  <h2>shallowRef: 2000 baris</h2>
  <p>Total: {{ rows.length }} (deep tracking dimatikan)</p>
  <ul>
    <li v-for="r in rows" :key="r.id">{{ r.label }}</li>
  </ul>
</template>

```

---

## Explanation

## When Is Optimization Needed?
Measure first (Vue DevTools: timeline, render counts). Vue is already efficient: fine-grained reactivity re-renders only the components whose used data changed — manual optimization is rarely needed. Optimize when a problem exists: big bundle, slow renders, huge data.

## Lazy & Code Splitting
`defineAsyncComponent(() => import(...))` splits chunks per component — a heavy widget stays out of the initial bundle. Routes (lesson 16) use the same pattern. Measure with devtools — if the first page is big, split it.

## shallowRef for Large Data
`shallowRef` tracks only `.value` (the reference), not the contents — a 2000-row array that is REPLACED wholesale needs no deep tracking. Use when: large data rarely mutated, or managed by external libraries. Not for per-item mutations (they would go undetected).

## nextTick
The DOM updates asynchronously (buffered). `await nextTick()` waits until Vue finishes updating the DOM — used when you must read/measure the DOM right after a state change (scroll restore, height measurement).

---

## Experiments

1. **Kapan Perlu Optimasi?**
2. **Lazy & Code Splitting**
3. **shallowRef untuk Data Besar**
4. **nextTick**

---

## Challenge

Build a 5000-item list with v-memo (surgical re-render skipping): `v-memo="[item.id === selected]"` on each row. Add a "select random" button and measure the difference in DevTools (render timeline). Explain when v-memo is worth it.

---

## Summary

Measure first, optimize when there is a problem. defineAsyncComponent + lazy routes. shallowRef for large data. nextTick for timing. Next: testing.
