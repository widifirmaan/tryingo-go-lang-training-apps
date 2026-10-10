# Control Flow

> **Kategori:** C# | **Level:** Beginner | **Minggu 3:** Control Flow

## Learning Objectives

- If-else with complex conditions
- Switch expressions (C# 8+) with pattern matching
- For, while, do-while, foreach loops
- Break and continue for loop control
- Pattern matching with is keyword

---

## Program: Grades & Menu

```csharp
using System;

class Program
{
    static void Main()
    {
        // If-else
        int score = 85;
        if (score >= 90)
        {
            Console.WriteLine("Grade: A");
        }
        else if (score >= 75)
        {
            Console.WriteLine("Grade: B");
        }
        else if (score >= 60)
        {
            Console.WriteLine("Grade: C");
        }
        else
        {
            Console.WriteLine("Grade: D");
        }

        // Switch expression (C# 8+)
        string grade = score switch
        {
            >= 90 => "A",
            >= 75 => "B",
            >= 60 => "C",
            _ => "D"
        };
        Console.WriteLine($"Switch expression: {grade}");

        // For loop
        Console.Write("\nFor: ");
        for (int i = 1; i <= 5; i++)
        {
            Console.Write($"{i} ");
        }
        Console.WriteLine();

        // While loop
        int n = 1;
        Console.Write("While: ");
        while (n <= 3)
        {
            Console.Write($"{n} ");
            n++;
        }
        Console.WriteLine();

        // Do-while
        int m = 1;
        Console.Write("Do-while: ");
        do
        {
            Console.Write($"{m} ");
            m++;
        } while (m <= 3);
        Console.WriteLine();

        // Foreach
        string[] buah = { "apel", "mangga", "pisang" };
        Console.Write("Foreach: ");
        foreach (string b in buah)
        {
            Console.Write($"{b} ");
        }
        Console.WriteLine();

        // Break dan continue
        Console.Write("\nBreak at 3: ");
        for (int i = 1; i <= 5; i++)
        {
            if (i == 3) break;
            Console.Write($"{i} ");
        }
        Console.WriteLine();

        Console.Write("Continue at 3: ");
        for (int i = 1; i <= 5; i++)
        {
            if (i == 3) continue;
            Console.Write($"{i} ");
        }
        Console.WriteLine();

        // Pattern matching
        object obj = 42;
        if (obj is int num)
        {
            Console.WriteLine($"\nis pattern: {num} adalah integer");
        }
    }
}
```

---

## Key Concepts

### If-Else
Boolean conditions with logical operators.

### Switch Expressions
C# 8+ concise pattern matching syntax.

### Loops
for, while, do-while, foreach for different iteration needs.

### Break & Continue
Exit loop or skip iteration.

### Pattern Matching
Type checking and assignment in one expression.

---

## Experiments

- Change score values and observe grade changes
- Try switch expression with string patterns
- Create nested loop for multiplication table
- Experiment with pattern matching on objects
- Build interactive menu with while + switch

---

## Challenge

Build a calculator with menu: add, subtract, multiply, divide, power. Use switch expression and input validation.

---

## Summary

Week 3 of 12: **Control Flow** (Level: Beginner). Program logic in C#. Next week: **OOP: Classes & Objects**.
