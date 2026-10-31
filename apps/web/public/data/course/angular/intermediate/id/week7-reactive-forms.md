# Reactive Forms

> **Kategori:** Angular | **Level:** Menengah | **Minggu 7:** Reactive Forms

## Tujuan Pembelajaran

- FormControl, FormGroup, FormArray
- FormBuilder untuk build form
- Validators: required, minLength, email
- Dynamic form: add/remove controls
- Custom validators

---

## Program: Reactive Forms & Validation

FormControl + validator sync/async arg; typed forms.

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
      <input formControlName="name" placeholder="Nama" />
      @if (form.controls.name.hasError('required')) { <small>Nama wajib</small> }
      <input formControlName="coupon" />
      @if (form.controls.coupon.hasError('couponExpired')) { <small>Kupon kedaluwarsa</small> }
      <button [disabled]="form.pending || form.invalid">Bayar</button>
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

## Konsep Kunci

### Typed FormGroup

fb.group menginferensi tipe sehingga form.controls.name tetap typed di compile time.

### Sync vs async validators

Validator sinkron dijalankan langsung; validator async (cek kupon ke server) mengembalikan Promise/Observable.

### Control state

touched, dirty, valid, pending, disabled — template mengikat state ke pesan error dan CSS.

### FormArray & nested

FormArray untuk baris item; FormGroup bersarang untuk parent-child.

---

## Eksperimen

- Tambahkan FormArray dinamis item order: tombol push + remove.
- Buat async validator cek kupon via http (mocked).
- Gunakan patchValue + reset untuk mengisi draft.

---

## Tantangan

Buat dynamic form builder yang membaca schema JSON lalu merender kontrol dan validator-nya.

---

## Ringkasan

Materi minggu ini telah dibahas: Reactive Forms & Validation. Lanjut ke pekan berikutnya untuk memperdalam.
