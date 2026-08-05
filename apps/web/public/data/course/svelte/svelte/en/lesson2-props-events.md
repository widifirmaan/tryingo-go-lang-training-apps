# Props & Events

> Svelte | Lesson 2

## Learning Objectives

- Understand props: pass data from parent to child with $props()\n- Understand events: pass data from child to parent with on:event\n- Use $state() for reactive state in Svelte 5\n- Use $derived() for derived values

---

## Program: Svelte

```svelte
<script>
  import Child from "./Child.svelte";
  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<h1>Svelte Props & Events</h1>
<p>Count: {count}</p>
<button on:click={handleClick}>Tambah</button>
<Child {count} on:increment={handleClick} />
```

---

## Explanation

## Props
$props() — receives props from parent. In parent: <Child {count} on:increment={handler} />.
## Events
on:click — handles click event. on:custom — custom event from child.
## Reactive State
$state() — declares reactive state. $derived() — computes derived values automatically.
## Svelte 5 vs Svelte 4
Svelte 5 uses runes ($state, $props, $derived, $effect). Svelte 4 uses let exports and reactive declarations ($:).

---

## Experiments

1. **## Props
$props() — receives props from parent. In parent: <Child {count} on:increment={handler} />.
## Events
on:click — handles click event. on:custom — custom event from child.
## Reactive State
$state() — declares reactive state. $derived() — computes derived values automatically.
## Svelte 5 vs Svelte 4
Svelte 5 uses runes ($state, $props, $derived, $effect). Svelte 4 uses let exports and reactive declarations ($:).**

---

## Challenge

Level up props & events: (1) create a Counter component that accepts initial props and emits increment event, (2) create a TodoList component with todos prop and toggle event, (3) add $derived to compute completed todo count, (4) create an input form that adds new todos.

---

## Summary

Props = $props(). Events = on:event. $state = reactive. $derived = computed. Next: bindings and reactive statements.
