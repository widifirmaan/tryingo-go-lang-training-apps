# LINQ Queries

> C# | Modul 7

## Tujuan Pembelajaran

- Menggunakan LINQ to Objects
- Memahami query syntax dan method syntax
- Menggunakan Where, Select, GroupBy
- Memahami deferred execution

---

## Program: Data Queries

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

var evens = numbers.Where(n => n % 2 == 0).ToList();
var squares = numbers.Select(n => n * n).ToList();
var grouped = numbers.GroupBy(n => n % 2 == 0 ? "Even" : "Odd");

foreach (var g in grouped)
{
    Console.WriteLine($"{g.Key}: {string.Join(", ", g)}");
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

Modul 7 dari 16: **LINQ Queries**. C# adalah bahasa pemrograman modern untuk platform .NET. Minggu depan: **8. Async/Await & Tasks**.
