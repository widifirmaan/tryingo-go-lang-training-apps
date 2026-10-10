# Reactive Forms

> **Kategori:** Angular | **Level:** Intermediate | **Minggu 7:** Reactive Forms

## Learning Objectives

- FormControl, FormGroup, FormArray
- FormBuilder for form building
- Validators: required, minLength, email
- Dynamic forms: add/remove controls
- Custom validators

---

## Program: Dynamic Forms

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

## Key Concepts

### FormControl
Single control.

### FormGroup
Group of controls.

### FormBuilder
Service for building forms.

---

## Experiments

- Create custom validator
- Implement async validator
- Create multi-step reactive form
- Add cross-field validation

---

## Challenge

Build a dynamic survey form: add/remove questions, validation, submit to API.

---

## Summary

Week 7 of 14: **Reactive Forms** (Level: Intermediate). Next week: **HTTP Client**.
