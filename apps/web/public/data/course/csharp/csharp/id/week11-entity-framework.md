# Entity Framework Core

> C# | Modul 11

## Tujuan Pembelajaran

- Memahami Entity Framework Core
- Menggunakan code-first migrations
- Memahami DbContext dan DbSet
- Mengimplementasi CRUD dengan EF Core

---

## Program: Database Access

```csharp
public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseNpgsql("Host=localhost;Database=mydb");
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
}

// Migration:
// dotnet ef migrations add InitialCreate
// dotnet ef database update
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

Modul 11 dari 16: **Entity Framework Core**. C# adalah bahasa pemrograman modern untuk platform .NET. Minggu depan: **12. Middleware & HTTP Pipeline**.
