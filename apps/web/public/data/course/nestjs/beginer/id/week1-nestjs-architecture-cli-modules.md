# Arsitektur NestJS: Controllers, Providers, Modules & Dependency Injection

> **Kategori:** NestJS Enterprise Architecture | **Level:** Pemula | **Minggu 1:** Arsitektur NestJS: Controllers, Providers, Modules & Dependency Injection
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi arsitektur terstruktur NestJS (mengakhiri spaghetti code pada backend Node.js).
- Menggunakan Decorators: `@Controller`, `@Injectable`, `@Get`, `@Param`, dan `@Module`.
- Menerapkan Inversion of Control (IoC) dan Constructor Dependency Injection bawaan NestJS.
- Memahami prinsip enkapsulasi modul dan mekanisme ekspor provider (`exports`).

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Jest Runner** (`firsttris.vscode-jest-runner`): Menjalankan unit test NestJS dengan 1 klik
- **Prettier** (`esbenp.prettier-vscode`): Format kode TypeScript

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension firsttris.vscode-jest-runner --install-extension esbenp.prettier-vscode
```

---

### 2. Instalasi Runtime & Dependency (Node.js LTS (v20+))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
node -v && npm -v
```

Output yang diharapkan:
```output
v20.x.x
10.x.x
```

> 💡 **Tips Prasyarat:** NestJS dikompilasi menggunakan TypeScript compiler bawaan atau SWC untuk performa tinggi.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
npx @nestjs/cli new my-nest-app --package-manager npm
cd my-nest-app
```
- **Keterangan:** Menjalankan CLI NestJS untuk men-generate starter app berstruktur modul, service, dan controller.
- **Pindah ke direktori project:**
```bash
cd my-nest-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npm run start:dev
```
Akses di browser atau terminal: `http://localhost:3000`

> ℹ️ Server NestJS aktif dengan auto-reload file watch di port 3000.

**File Titik Masuk Utama (`src/app.controller.ts`):**
```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): { status: string; message: string; timestamp: string } {
    return {
      status: 'success',
      message: 'Halo dari Nest.js Enterprise API!',
      timestamp: new Date().toISOString(),
    };
  }
}
```
Controller HTTP dengan decorator @Controller dan @Get.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-nest-app/
├── src/
│   ├── app.controller.ts    # Endpoint HTTP route handler
│   ├── app.service.ts       # Logika bisnis & pengolahan data
│   ├── app.module.ts        # Root module penyusun aplikasi
│   └── main.ts              # Bootstrap entrypoint aplikasi
├── test/                    # End-to-end (e2e) tests
├── tsconfig.json            # Konfigurasi TypeScript & decorators
├── nest-cli.json            # Konfigurasi CLI NestJS
└── package.json             # Dependensi @nestjs/core
```
Pemisahan tanggung jawab yang jelas antara Controller (HTTP) dan Service (Bisnis).

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan perintah CLI `nest g resource users` untuk membuat modul CRUD lengkap otomatis.
- Tambahkan `ValidationPipe` global di `main.ts` untuk validasi otomatis DTO berbasis `class-validator`.

---

## Program: Modul Katalog Produk E-Commerce dengan Controller & Service Terinjeksi

```typescript
// Demonstrasi Struktur Inti NestJS (TypeScript + Decorators)
// Diinspirasi oleh arsitektur Angular & Spring Boot untuk skalabilitas enterprise

import { Injectable, Controller, Get, Param, Module } from '@nestjs/common';

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  price: number;
  stock: number;
}

// 1. Provider (Service Layer yang dapat di-inject)
@Injectable()
export class CatalogService {
  private readonly products: ProductItem[] = [
    { id: '1', sku: 'SKU-MAC-M3', name: 'MacBook Pro M3 Max', price: 42_000_000, stock: 12 },
    { id: '2', sku: 'SKU-IPH-16',  name: 'iPhone 16 Pro 256GB', price: 21_500_000, stock: 35 },
    { id: '3', sku: 'SKU-AIR-P2',  name: 'AirPods Pro Gen 2',   price: 3_800_000,  stock: 80 }
  ];

  findAll(): ProductItem[] {
    return this.products;
  }

  findBySku(sku: string): ProductItem | undefined {
    return this.products.find(p => p.sku.toLowerCase() === sku.toLowerCase());
  }
}

// 2. Controller (Menangani Routing HTTP Request)
@Controller('api/v1/catalog')
export class CatalogController {
  // Constructor Dependency Injection (IoC Container NestJS)
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  getAllProducts(): ProductItem[] {
    return this.catalogService.findAll();
  }

  @Get(':sku')
  getProductBySku(@Param('sku') sku: string): ProductItem {
    const product = this.catalogService.findBySku(sku);
    if (!product) {
      throw new Error(`Produk dengan SKU "${sku}" tidak ditemukan.`);
    }
    return product;
  }
}

// 3. Module (Wadah Enkapsulasi Fitur)
@Module({
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService] // Siap diekspor ke OrderModule jika diperlukan
})
export class CatalogModule {}

console.log('=== NESTJS CATALOG MODULE TERSTRUKTUR DENGAN DECORATORS ===');
```

---

## Konsep Kunci

Node.js murni memberikan kebebasan luar biasa dalam mengatur struktur folder, namun di tim engineering besar, kebebasan tanpa standar menghasilkan "spaghetti code" yang mustahil dipelihara. **NestJS** memecahkan masalah ini dengan menghadirkan arsitektur enterprise terstruktur berbasis TypeScript, terinspirasi oleh kesuksesan Angular dan Spring Boot.

### Tiga Pilar Utama NestJS
1. **Controllers**: Bertanggung jawab menerima HTTP request, mengekstrak parameter URL atau body, dan mengembalikan data respons. Controller didekorasi dengan `@Controller('prefix')`.
2. **Providers / Services**: Memuat logika bisnis inti aplikasi. Diberi anotasi `@Injectable()` sehingga IoC container NestJS dapat menginstansiasinya secara otomatis dan menyuntikkannya ke controller.
3. **Modules**: Unit organisasi fundamental. Anotasi `@Module()` mengelompokkan controller dan provider yang saling berhubungan menjadi satu domain bisnis terisolasi (misalnya `CatalogModule`, `OrderModule`, `AuthModule`).

### Dependency Injection (IoC)
Daripada menulis `new CatalogService()` di dalam controller (yang menciptakan keterikatan erat / tight coupling), kita cukup mendeklarasikannya di parameter konstruktor:
`constructor(private readonly catalogService: CatalogService) {}`
Container NestJS otomatis mengelola instansiasi singleton service ini, memudahkan proses pengujian unit menggunakan Mock Object.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda membangun gedung perkantoran besar dengan balok-balok LEGO (Modules). Setiap ruangan memiliki resepsionis yang menyambut tamu di pintu depan (Controller) dan manajer ahli di meja belakang yang memproses berkas (Service). Anda cukup menyatukan balok-balok ruangan tersebut tanpa harus merombak fondasi seluruh gedung.

## Eksperimen

- Tambahkan route baru `@Get("summary/stats")` di `CatalogController` untuk mengembalikan total valuasi stok.
- Coba buat Service tanpa `@Injectable()` dan amati bagaimana NestJS menolak menginstansiasinya.
- Jalankan perintah Nest CLI `nest g module cart` untuk melihat pembuatan berkas modular otomatis.

---

## Tantangan

Buat `DiscountService` di modul terpisah `PricingModule`, ekspor service tersebut, dan injeksikan ke dalam `CatalogService` untuk menghitung harga produk setelah diskon.

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
```output
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
```output
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
```output
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
```output
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

Kamu telah menguasai Controllers, Providers, Modules, dan Dependency Injection di NestJS. Minggu depan kita masuk ke validasi input dengan DTOs dan Validation Pipes.
