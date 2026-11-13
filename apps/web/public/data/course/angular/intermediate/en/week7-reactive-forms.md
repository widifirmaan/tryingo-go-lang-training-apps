# Reactive Forms

## Learning Objectives

- FormControl, FormGroup, FormArray
- FormBuilder for form building
- Validators: required, minLength, email
- Dynamic forms: add/remove controls
- Custom validators

---

## Program: Reactive Forms & Validation

FormControl with sync/async validators and typed forms.

```typescript
// checkout.component.ts
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule, FormBuilder, Validators, AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="name" placeholder="Name" />
      @if (form.controls.name.hasError('required')) { <small>Name required</small> }
      <input formControlName="coupon" />
      @if (form.controls.coupon.hasError('couponExpired')) { <small>Coupon expired</small> }
      <button [disabled]="form.pending || form.invalid">Pay</button>
    </form>`,
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    coupon: ['', [Validators.minLength(6), this.couponActive]],
  });

  couponActive(control: AbstractControl): ValidationErrors | null {
    const ok = control.value && !control.value.toUpperCase().includes('EXPIRED');
    return ok ? null : { couponExpired: true };
  }

  submit() {
    if (this.form.valid) {
      console.log('Order payload', this.form.value);
    }
  }
}
```

---

## Key Concepts

### Typed FormGroup

fb.group menginferensi tipe sehingga form.controls.name tetap typed di compile time.

### Sync vs async validators

Validator sinkron dijalankan langsung; validator async (cek kupon ke server) mengembalikan Promise/Observable.

### Control state

touched, dirty, valid, pending, disabled - template mengikat state ke pesan error dan CSS.

### FormArray & nested

FormArray untuk baris item; FormGroup bersarang untuk parent-child.

---

## Experiments

- Add a dynamic FormArray of order items with add/remove.
- Build an async validator checking a coupon via HTTP (mocked).
- Use patchValue to populate drafts.

---

## Challenge

Create a dynamic form builder driven by JSON schema with validation and nested child controls.

---

## Summary

This week's material has been covered: Reactive Forms & Validation. Continue to the following week to deepen.
