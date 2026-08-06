# Component Communication

> **Kategori:** Angular | **Level:** Beginner | **Minggu 4:** Component Communication

## Learning Objectives

- @Input: receive data from parent
- @Output: emit event to parent
- EventEmitter for custom events
- ViewChild for child access
- Service for sibling communication

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

## Key Concepts

### @Input
Parent to child data flow.

### @Output
Child to parent event flow.

### EventEmitter
Custom event emission.

---

## Experiments

- Create child component with @Input
- Implement @Output event
- Use ViewChild
- Create shared service for siblings

---

## Challenge

Build a shopping cart: ProductCard (child), ProductList (parent), CartService (shared).

---

## Summary

Week 4 of 14: **Component Communication** (Level: Beginner). Next week: **Template-driven Forms**.
