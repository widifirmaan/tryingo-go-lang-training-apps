# Lifecycle & Context — Siklus Hidup Warung Svelte (svelte.dev)

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 8:** Lifecycle & Context

## Tujuan Pembelajaran

- `onMount` buka toko (fetch), `onDestroy` tutup (clear), `setContext("warung", {...})` + `getContext` gudang tanpa props (sumber: svelte.dev)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `onMount`, `fetch` di `script` jalan saat server render (SSR) — error. Dengan `onMount`, fetch hanya di browser setelah mount. `setContext` untuk `warung` biar 10 komponen ambil tanpa `props` estafet.

---

## Program: Siklus & Gudang Svelte (svelte.dev)

```svelte
<script>
  import { onMount, onDestroy, setContext, getContext } from "svelte";
  import { writable } from "svelte/store";

  // Gudang tanpa props
  setContext("warung", { nama: "Bu Siti", buka: "07.00" });

  let produk = [];
  onMount(async () => {
    console.log("Buka toko");
    // fetch hanya di browser
    const res = await fetch("/api/produk");
    produk = await res.json();
    return () => console.log("Tutup toko");
  });

  onDestroy(() => console.log("Destroy"));

  // Ambil di komponen anak
  const warung = getContext("warung");
</script>

<p>Warung: {warung.nama} — Buka {warung.buka}</p>
<ul>{#each produk as p}<li>{p.nama}</li>{/each}</ul>
```

**Sumber:** `svelte.dev/docs/svelte/lifecycle` dan `context`.

---

## Konsep Kunci

### `onMount`/`onDestroy` = Buka/Tutup
`onMount` jalan setelah mount di browser, `onDestroy` sebelum hilang.

### `setContext`/`getContext` = Gudang Tanpa Props
`setContext("warung", {...})` di induk, `getContext("warung")` di anak 10 level tanpa `props`.

---

## Penjelasan untuk Pemula

### Analogi: Buka/Tutup Toko

- **`onMount` = buka pintu jam 7**: fetch produk.
- **`onDestroy` = tutup jam 20**: matikan timer.
- **`setContext` = papan pengumuman**: tulis "Warung Bu Siti" di papan, semua lihat.

### Langkah 0 — Device

Sama W1: `npm run dev` di `5173`.

### 3 Istilah Wajib

1. **onMount/onDestroy**: buka/tutup
2. **setContext/getContext**: papan/gudang

---

## Eksperimen

- **Hijau:** `onMount` `console.log("Buka")` → kapan log?
- **Kuning:** `setContext` tanpa `getContext` → tidak ada?
- **Merah:** `fetch` di luar `onMount` → error SSR?

---

## Tantangan

**Warung Siklus Lengkap:** `onMount` fetch `daftar`, `setContext("warung", {nama})`, anak `getContext` tampil, `onDestroy` `clearInterval`.

---

## Glosarium Mini

- **onMount/onDestroy/context**: siklus/gudang

---

## Ringkasan

Minggu 8 dari 12: **Siklus Hidup** — `onMount` + `context`. Selesai Menengah Svelte! Minggu depan: **Transitions & Animations**.
