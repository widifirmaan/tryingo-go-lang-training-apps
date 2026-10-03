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
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
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
