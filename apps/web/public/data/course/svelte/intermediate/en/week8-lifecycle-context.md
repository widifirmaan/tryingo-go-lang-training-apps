# Lifecycle & Context

> **Kategori:** Svelte | **Level:** Intermediate | **Minggu 8:** Lifecycle & Context

## Learning Objectives

- onMount: runs after mount
- onDestroy: cleanup before destroy
- beforeUpdate and afterUpdate
- setContext and getContext
- tick() to flush state changes

---

## Program: Hooks & Context

```svelte
<!-- Lifecycle: onMount, onDestroy, beforeUpdate, afterUpdate -->
<!-- Context: setContext, getContext -->
<script>
  import { onMount, onDestroy, setContext, getContext } from 'svelte';
  onMount(() => { console.log('Mounted!'); return () => console.log('Cleanup'); });
  onDestroy(() => { console.log('Destroyed'); });
  setContext('theme', { dark: false, toggle: () => {} });
  const theme = getContext('theme');
</script>
```

---

## Key Concepts

### onMount
Runs after mount, returns cleanup.

### onDestroy
Runs before destroy.

### Context
setContext in parent, getContext in child.

### Tick
await tick() waits for DOM update.

---

## Experiments

- Create timer with onMount/onDestroy
- Implement context for theme
- Use tick after state update
- Create custom lifecycle hook

---

## Challenge

Build a theme provider with context: setContext theme, useContext in child components.

---

## Summary

Week 8 of 10: **Lifecycle & Context** (Level: Intermediate). Next week: **Transitions & Animations**.
