# Animations & Transitions — Warung Halus Vue

> **Kategori:** Vue | **Level:** Lanjutan | **Minggu 11:** Animations & Transitions

## Tujuan Pembelajaran

- `<Transition name="pudar">` + CSS `.pudar-enter-active` + `<TransitionGroup>` daftar (sumber: vuejs.org/guide/built-ins/transition)

---

## Kenapa Ini Penting Buat Kamu?

Tambah/hapus produk langsung hilang → kasar, pelanggan kaget. Dengan `Transition`, masuk geser + keluar pudar 0.3 detik — terasa mahal.

---

## Program: Daftar Halus Warung

```vue
<script setup>
import { ref } from "vue";
const daftar = ref([{ id: 1, nama: "Beras" }]);
function tambah() { daftar.value.push({ id: Date.now(), nama: "Bayam" }); }
function hapus(id) { daftar.value = daftar.value.filter(p => p.id !== id); }
</script>

<template>
  <button @click="tambah">Tambah Bayam</button>
  <TransitionGroup name="geser" tag="ul">
    <li v-for="p in daftar" :key="p.id">
      {{ p.nama }} <button @click="hapus(p.id)">Hapus</button>
    </li>
  </TransitionGroup>
</template>

<style>
.geser-enter-active, .geser-leave-active { transition: all 0.3s; }
.geser-enter-from { opacity: 0; transform: translateX(30px); }
.geser-leave-to { opacity: 0; transform: translateX(-30px); }
</style>
```

---

## Konsep Kunci

### `<Transition>` / `<TransitionGroup>` = 1 / Banyak
`Transition` 1 elemen, `TransitionGroup` daftar (wajib `:key`!).

### `name="geser"` + 4 Kelas = Aturan Gerak
`geser-enter-from/active` masuk, `geser-leave-to/active` keluar.

---

## Penjelasan untuk Pemula

### Analogi: Pintu Geser Mal
- **Transition = pintu geser**: masuk/keluar halus, bukan tembok hilang.

### Langkah 0 — Siapkan Device
- Sama Vue W1.

### Cara Komputer Membaca
1. Tambah item → Vue sisipkan class `enter-from` → animasi → lepas.
2. Hapus → class `leave-to` → 0.3 detik → baru hapus DOM.

### 3 Istilah Wajib
1. **Transition/Group**: 1/banyak
2. **enter/leave**: masuk/keluar

---

## Eksperimen

- **Hijau:** `0.3s` → `1s` → lambat dramatis?
- **Kuning:** Hapus `:key` → animasi rusak + warning?
- **Merah:** Tanpa CSS kelas → langsung (tidak halus)? Tambah.

---

## Tantangan

**Warung Halus Lengkap:** Tambah/hapus + `TransitionGroup` + CSS 4 kelas + beda arah masuk/keluar.

---

## Glosarium Mini

- **Transition/enter/leave**: gerak/masuk/keluar

---

## Ringkasan

Minggu 11 dari 12: **Halus** (Level: Lanjutan). Terasa mahal. Minggu depan: **Capstone**.
