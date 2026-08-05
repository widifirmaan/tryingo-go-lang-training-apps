# OOP: Classes & Objects

> C# | Module 4

## Learning Objectives

- Create class and object
- Understand properties and methods
- Use constructors
- Understand access modifiers

---

## Program: Classes

```csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public void Greet()
    {
        Console.WriteLine($"Hello, I am {Name}, {Age} years old.");
    }
}

var person = new Person("Budi", 25);
person.Greet();
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

Module 4 of 16: **OOP: Classes & Objects**. C# is a modern programming language for the .NET platform. Next week: **OOP: Inheritance & Polymorphism**.
