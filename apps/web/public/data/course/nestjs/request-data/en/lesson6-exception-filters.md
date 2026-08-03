# Exception Filters & Middleware

> NestJS | Request & Data | Lesson 6

## Learning Objectives

- Explain the NestJS pipeline: middleware → guard → pipe → handler
- Write a custom exception filter for consistent error format
- Create and register middleware
- Hide server error details from clients

---

## Program: Exception Filters & Middleware

```ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

// Filter: menangkap exception dan membentuk respons ERROR
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Exception HTTP bawaan (NotFoundException, dll)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      return response.status(status).json({
        statusCode: status,
        pesan: typeof body === 'string' ? body : (body as any).message,
        waktu: new Date().toISOString(),
      });
    }

    // Error tak terduga: log detail, balas 500 GENERIK
    console.error('UNEXPECTED ERROR:', exception);
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      pesan: 'Terjadi kesalahan server',
      waktu: new Date().toISOString(),
    });
  }
}
```

---

## Explanation

## The Full NestJS Pipeline
Requests flow: Middleware (HTTP/Express level, raw) → Guard (access permission, lesson 9) → Pipe (validation/transformation, lesson 5) → Handler (controller) → Interceptor (after, lesson 11). Exceptions thrown anywhere land in the Exception Filter. Understanding this order answers half of NestJS interview questions.
## Exception Filters: One Error Format for All
Without a custom filter, Nest's built-in error formats are inconsistent (string vs object vs array). With @Catch() + ExceptionFilter, ALL errors (404 NotFoundException, 400 ValidationPipe, unexpected 500s) are reshaped into one format: { statusCode, pesan, waktu }. Clients/frontends never guess the error shape. Filters can target specific exceptions: @Catch(NotFoundException).
## Middleware: The Classic HTTP Layer
Middleware = (req, res, next) functions in Express style, running EARLIEST. Good for: raw logging, CORS, static serving, HTTP rate limits. For business logic needing app context (auth, roles), use GUARDS instead - guards have DI access and Nest context. Rule of thumb: middleware for HTTP concerns, guards for access decisions.
## Never Leak Stack Traces
The sample filter: unexpected errors are logged with detail (console.error) but the client gets a GENERIC message. A stack trace in a response = a free attack map. Same pattern as lesson 12 of the Node.js track - in Nest it is enforced by the architecture.

---

## Experiments

1. **The Full NestJS Pipeline**
2. **Exception Filters: One Error Format for All**
3. **Middleware: The Classic HTTP Layer**
4. **Never Leak Stack Traces**

---

## Challenge

Extend the error system: (1) create a DomainExceptionFilter with @Catch(NotFoundException) adding a "jenis": "tidak-ditemukan" field, (2) add a RequestTimerMiddleware measuring duration and sending an X-Durasi-Ms header, (3) a GET /api/user/error route throwing a plain Error (not an HttpException) - watch the filter answer with a generic 500.

---

## Summary

Pipeline: middleware → guard → pipe → handler → interceptor → filter. Filters = one error format. Middleware for HTTP concerns, guards for access. Generic 500 + detailed logs. Next: TypeORM.
