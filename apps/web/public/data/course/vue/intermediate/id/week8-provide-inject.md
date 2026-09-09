# Provide/Inject & Teleport — Papan & Portal Warung Vue

> **Kategori:** Vue | **Level:** Menengah | **Minggu 8:** Provide/Inject & Teleport
> **Prasyarat:** Minggu 7 — **Lifecycle & Watchers**.

## Tujuan Pembelajaran

- `provide("warung", data)` papan di induk + `inject("warung")` baca di anak 10 level (tanpa props!) (sumber: vuejs.org/guide/components/provide-inject)
- `<Teleport to="body">` portal popup ke `body` (keluar CSS sempit induk)

---

## Kenapa Ini Penting Buat Kamu?

Nama warung dipakai 10 komponen dalam → props estafet 10 level (lupa 1 = putus). Dengan `provide/inject`, tulis 1x di puncak, baca di mana saja. Modal di dalam `overflow: hidden` terpotong → `Teleport` pindah ke `body`.

---

## Program: Papan & Portal Warung

```vue
<!-- App.vue — pasang papan -->
<script setup>
import { ref, provide } from "vue";
const warung = ref({ nama: "Bu Siti", promo: "Gratis ongkir" });
provide("warung", warung);
</script>
<template><router-view /></template>
```

```vue
<!-- Dalam/Dalam/Kartu.vue — 3 level, tanpa props! -->
<script setup>
import { inject } from "vue";
const warung = inject("warung");
</script>
<template><p>{{ warung.nama }} — {{ warung.promo }}</p></template>
```

```vue
<!-- Modal.vue — portal keluar -->
<template>
  <button @click="buka = true">Promo</button>
  <Teleport to="body">
    <div v-if="buka" class="popup">Diskon 10%! <button @click="buka = false">Tutup</button></div>
  </Teleport>
</template>
```

---

## Konsep Kunci

### `provide` / `inject` = Papan / Baca
`provide("warung", data)` di induk, `inject("warung")` di anak mana saja di bawahnya.

### `<Teleport to="body">` = Portal
Pindahkan render ke `body` (keluar dari CSS induk yang menjepit).

---

## Penjelasan untuk Pemula

### Analogi: Papan Pengumuman & Pintu Ajaib
- **provide/inject = papan**: tulis 1x di lobi, baca di lantai 10.
- **Teleport = pintu Doraemon**: modal muncul di `body` meski kode di dalam kartu.

### Langkah 0 — Siapkan Device
- Sama Vue W1.

### Cara Komputer Membaca
1. `provide` simpan di konteks komponen.
2. `inject` cari ke atas sampai ketemu (tidak ketemu → `undefined`! beri default `inject("x", "def")`).

### 3 Istilah Wajib
1. **provide/inject**: papan/baca
2. **Teleport/to**: portal/tujuan

---

## Eksperimen

- **Hijau:** `inject` di 3 level tanpa props → bisa?
- **Kuning:** `inject("salah")` → `undefined`? Tambah default.
- **Merah:** Modal tanpa `Teleport` di dalam `overflow: hidden` → terpotong? Bungkus Teleport.

---

## Tantangan

**Warung Papan Lengkap:** `provide` warung + tema + 3 level `inject` + modal `Teleport` + ganti tema dari anak (provide fungsi!).

---

## Glosarium Mini

- **provide/inject/Teleport**: papan/baca/portal

---

## Ringkasan

Minggu 8 dari 12: **Papan & Portal** (Level: Menengah). Tanpa estafet. **Selesai Menengah Vue!** Lanjut: **Testing** (Lanjutan).
