# Testing (Vitest)

> Vue | Production-Grade | Pelajaran 22

## Tujuan Pembelajaran

- Menguji komponen dengan Vitest + Vue Test Utils
- Menulis tes render, interaksi, dan emits
- Menjalankan tes dengan npm run test
- Memahami scope testing: unit & component

---

## Program: Testing (Vitest)

```vue
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  initial: { type: Number, default: 0 },
})

const emit = defineEmits(['changed'])

const count = ref(props.initial)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value += 1
  emit('changed', count.value)
}
</script>

<template>
  <div>
    <p class="count">{{ count }}</p>
    <p class="doubled">x2 = {{ doubled }}</p>
    <button class="inc" @click="increment">+1</button>
  </div>
</template>

```

---

## Penjelasan

## Mengapa Testing?
Tes membuktikan perilaku, bukan hanya tampilan: "counter menampilkan 5", "klik meng-email changed". App yang sedang tumbuh tanpa tes akan patah diam-diam saat refactor. Mulai dari yang penting: logika murni + komponen dengan interaksi.

## Struktur Tes
`mount(Counter, { props })` merender komponen sungguhan; `wrapper.find('.count').text()` memeriksa output; `trigger('click')` mensimulasikan interaksi; `wrapper.emitted('changed')` memeriksa event yang keluar. `await` penting: state Vue async.

## Jalankan di Terminal
`npm run test` menjalankan semua file `*.test.js` (vitest). Dalam playground, file tes sudah disiapkan — buka terminal StackBlitz dan jalankan. CI/CD nanti menjalankan ini di setiap push.

## Scope: Jangan Over-Test
Tidak semua hal perlu tes. Prioritas: logika bisnis (computed, store actions, composables), komponen form/interaksi, perilaku penting. Hindari snapshot raksasa yang rapuh dan tes yang hanya mengulang implementasi.

---

## Eksperimen

1. **Mengapa Testing?**
2. **Struktur Tes**
3. **Jalankan di Terminal**
4. **Scope: Jangan Over-Test**

---

## Tantangan

Tulis tes untuk useCartStore: (1) add menambah item baru, (2) add item yang sama menambah qty, (3) remove menghapus item, (4) total menghitung benar. File `src/stores/cart.test.js` + jalankan. Ini pola "tes untuk logika bisnis".

---

## Ringkasan

Vitest + Vue Test Utils: mount, find, trigger, emitted. npm run test. Prioritas: logika bisnis + interaksi. Lanjut: proyek e-commerce.
