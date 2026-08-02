# Testing (Vitest)

> Vue | Production-Grade | Lesson 22

## Learning Objectives

- Test components with Vitest + Vue Test Utils
- Write render, interaction, and emit tests
- Run tests with npm run test
- Understand test scope: unit & component

---

## Program: Testing (Vitest)

```vue
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  initial: { type: Number, default: 0 },
})

const emit = defineEmits(['changed'])

const count = ref(props.initial)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value += 1
  emit('changed', count.value)
}
</script>

<template>
  <div>
    <p class="count">{{ count }}</p>
    <p class="doubled">x2 = {{ doubled }}</p>
    <button class="inc" @click="increment">+1</button>
  </div>
</template>

```

---

## Explanation

## Why Testing?
Tests prove behavior, not just appearance: "the counter renders 5", "click emits changed". A growing app without tests breaks silently during refactors. Start with what matters: pure logic + interactive components.

## Test Structure
`mount(Counter, { props })` renders a real component; `wrapper.find('.count').text()` checks output; `trigger('click')` simulates interaction; `wrapper.emitted('changed')` checks emitted events. `await` matters: Vue state is async.

## Run in Terminal
`npm run test` runs all `*.test.js` files (vitest). In the playground the test file is ready — open the StackBlitz terminal and run it. CI/CD runs this on every push later.

## Scope: Do Not Over-Test
Not everything needs a test. Priorities: business logic (computeds, store actions, composables), form/interaction components, critical behavior. Avoid fragile giant snapshots and tests that merely repeat the implementation.

---

## Experiments

1. **Mengapa Testing?**
2. **Struktur Tes**
3. **Jalankan di Terminal**
4. **Scope: Jangan Over-Test**

---

## Challenge

Write tests for useCartStore: (1) add inserts a new item, (2) adding the same item increments qty, (3) remove deletes the item, (4) total computes correctly. File `src/stores/cart.test.js` + run it. This is the "test business logic" pattern.

---

## Summary

Vitest + Vue Test Utils: mount, find, trigger, emitted. npm run test. Priorities: business logic + interactions. Next: e-commerce project.
