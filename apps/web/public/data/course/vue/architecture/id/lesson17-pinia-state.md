# State Ladder & Pinia

> Vue | Arsitektur & State | Pelajaran 17

## Tujuan Pembelajaran

- Menguasai "state ladder": lokal → lift → provide/inject → Pinia
- Membuat store dengan defineStore (setup syntax)
- Menggunakan getters & actions
- Menyadari kapan TIDAK memakai Pinia

---

## Program: State Ladder & Pinia

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from './stores/cart'

const cart = useCartStore()

// storeToRefs: destructuring aman — menjaga reaktivitas!
const { items, total } = storeToRefs(cart)
</script>

<template>
  <h1>Keranjang (Pinia)</h1>
  <button @click="cart.add({ id: 2, name: 'Vue T-Shirt', price: 185000 })">
    Tambah T-Shirt
  </button>
  <ul>
    <li v-for="i in items" :key="i.id">
      {{ i.name }} x{{ i.qty }} — Rp{{ (i.price * i.qty).toLocaleString('id-ID') }}
      <button @click="cart.remove(i.id)">hapus</button>
    </li>
  </ul>
  <p><strong>Total: Rp{{ total.toLocaleString('id-ID') }}</strong></p>
</template>

```

---

## Penjelasan

## State Ladder (tangga keputusan)
Sebelum memakai Pinia, tanyakan berurutan: (1) server data? → query library/useFetch, (2) perlu survive refresh/link? → URL/query params, (3) dipakai satu komponen + anaknya? → ref lokal, (4) dipakai beberapa sibling? → lift ke parent terdekat, (5) dipakai banyak komponen berjauhan? → Pinia. Hampir semua state berhenti di langkah 3-4. Naik hanya saat benar-benar sakit.

## Setup Store = Composable
`defineStore('cart', () => { ... })` persis seperti composable: ref (state), computed (getters), fungsi (actions). "Kalau paham ref/computed, kamu sudah tahu 80% Pinia." Tidak ada mutation layer ala Vuex.

## storeToRefs
Destructuring store biasa (`const { items } = cart`) memutus reaktivitas — jebakan yang sama seperti reactive(). Wajib `storeToRefs(cart)` untuk state; method/action bisa langsung `cart.add()`.

## Kapan TIDAK Pakai Pinia
Satu komponen → jangan. Form draft → jangan (hidup di komponen). Server data → jangan (siklus hidup berbeda). Toggle dropdown → jangan. Pinia untuk: state UI lintas-route yang harus survive navigasi (cart, user auth, theme, notifikasi).

---

## Eksperimen

1. **State Ladder (tangga keputusan)**
2. **Setup Store = Composable**
3. **storeToRefs**
4. **Kapan TIDAK Pakai Pinia**

---

## Tantangan

Perluas toko: tambahkan action `clear()`, getter `count` (jumlah item), dan persist ke localStorage (watch di store). Buat App kedua — keranjang bersifat GLOBAL: perubahan di satu komponen langsung terlihat di komponen lain (beda dengan composable instance).

---

## Ringkasan

State ladder: mulai lokal, naik bertahap. Setup store = composable global. storeToRefs wajib. Pinia untuk state lintas-route. Lanjut: proyek dashboard.
