# Forms (Template-driven & Reactive)

> Angular | Pelajaran 5

## Tujuan Pembelajaran

- Memahami perbedaan template-driven dan reactive forms\n- Menggunakan ngModel untuk template-driven forms\n- Menggunakan FormBuilder dan FormGroup untuk reactive forms\n- Menggunakan Validators untuk validasi form

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

## Penjelasan

## Template-driven Forms
#f="ngForm" — reference ke form directive. (ngSubmit)="onSubmit(f)" — submit handler. [(ngModel)]="nama" — two-way binding. required — built-in validator.
## Reactive Forms
FormBuilder — service untuk membuat FormGroup. FormGroup — mengelompokkan FormControl. Validators.required — validasi wajib diisi.
## Validators
required, minLength(3), maxLength(255), email, pattern. Custom validator: function that returns validation error or null.
## Comparison
Template-driven: simpler, good for simple forms. Reactive: more control, good for complex forms. Both can be used in same app.

---

## Eksperimen

1. **## Template-driven Forms
#f="ngForm" — reference ke form directive. (ngSubmit)="onSubmit(f)" — submit handler. [(ngModel)]="nama" — two-way binding. required — built-in validator.
## Reactive Forms
FormBuilder — service untuk membuat FormGroup. FormGroup — mengelompokkan FormControl. Validators.required — validasi wajib diisi.
## Validators
required, minLength(3), maxLength(255), email, pattern. Custom validator: function that returns validation error or null.
## Comparison
Template-driven: simpler, good for simple forms. Reactive: more control, good for complex forms. Both can be used in same app.**

---

## Tantangan

Tingkatkan forms: (1) buat form registrasi dengan validasi email dan password confirmation, (2) buat custom validator untuk username yang cek duplikat, (3) tambah form array untuk dynamic list input, (4) implementasi form wizard multi-step dengan navigasi next/prev.

---

## Ringkasan

Template-driven = ngModel sederhana. Reactive = FormBuilder kontrol penuh. Validators = validasi. Lanjut: services.
