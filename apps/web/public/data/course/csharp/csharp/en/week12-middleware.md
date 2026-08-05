# Middleware & HTTP Pipeline

> C# | Module 12

## Learning Objectives

- Understand middleware pipeline
- Create custom middleware
- Use logging middleware
- Understand exception handling middleware

---

## Program: HTTP Pipeline

```csharp
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.Use(async (context, next) =>
{
    Console.WriteLine($"[{DateTime.Now}] {context.Request.Method} {context.Request.Path}");
    await next(context);
});

app.MapGet("/", () => "Hello");
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

Module 12 of 16: **Middleware & HTTP Pipeline**. C# is a modern programming language for the .NET platform. Next week: **Testing with xUnit**.
