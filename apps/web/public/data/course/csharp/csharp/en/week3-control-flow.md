# Control Flow

> C# | Module 3

## Learning Objectives

- Use if/else and switch
- Use for, while, and foreach loops
- Understand break and continue
- Use pattern matching

---

## Program: Conditionals & Loops

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

foreach (var num in numbers)
{
    if (num % 2 == 0)
        Console.WriteLine($"{num} is even");
    else
        Console.WriteLine($"{num} is odd");
}

switch (DateTime.Now.DayOfWeek)
{
    case DayOfWeek.Monday:
        Console.WriteLine("Monday");
        break;
    default:
        Console.WriteLine("Other day");
        break;
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

Module 3 of 16: **Control Flow**. C# is a modern programming language for the .NET platform. Next week: **OOP: Classes & Objects**.
