# Capstone: Full Stack App

> **Kategori:** C# | **Level:** Lanjutan | **Minggu 12:** Capstone: Full Stack App

## Tujuan Pembelajaran

- Menggabungkan semua konsep: OOP, LINQ, async, generics, error handling
- Repository pattern: pemisahan data access dan business logic
- Service layer: business logic terpisah dari controller
- Dependency injection: inject service ke controller
- Testing: unit test, integration test

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

## Konsep Kunci

### Repository Pattern
Pemisahan data access dan business logic.

### Service Layer
Business logic terpisah dari controller. Mudah test.

### DI
Inject service ke controller via constructor.

### Testing
Unit test, integration test, mock.

### Best Practices
- SOLID principles
- Clean architecture
- CQRS pattern

---

## Eksperimen

- Tambah method Update untuk ProductRepository
- Implementasikan async method di service
- Buat unit test untuk OrderService
- Tambah validation untuk OrderItem
- Implementasikan pagination untuk GetAll

---

## Tantangan

Buat aplikasi capstone lengkap: Web API + Service + Repository + Testing. Pilih domain: E-Commerce, Blog, atau Task Manager.

---

## Ringkasan

Minggu 12 dari 12: **Capstone: Full Stack App** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai C# dari nol hingga production-ready.
