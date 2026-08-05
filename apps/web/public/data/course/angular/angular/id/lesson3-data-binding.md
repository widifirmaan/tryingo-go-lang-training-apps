# Data Binding & Interpolation

> Angular | Pelajaran 3

## Tujuan Pembelajaran

- Memahami 4 jenis data binding: interpolation, property, style, class\n- Menggunakan [class.className] untuk conditional class\n- Menggunakan [style.property] untuk inline style\n- Menggunakan [(ngModel)] untuk two-way data binding

---

## Program: Angular

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div>
    <h1>{{ title }}</h1>
    <p [class.highlight]="isHighlighted">Text dengan class binding</p>
    <p [style.color]="warna">Text dengan style binding</p>
    <input [value]="nama" (input)="nama = $any($event.target).value">
    <p>Halo, {{ nama }}!</p>
  </div>`,
})
export class AppComponent {
  title = 'Data Binding';
  isHighlighted = true;
  warna = 'blue';
  nama = 'Dunia';
}

```

---

## Penjelasan

## Jenis Data Binding
1. Interpolation: {{ value }} — one-way, data ke view. 2. Property Binding: [property]="value" — one-way, data ke DOM property. 3. Event Binding: (event)="handler()" — one-way, DOM event ke komponen. 4. Two-way Binding: [(ngModel)]="value" — kedua arah.
## Class Binding
[class.highlight]="condition" — menambah/hapus class berdasarkan kondisi. [class.active]="isActive" — lebih spesifik.
## Style Binding
[style.color]="warna" — mengatur style inline dynamically. [style.fontSize.px]="size" — dengan unit.

---

## Eksperimen

1. **## Jenis Data Binding
1. Interpolation: {{ value }} — one-way, data ke view. 2. Property Binding: [property]="value" — one-way, data ke DOM property. 3. Event Binding: (event)="handler()" — one-way, DOM event ke komponen. 4. Two-way Binding: [(ngModel)]="value" — kedua arah.
## Class Binding
[class.highlight]="condition" — menambah/hapus class berdasarkan kondisi. [class.active]="isActive" — lebih spesifik.
## Style Binding
[style.color]="warna" — mengatur style inline dynamically. [style.fontSize.px]="size" — dengan unit.**

---

## Tantangan

Tingkatkan data binding: (1) buat komponen dengan 3 input dan 3 output binding berbeda, (2) tambah class binding dengan beberapa kondisi (class-merah, class-biru, class-hijau), (3) buat style binding dengan multiple properties (color, fontSize, fontWeight), (4) implementasi two-way binding dengan form input dan display di bawahnya.

---

## Ringkasan

Interpolation = {{ }}. Property = []. Style = [style]. Class = [class]. Two-way = [(ngModel)]. Lanjut: directives.
