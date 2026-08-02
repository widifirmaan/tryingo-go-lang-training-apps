# Directive & Binding

> Vue | Foundasi Vue | Pelajaran 3

## Tujuan Pembelajaran

- Mengikat atribut dinamis dengan v-bind (:)
- Menggunakan binding class & style (sintaks objek dan array)
- Menampilkan kondisi dengan v-if / v-else / v-show
- Memahami beda v-if vs v-show

---

## Program: Directive & Binding

```vue
<script setup>
import { ref } from 'vue'

const product = ref({
  name: 'Vue Mug',
  price: 120000,
  inStock: false,
})

const theme = ref('light')
const isMember = ref(true)
const discount = ref(15)
</script>

<template>
  <div :class="['card', theme === 'dark' ? 'card-dark' : 'card-light']">
    <h1>{{ product.name }}</h1>
    <p>Harga: Rp{{ product.price.toLocaleString('id-ID') }}</p>
    <p :style="{ color: product.inStock ? '#2e7d32' : '#c62828' }">
      {{ product.inStock ? 'Tersedia' : 'Stok habis' }}
    </p>
    <p v-if="isMember">Member: diskon {{ discount }}%</p>
    <p v-else>Belum jadi member.</p>
    <button @click="theme = theme === 'dark' ? 'light' : 'dark'">
      Ganti tema: {{ theme }}
    </button>
  </div>
</template>

<style scoped>
.card { border-radius: 12px; padding: 1.5rem; border: 1px solid #ddd; max-width: 360px; }
.card-light { background: #fff; color: #222; }
.card-dark { background: #1e1e1e; color: #eee; }
button { margin-top: 0.75rem; }
</style>

```

---

## Penjelasan

## v-bind (:)
`v-bind:attribute` atau `:` mengikat atribut ke ekspresi JS. `:style="{ color: ... }"` dan `:class="[...]"` adalah bentuk khusus: objek untuk kondisi per-properti, array untuk menggabungkan beberapa class.

## v-if / v-else / v-show
`v-if` MENGHAPUS elemen dari DOM saat false; `v-show` hanya menyembunyikan (display:none) tetapi elemen tetap ada. Aturan praktis: `v-if` untuk kondisi yang jarang berubah (lebih murah), `v-show` untuk toggle cepat.

## Penulisan Kondisi
`v-else` harus langsung mengikuti elemen `v-if` tanpa elemen di antaranya. Untuk banyak cabang: `v-else-if`. Template literal bisa memuat ekspresi kompleks, tapi pindahkan ke computed bila mulai panjang.

## Jebakan: Atribut Statis vs Dinamis
Atribut tanpa `:` adalah string literal ("theme" bukan nilai variabel theme). Lupa titik dua = bug klasik: `class="theme"` mengikat string "theme", bukan class dari variabel.

---

## Eksperimen

1. **v-bind (:)**
2. **v-if / v-else / v-show**
3. **Penulisan Kondisi**
4. **Jebakan: Atribut Statis vs Dinamis**

---

## Tantangan

Buat kartu produk dengan state: nama, harga, rating (1-5), status promo. Gunakan v-if/v-else untuk badge "PROMO", :class untuk warna rating, dan v-show untuk tombol "Tambah ke keranjang" yang muncul hanya saat stok ada.

---

## Ringkasan

v-bind (:) untuk atribut dinamis. Class/style binding: objek & array. v-if/v-else menghapus DOM; v-show menyembunyikan. Tanpa ":" = string literal. Lanjut: list & events.
