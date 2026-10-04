# Membangun Web API Berkecepatan Tinggi dengan ASP.NET Core Minimal APIs

> **Kategori:** C# & .NET | **Level:** Menengah | **Minggu 6:** Membangun Web API Berkecepatan Tinggi dengan ASP.NET Core Minimal APIs
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi arsitektur ASP.NET Core Minimal APIs dibandingkan Controller lama.
- Menggunakan `WebApplicationBuilder` dan `MapGroup` untuk pengelompokan endpoint REST yang rapi.
- Menerapkan Typed Results (`Results.Ok`, `Results.NotFound`, `Results.Created`) untuk respons HTTP standar.
- Mengintegrasikan dokumentasi OpenAPI (Swagger) secara otomatis pada endpoint API.

---

## Program: RESTful Inventory Endpoints dengan Minimal APIs & OpenAPI Swagger

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Concurrent;

var builder = WebApplication.CreateBuilder(args);

// Registrasi Swagger / OpenAPI & Layanan
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// In-Memory Thread-Safe Data Store untuk Endpoint Demo
var itemDb = new ConcurrentDictionary<string, InventoryDto>();
itemDb.TryAdd("SKU-100", new InventoryDto("SKU-100", "Ergonomic Chair", 50, 2_400_000m));

// Endpoint Route Grouping
var inventoryApi = app.MapGroup("/api/inventory").WithTags("Inventory");

// 1. GET: Ambil semua stok
inventoryApi.MapGet("/", () => Results.Ok(itemDb.Values));

// 2. GET: Ambil detail berdasarkan SKU
inventoryApi.MapGet("/{sku}", (string sku) =>
    itemDb.TryGetValue(sku, out var item)
        ? Results.Ok(item)
        : Results.NotFound(new { Message = $"Barang dengan SKU '{sku}' tidak ditemukan." }));

// 3. POST: Buat item inventaris baru
inventoryApi.MapPost("/", (CreateInventoryRequest req) =>
{
    if (string.IsNullOrWhiteSpace(req.Sku) || req.InitialStock < 0)
        return Results.BadRequest(new { Message = "SKU wajib diisi dan stok tidak boleh negatif." });

    var newItem = new InventoryDto(req.Sku, req.Name, req.InitialStock, req.UnitPrice);
    if (!itemDb.TryAdd(req.Sku, newItem))
        return Results.Conflict(new { Message = $"SKU '{req.Sku}' sudah terdaftar." });

    return Results.Created($"/api/inventory/{req.Sku}", newItem);
});

// Jalankan Web API
app.Run();

// DTO Models
public record InventoryDto(string Sku, string Name, int Stock, decimal UnitPrice);
public record CreateInventoryRequest(string Sku, string Name, int InitialStock, decimal UnitPrice);
```

---

## Konsep Kunci

Minimal APIs diperkenalkan pada .NET 6 dan terus disempurnakan di .NET 8 dan 9. Fitur ini dirancang untuk microservices berkecepatan tinggi yang mengutamakan latensi rendah dan konsumsi memori minimal.

### Minimal APIs vs Traditional Controllers
Controller tradisional di ASP.NET Core memerlukan banyak dependensi MVC, refleksi controller routing, dan overhead inisialisasi class. Minimal APIs menggunakan lambda mapping langsung ke routing engine ASP.NET Core, memotong latensi hingga 30-40% dan memungkinkan penulisan ratusan request per detik dengan konsumsi RAM yang jauh lebih hemat.

### Route Groups dan Modularitas
Untuk mencegah file `Program.cs` menjadi terlalu panjang di aplikasi berskala besar, Minimal APIs menyediakan method `MapGroup("/api/inventory")`. Route Groups memungkinkan kita menerapkan prefix URL, otorisasi, rate limiting, dan metadata OpenAPI sekaligus pada sekelompok endpoint terkait.

### Typed Results dan Status Code Standar
Penggunaan class `Results` (seperti `Results.Created`, `Results.BadRequest`, `Results.NotFound`) memastikan API mengembalikan HTTP Status Code yang semantik sesuai standar RESTful. Selain itu, Typed Results mempermudah pembuatan automated integration test karena tipe balikan dapat diuji secara type-safe.


---

---

## Penjelasan untuk Pemula

Bayangkan perbedaan antara restoran formal besar dengan pelayan berdasi (Controller MVC) vs kedai kopi drive-thru kilat (Minimal APIs). Jika Anda hanya butuh segelas espresso cepat, kedai drive-thru langsung menyajikannya ke jendela mobil Anda tanpa perlu duduk di meja formal dan menunggu pelayan mencatat pesanan Anda.

## Eksperimen

- Tambahkan endpoint `DELETE /api/inventory/{sku}` dan kembalikan `Results.NoContent()` jika berhasil.
- Implementasikan Endpoint Filter menggunakan `.AddEndpointFilter()` untuk memvalidasi panjang karakter SKU.
- Uji coba endpoint melalui antarmuka Swagger UI di browser pada `/swagger`.

---

## Tantangan

Buat Endpoint Filter reusable `ValidationFilter<TRequest>` yang menggunakan library `FluentValidation` untuk memvalidasi payload request secara otomatis sebelum mengeksekusi route handler.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ PIPELINE MIDDLEWARE ASP.NET CORE (.NET 8/9)              │
│                                                          │
│ Request ──► ExceptionHandler ──► Routing ──► Auth/CORS   │
│                                                │         │
│                                                ▼         │
│                                       Minimal API /      │
│                                       Controllers        │
│                                                │         │
│                                                ▼         │
│                                       Dependency Inject  │
│                                       (Scoped Services)  │
│                                                │         │
│                                                ▼         │
│ Response ◄── Compression ◄── Cache ◄── EF Core / DB      │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `record ProductDto(Guid Id, string Name, decimal Price);`
- **Fungsi Utama:** Tipe data Record Immutable C# 12.
- **Parameter / Atribut:** `Positional parameters`.
- **Perilaku & Efek Sistem:** Mendefinisikan struktur data transfer bernilai tetap dengan kesetaraan berbasis nilai (value equality)..
- **Contoh Penggunaan Praktis:**
```csharp
public record UserRecord(Guid Id, string FullName, string Email);
var user = new UserRecord(Guid.NewGuid(), "Alex", "alex@test.com");
```
- **Hasil Output yang Diharapkan:**
```text
Objek transfer data immutable siap digunakan
```

### 2. `app.MapGet("/api/items", async (AppDbContext db) => ...)`
- **Fungsi Utama:** Endpoint Minimal API ASP.NET Core.
- **Parameter / Atribut:** `Route pattern, Request delegate`.
- **Perilaku & Efek Sistem:** Membangun endpoint API super cepat dan hemat memori tanpa overhead controller konvensional..
- **Contoh Penggunaan Praktis:**
```csharp
app.MapGet("/api/products", async (AppDbContext db) =>
    await db.Products.AsNoTracking().ToListAsync());
```
- **Hasil Output yang Diharapkan:**
```text
Endpoint GET /api/products aktif dengan performa tinggi
```

### 3. `using var connection = new SqlConnection(connStr);`
- **Fungsi Utama:** Pernyataan Using pembersihan resource otomatis.
- **Parameter / Atribut:** `IDisposable resource`.
- **Perilaku & Efek Sistem:** Menjamin koneksi database atau file stream ditutup dan dibebaskan seketika setelah blok fungsi keluar..
- **Contoh Penggunaan Praktis:**
```csharp
using var stream = File.OpenRead("data.json");
var data = await JsonSerializer.DeserializeAsync<Config>(stream);
```
- **Hasil Output yang Diharapkan:**
```text
Resource stream otomatis dibersihkan dari RAM
```

### 4. `items.Where(p => p.Price > 100).OrderBy(p => p.Name)`
- **Fungsi Utama:** Kueri pemrosesan data deklaratif (LINQ).
- **Parameter / Atribut:** `Lambda predicates`.
- **Perilaku & Efek Sistem:** Melakukan filtering, pengurutan, dan transformasi koleksi data dalam memori atau database secara ekspresif..
- **Contoh Penggunaan Praktis:**
```csharp
var premiumProducts = products
    .Where(p => p.InStock && p.Price > 500000)
    .Select(p => p.Name)
    .ToList();
```
- **Hasil Output yang Diharapkan:**
```text
Daftar nama produk premium terfilter rapi
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. NullReferenceException
- **Gejala / Masalah:** Aplikasi melempar exception fatal saat mengakses method dari object yang bernilai null.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Aktifkan `<Nullable>enable</Nullable>` di csproj dan gunakan operator null-conditional `?.` atau null-coalescing `??`.

### 2. Async Void pada Method Biasa
- **Gejala / Masalah:** Exception yang terjadi di dalam method `async void` tidak bisa ditangkap oleh blok try-catch luar.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu gunakan `async Task` untuk method asynchronous, kecuali pada event handler UI.

### 3. Lupa Melakukan Dispose pada Objek IDisposable
- **Gejala / Masalah:** Koneksi database atau file handle tertahan di memori sistem.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan statement `using var resource = new ...` agar pembersihan resource berjalan otomatis.

---

## Ringkasan

Kamu telah menguasai ASP.NET Core Minimal APIs dan Typed Results. Minggu depan kita memperkuat API dengan Middleware, JWT Auth, dan ProblemDetails.
