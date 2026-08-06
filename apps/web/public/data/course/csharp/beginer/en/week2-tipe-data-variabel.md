# Data Types & Variables

> **Kategori:** C# | **Level:** Beginner | **Minggu 2:** Data Types & Variables

## Learning Objectives

- Distinguish value types (int, double, struct) vs reference types (string, class, array)
- Type conversion: implicit, explicit cast, ToString, Parse, TryParse
- Constants with const keyword
- Enums for fixed value sets
- DateTime for date and time manipulation

---

## Program: Conversion & Validation

```csharp
using System;

class Program
{
    static void Main()
    {
        // Tipe nilai (value types)
        int integer = 42;
        double desimal = 3.14159;
        decimal uang = 1234.56m;
        bool flag = true;
        char karakter = 'A';

        Console.WriteLine($"int: {integer}");
        Console.WriteLine($"double: {desimal:F2}");
        Console.WriteLine($"decimal: {uang:C}");
        Console.WriteLine($"bool: {flag}");
        Console.WriteLine($"char: {karakter}");

        // Tipe referensi (reference types)
        string teks = "Halo, C#!";
        int[] array = { 1, 2, 3, 4, 5 };
        Console.WriteLine($"string: {teks}");
        Console.WriteLine($"array: [{string.Join(", ", array)}]");

        // Konversi tipe
        int i = 42;
        double d = i;          // implicit conversion
        int j = (int)d;        // explicit cast
        string s = i.ToString();
        int parsed = int.Parse("123");

        Console.WriteLine($"\nKonversi: int {i} -> double {d}");
        Console.WriteLine($"Cast: double {d} -> int {j}");
        Console.WriteLine($"ToString: {s}");
        Console.WriteLine($"Parse: {parsed}");

        // TryParse
        if (int.TryParse("456", out int result))
        {
            Console.WriteLine($"TryParse berhasil: {result}");
        }

        // Constants
        const double PI = 3.14159;
        const int MAX_SIZE = 100;
        Console.WriteLine($"\nConstants: PI={PI}, MAX={MAX_SIZE}");

        // Enum
        enum Hari { Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu };
        Hari hariIni = Hari.Jumat;
        Console.WriteLine($"Hari: {hariIni} ({(int)hariIni})");

        // DateTime
        DateTime sekarang = DateTime.Now;
        Console.WriteLine($"\nSekarang: {sekarang:yyyy-MM-dd HH:mm:ss}");
        Console.WriteLine($"Tanggal: {sekarang.AddDays(7):yyyy-MM-dd}");
    }
}
```

---

## Key Concepts

### Value vs Reference Types
Value types on stack, reference types on heap.

### Type Conversion
Implicit (safe), explicit (cast), Parse (throws), TryParse (safe).

### Constants
Compile-time constants with const.

### Enums
Named integer constants.

### DateTime
Date/time manipulation and formatting.

---

## Experiments

- Try double to int conversion — observe rounding
- Experiment with TryParse on invalid input
- Create enum with custom values
- Try DateTime: AddMonths, AddYears, TimeSpan
- Create simple struct

---

## Challenge

Build a currency converter: IDR ↔ USD ↔ EUR. Use decimal for currency, enum for currency selection.

---

## Summary

Week 2 of 12: **Data Types & Variables** (Level: Beginner). C# type system foundation. Next week: **Control Flow**.
