# PHPUnit Testing — Real Taste-Test

> **Kategori:** PHP | **Level:** Intermediate | **Minggu 10:** Testing dengan PHPUnit

## Learning Objectives

- `composer require --dev phpunit/phpunit` + `./vendor/bin/phpunit` truly runs (source: phpunit.de)
- `TestCase` + `assertEquals` + `expectException` (not `echo` simulation!)

---

## Why This Matters (Non-IT)

`echo` simulation catches no bugs (always "passes" since never machine-checked). Real PHPUnit: change formula → red → fix. Without it, "testing" is decoration.

---

## Program: Real PHPUnit Taste-Test

```bash
composer require --dev phpunit/phpunit
```

```php
// src/Cashier.php (from W9)
<?php
namespace App;
class Cashier {
  public function total(array $items): int {
    $s = 0;
    foreach ($items as $i) $s += $i["price"] * $i["qty"];
    return $s;
  }
  public function divide(float $a, float $b): float {
    if ($b == 0) throw new \InvalidArgumentException("Can't divide by 0");
    return $a / $b;
  }
}
```

```php
// tests/CashierTest.php — *Test.php NAME!
<?php
use PHPUnit\Framework\TestCase;
use App\Cashier;

class CashierTest extends TestCase {
  public function testTotal(): void {
    $k = new Cashier();
    $this->assertEquals(72000, $k->total([["price"=>62000,"qty"=>1],["price"=>5000,"qty"=>2]]));
  }

  public function testDivideZero(): void {
    $this->expectException(\InvalidArgumentException::class);
    (new Cashier())->divide(10, 0);
  }
}
```

```bash
./vendor/bin/phpunit tests
# OK (2 tests, 3 assertions) — GREEN for real
```

---

## Key Concepts

### `TestCase` + `assertEquals` = Machine Taste
`assertEquals(72000, result)` — mismatch → red + wrong line.

### `expectException` = Expect Explosion
Tests `divide(10,0)` MUST explode `InvalidArgumentException`.

---

## Beginner Friendly Explanation

### Analogy: Kitchen Taste
- **Test = taste**: cook → machine tastes → fits? Serve.

### Step 0 — Prepare Device
- `composer require --dev phpunit/phpunit` + `tests/` folder.

### How the Computer Reads It
1. `./vendor/bin/phpunit tests` → finds `*Test.php` → runs `test*` → reports green/red.

### 3 Must-Know Terms
1. **TestCase/assert**: test-kitchen/taste

---

## Experiments

- **Green:** Change `total` to `-` → red? Fix it.
- **Yellow:** Remove `expectException` → `divide(10,0)` test errors (not passes)?
- **Red:** File `CashierTry.php` (no Test) → not run? Rename to `CashierTest.php`.

---

## Challenge

**Tested Shop:** `Cashier::discount($total, $pct)` + 3 tests (normal/0%/100%) → `./vendor/bin/phpunit` GREEN 5/5.

---

## Mini Glossary

- **PHPUnit/TestCase/assert**: test-kitchen/taste

---

## Summary

Week 10 of 12: **Real Tasting** (Level: Intermediate). No simulation. Next: **Patterns**.
