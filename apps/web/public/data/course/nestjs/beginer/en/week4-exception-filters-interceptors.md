# HTTP Pipeline: Global Exception Filters & Response Interceptors

> **Kategori:** NestJS Enterprise Architecture | **Level:** Beginner | **Minggu 4:** HTTP Pipeline: Global Exception Filters & Response Interceptors

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

## Summary

You have mastered Exception Filters, RxJS Interceptors, and API standardization. Level 1 complete! Level 2 covers Passport JWT Auth, GraphQL, and Redis Caching.
