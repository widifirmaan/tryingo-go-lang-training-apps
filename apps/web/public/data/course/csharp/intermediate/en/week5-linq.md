# LINQ

> **Kategori:** C# | **Level:** Intermediate | **Minggu 5:** LINQ

## Learning Objectives

- LINQ method syntax: Where, OrderBy, Select, GroupBy
- LINQ query syntax: from...where...select
- Aggregate functions: Sum, Average, Count, Min, Max
- Filtering: First, Single, Any, All, Contains
- Projection: Select for data transformation

---

## Program: Querying Data

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public double Price { get; set; }
    public int Stock { get; set; }
}

class Program
{
    static void Main()
    {
        var products = new List<Product>
        {
            new Product { Id = 1, Name = "Laptop", Category = "Elektronik", Price = 15000000, Stock = 10 },
            new Product { Id = 2, Name = "Mouse", Category = "Elektronik", Price = 250000, Stock = 50 },
            new Product { Id = 3, Name = "Buku", Category = "Edukasi", Price = 75000, Stock = 100 },
            new Product { Id = 4, Name = "Keyboard", Category = "Elektronik", Price = 500000, Stock = 30 },
            new Product { Id = 5, Name = "Pensil", Category = "Edukasi", Price = 5000, Stock = 200 },
        };

        // Filter: Where
        var elektronik = products.Where(p => p.Category == "Elektronik");
        Console.WriteLine("=== Elektronik ===");
        foreach (var p in elektronik)
            Console.WriteLine($"  {p.Name}: Rp{p.Price:N0}");

        // Sort: OrderBy
        var sorted = products.OrderBy(p => p.Price);
        Console.WriteLine("\n=== Sort by Price ===");
        foreach (var p in sorted)
            Console.WriteLine($"  {p.Name}: Rp{p.Price:N0}");

        // Select: projection
        var names = products.Select(p => p.Name);
        Console.WriteLine("\n=== Names ===");
        Console.WriteLine($"  [{string.Join(", ", names)}]");

        // Aggregate
        double total = products.Sum(p => p.Price);
        double avg = products.Average(p => p.Price);
        int count = products.Count();
        Console.WriteLine($"\n=== Aggregate ===");
        Console.WriteLine($"  Total: Rp{total:N0}");
        Console.WriteLine($"  Average: Rp{avg:N0}");
        Console.WriteLine($"  Count: {count}");

        // GroupBy
        var grouped = products.GroupBy(p => p.Category);
        Console.WriteLine("\n=== Group by Category ===");
        foreach (var group in grouped)
        {
            Console.WriteLine($"  {group.Key}: {group.Count()} items");
            foreach (var p in group)
                Console.WriteLine($"    - {p.Name}");
        }

        // First, Single
        var first = products.First(p => p.Price > 1000000);
        Console.WriteLine($"\nFirst expensive: {first.Name}");

        // Any, All
        bool anyExpensive = products.Any(p => p.Price > 10000000);
        bool allInStock = products.All(p => p.Stock > 0);
        Console.WriteLine($"Any expensive: {anyExpensive}");
        Console.WriteLine($"All in stock: {allInStock}");

        // Query syntax
        var query = from p in products
                    where p.Price > 100000
                    orderby p.Price descending
                    select new { p.Name, p.Price };

        Console.WriteLine("\n=== Query Syntax ===");
        foreach (var item in query)
            Console.WriteLine($"  {item.Name}: Rp{item.Price:N0}");
    }
}
```

---

## Key Concepts

### LINQ
Language Integrated Query — query data directly in C#.

### Method Syntax
Chain extension methods for queries.

### Query Syntax
SQL-like query expressions.

### Aggregation
Sum, Average, Count, Min, Max.

### Filtering
First, Single, Any, All for conditional queries.

### Projection
Transform data with Select.

---

## Experiments

- Create LINQ query with multiple Where clauses
- Experiment with GroupBy + Aggregate
- Try Select with anonymous types
- Compare query syntax vs method syntax
- Experiment with Skip and Take for pagination

---

## Challenge

Build a sales analysis program: sales data, LINQ queries for total per category, best-selling product, average sales.

---

## Summary

Week 5 of 12: **LINQ** (Level: Intermediate). Elegant data querying. Next week: **Async/Await**.
