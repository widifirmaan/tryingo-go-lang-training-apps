# Pinia — Gudang Bersama Vue

> **Kategori:** Vue | **Level:** Menengah | **Minggu 6:** Pinia

## Tujuan Pembelajaran

- `defineStore` gudang, `store.keranjang` baca, `store.tambah()` ubah — tanpa props 5 level

---

## Program: Gudang Pinia

```bash
npm install pinia
```

```javascript
// src/stores/keranjang.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useKeranjang = defineStore("keranjang", () => {
  const items = ref([]);
  function tambah(item){ items.value.push(item); }
  function hapus(id){ items.value = items.value.filter(i => i.id !== id); }
  return { items, tambah, hapus };
});
```

```vue
<!-- Produk.vue -->
<script setup>
import { useKeranjang } from "../stores/keranjang";
const keranjang = useKeranjang();
</script>
<template>
  <button @click="keranjang.tambah({ id: Date.now(), nama: 'Beras' })">Tambah Beras</button>
  <p>Isi: {{ keranjang.items.length }}</p>
</template>
```

Setup `main.js`: `app.use(createPinia())`.

---

## Ringkasan

Minggu 6: **Gudang Pinia** — 1 gudang untuk semua. Minggu depan: **Lifecycle**.
