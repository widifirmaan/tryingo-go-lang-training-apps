# HTTP Pipeline: Custom Middleware, JWT Auth & RFC 7807 ProblemDetails

> **Kategori:** C# & .NET | **Level:** Intermediate | **Minggu 7:** HTTP Pipeline: Custom Middleware, JWT Auth & RFC 7807 ProblemDetails

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

## Summary

You have mastered Middleware pipelines, JWT, and RFC 7807 ProblemDetails. Level 2 complete! Level 3 takes us through Concurrency, Resilience, and our Microservice Capstone.
