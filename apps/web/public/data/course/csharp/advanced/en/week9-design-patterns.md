# Design Patterns — Neat C# Shop Patterns

> **Kategori:** C# | **Level:** Advanced | **Minggu 9:** Design Patterns

## Learning Objectives

- `Strategy` plug swaps payment ways without 20x `if`, `Singleton` 1 head cashier, `Repository` warehouse worker (source: refactoring.guru/design-patterns/csharp)

---

## Why This Matters (Non-IT)

Adding QRIS with 20x `if` → edits 20 places, forget 1 = bug. With `Strategy`, add 1 class. `Repository` separates SQL from logic — swap DBs without touching cashiers.

---

## Program: Shop Payment Patterns

```csharp
// Strategy: 1 plug, many ways
interface IPay { void Pay(decimal total); }

class Cash : IPay {
  public void Pay(decimal total) => Console.WriteLine($"Cash Rp{total:N0}");
}
class Transfer : IPay {
  public void Pay(decimal total) => Console.WriteLine($"Transfer Rp{total:N0}");
}

class Cashier {
  private readonly IPay _way;
  public Cashier(IPay way) { _way = way; } // plug injection!
  public void Checkout(decimal total) => _way.Pay(total);
}

var k1 = new Cashier(new Cash());
k1.Checkout(62000);
var k2 = new Cashier(new Transfer());
k2.Checkout(62000);

// Singleton: 1 head cashier
class HeadCashier {
  private static HeadCashier? _one;
  private HeadCashier() {}
  public static HeadCashier Take() => _one ??= new HeadCashier();
}
Console.WriteLine(HeadCashier.Take() == HeadCashier.Take()); // True
```

---

## Key Concepts

### `Strategy` = Plug
`Cashier(IPay way)` accepts anything fitting. Add `Qris` without touching `Cashier`.

### `Singleton` = Only 1
`private` constructor + `static Take()` — outside `new` rejected.

### `Repository` = Warehouse Worker
`interface IRepo { List<Product> All(); }` — cashier never knows SQL.

---

## Beginner Friendly Explanation

### 2-Minute Interface Primer (mandatory before patterns!)
```csharp
interface IPay { void Pay(decimal total); } // CONTRACT: must Pay!
class Cash : IPay { // sign the contract
  public void Pay(decimal total) => Console.WriteLine($"Cash Rp{total:N0}");
}
// interface = promise without body; classes MUST fill all. Unlike abstract classes:
// interfaces allow multi-inheritance (class A : IA, IB), abstract allows 1 parent!
```

### Analogy: Plugs & Head Cashier
- **Strategy = power plug**: plug Cash/Transfer, same cashier.
- **Singleton = head cashier**: only 1 in store.

### Step 0 — Prepare Device
- Same as W1: `dotnet run`.

### How the Computer Reads It
1. `new Cashier(new Cash())` → stores the way.
2. `Checkout(62000)` → calls `way.Pay()` (polymorphism).

### 3 Must-Know Terms
1. **Strategy/Singleton**: plug/only-1
2. **Interface**: plug contract

---

## Experiments

- **Green:** Add `class Qris : IPay` → `new Cashier(new Qris())` without touching `Cashier`?
- **Yellow:** Direct `new HeadCashier()` → `private` error?
- **Red:** 20 `if`s vs Strategy — adding way #21, which edits 1 place?

---

## Challenge

**Complete Pattern Shop:** `IPay` + 3 ways + `Cashier` + 3 tests + `Singleton` log.

---

## Mini Glossary

- **Strategy/Singleton/Repository**: plug/one/worker

---

## Summary

Week 9 of 12: **Neat Patterns** (Level: Advanced). Add without touching old. Next: **Testing**.
