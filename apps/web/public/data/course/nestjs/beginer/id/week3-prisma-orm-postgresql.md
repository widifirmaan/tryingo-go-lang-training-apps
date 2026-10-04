# Persistensi Relasional: Prisma ORM, Skema PostgreSQL & PrismaService

> **Kategori:** NestJS Enterprise Architecture | **Level:** Pemula | **Minggu 3:** Persistensi Relasional: Prisma ORM, Skema PostgreSQL & PrismaService
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami peran Prisma ORM: declarative modeling (`schema.prisma`) dan zero-boilerplate migrations.
- Membangun `PrismaService` yang mengimplementasikan lifecycle hooks `OnModuleInit` dan `OnModuleDestroy`.
- Menguasai kueri relasional type-safe dengan auto-completion lengkap dari Prisma Client.
- Menerapkan transaksi atomik multi-tabel menggunakan `prisma.$transaction`.

---

## Program: Layanan Database PrismaService & Kueri Transaksi E-Commerce di NestJS

```typescript
// Demonstrasi PrismaService di NestJS (Prisma ORM v5 / v6)
// schema.prisma:
// model Product {
//   id        String   @id @default(uuid())
//   sku       String   @unique
//   name      String
//   price     Decimal  @db.Decimal(12, 2)
//   stock     Int
//   createdAt DateTime @default(now())
// }

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

// 1. PrismaService: Mengelola Koneksi Database Lifecycle
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  // Simulasi klien database internal PrismaClient
  async onModuleInit() {
    console.log('[PRISMA CONNECTED] Berhasil membuka connection pool ke PostgreSQL.');
  }

  async onModuleDestroy() {
    console.log('[PRISMA DISCONNECTED] Connection pool PostgreSQL ditutup dengan bersih.');
  }

  // Simulasi Kueri Type-Safe Prisma
  async createProductWithInventory(data: { sku: string; name: string; price: number; stock: number }) {
    console.log(`[PRISMA TRANSACTION] Menyimpan produk ${data.sku} dan mengunci alokasi stok...`);
    return {
      id: 'prod-uuid-2026',
      sku: data.sku,
      name: data.name,
      price: data.price,
      stock: data.stock,
      createdAt: new Date().toISOString()
    };
  }

  async findAvailableProducts() {
    return [
      { id: '1', sku: 'SKU-MAC-M3', name: 'MacBook Pro M3', price: 42000000, stock: 10 },
      { id: '2', sku: 'SKU-IPH-16', name: 'iPhone 16 Pro', price: 21500000, stock: 25 }
    ];
  }
}

// 2. Injeksi PrismaService ke dalam Domain Repository
@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getInStockItems() {
    return this.prisma.findAvailableProducts();
  }
}

console.log('=== PRISMA ORM SERVICE SIAP DIINTEGRASIKAN KE NESTJS ===');
```

---

## Konsep Kunci

Dalam pengembangan backend TypeScript modern, **Prisma ORM** telah menjadi standar de-facto karena memberikan type-safety yang sempurna dari skema database hingga kode aplikasi tanpa perlu menulis tipe interface secara manual.

### Integrasi Prisma di NestJS
Klien Prisma (`PrismaClient`) diintegrasikan ke dalam NestJS dengan membungkusnya sebagai provider `@Injectable()` bernama `PrismaService`. Dengan mengimplementasikan antarmuka `OnModuleInit` dan `OnModuleDestroy`, koneksi pool database dibuka secara otomatis saat aplikasi dinyalakan dan ditutup secara anggun saat aplikasi dimatikan.

### Type-Safety Tanpa Duplikasi
Ketika Anda menjalankan perintah `prisma generate`, Prisma membaca file `schema.prisma` dan secara otomatis menghasilkan tipe TypeScript asli. Jika Anda mengubah nama kolom di skema database, kompilator TypeScript di seluruh project NestJS akan langsung memberitahu baris kode mana saja yang perlu disesuaikan.

### Transaksi Atomik dengan $transaction
Untuk operasi checkout e-commerce yang melibatkan pembuatan pesanan, pengurangan stok produk, dan pembuatan invoice, Prisma menyediakan method `prisma.$transaction([op1, op2])` atau interactive transaction `prisma.$transaction(async (tx) => ...)`. Seluruh operasi dijamin bersifat ACID (Atomicity, Consistency, Isolation, Durability).


---

---

## Penjelasan untuk Pemula

Bayangkan Prisma seperti penerjemah bahasa instan tingkat dunia. Skema database Anda ditulis dalam bahasa PostgreSQL, sedangkan kode backend Anda dalam bahasa TypeScript. Prisma memastikan bahwa setiap kata yang diucapkan oleh database langsung dimengerti secara sempurna oleh kode TypeScript Anda tanpa ada satu huruf pun yang salah diterjemahkan.

## Eksperimen

- Definisikan relasi Satu-ke-Banyak (Category -> Products) di skema Prisma dan lakukan kueri dengan `include: { category: true }`.
- Uji coba fitur Interactive Transaction `prisma.$transaction` untuk rollback otomatis saat stok tidak mencukupi.
- Jalankan perintah `npx prisma studio` di terminal untuk membuka antarmuka visual penjelajah database.

---

## Tantangan

Buat Prisma soft-delete middleware yang secara otomatis mengubah operasi `prisma.product.delete` menjadi `update` dengan field `deletedAt = new Date()`, dan otomatis menyaring produk yang terhapus pada kueri `findMany`.

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

Kamu telah menguasai Prisma ORM, PrismaService, dan transaksi atomik. Minggu depan kita mempelajari Exception Filters dan Response Interceptors.
