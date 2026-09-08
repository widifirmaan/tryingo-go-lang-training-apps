# Relationships — Ropes Between Laravel Racks

> **Kategori:** Laravel | **Level:** Intermediate | **Minggu 6:** Relationships

## Learning Objectives

- `hasMany`, `belongsTo` — `Product hasMany Orders`, `Order belongsTo Product`

---

## Why This Matters (Non-IT)

Without relations, `orders` + `customers` = 2 queries + manual merge. With `hasMany/belongsTo` + `with()`, 2 automatic queries + anti-N+1.

---

## Program

```php
// app/Models/Product.php
class Product extends Model {
  public function orders(){ return $this->hasMany(Order::class); }
}
// app/Models/Order.php
class Order extends Model {
  public function product(){ return $this->belongsTo(Product::class); }
}

$product = Product::with('orders')->find(1);
echo $product->name . " ordered " . $product->orders->count() . "x";

$order = Order::with('product')->first();
echo $order->product->name;
```


---

## Beginner Friendly Explanation

### Analogy: Ropes Between Laravel Racks
- See Program: run the commands, change 1 thing, see the difference.

### Step 0 — Prepare Device
- Same as Laravel W1: `php artisan serve` on `8000` (+ this week's package).

### How the Computer Reads It
- `$product->orders` automatic; `Product::with('orders')->get()` 2 queries (not 101).

### 3 Must-Know Terms
- 1. **hasMany/belongsTo/with**: owns/belongs/along

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 6: **Rack Ropes** — `hasMany`/`belongsTo`. Next: **Validation**.
