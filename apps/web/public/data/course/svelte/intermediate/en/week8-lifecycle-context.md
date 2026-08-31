# Lifecycle & Context — Siklus Hidup Warung Svelte

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 8:** Lifecycle & Context

## Tujuan Pembelajaran

- `onMount` buka toko, `onDestroy` tutup, `setContext/getContext` gudang

---

## Program

```svelte
<script>
  import { onMount, onDestroy, setContext, getContext } from "svelte";
  setContext("warung", { nama: "Bu Siti" });
  onMount(() => { console.log("Buka toko"); return () => console.log("Tutup"); });
  const warung = getContext("warung");
</script>

<p>Warung: {warung.nama}</p>
```

---

## Ringkasan

Minggu 8: **Siklus Hidup** — `onMount`/`onDestroy` + `context`.
