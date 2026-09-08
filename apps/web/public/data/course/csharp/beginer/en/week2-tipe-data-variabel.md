# Data Types & Variables — Labeled C# Boxes

> **Kategori:** C# | **Level:** Beginner | **Minggu 2:** Tipe Data & Variabel

## Learning Objectives

- Labeled boxes: `int` whole, `double` decimal, `string` text, `bool` yes/no, `decimal` precise money (source: Microsoft Learn C# types)
- `var` auto-guess: `var price = 62000` → `int`
- `$"Hello {name}"` interpolation and `GetType().Name` type check

---

## Why This Matters (Non-IT)

Price `62000` with `double` can become `61999.9999` (binary precision) — cashiers lose cents. C# has `decimal` for money (`62000.50m`). Wrong type = wrong receipt.

---

## Program: Cashier Boxes C#

```bash
dotnet new console -n Cashier
cd Cashier
dotnet run
```

```csharp
// Program.cs
int age = 25;
double height = 175.5;
string name = "Budi";
bool active = true;
var price = 62000;          // guesses: int
decimal money = 62000.50m;   // m = decimal, for money!

Console.WriteLine($"Name: {name}, Age: {age}");
Console.WriteLine($"Price: Rp {price:N0} (type {price.GetType().Name})");
Console.WriteLine($"Money: Rp {money:N0} (type {money.GetType().Name})");
Console.WriteLine($"Active: {active}, Height: {height}");

// var guesses but locks forever after
// price = "expensive"; // ERROR: can't string into int
```

---

## Key Concepts

### `int/double/string/bool/decimal`
- `int` whole, `double` decimal (binary, never for money), `decimal` precise decimal (`m`).
- `string` text `"Budi"`, `bool` `true/false`.

### `var` = Guess Once, Lock Forever
`var price = 62000` → `int` forever. Unlike loose JS `let`.

### `$"..."` + `:N0`
`$"Hello {name}"` interpolates, `{money:N0}` thousands-formats `62.000`.

---

## Beginner Friendly Explanation

### Analogy: Labeled Store Boxes
- **`int` = whole-number box**, **`decimal` = money vault** (precise), **`var` = guess stamp** becoming a permanent label instantly.

### Step 0 — Prepare Device
- Same as W1: `.NET SDK`, `dotnet --version` 8.x, `dotnet run`.

### How the Computer Reads It
1. `var price = 62000` → guesses `int` → locks.
2. `$"Rp {price:N0}"` → takes 62000 → formats `62.000`.

### 3 Must-Know Terms
1. **decimal**: precise money (`m`)
2. **var**: guess then lock
3. **Interpolation `$""`**: embed variables

---

## Experiments

- **Green:** `decimal fee = 8500.75m;` → prints?
- **Yellow:** `var x = 5; x = "hello";` → error?
- **Red:** `double d = 0.1 + 0.2; Console.WriteLine(d);` → `0.30000000000000004`? Switch to `decimal` → exact `0.3`!

---

## Challenge

**C# Receipt:** `string customer = "Siti"; decimal rice = 62000, fee = 8500.50m; decimal total = rice + fee;` → `$"{customer} total Rp {total:N0}"` + `GetType().Name` per variable.

---

## Mini Glossary

- **int/double/decimal**: whole/decimal/money
- **var**: type guess
- **$""**: interpolation

---

## Summary

Week 2 of 4: **C# Types** (Level: Beginner). Labeled boxes + precise money. Next: **Control Flow** — branches & loops.
