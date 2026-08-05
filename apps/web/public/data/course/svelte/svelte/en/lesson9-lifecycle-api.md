# Lifecycle Hooks & External APIs

> Svelte | Lesson 9

## Learning Objectives

- Understand lifecycle hooks: onMount, onDestroy, beforeUpdate, afterUpdate\n- Use fetch API to get data from external API\n- Implement error handling for API calls\n- Use reactive statements for data filtering

---

## Program: Svelte

```svelte
<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from "svelte";
  import { goto } from "$app/navigation";

  let data = [];
  let loading = true;
  let error = null;
  let filter = "all";

  onMount(async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      data = await res.json();
    } catch (e) {
      error = "Gagal memuat data";
    } finally {
      loading = false;
    }
  });

  $: filteredData = filter === "all" ? data : data.filter(item => item.userId === parseInt(filter));

  function deleteItem(id) {
    data = data.filter(item => item.id !== id);
  }
</script>

<h1>Lifecycle & APIs</h1>

<label>Filter by User:</label>
<select bind:value={filter}>
  <option value="all">Semua</option>
  <option value="1">User 1</option>
  <option value="2">User 2</option>
  <option value="3">User 3</option>
</select>

{#if loading}
  <p>Loading...</p>
{:else if error}
  <p class="error">{error}</p>
{:else}
  <ul>
    {#each filteredData.slice(0, 10) as item (item.id)}
      <li>
        <strong>{item.title}</strong>
        <button on:click={() => deleteItem(item.id)}>Hapus</button>
      </li>
    {/each}
  </ul>
{/if}
```

---

## Explanation

## Lifecycle Hooks
onMount — runs after component is mounted (DOM ready). Great for fetch data, setup intervals.
onDestroy — runs before component is destroyed. Great for cleanup intervals, listeners.
beforeUpdate — runs before DOM updates. afterUpdate — runs after DOM updates.
## Fetch API
fetch(url) — fetches data from API. Use try/catch for error handling. Use loading state for UX.
## Reactive Filtering
$: filteredData = filter === "all" ? data : data.filter(...) — automatically recalculates when data or filter changes.

---

## Experiments

1. **## Lifecycle Hooks
onMount — runs after component is mounted (DOM ready). Great for fetch data, setup intervals.
onDestroy — runs before component is destroyed. Great for cleanup intervals, listeners.
beforeUpdate — runs before DOM updates. afterUpdate — runs after DOM updates.
## Fetch API
fetch(url) — fetches data from API. Use try/catch for error handling. Use loading state for UX.
## Reactive Filtering
$: filteredData = filter === "all" ? data : data.filter(...) — automatically recalculates when data or filter changes.**

---

## Challenge

Level up lifecycle & APIs: (1) add pagination for more data, (2) add search with debounce, (3) create caching layer to avoid repeated fetches, (4) add optimistic update for delete operation.

---

## Summary

onMount = after mount. onDestroy = cleanup. fetch = API. $: = reactive. Next: final project.
