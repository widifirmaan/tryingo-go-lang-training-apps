# Performansi

> Vue | Production-Grade | Pelajaran 21

## Tujuan Pembelajaran

- Memecah kode dengan defineAsyncComponent
- Menggunakan shallowRef untuk data besar
- Memahami kapan optimasi DIPERLUKAN (bukan dini)
- Menggunakan nextTick untuk timing yang tepat

---

## Program: Performansi

```vue
<script setup>
import { ref, shallowRef, defineAsyncComponent, nextTick } from 'vue'

// 1) Lazy: komponen berat diunduh saat pertama dirender
const HeavyWidget = defineAsyncComponent(() =>
  import('./components/HeavyWidget.vue')
)

// 2) shallowRef: data besar yang diganti utuh, tanpa deep tracking
const rows = shallowRef(
  Array.from({ length: 2000 }, (_, i) => ({ id: i, label: 'Baris ' + i }))
)

const loaded = ref(false)

async function loadHeavy() {
  loaded.value = true
  // 3) nextTick: baca DOM sesudah Vue selesai update
  await nextTick()
  console.log('HeavyWidget dirender, DOM sudah siap')
}
</script>

<template>
  <h1>Perfomasi</h1>
  <button @click="loadHeavy">Muat Widget Berat</button>
  <HeavyWidget v-if="loaded" />

  <h2>shallowRef: 2000 baris</h2>
  <p>Total: {{ rows.length }} (deep tracking dimatikan)</p>
  <ul>
    <li v-for="r in rows" :key="r.id">{{ r.label }}</li>
  </ul>
</template>

```

---

## Penjelasan

## Kapan Perlu Optimasi?
Pertama ukur (Vue DevTools: timeline, render count). Vue sudah efisien: fine-grained reactivity membuat komponen hanya update saat data yang dipakainya berubah — optimasi manual jarang diperlukan. Optimalkan saat ADA masalah: bundle besar, render lambat, data raksasa.

## Lazy & Code Splitting
`defineAsyncComponent(() => import(...))` memecah chunk per komponen — widget berat tidak masuk bundle awal. Di route (pelajaran 16) memakai pola sama. Ukur dengan devtools → bila halaman pertama besar, pecah.

## shallowRef untuk Data Besar
`shallowRef` hanya melacak `.value` (referensi), bukan isi — array 2000 baris yang DIGANTI utuh tidak perlu deep tracking. Pakai saat: data besar jarang dimutasi, atau di-manage library eksternal. Jangan untuk data yang dimutasi per-item (lewat deteksi).

## nextTick
DOM diperbarui async (buffered). `await nextTick()` menunggu Vue selesai meng-update DOM — dipakai saat kamu perlu membaca/mengukur DOM tepat setelah perubahan state (scroll restore, pengukuran tinggi).

---

## Eksperimen

1. **Kapan Perlu Optimasi?**
2. **Lazy & Code Splitting**
3. **shallowRef untuk Data Besar**
4. **nextTick**

---

## Tantangan

Buat list 5000 item dengan v-memo (surgical re-render skip): `v-memo="[item.id === selected]"` pada baris. Tambahkan tombol "pilih random" dan ukur perbedaannya di DevTools (render timeline). Jelaskan kapan v-memo layak.

---

## Ringkasan

Ukur dulu, optimasi saat ada masalah. defineAsyncComponent + route lazy. shallowRef untuk data besar. nextTick untuk timing. Lanjut: testing.
