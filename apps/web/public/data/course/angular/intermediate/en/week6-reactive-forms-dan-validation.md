# Reactive Forms: Strongly-Typed Forms, Validations & Custom Async Validators

> **Kategori:** Angular | **Level:** Dependency Injection, Reactive Forms & RxJS | **Minggu 6:** Reactive Forms: Strongly-Typed Forms, Validations & Custom Async Validators
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Strictly-Typed Reactive Forms delivering end-to-end compile-time safety across form controls
- Configure FormGroup and FormControl with nonNullable: true options preventing unexpected null states
- Deploy standard validators: Validators.required, minLength, maxLength, and regex patterns
- Render contextual field validation feedback strictly when inputs have been touched (.touched)
- Extract typed payload models via .getRawValue() retaining strict TypeScript contracts without type assertions

---

## Program: Emergency Patient Admission Form with Typed Reactive Forms & Validators

```typescript
// ============================================================================
// File: src/app/form-admisi-darurat.component.ts (Typed Reactive Forms Modern)
// ============================================================================
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-admisi-darurat',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="formAdmisi" (ngSubmit)="submitPendaftaran()" class="form-container">
      <h3>Pendaftaran Pasien Gawat Darurat</h3>

      <div class="field">
        <label>Nomor Induk Kependudukan (NIK - 16 Digit) *</label>
        <input type="text" formControlName="nik" placeholder="3201..." />
        @if (formAdmisi.controls.nik.touched && formAdmisi.controls.nik.errors?.['required']) {
          <small class="error">NIK wajib diisi!</small>
        }
        @if (formAdmisi.controls.nik.errors?.['minlength']) {
          <small class="error">NIK harus tepat 16 digit angka.</small>
        }
      </div>

      <div class="field">
        <label>Nama Lengkap Pasien *</label>
        <input type="text" formControlName="namaLengkap" />
      </div>

      <div class="field">
        <label>Golongan Darah:</label>
        <select formControlName="golonganDarah">
          <option value="A">Golongan Darah A</option>
          <option value="B">Golongan Darah B</option>
          <option value="AB">Golongan Darah AB</option>
          <option value="O">Golongan Darah O</option>
        </select>
      </div>

      <div class="field">
        <label>
          <input type="checkbox" formControlName="adaAlergiObat" />
          Memiliki Riwayat Alergi Obat Berat
        </label>
      </div>

      <button type="submit" [disabled]="formAdmisi.invalid" class="btn-submit">
        Konfirmasi Admisi Pasien
      </button>
    </form>
  `,
  styles: [`
    .form-container { max-width: 440px; margin: 20px auto; font-family: sans-serif; padding: 20px; border: 1px solid #cbd5e1; border-radius: 8px; background: white; }
    h3 { margin-top: 0; color: #b91c1c; }
    .field { margin-bottom: 14px; }
    label { display: block; font-size: 13px; font-weight: bold; margin-bottom: 4px; }
    input[type="text"], select { width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 4px; }
    .error { color: #dc2626; font-size: 12px; }
    .btn-submit { width: 100%; padding: 10px; background: #0f172a; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  `]
})
export class FormAdmisiDaruratComponent {
  // Strictly-Typed Reactive Form (TypeScript memeriksa kesesuaian tipe nilai form)
  readonly formAdmisi = new FormGroup({
    nik: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(16), Validators.maxLength(16)]
    }),
    namaLengkap: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    golonganDarah: new FormControl<'A' | 'B' | 'AB' | 'O'>('O', { nonNullable: true }),
    adaAlergiObat: new FormControl<boolean>(false, { nonNullable: true })
  });

  submitPendaftaran(): void {
    if (this.formAdmisi.invalid) return;

    // Nilai form memiliki tipe TypeScript yang akurat tanpa perlu casting 'as any'
    const payload = this.formAdmisi.getRawValue();
    console.log('[Admisi UGD] Memproses pendaftaran:', payload);
    alert(`Pasien ${payload.namaLengkap} (NIK: ${payload.nik}) berhasil didaftarkan ke sistem!`);
    this.formAdmisi.reset();
  }
}
```

---

## Key Concepts

### Why Angular Reactive Forms Lead the Industry
Unlike loose template-driven models or string-based form handlers, **Angular Reactive Forms embody structured programmatic architectures**:
1. **Strictly-Typed Controls**: In modern Angular, accessing `form.controls.nik.value` resolves deterministically as `string`, eliminating unvalidated `any` leaks!
2. **Synchronous & Asynchronous Validations**: You bind asynchronous validator observables verifying whether a national identity ID already exists in clinical databases before permitting submission (*Async Validators*).
3. **Headless Testability**: The underlying form model executes completely detached from the DOM, empowering lightning-fast headless unit testing.

---

---

## Beginner Friendly Explanation

### Analogy: Carbon-Copy Clinical Intake Templates
**Reactive Forms** are structured clinical intake templates: every field (Name, National ID, Blood Type) maintains explicit geometric constraints (the National ID section holds exactly 16 discrete boxes). If an admitting clerk leaves box 16 blank, intake systems halt processing until all validation criteria clear.

## Experiments

- Enter a 10-digit NIK to observe the minlength validation error fire reactively.
- Attempt submitting an empty form to observe button disabled state enforcement.
- Subscribe to formAdmisi.valueChanges observing telemetry streams in real time.
- Author a custom validator rejecting invalid dummy NIK inputs such as "0000000000000000".

---

## Challenge

Author a custom `birthDateValidator()` ensuring entered patient birth dates cannot reside in the future.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
```


---

## Common Pitfalls & Debugging Tips

### 1. RxJS Subscription Memory Leaks
- **Symptom / Issue:** Subscriptions lingering after component destruction cause memory bloat and duplicate work.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `takeUntilDestroyed()` or resolve observables directly via the template `async` pipe.

### 2. Suboptimal Default Change Detection
- **Symptom / Issue:** Forces Angular to verify every single component on every browser event.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Switch to `ChangeDetectionStrategy.OnPush` and adopt Angular Signals.

### 3. Bloated Shared Modules
- **Symptom / Issue:** Impairs code splitting and inflates initial JavaScript bundle size.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Adopt Standalone Components and import only specific directives into the `imports: []` array.

---

## Summary

You have mastered Strictly-Typed Reactive Forms and validations. Next week, we examine RxJS integration, HttpClient, and the toSignal() bridge.
