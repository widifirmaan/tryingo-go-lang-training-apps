# State Management

> **Kategori:** Angular | **Level:** Intermediate | **Minggu 10:** State Management

## Learning Objectives

- NgRx: Store, Actions, Reducers
- Selectors for derived state
- Effects for side effects
- Angular Signals: signal, computed, effect
- When to use NgRx vs Signals

---

## Program: NgRx & Signals

```typescript
// State Management: NgRx & Angular Signals
import { signal, computed, effect } from '@angular/core';
const count = signal(0);
const doubled = computed(() => count() * 2);
effect(() => { console.log('Count:', count()); });
// count.set(5);
console.log('State Management siap digunakan');
```

---

## Key Concepts

### NgRx
Redux pattern.

### Signals
Reactive primitives.

---

## Experiments

- Create NgRx store with CRUD
- Implement Signal-based state
- Create custom selector
- Add effect for API call

---

## Challenge

Build a shopping cart with Signals: add/remove items, total price, persist state.

---

## Summary

Week 10 of 14: **State Management** (Level: Intermediate). Intermediate phase complete! Next week: **Testing**.
