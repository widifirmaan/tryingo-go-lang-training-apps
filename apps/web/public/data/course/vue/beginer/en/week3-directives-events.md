# Directives & Events

> **Kategori:** Vue | **Level:** Beginner | **Minggu 3:** Directives & Events

## Learning Objectives

- v-model: two-way binding for form inputs
- v-show vs v-if: when to use each
- v-for: list rendering with :key
- Event modifiers: .prevent, .stop, .once
- Key modifiers: .enter, .tab, .delete

---

## Program: Interactive Form

```vue
// Directives = special attributes dengan prefix v-
const { createApp, ref } = Vue;
const app = createApp({
  setup() {
    const text = ref('');
    const isVisible = ref(true);
    const items = ref(['Vue', 'React', 'Angular']);
    const newItem = ref('');
    function addItem() { if (newItem.value.trim()) { items.value.push(newItem.value); newItem.value = ''; } }
    function removeItem(index) { items.value.splice(index, 1); }
    return { text, isVisible, items, newItem, addItem, removeItem };
  },
});
app.mount('#app');
console.log('Directives & Events siap digunakan');
```

---

## Key Concepts

### v-model
Two-way binding, auto-sync.

### v-show vs v-if
v-show = CSS toggle, v-if = conditional render.

### v-for
List rendering with :key.

---

## Experiments

- Create form with multiple input types
- Implement keyboard shortcuts
- Create complex conditional rendering
- Add transitions on item appear/disappear

---

## Challenge

Build a shopping cart: add item, remove item, update quantity, total price.

---

## Summary

Week 3 of 12: **Directives & Events** (Level: Beginner). Next week: **Components & Props**.
