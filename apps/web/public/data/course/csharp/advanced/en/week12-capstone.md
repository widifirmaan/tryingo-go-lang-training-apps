# Capstone: Full Stack App

> **Kategori:** C# | **Level:** Advanced | **Minggu 12:** Capstone: Full Stack App

## Learning Objectives

- Combine all concepts: OOP, LINQ, async, generics, error handling
- Repository pattern: separate data access and business logic
- Service layer: business logic separate from controllers
- Dependency injection: inject services into controllers
- Testing: unit tests, integration tests

---

## Program: E-Commerce API

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

// Models
class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public double Price { get; set; }
    public int Stock { get; set; }
}

class Order
{
    public int Id { get; set; }
    public List<OrderItem> Items { get; set; } = new();
    public double Total => Items.Sum(i => i.Subtotal);
    public string Status { get; set; } = "Pending";
}

class OrderItem
{
    public int ProductId { get; set; }
    public string ProductName { get; set; } = "";
    public int Quantity { get; set; }
    public double Price { get; set; }
    public double Subtotal => Quantity * Price;
}

// Repository
class ProductRepository
{
    private List<Product> _products = new()
    {
        new Product { Id = 1, Name = "Laptop", Price = 15000000, Stock = 10 },
        new Product { Id = 2, Name = "Mouse", Price = 250000, Stock = 50 },
        new Product { Id = 3, Name = "Keyboard", Price = 500000, Stock = 30 },
    };
    private int _nextId = 4;

    public List<Product> GetAll() => _products;
    public Product? GetById(int id) => _products.FirstOrDefault(p => p.Id == id);
    public Product Create(Product p) { p.Id = _nextId++; _products.Add(p); return p; }
    public bool Delete(int id) => _products.RemoveAll(p => p.Id == id) > 0;
}

// Service
class OrderService
{
    private ProductRepository _productRepo;
    private List<Order> _orders = new();
    private int _nextOrderId = 1;

    public OrderService(ProductRepository repo) => _productRepo = repo;

    public Order CreateOrder(List<OrderItem> items)
    {
        var order = new Order { Id = _nextOrderId++, Items = items };
        _orders.Add(order);
        return order;
    }

    public List<Order> GetAllOrders() => _orders;
    public Order? GetOrder(int id) => _orders.FirstOrDefault(o => o.Id == id);
}

class Program
{
    static void Main()
    {
        var productRepo = new ProductRepository();
        var orderService = new OrderService(productRepo);

        // Display products
        Console.WriteLine("=== Products ===");
        foreach (var p in productRepo.GetAll())
            Console.WriteLine($"  {p.Id}: {p.Name} - Rp{p.Price:N0} (stok: {p.Stock})");

        // Create order
        Console.WriteLine("\n=== Create Order ===");
        var items = new List<OrderItem>
        {
            new OrderItem { ProductId = 1, ProductName = "Laptop", Quantity = 1, Price = 15000000 },
            new OrderItem { ProductId = 2, ProductName = "Mouse", Quantity = 2, Price = 250000 },
        };

        var order = orderService.CreateOrder(items);
        Console.WriteLine($"Order #{order.Id}");
        foreach (var item in order.Items)
            Console.WriteLine($"  {item.ProductName} x{item.Quantity} = Rp{item.Subtotal:N0}");
        Console.WriteLine($"Total: Rp{order.Total:N0}");

        // List orders
        Console.WriteLine("\n=== All Orders ===");
        foreach (var o in orderService.GetAllOrders())
            Console.WriteLine($"  Order #{o.Id}: Rp{o.Total:N0} ({o.Status})");

        // Add product
        Console.WriteLine("\n=== Add Product ===");
        var newProduct = productRepo.Create(new Product { Name = "Monitor", Price = 3000000, Stock = 15 });
        Console.WriteLine($"Added: {newProduct.Id}: {newProduct.Name}");

        Console.WriteLine("\n=== Final Products ===");
        foreach (var p in productRepo.GetAll())
            Console.WriteLine($"  {p.Id}: {p.Name} - Rp{p.Price:N0}");

        Console.WriteLine("\n=== CLI Simulation ===");
        Console.WriteLine("dotnet run -- list-products");
        Console.WriteLine("dotnet run -- create-order --product 1 --qty 2");
        Console.WriteLine("dotnet run -- list-orders");
    }
}
```

---

## Key Concepts

### Repository Pattern
Separate data access from business logic.

### Service Layer
Business logic separate from controllers.

### DI
Constructor injection for dependencies.

### Testing
Unit and integration tests with mocking.

### Best Practices
SOLID principles, clean architecture.

---

## Experiments

- Add Update method for ProductRepository
- Implement async methods in service
- Create unit tests for OrderService
- Add validation for OrderItem
- Implement pagination for GetAll

---

## Challenge

Build a complete capstone application: Web API + Service + Repository + Testing. Choose domain: E-Commerce, Blog, or Task Manager.

---

## Summary

Week 12 of 12: **Capstone: Full Stack App** (Level: Advanced). Complete! 🎉 You've mastered C# from scratch to production-ready.
