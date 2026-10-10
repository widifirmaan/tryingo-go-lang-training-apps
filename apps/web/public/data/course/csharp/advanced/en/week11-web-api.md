# Web API

> **Kategori:** C# | **Level:** Advanced | **Minggu 11:** Web API

## Learning Objectives

- ASP.NET Core Web API: Controllers, Actions, Routing
- HTTP methods: GET, POST, PUT, DELETE
- Model binding and validation
- Middleware pipeline
- Dependency injection in ASP.NET Core

---

## Program: REST API

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

// Model
class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public double Price { get; set; }
    public int Stock { get; set; }
}

// Controller (simulasi)
class ProductController
{
    private static List<Product> _products = new()
    {
        new Product { Id = 1, Name = "Laptop", Price = 15000000, Stock = 10 },
        new Product { Id = 2, Name = "Mouse", Price = 250000, Stock = 50 },
    };
    private static int _nextId = 3;

    // GET /api/products
    public static List<Product> GetAll() => _products;

    // GET /api/products/{id}
    public static Product? GetById(int id) =>
        _products.FirstOrDefault(p => p.Id == id);

    // POST /api/products
    public static Product Create(Product product)
    {
        product.Id = _nextId++;
        _products.Add(product);
        return product;
    }

    // PUT /api/products/{id}
    public static Product? Update(int id, Product updated)
    {
        var product = GetById(id);
        if (product == null) return null;
        product.Name = updated.Name;
        product.Price = updated.Price;
        product.Stock = updated.Stock;
        return product;
    }

    // DELETE /api/products/{id}
    public static bool Delete(int id)
    {
        var product = GetById(id);
        if (product == null) return false;
        _products.Remove(product);
        return true;
    }
}

// Middleware (simulasi)
class LoggingMiddleware
{
    public static void Log(string method, string path)
    {
        Console.WriteLine($"  [{DateTime.Now:HH:mm:ss}] {method} {path}");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== REST API Simulation ===");

        // GET all
        LoggingMiddleware.Log("GET", "/api/products");
        var products = ProductController.GetAll();
        Console.WriteLine($"GET /api/products -> {products.Count} items");
        foreach (var p in products)
            Console.WriteLine($"  {p.Id}: {p.Name} - Rp{p.Price:N0}");

        // GET by id
        LoggingMiddleware.Log("GET", "/api/products/1");
        var product = ProductController.GetById(1);
        Console.WriteLine($"\nGET /api/products/1 -> {product?.Name}");

        // POST
        LoggingMiddleware.Log("POST", "/api/products");
        var newProduct = ProductController.Create(new Product
        {
            Name = "Keyboard",
            Price = 500000,
            Stock = 30
        });
        Console.WriteLine($"\nPOST /api/products -> Created: {newProduct.Id}: {newProduct.Name}");

        // PUT
        LoggingMiddleware.Log("PUT", "/api/products/1");
        var updated = ProductController.Update(1, new Product
        {
            Name = "Laptop Pro",
            Price = 20000000,
            Stock = 5
        });
        Console.WriteLine($"\nPUT /api/products/1 -> Updated: {updated?.Name}");

        // DELETE
        LoggingMiddleware.Log("DELETE", "/api/products/2");
        bool deleted = ProductController.Delete(2);
        Console.WriteLine($"\nDELETE /api/products/2 -> {deleted}");

        // Final state
        Console.WriteLine("\n=== Final State ===");
        foreach (var p in ProductController.GetAll())
            Console.WriteLine($"  {p.Id}: {p.Name} - Rp{p.Price:N0}");

        Console.WriteLine("\n=== ASP.NET Core Web API ===");
        Console.WriteLine("dotnet new webapi -n MyApi");
        Console.WriteLine("dotnet run");
    }
}
```

---

## Key Concepts

### Web API
ASP.NET Core for building REST APIs.

### Controllers
Classes with methods to handle HTTP requests.

### HTTP Methods
GET, POST, PUT, DELETE for CRUD operations.

### Middleware
Request/response processing pipeline.

### DI
Built-in dependency injection.

---

## Experiments

- Add endpoint with query parameters
- Create middleware for authentication
- Try model validation with Data Annotations
- Create endpoint with pagination
- Experiment with minimal APIs

---

## Challenge

Build a complete REST API for Task Manager: CRUD endpoints, validation, logging middleware, proper HTTP status codes.

---

## Summary

Week 11 of 12: **Web API** (Level: Advanced). Backend development with C#. Next week: **Capstone Project**!
