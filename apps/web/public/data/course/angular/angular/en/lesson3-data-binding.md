# Data Binding & Interpolation

> Angular | Lesson 3

## Learning Objectives

- Understand 4 types of data binding: interpolation, property, style, class\n- Use [class.className] for conditional class\n- Use [style.property] for inline style\n- Use [(ngModel)] for two-way data binding

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

## Explanation

## Types of Data Binding
1. Interpolation: {{ value }} — one-way, data to view. 2. Property Binding: [property]="value" — one-way, data to DOM property. 3. Event Binding: (event)="handler()" — one-way, DOM event to component. 4. Two-way Binding: [(ngModel)]="value" — both directions.
## Class Binding
[class.highlight]="condition" — toggle class based on condition. [class.active]="isActive" — more specific.
## Style Binding
[style.color]="warna" — set inline style dynamically. [style.fontSize.px]="size" — with unit.

---

## Experiments

1. **## Types of Data Binding
1. Interpolation: {{ value }} — one-way, data to view. 2. Property Binding: [property]="value" — one-way, data to DOM property. 3. Event Binding: (event)="handler()" — one-way, DOM event to component. 4. Two-way Binding: [(ngModel)]="value" — both directions.
## Class Binding
[class.highlight]="condition" — toggle class based on condition. [class.active]="isActive" — more specific.
## Style Binding
[style.color]="warna" — set inline style dynamically. [style.fontSize.px]="size" — with unit.**

---

## Challenge

Level up data binding: (1) create component with 3 inputs and 3 different output bindings, (2) add class binding with multiple conditions (class-red, class-blue, class-green), (3) create style binding with multiple properties (color, fontSize, fontWeight), (4) implement two-way binding with form input and display below.

---

## Summary

Interpolation = {{ }}. Property = []. Style = [style]. Class = [class]. Two-way = [(ngModel)]. Next: directives.
