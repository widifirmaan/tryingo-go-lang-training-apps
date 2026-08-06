# Svelte Basics & Template

> **Kategori:** Svelte | **Level:** Beginner | **Minggu 1:** Svelte Basics & Template

## Learning Objectives

- Understand Svelte as compiler framework
- Template syntax: { } for expressions
- Reactive declarations: $: derived = expr
- Event handling: on:click={handler}
- Scoped CSS inside component

---

## Program: Hello Svelte

```svelte
<!-- Svelte = compiler framework (no virtual DOM) -->
<script>
  let name = "Tryngo";
  let count = 0;
  $: doubled = count * 2;
  $: greeting = "Halo, " + name + "!";
  function increment() { count++; }
</script>
<h1>{greeting}</h1>
<p>Count: {count} | Doubled: {doubled}</p>
<button on:click={increment}>+</button>
<!-- Svelte app siap dijalankan -->
```

---

## Key Concepts

### Svelte
Compiler framework, no virtual DOM.

### Template
{ } = expressions, auto-update.

### Reactive Declarations
$: re-runs on dependency change.

### Scoped CSS
Style scoped to component.

---

## Experiments

- Change state and observe UI update
- Add new reactive declaration
- Create conditional rendering
- Render list with each

---

## Challenge

Build a counter app with increment, decrement, reset. Show different messages based on value.

---

## Summary

Week 1 of 10: **Svelte Basics & Template** (Level: Beginner). Next week: **Reactivity & Statements**.
