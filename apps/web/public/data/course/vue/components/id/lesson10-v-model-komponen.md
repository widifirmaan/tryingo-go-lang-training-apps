# v-model pada Komponen

> Vue | Komponen & Komunikasi | Pelajaran 10

## Tujuan Pembelajaran

- Memahami kontrak v-model: modelValue + update:modelValue
- Membangun input reusable dengan v-model
- Menggunakan pola computed getter/setter
- Menggabungkan beberapa v-model (v-model:nama)

---

## Program: v-model pada Komponen

```vue
<script setup>
import { ref } from 'vue'
import SearchInput from './components/SearchInput.vue'
import EditableTitle from './components/EditableTitle.vue'

const query = ref('')
const title = ref('Daftar Belanja')

const items = ref(['Vue', 'Vite', 'Pinia'])
</script>

<template>
  <h1>{{ title }}</h1>
  <EditableTitle v-model="title" />
  <SearchInput v-model="query" placeholder="Cari item..." />
  <ul>
    <li v-for="item in items" :key="item">
      {{ item }}
    </li>
  </ul>
</template>

```

---

## Penjelasan

## Kontrak v-model
`v-model="x"` pada komponen = `:modelValue="x"` + `@update:modelValue="x = $event"`. Itulah satu-satunya yang perlu diimplementasikan komponen: terima prop modelValue, emit update:modelValue.

## Pola Getter/Setter
Untuk input kompleks, buat computed dengan get (baca props.modelValue) dan set (emit update). Di template tinggal `v-model="value"` — bersih dan tidak perlu `$event.target.value` manual.

## Beberapa v-model
`v-model:title` + `v-model:body` mengikat dua pasang prop/event: `title`/`update:title`, `body`/`update:body`. Cocok untuk form multi-field yang dibungkus komponen.

## Trap: Menulis Prop Langsung
Jangan pernah `props.modelValue = v` — itu mutasi props. Satu-satunya jalan keluar yang benar adalah emit update:modelValue, lalu parent yang mengubah state miliknya.

---

## Eksperimen

1. **Kontrak v-model**
2. **Pola Getter/Setter**
3. **Beberapa v-model**
4. **Trap: Menulis Prop Langsung**

---

## Tantangan

Buat FormField reusable: prop label, modelValue, type; emit update. Pakai tiga FormField (nama, email, umur) dengan `v-model:label` style (v-model biasa). Tambahkan validasi sederhana: tombol submit nonaktif jika ada field kosong (computed di App).

---

## Ringkasan

v-model komponen = modelValue + update:modelValue. Pola getter/setter untuk input bersih. v-model:nama untuk multi-field. Jangan mutasi props. Lanjut: slots.
