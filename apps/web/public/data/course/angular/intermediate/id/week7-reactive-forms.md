# Reactive Forms — Formulir Reaktif Angular (angular.dev)

> **Kategori:** Angular | **Level:** Menengah | **Minggu 7:** Reactive Forms
> **Prasyarat:** Minggu 6 — **Routing**.

## Tujuan Pembelajaran

- Buat `FormGroup` + `FormControl` di `component` (sumber: angular.dev/guide/forms/reactive-forms) — `new FormGroup({ nama: new FormControl('', Validators.required) })`
- Hubungkan `formGroup` di `template` + `formControlName="nama"` + `Validators` + `form.value` + `ngSubmit`

---

## Kenapa Ini Penting Buat Kamu?

Form warung tanpa validasi → pelanggan kirim nama kosong. Dengan `ReactiveForms` + `Validators.required`, tombol `Tambah` mati jika `nama` kosong — tidak perlu `if` manual.

---

## Program: Formulir Warung Reaktif (angular.dev)

```typescript
// component.ts — model-driven (angular.dev)
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-warung",
  imports: [ReactiveFormsModule],
  templateUrl: "./warung.component.html"
})
export class WarungComponent {
  warungForm = new FormGroup({
    nama: new FormControl("", [Validators.required, Validators.minLength(3)]),
    harga: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  tambah(){
    if(this.warungForm.valid){
      console.log(this.warungForm.value); // { nama: "Beras", harga: 62000 }
      this.warungForm.reset();
    }
  }
}
```

```html
<!-- warung.component.html — hubungkan -->
<form [formGroup]="warungForm" (ngSubmit)="tambah()">
  <label>Nama <input formControlName="nama" placeholder="Beras"></label>
  <p *ngIf="warungForm.get('nama')?.hasError('required')">Nama wajib</p>
  <label>Harga <input formControlName="harga" type="number"></label>
  <button [disabled]="warungForm.invalid">Tambah</button>
</form>
<p>Value: {{ warungForm.value | json }}</p>
```

**Sumber:** `angular.dev/guide/forms/reactive-forms` — `FormGroup`/`FormControl` + `Validators`.

---

## Konsep Kunci

### `FormGroup` + `FormControl` = Model
`new FormGroup({ nama: new FormControl('') })` di `component` → `formGroup` di `template` → `formControlName="nama"`.

### `Validators` + `form.value`/`valid`
`Validators.required` cek wajib, `warungForm.valid` true jika semua valid, `warungForm.value` = `{ nama, harga }`.

---

## Penjelasan untuk Pemula

### Analogi: Formulir Kertas dengan Stempel Valid

- **`FormGroup` = kertas formulir**: `nama` dan `harga` 2 kolom.
- **`FormControl` = kotak isian**: `new FormControl('', Validators.required)` kotak wajib.
- **`Validators` = satpam**: cek kosong → `hasError('required')` → tampil "Nama wajib".

### Langkah 0 — Device

Sudah siap dari W1: `ng new` + `ng serve` di `4200`, `ReactiveFormsModule` sudah `imports`.

### Cara Komputer Membaca

1. `warungForm = new FormGroup({ nama: new FormControl('') })` → buat model.
2. `[formGroup]="warungForm"` → hubungkan model ke `<form>`.
3. Ketik `Beras` → `FormControl` update → `warungForm.value` = `{ nama: "Beras" }`.

### 3 Istilah Wajib

1. **FormGroup/FormControl**: kertas/kotak
2. **Validators**: satpam
3. **formControlName**: hubungkan

---

## Eksperimen

- **Hijau:** Kosongkan `nama` → `warungForm.invalid` true → tombol mati?
- **Kuning:** `Validators.minLength(3)` → ketik "Ab" → error?
- **Merah:** Hapus `ReactiveFormsModule` di `imports` → `formGroup` error?

---

## Tantangan

**Warung Reaktif Lengkap:** `nama` `required` + `minLength(3)`, `harga` `required` + `min(1)`, `stok` `required`, tampil `*ngIf` error tiap field, `tambah()` `console.log` + `reset()`, `ng serve` screenshot.

---

## Glosarium Mini

- **FormGroup/FormControl/Validators**: kertas/kotak/satpam

---

## Ringkasan

Minggu 7 dari 12: **Formulir Reaktif** (Level: Menengah). Bisa `FormGroup` + `Validators` tanpa `if` manual. Minggu depan: **HttpClient**.
