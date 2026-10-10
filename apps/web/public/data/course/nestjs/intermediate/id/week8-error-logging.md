# Error Handling & Logging

> **Kategori:** NestJS | **Level:** Menengah | **Minggu 8:** Error Handling & Logging

## Tujuan Pembelajaran

- ExceptionFilter: catch semua exceptions
- Built-in HTTP exceptions: 400, 401, 404, 500
- Custom exceptions dengan HttpException
- Logger: log levels (log, warn, error, debug)
- Global filters dan interceptors

---

## Program: Exception Filter

```javascript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof Error ? exception.message : 'Internal error';

    this.logger.error(`${request.method} ${request.url} - ${status}: ${message}`);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}

console.log('NestJS Error Handling & Logging:');
console.log('');
console.log('=== Built-in Exceptions ===');
const exceptions = [
  'BadRequestException (400)',
  'UnauthorizedException (401)',
  'ForbiddenException (403)',
  'NotFoundException (404)',
  'ConflictException (409)',
  'InternalServerErrorException (500)',
];
for (const e of exceptions) console.log('  throw new ' + e);

console.log('');
console.log('=== Custom Exception ===');
console.log('class BusinessException extends HttpException {');
console.log('  constructor(message: string) {');
console.log('    super({ error: "BUSINESS_ERROR", message }, 422);');
console.log('  }');
console.log('}');
console.log('');
console.log('=== Logger ===');
console.log('private logger = new Logger(UsersService.name);');
console.log('this.logger.log("User created: " + user.id);');
console.log('this.logger.warn("Deprecated API called");');
console.log('this.logger.error("Database error", error.stack);');
console.log('');
console.log('=== Global Filter ===');
console.log('app.useGlobalFilters(new AllExceptionsFilter());');
console.log('// Atau di main.ts: app.useGlobalPipes(new ValidationPipe())');
```

---

## Konsep Kunci

### ExceptionFilter
@Catch() + implements ExceptionFilter. Handle semua uncaught exceptions.

### HTTP Exceptions
throw new NotFoundException('User not found') -> 404 JSON response.

### Logger
Built-in Logger dengan levels: log, warn, error, debug, verbose.

### Global
app.useGlobalFilters() untuk apply ke seluruh app.

---

## Eksperimen

- Buat custom exception untuk business logic errors
- Implementasikan request logging interceptor
- Tambah error reporting ke external service
- Buat HTTP exception filter dengan custom format

---

## Tantangan

Buat comprehensive error handling: custom exceptions, global filter, logging interceptor.

---

## Ringkasan

Minggu 8 dari 12: **Error Handling & Logging** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Testing** (Advanced).
