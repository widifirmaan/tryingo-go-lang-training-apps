# Generics & Collections

> C# | Modul 6

## Tujuan Pembelajaran

- Memahami generic types
- Menggunakan List, Dictionary, dan HashSet
- Memahami nullable reference types
- Menggunakan tuples dan records

---

## Program: Generic Types

```csharp
List<string> names = new List<string> { "Budi", "Alice", "Siti" };
Dictionary<string, int> scores = new Dictionary<string, int>
{
    { "Budi", 90 },
    { "Alice", 85 },
    { "Siti", 92 }
};

foreach (var kvp in scores)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}

record Point(int X, int Y);
var p = new Point(10, 20);
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

Modul 6 dari 16: **Generics & Collections**. C# adalah bahasa pemrograman modern untuk platform .NET. Minggu depan: **7. LINQ Queries**.
