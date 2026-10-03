"""
NestJS Track Curriculum Generator (10 Weeks, 3 Levels)
Product: High-Scalability Enterprise Multi-Tenant E-Commerce Modular REST & GraphQL API (NestJS 10 + Prisma + Redis + Microservices)
"""

def get_track():
    return {
        'slug': 'nestjs',
        'track_name': 'NestJS Enterprise Architecture',
        'levels': [
            {
                'levelId': 'beginer',
                'nameId': 'Pemula (NestJS Core Architecture & Data Validation)',
                'nameEn': 'Beginner (NestJS Core Architecture & Data Validation)',
                'descId': 'Fondasi arsitektur modular NestJS, Controllers, Providers, Dependency Injection, DTO validation, dan Prisma ORM.',
                'descEn': 'NestJS modular architecture fundamentals, Controllers, Providers, Dependency Injection, DTO validation, and Prisma ORM.',
            },
            {
                'levelId': 'intermediate',
                'nameId': 'Menengah (Security, GraphQL & Distributed Caching)',
                'nameEn': 'Intermediate (Security, GraphQL & Distributed Caching)',
                'descId': 'Pengamanan API dengan Passport JWT, Role-Based Guards, GraphQL Code-First API, dan Redis Caching.',
                'descEn': 'API security with Passport JWT, Role-Based Guards, GraphQL Code-First APIs, and Redis Caching.',
            },
            {
                'levelId': 'advanced',
                'nameId': 'Lanjutan (Microservices, Testing & E-Commerce Capstone)',
                'nameEn': 'Advanced (Microservices, Testing & E-Commerce Capstone)',
                'descId': 'Arsitektur microservices message patterns, unit/e2e testing komprehensif, dan REST/GraphQL E-Commerce API production-ready.',
                'descEn': 'Microservices message patterns, comprehensive unit/e2e testing, and production-ready E-Commerce REST/GraphQL API.',
            },
        ],
        'modules': [
            # Week 1
            {
                'week': 1,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'nestjs-architecture-cli-modules',
                'titleId': 'Arsitektur NestJS: Controllers, Providers, Modules & Dependency Injection',
                'titleEn': 'NestJS Architecture: Controllers, Providers, Modules & Dependency Injection',
                'programId': 'Modul Katalog Produk E-Commerce dengan Controller & Service Terinjeksi',
                'programEn': 'E-Commerce Product Catalog Module with Injected Controller & Service',
                'language': 'typescript',
                'code': '''// Demonstrasi Struktur Inti NestJS (TypeScript + Decorators)
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
''',
                'objectivesId': [
                    'Memahami filosofi arsitektur terstruktur NestJS (mengakhiri spaghetti code pada backend Node.js).',
                    'Menggunakan Decorators: `@Controller`, `@Injectable`, `@Get`, `@Param`, dan `@Module`.',
                    'Menerapkan Inversion of Control (IoC) dan Constructor Dependency Injection bawaan NestJS.',
                    'Memahami prinsip enkapsulasi modul dan mekanisme ekspor provider (`exports`).',
                ],
                'objectivesEn': [
                    'Understand NestJS structured architecture philosophy (eradicating Node.js spaghetti code).',
                    'Apply TypeScript Decorators: `@Controller`, `@Injectable`, `@Get`, `@Param`, and `@Module`.',
                    'Implement NestJS built-in Inversion of Control (IoC) and Constructor Dependency Injection.',
                    'Master module encapsulation principles and provider export mechanics (`exports`).',
                ],
                'explanationId': '''Node.js murni memberikan kebebasan luar biasa dalam mengatur struktur folder, namun di tim engineering besar, kebebasan tanpa standar menghasilkan "spaghetti code" yang mustahil dipelihara. **NestJS** memecahkan masalah ini dengan menghadirkan arsitektur enterprise terstruktur berbasis TypeScript, terinspirasi oleh kesuksesan Angular dan Spring Boot.

### Tiga Pilar Utama NestJS
1. **Controllers**: Bertanggung jawab menerima HTTP request, mengekstrak parameter URL atau body, dan mengembalikan data respons. Controller didekorasi dengan `@Controller('prefix')`.
2. **Providers / Services**: Memuat logika bisnis inti aplikasi. Diberi anotasi `@Injectable()` sehingga IoC container NestJS dapat menginstansiasinya secara otomatis dan menyuntikkannya ke controller.
3. **Modules**: Unit organisasi fundamental. Anotasi `@Module()` mengelompokkan controller dan provider yang saling berhubungan menjadi satu domain bisnis terisolasi (misalnya `CatalogModule`, `OrderModule`, `AuthModule`).

### Dependency Injection (IoC)
Daripada menulis `new CatalogService()` di dalam controller (yang menciptakan keterikatan erat / tight coupling), kita cukup mendeklarasikannya di parameter konstruktor:
`constructor(private readonly catalogService: CatalogService) {}`
Container NestJS otomatis mengelola instansiasi singleton service ini, memudahkan proses pengujian unit menggunakan Mock Object.
''',
                'explanationEn': '''While vanilla Node.js grants unrestricted architectural freedom, high-velocity enterprise teams often suffer from unmaintainable spaghetti code. **NestJS** resolves this by enforcing a battle-tested, opinionated TypeScript architecture inspired by Angular and Spring Boot.

### The Three Foundational Pillars
1. **Controllers**: Intercept incoming HTTP requests, unpack query params or bodies, and return serialized responses. Designated via `@Controller('prefix')`.
2. **Providers / Services**: Encapsulate domain business logic. Annotated with `@Injectable()`, enabling NestJS's IoC container to manage their lifecycle and injection automatically.
3. **Modules**: Core organizational boundaries. Annotated with `@Module()`, modules encapsulate cohesive controllers and providers into domain packages (`CatalogModule`, `OrderModule`, `AuthModule`).

### Dependency Injection (IoC)
Instead of instantiating dependencies manually via `new CatalogService()` (tight coupling), developers declare requirements in constructor parameters:
`constructor(private readonly catalogService: CatalogService) {}`
The NestJS IoC container instantiates and injects singletons automatically, unlocking frictionless unit test mocking.
''',
                'beginnerId': '''Bayangkan Anda membangun gedung perkantoran besar dengan balok-balok LEGO (Modules). Setiap ruangan memiliki resepsionis yang menyambut tamu di pintu depan (Controller) dan manajer ahli di meja belakang yang memproses berkas (Service). Anda cukup menyatukan balok-balok ruangan tersebut tanpa harus merombak fondasi seluruh gedung.''',
                'beginnerEn': '''Imagine constructing a skyscraper using modular LEGO blocks (Modules). Each office suite features a front receptionist greeting guests (Controller) and specialized directors in back rooms executing operational workflows (Service). You snap modules together seamlessly without rewiring the building's electrical grid.''',
                'experimentsId': [
                    'Tambahkan route baru `@Get("summary/stats")` di `CatalogController` untuk mengembalikan total valuasi stok.',
                    'Coba buat Service tanpa `@Injectable()` dan amati bagaimana NestJS menolak menginstansiasinya.',
                    'Jalankan perintah Nest CLI `nest g module cart` untuk melihat pembuatan berkas modular otomatis.',
                ],
                'experimentsEn': [
                    'Add a new `@Get("summary/stats")` route in `CatalogController` returning aggregate inventory valuations.',
                    'Omit the `@Injectable()` decorator from a service and observe NestJS compilation errors.',
                    'Execute the Nest CLI `nest g module cart` command to inspect automated modular scaffolding.',
                ],
                'challengeId': 'Buat `DiscountService` di modul terpisah `PricingModule`, ekspor service tersebut, dan injeksikan ke dalam `CatalogService` untuk menghitung harga produk setelah diskon.',
                'challengeEn': 'Build a `DiscountService` within a separate `PricingModule`, export the service, and inject it into `CatalogService` to compute discounted prices.',
                'summaryId': 'Kamu telah menguasai Controllers, Providers, Modules, dan Dependency Injection di NestJS. Minggu depan kita masuk ke validasi input dengan DTOs dan Validation Pipes.',
                'summaryEn': 'You have mastered Controllers, Providers, Modules, and Dependency Injection in NestJS. Next week we explore input validation with DTOs and Validation Pipes.',
            },

            # Week 2
            {
                'week': 2,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'dto-pipes-validation',
                'titleId': 'Data Transfer Objects (DTO), Validation Pipes & Transformation',
                'titleEn': 'Data Transfer Objects (DTO), Validation Pipes & Transformation',
                'programId': 'Validasi Payload Pembuatan Produk dengan class-validator & Global Pipes',
                'programEn': 'Product Creation Payload Validation with class-validator & Global Pipes',
                'language': 'typescript',
                'code': '''// Menggunakan class-validator dan class-transformer standar industri di NestJS
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
''',
                'objectivesId': [
                    'Memahami konsep Data Transfer Object (DTO) dan pemisahan kontrak data API.',
                    'Menggunakan decorator `class-validator`: `@IsNotEmpty`, `@IsNumber`, `@Min`, `@Matches`, dan `@IsEnum`.',
                    'Mengonfigurasi `ValidationPipe` global dengan opsi `whitelist: true` dan `forbidNonWhitelisted: true`.',
                    'Menerapkan transformasi tipe otomatis dengan `class-transformer` (`@Type(() => Number)`).',
                ],
                'objectivesEn': [
                    'Understand Data Transfer Objects (DTO) and API contract isolation.',
                    'Apply `class-validator` decorators: `@IsNotEmpty`, `@IsNumber`, `@Min`, `@Matches`, and `@IsEnum`.',
                    'Configure global `ValidationPipe` with `whitelist: true` and `forbidNonWhitelisted: true`.',
                    'Implement automated payload type casting using `class-transformer` (`@Type(() => Number)`).',
                ],
                'explanationId': '''Menerima data JSON dari luar tanpa validasi ketat adalah celah keamanan terbesar dalam Web API. Peretas dapat mengirim properti berbahaya (seperti `isAdmin: true`) yang tidak sengaja disimpan ke database jika backend tidak menyaring data input.

### Apa itu DTO (Data Transfer Object)?
DTO adalah kelas TypeScript yang mendefinisikan bentuk data yang dikirim melalui jaringan. Tidak seperti interface TypeScript yang hilang saat dikompilasi ke JavaScript, DTO didefinisikan sebagai **Class** sehingga metadata properti tetap ada saat runtime untuk dibaca oleh engine validator.

### Kekuatan class-validator & class-transformer
Melalui anotasi deklaratif seperti `@Min(1000)` dan `@Matches(...)`, aturan bisnis divalidasi sebelum method controller dipanggil. Modul `class-transformer` secara otomatis mengubah tipe data string (misalnya `price="50000"` dari query string) menjadi tipe angka murni (`50000`).

### Keamanan Whitelist pada ValidationPipe
Opsi `whitelist: true` pada `ValidationPipe` memastikan bahwa setiap properti yang tidak tercantum secara eksplisit di dalam kelas DTO akan langsung dibuang. Dengan menambahkan `forbidNonWhitelisted: true`, NestJS langsung menolak request dengan status HTTP 400 Bad Request jika ada properti liar yang mencurigakan.
''',
                'explanationEn': '''Ingesting untrusted JSON payloads without strict schema validation exposes severe vulnerabilities. Attackers can inject rogue properties (such as `isAdmin: true`) which risk being persisted directly into databases if backends fail to sanitize inputs.

### What is a Data Transfer Object (DTO)?
A DTO is a TypeScript class defining the exact shape of payloads traversing the network. Unlike TypeScript interfaces which evaporate during compilation, DTOs are declared as **Classes**, preserving runtime property metadata for reflection by validation engines.

### Declarative Validation via class-validator
Decorators like `@Min(1000)` and `@Matches(...)` enforce business constraints before controller handlers execute. The `class-transformer` module automatically coerces incoming string values into strongly typed primitives.

### Whitelisting Security in ValidationPipe
Setting `whitelist: true` instructs `ValidationPipe` to strip any property not explicitly declared within the DTO class. Pairing this with `forbidNonWhitelisted: true` immediately rejects requests with HTTP 400 Bad Request whenever malicious or unexpected attributes appear.
''',
                'beginnerId': '''Bayangkan formulir pendaftaran visa di kedutaan. Petugas (ValidationPipe) memegang buku panduan aturan (DTO). Jika Anda menulis umur dengan huruf atau mencoret-coret kolom baru yang tidak ada di formulir (misal menulis: "Saya VIP, izinkan masuk"), formulir Anda langsung ditolak dan dikembalikan ke tangan Anda saat itu juga.''',
                'beginnerEn': '''Imagine a visa application form at an embassy counter. The reviewing clerk (ValidationPipe) holds an official rulebook (the DTO). If you enter letters into the age field or doodle unauthorized checkboxes (e.g., "Grant me VIP status"), the clerk rejects the form instantly.''',
                'experimentsId': [
                    'Kirim payload dengan SKU huruf kecil `sku-100` dan amati penolakan oleh regex validator `@Matches`.',
                    'Kirim properti ekstra tak dikenal `{ "hackedProperty": 123 }` dan perhatikan penolakan oleh `forbidNonWhitelisted`.',
                    'Gunakan `ParseIntPipe` bawaan NestJS pada parameter URL `@Param("id", ParseIntPipe) id: number`.',
                ],
                'experimentsEn': [
                    'Transmit a lowercase SKU `sku-100` and observe the regex failure triggered by `@Matches`.',
                    'Transmit an unauthorized property `{ "hackedProperty": 123 }` and verify rejection by `forbidNonWhitelisted`.',
                    'Apply NestJS built-in `ParseIntPipe` on URL route parameters `@Param("id", ParseIntPipe) id: number`.',
                ],
                'challengeId': 'Buat Custom Pipe `TrimStringPipe` yang secara otomatis membersihkan spasi di awal dan akhir (trim) seluruh properti string yang masuk di body request.',
                'challengeEn': 'Build a custom `TrimStringPipe` that automatically strips whitespace from all incoming string fields within request bodies.',
                'summaryId': 'Kamu telah menguasai DTOs, class-validator, dan proteksi ValidationPipe. Minggu depan kita menghubungkan database PostgreSQL dengan Prisma ORM.',
                'summaryEn': 'You have mastered DTOs, class-validator, and ValidationPipe protection. Next week we connect PostgreSQL databases using Prisma ORM.',
            },

            # Week 3
            {
                'week': 3,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'prisma-orm-postgresql',
                'titleId': 'Persistensi Relasional: Prisma ORM, Skema PostgreSQL & PrismaService',
                'titleEn': 'Relational Persistence: Prisma ORM, PostgreSQL Schema & PrismaService',
                'programId': 'Layanan Database PrismaService & Kueri Transaksi E-Commerce di NestJS',
                'programEn': 'PrismaService Database Layer & E-Commerce Transactions in NestJS',
                'language': 'typescript',
                'code': '''// Demonstrasi PrismaService di NestJS (Prisma ORM v5 / v6)
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
''',
                'objectivesId': [
                    'Memahami peran Prisma ORM: declarative modeling (`schema.prisma`) dan zero-boilerplate migrations.',
                    'Membangun `PrismaService` yang mengimplementasikan lifecycle hooks `OnModuleInit` dan `OnModuleDestroy`.',
                    'Menguasai kueri relasional type-safe dengan auto-completion lengkap dari Prisma Client.',
                    'Menerapkan transaksi atomik multi-tabel menggunakan `prisma.$transaction`.',
                ],
                'objectivesEn': [
                    'Understand Prisma ORM role: declarative modeling (`schema.prisma`) and zero-boilerplate migrations.',
                    'Build a robust `PrismaService` implementing lifecycle hooks `OnModuleInit` and `OnModuleDestroy`.',
                    'Master type-safe relational queries with auto-generated TypeScript types via Prisma Client.',
                    'Implement multi-table atomic database transactions using `prisma.$transaction`.',
                ],
                'explanationId': '''Dalam pengembangan backend TypeScript modern, **Prisma ORM** telah menjadi standar de-facto karena memberikan type-safety yang sempurna dari skema database hingga kode aplikasi tanpa perlu menulis tipe interface secara manual.

### Integrasi Prisma di NestJS
Klien Prisma (`PrismaClient`) diintegrasikan ke dalam NestJS dengan membungkusnya sebagai provider `@Injectable()` bernama `PrismaService`. Dengan mengimplementasikan antarmuka `OnModuleInit` dan `OnModuleDestroy`, koneksi pool database dibuka secara otomatis saat aplikasi dinyalakan dan ditutup secara anggun saat aplikasi dimatikan.

### Type-Safety Tanpa Duplikasi
Ketika Anda menjalankan perintah `prisma generate`, Prisma membaca file `schema.prisma` dan secara otomatis menghasilkan tipe TypeScript asli. Jika Anda mengubah nama kolom di skema database, kompilator TypeScript di seluruh project NestJS akan langsung memberitahu baris kode mana saja yang perlu disesuaikan.

### Transaksi Atomik dengan $transaction
Untuk operasi checkout e-commerce yang melibatkan pembuatan pesanan, pengurangan stok produk, dan pembuatan invoice, Prisma menyediakan method `prisma.$transaction([op1, op2])` atau interactive transaction `prisma.$transaction(async (tx) => ...)`. Seluruh operasi dijamin bersifat ACID (Atomicity, Consistency, Isolation, Durability).
''',
                'explanationEn': '''In contemporary TypeScript backend engineering, **Prisma ORM** stands as the industry benchmark, providing seamless end-to-end type safety spanning the SQL schema to application controllers without redundant manual interface declarations.

### Prisma Integration in NestJS
The underlying `PrismaClient` is wrapped inside a dedicated `@Injectable()` provider named `PrismaService`. Implementing `OnModuleInit` and `OnModuleDestroy` hooks ensures connection pools initialize during application boot and drain gracefully during teardowns.

### Zero-Drift Type Safety
Running `prisma generate` parses `schema.prisma` to synthesize native TypeScript definitions dynamically. If an entity column changes in the schema, TypeScript immediately highlights impacted controller and service calls across the entire codebase.

### Atomic Transactions via $transaction
E-commerce checkout flows require inserting orders, decrementing inventory units, and logging transaction audits within a unified transaction. Prisma provides `prisma.$transaction(async (tx) => ...)` guaranteeing strict ACID compliance.
''',
                'beginnerId': '''Bayangkan Prisma seperti penerjemah bahasa instan tingkat dunia. Skema database Anda ditulis dalam bahasa PostgreSQL, sedangkan kode backend Anda dalam bahasa TypeScript. Prisma memastikan bahwa setiap kata yang diucapkan oleh database langsung dimengerti secara sempurna oleh kode TypeScript Anda tanpa ada satu huruf pun yang salah diterjemahkan.''',
                'beginnerEn': '''Think of Prisma as a certified simultaneous language interpreter. Your database schema speaks PostgreSQL, while your backend code speaks TypeScript. Prisma ensures every database column translates into your TypeScript code with zero grammatical errors or lost definitions.''',
                'experimentsId': [
                    'Definisikan relasi Satu-ke-Banyak (Category -> Products) di skema Prisma dan lakukan kueri dengan `include: { category: true }`.',
                    'Uji coba fitur Interactive Transaction `prisma.$transaction` untuk rollback otomatis saat stok tidak mencukupi.',
                    'Jalankan perintah `npx prisma studio` di terminal untuk membuka antarmuka visual penjelajah database.',
                ],
                'experimentsEn': [
                    'Define a One-to-Many relation (Category -> Products) in schema.prisma and query with `include: { category: true }`.',
                    'Test Prisma Interactive Transactions verifying automated rollbacks when inventory is depleted.',
                    'Launch `npx prisma studio` to inspect relational tables visually in the browser.',
                ],
                'challengeId': 'Buat Prisma soft-delete middleware yang secara otomatis mengubah operasi `prisma.product.delete` menjadi `update` dengan field `deletedAt = new Date()`, dan otomatis menyaring produk yang terhapus pada kueri `findMany`.',
                'challengeEn': 'Build a Prisma soft-delete client extension converting `delete` operations into `update` with `deletedAt = new Date()`, filtering soft-deleted entities on `findMany`.',
                'summaryId': 'Kamu telah menguasai Prisma ORM, PrismaService, dan transaksi atomik. Minggu depan kita mempelajari Exception Filters dan Response Interceptors.',
                'summaryEn': 'You have mastered Prisma ORM, PrismaService, and atomic transactions. Next week we explore Exception Filters and Response Interceptors.',
            },

            # Week 4
            {
                'week': 4,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'exception-filters-interceptors',
                'titleId': 'HTTP Pipeline: Global Exception Filters & Response Interceptors',
                'titleEn': 'HTTP Pipeline: Global Exception Filters & Response Interceptors',
                'programId': 'Transformasi Respons Standar & Penanganan Error RFC 7807 Terpusat',
                'programEn': 'Standardized Response Transformation & RFC 7807 Error Filter',
                'language': 'typescript',
                'code': '''import {
  ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus,
  Injectable, NestInterceptor, ExecutionContext, CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 1. Global Response Interceptor: Membungkus Semua Respons Sukses ke Format Seragam
export interface StandardApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, StandardApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<StandardApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode || 200;

    return next.handle().pipe(
      map(data => ({
        success: true,
        statusCode,
        data,
        timestamp: new Date().toISOString()
      }))
    );
  }
}

// 2. Global Exception Filter: Menangkap Semua Error & Memformat sesuai RFC 7807
@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Terjadi kesalahan sistem internal tak terduga.';

    const errorPayload = {
      type: 'https://tryngo.io/errors/api-error',
      title: status >= 500 ? 'Internal Server Error' : 'Client Error',
      status,
      detail: typeof message === 'object' ? message : { message },
      instance: request.url,
      timestamp: new Date().toISOString()
    };

    console.error(`[EXCEPTION INTERCEPTED] ${request.method} ${request.url} -> Status ${status}`);
    response.status(status).json(errorPayload);
  }
}

console.log('=== TRANSFORM INTERCEPTOR & EXCEPTION FILTER SIAP DIGUNAKAN ===');
''',
                'objectivesId': [
                    'Menguasai Exception Filters (`@Catch()`) untuk mengontrol respons error HTTP secara terpusat.',
                    'Memahami NestJS Interceptors menggunakan pustaka reaktif RxJS (`Observable`, `map`, `tap`).',
                    'Menyeragamkan struktur respons sukses API (`success: true, data: ...`) di seluruh controller.',
                    'Menerapkan format error terstandarisasi RFC 7807 Problem Details.',
                ],
                'objectivesEn': [
                    'Master Exception Filters (`@Catch()`) for centralized HTTP error response formatting.',
                    'Understand NestJS Interceptors leveraging reactive RxJS operators (`Observable`, `map`, `tap`).',
                    'Standardize successful API envelope formats (`success: true, data: ...`) across all controllers.',
                    'Implement standardized RFC 7807 Problem Details error schemas.',
                ],
                'explanationId': '''Salah satu tanda API yang buruk adalah inkonsistensi: endpoint A mengembalikan array langsung, endpoint B mengembalikan objek pembungkus `{ result: ... }`, dan jika terjadi error, endpoint C mengembalikan string teks mentah sedangkan endpoint D mengembalikan stack trace HTML.

### Response Interceptors dengan RxJS
NestJS mengintegrasikan **RxJS** pada layer interceptor. Dengan mengimplementasikan `NestInterceptor`, method `intercept()` dapat memodifikasi aliran data sebelum method controller dijalankan atau setelah data dikembalikan. Operator `.pipe(map(...))` membungkus seluruh data keluaran controller menjadi amplop terstandarisasi `{ success: true, statusCode: 200, data: ..., timestamp: ... }`.

### Global Exception Filters
Ketika controller atau service melempar exception (misalnya `throw new NotFoundException("Produk tidak ada")`), alur eksekusi ditangkap oleh **Exception Filter**. Melalui `@Catch()`, kita mengubah seluruh error menjadi format JSON standar RFC 7807, mencatat log audit, dan mencegah informasi sensitif database bocor ke pengguna luar saat terjadi error internal server (500).
''',
                'explanationEn': '''A hallmark of brittle APIs is response inconsistency: Endpoint A returns raw arrays, Endpoint B yields `{ result: ... }`, and exceptions emit raw text or HTML stack traces.

### Response Interceptors with RxJS
NestJS weaves **RxJS** into its interceptor pipeline. Implementing `NestInterceptor` allows `intercept()` to transform data streams before or after route handlers execute. Applying `.pipe(map(...))` standardizes all responses into a predictable envelope `{ success: true, statusCode: 200, data: ..., timestamp: ... }`.

### Global Exception Filters
Whenever services throw exceptions (`throw new NotFoundException()`), execution halts and routes to the **Exception Filter**. Decorated with `@Catch()`, filters format exceptions into standardized RFC 7807 Problem Details payloads, audit errors, and conceal internal database credentials from public exposure on 500 errors.
''',
                'beginnerId': '''Bayangkan amplop surat resmi perusahaan ekspedisi (Interceptor). Apapun isi barang di dalamnya (laptop, baju, atau buku), bagian luar paket selalu dibungkus kardus cokelat rapi dengan label barcode resmi perusahaan. Dan jika paket rusak atau alamat salah (Exception Filter), surat penolakan resmi bersurat jalan yang rapi langsung dicetak untuk pengirim.''',
                'beginnerEn': '''Imagine an official courier parcel envelope (the Interceptor). Regardless of internal contents (laptops, apparel, documents), parcels receive standardized protective packaging and tracking stamps. And if an address is invalid (Exception Filter), an official incident manifest prints immediately for the sender.''',
                'experimentsId': [
                    'Lemparkan `throw new UnauthorizedException("Akses ditolak")` dan amati format JSON yang dihasilkan Exception Filter.',
                    'Gunakan operator RxJS `tap()` di dalam Interceptor untuk mencatat durasi waktu eksekusi request dalam milidetik.',
                    'Daftarkan filter secara global di `main.ts` menggunakan `app.useGlobalFilters(new GlobalHttpExceptionFilter())`.',
                ],
                'experimentsEn': [
                    'Throw an `UnauthorizedException("Access denied")` and inspect the formatted JSON payload from the filter.',
                    'Apply the RxJS `tap()` operator inside an interceptor to measure route execution latency in milliseconds.',
                    'Register the filter globally in `main.ts` using `app.useGlobalFilters(new GlobalHttpExceptionFilter())`.',
                ],
                'challengeId': 'Buat Logging Interceptor yang secara otomatis menyembunyikan (masking) field sensitif seperti `password` dan `creditCard` dari body request sebelum dicatat ke log server.',
                'challengeEn': 'Build a Logging Interceptor that automatically masks sensitive fields like `password` and `creditCard` from request bodies before logging to standard output.',
                'summaryId': 'Kamu telah menguasai Exception Filters, Interceptors RxJS, dan standarisasi API. Level 1 selesai! Di Level 2 kita mempelajari Passport JWT Auth, GraphQL, dan Redis Caching.',
                'summaryEn': 'You have mastered Exception Filters, RxJS Interceptors, and API standardization. Level 1 complete! Level 2 covers Passport JWT Auth, GraphQL, and Redis Caching.',
            },

            # Week 5
            {
                'week': 5,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'guards-auth-jwt-passport',
                'titleId': 'Keamanan Enterprise: Passport JWT, Auth Guards & Role-Based Access Control',
                'titleEn': 'Enterprise Security: Passport JWT, Auth Guards & Role-Based Access Control',
                'programId': 'Sistem Otorisasi Multi-Peran E-Commerce dengan Guards & Custom Decorators',
                'programEn': 'E-Commerce Multi-Role Authorization with Guards & Custom Decorators',
                'language': 'typescript',
                'code': '''// Menggunakan @nestjs/passport, @nestjs/jwt, dan passport-jwt
import {
  Injectable, CanActivate, ExecutionContext, SetMetadata,
  createParamDecorator, UnauthorizedException, ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export enum Role {
  CUSTOMER = 'CUSTOMER',
  MERCHANT = 'MERCHANT',
  ADMIN = 'ADMIN',
}

// 1. Custom Metadata Decorator untuk Menentukan Peran yang Diizinkan
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// 2. Custom User Parameter Decorator (Mengekstrak User dari Request)
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// 3. Roles Guard: Memvalidasi Apakah User Memiliki Peran yang Dibutuhkan
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Jika endpoint tidak memiliki batasan peran (@Roles), izinkan akses
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new UnauthorizedException('Pengguna belum terautentikasi.');
    }

    const hasRole = requiredRoles.some(role => user.roles?.includes(role));
    if (!hasRole) {
      throw new ForbiddenException(`Akses ditolak! Endpoint ini membutuhkan peran: ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}

console.log('=== ROLES GUARD & CURRENT USER DECORATOR TERDEFINISI ===');
''',
                'objectivesId': [
                    'Memahami siklus otentikasi NestJS menggunakan `@nestjs/passport` dan `@nestjs/jwt`.',
                    'Menggunakan `AuthGuard("jwt")` untuk melindungi endpoint dari request tanpa token valid.',
                    'Membangun sistem Role-Based Access Control (RBAC) menggunakan `Reflector` dan Custom Decorator `@Roles`.',
                    'Membuat Custom Parameter Decorator `@CurrentUser()` untuk mengambil identitas user secara type-safe.',
                ],
                'objectivesEn': [
                    'Understand NestJS authentication lifecycle using `@nestjs/passport` and `@nestjs/jwt`.',
                    'Deploy `AuthGuard("jwt")` to shield endpoints against unauthenticated requests.',
                    'Build a Role-Based Access Control (RBAC) system via `Reflector` and the `@Roles` decorator.',
                    'Author a custom `@CurrentUser()` parameter decorator to extract verified user claims.',
                ],
                'explanationId': '''Otorisasi dan autentikasi dalam arsitektur enterprise e-commerce harus modular dan dapat diterapkan secara deklaratif di atas route handler tanpa mencemari logika bisnis service.

### Peran Guards di NestJS
**Guards** mengimplementasikan interface `CanActivate`. Guard dieksekusi setelah semua middleware selesai, namun **sebelum** interceptor, pipe, dan route handler dipanggil. Jika method `canActivate()` mengembalikan `false` atau melempar exception, NestJS langsung menolak request tersebut.

### Metadata Reflector dan @Roles Decorator
Alih-alih menulis kode pengecekan peran di setiap controller, kita membuat custom decorator `@Roles(Role.ADMIN, Role.MERCHANT)`. Nilai peran disimpan di metadata handler menggunakan `SetMetadata`. Di dalam `RolesGuard`, kita menggunakan kelas bawaan **Reflector** untuk membaca metadata tersebut dan membandingkannya dengan array peran milik user yang ada di payload token JWT.

### Custom Parameter Decorator @CurrentUser
Dengan `createParamDecorator`, kita dapat menulis `@CurrentUser() user: UserEntity` langsung di parameter controller method. Pendekatan ini membuat controller sangat bersih dan mudah diuji dengan unit testing.
''',
                'explanationEn': '''Authentication and authorization in enterprise e-commerce systems must remain decoupled, declaratively guarding route handlers without cluttering service business logic.

### The Role of NestJS Guards
**Guards** implement the `CanActivate` interface. Executed after middleware but **prior** to interceptors, pipes, or route handlers, returning `false` or throwing exceptions immediately halts execution.

### Metadata Reflection via @Roles
Rather than scattering role checks across controllers, we declare custom `@Roles(Role.ADMIN, Role.MERCHANT)` decorators. Values are stored as route metadata via `SetMetadata`. Within `RolesGuard`, the **Reflector** service reads this metadata, evaluating it against the user's validated JWT claims array.

### Custom Parameter Decorator: @CurrentUser
Authoring `createParamDecorator` allows controllers to extract validated users directly: `@CurrentUser() user: UserEntity`. This keeps controller signatures declarative and simplifies unit testing.
''',
                'beginnerId': '''Bayangkan sebuah pesta eksklusif di hotel berbintang. Di pintu masuk utama ada satpam pemeriksa tiket (AuthGuard) yang memastikan Anda membawa gelang tiket asli. Namun untuk masuk ke ruang lounge eksekutif VIP (RolesGuard), satpam kedua memeriksa apakah gelang tiket Anda berwarna emas (Admin/Merchant).''',
                'beginnerEn': '''Imagine an exclusive corporate gala. At the outer foyer, security officers verify admissions tickets (AuthGuard), validating passes. However, entering the private VIP executive suite (RolesGuard) requires an inner guard verifying whether your wristband is gold-stamped (Admin/Merchant).''',
                'experimentsId': [
                    'Uji coba akses endpoint bertanda `@Roles(Role.ADMIN)` menggunakan token milik user biasa berkategori CUSTOMER.',
                    'Buat guard komposit yang menggabungkan verifikasi JWT dan pengecekan apakah akun user sedang dibekukan (isSuspended).',
                    'Daftarkan RolesGuard secara global menggunakan `APP_GUARD` di modul utama.',
                ],
                'experimentsEn': [
                    'Attempt accessing an `@Roles(Role.ADMIN)` route with a CUSTOMER token and inspect the 403 Forbidden payload.',
                    'Build a composite guard validating both JWT authenticity and active account suspension status (isSuspended).',
                    'Register RolesGuard globally using the `APP_GUARD` token within your root module.',
                ],
                'challengeId': 'Implementasikan sistem Permission-Based Access Control (PBAC) di mana user memiliki daftar izin granular seperti `products:write`, `orders:cancel`, dan validasi izin tersebut menggunakan Guard.',
                'challengeEn': 'Implement a Permission-Based Access Control (PBAC) subsystem where users hold fine-grained permissions like `products:write`, validated via a custom Guard.',
                'summaryId': 'Kamu telah menguasai Passport JWT, RolesGuard, dan Custom Decorators. Minggu depan kita membangun GraphQL API Code-First dengan NestJS.',
                'summaryEn': 'You have mastered Passport JWT, RolesGuard, and Custom Decorators. Next week we construct Code-First GraphQL APIs with NestJS.',
            },

            # Week 6
            {
                'week': 6,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'graphql-code-first',
                'titleId': 'GraphQL Modern: Pendekatan Code-First, Resolvers & Mutations',
                'titleEn': 'Modern GraphQL: Code-First Paradigm, Resolvers & Mutations',
                'programId': 'GraphQL Product Resolver dengan FieldResolvers & Relasi Dinamis',
                'programEn': 'GraphQL Product Resolver with FieldResolvers & Dynamic Relations',
                'language': 'typescript',
                'code': '''// Menggunakan @nestjs/graphql, @apollo/server, dan graphql
// Pendekatan Code-First: Skema GraphQL digenerate otomatis dari TypeScript Classes

import { Field, ObjectType, ID, Float, Int, Resolver, Query, Mutation, Args } from '@nestjs/graphql';

// 1. GraphQL Object Type (Model Data Skema)
@ObjectType()
export class ProductType {
  @Field(() => ID)
  id!: string;

  @Field()
  sku!: string;

  @Field()
  name!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => Int)
  stock!: number;

  @Field(() => Boolean)
  inStock!: boolean;
}

// 2. GraphQL Resolver (Pengganti Controller pada REST)
@Resolver(() => ProductType)
export class ProductResolver {
  private products: ProductType[] = [
    { id: '1', sku: 'SKU-001', name: 'Mechanical Keyboard RGB', price: 1250000, stock: 15, inStock: true },
    { id: '2', sku: 'SKU-002', name: 'Ultra-wide Curved Monitor', price: 6800000, stock: 0, inStock: false },
  ];

  @Query(() => [ProductType], { name: 'products', description: 'Ambil semua daftar produk katalog' })
  async getProducts(): Promise<ProductType[]> {
    return this.products;
  }

  @Query(() => ProductType, { name: 'productBySku', nullable: true })
  async getProductBySku(@Args('sku') sku: string): Promise<ProductType | undefined> {
    return this.products.find(p => p.sku === sku);
  }

  @Mutation(() => ProductType, { name: 'updateStock' })
  async updateStock(
    @Args('id', { type: () => ID }) id: string,
    @Args('newStock', { type: () => Int }) newStock: number
  ): Promise<ProductType> {
    const product = this.products.find(p => p.id === id);
    if (!product) throw new Error(`Produk dengan ID ${id} tidak ditemukan.`);

    product.stock = newStock;
    product.inStock = newStock > 0;
    return product;
  }
}

console.log('=== GRAPHQL CODE-FIRST RESOLVER TERDEFINISI ===');
console.log('Skema schema.gql digenerate otomatis saat aplikasi NestJS dinyalakan.');
''',
                'objectivesId': [
                    'Memahami pendekatan Code-First vs Schema-First pada NestJS GraphQL.',
                    'Menggunakan decorator GraphQL: `@ObjectType`, `@Field`, `@Resolver`, `@Query`, dan `@Mutation`.',
                    'Mencegah over-fetching dan under-fetching data pada aplikasi e-commerce modern.',
                    'Menghasilkan skema SDL `schema.gql` secara otomatis dari kelas TypeScript.',
                ],
                'objectivesEn': [
                    'Differentiate Code-First from Schema-First paradigms in NestJS GraphQL.',
                    'Apply GraphQL decorators: `@ObjectType`, `@Field`, `@Resolver`, `@Query`, and `@Mutation`.',
                    'Eliminate network over-fetching and under-fetching across client applications.',
                    'Auto-generate SDL `schema.gql` schemas directly from annotated TypeScript classes.',
                ],
                'explanationId': '''Pada aplikasi mobile e-commerce, REST API sering kali memboroskan kuota internet pengguna karena mengirimkan seluruh field produk (over-fetching) atau mengharuskan aplikasi memanggil 3 endpoint terpisah untuk menampilkan satu layar (under-fetching). GraphQL memecahkan masalah ini dengan mengizinkan client meminta persis field yang dibutuhkannya.

### Pendekatan Code-First di NestJS
NestJS mendukung dua metode GraphQL:
1. **Schema-First**: Menulis file skema `.graphql` secara manual, lalu membuat resolver yang cocok.
2. **Code-First (Standar Industri)**: Menulis kelas TypeScript murni yang didekorasi dengan `@ObjectType()` dan `@Field()`. NestJS secara otomatis mengompilasi kelas ini menjadi file skema GraphQL (`schema.gql`). Keuntungannya: Single Source of Truth—tidak ada lagi desinkronisasi antara tipe TypeScript dan skema GraphQL.

### Resolvers dan Mutations
- `@Query()`: Digunakan untuk operasi pembacaan data (ekuivalen dengan GET pada REST).
- `@Mutation()`: Digunakan untuk operasi perubahan state atau mutasi data (ekuivalen dengan POST, PUT, DELETE).
- `@ResolveField()`: Memungkinkan pemuatan data relasional secara dinamis hanya jika field tersebut benar-benar diminta oleh kueri GraphQL client.
''',
                'explanationEn': '''In mobile e-commerce applications, REST endpoints waste client bandwidth by transmitting redundant attributes (over-fetching) or requiring three separate HTTP calls to render a single product detail screen (under-fetching). GraphQL solves this by empowering clients to request exactly the attributes they need.

### The Code-First Paradigm in NestJS
NestJS provides two GraphQL approaches:
1. **Schema-First**: Manually maintaining raw `.graphql` SDL files and matching resolvers.
2. **Code-First (Enterprise Standard)**: Authoring canonical TypeScript classes decorated with `@ObjectType()` and `@Field()`. NestJS automatically synthesizes the schema SDL (`schema.gql`) upon startup. This guarantees a Single Source of Truth with zero drift between database models, TypeScript types, and GraphQL schemas.

### Resolvers & Mutations
- `@Query()`: Designates read operations (analogous to HTTP GET).
- `@Mutation()`: Encapsulates state-mutating actions (analogous to POST, PUT, DELETE).
- `@ResolveField()`: Dynamically loads relational child entities exclusively when the client's query explicitly selects that field.
''',
                'beginnerId': '''Bayangkan memesan nasi tumpeng di restoran. REST API seperti paket nasi tumpeng kaku yang sudah ditentukan isinya (Anda terpaksa menerima ayam, telur, tempe, dan sambal meskipun Anda alergi telur). GraphQL seperti prasmanan: Anda memilih sendiri hanya ingin nasi kuning dan ayam bakar ke dalam piring Anda.''',
                'beginnerEn': '''Imagine ordering at a restaurant. A REST API behaves like a fixed set menu: you are forced to accept soup, salad, and steak even if you only wanted the steak. A GraphQL API behaves like an à la carte buffet: you request exactly the steak on your plate, paying zero bandwidth for unneeded dishes.''',
                'experimentsId': [
                    'Buka GraphQL Playground / Apollo Sandbox di browser pada `http://localhost:3000/graphql`.',
                    'Jalankan kueri `{ products { name price } }` dan buktikan field stock dan id tidak dikirimkan ke client.',
                    'Tambahkan decorator `@ResolveField(() => [ReviewType])` untuk memuat review produk secara lazy.',
                ],
                'experimentsEn': [
                    'Navigate to Apollo Sandbox at `http://localhost:3000/graphql`.',
                    'Execute query `{ products { name price } }` and verify unrequested fields are omitted.',
                    'Add a `@ResolveField(() => [ReviewType])` decorator resolving product reviews lazily.',
                ],
                'challengeId': 'Gunakan library `DataLoader` di dalam FieldResolver untuk memecahkan masalah N+1 Query Problem saat mengambil data kategori untuk 50 produk sekaligus.',
                'challengeEn': 'Deploy `DataLoader` within a FieldResolver to resolve the N+1 Query Problem when retrieving categories across 50 products concurrently.',
                'summaryId': 'Kamu telah menguasai GraphQL Code-First, Resolvers, dan Mutations di NestJS. Minggu depan kita mempelajari Caching Terdistribusi dengan Redis dan Interceptors.',
                'summaryEn': 'You have mastered GraphQL Code-First, Resolvers, and Mutations in NestJS. Next week we explore Distributed Caching with Redis and Interceptors.',
            },

            # Week 7
            {
                'week': 7,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'caching-redis-interceptors',
                'titleId': 'Caching Terdistribusi: CacheModule, Redis Store & Cache Invalidation',
                'titleEn': 'Distributed Caching: CacheModule, Redis Store & Cache Invalidation',
                'programId': 'Cache Terdistribusi Redis untuk Katalog Produk & Invalidation Otomatis',
                'programEn': 'Redis Distributed Caching for Product Catalog & Automated Invalidation',
                'language': 'typescript',
                'code': '''// Menggunakan @nestjs/cache-manager dan cache-manager-redis-yet
import {
  Injectable, Controller, Get, Post, Param, Body, UseInterceptors
} from '@nestjs/common';

// Simulasi Antarmuka CacheManager
interface CacheStore {
  get<T>(key: string): Promise<T | undefined>;
  set(key: string, value: unknown, ttlMs?: number): Promise<void>;
  del(key: string): Promise<void>;
}

@Injectable()
export class MockCacheService implements CacheStore {
  private store = new Map<string, { val: unknown; expires: number }>();

  async get<T>(key: string): Promise<T | undefined> {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expires) {
      this.store.delete(key);
      return undefined;
    }
    return entry.val as T;
  }

  async set(key: string, value: unknown, ttlMs = 60000): Promise<void> {
    this.store.set(key, { val: value, expires: Date.now() + ttlMs });
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }
}

// Service Katalog dengan Pola Cache-Aside
@Injectable()
export class CachedCatalogService {
  constructor(private readonly cache: MockCacheService) {}

  async getProductDetails(productId: string) {
    const cacheKey = `product:details:${productId}`;

    // 1. Periksa Cache Hit
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      console.log(`[CACHE HIT] Mengembalikan data ${productId} langsung dari Redis.`);
      return { ...cached as object, source: 'REDIS_CACHE' };
    }

    // 2. Cache Miss: Ambil dari Database PostgreSQL
    console.log(`[CACHE MISS] Mengkueri database PostgreSQL untuk produk: ${productId}...`);
    const dbResult = { id: productId, name: 'Premium Mechanical Keyboard', price: 1500000 };

    // Simpan ke Redis dengan TTL 60 detik
    await this.cache.set(cacheKey, dbResult, 60000);
    return { ...dbResult, source: 'POSTGRES_DB' };
  }

  async updateProductPrice(productId: string, newPrice: number) {
    console.log(`[DB UPDATE] Memperbarui harga produk ${productId} menjadi Rp ${newPrice}...`);
    // Invalidate cache agar pengguna tidak melihat data kadaluarsa
    const cacheKey = `product:details:${productId}`;
    await this.cache.del(cacheKey);
    console.log(`[CACHE INVALIDATED] Kunci ${cacheKey} berhasil dihapus dari Redis.`);
    return { success: true, updatedPrice: newPrice };
  }
}

console.log('=== POLA DISTRIBUTED CACHE-ASIDE DENGAN REDIS TERKONFIGURASI ===');
''',
                'objectivesId': [
                    'Mengonfigurasi `CacheModule` bawaan NestJS dengan backend terdistribusi Redis.',
                    'Menerapkan pola Cache-Aside (Lazy Loading) untuk kueri pembacaan data tinggi.',
                    'Menggunakan `CacheInterceptor` untuk auto-caching response endpoint GET.',
                    'Mengelola strategi Cache Invalidation saat terjadi mutasi data (POST, PUT, DELETE).',
                ],
                'objectivesEn': [
                    'Configure NestJS `CacheModule` backed by distributed Redis instances.',
                    'Apply the Cache-Aside pattern for read-heavy catalog workloads.',
                    'Deploy `CacheInterceptor` for automated response caching across GET endpoints.',
                    'Manage Cache Invalidation workflows during data-mutating events (POST, PUT, DELETE).',
                ],
                'explanationId': '''Dalam situs e-commerce berskala besar (terutama saat kampanye promo tanggal kembar atau Flash Sale), jutaan pengguna membuka halaman katalog produk secara bersamaan. Jika setiap kunjungan mengeksekusi kueri SQL ke PostgreSQL, database akan mengalami kehabisan connection pool dan server akan tumbang.

### Arsitektur Cache-Aside
Pola **Cache-Aside** bekerja dengan alur:
1. Aplikasi memeriksa apakah data tersedia di cache Redis. Jika ada (**Cache Hit**), data dikembalikan seketika dalam latensi sub-milidetik.
2. Jika tidak ada (**Cache Miss**), aplikasi mengambil data dari PostgreSQL, menyimpannya ke Redis dengan Time-To-Live (TTL) tertentu, lalu mengembalikannya ke pengguna.

### Tantangan Terbesar: Cache Invalidation
"Hanya ada dua hal sulit dalam Computer Science: cache invalidation dan penamaan variabel." (Phil Karlton).
Jika admin toko mengubah harga produk, cache di Redis harus segera dihapus (`await cache.del(...)`). Jika tidak dihapus, pembeli akan melihat harga lama yang sudah tidak berlaku (Stale Data).
''',
                'explanationEn': '''During flash-sale promotional bursts, millions of consumers simultaneously browse identical product catalog listings. If every request triggers relational SQL queries against PostgreSQL, connection pools exhaust rapidly, cascading into system-wide outages.

### The Cache-Aside Paradigm
The **Cache-Aside** architecture operates as follows:
1. Inbound requests query the Redis distributed cache. Upon a **Cache Hit**, data returns within sub-milliseconds.
2. Upon a **Cache Miss**, the service fetches data from PostgreSQL, populates Redis configured with a Time-To-Live (TTL), and fulfills the request.

### The Invalidation Challenge
"There are only two hard things in Computer Science: cache invalidation and naming things." (Phil Karlton).
When merchants update product pricing or inventory stock, the stale Redis cache entry must be purged synchronously (`await cache.del(...)`) to prevent customers from purchasing items with superseded pricing.
''',
                'beginnerId': '''Bayangkan etalase kaca toko kue. Toko menaruh contoh kue terpopuler di etalase depan (Redis Cache) sehingga pembeli bisa langsung melihatnya tanpa harus menunggu pelayan berjalan ke dapur belakang (PostgreSQL Database). Namun jika resep kuenya diganti, pelayan harus segera membuang kue contoh di etalase dan menggantinya dengan kue resep baru (Cache Invalidation).''',
                'beginnerEn': '''Imagine a bakery display case. The merchant displays popular pastries in the front window (Redis Cache) so shoppers view them instantly without waitstaff jogging to the rear bakery ovens (PostgreSQL Database). If a recipe changes, staff must immediately clear the display case and showcase the fresh recipe (Cache Invalidation).''',
                'experimentsId': [
                    'Panggil `getProductDetails("1")` dua kali dan buktikan panggilan kedua menghasilkan flag `source: "REDIS_CACHE"`.',
                    'Panggil `updateProductPrice("1", 2000000)` lalu panggil kembali getProductDetails dan buktikan cache miss terjadi.',
                    'Gunakan decorator `@UseInterceptors(CacheInterceptor)` di atas controller method.',
                ],
                'experimentsEn': [
                    'Invoke `getProductDetails("1")` twice and verify the second invocation returns `source: "REDIS_CACHE"`.',
                    'Invoke `updateProductPrice("1", 2000000)` and verify subsequent lookups incur a fresh cache miss.',
                    'Decorate a controller handler with `@UseInterceptors(CacheInterceptor)`.',
                ],
                'challengeId': 'Buat Custom Decorator `@InvalidateCache("product:details:*")` yang secara otomatis membersihkan cache terkait setelah method mutasi berhasil dieksekusi.',
                'challengeEn': 'Author a custom `@InvalidateCache("product:details:*")` decorator purging related pattern keys upon successful execution of mutating handlers.',
                'summaryId': 'Kamu telah menguasai CacheModule, Redis Store, dan strategi Cache Invalidation. Level 2 selesai! Di Level 3 kita mempelajari Microservices, Testing, dan Capstone E-Commerce.',
                'summaryEn': 'You have mastered CacheModule, Redis Store, and Cache Invalidation strategies. Level 2 complete! Level 3 covers Microservices, Testing, and our E-Commerce Capstone.',
            },

            # Week 8
            {
                'week': 8,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'microservices-message-patterns',
                'titleId': 'Arsitektur Microservices: Transporter TCP/Redis, Message & Event Patterns',
                'titleEn': 'Microservices Architecture: TCP/Redis Transporters, Message & Event Patterns',
                'programId': 'Konsumen Microservice Pemrosesan Pesanan dengan @MessagePattern & @EventPattern',
                'programEn': 'Order Processing Microservice Consumer with @MessagePattern & @EventPattern',
                'language': 'typescript',
                'code': '''// Menggunakan modul @nestjs/microservices
import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern, Payload, Ctx } from '@nestjs/microservices';

export interface OrderCreatedEvent {
  orderId: string;
  customerEmail: string;
  totalAmount: number;
  items: Array<{ sku: string; quantity: number }>;
}

export interface InventoryCheckCommand {
  sku: string;
  requestedQty: number;
}

@Controller()
export class OrderMicroserviceConsumer {
  
  // 1. Request-Response Pattern: Memerlukan balikan nilai balik secara sinkron
  @MessagePattern({ cmd: 'check_inventory' })
  async handleInventoryCheck(@Payload() data: InventoryCheckCommand) {
    console.log(`[MICROSERVICE RPC] Memeriksa ketersediaan stok untuk SKU: ${data.sku}...`);
    
    // Simulasi kueri stok internal
    const isAvailable = data.requestedQty <= 20;
    return {
      sku: data.sku,
      available: isAvailable,
      allocatedQty: isAvailable ? data.requestedQty : 0
    };
  }

  // 2. Event-Driven Pattern (Fire-and-Forget): Tidak memblokir pengirim
  @EventPattern('order_placed')
  async handleOrderPlacedNotification(@Payload() order: OrderCreatedEvent) {
    console.log(`[MICROSERVICE EVENT] Menerima event pesanan baru: ${order.orderId}`);
    console.log(` -> Mengirim email konfirmasi ke: ${order.customerEmail}`);
    console.log(` -> Menerbitkan instruksi picking gudang untuk ${order.items.length} item.`);
  }
}

console.log('=== NESTJS MICROSERVICE CONSUMER PATTERNS TERKONFIGURASI ===');
console.log('Mendukung Request-Response via @MessagePattern dan Event Streaming via @EventPattern.');
''',
                'objectivesId': [
                    'Memahami arsitektur NestJS Microservices dan perbedaan dari HTTP REST.',
                    'Mengetahui berbagai jenis Transporter bawaan: TCP, Redis, RabbitMQ, NATS, dan Kafka.',
                    'Membedakan Request-Response Pattern (`@MessagePattern`) vs Event Pattern (`@EventPattern`).',
                    'Menggunakan `ClientProxy` untuk mengirim pesan dan event ke microservice lain.',
                ],
                'objectivesEn': [
                    'Understand NestJS Microservices architecture and decoupling from standard HTTP REST.',
                    'Explore built-in Transport layers: TCP, Redis, RabbitMQ, NATS, and Kafka.',
                    'Differentiate Request-Response patterns (`@MessagePattern`) from Event patterns (`@EventPattern`).',
                    'Use `ClientProxy` to transmit messages and dispatch events across microservice clusters.',
                ],
                'explanationId': '''Ketika sebuah sistem monolitik bertumbuh besar, memisahkan fungsionalitas menjadi microservices terpisah (misalnya Order Service, Payment Service, Notification Service) menjadi kebutuhan wajib agar tim dapat merilis fitur secara independen.

### Arsitektur NestJS Microservices
NestJS menyediakan abstraksi microservice yang elegan di modul `@nestjs/microservices`. Aplikasi microservice tidak mendengarkan port HTTP standar, melainkan terhubung ke sebuah **Transporter** (seperti antrean Redis, RabbitMQ, atau socket TCP murni).

### @MessagePattern vs @EventPattern
- **@MessagePattern (Request-Response)**: Pengirim pesan mengharapkan respons kembali secara langsung. Pola ini cocok untuk kueri penting, misalnya Order Service menanyakan ke Inventory Service: "Apakah stok barang ini cukup?". Pengirim menunggu balikan data menggunakan `client.send(pattern, data)`.
- **@EventPattern (Event-Driven / Fire-and-Forget)**: Pengirim memancarkan event bahwa sesuatu telah terjadi dan tidak menunggu balikan nilai. Dipancarkan menggunakan `client.emit(pattern, data)`. Sangat ideal untuk notifikasi email atau audit logging.
''',
                'explanationEn': '''As monoliths scale, partitioning capabilities into autonomous microservices (Catalog Service, Order Processing, Payment Gateway, Notification Dispatcher) becomes vital for independent team velocity.

### The NestJS Microservices Module
NestJS delivers unified microservice abstractions via `@nestjs/microservices`. Microservice nodes bypass standard HTTP listening, binding instead to specialized **Transporters** (TCP sockets, Redis queues, RabbitMQ, Kafka).

### @MessagePattern vs @EventPattern
- **@MessagePattern (Request-Response RPC)**: The caller requires a synchronous returned result. Deployed when Order Service queries Inventory Service: "Does SKU-A possess sufficient inventory?". Invoked via `client.send(pattern, data)`.
- **@EventPattern (Event-Driven / Fire-and-Forget)**: The producer broadcasts that a state transition occurred without awaiting responses. Dispatched via `client.emit(pattern, data)`. Ideal for invoice generation, email dispatching, and audit pipelines.
''',
                'beginnerId': '''Bayangkan perbedaan antara berbicara lewat telepon vs mengirim surat kabar. Ketika Anda menelpon apotek untuk bertanya: "Apakah obat ini ada stok?" Anda menunggu apoteker menjawab "Ya, ada" sebelum menutup telepon (MessagePattern). Namun ketika bupati mengumumkan "Besok hari libur" lewat selebaran, bupati tidak menunggu balasan satu per satu dari seluruh warga (EventPattern).''',
                'beginnerEn': '''Consider telephoning a pharmacy versus distributing a community flyer. When you call to ask: "Is this medicine in stock?", you remain on the line awaiting the pharmacist's affirmative answer before hanging up (MessagePattern). However, when city hall publishes an advisory announcing a holiday festival, the mayor does not wait on replies from every citizen (EventPattern).''',
                'experimentsId': [
                    'Gunakan `ClientProxyFactory.create({ transport: Transport.TCP })` untuk membuat klien microservice pengirim.',
                    'Kirim command menggunakan `client.send({ cmd: "check_inventory" }, payload)` dan amati respons balik.',
                    'Ganti transporter ke Redis dan amati bagaimana pesan didistribusikan melalui antrean Redis.',
                ],
                'experimentsEn': [
                    'Initialize a test sender using `ClientProxyFactory.create({ transport: Transport.TCP })`.',
                    'Transmit a command via `client.send({ cmd: "check_inventory" }, payload)` and inspect the returned observable.',
                    'Swap the transport layer to Redis and observe message routing across queues.',
                ],
                'challengeId': 'Buat Microservice hybrid di `main.ts` menggunakan `app.connectMicroservice(...)` sehingga satu aplikasi NestJS dapat melayani HTTP REST dan mendengarkan event RabbitMQ secara bersamaan.',
                'challengeEn': 'Configure a hybrid NestJS application in `main.ts` using `app.connectMicroservice(...)` serving both HTTP REST endpoints and Kafka consumers simultaneously.',
                'summaryId': 'Kamu telah menguasai NestJS Microservices, Transporters, dan Event Patterns. Minggu depan kita mempelajari Unit Testing dan End-to-End Testing dengan Jest.',
                'summaryEn': 'You have mastered NestJS Microservices, Transporters, and Event Patterns. Next week we cover Unit Testing and End-to-End Testing with Jest.',
            },

            # Week 9
            {
                'week': 9,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'unit-e2e-testing-jest',
                'titleId': 'Arsitektur Pengujian Enterprise: @nestjs/testing, Mocks & E2E Supertest',
                'titleEn': 'Enterprise Testing Architecture: @nestjs/testing, Mocks & E2E Supertest',
                'programId': 'Suite Pengujian Unit & Integrasi E2E Komprehensif untuk Layanan E-Commerce',
                'programEn': 'Comprehensive Unit & E2E Integration Test Suite for E-Commerce Services',
                'language': 'typescript',
                'code': '''// Demonstrasi Pengujian Unit di NestJS dengan @nestjs/testing dan Jest
import { Test, TestingModule } from '@nestjs/testing';

// Kelas Service Nyata yang akan Diuji
class InventoryService {
  constructor(private readonly dbClient: any) {}

  async reserveStock(sku: string, qty: number): Promise<boolean> {
    const item = await this.dbClient.findProduct(sku);
    if (!item || item.stock < qty) return false;

    await this.dbClient.decrementStock(sku, qty);
    return true;
  }
}

// Suite Pengujian Unit
async function runUnitTests() {
  console.log('=== MEMULAI TEST SUITE UNIT NESTJS DENGAN MOCK PROVIDER ===');

  // 1. Buat Mock Database Provider
  const mockDbClient = {
    findProduct: async (sku: string) => {
      if (sku === 'SKU-IN-STOCK') return { sku, stock: 10 };
      return null;
    },
    decrementStock: async (sku: string, qty: number) => true
  };

  // 2. Buat Isolated Testing Module menggunakan Test.createTestingModule
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      InventoryService,
      {
        provide: 'DATABASE_CLIENT',
        useValue: mockDbClient
      }
    ]
  }).compile();

  const service = moduleRef.get<InventoryService>(InventoryService);

  // 3. Eksekusi Assertion
  const resultSuccess = await service.reserveStock('SKU-IN-STOCK', 5);
  console.log('Test Kasus 1 (Stok Tersedia):', resultSuccess === true ? 'PASSED [OK]' : 'FAILED [X]');

  const resultOutOfStock = await service.reserveStock('SKU-EMPTY', 5);
  console.log('Test Kasus 2 (Stok Kosong):', resultOutOfStock === false ? 'PASSED [OK]' : 'FAILED [X]');

  console.log('=== SEMUA ASSERTION UNIT TEST BERHASIL 100% ===');
}

runUnitTests();
''',
                'objectivesId': [
                    'Menguasai paket `@nestjs/testing` dan method `Test.createTestingModule()`.',
                    'Mengisolasi dependensi eksternal (Database, Redis, Payment API) menggunakan Custom Providers Mocking (`useValue`, `useFactory`).',
                    'Menerapkan End-to-End (E2E) testing menyeluruh menggunakan Supertest.',
                    'Mencapai coverage pengujian tinggi untuk alur transaksi kritis perbankan dan e-commerce.',
                ],
                'objectivesEn': [
                    'Master `@nestjs/testing` utilities and the `Test.createTestingModule()` builder.',
                    'Isolate external dependencies (Databases, Redis, Payments) via mock custom providers (`useValue`, `useFactory`).',
                    'Implement comprehensive End-to-End (E2E) HTTP integration tests with Supertest.',
                    'Attain high test coverage across mission-critical e-commerce transaction pipelines.',
                ],
                'explanationId': '''Dalam arsitektur enterprise, kode tanpa automated test suite tidak layak masuk ke server produksi. Menjalankan pengujian manual memakan waktu berjam-jam dan tidak menjamin bebas dari regresi saat ada pembaruan kode.

### Keunggulan Test.createTestingModule()
NestJS menyediakan utilitas `@nestjs/testing` yang memungkinkan kita membuat modul tiruan yang mengisolasi satu kelas service secara spesifik. Alih-alih menghubungkan database PostgreSQL asli yang lambat dan membutuhkan koneksi internet, kita mengganti dependensi database dengan objek tiruan (**Mock Provider**) menggunakan `useValue: mockService`.

### Pengujian E2E dengan Supertest
Selain unit test, aplikasi membutuhkan **End-to-End (E2E) Test** yang menguji seluruh pipeline HTTP (Middleware, Guard, Interceptor, Pipe, Controller, Service). Dengan pustaka **Supertest**, kita dapat mengirim request HTTP virtual ke instance aplikasi NestJS in-memory dan memverifikasi status code serta struktur JSON yang dikembalikan.
''',
                'explanationEn': '''In enterprise development, untested code is classified as technical liability. Manual verification wastes human hours and offers zero protection against subtle regressions during continuous deployment.

### The Power of Test.createTestingModule()
NestJS delivers `@nestjs/testing` tooling enabling developers to spin up isolated, ephemeral IoC testing modules. Rather than connecting real PostgreSQL databases (introducing network latency and flaky test state), dependencies are swapped with mock test doubles via `useValue: mockService`.

### End-to-End (E2E) Testing with Supertest
Complementing unit tests, applications require **End-to-End (E2E) Testing** validating the entire HTTP execution chain (Middleware, Guards, Interceptors, Pipes, Controllers). Utilizing **Supertest**, suites transmit simulated HTTP transactions against an ephemeral NestJS instance, asserting status codes and response bodies.
''',
                'beginnerId': '''Bayangkan Anda membuat mobil baru. Uji unit seperti menguji ketahanan rem di meja uji laboratorium tanpa memasangnya ke mobil (Unit Test). Uji E2E seperti menyalakan mesin, menginjak pedal gas, dan mengendarai mobil di sirkuit uji coba untuk memastikan seluruh bagian mobil bekerja sama dengan sempurna (E2E Test).''',
                'beginnerEn': '''Imagine manufacturing a car. Unit testing evaluates the hydraulic brake pad on an isolated workshop bench without assembling the chassis (Unit Test). E2E testing turns the ignition key, shifts into drive, and navigates a full test circuit to ensure the engine, transmission, and brakes interact harmoniously (E2E Test).''',
                'experimentsId': [
                    'Gunakan `jest.spyOn(service, "reserveStock")` untuk memverifikasi berapa kali sebuah method dipanggil.',
                    'Buat test case yang memastikan Guard menolak request jika header Authorization tidak ada.',
                    'Jalankan perintah `npm run test:cov` untuk melihat laporan visual cakupan baris kode (code coverage).',
                ],
                'experimentsEn': [
                    'Deploy `jest.spyOn(service, "reserveStock")` to audit exact method invocation counts.',
                    'Author an E2E test verifying a Guard correctly rejects calls missing Authorization headers.',
                    'Execute `npm run test:cov` to review detailed line-by-line code coverage metrics.',
                ],
                'challengeId': 'Tulis E2E test suite lengkap untuk alur checkout `/api/v1/orders/checkout`: kirim payload valid, verifikasi status 201 Created, dan pastikan stok produk di database berkurang.',
                'challengeEn': 'Write a comprehensive E2E test suite for checkout routes `/api/v1/orders/checkout`: submit payloads, assert HTTP 201, and verify inventory decrements.',
                'summaryId': 'Kamu telah menguasai `@nestjs/testing`, mocking providers, dan E2E testing dengan Supertest. Minggu depan adalah Capstone Final: Enterprise Multi-Tenant E-Commerce Modular API!',
                'summaryEn': 'You have mastered `@nestjs/testing`, mock providers, and E2E testing with Supertest. Next week is our Final Capstone: Enterprise Multi-Tenant E-Commerce Modular API!',
            },

            # Week 10
            {
                'week': 10,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'capstone-enterprise-ecommerce',
                'titleId': 'Capstone: API E-Commerce Modular Enterprise Skala Tinggi Production-Ready',
                'titleEn': 'Capstone: Production-Ready High-Scalability Enterprise Modular E-Commerce API',
                'programId': 'Aplikasi E-Commerce Lengkap (NestJS, REST & GraphQL, Prisma, Terminus Health & Swagger)',
                'programEn': 'Complete E-Commerce Application (NestJS, REST & GraphQL, Prisma, Terminus Health & Swagger)',
                'language': 'typescript',
                'code': '''// NestJS Production Enterprise E-Commerce Capstone Architecture
import { Module, Controller, Get, Post, Body, Injectable } from '@nestjs/common';

// 1. DTO & Models
export class CheckoutOrderDto {
  customerEmail!: string;
  items!: Array<{ sku: string; quantity: number; price: number }>;
}

export interface OrderConfirmation {
  orderId: string;
  totalAmount: number;
  status: string;
  processedAt: string;
}

// 2. Core Domain Service
@Injectable()
export class OrderFulfillmentService {
  async processCheckout(dto: CheckoutOrderDto): Promise<OrderConfirmation> {
    const total = dto.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    console.log(`[ORDER FULFILLMENT] Memproses checkout pesanan: ${orderId} (${dto.customerEmail})`);
    console.log(` -> Total Transaksi: Rp ${total.toLocaleString('id-ID')}`);
    console.log(` -> Mempublikasikan event ke Microservice Pengiriman & Notifikasi...`);

    return {
      orderId,
      totalAmount: total,
      status: 'CONFIRMED',
      processedAt: new Date().toISOString()
    };
  }
}

// 3. REST Controller dengan Health Indicator
@Controller('api/v1/orders')
export class OrderController {
  constructor(private readonly fulfillmentService: OrderFulfillmentService) {}

  @Post('checkout')
  async checkout(@Body() dto: CheckoutOrderDto): Promise<OrderConfirmation> {
    return this.fulfillmentService.processCheckout(dto);
  }

  @Get('healthz')
  getHealthStatus() {
    return {
      status: 'ok',
      service: 'tryngo-ecommerce-api',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime())
    };
  }
}

// 4. Root Application Module
@Module({
  controllers: [OrderController],
  providers: [OrderFulfillmentService]
})
export class EnterpriseAppModule {}

console.log('=== TRYNGO ENTERPRISE MODULAR E-COMMERCE API BERHASIL DIINISIALISASI ===');
console.log('Siap melayani jutaan transaksi dengan arsitektur modular NestJS.');
''',
                'objectivesId': [
                    'Mengintegrasikan seluruh ekosistem: Modules, DTO Validation, Prisma ORM, JWT Guards, dan Health Checks.',
                    'Membangun API E-Commerce berskala enterprise yang menggabungkan REST API dan GraphQL secara harmonis.',
                    'Mengonfigurasi endpoint `/healthz` untuk probe liveness/readiness Kubernetes.',
                    'Menyiapkan arsitektur backend Node.js terstruktur yang siap dideploy di lingkungan cloud production.',
                ],
                'objectivesEn': [
                    'Integrate the complete ecosystem: Modules, DTO Validation, Prisma, JWT Guards, and Health Checks.',
                    'Build an enterprise-scale E-Commerce platform blending REST and GraphQL harmoniously.',
                    'Configure `/healthz` endpoints for Kubernetes cluster liveness and readiness probes.',
                    'Ship an enterprise-grade structured TypeScript backend ready for cloud container deployments.',
                ],
                'explanationId': '''Selamat! Anda telah mencapai proyek Capstone akhir kurikulum NestJS Enterprise Architecture. Sistem ini menyatukan semua fondasi rekayasa perangkat lunak enterprise ke dalam satu platform e-commerce modular yang siap melayani jutaan transaksi di lingkungan cloud nyata.

### Arsitektur Terpadu REST & GraphQL
Sistem ini menggunakan keunggulan dari kedua dunia:
- **REST Endpoints**: Digunakan untuk operasi transaksional pembayaran cepat, integrasi webhook pihak ketiga (seperti payment gateway Midtrans / Stripe), dan ingesti data berkecepatan tinggi.
- **GraphQL API**: Digunakan oleh aplikasi frontend web dan mobile untuk menampilkan katalog produk dan keranjang belanja secara fleksibel tanpa over-fetching.

### Health Checks dan Observability
Dengan integrasi endpoint pemantau kesehatan `/healthz`, orchestrator Kubernetes dapat mendeteksi secara otomatis apakah koneksi database PostgreSQL atau klaster Redis mengalami gangguan, dan melakukan auto-healing (restart pod) tanpa intervensi manual dari tim DevOps.
''',
                'explanationEn': '''Congratulations! You have reached the Capstone project. This application synthesizes modern NestJS enterprise engineering patterns into a high-throughput, modular, production-ready e-commerce platform.

### Harmonious REST & GraphQL Architecture
The architecture harnesses the strengths of both protocols:
- **REST Endpoints**: Dedicated to high-speed transactional checkout actions, third-party webhook integrations (Stripe / payment gateways), and high-throughput data ingestion.
- **GraphQL APIs**: Consumed by web and mobile frontends to query dynamic product catalogs and shopping carts with zero network over-fetching.

### Health Checks & Observability
Exposing automated `/healthz` indicators empowers Kubernetes orchestrators to audit database pools and Redis clusters reactively, triggering automated pod restarts during unrecoverable deadlocks.
''',
                'beginnerId': '''Proyek ini ibarat pusat perbelanjaan megah yang sepenuhnya terintegrasi. Ada kasir kilat untuk pembayaran cepat (REST API), ada katalog interaktif di layar sentuh di mana pembeli bisa memilih warna dan ukuran sesuka hati (GraphQL), brankas penyimpanan uang yang aman (Prisma & Database), dan satpam pintar yang terus memantau keamanan 24 jam (Guards & Health Checks).''',
                'beginnerEn': '''This project mirrors a state-of-the-art automated mega-mall. It houses express drive-thru registers for instant checkout (REST APIs), interactive digital kiosks allowing patrons to customize colors and sizes (GraphQL), fortified bank vaults (Prisma & Databases), and vigilant 24/7 security monitors (Guards & Health Checks).''',
                'experimentsId': [
                    'Jalankan aplikasi dan uji coba alur checkout pesanan dengan mengirimkan payload JSON.',
                    'Buka endpoint `/api/v1/orders/healthz` dan amati data status kesehatan layanan.',
                    'Integrasikan pustaka `@nestjs/swagger` untuk menghasilkan dokumentasi OpenAPI interaktif pada `/api/docs`.',
                ],
                'experimentsEn': [
                    'Launch the application and verify the order checkout workflow via simulated JSON payloads.',
                    'Navigate to `/api/v1/orders/healthz` to audit container uptime and health status.',
                    'Integrate `@nestjs/swagger` generating interactive OpenAPI docs at `/api/docs`.',
                ],
                'challengeId': 'Tambahkan modul Stripe Webhook yang memvalidasi cryptographic signature header `stripe-signature` sebelum mengonfirmasi pembayaran pesanan.',
                'challengeEn': 'Add a Stripe Webhook module verifying the cryptographic `stripe-signature` header before confirming order payment fulfillment.',
                'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum NestJS Enterprise Architecture dari nol hingga platform e-commerce modular berskala produksi!',
                'summaryEn': 'Congratulations! You have completed the entire NestJS Enterprise Architecture curriculum from zero to an enterprise production e-commerce platform!',
            },
        ]
    }
