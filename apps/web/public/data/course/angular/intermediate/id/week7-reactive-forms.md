# Reactive Forms

> **Kategori:** Angular | **Level:** Menengah | **Minggu 7:** Reactive Forms

## Tujuan Pembelajaran

- FormControl, FormGroup, FormArray
- FormBuilder untuk build form
- Validators: required, minLength, email
- Dynamic form: add/remove controls
- Custom validators

---

## Program: Form Dinamis

```typescript
// Reactive Forms: form logic di component class
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({ selector: 'app-form', template: '<form [formGroup]="form"><input formControlName="name"></form>' })
export class DynamicFormComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) { this.form = this.fb.group({ name: ['', Validators.required] }); }
}
console.log('Reactive Forms siap digunakan');
```

---

## Konsep Kunci

### FormControl
Single form control.

### FormGroup
Group of FormControls.

### FormBuilder
Service untuk build form.

---

## Eksperimen

- Buat custom validator
- Implementasikan async validator
- Buat multi-step reactive form
- Tambah cross-field validation

---

## Tantangan

Buat dynamic survey form: add/remove questions, validation, submit to API.

---

## Ringkasan

Minggu 7 dari 14: **Reactive Forms** (Level: Menengah). Minggu depan: **HTTP Client**.
