# OOP Class & Object — C# Shop Card Blueprints

> **Kategori:** C# | **Level:** Beginner | **Minggu 4:** OOP: Class & Object
> **Prerequisites:** Week 3 — **Control Flow**.

## Learning Objectives

- `class Product { ... }` blueprints, `new Product(...)` cards, `constructor` initial fill (source: Microsoft Learn classes)
- `{ get; set; }` properties, `public/private`, ` : Product` inheritance, `List<Product>` card racks

---

## Why This Matters (Non-IT)

50 products without blueprints → write `name, price, stock` 50x. With `class` write once, `new` 50 cards — discount formula changes in 1 place. `List<Product>` dedicated card rack (no mixing).

---

## Program: C# Product Cards

```csharp
class Product {
  public string Name { get; set; } = "";  // auto property
  public decimal Price { get; set; }
  public int Stock { get; set; }

  public Product(string name, decimal price, int stock = 0) { // constructor
    Name = name; Price = price; Stock = stock;
  }

  public string Info() => $"{Name}: Rp{Price:N0} (stock {Stock})";
  public void Discount(int pct) => Price -= Price * pct / 100;
}

class Electronics : Product { // inheritance
  public int Warranty { get; set; }
  public Electronics(string name, decimal price, int stock, int warranty)
    : base(name, price, stock) { Warranty = warranty; }
}

var rice = new Product("Rice 5kg", 62000, 10);
Console.WriteLine(rice.Info());
rice.Discount(10);
Console.WriteLine("After discount: " + rice.Info());

// Card rack
var rack = new List<Product> { rice, new Product("Spinach", 5000, 20) };
foreach (var p in rack) Console.WriteLine(p.Info());
Console.WriteLine($"Total items: {rack.Count}");
```

---

## Key Concepts

### `class` + `new` + Constructor
`class` blueprint, `new Product(...)` card, `public Product(...)` constructor initial fill.

### `{ get; set; }` = Properties
`public string Name { get; set; }` read-write. `private` locks.

### `: Product` = Inheritance
`Electronics : Product` owns all + `Warranty`. `base(...)` calls parent constructor.

### `List<Product>` = Card Rack
`new List<Product>()`, `Add()`, `Count`, `foreach`.

---

## Beginner Friendly Explanation

### Analogy: Blueprints & Racks
- **class = blueprint**, **new = print card**, **List = rack** for cards only.

### Step 0 — Prepare Device
- Same as W1: `dotnet run`.

### How the Computer Reads It
1. `new Product("Rice", 62000, 10)` → allocates card → constructor fills 3 fields.
2. `rice.Discount(10)` → that card's `Price` becomes 55800.

### 3 Must-Know Terms
1. **Class/object**: blueprint/card
2. **Property/constructor**: access/initial-fill
3. **Inheritance/List**: heir/rack

### Bonus: Dictionary — Labeled Rack (List's partner!)

```csharp
var prices = new Dictionary<string, decimal>(); // string key → price
prices["Rice"] = 62000;  // fill/overwrite
prices["Spinach"] = 5000;
Console.WriteLine(prices["Rice"]); // 62000
Console.WriteLine(prices.ContainsKey("Coffee")); // False
foreach (var kv in prices) Console.WriteLine($"{kv.Key}: Rp{kv.Value:N0}");
// prices["Coffee"] directly → KeyNotFoundException! use TryGetValue:
// if (prices.TryGetValue("Coffee", out decimal h)) Console.WriteLine(h);
```

---

## Experiments

- **Green:** `new Product("Sugar", 15000)` → `Info()`?
- **Yellow:** `rack.Add(new Product("Coffee", 12000, 5))` → `Count` 3?
- **Red:** `rice.Price = -100` allowed? (Yes, no validation yet — validation week!) Try `private set`.

---

## Challenge

**OOP Store:** `class Cart { public List<Product> Items = new(); public void Add(Product p) => Items.Add(p); public decimal Total() { decimal s = 0; foreach (var i in Items) s += i.Price; return s; } }` → fill 3 → `Total()`. **Beginner C# DONE!**
- **Link-up (Week 3 — Control Flow):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **class/new/get-set**: blueprint/card/access
- **base/List**: parent/rack

---

## Summary

Week 4 of 4: **C# OOP** (Level: Beginner). **Beginner C# DONE!** Next: **LINQ** (Intermediate).
