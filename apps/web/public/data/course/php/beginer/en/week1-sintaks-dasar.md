# Basic PHP Syntax — Server-Side Shop Ledger Book

> **Kategori:** PHP | **Level:** Beginner | **Minggu 1:** Sintaks Dasar
> **Prerequisites:** None — start from zero.

## Learning Objectives

- Install PHP `php -v`, `php -S localhost:8000`, `index.php` files start with `<?php`
- Variables `$name = "Budi"` (mandatory `$`), types `string/int/float/bool`, `echo` prints
- Concatenate with `"."` dot, interpolation `"Hello $name"` and `"Hello {$name}"`
- `var_dump` type checks

---

## Why This Matters (Non-IT)

PHP = the most common online-shop language (WordPress, stores). It runs on the server, not the browser — `<?php echo "Hello"; ?>` becomes HTML. Today build a receipt `<?php $total = 62000*2; echo "Rp $total"; ?>`.

---

## Program: First PHP Receipt

Save `receipt.php`

```php
<?php
$shopName = "Siti's Shop";
$customer = "Budi";
$riceKg = 2;
$pricePerKg = 12500;
$total = $riceKg * $pricePerKg;

echo "Shop: $shopName <br>";
echo "Customer: $customer <br>";
echo "Total: Rp " . number_format($total, 0, ',', '.') . "<br>";

echo "<br>=== Type Check ===<br>";
var_dump($shopName); // string
var_dump($riceKg);    // int
var_dump($total);      // int

$msg = "Hello $customer, your total Rp " . number_format($total, 0, ',', '.');
echo "<br>$msg<br>";

$customer = "Siti";
$total += 5000;
echo "After change: $customer, New total: Rp " . number_format($total, 0, ',', '.');
?>
```

**Run:**
- No server: `php receipt.php` in Terminal
- With server: `php -S localhost:8000` → open `http://localhost:8000/receipt.php`

---

## Key Concepts

### `<?php` + Mandatory `$`
Every PHP file starts with `<?php`, every variable `$name`. Forgetting `$` → error.

### `echo` + `.` Concatenation
`echo "Hello $name"` interpolates, `"Hello " . $name` dots. `number_format(62000)` → `62.000`.

### `var_dump` Checks
`var_dump($total)` shows `int(124000)`.

---

## Beginner Friendly Explanation

### Analogy: Server Ledger Book
- **PHP = ledger book in the warehouse (server)**, `echo` sends results to the showcase (browser).
- **`$` = price label**: every box needs `$`.

### Step 0 — Prepare Device
- PHP 8.1+ (`php -v`), file `receipt.php`, run `php receipt.php`.

### How the Computer Reads It
1. `<?php $total = 2 * 12500;` → server computes 25000.
2. `echo "Rp $total"` → sends text to browser.

### 3 Must-Know Terms
1. **$/echo/var_dump**: label/print/inspect

---

## Experiments

- **Green:** Change `$riceKg = 5` → new total?
- **Yellow:** Forget `$` (`total = 5`) → error? Add `$`.
- **Red:** `echo 'Hello $customer'` single quotes → literal `$customer`? Use double quotes.

---

## Challenge

**Delivery PHP:** `$weight=2.5; $dist=8; $fee = $weight*5000 + $dist*2000; echo "Rp " . number_format($fee);` + `var_dump($fee)`.

---

## Mini Glossary

- **$/echo/number_format**: label/print/format

---

## Summary

Week 1: **PHP Syntax** — `$` and `echo`. Next: **Operators & Control**.
