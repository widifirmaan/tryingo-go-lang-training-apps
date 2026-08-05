# Dependency Injection

> C# | Module 9

## Learning Objectives

- Understand Dependency Injection pattern
- Use IServiceCollection
- Implement constructor injection
- Understand service lifetimes

---

## Program: DI Pattern

```csharp
public interface IMessageService
{
    void Send(string message);
}

public class EmailService : IMessageService
{
    public void Send(string message)
    {
        Console.WriteLine($"Email sent: {message}");
    }
}

// In Program.cs or Startup.cs:
services.AddScoped<IMessageService, EmailService>();
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

Module 9 of 16: **Dependency Injection**. C# is a modern programming language for the .NET platform. Next week: **Minimal APIs**.
