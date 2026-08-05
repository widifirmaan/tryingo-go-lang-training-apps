# OOP: Classes & Objects

> C# | Modul 4

## Tujuan Pembelajaran

- Membuat class dan object
- Memahami properties dan methods
- Menggunakan constructor
- Memahami access modifiers

---

## Program: Classes

```csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public void Greet()
    {
        Console.WriteLine($"Hello, I am {Name}, {Age} years old.");
    }
}

var person = new Person("Budi", 25);
person.Greet();
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

Modul 4 dari 16: **OOP: Classes & Objects**. C# adalah bahasa pemrograman modern untuk platform .NET. Minggu depan: **5. OOP: Inheritance & Polymorphism**.
