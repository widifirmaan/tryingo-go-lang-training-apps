# Rendering Deklaratif & ref()

> Vue | Foundasi Vue | Pelajaran 2

## Tujuan Pembelajaran

- Memahami mental model reaktivitas: data berubah → DOM ikut berubah
- Mendeklarasikan state dengan ref()
- Memahami aturan .value (wajib di script, otomatis dibuka di template)
- Mengapa ref ada: agar Vue bisa melacak akses dan mutasi

---

## Program: Rendering Deklaratif & ref()

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const message = ref('Klik tombolnya!')

function increment() {
  count.value += 1
  message.value = count.value > 5 ? 'Luar biasa, teruskan!' : 'Bagus, lanjutkan!'
}

function reset() {
  count.value = 0
  message.value = 'Mulai lagi dari nol.'
}
</script>

<template>
  <h1>Counter: {{ count }}</h1>
  <p>{{ message }}</p>
  <button @click="increment">Tambah</button>
  <button @click="reset">Reset</button>
  <p>Di template ref otomatis terbuka (tanpa .value). Di script Wajib .value.</p>
</template>

<style scoped>
h1 { color: #42B883; }
</style>

```

---

## Penjelasan

## Mental Model: Data -> UI
Kamu TIDAK menulis `document.getElementById(...)` untuk update UI. Kamu mengubah state; Vue yang memperbarui DOM. Inilah rendering deklaratif: kamu menyatakan "apa yang ditampilkan", bukan "bagaimana mengubahnya".

## ref() & .value
`ref(0)` membungkus nilai dalam objek dengan properti `.value`. Aturan: di `<script>` gunakan `.value`; di template otomatis dibuka (jangan tulis `count.value` di template). Misconception paling umum: lupa `.value` di script — cek .value dulu setiap bug.

## Kenapa Harus ref?
Variabel biasa tidak bisa dilacak. `.value` memberi Vue kesempatan melacak di getter dan memicu di setter: saat komponen render, Vue melacak setiap ref yang dipakai; saat ref bermutasi, komponen yang melacaknya di-render ulang.

## Reaktivitas mendalam & Mutasi
Ref bersifat deep reactive secara default: mengubah objek/array bersarang tetap terdeteksi. Di event handler, mutasi ref langsung valid (contoh: `count.value += 1`).

---

## Eksperimen

1. **Mental Model: Data -> UI**
2. **ref() & .value**
3. **Kenapa Harus ref?**
4. **Reaktivitas mendalam & Mutasi**

---

## Tantangan

Buat timer "waktu belajar": ref detik, tombol mulai/jeda dengan setInterval, stopwatch yang reset. Prediksi: apakah `count.value++` di dalam setInterval membuat UI berubah? Jelaskan kenapa (ya — karena ref melacak mutasi).

---

## Ringkasan

Reaktivitas: ubah data → UI otomatis. ref() + .value (script) / auto-unwrap (template). ref ada untuk tracking. Deep reactive. Lanjut: direktif template.
