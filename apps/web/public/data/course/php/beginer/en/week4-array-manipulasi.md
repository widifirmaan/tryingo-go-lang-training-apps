# Array & Manipulation — PHP Shop Racks and Cards

> **Kategori:** PHP | **Level:** Beginner | **Minggu 4:** Array & Manipulasi
> **Prerequisites:** Week 3 — **Functions & Scope**.

## Learning Objectives

- Ordered rack `["apple","mango"]` + append `$fruits[] = "orange"`, count `count()`, join `implode()` (source: php.net/language.types.array)
- Label card `["name"=>"Budi"]` access `$student["name"]`, add `$student["address"] = "Jakarta"`
- Rack processing: `sort()`, `array_filter()`, `array_map()`, `array_sum()`, `max()`/`min()`

---

## Why This Matters (Non-IT)

Shops don't stock 1 rice — 30 products and 100 customers. Without arrays, write `$product1, $product2...` 30x. With racks (indexed) and cards (associative), **1 variable for all** + filter "cheap only" in 1 line.

---

## Program: Shop Racks & Cards

```php
<?php
// Ordered rack (indexed)
$fruits = ["apple", "mango", "banana"];
$fruits[] = "orange"; // append back
echo "Fruits: " . implode(", ", $fruits) . "\n";
echo "Count: " . count($fruits) . "\n";

// Process numbers
$scores = [85, 92, 78, 90, 88];
echo "Max: " . max($scores) . ", Avg: " . (array_sum($scores) / count($scores)) . "\n";
sort($scores);
echo "Sorted: " . implode(", ", $scores) . "\n";

// Label card (associative)
$customer = ["name" => "Budi", "age" => 25, "city" => "Jakarta"];
echo "Name: " . $customer["name"] . "\n";
$customer["phone"] = "08123456789"; // add field
unset($customer["age"]); // remove field

// Filter & transform (like JS map/filter)
$prices = [10000, 15000, 20000, 25000];
$cheap = array_filter($prices, fn($h) => $h < 20000);
$raised = array_map(fn($h) => $h * 1.1, $prices);
echo "Cheap: " . implode(", ", $cheap) . "\n";
echo "Up 10%: " . implode(", ", $raised) . "\n";

// 2D rack: shopping list
$cart = [
  ["name" => "Rice", "price" => 62000],
  ["name" => "Spinach", "price" => 5000],
];
foreach ($cart as $item) {
  echo $item["name"] . " Rp " . $item["price"] . "\n";
}
?>
```

---

## Key Concepts

### Indexed vs Associative
- `["apple","mango"]` order 0,1,2. `$fruits[] = "orange"` appends back.
- `["name"=>"Budi"]` labels. `$p["name"]` takes, `unset($p["age"])` removes.

### Rack-Processing Functions
`count()`, `implode(", ",$arr)`, `sort()`, `array_sum()`, `max()`, `array_filter()`, `array_map()`.

---

## Beginner Friendly Explanation

### Analogy: Fruit Racks & Member Cards
- **Indexed = lined rack**: numbers 0,1,2. `implode` = strings into 1 sentence.
- **Associative = member card**: `name` labels, not numbers.
- **`array_filter` = strainer**: only cheap passes.

### Step 0 — Prepare Device
- Same as W1: `php rack.php`.

### How the Computer Reads It
1. `$fruits[] = "orange"` → appends at back, index 3.
2. `array_filter($prices, fn($h) => $h < 20000)` → checks each `h`, gathers passers.

### 3 Must-Know Terms
1. **Indexed/associative**: rack/card
2. **implode/count**: join/count
3. **filter/map**: strain/transform

---

## Experiments

- **Green:** `$veggies = ["spinach","kale"]; $veggies[] = "mustard"; count($veggies)` → 3?
- **Yellow:** `array_filter($prices, fn($h) => $h >= 20000)` → pricey?
- **Red:** `$customer["age"]` after `unset` → `Undefined array key` warning? Check `isset($customer["age"])` first.

---

## Challenge

**Shop Inventory:** `$products = [["name"=>"Rice","price"=>62000,"category"=>"Staples"], ... 5 items]` → `array_filter` Staples only → `array_map` takes `name` → `implode` prints → `array_sum(array_column($products,"price"))` totals.

---

## Mini Glossary

- **Array indexed/associative**: list/card
- **implode/explode**: join/split
- **filter/map**: strain/transform

---

## Summary

Week 4 of 6: **PHP Arrays** (Level: Beginner). Can rack & card + process. Next: **OOP** — blueprints.
