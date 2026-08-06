# Reactivity & Statements

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 2:** Reactivity & Statements

## Tujuan Pembelajaran

- Reactive assignments: perlu reassignment
- $: untuk derived state
- Array reactivity: reassign array
- each block untuk list rendering
- if block untuk conditional rendering

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

## Konsep Kunci

### Reactivity
Assign to update: count = count + 1. Array: todos = [...todos, new].

### $:
Derived state. Re-run saat dependency berubah.

### each block
{#each items as item}...{/each}.

### if block
{#if condition}...{:else}...{/if}.

---

## Eksperimen

- Buat filter completed/active/all
- Tambah edit todo
- Implementasikan clear completed
- Tambah localStorage persistence

---

## Tantangan

Buat todo app lengkap: add, toggle, delete, filter, persist ke localStorage.

---

## Ringkasan

Minggu 2 dari 10: **Reactivity & Statements** (Level: Pemula). Minggu depan: **Props & Components**.
