# Pipes & Validasi DTO

> NestJS | Request & Data | Pelajaran 5

## Tujuan Pembelajaran

- Menjelaskan fungsi pipe: transformasi & validasi
- Menulis DTO dengan class-validator decorators
- Memasang ValidationPipe global (whitelist, transform)
- Membedakan input valid vs kotor sebelum masuk service

---

## Program: Pipes & Validasi DTO

```ts
import { Controller, Get, Post, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { CatatanService } from './catatan.service';
import { BuatCatatanDto } from './dto/buat-catatan.dto';

@Controller('catatan')
export class CatatanController {
  constructor(private readonly catatanService: CatatanService) {}

  @Get()
  semua(@Query('selesai') selesai?: string) {
    return this.catatanService.semua(selesai === 'true');
  }

  @Get(':id')
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.catatanService.detail(id);
  }

  @Post()
  buat(@Body() dto: BuatCatatanDto) {
    // dto sudah VALID & BERSIH - tidak perlu validasi manual
    return this.catatanService.buat(dto.judul, dto.selesai);
  }
}
```

---

## Penjelasan

## Pipe: Gerbang Pertahanan Pertama
Pipe bekerja SEBELUM handler: menerima nilai, bisa memvalidasi dan/atau mentransformasikannya. ParseIntPipe: mengubah '1' (string dari URL) jadi 1 (number) - atau lempar 400. ValidationPipe: memvalidasi seluruh DTO. Aturan: service TIDAK PERNAH menerima input yang belum divalidasi - jaga batas ini, dan bug validasi hilang dari seluruh codebase.
## DTO: Kontrak Input yang Jelas
DTO (Data Transfer Object) mendefinisikan bentuk data yang boleh masuk: class dengan decorator (@IsString, @MinLength, @IsBoolean, @IsOptional). class-validator membaca decorators saat runtime (memanfaatkan metadata TS). Keuntungan ganda: validasi OTOMATIS + dokumentasi bentuk API yang eksplisit (dipakai Swagger, pelajaran 12).
## Opsi ValidationPipe yang Wajib Tahu
whitelist: true - properti yang tidak ada di DTO DIHAPUS. forbidNonWhitelisted: true - properti asing = 400 (menahan probe payload aneh). transform: true - konversi tipe otomatis (query '5' → number, Date, dll). Kombinasi ini = API yang tegas dan deterministik. Ini juga yang membuat property tambahan dari client tidak bisa "menyelinap" ke logika.
## Di Mana Pipe Dipasang
Global (main.ts): semua route. Controller/method level (@UsePipes): selektif. Param level: ParseIntPipe. Pemilihan level = keseimbangan: global untuk aturan umum, lokal untuk kasus khusus.

---

## Eksperimen

1. **Pipe: Gerbang Pertahanan Pertama**
2. **DTO: Kontrak Input yang Jelas**
3. **Opsi ValidationPipe yang Wajib Tahu**
4. **Di Mana Pipe Dipasang**

---

## Tantangan

Perkuat DTO: (1) tambah field prioritas dengan @IsEnum(["rendah","sedang","tinggi"]) dan @IsOptional - tambah ke DTO dan service, (2) buat DTO kedua UpdateCatatanDto dengan semua field @IsOptional (untuk PUT partial), (3) uji: kirim payload dengan properti "hack": true - catat responsnya (harus 400 karena forbidNonWhitelisted).

---

## Ringkasan

Pipe = validasi + transformasi sebelum handler. DTO + class-validator = kontrak input. whitelist/forbidNonWhitelisted/transform. Service tak pernah terima input kotor. Lanjut: exception filters & middleware.
