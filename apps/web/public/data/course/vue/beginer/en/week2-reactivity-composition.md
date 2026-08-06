# Reactivity & Composition API

> **Kategori:** Vue | **Level:** Beginner | **Minggu 2:** Reactivity & Composition API

## Learning Objectives

- ref() for reactive primitive values
- reactive() for reactive objects
- computed() for derived values
- watch() for side effects on value change
- .value for ref in JavaScript

---

## Program: Todo App

```vue
// Composition API = cara modern menulis komponen Vue 3
const { createApp, ref, reactive, computed, watch } = Vue;
const app = createApp({
  setup() {
    const count = ref(0);
    const message = ref('Halo Vue!');
    const user = reactive({ name: 'Budi', age: 25 });
    const doubled = computed(() => count.value * 2);
    const greeting = computed(() => message.value + ' ' + user.name);
    watch(count, (newVal, oldVal) => { console.log('Count berubah dari ' + oldVal + ' ke ' + newVal); });
    function increment() { count.value++; }
    function updateName(name) { user.name = name; }
    return { count, message, user, doubled, greeting, increment, updateName };
  },
});
app.mount('#app');
console.log('Composition API siap digunakan');
```

---

## Key Concepts

### ref vs reactive
ref = primitives, needs .value in JS.
reactive = objects, direct access.

### computed
Cached derived values.

### watch
Side effects on value change.

---

## Experiments

- Create ref for string and change its value
- Watch multiple sources with array
- Create computed with getter and setter
- Compare ref and reactive for objects

---

## Challenge

Build a form with reactive validation: name (min 3 chars), email (must have @), password (min 6 chars).

---

## Summary

Week 2 of 12: **Reactivity & Composition API** (Level: Beginner). Next week: **Directives & Events**.
