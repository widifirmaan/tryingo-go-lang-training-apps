# Reactive Forms — Reactive Angular Forms (angular.dev)

> **Kategori:** Angular | **Level:** Intermediate | **Minggu 7:** Reactive Forms

## Learning Objectives

- Build `FormGroup` + `FormControl` in the `component` (source: angular.dev/guide/forms/reactive-forms) — `new FormGroup({ name: new FormControl('', Validators.required) })`
- Connect `formGroup` in `template` + `formControlName="name"` + `Validators` + `form.value` + `ngSubmit`

---

## Why This Matters (Non-IT)

A shop form without validation → customers submit empty names. With `ReactiveForms` + `Validators.required`, the `Add` button dies when `name` is empty — no manual `if` needed.

---

## Program: Reactive Shop Form (angular.dev)

```typescript
// component.ts — model-driven (angular.dev)
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-shop",
  imports: [ReactiveFormsModule],
  templateUrl: "./shop.component.html"
})
export class ShopComponent {
  shopForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  add(){
    if(this.shopForm.valid){
      console.log(this.shopForm.value); // { name: "Rice", price: 62000 }
      this.shopForm.reset();
    }
  }
}
```

```html
<!-- shop.component.html — connect -->
<form [formGroup]="shopForm" (ngSubmit)="add()">
  <label>Name <input formControlName="name" placeholder="Rice"></label>
  <p *ngIf="shopForm.get('name')?.hasError('required')">Name required</p>
  <label>Price <input formControlName="price" type="number"></label>
  <button [disabled]="shopForm.invalid">Add</button>
</form>
<p>Value: {{ shopForm.value | json }}</p>
```

**Source:** `angular.dev/guide/forms/reactive-forms` — `FormGroup`/`FormControl` + `Validators`.

---

## Key Concepts

### `FormGroup` + `FormControl` = Model
`new FormGroup({ name: new FormControl('') })` in `component` → `formGroup` in `template` → `formControlName="name"`.

### `Validators` + `form.value`/`valid`
`Validators.required` checks required, `shopForm.valid` true when all valid, `shopForm.value` = `{ name, price }`.

---

## Beginner Friendly Explanation

### Analogy: Paper Form with Valid Stamps

- **`FormGroup` = paper form**: `name` and `price` 2 columns.
- **`FormControl` = fill box**: `new FormControl('', Validators.required)` required box.
- **`Validators` = guard**: checks empty → `hasError('required')` → shows "Name required".

### Step 0 — Prepare Device

Ready from W1: `ng new` + `ng serve` on `4200`, `ReactiveFormsModule` already in `imports`.

### How the Computer Reads It

1. `shopForm = new FormGroup({ name: new FormControl('') })` → builds the model.
2. `[formGroup]="shopForm"` → connects the model to `<form>`.
3. Type `Rice` → `FormControl` updates → `shopForm.value` = `{ name: "Rice" }`.

### 3 Must-Know Terms

1. **FormGroup/FormControl**: paper/box
2. **Validators**: guard
3. **formControlName**: connect

---

## Experiments

- **Green:** Empty `name` → `shopForm.invalid` true → button dead?
- **Yellow:** `Validators.minLength(3)` → type "Ab" → error?
- **Red:** Remove `ReactiveFormsModule` from `imports` → `formGroup` error?

---

## Challenge

**Complete Reactive Shop:** `name` `required` + `minLength(3)`, `price` `required` + `min(1)`, `stock` `required`, `*ngIf` error per field, `add()` `console.log` + `reset()`, `ng serve` screenshot.

---

## Glosarium Mini

- **FormGroup/FormControl/Validators**: paper/box/guard

---

## Ringkasan

Week 7 of 12: **Reactive Forms** (Level: Intermediate). Can do `FormGroup` + `Validators` without manual `if`. Next: **HttpClient**.
