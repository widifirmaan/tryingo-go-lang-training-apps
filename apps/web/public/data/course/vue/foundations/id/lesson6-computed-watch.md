# Computed & Watchers

> Vue | Foundasi Vue | Pelajaran 6

## Tujuan Pembelajaran

- Menurunkan nilai dengan computed() (cache & pure)
- Menjalankan side effects dengan watch()
- Memahami beda watch vs watchEffect
- Menghindari trap: computed ber-side-effect & watch nilai (bukan getter)

---

## Program: Computed & Watchers

```vue
<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const query = ref('')
const notes = ref([
  'Computed itu cache & pure',
  'Watch untuk side effects',
  'Jangan lupa .value di script',
])

const filtered = computed(() =>
  notes.value.filter((n) => n.toLowerCase().includes(query.value.toLowerCase()))
)

const stats = computed(() => ({
  total: notes.value.length,
  done: notes.value.filter((n) => n.startsWith('[x]')).length,
}))

// Side effect: simpan ke localStorage saat list berubah
watch(notes, (list) => {
  localStorage.setItem('notes', JSON.stringify(list))
}, { deep: true })

// watchEffect: otomatis melacak dependency yang dipakai
watchEffect(() => {
  console.log('Filter aktif:', query.value || '(kosong)', '| Hasil:', filtered.value.length)
})
</script>

<template>
  <h1>Catatan {{ stats.done }}/{{ stats.total }} selesai</h1>
  <input v-model="query" placeholder="Cari catatan..." />
  <ul>
    <li v-for="note in filtered" :key="note">{{ note }}</li>
  </ul>
  <p v-if="filtered.length === 0">Tidak ada hasil untuk "{{ query }}".</p>
</template>

<style scoped>
li { margin: 0.3rem 0; }
</style>

```

---

## Penjelasan

## computed: Turunan Murni
`computed` = nilai yang diturunkan dari state lain; CACHE sampai dependency berubah. Wajib PURE: tidak boleh mutasi state / fetch / console.log di dalamnya. Aturan: jika butuh efek samping → watch, bukan computed.

## watch: Side Effects
`watch(notes, cb)` menjalankan callback saat sumber berubah (localStorage, fetch, log). `deep: true` untuk mengamati mutasi bersarang. Untuk ref: lewatkan ref langsung. Untuk properti objek reaktif: WAJIB getter — `watch(state.count, cb)` mengamati nilai 0, bukan state (tidak pernah terpanggil!).

## watchEffect: Auto-Track
`watchEffect(cb)` langsung dijalankan sekali dan melacak SEMUA ref yang dibaca di dalamnya secara otomatis. Risiko: infinite loop saat kamu membaca DAN menulis sumber yang sama dalam satu callback — gunakan watch dengan sumber eksplisit bila perlu kontrol.

## Trap: computed Ber-side-effect
`computed(() => { localStorage.setItem(...); return x })` = bug: computed bisa dihitung ulang kapan pun dan tanpa user sadar. Computed hanya transformasi; side effects hidup di watch/watchEffect.

---

## Eksperimen

1. **computed: Turunan Murni**
2. **watch: Side Effects**
3. **watchEffect: Auto-Track**
4. **Trap: computed Ber-side-effect**

---

## Tantangan

Buat pencarian buku: list buku {judul, tahun, selesai}. computed untuk filter + urutkan, watch untuk menyimpan filter terakhir ke localStorage (restore saat load), watchEffect untuk log jumlah hasil. Tambahkan "hapus semua" — dan perhatikan stats computed ikut update.

---

## Ringkasan

computed = turunan cache & pure. watch = side effects (getter untuk properti objek!). watchEffect = auto-track, hati-hati loop. Lanjut: komponen.
