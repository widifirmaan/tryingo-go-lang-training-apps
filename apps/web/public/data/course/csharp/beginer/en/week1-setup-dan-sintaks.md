# Setup, Toolchain & Basic Syntax

> **Kategori:** C# | **Level:** Beginner | **Minggu 1:** Setup, Toolchain & Basic Syntax

## Learning Objectives

- Understand C# as a modern language for the .NET ecosystem
- Install .NET SDK and write your first program
- Learn basic types: int, double, string, bool, var
- String interpolation with $ and verbatim strings with @
- Nullable types: T? for nullable value types

---

## Program: Hello, C#!

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Selamat datang di C#!");
        Console.WriteLine("C# adalah bahasa modern dari Microsoft untuk .NET.");

        // Variabel dan tipe data
        string nama = "Budi";
        int umur = 25;
        double tinggi = 175.5;
        bool aktif = true;

        Console.WriteLine($"Nama: {nama}");
        Console.WriteLine($"Umur: {umur}");
        Console.WriteLine($"Tinggi: {tinggi}");
        Console.WriteLine($"Aktif: {aktif}");

        // Implicit typing
        var pesan = "Halo, Dunia!";
        var angka = 42;
        Console.WriteLine($"Pesan: {pesan}, Angka: {angka}");

        // Null dan nullable
        string? nullableStr = null;
        int? nullableInt = null;
        Console.WriteLine($"Nullable: {nullableStr ?? "kosong"}");

        // String interpolation
        Console.WriteLine($"{nama} berumur {umur} tahun");

        // Verbatim string
        string path = @"C:\Users\Budi\Documents";
        Console.WriteLine($"Path: {path}");
    }
}
```

---

## Key Concepts

### C#'s Role
Modern, object-oriented language by Microsoft. Runs on .NET runtime — cross-platform, high-performance.

### Toolchain
`dotnet new`, `dotnet run`, `dotnet build`, `dotnet test`

### Basic Types
Value types (int, double, bool), reference types (string, class), var for implicit typing.

### String Interpolation
`$"Hello {name}"` — readable string formatting.

### Nullable
`int?` — nullable value types.

---

## Experiments

- Change variable values and observe
- Try data types you haven't used: decimal, long, char
- Experiment with string interpolation
- Create nullable int and check HasValue
- Build a small program combining 2-3 concepts

---

## Challenge

Build a user profile program: name, age, email, address. Use string interpolation for display. Validate with if.

---

## Summary

Week 1 of 12: **Setup, Toolchain & Basic Syntax** (Level: Beginner). C# delivers high productivity with type safety. Next week: **Data Types & Variables**.
