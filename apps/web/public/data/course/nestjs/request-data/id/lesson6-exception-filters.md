# Exception Filters & Middleware

> NestJS | Request & Data | Pelajaran 6

## Tujuan Pembelajaran

- Menjelaskan pipeline NestJS: middleware → guard → pipe → handler
- Menulis exception filter kustom untuk format error konsisten
- Membuat middleware dan mendaftarkannya
- Menyembunyikan detail error server dari client

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

## Penjelasan

## Pipeline Lengkap NestJS
Request mengalir: Middleware (level HTTP/Express, raw) → Guard (izin akses, pelajaran 9) → Pipe (validasi/transformasi, pelajaran 5) → Handler (controller) → Interceptor (setelah, pelajaran 11). Exception yang dilempar di mana pun jatuh ke Exception Filter. Memahami urutan ini menjawab setengah pertanyaan wawancara NestJS.
## Exception Filter: Satu Format Error untuk Semua
Tanpa filter kustom, format error bawaan Nest kurang konsisten (string vs objek vs array). Dengan @Catch() + ExceptionFilter, SEMUA error (404 NotFoundException, 400 ValidationPipe, 500 tak terduga) diubah ke format seragam: { statusCode, pesan, waktu }. Client/frontend tidak perlu menebak bentuk error. Filters bisa spesifik per exception: @Catch(NotFoundException).
## Middleware: Lapisan HTTP Klasik
Middleware = fungsi (req, res, next) gaya Express, berjalan PALING AWAL. Cocok untuk: logging mentah, CORS, serving static, rate limit HTTP. Untuk logika bisnis yang butuh konteks aplikasi (auth, roles), pakai GUARD bukan middleware - guard punya akses DI dan context Nest. Aturan praktik: middleware untuk hal HTTP, guard untuk keputusan akses.
## Jangan Bocorkan Stack Trace
Filter contoh: error tak terduga di-log dengan detail (console.error) tapi client mendapat pesan GENERIK. Stack trace di respons = peta serangan gratis. Pola yang sama seperti pelajaran 12 track Node.js - di Nest ini diwajibkan oleh arsitektur.

---

## Eksperimen

1. **Pipeline Lengkap NestJS**
2. **Exception Filter: Satu Format Error untuk Semua**
3. **Middleware: Lapisan HTTP Klasik**
4. **Jangan Bocorkan Stack Trace**

---

## Tantangan

Perluas sistem error: (1) buat DomainExceptionFilter khusus @Catch(NotFoundException) yang menambah field "jenis": "tidak-ditemukan", (2) tambah middleware RequestTimerMiddleware yang mengukur durasi dan mengirim header X-Durasi-Ms, (3) route GET /api/user/error yang melempar Error biasa (bukan HttpException) - amati filter menangani 500 generik.

---

## Ringkasan

Pipeline: middleware → guard → pipe → handler → interceptor → filter. Filter = satu format error. Middleware untuk hal HTTP, guard untuk akses. 500 generik + log detail. Lanjut: TypeORM.
