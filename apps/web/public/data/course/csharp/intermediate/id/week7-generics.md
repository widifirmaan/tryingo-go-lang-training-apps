# Generics

> **Kategori:** C# | **Level:** Menengah | **Minggu 7:** Generics

## Tujuan Pembelajaran

- Generic class: class Repository<T> where T : class
- Generic method: static T FirstOrDefault<T>(List<T>, Func<T,bool>)
- Generic interface: IRepository<T>
- Generic constraints: where T : class, struct, new(), BaseClass
- Nullable reference types: T? untuk reference type nullable

---

## Program: Repository Generik

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

## Konsep Kunci

### Generic Class
`class Repository<T>` — class dengan type parameter. Bisa dipakai untuk tipe apapun.

### Generic Method
`static T FirstOrDefault<T>()` — method dengan type parameter sendiri.

### Generic Interface
`interface IRepository<T>` — interface generik.

### Constraints
- `where T : class` — reference type
- `where T : struct` — value type
- `where T : new()` — punya parameterless constructor
- `where T : Product` — turunan Product

### Nullable Reference Types
`string?` — reference type yang bisa null. Di-enable di C# 8+.

---

## Eksperimen

- Buat generic class Stack<T>
- Eksperimen dengan multiple constraints
- Buat generic method dengan Func<T, TResult>
- Coba generic interface implementation
- Eksperimen dengan covariance/contravariance

---

## Tantangan

Buat generic Repository<T> dengan method: Add, Remove, FindById, Find semua. Implement untuk Product dan User.

---

## Ringkasan

Minggu 7 dari 12: **Generics** (Level: Menengah). Type-safe reusable code. Minggu depan: **Error Handling**.
