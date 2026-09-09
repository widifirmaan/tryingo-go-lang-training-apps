# Testing — Real C# Shop Taste-Test

> **Kategori:** C# | **Level:** Advanced | **Minggu 10:** Testing
> **Prerequisites:** Week 9 — **Design Patterns**.

## Learning Objectives

- `dotnet new xunit` + `[Fact]` + `Assert.Equal` real tasting (source: Microsoft Learn unit testing C#)
- `Theory` + `[InlineData]` tastes many at once

---

## Why This Matters (Non-IT)

`Console.WriteLine` simulation catches no bugs (never machine-checked). Real xUnit: change formula → red → fix. Without it, "testing" is decoration.

---

## Program: Real Cashier Taste-Test

```bash
dotnet new xunit -n Shop.Test
dotnet add Shop.Test reference Shop
```

```csharp
// CashierTest.cs — real!
using Xunit;

public class CashierTest {
  [Fact]
  public void Calc_TwoPlusThree_Five() {
    var k = new Cashier();
    Assert.Equal(5, k.Calc(2, 3));
  }

  [Theory] // tastes many!
  [InlineData(62000, 10, 55800)]
  [InlineData(5000, 0, 5000)]
  [InlineData(5000, 100, 0)]
  public void Discount_Correct(int price, int pct, int want) {
    var k = new Cashier();
    Assert.Equal(want, k.Discount(price, pct));
  }

  [Fact]
  public void DivideZero_Explodes() {
    var k = new Cashier();
    Assert.Throws<DivideByZeroException>(() => k.Divide(10, 0));
  }
}
```

```bash
dotnet test
# Passed! - Failed: 0, Passed: 5 — GREEN for real
```

---

## Key Concepts

### `[Fact]` / `[Theory]` = Taste 1 / Many
`Fact` 1 case, `Theory` + `InlineData` many cases 1 function.

### `Assert.Equal/Throws` = Expect/Explode
`Equal(5, result)` matches, `Throws` expects explosion.

---

## Beginner Friendly Explanation

### Analogy: Kitchen Taste
- **Test = taste**: cook → machine tastes → fits? Serve.

### Step 0 — Prepare Device
- `dotnet new xunit` + `dotnet add reference` + `dotnet test`.

### How the Computer Reads It
1. `dotnet test` → finds `[Fact]`/`[Theory]` → runs → green/red per case.

### 3 Must-Know Terms
1. **Fact/Theory/Assert**: one/many/expect

---

## Experiments

- **Green:** Change formula → red? Fix it.
- **Yellow:** Add 4th `[InlineData]` → runs along?
- **Red:** File without `[Fact]` → not run? Add attribute.

---

## Challenge

**Tested Shop:** `Calc/Discount/Divide` + 5 GREEN tests + screenshot.
- **Link-up (Week 9 — Design Patterns):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **xUnit/Fact/Theory**: taste-kitchen/taste/expect

---

## Summary

Week 10 of 12: **Real Tasting** (Level: Advanced). No simulation. Next: **Web API**.
