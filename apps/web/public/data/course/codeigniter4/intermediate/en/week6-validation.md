# Validation — Official CI4 Form Guard

> **Kategori:** CodeIgniter | **Level:** Intermediate | **Minggu 6:** Validation & Form Handling

## Learning Objectives

- `$this->validate(['name' => 'required|min_length[3]'])` checks + `redirect()->back()->withInput()` returns input (source: codeigniter.com/user_guide/libraries/validation)
- `validation_list_errors()` displays + `old('name')` refills

---

## Why This Matters (Non-IT)

Without validation, empty names enter the DB → reports break. Without `withInput`, 1 failed column → 10 columns retyped (customers flee!). `min_length[3]` stops "X".

---

## Program: CI4 Shop Guard

```php
// Controller: app/Controllers/Products.php
public function save() {
  if (!$this->validate([
    'name' => 'required|min_length[3]',
    'price' => 'required|numeric|greater_than[0]',
  ])) {
    return redirect()->back()->withInput(); // return + errors!
  }
  (new \App\Models\ProductModel())->save($this->request->getPost());
  return redirect()->to('/products');
}
```

```php
<!-- View: show errors + old input -->
<?php if (session('errors')): ?>
  <ul><?php foreach (session('errors') as $e): ?><li><?= esc($e) ?></li><?php endforeach; ?></ul>
<?php endif; ?>
<form method="post" action="/products/save">
  <input name="name" value="<?= old('name') ?>" placeholder="Name">
  <input name="price" value="<?= old('price') ?>" placeholder="Price">
  <button>Save</button>
</form>
```

---

## Key Concepts

### `validate([...])` = Check At Once
`required|min_length[3]` piped rules. Fail → `false` + errors in session.

### `withInput()` + `old()` = No Retyping
Returns input → `old('name')` shows again.

---

## Beginner Friendly Explanation

### Analogy: Guard + Form Photocopy
- **validate = guard check**, **withInput = photocopy** of rejected forms (no refilling).

### Step 0 — Prepare Device
- Same as CI4 W1: `php spark serve` on `8080`.

### How the Computer Reads It
1. POST → `validate` → fail? Stores errors + input in session → `back()`.
2. View reads `session('errors')` + `old('name')`.

### 3 Must-Know Terms
1. **validate/withInput**: check/return
2. **old/errors**: old-input/wrong

---

## Experiments

- **Green:** Submit empty → errors + input returns?
- **Yellow:** `greater_than[0]` + price -5 → rejected?
- **Red:** Without `withInput` → input lost (annoying)? Attach it.

---

## Challenge

**Guarded Shop:** `name` + `price` + `stock` validation + error list + `old()` all + fail & pass screenshots.

---

## Mini Glossary

- **validate/withInput/old**: check/return/old-input

---

## Summary

Week 6 of 10: **Form Guard** (Level: Intermediate). Failures don't retype. Next: **Auth**.
