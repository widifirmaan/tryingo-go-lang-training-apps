# Entity Framework Core

> C# | Module 11

## Learning Objectives

- Understand Entity Framework Core
- Use code-first migrations
- Understand DbContext and DbSet
- Implement CRUD with EF Core

---

## Program: Database Access

```csharp
public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseNpgsql("Host=localhost;Database=mydb");
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
}

// Migration:
// dotnet ef migrations add InitialCreate
// dotnet ef database update
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

Module 11 of 16: **Entity Framework Core**. C# is a modern programming language for the .NET platform. Next week: **Middleware & HTTP Pipeline**.
