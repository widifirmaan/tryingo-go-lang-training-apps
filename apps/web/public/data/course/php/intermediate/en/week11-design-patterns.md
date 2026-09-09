# Design Patterns — Neat PHP Shop Patterns

> **Kategori:** PHP | **Level:** Intermediate | **Minggu 11:** Design Patterns
> **Prerequisites:** Week 10 — **PHPUnit Testing**.

## Learning Objectives

- `Singleton` 1 cashier (`private __construct` + `getInstance()`), `Factory` factory `make()` (source: refactoring.guru/design-patterns/php)
- `Strategy` swaps payment ways without 20x `if`

---

## Why This Matters (Non-IT)

Cash/transfer/QRIS payments with 20x `if` → adding QRIS edits 20 places. With `Strategy`, add 1 class. `Singleton` prevents 2 DB connections fighting.

---

## Program: Shop Payment Patterns

```php
<?php
// Strategy: 1 door, many ways
interface Pay {
  public function pay(int $total): string;
}
class Cash implements Pay {
  public function pay(int $total): string { return "Cash Rp$total"; }
}
class Transfer implements Pay {
  public function pay(int $total): string { return "Transfer Rp$total"; }
}

class Cashier {
  public function __construct(private Pay $way) {}
  public function checkout(int $total): string { return $this->way->pay($total); }
}

echo (new Cashier(new Cash()))->checkout(62000) . "\n";
echo (new Cashier(new Transfer()))->checkout(62000) . "\n";

// Singleton: 1 head cashier
class HeadCashier {
  private static ?HeadCashier $one = null;
  private function __construct() {}
  public static function take(): HeadCashier {
    return self::$one ??= new HeadCashier();
  }
}
var_dump(HeadCashier::take() === HeadCashier::take()); // true, same!
```

---

## Key Concepts

### `Strategy` = Swappable Plug
`Cashier(Pay $way)` accepts any fitting plug (`Cash`/`Transfer`).

### `Singleton` = Only 1
`private __construct` + `static take()` — outside `new` rejected.

### `Factory` = Factory (Bonus)
`function make($type)` returns objects by type — 1 creation door.

---

## Beginner Friendly Explanation

### Analogy: Plugs & Head Cashier
- **Strategy = power plug**: plug Cash/Transfer, same cashier.
- **Singleton = head cashier**: only 1 in store.

### Step 0 — Prepare Device
- `php patterns.php` (no DB).

### How the Computer Reads It
1. `new Cashier(new Cash())` → stores the way.
2. `checkout(62000)` → calls `way->pay()` (polymorphism).

### 3 Must-Know Terms
1. **Strategy/Singleton**: plug/only-1
2. **Interface**: plug contract

---

## Experiments

- **Green:** Add `class Qris implements Pay` → `new Cashier(new Qris())` without touching `Cashier`?
- **Yellow:** Direct `new HeadCashier()` → `private` error?
- **Red:** 20 `if`s vs 1 Strategy — adding way #21, which edits 1 place?

---

## Challenge

**Complete Pattern Shop:** `Pay` + `Cash/Transfer/Qris` + `Cashier` + `phpunit` test of 3 ways + `Singleton` transaction log.
- **Link-up (Week 10 — PHPUnit Testing):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Strategy/Singleton/Factory**: plug/one/factory

---

## Summary

Week 11 of 12: **Neat Patterns** (Level: Intermediate). Add without touching old. Next: **Capstone**.
