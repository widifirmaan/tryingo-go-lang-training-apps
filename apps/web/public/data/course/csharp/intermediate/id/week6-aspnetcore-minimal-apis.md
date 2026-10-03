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
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `var x int / x := 42`
- **Fungsi Utama:** Deklarasi variabel statis dan deklarasi pendek (Short Declaration).
- **Parameter / Atribut:** `Identifier, Type / Value`.
- **Perilaku & Efek Sistem:** `:=` menginferensi tipe data secara otomatis di dalam fungsi; `var` digunakan untuk deklarasi paket atau nilai default.
- **Contoh Penggunaan Praktis:**
```javascript
age := 25
name := "Alex Iskandar"
fmt.Printf("%s berusia %d tahun
", name, age);
```
- **Hasil Output yang Diharapkan:**
```text
Alex Iskandar berusia 25 tahun
```

### 2. `func (r Receiver) Method() ReturnType`
- **Fungsi Utama:** Penerapan Method pada Struct (OOP ala Go).
- **Parameter / Atribut:** `Receiver (value/pointer), Parameters`.
- **Perilaku & Efek Sistem:** Menghubungkan fungsi khusus ke tipe struct untuk membentuk perilaku objek tanpa class inheritance hierarki.
- **Contoh Penggunaan Praktis:**
```javascript
type User struct { Name string }
func (u User) Greet() string {
  return "Halo, " + u.Name
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan string sapaan personal
```

### 3. `go func() { ... }()`
- **Fungsi Utama:** Eksekusi thread ringan konkuren (Goroutine).
- **Parameter / Atribut:** `Fungsi anonim / fungsi bernama`.
- **Perilaku & Efek Sistem:** Menjalankan komputasi di thread runtime Go yang sangat ringan (hanya ~2KB memori awal).
- **Contoh Penggunaan Praktis:**
```javascript
go func() {
  fmt.Println("Berjalan konkuren di goroutine terpisah!")
}()
```
- **Hasil Output yang Diharapkan:**
```text
Dieksekusi asinkron tanpa memblokir alur utama program
```

### 4. `ch := make(chan string); ch <- val; val := <-ch`
- **Fungsi Utama:** Saluran komunikasi antar goroutine (Channel).
- **Parameter / Atribut:** `Tipe data channel, kapasitas buffer`.
- **Perilaku & Efek Sistem:** Mengirim dan menerima data antar goroutine dengan sinkronisasi bawaan tanpa perlu lock/mutex manual.
- **Contoh Penggunaan Praktis:**
```javascript
ch := make(chan int)
go func() { ch <- 100 }()
result := <-ch
fmt.Println("Diterima:", result);
```
- **Hasil Output yang Diharapkan:**
```text
Diterima: 100
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
