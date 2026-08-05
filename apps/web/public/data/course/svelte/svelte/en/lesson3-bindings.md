# Bindings & Reactive Statements

> Svelte | Lesson 3

## Learning Objectives

- Use bind:value for two-way data binding\n- Use reactive statements ($:) for computed values\n- Use {#each} for list iteration\n- Use {#if} for conditional rendering

---

## Program: Svelte

```svelte
<script>
  let name = "";
  let items = [];
  let newItem = "";

  $: hasItems = items.length > 0;
  $: itemCount = items.length;

  function addItem() {
    if (newItem.trim()) {
      items = [...items, { id: Date.now(), text: newItem, done: false }];
      newItem = "";
    }
  }

  function toggleItem(id) {
    items = items.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    );
  }
</script>

<h1>Svelte Bindings</h1>

<input bind:value={name} placeholder="Nama Anda" />
<p>Halo, {name || "Dunia"}!</p>

<input bind:value={newItem} placeholder="Item baru" />
<button on:click={addItem}>Tambah</button>

{#if hasItems}
  <p>Jumlah item: {itemCount}</p>
  {#each items as item (item.id)}
    <div>
      <input type="checkbox" checked={item.done} on:change={() => toggleItem(item.id)} />
      <span style:opacity={item.done ? 0.5 : 1}>{item.text}</span>
    </div>
  {/each}
{/if}
```

---

## Explanation

## bind:value
bind:value={name} — two-way binding between input and variable. Svelte automatically syncs changes.
## Reactive Statements
$: hasItems = items.length > 0 — executed automatically when items changes. $: itemCount = items.length.
## {#each}
{#each items as item (item.id)} — iterate list with key. item.id is the key for efficient DOM updates.
## {#if}
{#if hasItems} — conditional rendering. Svelte removes DOM element if condition is false.

---

## Experiments

1. **## bind:value
bind:value={name} — two-way binding between input and variable. Svelte automatically syncs changes.
## Reactive Statements
$: hasItems = items.length > 0 — executed automatically when items changes. $: itemCount = items.length.
## {#each}
{#each items as item (item.id)} — iterate list with key. item.id is the key for efficient DOM updates.
## {#if}
{#if hasItems} — conditional rendering. Svelte removes DOM element if condition is false.**

---

## Challenge

Level up bindings: (1) add bind:checked for select all checkbox, (2) add reactive statement that computes completed item count, (3) create items filter based on status (all/active/completed), (4) add quantity input bound to a variable.

---

## Summary

bind:value = two-way. $: = reactive. {#each} = loop. {#if} = conditional. Next: stores and lifecycle.
