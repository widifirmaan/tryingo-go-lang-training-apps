# Animations & Transitions

> **Kategori:** Vue | **Level:** Lanjutan | **Minggu 11:** Animations & Transitions

## Tujuan Pembelajaran

- <transition>: enter/leave animations
- CSS classes: -enter-active, -leave-to
- <transition-group>: list animations
- JavaScript hooks: before-enter, enter, leave
- GSAP integration untuk complex animations

---

## Program: Animations & Transitions

<Transition> menangani enter/leave; mode out-in menyusun koreografi pergantian.

```vue
<script setup lang="ts">
import { ref } from 'vue';
const show = ref(true);
const items = ref(['a', 'b', 'c']);
const shuffled = () => items.value = [...items.value].sort(() => Math.random() - 0.5);
const key = ref(0);
</script>

<template>
  <!-- Enter/leave -->
  <Transition name="fade" mode="out-in">
    <div v-if="show" class="toast">Halo!</div>
  </Transition>

  <!-- List fade/move -->
  <TransitionGroup name="list" tag="ul">
    <li v-for="(it, i) in items" :key="it">{{ i }}. {{ it }}</li>
  </TransitionGroup>
  <button @click="shuffled">Shuffle (FLIP)</button>

  <!-- Component swap with unique keys -->
  <Transition name="slide" mode="out-in">
    <Screen :key="key" />
  </Transition>

  <style>
    .fade-enter-active, .fade-leave-active { transition: opacity .3s; }
    .fade-enter-from, .fade-leave-to     { opacity: 0; }
    .list-move { transition: transform .4s; }
    .list-enter-active, .list-leave-active { transition: all .3s; }
    .list-enter-from { transform: translateX(-30px); opacity: 0; }
  </style>
</template>
```

---

## Konsep Kunci

### transition vs TransitionGroup

<Transition> untuk pergantian elemen tunggal; <TransitionGroup> untuk list dengan class move (FLIP).

### mode out-in

Mencegah overlap dua komponen; keluar dulu, baru masuk - koreografi bersih.

### CSS classes mapping

.fade-enter-from (gaya awal) -> .fade-enter-active (berjalan) -> selesai; konvensi CSS default Vue sudah rapi.

### JS hooks

@before-enter/@enter/@after-enter untuk animasi JS (gsap, dsb) saat CSS tidak cukup.

---

## Eksperimen

- Ganti fade dengan kurva cubic-bezier bouncy.
- Tambah stagger delay per item.
- Bandingkan mode in-out vs out-in.

---

## Tantangan

Bangun tab panel beranimasi dengan motion sadar-scroll.

---

## Ringkasan

Materi minggu ini telah dibahas: Animations & Transitions. Lanjut ke pekan berikutnya untuk memperdalam.
