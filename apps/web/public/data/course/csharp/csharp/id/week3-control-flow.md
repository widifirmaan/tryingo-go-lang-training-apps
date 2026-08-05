# Control Flow

> C# | Modul 3

## Tujuan Pembelajaran

- Menggunakan if/else dan switch
- Menggunakan for, while, dan foreach loop
- Memahami break dan continue
- Menggunakan pattern matching

---

## Program: Conditionals & Loops

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

foreach (var num in numbers)
{
    if (num % 2 == 0)
        Console.WriteLine($"{num} is even");
    else
        Console.WriteLine($"{num} is odd");
}

switch (DateTime.Now.DayOfWeek)
{
    case DayOfWeek.Monday:
        Console.WriteLine("Monday");
        break;
    default:
        Console.WriteLine("Other day");
        break;
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

Modul 3 dari 16: **Control Flow**. C# adalah bahasa pemrograman modern untuk platform .NET. Minggu depan: **4. OOP: Classes & Objects**.
