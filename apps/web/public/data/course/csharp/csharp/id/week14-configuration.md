# Configuration & Logging

> C# | Modul 14

## Tujuan Pembelajaran

- Menggunakan IConfiguration untuk app settings
- Mengimplementasi logging dengan ILogger
- Menggunakan environment variables
- Memahami appsettings.json

---

## Program: App Config

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddJsonFile("appsettings.json")
    .AddEnvironmentVariables();

builder.Logging
    .AddConsole()
    .AddDebug()
    .SetMinimumLevel(LogLevel.Information);
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

Modul 14 dari 16: **Configuration & Logging**. C# adalah bahasa pemrograman modern untuk platform .NET. Minggu depan: **15. Deployment & Docker**.
