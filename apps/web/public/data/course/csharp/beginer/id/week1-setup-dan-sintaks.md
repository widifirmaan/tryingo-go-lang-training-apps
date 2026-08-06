# Setup, Toolchain & Sintaks Dasar

> **Kategori:** C# | **Level:** Pemula | **Minggu 1:** Setup, Toolchain & Sintaks Dasar

## Tujuan Pembelajaran

- Memahami peran C# sebagai bahasa modern untuk ekosistem .NET
- Menginstall .NET SDK dan menulis program pertama
- Mengenal tipe dasar: int, double, string, bool, var
- String interpolation dengan $ dan verbatim string dengan @
- Nullable types: T? untuk value type yang bisa null

---

## Program: Halo, C#!

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

## Konsep Kunci

### Peran C#
C# adalah bahasa modern, object-oriented dari Microsoft. Berjalan di .NET runtime — cross-platform, high-performance.

### Toolchain
- `dotnet new`: buat project baru
- `dotnet run`: jalankan program
- `dotnet build`: kompilasi
- `dotnet test`: jalankan test

### Tipe Dasar
- Value type: int, double, bool, char, struct
- Reference type: string, class, array, interface
- `var`: implicit typing dengan type inference

### String Interpolation
`$"Hello {name}"` — lebih readable dari string concatenation.

### Nullable
`int?` atau `Nullable<int>` — value type yang bisa null.

---

## Eksperimen

- Ubah nilai variabel dan lihat perubahannya
- Coba tipe data yang belum dicoba: decimal, long, char
- Eksperimen dengan string interpolation
- Buat nullable int dan cek HasValue
- Buat program kecil gabungan 2-3 konsep

---

## Tantangan

Buat program profil pengguna: nama, umur, email, alamat. Gunakan string interpolation untuk display. Validasi dengan if.

---

## Ringkasan

Minggu 1 dari 12: **Setup, Toolchain & Sintaks Dasar** (Level: Pemula). C# memberikan produktivitas tinggi dengan type safety. Minggu depan: **Tipe Data & Variabel**.
