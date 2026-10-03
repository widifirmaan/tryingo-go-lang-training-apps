# HTTP Pipeline: Global Exception Filters & Response Interceptors

> **Kategori:** NestJS Enterprise Architecture | **Level:** Pemula | **Minggu 4:** HTTP Pipeline: Global Exception Filters & Response Interceptors
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai Exception Filters (`@Catch()`) untuk mengontrol respons error HTTP secara terpusat.
- Memahami NestJS Interceptors menggunakan pustaka reaktif RxJS (`Observable`, `map`, `tap`).
- Menyeragamkan struktur respons sukses API (`success: true, data: ...`) di seluruh controller.
- Menerapkan format error terstandarisasi RFC 7807 Problem Details.

---

## Program: Transformasi Respons Standar & Penanganan Error RFC 7807 Terpusat

```typescript
import {
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
```

---

## Konsep Kunci

Salah satu tanda API yang buruk adalah inkonsistensi: endpoint A mengembalikan array langsung, endpoint B mengembalikan objek pembungkus `{ result: ... }`, dan jika terjadi error, endpoint C mengembalikan string teks mentah sedangkan endpoint D mengembalikan stack trace HTML.

### Response Interceptors dengan RxJS
NestJS mengintegrasikan **RxJS** pada layer interceptor. Dengan mengimplementasikan `NestInterceptor`, method `intercept()` dapat memodifikasi aliran data sebelum method controller dijalankan atau setelah data dikembalikan. Operator `.pipe(map(...))` membungkus seluruh data keluaran controller menjadi amplop terstandarisasi `{ success: true, statusCode: 200, data: ..., timestamp: ... }`.

### Global Exception Filters
Ketika controller atau service melempar exception (misalnya `throw new NotFoundException("Produk tidak ada")`), alur eksekusi ditangkap oleh **Exception Filter**. Melalui `@Catch()`, kita mengubah seluruh error menjadi format JSON standar RFC 7807, mencatat log audit, dan mencegah informasi sensitif database bocor ke pengguna luar saat terjadi error internal server (500).


---

---

## Penjelasan untuk Pemula

Bayangkan amplop surat resmi perusahaan ekspedisi (Interceptor). Apapun isi barang di dalamnya (laptop, baju, atau buku), bagian luar paket selalu dibungkus kardus cokelat rapi dengan label barcode resmi perusahaan. Dan jika paket rusak atau alamat salah (Exception Filter), surat penolakan resmi bersurat jalan yang rapi langsung dicetak untuk pengirim.

## Eksperimen

- Lemparkan `throw new UnauthorizedException("Akses ditolak")` dan amati format JSON yang dihasilkan Exception Filter.
- Gunakan operator RxJS `tap()` di dalam Interceptor untuk mencatat durasi waktu eksekusi request dalam milidetik.
- Daftarkan filter secara global di `main.ts` menggunakan `app.useGlobalFilters(new GlobalHttpExceptionFilter())`.

---

## Tantangan

Buat Logging Interceptor yang secara otomatis menyembunyikan (masking) field sensitif seperti `password` dan `creditCard` dari body request sebelum dicatat ke log server.

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

Kamu telah menguasai Exception Filters, Interceptors RxJS, dan standarisasi API. Level 1 selesai! Di Level 2 kita mempelajari Passport JWT Auth, GraphQL, dan Redis Caching.
