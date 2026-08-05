# OOP: Inheritance & Polymorphism

> C# | Modul 5

## Tujuan Pembelajaran

- Memahami inheritance dengan base dan derived
- Menggunakan override dan virtual
- Memahami abstract class dan interface
- Menggunakan sealed keyword

---

## Program: Inheritance

```csharp
public class Animal
{
    public string Name { get; set; }
    public virtual void Speak()
    {
        Console.WriteLine("Some sound");
    }
}

public class Dog : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Woof!");
    }
}

public class Cat : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Meow!");
    }
}
```

---

## Penjelasan

C# adalah bahasa pemrograman modern dari Microsoft untuk platform .NET.
C# mendukung OOP, generics, LINQ, async/await, dan banyak fitur modern lainnya.
.NET adalah framework yang cross-platform dan open-source.

---

## Eksperimen

- Ubah kode di atas dan jalankan
- Tambah class baru dengan inheritance
- Coba LINQ query pada array

---

## Tantangan

Buat aplikasi C# sederhana menggunakan konsep minggu ini.
Jalankan dengan: dotnet run

---

## Ringkasan

Modul 5 dari 16: **OOP: Inheritance & Polymorphism**. C# adalah bahasa pemrograman modern untuk platform .NET. Minggu depan: **6. Generics & Collections**.
