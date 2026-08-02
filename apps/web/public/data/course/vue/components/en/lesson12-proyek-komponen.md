# Project: Modal + Form + Tabs

> Vue | Components & Communication | Lesson 12

## Learning Objectives

- Combine props, emits, slots, v-model in one app
- Build a reusable modal (Teleport + Transition)
- Build generic tabs with dynamic scoped slots
- Compose components with clear contracts

---

## Program: Project: Modal + Form + Tabs

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

## Explanation

## Component Contracts
Every component has an explicit contract: AppModal ({ open } + @close + title/default slots), ContactForm (@submit + object payload), Tabs ({ tabs } + panel-N slots). Components with clear contracts are reusable without reading their internals.

## Teleport & Transition
`<Teleport to="body">` renders the modal at the end of <body> (free from overflow:hidden/z-index parents). `<Transition>` with enter/leave classes animates it. Modal + form = the standard production pattern.

## Dynamic Scoped Slots
`:name="'panel-' + active"` picks a slot based on active state — a generic Tabs whose content the parent defines. Without scoped slots, Tabs would hard-code content and lose reusability.

## Full Feedback Loop
Trace the flow: Form → emit submit (payload) → App adds the contact → App sets `showModal = false` → Modal closes (props down). Data always belongs to App; children only report.

---

## Experiments

1. **Kontrak Komponen**
2. **Teleport & Transition**
3. **Scoped Slot Dinamis**
4. **Umpan Balik Lengkap**

---

## Challenge

Extend the project: (1) delete contact with a confirmation inside the same modal, (2) make the "Favorites" tab real (star toggle per row), (3) duplicate-email validation. Commit to git after each feature — the "commit per exercise" pattern.

---

## Summary

Project combines props/emits/slots/v-model. Teleport + Transition for modals. Scoped slots for generic components. Data in parent, children report. Next: composables.
