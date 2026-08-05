# Minimal APIs

> C# | Modul 10

## Tujuan Pembelajaran

- Membuat Minimal API dengan .NET
- Menggunakan MapGet, MapPost, MapPut, MapDelete
- Menggunakan route parameters
- Mengimplementasi request/response models

---

## Program: Web API

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/api/users", () => new[] { "Budi", "Alice" });
app.MapPost("/api/users", (User user) =>
{
    return Results.Created($"/api/users/{user.Id}", user);
});

app.Run();
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

Modul 10 dari 16: **Minimal APIs**. C# adalah bahasa pemrograman modern untuk platform .NET. Minggu depan: **11. Entity Framework Core**.
