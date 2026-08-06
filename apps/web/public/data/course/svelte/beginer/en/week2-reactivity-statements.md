# Reactivity & Statements

> **Kategori:** Svelte | **Level:** Beginner | **Minggu 2:** Reactivity & Statements

## Learning Objectives

- Reactive assignments: need reassignment
- $: for derived state
- Array reactivity: reassign
- each block for list rendering
- if block for conditional rendering

---

## Program: Todo App

```svelte
<!-- Svelte reactivity: assign to update, $: for derived -->
<script>
  let todos = [];
  let newTodo = "";
  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, { id: Date.now(), text: newTodo, done: false }];
      newTodo = "";
    }
  }
  $: remaining = todos.filter(t => !t.done).length;
</script>
<input bind:value={newTodo} placeholder="Tambah todo...">
<button on:click={addTodo}>Tambah</button>
<p>{remaining} tersisa</p>
{#each todos as todo}
  <div>
    <input type="checkbox" checked={todo.done}>
    <span>{todo.text}</span>
  </div>
{/each}
```

---

## Key Concepts

### Reactivity
Assign to update.

### $:
Derived state.

### each block
List rendering.

### if block
Conditional rendering.

---

## Experiments

- Create filter completed/active/all
- Add edit todo
- Implement clear completed
- Add localStorage persistence

---

## Challenge

Build a complete todo app: add, toggle, delete, filter, persist to localStorage.

---

## Summary

Week 2 of 10: **Reactivity & Statements** (Level: Beginner). Next week: **Props & Components**.
