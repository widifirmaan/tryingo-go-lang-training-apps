# Provide/Inject & Teleport

## Tujuan Pembelajaran

- provide: share data ke semua descendants
- inject: terima data dari ancestor
- Kapan pakai provide/inject vs props
- Teleport: render ke DOM tree berbeda
- Slots: default, named, scoped slots

---

## Program: Provide/Inject & Teleport

Program: context antar komponen tanpa props drilling, Teleport untuk portal modals, dan Suspense async components.

```vue
<!-- === provide/inject === -->
// src/composables/useTheme.ts
import { provide, inject, InjectionKey } from 'vue';

interface ThemeAPI { theme: 'light' | 'dark'; toggle(): void }
const Key: InjectionKey<ThemeAPI> = Symbol('theme');

export function provideTheme() {
  let theme = ref<'light' | 'dark'>('dark');
  provide(Key, {
    theme,                       // reactive ref - di-inject langsung
    toggle: () => (theme.value = theme.value === 'dark' ? 'light' : 'dark'),
  });
}
export function useTheme() {
  const t = inject(Key);
  if (!t) throw new Error('useTheme harus dalam subtree provider');
  return t;
}

<!-- App.vue: provideTheme() di setup root; ThemeToggle.vue: const t = useTheme() -->

<!-- === Teleport: modal ke body === -->
<template>
  <Teleport to="body">
    <div class="overlay" v-if="open" @click.self="open = false">
      <div class="modal">...</div>
    </div>
  </Teleport>
</template>

<!-- === Suspense: async component data loading === -->
<Suspense>
  <Dashboard :key="screen" />
  <template #fallback><div class="skeleton spin">Loading…</div></template>
</Suspense>
```

---

## Konsep Kunci

### InjectionKey type-safe

Symbol + InjectionKey<ThemeAPI> memberi tipe pada inject - bentuk data injection terjaga di TypeScript.

### Provide at root

provide di root App, konsumsi di subtree mana pun; mirip React Context tetapi built-in penuh di Vue.

### Teleport

Modal/tooltip tak perlu bersarang di DOM parent (z-index bentrok); portal ke body menghindari overflow dan stacking yang terpotong.

### Suspense async boundaries

Membungkus komponen async; fallback skeleton tampil sampai data siap, per bagian dashboard.

---

## Eksperimen

- Provide token auth dengan InjectionKey typed lalu konsumsi di dua komponen.
- Teleport notifikasi ke header lengkap dengan Transition.
- Bungkus tiap widget dashboard dengan Suspense sendiri.

---

## Tantangan

Bangun sistem modal: useModal() via inject + Teleport + Transition agar susunan modal tetap mudah diakses.

---

## Ringkasan

Materi minggu ini telah dibahas: Provide/Inject & Teleport. Lanjut ke pekan berikutnya untuk memperdalam.
