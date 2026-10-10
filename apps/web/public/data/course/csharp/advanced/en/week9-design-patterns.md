# Design Patterns

> **Kategori:** C# | **Level:** Advanced | **Minggu 9:** Design Patterns

## Learning Objectives

- Strategy Pattern: interchangeable family of algorithms
- Singleton Pattern: single global instance
- Factory Pattern: object creation without exposing logic
- Repository Pattern: abstraction for data access
- Dependency Injection: inject dependencies from outside

---

## Program: Repository & Strategy

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

// Strategy Pattern
interface IPaymentStrategy
{
    void Pay(double amount);
}

class CreditCardPayment : IPaymentStrategy
{
    public void Pay(double amount) =>
        Console.WriteLine($"  Credit Card: Rp{amount:N0}");
}

class PayPalPayment : IPaymentStrategy
{
    public void Pay(double amount) =>
        Console.WriteLine($"  PayPal: Rp{amount:N0}");
}

class BankTransferPayment : IPaymentStrategy
{
    public void Pay(double amount) =>
        Console.WriteLine($"  Bank Transfer: Rp{amount:N0}");
}

class PaymentContext
{
    private IPaymentStrategy _strategy;

    public PaymentContext(IPaymentStrategy strategy) => _strategy = strategy;
    public void SetStrategy(IPaymentStrategy strategy) => _strategy = strategy;
    public void ExecutePayment(double amount) => _strategy.Pay(amount);
}

// Singleton Pattern
class DatabaseConnection
{
    private static DatabaseConnection? _instance;
    private static readonly object _lock = new();

    public string ConnectionString { get; }

    private DatabaseConnection()
    {
        ConnectionString = "Server=localhost;Database=mydb";
    }

    public static DatabaseConnection Instance
    {
        get
        {
            lock (_lock)
            {
                return _instance ??= new DatabaseConnection();
            }
        }
    }
}

// Factory Pattern
interface IProduct
{
    string Name { get; }
    double Price { get; }
}

class Book : IProduct
{
    public string Name => "Buku";
    public Price => 75000;
}

class Electronics : IProduct
{
    public string Name => "Laptop";
    public Price => 15000000;
}

class ProductFactory
{
    public static IProduct Create(string type) => type.ToLower() switch
    {
        "book" => new Book(),
        "electronics" => new Electronics(),
        _ => throw new ArgumentException($"Unknown type: {type}")
    };
}

class Program
{
    static void Main()
    {
        // Strategy
        Console.WriteLine("=== Strategy Pattern ===");
        var payment = new PaymentContext(new CreditCardPayment());
        payment.ExecutePayment(1000000);

        payment.SetStrategy(new PayPalPayment());
        payment.ExecutePayment(500000);

        payment.SetStrategy(new BankTransferPayment());
        payment.ExecutePayment(2000000);

        // Singleton
        Console.WriteLine("\n=== Singleton Pattern ===");
        var db1 = DatabaseConnection.Instance;
        var db2 = DatabaseConnection.Instance;
        Console.WriteLine($"Same instance: {ReferenceEquals(db1, db2)}");
        Console.WriteLine($"Connection: {db1.ConnectionString}");

        // Factory
        Console.WriteLine("\n=== Factory Pattern ===");
        var products = new List<IProduct>
        {
            ProductFactory.Create("book"),
            ProductFactory.Create("electronics")
        };

        foreach (var p in products)
            Console.WriteLine($"  {p.Name}: Rp{p.Price:N0}");
    }
}
```

---

## Key Concepts

### Strategy Pattern
Interchangeable algorithms at runtime.

### Singleton Pattern
Single global instance with thread safety.

### Factory Pattern
Object creation without exposing logic.

### Repository Pattern
Abstraction for data access.

### Dependency Injection
Inject dependencies from outside for testability.

---

## Experiments

- Create strategy pattern for sorting
- Experiment with singleton for config manager
- Create factory pattern for notifications
- Implement repository pattern
- Try dependency injection with interfaces

---

## Challenge

Build a payment system with strategy pattern: CreditCard, PayPal, BankTransfer, Crypto. Add factory for payment creation.

---

## Summary

Week 9 of 12: **Design Patterns** (Level: Advanced). Reusable solutions for common problems. Next week: **Testing**.
