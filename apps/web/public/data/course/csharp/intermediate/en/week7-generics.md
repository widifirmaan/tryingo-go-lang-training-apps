# Generics

> **Kategori:** C# | **Level:** Intermediate | **Minggu 7:** Generics

## Learning Objectives

- Generic class: class Repository<T> where T : class
- Generic method: static T FirstOrDefault<T>(List<T>, Func<T,bool>)
- Generic interface: IRepository<T>
- Generic constraints: where T : class, struct, new(), BaseClass
- Nullable reference types: T? for nullable reference types

---

## Program: Generic Repository

```csharp
using System;
using System.Collections.Generic;

// Generic class
class Repository<T> where T : class
{
    private List<T> _items = new List<T>();

    public void Add(T item) => _items.Add(item);
    public void Remove(T item) => _items.Remove(item);
    public List<T> GetAll() => _items;
    public T? Find(Predicate<T> predicate) => _items.Find(predicate);
}

// Generic method
class Utility
{
    public static T? FirstOrDefault<T>(List<T> items, Func<T, bool> predicate)
    {
        foreach (var item in items)
            if (predicate(item)) return item;
        return default;
    }

    public static List<TResult> Map<T, TResult>(List<T> items, Func<T, TResult> mapper)
    {
        var result = new List<TResult>();
        foreach (var item in items)
            result.Add(mapper(item));
        return result;
    }
}

// Generic interface
interface IRepository<T> where T : class
{
    void Add(T item);
    void Remove(T item);
    List<T> GetAll();
    T? FindById(int id);
}

// Entity
class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public double Price { get; set; }
}

class Program
{
    static void Main()
    {
        // Generic class
        var repo = new Repository<Product>();
        repo.Add(new Product { Id = 1, Name = "Laptop", Price = 15000000 });
        repo.Add(new Product { Id = 2, Name = "Mouse", Price = 250000 });
        repo.Add(new Product { Id = 3, Name = "Keyboard", Price = 500000 });

        Console.WriteLine("=== Repository<Product> ===");
        foreach (var p in repo.GetAll())
            Console.WriteLine($"  {p.Id}: {p.Name} - Rp{p.Price:N0}");

        // Find
        var found = repo.Find(p => p.Price > 1000000);
        Console.WriteLine($"\nFound expensive: {found?.Name}");

        // Generic method
        var products = repo.GetAll();
        var first = Utility.FirstOrDefault(products, p => p.Name.StartsWith("M"));
        Console.WriteLine($"\nFirst with M: {first?.Name}");

        // Map
        var names = Utility.Map(products, p => p.Name);
        Console.WriteLine($"Names: [{string.Join(", ", names)}]");

        // Generic constraints
        // where T : class — harus reference type
        // where T : struct — harus value type
        // where T : new() — harus punya parameterless constructor
        // where T : Product — harus turunan Product

        // Nullable reference types
        string? nullable = null;
        string notNull = "hola";
        Console.WriteLine($"\nNullable: {nullable ?? "kosong"}");
        Console.WriteLine($"NotNull: {notNull}");
    }
}
```

---

## Key Concepts

### Generic Classes
Type parameter for reusable, type-safe classes.

### Generic Methods
Methods with their own type parameters.

### Generic Interfaces
Interfaces with type parameters.

### Constraints
Restrict type parameters with where clauses.

### Nullable Reference Types
`string?` for nullable reference types.

---

## Experiments

- Create generic class Stack<T>
- Experiment with multiple constraints
- Create generic method with Func<T, TResult>
- Try generic interface implementation
- Experiment with covariance/contravariance

---

## Challenge

Build generic Repository<T> with methods: Add, Remove, FindById, Find all. Implement for Product and User.

---

## Summary

Week 7 of 12: **Generics** (Level: Intermediate). Type-safe reusable code. Next week: **Error Handling**.
