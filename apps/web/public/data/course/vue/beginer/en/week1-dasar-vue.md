# Vue Basics & Template Syntax

> **Kategori:** Vue | **Level:** Beginner | **Minggu 1:** Vue Basics & Template Syntax

## Learning Objectives

- Understand Vue as a progressive framework
- Template syntax: {{ }} for text interpolation
- Directives: v-bind, v-on, v-if, v-for, v-model
- Reactivity: data() returns reactive object
- Methods and Computed properties

---

## Program: Hello Vue

```vue
// Vue = progressive framework untuk membangun UI
const { createApp } = Vue;
const app = createApp({
  data() { return { message: 'Halo, Vue!', name: 'Tryngo', isDark: false, count: 0 }; },
  methods: { toggle() { this.isDark = !this.isDark; }, increment() { this.count++; } },
  computed: { greeting() { return this.message + ' Selamat datang, ' + this.name; } },
});
app.mount('#app');
console.log('Vue app siap dijalankan');
```

---

## Key Concepts

### Template Syntax
{{ }} = text interpolation, auto-updates.

### Directives
v-bind, v-on, v-if, v-for, v-model.

### Reactivity
Data from data() becomes reactive.

### Computed vs Method
Cached, only re-evaluates on dependency change.

---

## Experiments

- Change data and observe UI update
- Add new computed property
- Create conditional rendering
- Render list with v-for

---

## Challenge

Build a counter app with: increment, decrement, reset. Show different messages based on value.

---

## Summary

Week 1 of 12: **Vue Basics & Template Syntax** (Level: Beginner). Next week: **Reactivity & Composition API**.
