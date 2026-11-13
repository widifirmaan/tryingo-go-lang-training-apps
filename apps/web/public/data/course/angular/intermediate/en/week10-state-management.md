## Learning Objectives

- NgRx: Store, Actions, Reducers
- Selectors for derived state
- Effects for side effects
- Angular Signals: signal, computed, effect
- When to use NgRx vs Signals

---

## Program: Angular State Management

Signalized stores and computed kernels - modern state.

```typescript
import { Injectable, computed, signal, inject } from '@angular/core';

export interface CartItem { id: number; name: string; price: number; qty: number }

@Injectable({ providedIn: 'root' })
export class CartSignalStore {
  private readonly items = signal<CartItem[]>([]);
  private readonly coupon = signal<string | null>(null);

  readonly count = computed(() => this.items().reduce((n, i) => n + i.qty, 0));
  readonly total = computed(() => this.items().reduce((s, i) => s + i.price * i.qty, 0));
  readonly totalWithCoupon = computed(() => {
    const t = this.total();
    return this.coupon() === 'NG10' ? t * 0.9 : t;
  });

  add(item: Omit<CartItem, 'qty'>) {
    this.items.update((list) => {
      const i = list.findIndex((x) => x.id === item.id);
      if (i === -1) return [...list, { ...item, qty: 1 }];
      const copy = [...list];
      copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
      return copy;
    });
  }

  applyCoupon(code: string) { this.coupon.set(code.toUpperCase()); }
}

@Component({
  selector: 'app-cart-badge',
  standalone: true,
  template: `
    <span class="badge">{{ store.count() }} items - {{ store.totalWithCoupon() | currency }}</span>`,
})
export class CartBadgeComponent {
  protected store = inject(CartSignalStore);
}
```

---

## Key Concepts

### Signal semantics

signal().set/update butir halus; computed untuk derivasi; efek bisa dibroadcast - seirama zoneless.

### Service + DI

Store singleton via providedIn root; komponen inject; scope diatur DI.

### Immutable updates

update() menyalin array; identity berubah, change detection langsung tahu.

### Kapan cocok

Pas untuk state global coarse-grained; kombinasikan dengan RxJS untuk alur async yang kompleks.

---

## Experiments

- Add remove + total item count
- Coupon validation on application
- Persist cart signals to localStorage.

---

## Challenge

Build a cart summary grouped by category with collapse toggles, all computed.

---

## Summary

This week's material has been covered: Angular State Management. Continue to the following week to deepen.
