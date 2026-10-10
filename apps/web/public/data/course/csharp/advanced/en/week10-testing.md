# Testing

> **Kategori:** C# | **Level:** Advanced | **Minggu 10:** Testing

## Learning Objectives

- Unit testing with xUnit/NUnit
- Test classes and methods with [Fact]/[Test]
- Assert: Equal, True, False, Throws
- Mocking with Moq for dependencies
- Integration tests with WebApplicationFactory

---

## Program: Unit Tests & Mocks

```csharp
using System;
using System.Collections.Generic;

// Class yang akan diuji
class Calculator
{
    public int Add(int a, int b) => a + b;
    public double Divide(double a, double b)
    {
        if (b == 0) throw new DivideByZeroException();
        return a / b;
    }
    public bool IsEven(int n) => n % 2 == 0;
}

class ProductService
{
    private readonly List<Product> _products = new();

    public void Add(Product p) => _products.Add(p);
    public List<Product> GetAll() => _products;
    public Product? FindById(int id) => _products.Find(p => p.Id == id);
    public void Delete(int id)
    {
        var p = FindById(id);
        if (p != null) _products.Remove(p);
    }
}

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
        Console.WriteLine("=== Simulasi Unit Test ===");

        // Test Calculator
        var calc = new Calculator();

        // Test Add
        int result = calc.Add(2, 3);
        Console.WriteLine(result == 5
            ? "✓ Add(2,3) = 5"
            : $"✗ Add(2,3) = {result}, expected 5");

        result = calc.Add(-1, -1);
        Console.WriteLine(result == -2
            ? "✓ Add(-1,-1) = -2"
            : $"✗ Add(-1,-1) = {result}, expected -2");

        // Test Divide
        double divResult = calc.Divide(10, 2);
        Console.WriteLine(Math.Abs(divResult - 5.0) < 0.001
            ? "✓ Divide(10,2) = 5.0"
            : $"✗ Divide(10,2) = {divResult}");

        // Test IsEven
        Console.WriteLine(calc.IsEven(4)
            ? "✓ IsEven(4) = true"
            : "✗ IsEven(4) failed");

        // Test ProductService
        Console.WriteLine("\n=== ProductService Test ===");
        var service = new ProductService();
        service.Add(new Product { Id = 1, Name = "Laptop", Price = 15000000 });
        service.Add(new Product { Id = 2, Name = "Mouse", Price = 250000 });

        Console.WriteLine(service.GetAll().Count == 2
            ? "✓ GetAll returns 2 products"
            : "✗ GetAll failed");

        var found = service.FindById(1);
        Console.WriteLine(found?.Name == "Laptop"
            ? "✓ FindById(1) = Laptop"
            : "✗ FindById failed");

        service.Delete(1);
        Console.WriteLine(service.GetAll().Count == 1
            ? "✓ Delete(1) — 1 product left"
            : "✗ Delete failed");

        Console.WriteLine("\n=== Semua test passed! ===");
        Console.WriteLine("xunit: dotnet test");
        Console.WriteLine("nunit: dotnet test");
        Console.WriteLine("moq: Install-Package Moq");
    }
}
```

---

## Key Concepts

### Unit Tests
[Fact] (xUnit) or [Test] (NUnit) attributes for test methods.

### Assert
Equal, True, Throws for verification.

### Mocking
Create fake dependencies with Moq.

### Integration Tests
Test APIs end-to-end with WebApplicationFactory.

### Best Practices
Arrange-Act-Assert pattern, one assertion per test.

---

## Experiments

- Create tests for Calculator with edge cases
- Experiment with Assert.Throws for exceptions
- Create mock objects for repositories
- Try tests with [Theory] and [InlineData]
- Create integration tests for APIs

---

## Challenge

Build a calculator library with unit tests: add, subtract, multiply, divide, power, factorial. Minimum 10 test cases.

---

## Summary

Week 10 of 12: **Testing** (Level: Advanced). Code quality and reliability. Next week: **Web API**.
