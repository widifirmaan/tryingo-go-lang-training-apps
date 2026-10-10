# OOP: Class & Object

> **Kategori:** C# | **Level:** Pemula | **Minggu 4:** OOP: Class & Object

## Tujuan Pembelajaran

- Class dan object: properties, method, constructor
- Inheritance: base class dan derived class
- Interface: definisi kontrak method
- Collection: List<T> untuk kumpulan object
- Object initializer dan auto-properties

---

## Program: Sistem Toko

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

## Konsep Kunci

### Class & Object
Class adalah blueprint. Object adalah instance. Properties dengan get/set.

### Constructor
Method khusus untuk inisialisasi object. Bisa multiple (overloading).

### Inheritance
`class Electronics : Product` — warisi semua member. `base()` untuk panggil parent constructor.

### Interface
`interface IDiscountable { void ApplyDiscount(); }` — kontrak yang harus diimplement.

### List<T>
Generic collection. `Add`, `Remove`, `foreach`.

### Object Initializer
`new Product { Id = 1, Name = "X" }` — set property saat buat object.

---

## Eksperimen

- Tambah method baru pada Product
- Buat class baru yang inherit dari Product
- Eksperimen dengan interface implementation
- Coba List<T> dengan Sort dan Find
- Buat constructor overloading

---

## Tantangan

Buat sistem perpustakaan: class Book, Member, Loan. Method: Borrow, Return, Search. Gunakan List<T> dan inheritance.

---

## Ringkasan

Minggu 4 dari 12: **OOP: Class & Object** (Level: Pemula). Selesai fase Beginner! Minggu depan: **LINQ** (Intermediate).
