# Animations & Transitions

## Learning Objectives

- <transition>: enter/leave animations
- CSS classes: -enter-active, -leave-to
- <transition-group>: list animations
- JavaScript hooks: before-enter, enter, leave
- GSAP integration for complex animations

---

## Program: Animations & Transitions

<Transition> hooks enter/leave animations; mode out-in choreographs swaps.

```vue
<script setup lang="ts">
import { ref } from 'vue';
const show = ref(true);
const items = ref(['a', 'b', 'c']);
const shuffled = () => items.value = [...items.value].sort(() => Math.random() - 0.5);
const key = ref(0);
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="show" class="toast">Hello!</div>
  </Transition>

  <TransitionGroup name="list" tag="ul">
    <li v-for="(it, i) in items" :key="it">{{ i }}. {{ it }}</li>
  </TransitionGroup>
  <button @click="shuffled">Shuffle (FLIP)</button>

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

## Key Concepts

### transition vs TransitionGroup

<Transition> untuk pergantian elemen tunggal; <TransitionGroup> untuk list dengan class move (FLIP).

### mode out-in

Mencegah overlap dua komponen; keluar dulu, baru masuk - koreografi bersih.

### CSS classes mapping

.fade-enter-from (gaya awal) -> .fade-enter-active (berjalan) -> selesai; konvensi CSS default Vue sudah rapi.

### JS hooks

@before-enter/@enter/@after-enter untuk animasi JS (gsap, dsb) saat CSS tidak cukup.

---

## Experiments

- Swap fade for a bouncy cubic-bezier curve
- Add per-item stagger delays
- Compare in-out vs out-in modes.

---

## Challenge

Create an animated carousel of tabs with both transition timing modes and scrolling behavior.

---

## Summary

This week's material has been covered: Animations & Transitions. Continue to the following week to deepen.
