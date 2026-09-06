# Pinia — Gudang Bersama Warung Vue

> **Kategori:** Vue | **Level:** Menengah | **Minggu 6:** Pinia State Management

## Tujuan Pembelajaran

- `defineStore("keranjang", ...)` gudang + `store.tambah()` ubah + `$store` baca di template (sumber: pinia.vuejs.org)
- `app.use(createPinia())` pasang sekali di `main.js`

---

## Kenapa Ini Penting Buat Kamu?

Keranjang dipakai header + daftar + checkout — props estafet 5 level melelahkan + lupa 1 = beda data. Pinia = 1 gudang sentral (pengganti Vuex, lebih simpel, resmi Vue).

---

## Program: Gudang Keranjang Pinia

```bash
npm install pinia
```

```javascript
// stores/keranjang.js — gudang (bukan komponen!)
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useKeranjang = defineStore("keranjang", () => {
  const items = ref([]);
  const total = computed(() => items.value.reduce((s, i) => s + i.harga * i.qty, 0));
  function tambah(item) { items.value.push(item); }
  function hapus(id) { items.value = items.value.filter(i => i.id !== id); }
  return { items, total, tambah, hapus };
});
```

```javascript
// main.js — pasang sekali
import { createPinia } from "pinia";
app.use(createPinia());
```

```vue
<!-- Header.vue + Daftar.vue — 2 pemakai 1 gudang -->
<script setup>
import { useKeranjang } from "../stores/keranjang";
const keranjang = useKeranjang();
</script>
<template>
  <p>Isi: {{ keranjang.items.length }} | Total: Rp {{ keranjang.total }}</p>
  <button @click="keranjang.tambah({ id: 1, nama: 'Beras', harga: 62000, qty: 1 })">Tambah</button>
</template>
```

---

## Konsep Kunci

### `defineStore` + `useX` = Gudang + Pintu
`defineStore("keranjang", setup-fn)` buat, `useKeranjang()` ambil di komponen mana saja.

### `ref` + `computed` di Store = Isi + Kasir Otomatis
Sama seperti komponen, tapi dibagi.

---

## Penjelasan untuk Pemula

### Analogi: Gudang Sentral Mal
- **Pinia = gudang**: 10 toko ambil stok sama, `total` kasir otomatis.

### Langkah 0 — Siapkan Device
- `npm install pinia` + `app.use(createPinia())` (lupa = `getActivePinia was called` error!).

### Cara Komputer Membaca
1. `useKeranjang()` pertama → buat store.
2. `tambah()` → `items` berubah → semua `{{ keranjang.total }}` update.

### 3 Istilah Wajib
1. **Store/defineStore**: gudang/buat
2. **use/createPinia**: ambil/pasang

---

## Eksperimen

- **Hijau:** Tambah di Daftar → Header ikut?
- **Kuning:** Lupa `app.use(createPinia())` → error apa? Pasang.
- **Merah:** 2 `defineStore("keranjang")` beda file → 2 gudang beda? (Samakan nama = sama!)

---

## Tantangan

**Mal 3 Toko:** Store `keranjang` + `Header` (jumlah) + `Daftar` (tambah) + `Checkout` (total + kosongkan).

---

## Glosarium Mini

- **Pinia/store**: gudang
- **defineStore/use**: buat/ambil

---

## Ringkasan

Minggu 6 dari 12: **Gudang Bersama** (Level: Menengah). 1 data semua. Minggu depan: **Lifecycle**.
