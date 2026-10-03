# Data Transfer Objects (DTO), Validation Pipes & Transformation

> **Kategori:** NestJS Enterprise Architecture | **Level:** Beginner | **Minggu 2:** Data Transfer Objects (DTO), Validation Pipes & Transformation

## Learning Objectives

- Understand Data Transfer Objects (DTO) and API contract isolation.
- Apply `class-validator` decorators: `@IsNotEmpty`, `@IsNumber`, `@Min`, `@Matches`, and `@IsEnum`.
- Configure global `ValidationPipe` with `whitelist: true` and `forbidNonWhitelisted: true`.
- Implement automated payload type casting using `class-transformer` (`@Type(() => Number)`).

---

## Program: Product Creation Payload Validation with class-validator & Global Pipes

```typescript
// Menggunakan class-validator dan class-transformer standar industri di NestJS
// npm install class-validator class-transformer

import { IsString, IsNotEmpty, IsNumber, Min, Max, IsEnum, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export enum ProductCategory {
  ELECTRONICS = 'ELECTRONICS',
  APPAREL = 'APPAREL',
  HOME_LIVING = 'HOME_LIVING',
}

// 1. Data Transfer Object (DTO) dengan Validasi Deklaratif
export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'SKU produk wajib diisi.' })
  @Matches(/^SKU-[A-Z0-9]{3,8}$/, { message: 'Format SKU harus diawali "SKU-" diikuti 3-8 karakter alfanumerik kapital.' })
  sku!: string;

  @IsString()
  @IsNotEmpty({ message: 'Nama produk tidak boleh kosong.' })
  name!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Harga harus berupa angka valid.' })
  @Min(1000, { message: 'Harga minimal produk adalah Rp 1.000.' })
  price!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Stok tidak boleh bernilai negatif.' })
  @Max(10000, { message: 'Maksimal stok awal adalah 10.000 unit.' })
  stock!: number;

  @IsEnum(ProductCategory, { message: 'Kategori produk tidak valid.' })
  category!: ProductCategory;
}

// 2. Simulasi Konfigurasi ValidationPipe di main.ts
export const validationPipeConfig = {
  whitelist: true,            // Buang semua properti liar yang tidak ada di DTO
  forbidNonWhitelisted: true, // Lempar error jika client mengirim properti tidak dikenal
  transform: true,            // Konversi tipe string query ke number/boolean secara otomatis
};

console.log('=== DTO & VALIDATION RULES TERKONFIGURASI DENGAN DECORATORS ===');
console.log('ValidationPipe whitelist & transformation aktif untuk keamanan payload API.');
```

---

## Key Concepts

Ingesting untrusted JSON payloads without strict schema validation exposes severe vulnerabilities. Attackers can inject rogue properties (such as `isAdmin: true`) which risk being persisted directly into databases if backends fail to sanitize inputs.

### What is a Data Transfer Object (DTO)?
A DTO is a TypeScript class defining the exact shape of payloads traversing the network. Unlike TypeScript interfaces which evaporate during compilation, DTOs are declared as **Classes**, preserving runtime property metadata for reflection by validation engines.

### Declarative Validation via class-validator
Decorators like `@Min(1000)` and `@Matches(...)` enforce business constraints before controller handlers execute. The `class-transformer` module automatically coerces incoming string values into strongly typed primitives.

### Whitelisting Security in ValidationPipe
Setting `whitelist: true` instructs `ValidationPipe` to strip any property not explicitly declared within the DTO class. Pairing this with `forbidNonWhitelisted: true` immediately rejects requests with HTTP 400 Bad Request whenever malicious or unexpected attributes appear.


---

---

## Beginner Friendly Explanation

Imagine a visa application form at an embassy counter. The reviewing clerk (ValidationPipe) holds an official rulebook (the DTO). If you enter letters into the age field or doodle unauthorized checkboxes (e.g., "Grant me VIP status"), the clerk rejects the form instantly.

## Experiments

- Transmit a lowercase SKU `sku-100` and observe the regex failure triggered by `@Matches`.
- Transmit an unauthorized property `{ "hackedProperty": 123 }` and verify rejection by `forbidNonWhitelisted`.
- Apply NestJS built-in `ParseIntPipe` on URL route parameters `@Param("id", ParseIntPipe) id: number`.

---

## Challenge

Build a custom `TrimStringPipe` that automatically strips whitespace from all incoming string fields within request bodies.

---

## Summary

You have mastered DTOs, class-validator, and ValidationPipe protection. Next week we connect PostgreSQL databases using Prisma ORM.
