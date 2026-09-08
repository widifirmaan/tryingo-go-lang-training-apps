# Error Handling — C# Alarms

> **Kategori:** C# | **Level:** Advanced | **Minggu 8:** Error Handling

## Learning Objectives

- `try { ... } catch (Exception ex) { ... } finally { ... }` catches alarms

---

## Why This Matters (Non-IT)

The intermediate version works; the advanced version is for production: custom Exceptions + throw + using + global handler. Without it, intermediate code breaks on production edge cases.

---

## Program

```csharp
try {
  int stock = 0;
  if (stock == 0) throw new Exception("Out of stock");
  Console.WriteLine("Sell");
} catch (Exception ex) {
  Console.WriteLine($"Failed: {ex.Message}");
} finally {
  Console.WriteLine("Close cashier");
}
```



---

## Beginner Friendly Explanation

### Analogy: Layered Production Alarm
- See Program: every line commented. Run `dotnet run`, change 1 number, see the difference.

### Step 0 — Prepare Device
- Same as C# W1: `.NET SDK`, `dotnet run`.

### How the Computer Reads It
- `class CashierException : Exception` + global middleware/handler + log.

### 3 Must-Know Terms
- 1. **Custom/global/log**: special/central/record

## Mini Glossary

- **Advanced**: advanced production alarms

## Summary

Week 8: **C# Alarms** — `try/catch`.
