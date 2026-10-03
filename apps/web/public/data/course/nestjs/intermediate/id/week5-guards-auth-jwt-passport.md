# Keamanan Enterprise: Passport JWT, Auth Guards & Role-Based Access Control

> **Kategori:** NestJS Enterprise Architecture | **Level:** Menengah | **Minggu 5:** Keamanan Enterprise: Passport JWT, Auth Guards & Role-Based Access Control
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami siklus otentikasi NestJS menggunakan `@nestjs/passport` dan `@nestjs/jwt`.
- Menggunakan `AuthGuard("jwt")` untuk melindungi endpoint dari request tanpa token valid.
- Membangun sistem Role-Based Access Control (RBAC) menggunakan `Reflector` dan Custom Decorator `@Roles`.
- Membuat Custom Parameter Decorator `@CurrentUser()` untuk mengambil identitas user secara type-safe.

---

## Program: Sistem Otorisasi Multi-Peran E-Commerce dengan Guards & Custom Decorators

```typescript
// Menggunakan @nestjs/passport, @nestjs/jwt, dan passport-jwt
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
```

---

## Konsep Kunci

Otorisasi dan autentikasi dalam arsitektur enterprise e-commerce harus modular dan dapat diterapkan secara deklaratif di atas route handler tanpa mencemari logika bisnis service.

### Peran Guards di NestJS
**Guards** mengimplementasikan interface `CanActivate`. Guard dieksekusi setelah semua middleware selesai, namun **sebelum** interceptor, pipe, dan route handler dipanggil. Jika method `canActivate()` mengembalikan `false` atau melempar exception, NestJS langsung menolak request tersebut.

### Metadata Reflector dan @Roles Decorator
Alih-alih menulis kode pengecekan peran di setiap controller, kita membuat custom decorator `@Roles(Role.ADMIN, Role.MERCHANT)`. Nilai peran disimpan di metadata handler menggunakan `SetMetadata`. Di dalam `RolesGuard`, kita menggunakan kelas bawaan **Reflector** untuk membaca metadata tersebut dan membandingkannya dengan array peran milik user yang ada di payload token JWT.

### Custom Parameter Decorator @CurrentUser
Dengan `createParamDecorator`, kita dapat menulis `@CurrentUser() user: UserEntity` langsung di parameter controller method. Pendekatan ini membuat controller sangat bersih dan mudah diuji dengan unit testing.


---

---

## Penjelasan untuk Pemula

Bayangkan sebuah pesta eksklusif di hotel berbintang. Di pintu masuk utama ada satpam pemeriksa tiket (AuthGuard) yang memastikan Anda membawa gelang tiket asli. Namun untuk masuk ke ruang lounge eksekutif VIP (RolesGuard), satpam kedua memeriksa apakah gelang tiket Anda berwarna emas (Admin/Merchant).

## Eksperimen

- Uji coba akses endpoint bertanda `@Roles(Role.ADMIN)` menggunakan token milik user biasa berkategori CUSTOMER.
- Buat guard komposit yang menggabungkan verifikasi JWT dan pengecekan apakah akun user sedang dibekukan (isSuspended).
- Daftarkan RolesGuard secara global menggunakan `APP_GUARD` di modul utama.

---

## Tantangan

Implementasikan sistem Permission-Based Access Control (PBAC) di mana user memiliki daftar izin granular seperti `products:write`, `orders:cancel`, dan validasi izin tersebut menggunakan Guard.

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

Kamu telah menguasai Passport JWT, RolesGuard, dan Custom Decorators. Minggu depan kita membangun GraphQL API Code-First dengan NestJS.
