# List & Event

> Vue | Foundasi Vue | Pelajaran 4

## Tujuan Pembelajaran

- Merender list dengan v-for dan :key
- Memahami key = identitas, BUKAN posisi
- Menangani event dengan v-on (@) + modifiers
- Mengirim argumen event handler dengan $event

---

## Program: List & Event

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Belajar Vue', done: false },
  { id: 2, name: 'Baca docs reaktivitas', done: true },
  { id: 3, name: 'Latihan v-for', done: false },
])

let nextId = 4

function addItem(event) {
  const text = event.target.value.trim()
  if (!text) return
  items.value.push({ id: nextId++, name: text, done: false })
  event.target.value = ''
}

function removeItem(id) {
  items.value = items.value.filter((item) => item.id !== id)
}

function toggleDone(id) {
  const item = items.value.find((i) => i.id === id)
  if (item) item.done = !item.done
}
</script>

<template>
  <h1>Daftar Belajar</h1>
  <input @keyup.enter="addItem" placeholder="Tulis tugas lalu Enter" />
  <ul>
    <li v-for="item in items" :key="item.id" :class="{ done: item.done }">
      <input type="checkbox" :checked="item.done" @change="toggleDone(item.id)" />
      {{ item.name }}
      <button @click.stop="removeItem(item.id)">hapus</button>
    </li>
  </ul>
  <p>Total: {{ items.length }} | Selesai: {{ items.filter((i) => i.done).length }}</p>
</template>

<style scoped>
.done { text-decoration: line-through; color: #888; }
li { margin: 0.4rem 0; }
button { margin-left: 0.5rem; }
</style>

```

---

## Penjelasan

## v-for + :key
`v-for="item in items"` merender satu elemen per item. `:key` WAJIB untuk identitas item. Key = IDENTITAS data, bukan posisinya: jangan `:key="index"` — saat list diurutkan ulang atau item ber-state internal, index memicu bug yang sulit dilacak (VueConf Toronto: kondisi bug muncul saat urutan berubah + item punya state sendiri).

## Event: v-on (@)
`@click` = `v-on:click`. Handler bisa statement (`count++`) atau fungsi. Argumen: `@click="addItem($event)"` mengirim event asli; untuk data lain: `@click="removeItem(item.id)"` (jangan tulis `item.id` tanpa kurung di handler).

## Modifiers
`.stop` menghentikan propagasi (`@click.stop`), `.prevent` memanggil preventDefault (form submit), `.once` hanya sekali, `.self` hanya jika target = elemen sendiri. `@keyup.enter` untuk tombol Enter.

## Mutasi List
Metode mutasi array (`push`, `splice`) terdeteksi reaktivitas; assignment ulang (`items.value = filter(...)`) juga memicu update. Jangan pernah mengganti `items.value` dengan array baru di event tanpa alasan — pilih salah satu pola dan konsisten.

---

## Eksperimen

1. **v-for + :key**
2. **Event: v-on (@)**
3. **Modifiers**
4. **Mutasi List**

---

## Tantangan

Perluas menjadi daftar belanja: item { id, nama, jumlah }. Tombol + dan - untuk jumlah. Filter tombol: Semua / Belum dibeli. Jelaskan kenapa :key="item.id" lebih aman daripada :key="index" saat menghapus item di tengah list.

---

## Ringkasan

v-for + :key (identitas!). v-on (@) + modifiers (.stop/.prevent/.once/.enter). Argumen handler. Mutasi array terdeteksi. Lanjut: forms & v-model.
