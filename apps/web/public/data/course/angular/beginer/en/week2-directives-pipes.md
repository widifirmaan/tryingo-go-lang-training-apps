# Directives & Pipes

## Why This Matters

Angular powers large internal enterprise applications - banks, insurance, healthcare - because its strict structure survives teams of dozens of developers. Thinking in clean architecture from day one means you already work the way real engineering teams do.

Practice program: *"List & Format"*. Run the code in the Playground to examine how it works.


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
  template: '<h2>Daftar Produk</h2><ul><li *ngFor="let p of products" [ngClass]="{'in-stock': p.available}">{{ p.name | uppercase }} - {{ p.price | currency:'IDR':'symbol':'1.0-0' }}</li></ul><p>Tanggal: {{ today | date:'fullDate' }}</p>',
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
