# Async/Await & Tasks

> C# | Modul 8

## Tujuan Pembelajaran

- Memahami async/await pattern
- Menggunakan Task dan Task<T>
- Memahami CancellationToken
- Mengimplementasi async file I/O

---

## Program: Async Programming

```csharp
using System.Net.Http;

var client = new HttpClient();

async Task<string> FetchDataAsync(string url)
{
    var response = await client.GetAsync(url);
    response.EnsureSuccessStatusCode();
    return await response.Content.ReadAsStringAsync();
}

var data = await FetchDataAsync("https://api.example.com/data");
Console.WriteLine(data);
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

Modul 8 dari 16: **Async/Await & Tasks**. C# adalah bahasa pemrograman modern untuk platform .NET. Minggu depan: **9. Dependency Injection**.
