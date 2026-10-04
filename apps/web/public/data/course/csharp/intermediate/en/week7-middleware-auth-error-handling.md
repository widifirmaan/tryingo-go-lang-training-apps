# HTTP Pipeline: Custom Middleware, JWT Auth & RFC 7807 ProblemDetails

> **Kategori:** C# & .NET | **Level:** Intermediate | **Minggu 7:** HTTP Pipeline: Custom Middleware, JWT Auth & RFC 7807 ProblemDetails
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand HTTP Middleware pipeline execution ordering in ASP.NET Core.
- Secure Web APIs using JSON Web Tokens (JWT) and Role-Based Access Control (RBAC).
- Implement centralized Global Error Handling complying with RFC 7807 ProblemDetails.
- Build custom middleware for audit logging and request execution timing.

---

## Program: Warehouse API Security Pipeline with JWT & Global Exception Handling

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

## Key Concepts

Every incoming HTTP request in ASP.NET Core traverses a sequence of delegates known as the **Middleware Pipeline**. Each middleware inspects the context, optionally passing execution downstream via `next()` or short-circuiting the request.

### Pipeline Order of Execution
The registration sequence of `app.Use...` delegates is critical. Exception handlers must reside at the very top to intercept downstream errors. Authentication (`app.UseAuthentication`) must precede Authorization (`app.UseAuthorization`) so claims identities are resolved prior to policy evaluation.

### RFC 7807 Problem Details Standard
Rather than returning raw stack traces or plain text errors upon exceptions, enterprise backends conform to the **RFC 7807 Problem Details** standard. It returns structured JSON containing status codes, title, error details, and instance URIs.

### JWT Security and Role Claims
JWT enables stateless identity verification without hitting authentication databases on every request. Tokens are cryptographically signed using HMAC-SHA256, carrying user role claims evaluated by ASP.NET Core authorization policies.


---

---

## Beginner Friendly Explanation

Think of airport security checkpoints. You pass through: (1) Metal detectors (Error Handling Middleware), (2) Passport and ticket verification (Authentication Middleware), and (3) The VIP First-Class lounge door requiring special boarding passes (Authorization Policies).

## Experiments

- Issue a request to `/api/warehouse/secret-audit` without an Authorization header and verify the 401 Unauthorized status.
- Generate a test JWT using `JwtSecurityTokenHandler` and access the endpoint with `Authorization: Bearer <token>`.
- Throw an unhandled exception within the handler and verify the resulting RFC 7807 JSON structure.

---

## Challenge

Build a custom `ApiKeyMiddleware` that validates an `X-API-KEY` header on external supplier webhook calls, rejecting invalid requests with 403 Forbidden.

---

## Visual Mental Model & Architecture Flow

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

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `record ProductDto(Guid Id, string Name, decimal Price);`
- **Core Functionality:** Tipe data Record Immutable C# 12.
- **Parameters / Attributes:** `Positional parameters`.
- **System Behavior & Return:** Mendefinisikan struktur data transfer bernilai tetap dengan kesetaraan berbasis nilai (value equality)..
- **Practical Code Example:**
```csharp
public record UserRecord(Guid Id, string FullName, string Email);
var user = new UserRecord(Guid.NewGuid(), "Alex", "alex@test.com");
```
- **Expected Execution Output:**
```text
Objek transfer data immutable siap digunakan
```

### 2. `app.MapGet("/api/items", async (AppDbContext db) => ...)`
- **Core Functionality:** Endpoint Minimal API ASP.NET Core.
- **Parameters / Attributes:** `Route pattern, Request delegate`.
- **System Behavior & Return:** Membangun endpoint API super cepat dan hemat memori tanpa overhead controller konvensional..
- **Practical Code Example:**
```csharp
app.MapGet("/api/products", async (AppDbContext db) =>
    await db.Products.AsNoTracking().ToListAsync());
```
- **Expected Execution Output:**
```text
Endpoint GET /api/products aktif dengan performa tinggi
```

### 3. `using var connection = new SqlConnection(connStr);`
- **Core Functionality:** Pernyataan Using pembersihan resource otomatis.
- **Parameters / Attributes:** `IDisposable resource`.
- **System Behavior & Return:** Guarantees koneksi database atau file stream ditutup dan dibebaskan seketika setelah blok fungsi keluar..
- **Practical Code Example:**
```csharp
using var stream = File.OpenRead("data.json");
var data = await JsonSerializer.DeserializeAsync<Config>(stream);
```
- **Expected Execution Output:**
```text
Resource stream otomatis dibersihkan dari RAM
```

### 4. `items.Where(p => p.Price > 100).OrderBy(p => p.Name)`
- **Core Functionality:** Kueri pemrosesan data deklaratif (LINQ).
- **Parameters / Attributes:** `Lambda predicates`.
- **System Behavior & Return:** Melakukan filtering, pengurutan, dan transformasi koleksi data dalam memori atau database secara ekspresif..
- **Practical Code Example:**
```csharp
var premiumProducts = products
    .Where(p => p.InStock && p.Price > 500000)
    .Select(p => p.Name)
    .ToList();
```
- **Expected Execution Output:**
```text
Daftar nama produk premium terfilter rapi
```

---

## Common Pitfalls & Debugging Tips

### 1. NullReferenceException at Runtime
- **Symptom / Issue:** Attempting to invoke methods on null object instances crashes request threads.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Enable `<Nullable>enable</Nullable>` in csproj and leverage null-conditional `?.` operators.

### 2. Async Void Anti-Pattern
- **Symptom / Issue:** Exceptions thrown inside `async void` cannot be caught by callers and crash the runtime.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always return `async Task` except on top-level UI event handlers.

### 3. Failing to Dispose Managed Resources
- **Symptom / Issue:** Database connections and file handles remain open indefinitely.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `using var resource = new ...` to guarantee prompt deterministic cleanup.

---

## Summary

You have mastered Middleware pipelines, JWT, and RFC 7807 ProblemDetails. Level 2 complete! Level 3 takes us through Concurrency, Resilience, and our Microservice Capstone.
