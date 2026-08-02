# Computed & Watchers

> Vue | Vue Foundations | Lesson 6

## Learning Objectives

- Derive values with computed() (cached & pure)
- Run side effects with watch()
- Understand watch vs watchEffect
- Avoid traps: side-effecting computeds & watching values (not getters)

---

## Program: Computed & Watchers

```vue
<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const query = ref('')
const notes = ref([
  'Computed itu cache & pure',
  'Watch untuk side effects',
  'Jangan lupa .value di script',
])

const filtered = computed(() =>
  notes.value.filter((n) => n.toLowerCase().includes(query.value.toLowerCase()))
)

const stats = computed(() => ({
  total: notes.value.length,
  done: notes.value.filter((n) => n.startsWith('[x]')).length,
}))

// Side effect: simpan ke localStorage saat list berubah
watch(notes, (list) => {
  localStorage.setItem('notes', JSON.stringify(list))
}, { deep: true })

// watchEffect: otomatis melacak dependency yang dipakai
watchEffect(() => {
  console.log('Filter aktif:', query.value || '(kosong)', '| Hasil:', filtered.value.length)
})
</script>

<template>
  <h1>Catatan {{ stats.done }}/{{ stats.total }} selesai</h1>
  <input v-model="query" placeholder="Cari catatan..." />
  <ul>
    <li v-for="note in filtered" :key="note">{{ note }}</li>
  </ul>
  <p v-if="filtered.length === 0">Tidak ada hasil untuk "{{ query }}".</p>
</template>

<style scoped>
li { margin: 0.3rem 0; }
</style>

```

---

## Explanation

## computed: Pure Derivations
`computed` is a value derived from other state; it CACHES until a dependency changes. It must be PURE: no state mutation / fetch / console.log inside. Rule: if you need side effects → watch, not computed.

## watch: Side Effects
`watch(notes, cb)` runs the callback when a source changes (localStorage, fetch, log). `deep: true` observes nested mutations. For refs: pass the ref directly. For properties of reactive objects: you MUST use a getter — `watch(state.count, cb)` watches the value 0, not the state (never fires!).

## watchEffect: Auto-Track
`watchEffect(cb)` runs once immediately and automatically tracks every ref read inside it. Risk: infinite loops when you read AND write the same source in one callback — use watch with explicit sources when you need control.

## Trap: Side-Effecting Computed
`computed(() => { localStorage.setItem(...); return x })` is a bug: computed may re-run anytime, invisibly. Computed is transformation only; side effects live in watch/watchEffect.

---

## Experiments

1. **computed: Turunan Murni**
2. **watch: Side Effects**
3. **watchEffect: Auto-Track**
4. **Trap: computed Ber-side-effect**

---

## Challenge

Build a book search: books {title, year, read}. computed to filter + sort, watch to persist the last filter to localStorage (restore on load), watchEffect to log result counts. Add "clear all" — notice the stats computed updates too.

---

## Summary

computed = cached & pure derivations. watch = side effects (getter for object properties!). watchEffect = auto-track, beware loops. Next: components.
