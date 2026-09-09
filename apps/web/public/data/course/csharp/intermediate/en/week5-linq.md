# LINQ — C# Shop Strainers

> **Kategori:** C# | **Level:** Intermediate | **Minggu 5:** LINQ
> **Prerequisites:** Week 4 — **OOP Class & Object**.

## Learning Objectives

- `Where`, `Select`, `OrderBy` — strain racks like JS `map/filter`

---

## Why This Matters (Non-IT)

Filtering "cheap only" without LINQ = 6-line `foreach` + `if` + new list every time. With `Where`, 1 line. `OrderBy` sorts prices without hand-written sorts. 90% of C# data processing = LINQ.

---

## Program

```csharp
var products = new[] { new { Name="Rice", Price=62000 }, new { Name="Spinach", Price=5000 } };
var cheap = products.Where(p => p.Price < 20000).ToList();
var names = products.Select(p => p.Name).ToList();
var sorted = products.OrderBy(p => p.Price).ToList();

foreach(var p in cheap) Console.WriteLine(p.Name);
```


---

## Key Concepts

### `Where` / `Select` / `OrderBy` = Strain/Pick/Sort
- `Where(p => p.Price < 20000)` strains (like JS `filter`).
- `Select(p => p.Name)` picks columns (like `map`).
- `OrderBy(p => p.Price)` sorts ascending, `OrderByDescending` descending.

### `ToList()` = Execute
LINQ is lazy (deferred) — without `ToList()`/`foreach`, the query never runs!

---

## Beginner Friendly Explanation

### Analogy: Tiered Strainers
- **Where = strainer**: only cheap passes.
- **Select = reprint**: takes names only.

### Step 0 — Prepare Device
- Same as C# W1: `dotnet run`.

### How the Computer Reads It
1. `products.Where(p => p.Price < 20000)` → builds query (not yet run).
2. `.ToList()` → runs → new list.

### 3 Must-Know Terms
1. **LINQ/Where/Select**: universe-strain/strain/pick
2. **Deferred/ToList**: lazy/execute

---

## Experiments

- **Green:** `Where(p => p.Price >= 20000)` → pricey?
- **Yellow:** Without `ToList()`, mutate `products` first then `foreach` the query → follows changes? (Deferred!)
- **Red:** `Select` before `Where` → still runs but wastes work? Order `Where` first.

---

## Challenge

**Complete Filtered Rack:** 5 products → `Where` stock > 0 → `OrderBy` price → `Select` names → `ToList` print. Add `FirstOrDefault` taking the cheapest.
- **Link-up (Week 4 — OOP Class & Object):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Where/Select/OrderBy**: strain/pick/sort
- **ToList/First**: execute/first

---

## Summary

Week 5: **LINQ Filters** (Level: Intermediate). 1 line replaces 6. Next: **Async**.
