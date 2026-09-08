# Error Handling — No-Panic C# Alarms

> **Kategori:** C# | **Level:** Intermediate | **Minggu 8:** Error Handling

## Learning Objectives

- `try/catch/finally` catches + specific `Exception`s first (`FormatException` before `Exception`) (source: Microsoft Learn exceptions)
- `throw new` makes alarms + `using` auto-closes (`IDisposable`)

---

## Why This Matters (Non-IT)

Without `try/catch`, "abc" input into prices → crash + cashier app closes. With catches, shows "Wrong price" → continues. `using` guarantees files close despite errors (otherwise files lock!).

---

## Program: Crash-Proof C# Cashier

```csharp
try {
  Console.Write("Price: ");
  int price = int.Parse(Console.ReadLine() ?? "0"); // can explode!
  if (price <= 0) throw new Exception("Price must be > 0");
  Console.WriteLine($"OK: Rp{price:N0}");
}
catch (FormatException) {
  Console.WriteLine("That's not a number!");
}
catch (Exception ex) {
  Console.WriteLine($"Failed: {ex.Message}");
}
finally {
  Console.WriteLine("Cashier ready again");
}

// using: auto-closes despite errors
using (var file = new StreamWriter("receipt.txt")) {
  file.WriteLine("Rice 62000");
} // auto-closed here!
```

---

## Key Concepts

### `try/catch/finally` = Try/Catch/Always
`try` attempts, `catch` catches per type (specific first!), `finally` always runs.

### `throw new` = Sound Alarm
`throw new Exception("...")` throws to nearest `catch`.

### `using` = Auto Close
`using (var x = ...)` → automatic `Dispose()` (files, DB connections).

---

## Beginner Friendly Explanation

### Analogy: Circus Safety Net
- **try = act**, **catch = net**, **finally = sweep stage** (always).
- **using = automatic door**: closes itself.

### Step 0 — Prepare Device
- Same as W1.

### How the Computer Reads It
1. `int.Parse("abc")` → throws `FormatException` → finds matching `catch`.
2. `using` ends → `Dispose()` despite errors.

### 3 Must-Know Terms
1. **try/catch/finally**: try/catch/always
2. **throw/using**: alarm/auto-close

---

## Experiments

- **Green:** Input "abc" → "That's not a number"?
- **Yellow:** `catch (Exception)` first then `FormatException` → unreachable warning? Order them!
- **Red:** Without `using`, error before `Close()` → file locked? Use `using`.

---

## Challenge

**Complete Safe Cashier:** Input-price loop + 2-type `try/catch` + `throw` for <= 0 + `using` writes receipt file. **Intermediate C# DONE!**

---

## Mini Glossary

- **try/catch/throw/using**: try/catch/alarm/automatic

---

## Summary

Week 8 of 12: **No-Panic Alarms** (Level: Intermediate). **Intermediate C# DONE!** Next: **Advanced Generics** (Advanced).
