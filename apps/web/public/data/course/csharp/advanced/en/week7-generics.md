# Generics — Multipurpose C# Racks

> **Kategori:** C# | **Level:** Advanced | **Minggu 7:** Generics

## Learning Objectives

- `class Cart<T> { List<T> items; }` rack for `string` or `int`, `where T : Product` bounds

---

## Why This Matters (Non-IT)

The intermediate version works; the advanced version is for production: where T : new() + factory + basic variance. Without it, intermediate code breaks on production edge cases.

---

## Program

```csharp
class Cart<T> {
  public List<T> Items = new();
  public void Add(T item) => Items.Add(item);
}

var stringCart = new Cart<string>();
stringCart.Add("Rice");
Console.WriteLine(string.Join(", ", stringCart.Items));

var intCart = new Cart<int>();
intCart.Add(62000);
```



---

## Beginner Friendly Explanation

### Analogy: Production Multipurpose Rack
- See Program: every line commented. Run `dotnet run`, change 1 number, see the difference.

### Step 0 — Prepare Device
- Same as C# W1: `.NET SDK`, `dotnet run`.

### How the Computer Reads It
- `where T : new()` + `Activator`/`new T()` + factory method `Make<T>()`.

### 3 Must-Know Terms
- 1. **Generics/where/new()**: multipurpose/requirement/make

## Mini Glossary

- **Advanced**: advanced production generic racks

## Summary

Week 7: **Generic Rack** — `Cart<T>`.
