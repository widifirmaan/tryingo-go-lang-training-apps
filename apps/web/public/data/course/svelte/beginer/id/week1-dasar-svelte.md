# Dasar Svelte & Template

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 1:** Dasar Svelte & Template

## Tujuan Pembelajaran

- Memahami Svelte sebagai compiler framework
- Template syntax: { } untuk expressions
- Reactive declarations: $: derived = expr
- Event handling: on:click={handler}
- Scoped CSS di dalam komponen

---

## Program: Halo Svelte

```svelte
<!-- Svelte = compiler framework (no virtual DOM) -->
<script>
  let name = "Tryngo";
  let count = 0;
  $: doubled = count * 2;
  $: greeting = "Halo, " + name + "!";
  function increment() { count++; }
</script>
<h1>{greeting}</h1>
<p>Count: {count} | Doubled: {doubled}</p>
<button on:click={increment}>+</button>
<!-- Svelte app siap dijalankan -->
```

---

## Konsep Kunci

### Svelte
Compiler framework. No virtual DOM.

### Template
{ } = expression. Auto-update saat state berubah.

### Reactive Declarations
$: = re-run saat dependency berubah.

### Scoped CSS
CSS di <style> hanya berlaku untuk komponen ini.

---

## Eksperimen

- Ubah state dan lihat UI update
- Tambah reactive declaration baru
- Buat conditional rendering
- Render list dengan each

---

## Tantangan

Buat counter app dengan increment, decrement, reset. Tampilkan pesan berbeda berdasarkan nilai.

---

## Ringkasan

Minggu 1 dari 10: **Dasar Svelte & Template** (Level: Pemula). Minggu depan: **Reactivity & Statements**.
