# Configuration & Logging

> C# | Module 14

## Learning Objectives

- Use IConfiguration for app settings
- Implement logging with ILogger
- Use environment variables
- Understand appsettings.json

---

## Program: App Config

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddJsonFile("appsettings.json")
    .AddEnvironmentVariables();

builder.Logging
    .AddConsole()
    .AddDebug()
    .SetMinimumLevel(LogLevel.Information);
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

Module 14 of 16: **Configuration & Logging**. C# is a modern programming language for the .NET platform. Next week: **Deployment & Docker**.
