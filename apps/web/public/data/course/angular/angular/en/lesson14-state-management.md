# State Management (Signals & NgRx)

> Angular | Lesson 14

## Learning Objectives

- Understand Angular Signals for state management\n- Use signal() to create reactive state\n- Use computed() for derived state\n- Use update() to modify signal value

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

## Explanation

## Signals
signal(initialValue) — create reactive state. signal() — read current value. signal.set(newValue) — set new value. signal.update(fn) — modify value with updater function.
## Computed
computed(() => expression) — create derived state that auto-updates when dependencies change. read with computed() — no subscription needed.
## NgRx (Alternative)
NgRx = Redux pattern for Angular. Store = single source of truth. Actions = describe what happened. Reducers = pure function that updates state. Effects = handle side effects.
## Comparison
Signals = simpler, built-in, great for local component state. NgRx = more powerful, better for complex global state with many components sharing data.

---

## Experiments

1. **## Signals
signal(initialValue) — create reactive state. signal() — read current value. signal.set(newValue) — set new value. signal.update(fn) — modify value with updater function.
## Computed
computed(() => expression) — create derived state that auto-updates when dependencies change. read with computed() — no subscription needed.
## NgRx (Alternative)
NgRx = Redux pattern for Angular. Store = single source of truth. Actions = describe what happened. Reducers = pure function that updates state. Effects = handle side effects.
## Comparison
Signals = simpler, built-in, great for local component state. NgRx = more powerful, better for complex global state with many components sharing data.**

---

## Challenge

Level up state management: (1) create NgRx store with Actions, Reducers, Effects for counter app, (2) implement localStorage persistence for signals state, (3) create state management for shopping cart with add/remove/clear, (4) compare Signals vs NgRx performance with Angular DevTools Profiler.

---

## Summary

signal() = reactive state. computed() = derived state. update() = modify. NgRx = Redux pattern. Next: testing.
