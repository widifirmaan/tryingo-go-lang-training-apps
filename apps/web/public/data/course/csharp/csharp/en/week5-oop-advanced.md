# OOP: Inheritance & Polymorphism

> C# | Module 5

## Learning Objectives

- Understand inheritance with base and derived
- Use override and virtual
- Understand abstract class and interface
- Use sealed keyword

---

## Program: Inheritance

```csharp
public class Animal
{
    public string Name { get; set; }
    public virtual void Speak()
    {
        Console.WriteLine("Some sound");
    }
}

public class Dog : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Woof!");
    }
}

public class Cat : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Meow!");
    }
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

Module 5 of 16: **OOP: Inheritance & Polymorphism**. C# is a modern programming language for the .NET platform. Next week: **Generics & Collections**.
