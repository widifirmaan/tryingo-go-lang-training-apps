# Minimal APIs

> C# | Module 10

## Learning Objectives

- Create Minimal API with .NET
- Use MapGet, MapPost, MapPut, MapDelete
- Use route parameters
- Implement request/response models

---

## Program: Web API

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/api/users", () => new[] { "Budi", "Alice" });
app.MapPost("/api/users", (User user) =>
{
    return Results.Created($"/api/users/{user.Id}", user);
});

app.Run();
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

Module 10 of 16: **Minimal APIs**. C# is a modern programming language for the .NET platform. Next week: **Entity Framework Core**.
