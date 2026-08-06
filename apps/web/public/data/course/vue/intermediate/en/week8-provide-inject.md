# Provide/Inject & Teleport

> **Kategori:** Vue | **Level:** Intermediate | **Minggu 8:** Provide/Inject & Teleport

## Learning Objectives

- provide: share data to all descendants
- inject: receive data from ancestor
- When to use provide/inject vs props
- Teleport: render to different DOM tree
- Slots: default, named, scoped slots

---

## Program: Theme & Modal

```vue
// Provide/Inject = share state tanpa prop drilling
const { createApp, ref, provide, inject } = Vue;
const App = {
  setup() {
    const theme = ref('light');
    const user = ref({ name: 'Budi', role: 'admin' });
    provide('theme', theme);
    provide('user', user);
    provide('toggleTheme', () => { theme.value = theme.value === 'light' ? 'dark' : 'light'; });
    return { theme };
  },
};
const ChildComponent = {
  setup() {
    const theme = inject('theme');
    const user = inject('user');
    const toggleTheme = inject('toggleTheme');
    return { theme, user, toggleTheme };
  },
};
console.log('Provide/Inject & Teleport siap digunakan');
```

---

## Key Concepts

### Provide/Inject
Parent provides, child injects.

### When to Use
Props for direct, provide/inject for deep.

### Teleport
Render to different DOM location.

---

## Experiments

- Create theme switcher with provide/inject
- Implement modal with Teleport
- Create card component with named slots
- Create scoped slot for data table

---

## Challenge

Build a UI library: Modal (Teleport), Card (named slots), ThemeProvider (provide/inject).

---

## Summary

Week 8 of 12: **Provide/Inject & Teleport** (Level: Intermediate). Intermediate phase complete! Next week: **Testing Vue**.
