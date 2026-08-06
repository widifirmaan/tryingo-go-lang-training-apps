# Directives & Pipes

> **Kategori:** Angular | **Level:** Pemula | **Minggu 2:** Directives & Pipes

## Tujuan Pembelajaran

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

## Konsep Kunci

### Attribute Directives
ngClass = dynamic classes. ngStyle = dynamic styles.

### Structural Directives
*ngIf = conditional render. *ngFor = loop render.

### Pipes
Transform data: date, currency, uppercase, lowercase, json.

---

## Eksperimen

- Buat custom pipe
- Implementasikan ngClass conditional
- Gunakan multiple pipes
- Buat ngFor dengan trackBy

---

## Tantangan

Buat product list dengan filter, sorting, dan custom pipe untuk format harga.

---

## Ringkasan

Minggu 2 dari 14: **Directives & Pipes** (Level: Pemula). Minggu depan: **Services & DI**.
