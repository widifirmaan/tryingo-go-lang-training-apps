# State Management (Signals & NgRx)

> Angular | Pelajaran 14

## Tujuan Pembelajaran

- Memahami Angular Signals untuk state management\n- Menggunakan signal() untuk membuat reactive state\n- Menggunakan computed() untuk derived state\n- Menggunakan update() untuk memodifikasi signal value

---

## Program: Angular

```typescript
import { signal, computed } from '@angular/core';

export interface AppState {
  count: number;
  items: string[];
}

export const count = signal(0);
export const doubled = computed(() => count() * 2);
export const items = signal<string[]>([]);

export function increment(): void {
  count.update(value => value + 1);
}

export function decrement(): void {
  count.update(value => value - 1);
}

export function addItem(item: string): void {
  items.update(current => [...current, item]);
}

```

---

## Penjelasan

## Signals
signal(initialValue) — create reactive state. signal() — read current value. signal.set(newValue) — set new value. signal.update(fn) — modify value with updater function.
## Computed
computed(() => expression) — create derived state that auto-updates when dependencies change. read with computed() — no subscription needed.
## NgRx (Alternative)
NgRx = Redux pattern for Angular. Store = single source of truth. Actions = describe what happened. Reducers = pure function that updates state. Effects = handle side effects.
## Comparison
Signals = simpler, built-in, great for local component state. NgRx = more powerful, better for complex global state with many components sharing data.

---

## Eksperimen

1. **## Signals
signal(initialValue) — create reactive state. signal() — read current value. signal.set(newValue) — set new value. signal.update(fn) — modify value with updater function.
## Computed
computed(() => expression) — create derived state that auto-updates when dependencies change. read with computed() — no subscription needed.
## NgRx (Alternative)
NgRx = Redux pattern for Angular. Store = single source of truth. Actions = describe what happened. Reducers = pure function that updates state. Effects = handle side effects.
## Comparison
Signals = simpler, built-in, great for local component state. NgRx = more powerful, better for complex global state with many components sharing data.**

---

## Tantangan

Tingkatkan state management: (1) buat store NgRx dengan Actions, Reducers, Effects untuk counter app, (2) implementasi localStorage persistence untuk signals state, (3) buat state management untuk shopping cart dengan add/remove/clear, (4) bandingkan performa Signals vs NgRx dengan Angular DevTools Profiler.

---

## Ringkasan

signal() = reactive state. computed() = derived state. update() = modify. NgRx = Redux pattern. Lanjut: testing.
