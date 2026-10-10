# Control Flow

> **Kategori:** C# | **Level:** Pemula | **Minggu 3:** Control Flow

## Tujuan Pembelajaran

- If-else dengan kondisi kompleks
- Switch expression (C# 8+) dengan pattern matching
- For, while, do-while, foreach loop
- Break dan continue untuk kontrol loop
- Pattern matching dengan is keyword

---

## Program: Grade & Menu

```csharp
using System;

class Program
{
    static void Main()
    {
        // If-else
        int score = 85;
        if (score >= 90)
        {
            Console.WriteLine("Grade: A");
        }
        else if (score >= 75)
        {
            Console.WriteLine("Grade: B");
        }
        else if (score >= 60)
        {
            Console.WriteLine("Grade: C");
        }
        else
        {
            Console.WriteLine("Grade: D");
        }

        // Switch expression (C# 8+)
        string grade = score switch
        {
            >= 90 => "A",
            >= 75 => "B",
            >= 60 => "C",
            _ => "D"
        };
        Console.WriteLine($"Switch expression: {grade}");

        // For loop
        Console.Write("\nFor: ");
        for (int i = 1; i <= 5; i++)
        {
            Console.Write($"{i} ");
        }
        Console.WriteLine();

        // While loop
        int n = 1;
        Console.Write("While: ");
        while (n <= 3)
        {
            Console.Write($"{n} ");
            n++;
        }
        Console.WriteLine();

        // Do-while
        int m = 1;
        Console.Write("Do-while: ");
        do
        {
            Console.Write($"{m} ");
            m++;
        } while (m <= 3);
        Console.WriteLine();

        // Foreach
        string[] buah = { "apel", "mangga", "pisang" };
        Console.Write("Foreach: ");
        foreach (string b in buah)
        {
            Console.Write($"{b} ");
        }
        Console.WriteLine();

        // Break dan continue
        Console.Write("\nBreak at 3: ");
        for (int i = 1; i <= 5; i++)
        {
            if (i == 3) break;
            Console.Write($"{i} ");
        }
        Console.WriteLine();

        Console.Write("Continue at 3: ");
        for (int i = 1; i <= 5; i++)
        {
            if (i == 3) continue;
            Console.Write($"{i} ");
        }
        Console.WriteLine();

        // Pattern matching
        object obj = 42;
        if (obj is int num)
        {
            Console.WriteLine($"\nis pattern: {num} adalah integer");
        }
    }
}
```

---

## Konsep Kunci

### If-Else
Kondisi boolean. Bisa nested dan dengan logical operators.

### Switch Expression
C# 8+: `x switch { >= 90 => "A", _ => "D" }` — lebih concise dari switch statement.

### Loop
- `for`: iterasi dengan counter
- `while`: cek kondisi dulu
- `do-while`: jalankan dulu, cek kondisi
- `foreach`: iterasi koleksi

### Break & Continue
`break` keluar loop. `continue` skip ke iterasi berikutnya.

### Pattern Matching
`obj is int num` — cek tipe dan assign sekaligus.

---

## Eksperimen

- Ubah nilai score dan lihat grade berubah
- Coba switch expression dengan string pattern
- Buat nested loop untuk tabel perkalian
- Eksperimen dengan pattern matching pada object
- Buat menu interaktif dengan while + switch

---

## Tantangan

Buat program kalkulator dengan menu: tambah, kurang, kali, bagi, pangkat. Gunakan switch expression dan validasi input.

---

## Ringkasan

Minggu 3 dari 12: **Control Flow** (Level: Pemula). Logika program di C#. Minggu depan: **OOP: Class & Object**.
