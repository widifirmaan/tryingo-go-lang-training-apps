# State Management & Stores

> Svelte | Pelajaran 8

## Tujuan Pembelajaran

- Memahami custom stores untuk state management lintas komponen\n- Memahami derived stores untuk computed state\n- Membuat store actions untuk encapsulate logic\n- Menggunakan stores untuk state global tanpa prop drilling

---

## Program: Svelte

```svelte
<script>
  import { countStore, doubleStore } from "./stores/counter";
  import { goto } from "$app/navigation";
</script>

<h1>Svelte State Management</h1>

<p>Count: {$countStore}</p>
<p>Double: {$doubleStore}</p>

<button on:click={() => countStore.update(n => n + 1)}>+</button>
<button on:click={() => countStore.update(n => n - 1)}>-</button>
<button on:click={() => countStore.set(0)}>Reset</button>

<button on:click={() => goto("/about")}>Ke About</button>
```

---

## Penjelasan

## Custom Stores
Custom store = object dengan subscribe, set, update methods. Bisa menambahkan custom logic di dalamnya.
## Derived Stores
derived(store, fn) — menghitung value baru dari store lain secara reactive. Otomatis update saat source store berubah.
## Store Actions
Fungsi yang mengubah store value. Bisa di-export dari file store dan di-import di komponen manapun.
## Global State
Stores memungkinkan state dibagikan ke semua komponen tanpa prop drilling. Cukup import store dan gunakan $store syntax.

---

## Eksperimen

1. **## Custom Stores
Custom store = object dengan subscribe, set, update methods. Bisa menambahkan custom logic di dalamnya.
## Derived Stores
derived(store, fn) — menghitung value baru dari store lain secara reactive. Otomatis update saat source store berubah.
## Store Actions
Fungsi yang mengubah store value. Bisa di-export dari file store dan di-import di komponen manapun.
## Global State
Stores memungkinkan state dibagikan ke semua komponen tanpa prop drilling. Cukup import store dan gunakan $store syntax.**

---

## Tantangan

Tingkatkan state management: (1) buat store untuk auth (user, login, logout), (2) buat store untuk theme (light/dark mode), (3) buat store untuk cart (add, remove, total), (4) buat store untuk notifications (add, remove, auto-dismiss).

---

## Ringkasan

Custom store = state global. Derived = computed. Actions = logic. Lanjut: final project.
