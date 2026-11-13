# State Management

## Tujuan Pembelajaran

- NgRx: Store, Actions, Reducers
- Selectors untuk derived state
- Effects untuk side effects
- Angular Signals: signal, computed, effect
- Kapan pakai NgRx vs Signals

---

## Program: State management dalam Angular

Signal store + service: state global modern tanpa NgRx.

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

## Konsep Kunci

### Signal semantics

signal().set/update butir halus; computed untuk derivasi; efek bisa dibroadcast - seirama zoneless.

### Service + DI

Store singleton via providedIn root; komponen inject; scope diatur DI.

### Immutable updates

update() menyalin array; identity berubah, change detection langsung tahu.

### Kapan cocok

Pas untuk state global coarse-grained; kombinasikan dengan RxJS untuk alur async yang kompleks.

---

## Eksperimen

- Tambah remove + hitung total item.
- Validasi kupon saat applyCoupon.
- Persist cart signals ke localStorage.

---

## Tantangan

Buat ringkasan keranjang per kategori produk yang bisa dilipat, semuanya computed.

---

## Ringkasan

Materi minggu ini telah dibahas: State management dalam Angular. Lanjut ke pekan berikutnya untuk memperdalam.
