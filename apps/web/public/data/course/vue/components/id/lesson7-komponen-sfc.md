# Komponen & SFC

> Vue | Komponen & Komunikasi | Pelajaran 7

## Tujuan Pembelajaran

- Memecah UI menjadi komponen kecil
- Membangun pohon komponen (parent → child)
- Mengimpor & memakai komponen dengan <script setup>
- Mengisolasi style dengan scoped

---

## Program: Komponen & SFC

```vue
<script setup>
import ProfileCard from './components/ProfileCard.vue'
import StatsRow from './components/StatsRow.vue'

const name = 'Ayu'
const role = 'Vue Developer'
const stats = [
  { label: 'Lesson', value: 7 },
  { label: 'Latihan', value: 12 },
  { label: 'Materi', value: 3 },
]
</script>

<template>
  <main>
    <h1>Halaman Profil</h1>
    <ProfileCard :name="name" :role="role" />
    <StatsRow :stats="stats" />
  </main>
</template>

```

---

## Penjelasan

## Kenapa Komponen?
Satu file raksasa sulit dipelihara. Komponen = blok UI reusable dengan logika sendiri. Prinsip: pecah saat komponen > ~100 baris atau saat ada bagian yang jelas bisa dipakai ulang (kartu, baris statistik, tombol).

## Import & Pakai
Dengan <script setup>, `import ProfileCard from ...` cukup — variabel komponen langsung tersedia di template. Penamaan: PascalCase untuk komponen (`ProfileCard.vue` bukan `profileCard.vue`).

## style scoped
`<style scoped>` menambahkan atribut data unik sehingga CSS hanya berlaku di komponen itu — mencegah bentrok class antar komponen. Tanpa scoped, class global bisa saling menimpa.

## Aturan Satu File Satu Komponen
Nama file = nama komponen. Gunakan satu direktori `src/components/`. App.vue tetap jadi akar yang menyusun komposisi (App = "halaman", components = "bagian").

---

## Eksperimen

1. **Kenapa Komponen?**
2. **Import & Pakai**
3. **style scoped**
4. **Aturan Satu File Satu Komponen**

---

## Tantangan

Pecah kartu produk dari pelajaran 3 menjadi: ProductCard.vue (tampilan) dan App.vue (state). Tambahkan komponen BadgePromo yang dipakai di dalam ProductCard. Perhatikan: tiga level pohon komponen.

---

## Ringkasan

Komponen = blok reusable. Import otomatis via <script setup>. PascalCase. style scoped. Pecah saat besar/reusable. Lanjut: props.
