# HTTP Pipeline: Custom Middleware, JWT Auth & RFC 7807 ProblemDetails

> **Kategori:** C# & .NET | **Level:** Menengah | **Minggu 7:** HTTP Pipeline: Custom Middleware, JWT Auth & RFC 7807 ProblemDetails
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami urutan eksekusi HTTP Pipeline Middleware di ASP.NET Core.
- Mengamankan Web API menggunakan JSON Web Tokens (JWT) dan Role-Based Access Control (RBAC).
- Mengimplementasikan Global Error Handling terpusat berstandar RFC 7807 (ProblemDetails).
- Membangun Custom Middleware untuk logging audit dan tracing durasi request.

---

## Program: Pipeline Keamanan API Gudang dengan JWT & Global Exception Handling

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Konfigurasi Autentikasi JWT
var jwtKey = "KunciRahasiaSuperAmanGudangTryngo2026Minimal32Karakter!";
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("WarehouseManagerOnly", policy => policy.RequireRole("Manager"));
});

// Standar Error RFC 7807
builder.Services.AddProblemDetails();

var app = builder.Build();

// 1. Global Exception Handler Middleware
app.UseExceptionHandler(exceptionHandlerApp =>
{
    exceptionHandlerApp.Run(async context =>
    {
        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        var ex = exceptionHandlerPathFeature?.Error;

        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/problem+json";

        var problem = Results.Problem(
            title: "Terjadi kesalahan internal server.",
            detail: ex?.Message,
            statusCode: StatusCodes.Status500InternalServerError
        );

        await problem.ExecuteAsync(context);
    });
});

// 2. Custom Logging & Timing Middleware
app.Use(async (context, next) =>
{
    var sw = System.Diagnostics.Stopwatch.StartNew();
    await next(context);
    sw.Stop();
    Console.WriteLine($"[HTTP AUDIT] {context.Request.Method} {context.Request.Path} -> {context.Response.StatusCode} in {sw.ElapsedMilliseconds}ms");
});

app.UseAuthentication();
app.UseAuthorization();

// Protected Endpoint
app.MapGet("/api/warehouse/secret-audit", (ClaimsPrincipal user) =>
{
    var username = user.Identity?.Name ?? "Unknown";
    return Results.Ok(new { Message = $"Akses diizinkan untuk Manager: {username}", Timestamp = DateTime.UtcNow });
}).RequireAuthorization("WarehouseManagerOnly");

app.Run();
```

---

## Konsep Kunci

Setiap HTTP request yang masuk ke ASP.NET Core melewati serangkaian komponen yang disebut **Middleware Pipeline**. Setiap middleware dapat memeriksa request, memutuskan apakah akan meneruskannya ke middleware berikutnya (`next()`), atau langsung menghentikan request (short-circuiting).

### Urutan Middleware (Order of Execution)
Urutan pemanggilan method `app.Use...` sangat krusial. Middleware penanganan error harus diletakkan paling awal agar dapat menangkap error yang dilempar oleh middleware di bawahnya. Middleware Autentikasi (`app.UseAuthentication`) harus selalu dipanggil sebelum Otorisasi (`app.UseAuthorization`) agar identitas pengguna sudah tervalidasi sebelum hak aksesnya diperiksa.

### Standar RFC 7807 Problem Details
Alih-alih mengembalikan pesan string mentah atau stack trace berbahaya ke klien saat terjadi error, aplikasi enterprise modern menggunakan spesifikasi standar **RFC 7807 Problem Details**. Standar ini menyediakan format JSON terstruktur yang memuat status code, judul error, detail penyebab, dan URI instans error yang ramah bagi consumer API.

### Keamanan JWT dan Claims
JWT memungkinkan sistem backend memverifikasi identitas pengguna tanpa perlu melakukan query database pada setiap request. Token ditandatangani secara kriptografis menggunakan algoritma HMAC-SHA256, dan memuat klaim peran (Role) yang langsung dievaluasi oleh policy otorisasi .NET.


---

---

## Penjelasan untuk Pemula

Bayangkan pintu gerbang keamanan bandara internasional. Anda harus melewati: (1) Mesin X-Ray pendeteksi logam (Error Handler), (2) Petugas pemeriksa tiket dan paspor (Authentication Middleware), dan (3) Pintu ruang tunggu VIP yang hanya boleh dimasuki pemegang tiket kelas satu (Authorization Policy).

## Eksperimen

- Kirim request ke `/api/warehouse/secret-audit` tanpa header Authorization dan perhatikan respons 401 Unauthorized.
- Buat token JWT tiruan menggunakan `JwtSecurityTokenHandler` dan uji endpoint dengan header `Authorization: Bearer <token>`.
- Lemparkan `throw new InvalidOperationException("Gudang terkunci!")` di dalam endpoint dan amati format JSON ProblemDetails.

---

## Tantangan

Buat Custom Middleware `ApiKeyMiddleware` yang memeriksa header `X-API-KEY` pada setiap request webhook supplier eksternal dan menolak request dengan status 403 Forbidden jika key tidak cocok.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

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

Kamu telah menguasai Middleware pipeline, JWT, dan RFC 7807 ProblemDetails. Level 2 selesai! Di Level 3 kita menaklukkan Concurrency, Resilience, dan Microservice Capstone.
