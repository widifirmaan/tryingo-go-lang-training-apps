# Tipe Data & Variabel

> **Kategori:** C# | **Level:** Pemula | **Minggu 2:** Tipe Data & Variabel

## Tujuan Pembelajaran

- Membedakan value type (int, double, struct) vs reference type (string, class, array)
- Konversi tipe: implicit, explicit cast, ToString, Parse, TryParse
- Constants dengan const keyword
- Enum untuk kumpulan nilai tetap
- DateTime untuk manipulasi tanggal dan waktu

---

## Program: Konversi & Validasi

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

## Konsep Kunci

### Value vs Reference Type
Value type disimpan di stack (int, double, bool, struct). Reference type di heap (string, class, array).

### Konversi Tipe
- Implicit: `double d = i;` (aman, tidak kehilangan data)
- Explicit: `int j = (int)d;` (cast, bisa kehilangan data)
- Parse: `int.Parse("123")` — throw exception jika gagal
- TryParse: `int.TryParse("123", out result)` — return bool

### Constants
`const double PI = 3.14;` — compile-time constant.

### Enum
`enum Hari { Senin, Selasa }` — kumpulan nilai integer bernama.

### DateTime
`DateTime.Now`, `AddDays`, format string `yyyy-MM-dd`.

---

## Eksperimen

- Coba konversi double ke int — perhatikan pembulatan
- Eksperimen dengan TryParse pada input invalid
- Buat enum dengan nilai custom
- Coba DateTime: AddMonths, AddYears, TimeSpan
- Buat struct sederhana

---

## Tantangan

Buat program konversi mata uang: IDR ↔ USD ↔ EUR. Gunakan decimal untuk mata uang, enum untuk pilihan mata uang.

---

## Ringkasan

Minggu 2 dari 12: **Tipe Data & Variabel** (Level: Pemula). Fondasi type system C#. Minggu depan: **Control Flow**.
