# Generics — Multipurpose C# Racks

> **Kategori:** C# | **Level:** Intermediate | **Minggu 7:** Generics

## Learning Objectives

- `class Cart<T>` rack for any type + `where T : Product` bounds (source: Microsoft Learn generics)
- Generic methods `T First<T>(List<T> list)`

---

## Why This Matters (Non-IT)

Without generics, `StringCart` + `IntCart` 2 identical classes (duplicates!). With `<T>` 1 rack for all + still strictly typed (no loose `object` needing casts).

---

## Program: Generic Shop Rack

```csharp
class Cart<T> {
  public List<T> Items = new();
  public void Add(T item) => Items.Add(item);
  public T First() => Items[0];
}

var ks = new Cart<string>();
ks.Add("Rice");
Console.WriteLine(string.Join(", ", ks.Items));

var ki = new Cart<int>();
ki.Add(62000);

// Bound: Product and below only
class Warehouse<T> where T : Product {
  public void LowStock(List<T> list) {
    foreach (var p in list) if (p.Stock < 5) Console.WriteLine(p.Name);
  }
}

// Generic method
static T TakeFirst<T>(List<T> list) => list[0];
Console.WriteLine(TakeFirst(new List<string> { "a", "b" }));
```

---

## Key Concepts

### `<T>` = Temporary Label
`Cart<string>` → `T` becomes `string` everywhere. Strict, no casts.

### `where T : ...` = Rack Requirement
`where T : Product` (must derive), `where T : new()` (can `new T()`).

---

## Beginner Friendly Explanation

### Analogy: Adjustable Rack
- **Generics = adjustable rack**: set `string` for text, `int` for numbers — 1 rack.

### Step 0 — Prepare Device
- Same as W1.

### How the Computer Reads It
1. `new Cart<string>()` → builds string-specialized version.
2. `Add(123)` → error (not a string)!

### 3 Must-Know Terms
1. **Generics/<T>/where**: multipurpose/label/requirement

---

## Experiments

- **Green:** `Cart<int>` + `Add("x")` → error?
- **Yellow:** `where T : new()` + `new T()` inside → works?
- **Red:** Manual `object` + casts vs generics → which is compile-time safe?

---

## Challenge

**Generic Warehouse:** `Cart<T>` + `Total<T>(List<T>, Func<T,int>)` + `where T : Product` + 2 different types.

---

## Mini Glossary

- **Generics/where**: multipurpose/requirement

---

## Summary

Week 7 of 12: **Multipurpose Rack** (Level: Intermediate). 1 strict rack. Next: **Errors**.
