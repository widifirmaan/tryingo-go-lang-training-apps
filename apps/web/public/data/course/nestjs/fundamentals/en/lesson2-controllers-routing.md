# Controllers & Routing: Full CRUD

> NestJS | Nest Fundamentals | Lesson 2

## Learning Objectives

- Create a controller with a prefix and CRUD routes
- Extract data from params, query, and body
- Use ParseIntPipe for conversion/validation
- Return correct status codes (201, 204, 404)

---

## Program: Controllers & Routing: Full CRUD

```ts
import {
  Controller, Get, Post, Put, Delete, Param, Body, Query,
  HttpCode, HttpStatus, ParseIntPipe,
} from '@nestjs/common';
import { CatatanService } from './catatan.service';

@Controller('catatan') // prefix: /api/catatan
export class CatatanController {
  constructor(private readonly catatanService: CatatanService) {}

  @Get() // GET /api/catatan?selesai=true
  semua(@Query('selesai') selesai?: string) {
    return this.catatanService.semua(selesai === 'true');
  }

  @Get(':id') // GET /api/catatan/1
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.catatanService.detail(id);
  }

  @Post()
  buat(@Body() body: { judul: string }) {
    return this.catatanService.buat(body.judul);
  }

  @Put(':id')
  ubah(@Param('id', ParseIntPipe) id: number, @Body() body: { judul?: string; selesai?: boolean }) {
    return this.catatanService.ubah(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  hapus(@Param('id', ParseIntPipe) id: number) {
    this.catatanService.hapus(id);
  }
}
```

---

## Explanation

## Controllers: Declaring Routes in One Class
@Controller('catatan') sets the prefix; @Get(':id'), @Post(), etc. set the method + sub-path. One controller = one resource. Under the hood this is Express, but declarative: no manual if/else routing. Note also: Nest returns method values directly as JSON - no res.json() needed.
## Extracting Data from the Request
@Param('id', ParseIntPipe) id: number - a path param, auto-converted to a number ("abc" → 400). @Query('selesai') for query strings. @Body() body: { judul: string } for the request body. @Req()/@Res() exist but are avoided: using @Res() bypasses the Nest pipeline (interceptors, filters) - practical rule: do not use it unless forced.
## Services: Business Logic in Its Place
Controllers handle HTTP; services handle logic (manual validation, NotFoundException). Pattern: thin controllers, rich services. NotFoundException is a built-in Nest exception - automatically answered as 404 JSON. When data is missing, you do NOT return null - you throw the right exception.
## Default & Custom Status Codes
POST defaults to 201 (not 200!). DELETE defaults to 200, but @HttpCode(HttpStatus.NO_CONTENT) makes it 204 with no body. This is consistent with the REST conventions learned in the Node.js track - Nest enforces them by default.

---

## Experiments

1. **Controllers: Declaring Routes in One Class**
2. **Extracting Data from the Request**
3. **Services: Business Logic in Its Place**
4. **Default & Custom Status Codes**

---

## Challenge

Extend the notes API: (1) add a GET /api/catatan/selesai route as a separate route (mind the order: declare it before :id), (2) add a prioritas field ("rendah"|"sedang"|"tinggi") defaulting to "sedang", (3) a GET /api/statistik route returning total and completed counts. Test everything in the preview.

---

## Summary

Controller = route declarations; service = logic. Param/Query/Body via decorators. ParseIntPipe converts automatically. Exceptions = automatic status codes. Next: DI & providers.
