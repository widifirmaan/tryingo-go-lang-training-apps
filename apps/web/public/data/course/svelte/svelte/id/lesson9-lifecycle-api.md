# Lifecycle Hooks & External APIs

> Svelte | Pelajaran 9

## Tujuan Pembelajaran

- Memahami lifecycle hooks: onMount, onDestroy, beforeUpdate, afterUpdate\n- Menggunakan fetch API untuk mengambil data dari external API\n- Mengimplementasi error handling untuk API calls\n- Menggunakan reactive statements untuk filtering data

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

## Penjelasan

## Lifecycle Hooks
onMount — dijalankan setelah component di-mount (DOM ready). Cocok untuk fetch data, setup intervals.
onDestroy — dijalankan sebelum component di-destroy. Cocok untuk cleanup intervals, listeners.
beforeUpdate — dijalankan sebelum DOM di-update. afterUpdate — dijalankan setelah DOM di-update.
## Fetch API
fetch(url) — mengambil data dari API. Gunakan try/catch untuk error handling. Gunakan loading state untuk UX.
## Reactive Filtering
$: filteredData = filter === "all" ? data : data.filter(...) — otomatis recalculate saat data atau filter berubah.

---

## Eksperimen

1. **## Lifecycle Hooks
onMount — dijalankan setelah component di-mount (DOM ready). Cocok untuk fetch data, setup intervals.
onDestroy — dijalankan sebelum component di-destroy. Cocok untuk cleanup intervals, listeners.
beforeUpdate — dijalankan sebelum DOM di-update. afterUpdate — dijalankan setelah DOM di-update.
## Fetch API
fetch(url) — mengambil data dari API. Gunakan try/catch untuk error handling. Gunakan loading state untuk UX.
## Reactive Filtering
$: filteredData = filter === "all" ? data : data.filter(...) — otomatis recalculate saat data atau filter berubah.**

---

## Tantangan

Tingkatkan lifecycle & APIs: (1) tambah pagination untuk data yang lebih banyak, (2) tambah search dengan debounce, (3) buat caching layer untuk menghindari fetch berulang, (4) tambah optimistic update untuk delete operation.

---

## Ringkasan

onMount = after mount. onDestroy = cleanup. fetch = API. $: = reactive. Lanjut: final project.
