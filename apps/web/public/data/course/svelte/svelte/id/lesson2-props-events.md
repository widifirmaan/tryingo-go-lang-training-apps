# Props & Events

> Svelte | Pelajaran 2

## Tujuan Pembelajaran

- Memahami props: mengirim data dari parent ke child dengan $props()\n- Memahami events: mengirim data dari child ke parent dengan on:event\n- Menggunakan $state() untuk reactive state di Svelte 5\n- Menggunakan $derived() untuk derived values

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

## Penjelasan

## Props
$props() — menerima props dari parent. Di parent: <Child {count} on:increment={handler} />.
## Events
on:click — menangani click event. on:custom — custom event dari child.
## Reactive State
$state() — mendeklarasikan reactive state. $derived() — menghitung derived value secara otomatis.
## Svelte 5 vs Svelte 4
Svelte 5 menggunakan runes ($state, $props, $derived, $effect). Svelte 4 menggunakan let export dan reactive declarations ($:).

---

## Eksperimen

1. **## Props
$props() — menerima props dari parent. Di parent: <Child {count} on:increment={handler} />.
## Events
on:click — menangani click event. on:custom — custom event dari child.
## Reactive State
$state() — mendeklarasikan reactive state. $derived() — menghitung derived value secara otomatis.
## Svelte 5 vs Svelte 4
Svelte 5 menggunakan runes ($state, $props, $derived, $effect). Svelte 4 menggunakan let export dan reactive declarations ($:).**

---

## Tantangan

Tingkatkan props & events: (1) buat komponen Counter yang menerima props awal dan mengirim event increment, (2) buat komponen TodoList dengan props todos dan event toggle, (3) tambah $derived untuk menghitung jumlah todo yang selesai, (4) buat form input yang menambah todo baru.

---

## Ringkasan

Props = $props(). Events = on:event. $state = reactive. $derived = computed. Lanjut: bindings dan reactive statements.
