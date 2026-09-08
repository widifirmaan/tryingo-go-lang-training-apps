# Form Handling — Accept PHP Shop Orders

> **Kategori:** PHP | **Level:** Beginner | **Minggu 6:** Form Handling & Validasi

## Learning Objectives

- `$_POST["name"]` receives form posts, `htmlspecialchars(trim())` cleans, `empty()`/`filter_var($email, FILTER_VALIDATE_EMAIL)` validates (source: php.net/reserved.variables + filter)
- `password_hash()` for passwords, never store raw

---

## Why This Matters (Non-IT)

Without validation, customers submit empty names → orders fail. Without `htmlspecialchars`, hackers submit `<script>` → shop web hijacked (XSS). `filter_var` email stops `budi@gmaill` typos.

---

## Program: Safe Order Form

`order.php` (1 file: form + process):

```php
<?php
$errors = [];
$name = $wa = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = htmlspecialchars(trim($_POST["name"] ?? ""), ENT_QUOTES, 'UTF-8');
  $wa = trim($_POST["wa"] ?? "");

  if (empty($name)) $errors[] = "Name is required";
  elseif (strlen($name) < 3) $errors[] = "Name min 3 letters";

  if (empty($wa)) $errors[] = "WA is required";
  elseif (!preg_match('/^[0-9]{10,13}$/', $wa)) $errors[] = "WA must be 10-13 digits";
}
?>
<form method="post">
  Name: <input name="name" value="<?= $name ?>"><br>
  WA: <input name="wa" value="<?= $wa ?>"><br>
  <button>Order</button>
</form>
<?php if ($_SERVER["REQUEST_METHOD"] === "POST"): ?>
  <?php if (empty($errors)): ?>
    <p>Order <?= $name ?> (<?= $wa ?>) received!</p>
  <?php else: ?>
    <ul><?php foreach ($errors as $e) echo "<li>$e</li>"; ?></ul>
  <?php endif; ?>
<?php endif; ?>
```

Run `php -S localhost:8000` → open `http://localhost:8000/order.php` → try empty submit.

---

## Key Concepts

### `$_POST`/`$_GET` = Delivery Envelopes
`method="post"` → `$_POST["name"]`. `$_POST["x"] ?? ""` safe when missing.

### `htmlspecialchars(trim())` = Wash Hands
`trim` trims spaces, `htmlspecialchars` turns `<` into `&lt;` — anti XSS.

### Photo Upload (`$_FILES`) — Transfer Proof!
```html
<!-- MANDATORY enctype! without it files never send -->
<form method="post" enctype="multipart/form-data">
  <input type="file" name="proof" accept="image/*">
  <button>Send</button>
</form>
```
```php
<?php
if (isset($_FILES["proof"]) && $_FILES["proof"]["error"] === UPLOAD_ERR_OK) {
  $src = $_FILES["proof"]["tmp_name"]; // file in temp warehouse
  $dst = "uploads/" . basename($_FILES["proof"]["name"]);
  move_uploaded_file($src, $dst); // MOVE (not copy!) → safe
  echo "Saved: $dst";
}
// Check: ["error"] (0 = OK), ["size"] 2MB cap, ["type"] image/jpeg
?>
```

### `filter_var` + `preg_match` = Guards
`filter_var($email, FILTER_VALIDATE_EMAIL)` checks email, `preg_match('/^[0-9]{10,13}$/', $wa)` checks WA digits.

---

## Beginner Friendly Explanation

### Analogy: Cashier Takes Orders
- **Form = order paper**, **$_POST = envelope to kitchen**, **validation = cashier checks** ("empty name? reject").
- **htmlspecialchars = wash hands**: clean before cooking.

### Step 0 — Prepare Device
- `php -S localhost:8000` → `http://localhost:8000/order.php`.

### How the Computer Reads It
1. Browser sends `name=Budi&wa=0812` → PHP fills `$_POST`.
2. `trim` + `htmlspecialchars` → `empty` checks → pass shows "received".

### 3 Must-Know Terms
1. **$_POST/$_GET**: send envelopes
2. **Sanitize/validate**: wash/check
3. **XSS**: script injection (enemy)

---

## Experiments

- **Green:** Submit name "Bo" → "min 3 letters" error?
- **Yellow:** WA "abc" → digit error?
- **Red:** Name `<b>Budi</b>` → shows raw `&lt;b&gt;` (safe, not bold)?

---

## Challenge

**Complete Shop Form:** Add `email` (`filter_var`), numeric `qty` (`>= 1`), show receipt `name x qty = total` when passing, error list when not. **Beginner PHP DONE!**

---

## Mini Glossary

- **$_POST/$_GET**: posts
- **htmlspecialchars/trim**: wash
- **filter_var/preg_match**: pattern guards

---

## Summary

Week 6 of 6: **Safe Forms** (Level: Beginner). Can receive & validate orders. **Beginner PHP DONE!** Next: **Laravel** — sell-ready PHP.
