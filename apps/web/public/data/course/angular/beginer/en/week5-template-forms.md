# Template Forms — Two-Way Angular Shop Forms

> **Kategori:** Angular | **Level:** Beginner | **Minggu 5:** Template Forms
> **Prerequisites:** Week 4 — **Component Communication**.

## Learning Objectives

- `FormsModule` + `[(ngModel)]` two-way string + mandatory `name` + `#f="ngForm"` + `required` (source: angular.dev/guide/forms/template-driven-forms)

---

## Why This Matters (Non-IT)

Without `ngModel`, grab inputs manually via `document.getElementById` (old-fashioned). With `[(ngModel)]`, typing ↔ variable automatically + button dies when `f.invalid` (no empty-check `if` needed).

---

## Program: Shop Add Form

```typescript
// app.module.ts (or imports when standalone)
import { FormsModule } from "@angular/forms";
// imports: [FormsModule]
```

```html
<form #f="ngForm" (ngSubmit)="add()">
  <input name="name" [(ngModel)]="name" required placeholder="Name" />
  <input name="price" [(ngModel)]="price" type="number" required min="1" />
  <button [disabled]="f.invalid">Add</button>
</form>
<p>Value: {{ name }} - {{ price }}</p>
```

```typescript
name = "";
price = 0;
add() { console.log(this.name, this.price); this.name = ""; }
```

---

## Key Concepts

### `[(ngModel)]` = Two-Way String (Banana in a Box)
`[ngModel]` displays + `(ngModelChange)` updates = `[()]`. Typing ↔ variable.

### `name` + `#f="ngForm"` = Requirement & Referee
`ngModel` must sit inside a `form` + have `name`. `#f="ngForm"` referee: `f.invalid` when a `required` is empty.

### `[disabled]="f.invalid"` = Smart Button
Auto-dies when the form is defective.

---

## Beginner Friendly Explanation

### Analogy: Carbon Forms
- **`ngModel` = carbon paper**: write on input, bleeds into variable (and back).

### Step 0 — Prepare Device
- Same as W1 + `FormsModule` in `imports` (forget = `Can't bind to 'ngModel'` error).

### How the Computer Reads It
1. Type "Rice" → `ngModelChange` → `name = "Rice"`.
2. Empty `required` → `f.invalid` true → button dead.

### 3 Must-Know Terms
1. **ngModel/[()]/name**: string/two-way/required
2. **ngForm/invalid**: referee/defective

---

## Experiments

- **Green:** Type name → `{{ name }}` follows?
- **Yellow:** Empty it → button dies?
- **Red:** Delete `name="name"` → `If ngModel is used within a form tag` error? Reattach.

---

## Challenge

**Complete Shop Form:** `name` + `price` + `stock` (`required`, `min`) + smart button + `add()` pushing to `list` + `*ngFor` display. **Beginner Angular DONE!**

---

## Mini Glossary

- **ngModel/ngForm/required**: string/referee/required

---

## Summary

Week 5 of 5: **Two-Way Forms** (Level: Beginner). **Beginner Angular DONE!** Next: **Router** (Intermediate).
