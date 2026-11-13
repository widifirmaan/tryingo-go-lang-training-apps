## Tujuan Pembelajaran

- defineStore: setup function atau options style
- State: ref() untuk reactive state
- Getters: computed() untuk derived state
- Actions: functions untuk mutate state
- Stores di multiple components

---

## Program: Pinia State Management

Store kontributor state global: setup refs, actions async, getters computed, dan persistence.

```vue
// src/stores/cart.ts
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  // state (ref) - akses di component: store.items
  const items = ref<{ id: number; name: string; price: number; qty: number }[]>([]);

  // getters (computed)
  const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0));
  const count = computed(() => items.value.reduce((n, i) => n + i.qty, 0));

  // actions (fungsi async juga boleh)
  function add(product: { id: number; name: string; price: number }, qty = 1) {
    const found = items.value.find((i) => i.id === product.id);
    if (found) found.qty += qty;
    else items.value.push({ ...product, qty });
  }
  async function checkout() {
    await api.post('/orders', { items: items.value, total: total.value });
    items.value = [];
  }

  return { items, total, count, add, checkout };
});

<!-- src/components/CartBadge.vue -->
<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
const cart = useCartStore();
</script>
<template>
  <span class="badge" :class="{ shake: cart.count > 5 }">
    Cart: {{ cart.count }} - {{ cart.total.toLocaleString('id-ID') }}
  </span>
</template>
```

---

## Konsep Kunci

### Setup-store vs options

Setup store (defineStore('cart', () => { ... })) mengikuti composition API; options store lebih ringkas untuk state kecil. Hasilnya sama persis.

### Direct read, mutate via actions

Komponen boleh membaca state langsung, tetapi kapsulkan mutasi di action - mudah dilacak lewat Pinia devtools.

### State flow

component -> action -> API -> patch state -> computed derive: data mengalir satu arah, debugging mudah.

### Persistence & SSR

pinia-plugin-persistedstate menulis ke localStorage; plugin hydration membawa state server ke client saat SSR.

---

## Eksperimen

- Persist keranjang (plugin) lalu refresh browser - barang tetap ada.
- Tambah undo stack untuk checkout terakhir.
- Catat aksi per user di dalam store.

---

## Tantangan

Tambah action ubah-jumlah per item (increment/decrement + remove) dengan computed untuk total.

---

## Ringkasan

Materi minggu ini telah dibahas: Pinia State Management. Lanjut ke pekan berikutnya untuk memperdalam.
