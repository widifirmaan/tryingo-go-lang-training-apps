# Emits: Anak → Induk

> Vue | Komponen & Komunikasi | Pelajaran 9

## Tujuan Pembelajaran

- Mengirim data child → parent dengan emits
- Mendeklarasikan event dengan defineEmits
- Mengirim payload (id, nilai, event)
- Memahami pola: props turun, events naik

---

## Program: Emits: Anak → Induk

```vue
<script setup>
import { ref } from 'vue'
import TaskItem from './components/TaskItem.vue'

const tasks = ref([
  { id: 1, title: 'Belajar props', done: true },
  { id: 2, title: 'Belajar emits', done: false },
])

function handleToggle(id) {
  const t = tasks.value.find((task) => task.id === id)
  if (t) t.done = !t.done
}

function handleDelete(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}
</script>

<template>
  <h1>Emits: Anak ke Induk</h1>
  <TaskItem
    v-for="t in tasks"
    :key="t.id"
    :task="t"
    @toggle="handleToggle"
    @delete="handleDelete"
  />
  <p>{{ tasks.length }} tugas tersisa</p>
</template>

```

---

## Penjelasan

## Props Turun, Events Naik
Data mengalir satu arah ke bawah, event naik ke atas. Child TIDAK menyentuh data parent; child memberitahu via `emit('toggle', id)` dan parent memutuskan cara memprosesnya.

## defineEmits
`defineEmits(['toggle', 'delete'])` mendeklarasikan event (dokumentasi + validasi). Di template, panggil `emit('delete', task.id)` langsung atau lewat fungsi. Parent mendengarkan: `@delete="handleDelete"`.

## Payload Event
Event bisa membawa argumen apa pun: `emit('toggle', task.id)`, `emit('submit', { name, email })`. Handler parent menerima sebagai parameter pertama — data yang TIDAK ikut dibungkus event asli.

## Kapan Menggunakan Emits
Setiap kali child perlu "meminta" perubahan data milik parent: toggle, delete, submit, pilih. Aturan: jika child mengubah sesuatu yang BUKAN state lokalnya sendiri → emits. Konsisten dengan pola form (lesson 5): `@submit.prevent` + emit payload objek.

---

## Eksperimen

1. **Props Turun, Events Naik**
2. **defineEmits**
3. **Payload Event**
4. **Kapan Menggunakan Emits**

---

## Tantangan

Buat voting app: App punya array kandidat; VoteButton meng-email 'increment' + payload id; hasil diperbarui di App. Tambahkan tombol "reset semua" di App. Latihan: event dengan payload objek `emit('vote', { id, by: 'user' })`.

---

## Ringkasan

Events naik: emit('nama', payload). defineEmits untuk deklarasi. Props turun + events naik = aliran dua arah yang sehat. Lanjut: v-model pada komponen.
