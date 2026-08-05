# Deployment & Docker

> C# | Modul 15

## Tujuan Pembelajaran

- Mempersiapkan deployment
- Membuat Docker container
- Menggunakan Docker Compose
- Memahami production configuration

---

## Program: Containerize App

```csharp
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY . .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "MyApp.dll"]
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

Modul 15 dari 16: **Deployment & Docker**. C# adalah bahasa pemrograman modern untuk platform .NET. Minggu depan: **16. Capstone: API Project**.
