# Composables

> Vue | Arsitektur & State | Pelajaran 13

## Tujuan Pembelajaran

- Mengekstrak logika stateful ke composable (awalan use)
- Memahami state instance vs state bersama
- Menulis composable sendiri: useCounter, useLocalStorage
- Meniru pola dari VueUse (200+ utilitas)

---

## Program: Composables

```vue
<script setup>
import { useCounter } from './composables/useCounter'
import { useLocalStorage } from './composables/useLocalStorage'

// Setiap pemanggilan composable = state instance TERPISAH
const a = useCounter(0)
const b = useCounter(100)

const savedNotes = useLocalStorage('notes', ['Belajar composables'])
</script>

<template>
  <h1>Dua Counter Independen</h1>
  <p>Counter A: {{ a.count.value }} <button @click="a.increment()">+1</button></p>
  <p>Counter B: {{ b.count.value }} <button @click="b.increment()">+1</button></p>

  <h2>useLocalStorage (persist)</h2>
  <ul>
    <li v-for="(n, i) in savedNotes.value" :key="i">{{ n }}</li>
  </ul>
</template>

```

---

## Penjelasan

## Apa Itu Composable?
Fungsi biasa yang memakai reaktivitas Vue (ref, computed, watch) dan mengembalikan state + method. Inilah PAYOFF utama Composition API: logic reuse tanpa mixins (yang punya naming collision & dependency tersembunyi).

## State Instance vs Bersama
Ref di DALAM fungsi composable = state per instance (tiap pemanggilan dapat instance sendiri — lihat counter A vs B). Ref di LUAR fungsi = state global bersama. Menaruh ref di tempat salah adalah bug klasik "sharing state tak sengaja".

## Konvensi Penulisan
Awalan `use` wajib (menandakan memakai reaktivitas). Return object berisi refs + fungsi. Cleanup: kembalikan fungsi untuk membersihkan interval/listener (dipanggil di onUnmounted).

## Kapan TIDAK Mengekstrak
Jangan ekstrak 3 baris yang hanya dipakai satu komponen. Ekstrak saat: dipakai 2+ komponen, atau logika kompleks yang mengacaukan komponen (>20 baris terkait). Baca sumber VueUse untuk internalisasi pola.

---

## Eksperimen

1. **Apa Itu Composable?**
2. **State Instance vs Bersama**
3. **Konvensi Penulisan**
4. **Kapan TIDAK Mengekstrak**

---

## Tantangan

Tulis useClock (detik berjalan dengan setInterval + cleanup onUnmounted) dan useDebounce (nilai tertunda). Pakai keduanya di App: jam live + input pencarian yang baru memproses setelah berhenti mengetik 300ms.

---

## Ringkasan

Composable = logika stateful reusable (use-). Ref dalam fungsi = per instance; di luar = shared. Cleanup di onUnmounted. Jangan ekstrak berlebihan. Lanjut: data fetching.
