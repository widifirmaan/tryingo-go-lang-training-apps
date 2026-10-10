# State Management

> **Kategori:** Angular | **Level:** Menengah | **Minggu 10:** State Management

## Tujuan Pembelajaran

- NgRx: Store, Actions, Reducers
- Selectors untuk derived state
- Effects untuk side effects
- Angular Signals: signal, computed, effect
- Kapan pakai NgRx vs Signals

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

## Konsep Kunci

### NgRx
Redux pattern: unidirectional data flow.

### Signals
Reactive primitives: signal(), computed(), effect().

---

## Eksperimen

- Buat NgRx store dengan CRUD
- Implementasikan Signal-based state
- Buat custom selector
- Tambah effect untuk API call

---

## Tantangan

Buat shopping cart dengan Signals: add/remove items, total price, persist state.

---

## Ringkasan

Minggu 10 dari 14: **State Management** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Testing**.
