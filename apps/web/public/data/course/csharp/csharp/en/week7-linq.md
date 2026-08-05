# LINQ Queries

> C# | Module 7

## Learning Objectives

- Use LINQ to Objects
- Understand query syntax and method syntax
- Use Where, Select, GroupBy
- Understand deferred execution

---

## Program: Data Queries

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

var evens = numbers.Where(n => n % 2 == 0).ToList();
var squares = numbers.Select(n => n * n).ToList();
var grouped = numbers.GroupBy(n => n % 2 == 0 ? "Even" : "Odd");

foreach (var g in grouped)
{
    Console.WriteLine($"{g.Key}: {string.Join(", ", g)}");
}
```

---

## Explanation

C# is a modern programming language from Microsoft for the .NET platform.
C# supports OOP, generics, LINQ, async/await, and many other modern features.
.NET is a cross-platform, open-source framework.

---

## Experiments

- Change the code above and run it
- Add a new class with inheritance
- Try a LINQ query on an array

---

## Challenge

Build a simple C# application using this weeks concepts.
Run with: dotnet run

---

## Summary

Module 7 of 16: **LINQ Queries**. C# is a modern programming language for the .NET platform. Next week: **Async/Await & Tasks**.
