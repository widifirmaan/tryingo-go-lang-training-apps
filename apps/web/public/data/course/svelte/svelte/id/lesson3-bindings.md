# Bindings & Reactive Statements

> Svelte | Pelajaran 3

## Tujuan Pembelajaran

- Menggunakan bind:value untuk two-way data binding\n- Menggunakan reactive statements ($:) untuk computed values\n- Menggunakan {#each} untuk iterasi list\n- Menggunakan {#if} untuk conditional rendering

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

## Penjelasan

## bind:value
bind:value={name} — two-way binding antara input dan variabel. Svelte secara otomatis sync perubahan.
## Reactive Statements
$: hasItems = items.length > 0 — dieksekusi otomatis saat items berubah. $: itemCount = items.length.
## {#each}
{#each items as item (item.id)} — iterasi list dengan key. item.id adalah key untuk efficient DOM updates.
## {#if}
{#if hasItems} — conditional rendering. Svelte menghapus DOM elemen jika kondisi false.

---

## Eksperimen

1. **## bind:value
bind:value={name} — two-way binding antara input dan variabel. Svelte secara otomatis sync perubahan.
## Reactive Statements
$: hasItems = items.length > 0 — dieksekusi otomatis saat items berubah. $: itemCount = items.length.
## {#each}
{#each items as item (item.id)} — iterasi list dengan key. item.id adalah key untuk efficient DOM updates.
## {#if}
{#if hasItems} — conditional rendering. Svelte menghapus DOM elemen jika kondisi false.**

---

## Tantangan

Tingkatkan bindings: (1) tambah bind:checked untuk checkbox select all, (2) tambah reactive statement yang menghitung jumlah item yang selesai, (3) buat filter items berdasarkan status (all/active/completed), (4) tambah input jumlah dan bind it ke variabel.

---

## Ringkasan

bind:value = two-way. $: = reactive. {#each} = loop. {#if} = conditional. Lanjut: stores dan lifecycle.
