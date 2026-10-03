# Modern C# 13 Syntax, Primary Constructors & Record Types

> **Kategori:** C# & .NET | **Level:** Beginner | **Minggu 1:** Modern C# 13 Syntax, Primary Constructors & Record Types
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand modern C# 12/13 features including top-level statements and primary constructors.
- Use record types for immutable domain entities with built-in value-based equality.
- Apply non-destructive mutation using the `with` expression.
- Master pattern matching with switch expressions for clear and expressive business logic.

---

## Program: Warehouse Inventory Domain Models with Records & Pattern Matching

```csharp
using System;

// C# 13: Top-level statements & Primary Constructors on Records
var itemA = new InventoryItem("SKU-LOGI-M720", "Wireless Mouse M720", 450_000m, 45, ItemCategory.Peripherals);
var itemB = itemA with { Sku = "SKU-LOGI-M720-B", Stock = 12 }; // Non-destructive mutation

Console.WriteLine($"[Item Created] {itemA.Name} | Sku: {itemA.Sku} | Stock: {itemA.Stock}");
Console.WriteLine($"[Cloned Item]  {itemB.Name} | Sku: {itemB.Sku} | Stock: {itemB.Stock}");

StockStatus status = EvaluateStock(itemB);
Console.WriteLine($"[Stock Status] {itemB.Sku} -> {status.Message} (Urgency: {status.Urgency})");

static StockStatus EvaluateStock(InventoryItem item) => item.Stock switch
{
    0 => new StockStatus("Out of Stock! Immediate reorder required.", UrgencyLevel.Critical),
    <= 15 => new StockStatus($"Low Stock Warning ({item.Stock} units left).", UrgencyLevel.High),
    <= 50 => new StockStatus("Optimal stock level.", UrgencyLevel.Normal),
    _ => new StockStatus("Surplus inventory in warehouse.", UrgencyLevel.Low)
};

// Immutability with Record Types & Primary Constructors
public record InventoryItem(
    string Sku,
    string Name,
    decimal UnitPrice,
    int Stock,
    ItemCategory Category
);

public record StockStatus(string Message, UrgencyLevel Urgency);

public enum ItemCategory { Peripherals, Storage, Network, Displays }
public enum UrgencyLevel { Low, Normal, High, Critical }
```

---

## Key Concepts

Modern C# 13 eliminates legacy boilerplate (such as manual class definitions and static void Main methods) while preserving strict static typing and top-tier .NET runtime throughput.

### Primary Constructors and Top-Level Statements
With modern C#, executable code begins directly on the first line. **Primary Constructors** allow developers to declare constructor parameters directly adjacent to the type definition, eliminating dozens of lines of repetitive constructor assignment fields.

### Record Types and Immutability
A `record` is a reference type designed specifically for immutable data modeling. Two separate record instances containing identical values are treated as equal (`item1 == item2` evaluates to true), in contrast to standard classes which evaluate memory address reference identity. Modifying a record relies on the `with` expression, safely generating an altered shallow copy.

### Pattern Matching with Switch Expressions
Switch expressions in C# provide concise, declarative condition handling. By supporting relational patterns (`<= 15`), type patterns, and tuple checks, business logic such as warehouse stock evaluation remains bug-free and expressive.


---

---

## Beginner Friendly Explanation

Think of an airport cargo manifest sheet. Once printed, you do not scribble over it (it behaves as an immutable `record`). If an item changes, the officer prints a revised manifest that duplicates the previous one with the new changes incorporated (this is the `with` expression).

## Experiments

- Change itemA.Stock to 0 and observe the switch expression triggering UrgencyLevel.Critical.
- Compare two distinct record instances containing identical field values: verify whether itemA == itemCopy yields True.
- Introduce a ReorderThreshold property to InventoryItem and incorporate it into the pattern matching logic.

---

## Challenge

Create a record `StockAdjustment(string Sku, int QuantityChange, string Reason, DateTime Timestamp)` and author a function that yields a newly updated `InventoryItem` without mutating the original record.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

---

## Common Pitfalls & Debugging Tips

### 1. NullReferenceException at Runtime
- **Symptom / Issue:** Attempting to invoke methods on null object instances crashes request threads.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Enable `<Nullable>enable</Nullable>` in csproj and leverage null-conditional `?.` operators.

### 2. Async Void Anti-Pattern
- **Symptom / Issue:** Exceptions thrown inside `async void` cannot be caught by callers and crash the runtime.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always return `async Task` except on top-level UI event handlers.

### 3. Failing to Dispose Managed Resources
- **Symptom / Issue:** Database connections and file handles remain open indefinitely.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `using var resource = new ...` to guarantee prompt deterministic cleanup.

---

## Summary

You have mastered modern C# 13 syntax, record types, non-destructive mutation with `with`, and pattern matching. Next week we explore LINQ and Generics.
