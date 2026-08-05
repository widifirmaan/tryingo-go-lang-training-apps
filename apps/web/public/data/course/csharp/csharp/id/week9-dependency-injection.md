# Dependency Injection

> C# | Modul 9

## Tujuan Pembelajaran

- Memahami Dependency Injection pattern
- Menggunakan IServiceCollection
- Mengimplementasi constructor injection
- Memahami service lifetimes

---

## Program: DI Pattern

```csharp
public interface IMessageService
{
    void Send(string message);
}

public class EmailService : IMessageService
{
    public void Send(string message)
    {
        Console.WriteLine($"Email sent: {message}");
    }
}

// In Program.cs or Startup.cs:
services.AddScoped<IMessageService, EmailService>();
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

Modul 9 dari 16: **Dependency Injection**. C# adalah bahasa pemrograman modern untuk platform .NET. Minggu depan: **10. Minimal APIs**.
