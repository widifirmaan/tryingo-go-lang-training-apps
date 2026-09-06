# Transitions & Animations — Warung Halus Svelte (svelte.dev)

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 9:** Transitions & Animations

## Tujuan Pembelajaran

- `fade` pudar, `slide` geser, `flip` pindah — `in:slide` masuk, `out:fade` keluar, `animate:flip` geser posisi (sumber: svelte.dev/docs/svelte/svelte-transition)

---

## Kenapa Ini Penting Buat Kamu?

Daftar produk tambah/hapus langsung hilang → kasar. Dengan `slide` + `fade` + `flip`, tambah geser halus, hapus pudar — warung terasa mahal.

---

## Program: Daftar Halus Svelte (svelte.dev)

```svelte
<script>
  import { slide, fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  let daftar = [{ id: 1, nama: "Beras" }];
  function tambah(){ daftar = [...daftar, { id: Date.now(), nama: "Bayam" }]; }
  function hapus(id){ daftar = daftar.filter(p => p.id !== id); }
</script>

<button on:click={tambah}>Tambah Bayam</button>
<ul>
  {#each daftar as item (item.id)}
    <li in:slide out:fade animate:flip>
      {item.nama} <button on:click={() => hapus(item.id)}>Hapus</button>
    </li>
  {/each}
</ul>
```

**Sumber:** `svelte.dev/docs/svelte/svelte-transition` — `fade(node, {delay, duration})`, `slide(node, {axis})`.

---

## Konsep Kunci

### `in:`/`out:`/`animate:`
- `in:slide` saat masuk geser, `out:fade` saat keluar pudar, `animate:flip` saat pindah posisi.

### `slide` vs `fade`
`slide` geser `axis: "y"` default, `fade` opacity.

---

## Penjelasan untuk Pemula

### Analogi: Warung Halus

- **`slide` = laci geser**: masuk geser, keluar geser.
- **`fade` = lampu pudar**: masuk terang, keluar pudar.
- **`flip` = geser posisi**: daftar geser halus saat tambah/hapus.

### Langkah 0 — Device

`npm create svelte@latest` + `npm run dev` di `5173` (sudah W1).

### Cara Komputer Membaca

1. `in:slide` → Svelte animasi `translate` saat `li` masuk.
2. `out:fade` → animasi `opacity` saat `li` keluar.

### 3 Istilah Wajib

1. **in:/out:/animate:**: masuk/keluar/pindah
2. **slide/fade/flip**: geser/pudar/geser posisi

---

## Eksperimen

- **Hijau:** Ganti `in:slide` jadi `in:fade` → masuk pudar?
- **Kuning:** Hapus `animate:flip` → daftar pindah kasar?
- **Merah:** `out:slide` tanpa `in:slide` → keluar geser, masuk langsung?

---

## Tantangan

**Warung Halus Lengkap:** `{#each daftar as item (item.id)}` + `in:slide` + `out:fade` + `animate:flip`, `daftar` tambah/hapus, `npm run dev` screenshot halus.

---

## Glosarium Mini

- **slide/fade/flip**: geser/pudar/pindah

---

## Ringkasan

Minggu 9 dari 12: **Halus** — `slide`/`fade`/`flip`. Minggu depan: **Performance**.
