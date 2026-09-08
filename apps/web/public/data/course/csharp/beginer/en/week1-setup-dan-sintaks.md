# C# Setup & Syntax — Microsoft Shop

> **Kategori:** C# | **Level:** Beginner | **Minggu 1:** Setup & Sintaks

## Learning Objectives

- Install `.NET SDK`, `dotnet --version`, `dotnet new console -n Shop`, `dotnet run`
- `Console.WriteLine`, `string name = "Budi"`, `$"Hello {name}"` interpolation

---

## Why This Matters (Non-IT)

C# = Microsoft shops for offices & desktop stores. `dotnet` is like Rust's `cargo` — 1 tool for everything.

---

## Program: C# Receipt

```bash
dotnet new console -n Shop
cd Shop
dotnet run
```

```csharp
// Program.cs
string shopName = "Siti's Shop";
string customer = "Budi";
int riceKg = 2;
int pricePerKg = 12500;
int total = riceKg * pricePerKg;

Console.WriteLine($"Shop: {shopName}");
Console.WriteLine($"Customer: {customer}, Total: Rp {total:N0}");
Console.WriteLine($"Types: {shopName.GetType().Name}, {riceKg.GetType().Name}");
```

`dotnet run` → see the receipt.

---

## Key Concepts

### `dotnet new/run` = Create/Run
`new console` scaffolds, `run` builds + runs.

### `$"..."` + `GetType()`
Interpolation + runtime type check.

---

## Beginner Friendly Explanation

### Analogy: Microsoft Toolkit
- **dotnet = all-in-one toolkit**: create, build, run, test.

### Step 0 — Prepare Device
- .NET SDK 8.x (`dotnet --version`), folder `Shop`, `dotnet run`.

### How the Computer Reads It
1. `dotnet run` → compiles `Program.cs` → runs → prints receipt.
2. `$"Total: Rp {total:N0}"` → formats 25000 as `25.000`.

### 3 Must-Know Terms
1. **dotnet/run/interpolation**: toolkit/run/embed

---

## Experiments

- **Green:** Change `riceKg = 5` → new total?
- **Yellow:** Remove `$` → literal `{shopName}`? Reattach.
- **Red:** Typo `WriteLine` → compile error before run? Fix.

---

## Challenge

**C# Receipt:** Name + 2 items + total + `:N0` format + types printed.

---

## Mini Glossary

- **dotnet/WriteLine**: toolkit/print

---

## Summary

Week 1: **C# Shop** — `dotnet run` receipt. Next: **Types & Variables**.
