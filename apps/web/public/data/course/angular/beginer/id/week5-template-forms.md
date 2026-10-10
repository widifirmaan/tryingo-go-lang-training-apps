# Template-driven Forms

> **Kategori:** Angular | **Level:** Pemula | **Minggu 5:** Template-driven Forms

## Tujuan Pembelajaran

- NgModel untuk two-way binding
- Form validation: required, minlength, email
- ngForm untuk form state
- Error display dengan *ngIf
- ngSubmit untuk form submission

---

## Program: Form Validasi

```typescript
// Template-driven Forms: form logic di template
import { Component } from '@angular/core';
@Component({
  selector: 'app-register-form',
  template: '<form #form="ngForm" (ngSubmit)="onSubmit(form)"><input name="name" [(ngModel)]="model.name" #name="ngModel" required minlength="3" placeholder="Nama"><div *ngIf="name.invalid && name.touched"><span *ngIf="name.errors?.['required']">Wajib diisi</span></div><input name="email" [(ngModel)]="model.email" #email="ngModel" required email placeholder="Email"><button type="submit" [disabled]="form.invalid">Daftar</button></form>',
})
export class RegisterFormComponent {
  model = { name: '', email: '' };
  onSubmit(form: any) { if (form.valid) console.log('Data:', this.model); }
}
console.log('Template-driven Forms siap digunakan');
```

---

## Konsep Kunci

### NgModel
Two-way binding: [(ngModel)]="property".

### Validation
required, minlength, maxlength, pattern, email.

### Form State
ngForm: valid, invalid, touched, dirty.

---

## Eksperimen

- Tambah validasi custom
- Buat multi-step form
- Implementasikan async validation
- Buat reusable form component

---

## Tantangan

Buat registration form dengan validasi: nama, email, password, konfirmasi password.

---

## Ringkasan

Minggu 5 dari 14: **Template-driven Forms** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Routing**.
