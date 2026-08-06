# OOP: Classes & Objects

> **Kategori:** C# | **Level:** Beginner | **Minggu 4:** OOP: Classes & Objects

## Learning Objectives

- Classes and objects: properties, methods, constructors
- Inheritance: base classes and derived classes
- Interfaces: method contract definitions
- Collections: List<T> for object collections
- Object initializers and auto-properties

---

## Program: Store System

```csharp
using System;
using System.Collections.Generic;

class Product
{
    // Properties
    public int Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public int Stock { get; set; }

    // Constructor
    public Product(int id, string name, double price)
    {
        Id = id;
        Name = name;
        Price = price;
        Stock = 0;
    }

    // Method
    public string Info()
    {
        return $"{Name}: Rp{Price:N0} (stok: {Stock})";
    }

    public void ApplyDiscount(double percent)
    {
        Price -= Price * (percent / 100);
    }

    public void Restock(int amount)
    {
        Stock += amount;
    }
}

// Inheritance
class Electronics : Product
{
    public int WarrantyYears { get; set; }

    public Electronics(int id, string name, double price, int warranty)
        : base(id, name, price)
    {
        WarrantyYears = warranty;
    }

    public new string Info()
    {
        return $"{base.Info()}, Garansi: {WarrantyYears} tahun";
    }
}

// Interface
interface IDiscountable
{
    void ApplyDiscount(double percent);
}

class Program
{
    static void Main()
    {
        // Object
        Product p1 = new Product(1, "Laptop", 15000000);
        p1.Restock(10);
        Console.WriteLine(p1.Info());

        p1.ApplyDiscount(10);
        Console.WriteLine($"Setelah diskon: {p1.Info()}");

        // Inheritance
        Electronics laptop = new Electronics(2, "Laptop Pro", 20000000, 3);
        Console.WriteLine(laptop.Info());

        // Collection
        List<Product> products = new List<Product>
        {
            p1,
            laptop,
            new Product(3, "Mouse", 250000)
        };

        Console.WriteLine("\n=== Daftar Produk ===");
        foreach (var p in products)
        {
            Console.WriteLine(p.Info());
        }

        // Object initializer
        Product p4 = new Product(4, "Keyboard", 500000)
        {
            Stock = 15
        };
        Console.WriteLine(p4.Info());
    }
}
```

---

## Key Concepts

### Classes & Objects
Classes are blueprints, objects are instances. Properties with get/set accessors.

### Constructors
Special methods for object initialization. Can be overloaded.


### Inheritance
Derived classes inherit from base classes. Use base() to call parent constructor.

### Interfaces
Define method contracts that classes must implement.

### List<T>
Generic collection with Add, Remove, foreach.

### Object Initializers
Set properties during object creation.

---

## Experiments

- Add new method to Product
- Create new class inheriting from Product
- Experiment with interface implementation
- Try List<T> with Sort and Find
- Create constructor overloading

---

## Challenge

Build a library system: class Book, Member, Loan. Methods: Borrow, Return, Search. Use List<T> and inheritance.

---

## Summary

Week 4 of 12: **OOP: Classes & Objects** (Level: Beginner). Beginner phase complete! Next week: **LINQ** (Intermediate).
