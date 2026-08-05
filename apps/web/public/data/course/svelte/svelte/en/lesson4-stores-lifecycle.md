# Stores & Lifecycle

> Svelte | Lesson 4

## Learning Objectives

- Understand Svelte stores: writable and derived\n- Use $store syntax to access store values\n- Use onMount for side effects after mounting\n- Use onDestroy for cleanup

---

## Program: Svelte

```svelte
<script>
  import { writable, derived } from "svelte/store";
  import Child from "./Child.svelte";

  const count = writable(0);
  const doubled = derived(count, $count => $count * 2);

  function increment() {
    count.update(n => n + 1);
  }

  function decrement() {
    count.update(n => n - 1);
  }
</script>

<h1>Svelte Stores & Lifecycle</h1>

<p>Count: {$count}</p>
<p>Doubled: {$doubled}</p>
<button on:click={decrement}>-</button>
<button on:click={increment}>+</button>

<Child />
```

---

## Explanation

## Stores
writable(initial) — creates an updatable store. derived(store, fn) — creates a derived store.
## $store Syntax
$count — accesses store value reactively. Svelte automatically subscribes and unsubscribes.
## onMount
onMount(() => { ... }) — runs after component is mounted. Great for API calls, intervals.
## onDestroy
onDestroy(() => { ... }) — runs before component is destroyed. Great for cleanup of intervals, listeners.

---

## Experiments

1. **## Stores
writable(initial) — creates an updatable store. derived(store, fn) — creates a derived store.
## $store Syntax
$count — accesses store value reactively. Svelte automatically subscribes and unsubscribes.
## onMount
onMount(() => { ... }) — runs after component is mounted. Great for API calls, intervals.
## onDestroy
onDestroy(() => { ... }) — runs before component is destroyed. Great for cleanup of intervals, listeners.**

---

## Challenge

Level up stores & lifecycle: (1) create a theme store (light/dark mode) and toggle in parent, (2) create a custom store for localStorage persistence, (3) add onMount for API data fetch, (4) create a countdown timer component with onMount and onDestroy.

---

## Summary

Stores = writable/derived. $store = reactive access. onMount = after mount. onDestroy = cleanup. Next: routing.
