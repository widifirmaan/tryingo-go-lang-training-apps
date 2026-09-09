# Operators & Control — PHP Shop Branches and Scales

> **Kategori:** PHP | **Level:** Beginner | **Minggu 2:** Operator & Kontrol
> **Prerequisites:** Week 1 — **Basic PHP Syntax**.

## Learning Objectives

- Compute `+ - * / % **` and join text with `.` dot (source: php.net/manual/language.operators)
- Distinguish loose `==` vs strict `===` — `"62.000" == 62000` true but `===` false (source: php.net type-juggling)
- Branch `if / elseif / else`, `switch` with `break`, repeat `for`, `while`, `foreach` for arrays (source: php.net control-structures)

---

## Why This Matters (Non-IT)

Shop cashiers decide every transaction: **total > 100k → free delivery, stock 0 → "Gone"**. Without `if`, hand-write every case. Without `foreach`, count 30 items one by one. Misunderstanding `==` vs `===` → `"0" == false` true, discount leaks!

---

## Program: Automatic Shop Cashier

Save `cashier.php` → `php cashier.php` or `php -S localhost:8000` → open browser.

```php
<?php
$score = 85;
if ($score >= 90) echo "Grade A";
elseif ($score >= 80) echo "Grade B";
else echo "Grade C";
echo "\n";

// Beware == vs === (PHP juggling!)
$price = "62000";
if ($price == 62000) echo "== match (loose)\n";
if ($price === 62000) echo "=== match\n"; else echo "=== NO match (strict: string vs int)\n";

$day = "Friday";
switch ($day) {
  case "Friday": echo "Holiday tomorrow!\n"; break;
  case "Monday": echo "Go go!\n"; break;
  default: echo "Workday\n";
}

echo "Count: ";
for ($i = 1; $i <= 5; $i++) echo "$i ";
echo "\n";

$fruits = ["apple", "mango", "banana"];
foreach ($fruits as $no => $f) echo "$no: $f\n";

// Real: cart total of available items
$cart = [
  ["name"=>"Rice", "price"=>62000, "in"=>true],
  ["name"=>"Sugar", "price"=>15000, "in"=>false],
  ["name"=>"Oil", "price"=>34000, "in"=>true],
];
$total = 0;
foreach ($cart as $item) {
  if (!$item["in"]) continue;
  $total += $item["price"];
}
echo "Buyable total: Rp " . number_format($total, 0, ',', '.') . "\n";
?>
```

---

## Key Concepts

### `.` Joins Text (Not `+`)
`"Hello " . $name` — `+` in PHP is for numbers, never join text with `+`.

### `==` vs `===` (Juggling)
- `==` loose: `"62000" == 62000` → true (PHP auto-converts types).
- `===` strict: type + value must match. **For money & passwords, always `===`.**

### `elseif` One Word
PHP uses `elseif` (`else if` also works, but `elseif` is idiomatic).

### `foreach` = Check Racks
`foreach ($fruits as $f)` items directly, `foreach ($fruits as $i => $f)` with numbers.

---

## Beginner Friendly Explanation

### Analogy: Scales & Guards
- **`if` = guard**: "Total ≥100k? free delivery."
- **`switch` = day board**: Monday A, Friday B.
- **`foreach` = check racks**: take each item, weigh.

### Step 0 — Prepare Device
- Same as W1: `php -v` 8.1+, file `cashier.php`, `php cashier.php`.

### How the Computer Reads It
1. `if ($score >= 90)` → 85>=90? no → `elseif (85>=80)` yes → prints B → stops.
2. `foreach ($cart as $item)` → 3 loops, `continue` skips `in=false`.

### 3 Must-Know Terms
1. **Condition**: yes/no question
2. **Loop**: auto repeat
3. **Juggling**: PHP silently converts types (beware `==`)

---

## Experiments

- **Green:** `$score = 95` → grade? `$day = "Monday"` → what?
- **Yellow:** `"0" == false` → true? `"0" === false` → false? Try!
- **Red:** Delete `break` in Friday `switch` → leaks printing 2 lines? Reattach.

---

## Challenge

**Auto Discount:** `$total = 120000; if ($total >= 100000) $discount = $total*0.1; elseif ($total >= 50000) $discount = $total*0.05; else $discount = 0;` → print `Discount Rp ... Pay Rp ...` with `number_format`. Add a `foreach` over 5 items computing total first.
- **Link-up (Week 1 — Basic PHP Syntax):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **if/elseif/switch**: branches
- **for/foreach/while**: repeats
- **==/===**: loose/strict

---

## Summary

Week 2 of 6: **PHP Control** (Level: Beginner). Can branch, loop, and beware `==`. Next: **Functions** — reusable recipes.
