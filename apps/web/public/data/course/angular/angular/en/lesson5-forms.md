# Forms (Template-driven & Reactive)

> Angular | Lesson 5

## Learning Objectives

- Understand template-driven vs reactive forms\n- Use ngModel for template-driven forms\n- Use FormBuilder and FormGroup for reactive forms\n- Use Validators for form validation

---

## Program: Angular

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `<div>
    <h2>Template-driven Form</h2>
    <form #f="ngForm" (ngSubmit)="onSubmit(f)">
      <input name="nama" [(ngModel)]="nama" required #namaInput="ngModel">
      <span *ngIf="namaInput.invalid && namaInput.touched">Nama wajib diisi</span>
      <button type="submit" [disabled]="f.invalid">Kirim</button>
    </form>

    <h2>Reactive Form</h2>
    <form [formGroup]="form" (ngSubmit)="onReactiveSubmit()">
      <input formControlName="nama">
      <span *ngIf="form.get('nama')?.invalid && form.get('nama')?.touched">Nama wajib</span>
      <button type="submit" [disabled]="form.invalid">Kirim</button>
    </form>
  </div>`,
})
export class AppComponent {
  nama = '';
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nama: ['', Validators.required],
    });
  }

  onSubmit(form: any): void {
    console.log('Template-driven:', form.value);
  }

  onReactiveSubmit(): void {
    console.log('Reactive:', this.form.value);
  }
}

```

---

## Explanation

## Template-driven Forms
#f="ngForm" — reference to form directive. (ngSubmit)="onSubmit(f)" — submit handler. [(ngModel)]="nama" — two-way binding. required — built-in validator.
## Reactive Forms
FormBuilder — service to create FormGroup. FormGroup — groups FormControls. Validators.required — required validator.
## Validators
required, minLength(3), maxLength(255), email, pattern. Custom validator: function that returns validation error or null.
## Comparison
Template-driven: simpler, good for simple forms. Reactive: more control, good for complex forms. Both can be used in same app.

---

## Experiments

1. **## Template-driven Forms
#f="ngForm" — reference to form directive. (ngSubmit)="onSubmit(f)" — submit handler. [(ngModel)]="nama" — two-way binding. required — built-in validator.
## Reactive Forms
FormBuilder — service to create FormGroup. FormGroup — groups FormControls. Validators.required — required validator.
## Validators
required, minLength(3), maxLength(255), email, pattern. Custom validator: function that returns validation error or null.
## Comparison
Template-driven: simpler, good for simple forms. Reactive: more control, good for complex forms. Both can be used in same app.**

---

## Challenge

Level up forms: (1) create registration form with email and password confirmation validation, (2) create custom validator for username that checks duplicates, (3) add form array for dynamic list input, (4) implement multi-step form wizard with next/prev navigation.

---

## Summary

Template-driven = simple ngModel. Reactive = FormBuilder full control. Validators = validation. Next: services.
