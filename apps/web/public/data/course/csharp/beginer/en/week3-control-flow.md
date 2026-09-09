# Control Flow — C# Shop Branches & Loops

> **Kategori:** C# | **Level:** Beginner | **Minggu 3:** Control Flow
> **Prerequisites:** Week 2 — **Data Types & Variables**.

## Learning Objectives

- `if / else if / else`, `switch` with `break`, `for`, `while`, `foreach` for `List`/`array` (source: Microsoft Learn selection & iteration statements)

---

## Why This Matters (Non-IT)

Score 85 → B, stock 0 → "Gone", counting 30 items — without `if`/`foreach` hand-write everything. C# `switch` mandates `break` (unlike Go) — forgetting = compile error, safe.

---

## Program: Automatic C# Cashier

```csharp
int score = 85;
if (score >= 90) Console.WriteLine("Grade: A");
else if (score >= 80) Console.WriteLine("Grade: B");
else Console.WriteLine("Grade: C");

string day = "Friday";
switch (day) {
  case "Friday": Console.WriteLine("Holiday tomorrow!"); break;
  case "Monday": Console.WriteLine("Go go!"); break;
  default: Console.WriteLine("Workday"); break;
}

Console.Write("Count 1-5: ");
for (int i = 1; i <= 5; i++) Console.Write($"{i} ");
Console.WriteLine();

string[] fruits = { "apple", "mango", "banana" };
foreach (var f in fruits) Console.WriteLine($"Fruit: {f}");

// Real: total of available stock
var cart = new[] {
  new { Name = "Rice", Price = 62000, In = true },
  new { Name = "Sugar", Price = 15000, In = false },
};
int total = 0;
foreach (var item in cart) {
  if (!item.In) continue;
  total += item.Price;
}
Console.WriteLine($"Buyable total: Rp {total:N0}");
```

---

## Key Concepts

### `if / else if / else` = Branches
Checks top → down, stops at true.

### Mandatory `switch` + `break`
C# errors on `case` without `break` (except stacked empties). Safe from JS leaks.

### `for` vs `foreach`
- `for (int i=1; i<=5; i++)` known count.
- `foreach (var f in fruits)` items directly.

### `continue` / `break`
`continue` skips 1, `break` exits.

---

## Beginner Friendly Explanation

### Analogy: Guard & Rack Check
- **`if` = guard**: "Stock >0? Come in."
- **`foreach` = rack check**: takes each item.

### Step 0 — Prepare Device
- Same as W1: `dotnet run`.

### How the Computer Reads It
1. `if (85>=90)`? no → `else if (85>=80)` yes → "B".
2. `foreach` 3x, `continue` skips Sugar (`In=false`).

### 3 Must-Know Terms
1. **Condition/loop**: ask/repeat
2. **break/continue**: exit/skip
3. **foreach**: for each

---

## Experiments

- **Green:** `score = 95` → A? `day = "Monday"` → Go go?
- **Yellow:** `for (int i = 10; i >= 1; i--)` backwards?
- **Red:** Delete `break` in `case "Friday"` → `Control cannot fall through` compile error? Reattach.

---

## Challenge

**Guess Stock:** `int secret = 7; int[] guesses = {3, 9, 7}; foreach (int g in guesses) { if (g == secret) { Console.WriteLine("Right!"); break; } else if (g < secret) Console.WriteLine($"{g} too small"); else Console.WriteLine($"{g} too big"); }`
- **Link-up (Week 2 — Data Types & Variables):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **if/switch**: branches
- **for/foreach/while**: repeats
- **break/continue**: exit/skip

---

## Summary

Week 3 of 4: **C# Control** (Level: Beginner). Branches & loops. Next: **OOP** — blueprints.
