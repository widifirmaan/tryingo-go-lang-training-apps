# Proyek: Modal + Form + Tabs

> Vue | Komponen & Komunikasi | Pelajaran 12

## Tujuan Pembelajaran

- Menggabungkan props, emits, slots, v-model dalam satu app
- Membangun modal reusable (Teleport + Transition)
- Membangun tabs generic dengan scoped slot dinamis
- Menyusun komponen dengan kontrak yang jelas

---

## Program: Proyek: Modal + Form + Tabs

```vue
<script setup>
import { ref } from 'vue'
import AppModal from './components/AppModal.vue'
import ContactForm from './components/ContactForm.vue'
import Tabs from './components/Tabs.vue'

const showModal = ref(false)
const contacts = ref([
  { id: 1, name: 'Ayu', email: 'ayu@mail.com' },
  { id: 2, name: 'Budi', email: 'budi@mail.com' },
])

function addContact(data) {
  contacts.value.push({ id: Date.now(), ...data })
  showModal.value = false
}
</script>

<template>
  <h1>Buku Kontak</h1>
  <Tabs :tabs="['Semua', 'Favorit']">
    <template #panel-0>
      <ul>
        <li v-for="c in contacts" :key="c.id">
          {{ c.name }} — {{ c.email }}
        </li>
      </ul>
    </template>
    <template #panel-1>
      <p>Belum ada favorit. Klik + untuk tambah kontak.</p>
    </template>
  </Tabs>

  <button @click="showModal = true">+ Kontak Baru</button>

  <AppModal :open="showModal" @close="showModal = false">
    <template #title>Tambah Kontak</template>
    <ContactForm @submit="addContact" />
  </AppModal>
</template>

```

---

## Penjelasan

## Kontrak Komponen
Setiap komponen punya kontrak eksplisit: AppModal ({ open } + @close + slot title/default), ContactForm (@submit + payload objek), Tabs ({ tabs } + slot panel-N). Komponen yang kontraknya jelas bisa dipakai ulang tanpa membaca isi file.

## Teleport & Transition
`<Teleport to="body">` merender modal di akhir <body> (bebas dari parent yang overflow:hidden/z-index). `<Transition>` dengan class enter/leave memberi animasi. Modal + form = pola produksi standar.

## Scoped Slot Dinamis
`:name="'panel-' + active"` memilih slot berdasarkan state aktif — tabs generic yang kontennya ditentukan parent. Tanpa scoped slot, Tabs harus hard-code konten dan kehilangan reusability.

## Umpan Balik Lengkap
Amati alur: Form → emit submit (payload) → App menambah kontak → App mengatur `showModal = false` → Modal menutup (props turun). Data selalu milik App; komponen anak hanya melaporkan.

---

## Eksperimen

1. **Kontrak Komponen**
2. **Teleport & Transition**
3. **Scoped Slot Dinamis**
4. **Umpan Balik Lengkap**

---

## Tantangan

Perluas proyek: (1) tombol hapus kontak dengan konfirmasi di modal yang sama, (2) tab "Favorit" benar-benar berfungsi (toggle bintang di baris kontak), (3) validasi duplikat email. Commit ke git setelah tiap fitur — pola "commit per exercise".

---

## Ringkasan

Proyek menggabungkan props/emits/slots/v-model. Teleport + Transition untuk modal. Scoped slot untuk komponen generic. Data di parent, anak melaporkan. Lanjut: composables.
