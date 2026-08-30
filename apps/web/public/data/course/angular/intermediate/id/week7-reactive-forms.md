# Reactive Forms — Formulir Reaktif Angular

> **Kategori:** Angular | **Level:** Menengah | **Minggu 7:** Reactive Forms

## Tujuan Pembelajaran

- `FormControl`, `FormGroup`, `Validators.required`, `form.value` — formulir yang validasi otomatis

---

## Program: Form Warung

```typescript
// component.ts
import { FormControl, FormGroup, Validators } from "@angular/forms";
form = new FormGroup({
  nama: new FormControl("", Validators.required),
  harga: new FormControl(0, [Validators.required, Validators.min(1)])
});
submit(){ if(this.form.valid) console.log(this.form.value); }

// template.html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="nama" placeholder="Nama" />
  <input formControlName="harga" type="number" />
  <button [disabled]="form.invalid">Tambah</button>
</form>
<p *ngIf="form.get('nama')?.hasError('required')">Nama wajib</p>
```

---

## Ringkasan

Minggu 7: **Formulir Reaktif** — `FormGroup` + `Validators`.
