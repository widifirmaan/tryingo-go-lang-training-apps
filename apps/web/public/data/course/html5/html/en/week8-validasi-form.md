# Form Validation — Form Security Guard

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 8:** Validasi Form
> **Prerequisites:** Week 7 — **Forms & Input**.

## Learning Objectives

- `required`, `minlength`, `pattern`, `type="email"` browser validation without JS (MDN Constraint Validation)
- `novalidate` to disable, `:valid/:invalid` CSS

---

## Why This Matters (Non-IT)

Without `required`, customers submit empty names → orders fail. `pattern="[0-9]{12}"` blocks wrong WA numbers.

---

## Program: Shop Validation

```html
<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <label for="wa">WA (10-13 digits)</label>
  <input id="wa" name="wa" type="tel" pattern="[0-9]{10,13}" required placeholder="08123456789">

  <label for="name">Name (min 3)</label>
  <input id="name" name="name" type="text" minlength="3" required>

  <button type="submit">Order</button>
</form>
```

Try submitting empty → browser blocks red "Please fill out". Try letters in `wa` → blocked.

---

## Key Concepts

### `required` / `minlength` / `pattern` / `type`
`required` not-empty, `minlength="3"` min length, `pattern` regex rule, `type="email"` email shape.

### `novalidate` + `:valid/:invalid`
`novalidate` disables guard (for custom JS), `:valid/:invalid` green/red CSS hooks.

---

## Beginner Friendly Explanation

### Analogy: Security Guard at Door
- **`required` = guard**: "name please before entering". **`pattern` = ID check**: "WA must be digits".

### Step 0 — Prepare Device
- VS Code + browser, `validate.html`, submit empty → see browser's red warning.

### How the Computer Reads It
1. Submit → browser checks each rule (`required`, `pattern`).
2. Fail → blocks + red message; pass → sends.

### 3 Must-Know Terms
1. **required/pattern/novalidate**: guard/rule/disable

---

## Experiments

- **Green:** Submit empty → blocked red?
- **Yellow:** WA `abc` → blocked by `pattern`?
- **Red:** Add `novalidate` to `form` → guard off, empty submits? Remove it.

---

## Challenge

**Guarded Form:** `email` type, `wa` pattern digits, `name` minlength 3, all `required` + test each block.

---

## Mini Glossary

- **required/pattern**: guard/rule

---

## Summary

Week 8 of 14: **Form Guard** — `required` + `pattern`. Next: **Semantic HTML**.
