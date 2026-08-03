# Pipes & DTO Validation

> NestJS | Request & Data | Lesson 5

## Learning Objectives

- Explain the pipe role: transformation & validation
- Write DTOs with class-validator decorators
- Mount a global ValidationPipe (whitelist, transform)
- Distinguish valid vs dirty input before it reaches services

---

## Program: Pipes & DTO Validation

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

## Explanation

## Pipes: The First Defense Gate
Pipes run BEFORE handlers: they take a value, can validate and/or transform it. ParseIntPipe: converts '1' (string from the URL) to 1 (number) - or throws 400. ValidationPipe: validates a whole DTO. Rule: services NEVER receive unvalidated input - hold that line, and validation bugs disappear from the entire codebase.
## DTOs: An Explicit Input Contract
A DTO (Data Transfer Object) defines the shape of data allowed in: a class with decorators (@IsString, @MinLength, @IsBoolean, @IsOptional). class-validator reads decorators at runtime (using TS metadata). Double win: AUTOMATIC validation + an explicit API shape (reused by Swagger, lesson 12).
## ValidationPipe Options You Must Know
whitelist: true - properties absent from the DTO are STRIPPED. forbidNonWhitelisted: true - foreign properties = 400 (holds back weird payload probes). transform: true - automatic type conversion (query '5' → number, Date, etc.). This combination = a strict, deterministic API. It also stops extra client properties from sneaking into logic.
## Where to Mount Pipes
Global (main.ts): all routes. Controller/method level (@UsePipes): selective. Param level: ParseIntPipe. Choosing the level is a balance: global for general rules, local for special cases.

---

## Experiments

1. **Pipes: The First Defense Gate**
2. **DTOs: An Explicit Input Contract**
3. **ValidationPipe Options You Must Know**
4. **Where to Mount Pipes**

---

## Challenge

Strengthen the DTO: (1) add a prioritas field with @IsEnum(["rendah","sedang","tinggi"]) and @IsOptional - add it to the DTO and service, (2) create a second UpdateCatatanDto with all fields @IsOptional (for partial PUT), (3) test: send a payload with a "hack": true property - record the response (should be 400 thanks to forbidNonWhitelisted).

---

## Summary

Pipes = validation + transformation before handlers. DTOs + class-validator = the input contract. whitelist/forbidNonWhitelisted/transform. Services never see dirty input. Next: exception filters & middleware.
