# Stores & Lifecycle

> Svelte | Pelajaran 4

## Tujuan Pembelajaran

- Memahami Svelte stores: writable dan derived\n- Menggunakan $store syntax untuk mengakses store values\n- Menggunakan onMount untuk side effects setelah mount\n- Menggunakan onDestroy untuk cleanup

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

## Penjelasan

## Stores
writable(initial) — membuat store yang bisa di-update. derived(store, fn) — membuat derived store.
## $store Syntax
$count — mengakses value dari store secara reactive. Svelte secara otomatis subscribe dan unsubscribe.
## onMount
onMount(() => { ... }) — dijalankan setelah komponen di-mount. Cocok untuk API calls, intervals.
## onDestroy
onDestroy(() => { ... }) — dijalankan sebelum komponen di-destroy. Cocok untuk cleanup intervals, listeners.

---

## Eksperimen

1. **## Stores
writable(initial) — membuat store yang bisa di-update. derived(store, fn) — membuat derived store.
## $store Syntax
$count — mengakses value dari store secara reactive. Svelte secara otomatis subscribe dan unsubscribe.
## onMount
onMount(() => { ... }) — dijalankan setelah komponen di-mount. Cocok untuk API calls, intervals.
## onDestroy
onDestroy(() => { ... }) — dijalankan sebelum komponen di-destroy. Cocok untuk cleanup intervals, listeners.**

---

## Tantangan

Tingkatkan stores & lifecycle: (1) buat store untuk tema (light/dark) dan toggle di parent, (2) buat custom store untuk localStorage persistence, (3) tambah onMount untuk fetch data dari API, (4) buat komponen countdown timer dengan onMount dan onDestroy.

---

## Ringkasan

Stores = writable/derived. $store = reactive access. onMount = after mount. onDestroy = cleanup. Lanjut: routing.
