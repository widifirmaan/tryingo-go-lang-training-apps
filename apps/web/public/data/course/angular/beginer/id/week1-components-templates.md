# Components & Templates

> **Kategori:** Angular | **Level:** Pemula | **Minggu 1:** Components & Templates

## Tujuan Pembelajaran

- Memahami Angular sebagai platform web app
- Component: selector, template, class
- Interpolation: {{ }} untuk display data
- Event binding: (click)="method()"
- Structural directive: *ngIf, *ngFor

---

## Program: Halo Angular

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

## Konsep Kunci

### Component
Building block Angular. @Component decorator.

### Template
HTML + Angular syntax. Interpolation {{ }}, event binding ( ).

### Structural Directives
*ngIf = conditional. *ngFor = loop.

### Module
@NgModule mengorganisir components.

---

## Eksperimen

- Ubah property dan lihat template update
- Tambah method baru dengan event
- Buat conditional display
- Render list dengan *ngFor

---

## Tantangan

Buat counter app: increment, decrement, reset. Tampilkan pesan berbeda berdasarkan nilai.

---

## Ringkasan

Minggu 1 dari 14: **Components & Templates** (Level: Pemula). Minggu depan: **Directives & Pipes**.
