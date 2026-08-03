# Controllers & Routing: CRUD Lengkap

> NestJS | Fondasi Nest | Pelajaran 2

## Tujuan Pembelajaran

- Membuat controller dengan prefix dan route CRUD
- Mengambil data dari params, query, dan body
- Menggunakan ParseIntPipe untuk konversi/validasi
- Mengembalikan status code yang tepat (201, 204, 404)

---

## Program: Controllers & Routing: CRUD Lengkap

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

## Penjelasan

## Controller: Deklarasi Route dalam Satu Class
@Controller('catatan') menetapkan prefix; @Get(':id'), @Post(), dll. menetapkan method + sub-path. Satu controller = satu resource. Di belakang layar ini Express, tapi deklaratif: tidak ada if/else routing manual. Perhatikan juga: Nest mengembalikan nilai method langsung sebagai JSON - tidak perlu res.json().
## Mengambil Data dari Request
@Param('id', ParseIntPipe) id: number - param path, dikonversi otomatis jadi angka (jika "abc" → 400). @Query('selesai') untuk query string. @Body() body: { judul: string } untuk request body. @Req()/@Res() tersedia tapi dihindari: memakai @Res() melewati pipeline Nest (interceptor, filter) - aturan praktik: jangan pakai kecuali terpaksa.
## Service: Logika Bisnis di Tempatnya
Controller menangani HTTP; service menangani logika (validasi manual, NotFoundException). Pola: controller tipis, service kaya. NotFoundException adalah exception bawaan Nest - dibalas otomatis sebagai 404 JSON. Jika data tidak ditemukan, Anda TIDAK mengembalikan null - Anda melempar exception yang tepat.
## Status Code Default & Kustom
POST default 201 (bukan 200!). DELETE default 200, tapi dengan @HttpCode(HttpStatus.NO_CONTENT) menjadi 204 tanpa body. Ini konsisten dengan konvensi REST yang dipelajari di track Node.js - Nest menegakkannya secara bawaan.

---

## Eksperimen

1. **Controller: Deklarasi Route dalam Satu Class**
2. **Mengambil Data dari Request**
3. **Service: Logika Bisnis di Tempatnya**
4. **Status Code Default & Kustom**

---

## Tantangan

Perluas API catatan: (1) tambah route GET /api/catatan/selesai sebagai route terpisah (perhatikan urutan: deklarasi sebelum :id), (2) tambah field prioritas ("rendah"|"sedang"|"tinggi") dengan default "sedang", (3) route GET /api/statistik mengembalikan total dan jumlah selesai. Uji semua dengan preview.

---

## Ringkasan

Controller = deklarasi route; service = logika. Param/Query/Body via decorators. ParseIntPipe konversi otomatis. Exception = status code otomatis. Lanjut: DI & providers.
