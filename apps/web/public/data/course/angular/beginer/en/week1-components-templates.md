# Components & Templates

> **Kategori:** Angular | **Level:** Beginner | **Minggu 1:** Components & Templates

## Learning Objectives

- Understand Angular as web app platform
- Component: selector, template, class
- Interpolation: {{ }} for data display
- Event binding: (click)="method()"
- Structural directive: *ngIf, *ngFor

---

## Program: Hello Angular

```typescript
// Angular = platform untuk membangun mobile dan desktop web apps
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: '<h1>Halo, {{ name }}!</h1><button (click)="greet()">Klik</button><p *ngIf="showMessage">{{ message }}</p>',
})
export class AppComponent {
  name = 'Tryngo';
  message = 'Tombol diklik!';
  showMessage = false;
  greet() { this.showMessage = true; console.log('Halo dari Angular!'); }
}
console.log('Angular app siap dijalankan');
```

---

## Key Concepts

### Component
Building block with @Component.

### Template
HTML + Angular syntax.

### Structural Directives
*ngIf conditional, *ngFor loop.

### Module
@NgModule organizes components.

---

## Experiments

- Change property and observe template update
- Add new method with event
- Create conditional display
- Render list with *ngFor

---

## Challenge

Build a counter app: increment, decrement, reset. Show different messages based on value.

---

## Summary

Week 1 of 14: **Components & Templates** (Level: Beginner). Next week: **Directives & Pipes**.
