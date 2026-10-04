# Data Transfer Objects (DTO), Validation Pipes & Transformation

> **Kategori:** NestJS Enterprise Architecture | **Level:** Pemula | **Minggu 2:** Data Transfer Objects (DTO), Validation Pipes & Transformation
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


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

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ PIPELINE PERMINTAAN NESTJS                               │
│                                                          │
│ HTTP Request ──► [Guards: Auth] ──► [Interceptors: Pre]  │
│                         │                                │
│                         ▼                                │
│              [Pipes: Validation DTO]                     │
│                         │                                │
│                         ▼                                │
│              [Controller: @Get/@Post]                    │
│                         │                                │
│                         ▼                                │
│              [Service: Business Logic]                   │
│                         │                                │
│                         ▼                                │
│ Response ◄── [Interceptors: Post] ◄── [Exception Filter] │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `@Controller('users')`
- **Fungsi Utama:** Dekorator pengenal rute API controller.
- **Parameter / Atribut:** `Base path string`.
- **Perilaku & Efek Sistem:** Memetakan request HTTP yang masuk ke handler method spesifik di dalam kelas controller..
- **Contoh Penggunaan Praktis:**
```typescript
@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id') id: string) { return { id }; }
}
```
- **Hasil Output yang Diharapkan:**
```text
Endpoint GET /users/:id siap diakses klien
```

### 2. `@Injectable()`
- **Fungsi Utama:** Dekorator penyedia layanan (Provider / Service).
- **Parameter / Atribut:** `Provider Scope (default: Singleton)`.
- **Perilaku & Efek Sistem:** Mendaftarkan class ke dalam IoC (Inversion of Control) Container NestJS untuk diinjeksi otomatis..
- **Contoh Penggunaan Praktis:**
```typescript
@Injectable()
export class UsersService {
  findAll() { return ['Alex', 'Budi']; }
}
```
- **Hasil Output yang Diharapkan:**
```text
Service siap diinjeksi ke Controller mana pun
```

### 3. `@Body() dto: CreateUserDto`
- **Fungsi Utama:** Ekstraksi dan validasi payload body.
- **Parameter / Atribut:** `DTO Class Schema`.
- **Perilaku & Efek Sistem:** Mengekstrak JSON body dari HTTP request dan memvalidasi aturan field via ValidationPipe..
- **Contoh Penggunaan Praktis:**
```typescript
@Post()
create(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}
```
- **Hasil Output yang Diharapkan:**
```text
Payload otomatis divalidasi sebelum logika dijalankan
```

### 4. `@Module({ controllers: [...], providers: [...] })`
- **Fungsi Utama:** Pengelompok modul arsitektur terstruktur.
- **Parameter / Atribut:** `controllers, providers, exports, imports`.
- **Perilaku & Efek Sistem:** Mengorganisasi aplikasi menjadi modul-modul independen dan kohesif..
- **Contoh Penggunaan Praktis:**
```typescript
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```
- **Hasil Output yang Diharapkan:**
```text
Modul Users siap diimpor oleh modul utama AppModule
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Scope Provider Default vs Request Scope
- **Gejala / Masalah:** Menggunakan Request Scope pada service membuat performa anjlok drastis karena bean dibuat ulang setiap request.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pertahankan Singleton Scope default kecuali jika benar-benar membutuhkan data spesifik per HTTP request.

### 2. Lupa Mendaftarkan Module di `imports: []`
- **Gejala / Masalah:** Error `Nest can't resolve dependencies of the Service` saat aplikasi dijalankan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pastikan module yang mengekspor provider tersebut telah dicantumkan di array `imports` pada modul pemanggil.

### 3. Lupa Mengaktifkan ValidationPipe Global
- **Gejala / Masalah:** Payload DTO tidak divalidasi dan data kotor masuk ke database tanpa tersaring.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu pasang `app.useGlobalPipes(new ValidationPipe({ whitelist: true }))` di `main.ts`.

---

## Ringkasan

Kamu telah menguasai DTOs, class-validator, dan proteksi ValidationPipe. Minggu depan kita menghubungkan database PostgreSQL dengan Prisma ORM.
