## Learning Objectives

- provide: share data to all descendants
- inject: receive data from ancestor
- When to use provide/inject vs props
- Teleport: render to different DOM tree
- Slots: default, named, scoped slots

---

## Program: Provide/Inject & Teleport

Cross-tree dependency without props drilling, Teleport for portals/modals, and Suspense for async components.

```vue
<!-- === provide/inject === -->
// src/composables/useTheme.ts
import { provide, inject, InjectionKey } from 'vue';

interface ThemeAPI { theme: 'light' | 'dark'; toggle(): void }
const Key: InjectionKey<ThemeAPI> = Symbol('theme');

export function provideTheme() {
  let theme = ref<'light' | 'dark'>('dark');
  provide(Key, {
    theme,
    toggle: () => (theme.value = theme.value === 'dark' ? 'light' : 'dark'),
  });
}
export function useTheme() {
  const t = inject(Key);
  if (!t) throw new Error('useTheme must be inside the provider subtree');
  return t;
}

<!-- App.vue: provideTheme() in the root setup; ThemeToggle.vue: const t = useTheme() -->

<!-- === Teleport: modal to body === -->
<template>
  <Teleport to="body">
    <div class="overlay" v-if="open" @click.self="open = false">
      <div class="modal">...</div>
    </div>
  </Teleport>
</template>

<!-- === Suspense: async component loading === -->
<Suspense>
  <Dashboard :key="screen" />
  <template #fallback><div class="skeleton spin">Loading…</div></template>
</Suspense>
```

---

## Key Concepts

### InjectionKey type-safe

Symbol + InjectionKey<ThemeAPI> memberi tipe pada inject - bentuk data injection terjaga di TypeScript.

### Provide at root

provide di root App, konsumsi di subtree mana pun; mirip React Context tetapi built-in penuh di Vue.

### Teleport

Modal/tooltip tak perlu bersarang di DOM parent (z-index bentrok); portal ke body menghindari overflow dan stacking yang terpotong.

### Suspense async boundaries

Membungkus komponen async; fallback skeleton tampil sampai data siap, per bagian dashboard.

---

## Experiments

- Provide a token with a typed key and consume it in multiple components.
- Teleport a notification to the header with transitions.
- Wrap each dashboard widget in its own Suspense.

---

## Challenge

Build a modal system: useModal() via inject + Teleport + Transition so stacking stays accessible.

---

## Summary

This week's material has been covered: Provide/Inject & Teleport. Continue to the following week to deepen.
