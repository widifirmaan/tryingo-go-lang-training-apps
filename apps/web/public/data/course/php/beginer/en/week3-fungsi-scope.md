# Functions & Scope — Reusable PHP Shop Recipes

> **Kategori:** PHP | **Level:** Beginner | **Minggu 3:** Fungsi & Scope

## Learning Objectives

- `function greet($name){ return "Hello $name"; }` write once, call 100x (source: php.net/functions)
- `return` gives results, defaults `$name = "Guest"`, bulk `...$nums` + `array_sum`
- Scope: variables inside functions invisible outside (except `global`, avoid)

---

## Why This Matters (Non-IT)

The "total + discount + delivery" formula runs 30x daily. Without functions, write 30x and 1 typo ruins all. With `calcTotal($cart, 10)` write once — formula changes in 1 place.

---

## Program: Shop Function Kitchen

```php
<?php
function greet($name = "Guest") {
  return "Hello, $name! Happy shopping";
}
echo greet("Budi") . "\n";
echo greet() . "\n"; // uses default "Guest"

function total(...$nums) {
  return array_sum($nums); // bulk into array
}
echo "Total: " . total(1, 2, 3, 4, 5) . "\n";

function calcTotal($cart, $discount = 0) {
  $total = 0;
  foreach ($cart as $item) {
    $total += $item["price"] * $item["qty"];
  }
  return $total * (1 - $discount / 100);
}

$cart = [
  ["price" => 62000, "qty" => 1],
  ["price" => 5000, "qty" => 2],
];
echo "No discount: Rp " . number_format(calcTotal($cart), 0, ',', '.') . "\n";
echo "10% off: Rp " . number_format(calcTotal($cart, 10), 0, ',', '.') . "\n";

// Scope: $total inside differs from outside
$outsideTotal = 999;
echo "Outside stays: $outsideTotal\n";
?>
```

---

## Key Concepts

### `function` + `return` = Recipe + Dish
`function calcTotal($cart)` takes ingredients, `return` serves the dish. No `return` → `null`.

### Defaults & `...` (Variadic)
- `($name = "Guest")` fallback when unsent.
- `(...$nums)` gathers all into an array.

### Scope = Kitchen Walls
`$total` inside `calcTotal` differs from `$outsideTotal` — kitchen walls. Avoid `global` unless forced.

---

## Beginner Friendly Explanation

### Analogy: Kitchen Recipes
- **Function = recipe**: write "soto: chicken + spices → boil" once, cook 100 bowls `soto($chicken)`.
- **Parameter = ingredients**, **return = dish**, **default = spare spices**.

### Step 0 — Prepare Device
- Same as W1: `php -v`, file `kitchen.php`, `php kitchen.php`.

### How the Computer Reads It
1. `calcTotal($cart, 10)` → enters function, `$cart` = cart, `$discount` = 10.
2. Loops summing → `72000 * 0.9 = 64800` → `return` → prints.

### 3 Must-Know Terms
1. **Function**: reusable recipe
2. **Return**: result given back
3. **Scope**: variable territory

---

## Experiments

- **Green:** `greet("Siti")` → what? `total(10, 20)` → 30?
- **Yellow:** `calcTotal($cart, 20)` 20% off → how much?
- **Red:** Forget `return` in `greet` → prints empty (`null`). Add `return`.

---

## Challenge

**Complete Receipt:** Build `subtotal($cart)`, `delivery($weight, $dist)`, `printReceipt($cart, $weight, $dist)` combining all three + `greet($name)` → return receipt string. Call with 2 different carts.

---

## Mini Glossary

- **function/return**: recipe/result
- **default/...**: spare/bulk
- **scope**: kitchen walls

---

## Summary

Week 3 of 6: **PHP Functions** (Level: Beginner). Owns reusable recipes. Next: **Array** — dynamic racks.
