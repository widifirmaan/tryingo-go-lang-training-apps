# Directives & Pipes

> **Kategori:** Angular | **Level:** Beginner | **Minggu 2:** Directives & Pipes

## Learning Objectives

- Attribute directives: ngClass, ngStyle
- Structural directives: ngIf, ngFor
- Built-in pipes: date, currency, uppercase
- Custom pipe creation
- Pipe parameters: date:"fullDate"

---

## Program: List & Format

```typescript
// Directives = mengubah appearance/behavior DOM elements
import { Component } from '@angular/core';
@Component({
  selector: 'app-product-list',
  template: '<h2>Daftar Produk</h2><ul><li *ngFor="let p of products" [ngClass]="{'in-stock': p.available}">{{ p.name | uppercase }} — {{ p.price | currency:'IDR':'symbol':'1.0-0' }}</li></ul><p>Tanggal: {{ today | date:'fullDate' }}</p>',
})
export class ProductListComponent {
  today = new Date();
  products = [
    { name: 'Laptop', price: 15000000, available: true },
    { name: 'Mouse', price: 250000, available: false },
  ];
}
console.log('Directives & Pipes siap digunakan');
```

---

## Key Concepts

### Attribute Directives
ngClass, ngStyle for dynamic styling.

### Structural Directives
*ngIf, *ngFor for DOM manipulation.

### Pipes
Transform data for display.

---

## Experiments

- Create custom pipe
- Implement ngClass conditional
- Use multiple pipes
- Create ngFor with trackBy

---

## Challenge

Build a product list with filter, sorting, and custom pipe for price formatting.

---

## Summary

Week 2 of 14: **Directives & Pipes** (Level: Beginner). Next week: **Services & DI**.
