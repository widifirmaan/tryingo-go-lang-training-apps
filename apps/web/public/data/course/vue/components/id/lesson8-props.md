# Props: Aliran Data Satu Arah

> Vue | Komponen & Komunikasi | Pelajaran 8

## Tujuan Pembelajaran

- Mengirim data parent → child dengan props
- Mendeklarasikan props: tipe, required, default
- Memahami props itu read-only (aliran satu arah)
- Menghindari mutasi props

---

## Program: Props: Aliran Data Satu Arah

```vue
<script setup>
import ProductCard from './components/ProductCard.vue'

const products = [
  { id: 1, name: 'Vue Mug', price: 120000, rating: 4.5 },
  { id: 2, name: 'Vue T-Shirt', price: 185000, rating: 5 },
  { id: 3, name: 'Stiker Vue', price: 15000, rating: 3 },
]
</script>

<template>
  <h1>Katalog</h1>
  <div class="grid">
    <ProductCard
      v-for="p in products"
      :key="p.id"
      :name="p.name"
      :price="p.price"
      :rating="p.rating"
    />
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
</style>

```

---

## Penjelasan

## Aliran Satu Arah
Props turun dari parent ke child. Data di parent TIDAK ikut berubah saat child mengubah props (itu dilarang!). Umpan balik child → parent lewat emits (pelajaran 9).

## Deklarasi Props
Dua gaya: array (`['name']`) atau objek dengan spesifikasi (`{ name: { type: String, required: true } }`). Spesifikasi memberi validasi + dokumentasi + default. Default hanya dipakai saat parent tidak mengirim.

## Trap: Mutasi Props
`name = 'x'` di child = anti-pattern (mengubah milik parent secara tak terlihat). Jika child perlu nilai lokal awal dari props: salin ke ref sendiri. Jika perlu mengubah data asli: emit event (next lesson).

## Tips: Variabel vs Literal
Dengan kebab-case di template, props PascalCase di deklarasi berubah menjadi kebab di pemakaian (`:productName` = `:product-name`). Props statis tanpa ":" dikirim sebagai string literal.

---

## Eksperimen

1. **Aliran Satu Arah**
2. **Deklarasi Props**
3. **Trap: Mutasi Props**
4. **Tips: Variabel vs Literal**

---

## Tantangan

Buat daftar film: App punya array films; FilmCard menerima props judul, tahun, genre, rating, sudahDitonton. Tambahkan prop wajib (judul) dan prop default (tahun = 2024). Coba mutasi props di child — lihat warning di konsol.

---

## Ringkasan

Props: parent → child, satu arah, read-only. Deklarasi dengan tipe/required/default. Mutasi props = anti-pattern (emit saja). Lanjut: emits.
