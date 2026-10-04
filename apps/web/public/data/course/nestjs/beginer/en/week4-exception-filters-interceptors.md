# HTTP Pipeline: Global Exception Filters & Response Interceptors

> **Kategori:** NestJS Enterprise Architecture | **Level:** Beginner | **Minggu 4:** HTTP Pipeline: Global Exception Filters & Response Interceptors
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Exception Filters (`@Catch()`) for centralized HTTP error response formatting.
- Understand NestJS Interceptors leveraging reactive RxJS operators (`Observable`, `map`, `tap`).
- Standardize successful API envelope formats (`success: true, data: ...`) across all controllers.
- Implement standardized RFC 7807 Problem Details error schemas.

---

## Program: Standardized Response Transformation & RFC 7807 Error Filter

```typescript
import {
  ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus,
  Injectable, NestInterceptor, ExecutionContext, CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 1. Global Response Interceptor: Membungkus Semua Respons Sukses ke Format Seragam
export interface StandardApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, StandardApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<StandardApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode || 200;

    return next.handle().pipe(
      map(data => ({
        success: true,
        statusCode,
        data,
        timestamp: new Date().toISOString()
      }))
    );
  }
}

// 2. Global Exception Filter: Menangkap Semua Error & Memformat sesuai RFC 7807
@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Terjadi kesalahan sistem internal tak terduga.';

    const errorPayload = {
      type: 'https://tryngo.io/errors/api-error',
      title: status >= 500 ? 'Internal Server Error' : 'Client Error',
      status,
      detail: typeof message === 'object' ? message : { message },
      instance: request.url,
      timestamp: new Date().toISOString()
    };

    console.error(`[EXCEPTION INTERCEPTED] ${request.method} ${request.url} -> Status ${status}`);
    response.status(status).json(errorPayload);
  }
}

console.log('=== TRANSFORM INTERCEPTOR & EXCEPTION FILTER SIAP DIGUNAKAN ===');
```

---

## Key Concepts

A hallmark of brittle APIs is response inconsistency: Endpoint A returns raw arrays, Endpoint B yields `{ result: ... }`, and exceptions emit raw text or HTML stack traces.

### Response Interceptors with RxJS
NestJS weaves **RxJS** into its interceptor pipeline. Implementing `NestInterceptor` allows `intercept()` to transform data streams before or after route handlers execute. Applying `.pipe(map(...))` standardizes all responses into a predictable envelope `{ success: true, statusCode: 200, data: ..., timestamp: ... }`.

### Global Exception Filters
Whenever services throw exceptions (`throw new NotFoundException()`), execution halts and routes to the **Exception Filter**. Decorated with `@Catch()`, filters format exceptions into standardized RFC 7807 Problem Details payloads, audit errors, and conceal internal database credentials from public exposure on 500 errors.


---

---

## Beginner Friendly Explanation

Imagine an official courier parcel envelope (the Interceptor). Regardless of internal contents (laptops, apparel, documents), parcels receive standardized protective packaging and tracking stamps. And if an address is invalid (Exception Filter), an official incident manifest prints immediately for the sender.

## Experiments

- Throw an `UnauthorizedException("Access denied")` and inspect the formatted JSON payload from the filter.
- Apply the RxJS `tap()` operator inside an interceptor to measure route execution latency in milliseconds.
- Register the filter globally in `main.ts` using `app.useGlobalFilters(new GlobalHttpExceptionFilter())`.

---

## Challenge

Build a Logging Interceptor that automatically masks sensitive fields like `password` and `creditCard` from request bodies before logging to standard output.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ PIPELINE PERMINTAAN NESTJS                               │
│                                                          │
│ HTTP Request ──► [Guards: Auth] ──► [Interceptors: Pre]  │
│                         │                                │
│                         ▼                                │
│              [Pipes: Validation DTO]                     │
│                         │                                │
│                         ▼                                │
│              [Controller: @Get/@Post]                    │
│                         │                                │
│                         ▼                                │
│              [Service: Business Logic]                   │
│                         │                                │
│                         ▼                                │
│ Response ◄── [Interceptors: Post] ◄── [Exception Filter] │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `@Controller('users')`
- **Core Functionality:** Dekorator pengenal rute API controller.
- **Parameters / Attributes:** `Base path string`.
- **System Behavior & Return:** Memetakan request HTTP yang masuk ke handler method spesifik di dalam kelas controller..
- **Practical Code Example:**
```typescript
@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id') id: string) { return { id }; }
}
```
- **Expected Execution Output:**
```output
Endpoint GET /users/:id siap diakses klien
```

### 2. `@Injectable()`
- **Core Functionality:** Dekorator penyedia layanan (Provider / Service).
- **Parameters / Attributes:** `Provider Scope (default: Singleton)`.
- **System Behavior & Return:** Mendaftarkan class ke dalam IoC (Inversion of Control) Container NestJS untuk diinjeksi otomatis..
- **Practical Code Example:**
```typescript
@Injectable()
export class UsersService {
  findAll() { return ['Alex', 'Budi']; }
}
```
- **Expected Execution Output:**
```output
Service siap diinjeksi ke Controller mana pun
```

### 3. `@Body() dto: CreateUserDto`
- **Core Functionality:** Ekstraksi dan validasi payload body.
- **Parameters / Attributes:** `DTO Class Schema`.
- **System Behavior & Return:** Mengekstrak JSON body dari HTTP request dan memvalidasi aturan field via ValidationPipe..
- **Practical Code Example:**
```typescript
@Post()
create(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}
```
- **Expected Execution Output:**
```output
Payload otomatis divalidasi sebelum logika dijalankan
```

### 4. `@Module({ controllers: [...], providers: [...] })`
- **Core Functionality:** Pengelompok modul arsitektur terstruktur.
- **Parameters / Attributes:** `controllers, providers, exports, imports`.
- **System Behavior & Return:** Mengorganisasi aplikasi menjadi modul-modul independen dan kohesif..
- **Practical Code Example:**
```typescript
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```
- **Expected Execution Output:**
```output
Modul Users siap diimpor oleh modul utama AppModule
```

---

## Common Pitfalls & Debugging Tips

### 1. Indiscriminate Request-Scoped Providers
- **Symptom / Issue:** Degrades throughput significantly by re-instantiating dependency trees per request.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Stick to default Singleton providers unless per-request isolation is strictly required.

### 2. Missing Module Exports / Imports
- **Symptom / Issue:** Crashes on boot: `Nest can't resolve dependencies of the Service`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Verify that the exporting module exports the provider and the consumer imports it.

### 3. Omitting Global ValidationPipe
- **Symptom / Issue:** DTO payload properties pass into business services unvalidated.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Configure `app.useGlobalPipes(new ValidationPipe({ whitelist: true }))` in `main.ts`.

---

## Summary

You have mastered Exception Filters, RxJS Interceptors, and API standardization. Level 1 complete! Level 2 covers Passport JWT Auth, GraphQL, and Redis Caching.
