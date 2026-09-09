# Basic OOP — PHP Shop Card Blueprints

> **Kategori:** PHP | **Level:** Beginner | **Minggu 5:** OOP Dasar
> **Prerequisites:** Week 4 — **Array & Manipulation**.

## Learning Objectives

- `class Product { ... }` blueprint, `new Product(...)` prints card, `__construct` initial fill (source: php.net/oop)
- `$this->name` = "this card", `public` accessible, `extends` inheritance + `parent::__construct`

---

## Why This Matters (Non-IT)

50 products without blueprints → write `name, price, stock` 50x, 1 price typo. With `class` write once, print 50 cards — discount formula changes in 1 place.

---

## Program: OOP Product Cards

```php
<?php
class Product {
  public string $name;
  public float $price;
  public int $stock;

  public function __construct(string $name, float $price, int $stock = 0) {
    $this->name = $name;   // $this = this card
    $this->price = $price;
    $this->stock = $stock;
  }

  public function info(): string {
    return "{$this->name}: Rp" . number_format($this->price, 0, ',', '.') . " (stock {$this->stock})";
  }

  public function discount(float $pct): void {
    $this->price -= $this->price * ($pct / 100);
  }
}

class Electronics extends Product { // inherits all Product
  public int $warranty;
  public function __construct(string $name, float $price, int $stock, int $warranty) {
    parent::__construct($name, $price, $stock);
    $this->warranty = $warranty;
  }
}

$rice = new Product("Rice 5kg", 62000, 10);
echo $rice->info() . "\n";
$rice->discount(10);
echo "After discount: " . $rice->info() . "\n";

$laptop = new Electronics("Laptop", 15000000, 5, 3);
echo $laptop->info() . " [{$laptop->warranty}yr warranty]\n";
?>
```

---

## Key Concepts

### `class` + `new` + `__construct`
`class` blueprint, `new Product(...)` finished card, `__construct` auto initial fill.

### `$this` = This Card
`$this->name` = this card's name (not plain `$name`).

### `extends` + `parent::`
`Electronics extends Product` inherits all + adds `warranty`.

---

## Beginner Friendly Explanation

### Analogy: Card Blueprints
- **class = blueprint**, **new = print card**, **$this = "me"** (this card).
- **extends = photocopy + add**: `Electronics` photocopies `Product` + `warranty`.

### Step 0 — Prepare Device
- Same as W1: `php card.php`.

### How the Computer Reads It
1. `new Product("Rice", 62000, 10)` → creates card → calls `__construct` → fills 3 fields.
2. `$rice->discount(10)` → edits that card's `price` to 55800.

### 3 Must-Know Terms
1. **Class/object**: blueprint/card
2. **$this**: this card
3. **extends**: inheritance

---

## Experiments

- **Green:** `new Product("Sugar", 15000)` → `info()`?
- **Yellow:** `$rice->discount(20)` → price?
- **Red:** Forget `$this->`, write `$name = ...` in method → creates local variable, card unchanged!

---

## Challenge

**OOP Store:** `class Cart { public array $items = []; public function add($p){ $this->items[] = $p; } public function total(){ $s=0; foreach($this->items as $i) $s += $i->price*$i->qty; return $s; } }` → fill 3 `Product`s → `total()`.
- **Link-up (Week 4 — Array & Manipulation):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **class/new/$this**: blueprint/card/me
- **extends/parent**: heir/parent

---

## Summary

Week 5 of 6: **PHP OOP** (Level: Beginner). Blueprints owned. Next: **Forms** — safe orders.
