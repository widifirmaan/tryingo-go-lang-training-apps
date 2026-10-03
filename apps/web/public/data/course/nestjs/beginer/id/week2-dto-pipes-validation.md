# Data Transfer Objects (DTO), Validation Pipes & Transformation

> **Kategori:** NestJS Enterprise Architecture | **Level:** Pemula | **Minggu 2:** Data Transfer Objects (DTO), Validation Pipes & Transformation

## Tujuan Pembelajaran

- Memahami konsep Data Transfer Object (DTO) dan pemisahan kontrak data API.
- Menggunakan decorator `class-validator`: `@IsNotEmpty`, `@IsNumber`, `@Min`, `@Matches`, dan `@IsEnum`.
- Mengonfigurasi `ValidationPipe` global dengan opsi `whitelist: true` dan `forbidNonWhitelisted: true`.
- Menerapkan transformasi tipe otomatis dengan `class-transformer` (`@Type(() => Number)`).

---

## Program: Validasi Payload Pembuatan Produk dengan class-validator & Global Pipes

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

## Konsep Kunci

Menerima data JSON dari luar tanpa validasi ketat adalah celah keamanan terbesar dalam Web API. Peretas dapat mengirim properti berbahaya (seperti `isAdmin: true`) yang tidak sengaja disimpan ke database jika backend tidak menyaring data input.

### Apa itu DTO (Data Transfer Object)?
DTO adalah kelas TypeScript yang mendefinisikan bentuk data yang dikirim melalui jaringan. Tidak seperti interface TypeScript yang hilang saat dikompilasi ke JavaScript, DTO didefinisikan sebagai **Class** sehingga metadata properti tetap ada saat runtime untuk dibaca oleh engine validator.

### Kekuatan class-validator & class-transformer
Melalui anotasi deklaratif seperti `@Min(1000)` dan `@Matches(...)`, aturan bisnis divalidasi sebelum method controller dipanggil. Modul `class-transformer` secara otomatis mengubah tipe data string (misalnya `price="50000"` dari query string) menjadi tipe angka murni (`50000`).

### Keamanan Whitelist pada ValidationPipe
Opsi `whitelist: true` pada `ValidationPipe` memastikan bahwa setiap properti yang tidak tercantum secara eksplisit di dalam kelas DTO akan langsung dibuang. Dengan menambahkan `forbidNonWhitelisted: true`, NestJS langsung menolak request dengan status HTTP 400 Bad Request jika ada properti liar yang mencurigakan.


---

---

## Penjelasan untuk Pemula

Bayangkan formulir pendaftaran visa di kedutaan. Petugas (ValidationPipe) memegang buku panduan aturan (DTO). Jika Anda menulis umur dengan huruf atau mencoret-coret kolom baru yang tidak ada di formulir (misal menulis: "Saya VIP, izinkan masuk"), formulir Anda langsung ditolak dan dikembalikan ke tangan Anda saat itu juga.

## Eksperimen

- Kirim payload dengan SKU huruf kecil `sku-100` dan amati penolakan oleh regex validator `@Matches`.
- Kirim properti ekstra tak dikenal `{ "hackedProperty": 123 }` dan perhatikan penolakan oleh `forbidNonWhitelisted`.
- Gunakan `ParseIntPipe` bawaan NestJS pada parameter URL `@Param("id", ParseIntPipe) id: number`.

---

## Tantangan

Buat Custom Pipe `TrimStringPipe` yang secara otomatis membersihkan spasi di awal dan akhir (trim) seluruh properti string yang masuk di body request.

---

## Ringkasan

Kamu telah menguasai DTOs, class-validator, dan proteksi ValidationPipe. Minggu depan kita menghubungkan database PostgreSQL dengan Prisma ORM.
