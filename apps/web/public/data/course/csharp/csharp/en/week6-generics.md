# Generics & Collections

> C# | Module 6

## Learning Objectives

- Understand generic types
- Use List, Dictionary, and HashSet
- Understand nullable reference types
- Use tuples and records

---

## Program: Generic Types

```csharp
List<string> names = new List<string> { "Budi", "Alice", "Siti" };
Dictionary<string, int> scores = new Dictionary<string, int>
{
    { "Budi", 90 },
    { "Alice", 85 },
    { "Siti", 92 }
};

foreach (var kvp in scores)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}

record Point(int X, int Y);
var p = new Point(10, 20);
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

Module 6 of 16: **Generics & Collections**. C# is a modern programming language for the .NET platform. Next week: **LINQ Queries**.
