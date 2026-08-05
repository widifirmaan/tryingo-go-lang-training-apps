# Middleware & HTTP Pipeline

> C# | Modul 12

## Tujuan Pembelajaran

- Memahami middleware pipeline
- Membuat custom middleware
- Menggunakan logging middleware
- Memahami exception handling middleware

---

## Program: HTTP Pipeline

```csharp
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.Use(async (context, next) =>
{
    Console.WriteLine($"[{DateTime.Now}] {context.Request.Method} {context.Request.Path}");
    await next(context);
});

app.MapGet("/", () => "Hello");
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

Modul 12 dari 16: **Middleware & HTTP Pipeline**. C# adalah bahasa pemrograman modern untuk platform .NET. Minggu depan: **13. Testing with xUnit**.
