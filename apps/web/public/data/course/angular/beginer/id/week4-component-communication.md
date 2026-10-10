# Component Communication

> **Kategori:** Angular | **Level:** Pemula | **Minggu 4:** Component Communication

## Tujuan Pembelajaran

- @Input: receive data dari parent
- @Output: emit event ke parent
- EventEmitter untuk custom events
- ViewChild untuk akses child component
- Service untuk sibling communication

---

## Program: Parent & Child

```typescript
// Component Communication: parent-child via @Input/@Output
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({ selector: 'app-product-card', template: '<div><h3>{{ name }}</h3><p>Rp {{ price | number }}</p><button (click)="onAddToCart()">Tambah</button></div>' })
export class ProductCardComponent {
  @Input() name = '';
  @Input() price = 0;
  @Output() addToCart = new EventEmitter<string>();
  onAddToCart() { this.addToCart.emit(this.name); }
}
@Component({ selector: 'app-product-list', template: '<h2>Katalog</h2><app-product-card *ngFor="let p of products" [name]="p.name" [price]="p.price" (addToCart)="handleAddToCart($event)"></app-product-card><p>Keranjang: {{ cart.length }}</p>' })
export class ProductListComponent {
  cart: string[] = [];
  products = [{ name: 'Laptop', price: 15000000 }, { name: 'Mouse', price: 250000 }];
  handleAddToCart(name: string) { this.cart.push(name); }
}
console.log('Component Communication siap digunakan');
```

---

## Konsep Kunci

### @Input
Parent ke child: [property]="value".

### @Output
Child ke parent: (event)="handler($event)".

### EventEmitter
@Output() name = new EventEmitter<Type>().

---

## Eksperimen

- Buat child component dengan @Input
- Implementasikan @Output event
- Gunakan ViewChild
- Buat shared service untuk siblings

---

## Tantangan

Buat shopping cart: ProductCard (child), ProductList (parent), CartService (shared).

---

## Ringkasan

Minggu 4 dari 14: **Component Communication** (Level: Pemula). Minggu depan: **Template-driven Forms**.
