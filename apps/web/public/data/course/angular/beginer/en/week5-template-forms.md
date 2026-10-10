# Template-driven Forms

> **Kategori:** Angular | **Level:** Beginner | **Minggu 5:** Template-driven Forms

## Learning Objectives

- NgModel for two-way binding
- Form validation: required, minlength, email
- ngForm for form state
- Error display with *ngIf
- ngSubmit for form submission

---

## Program: Form Validation

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

## Key Concepts

### NgModel
Two-way binding.

### Validation
Built-in validators.

### Form State
valid, invalid, touched, dirty.

---

## Experiments

- Add custom validation
- Create multi-step form
- Implement async validation
- Create reusable form component

---

## Challenge

Build a registration form with validation: name, email, password, confirm password.

---

## Summary

Week 5 of 14: **Template-driven Forms** (Level: Beginner). Beginner phase complete! Next week: **Routing**.
