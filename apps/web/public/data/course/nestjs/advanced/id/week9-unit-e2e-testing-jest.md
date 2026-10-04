# Arsitektur Pengujian Enterprise: @nestjs/testing, Mocks & E2E Supertest

> **Kategori:** NestJS Enterprise Architecture | **Level:** Lanjutan | **Minggu 9:** Arsitektur Pengujian Enterprise: @nestjs/testing, Mocks & E2E Supertest
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai paket `@nestjs/testing` dan method `Test.createTestingModule()`.
- Mengisolasi dependensi eksternal (Database, Redis, Payment API) menggunakan Custom Providers Mocking (`useValue`, `useFactory`).
- Menerapkan End-to-End (E2E) testing menyeluruh menggunakan Supertest.
- Mencapai coverage pengujian tinggi untuk alur transaksi kritis perbankan dan e-commerce.

---

## Program: Suite Pengujian Unit & Integrasi E2E Komprehensif untuk Layanan E-Commerce

```typescript
// Demonstrasi Pengujian Unit di NestJS dengan @nestjs/testing dan Jest
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
```

---

## Konsep Kunci

Dalam arsitektur enterprise, kode tanpa automated test suite tidak layak masuk ke server produksi. Menjalankan pengujian manual memakan waktu berjam-jam dan tidak menjamin bebas dari regresi saat ada pembaruan kode.

### Keunggulan Test.createTestingModule()
NestJS menyediakan utilitas `@nestjs/testing` yang memungkinkan kita membuat modul tiruan yang mengisolasi satu kelas service secara spesifik. Alih-alih menghubungkan database PostgreSQL asli yang lambat dan membutuhkan koneksi internet, kita mengganti dependensi database dengan objek tiruan (**Mock Provider**) menggunakan `useValue: mockService`.

### Pengujian E2E dengan Supertest
Selain unit test, aplikasi membutuhkan **End-to-End (E2E) Test** yang menguji seluruh pipeline HTTP (Middleware, Guard, Interceptor, Pipe, Controller, Service). Dengan pustaka **Supertest**, kita dapat mengirim request HTTP virtual ke instance aplikasi NestJS in-memory dan memverifikasi status code serta struktur JSON yang dikembalikan.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda membuat mobil baru. Uji unit seperti menguji ketahanan rem di meja uji laboratorium tanpa memasangnya ke mobil (Unit Test). Uji E2E seperti menyalakan mesin, menginjak pedal gas, dan mengendarai mobil di sirkuit uji coba untuk memastikan seluruh bagian mobil bekerja sama dengan sempurna (E2E Test).

## Eksperimen

- Gunakan `jest.spyOn(service, "reserveStock")` untuk memverifikasi berapa kali sebuah method dipanggil.
- Buat test case yang memastikan Guard menolak request jika header Authorization tidak ada.
- Jalankan perintah `npm run test:cov` untuk melihat laporan visual cakupan baris kode (code coverage).

---

## Tantangan

Tulis E2E test suite lengkap untuk alur checkout `/api/v1/orders/checkout`: kirim payload valid, verifikasi status 201 Created, dan pastikan stok produk di database berkurang.

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

Kamu telah menguasai `@nestjs/testing`, mocking providers, dan E2E testing dengan Supertest. Minggu depan adalah Capstone Final: Enterprise Multi-Tenant E-Commerce Modular API!
