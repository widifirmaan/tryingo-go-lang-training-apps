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

Kamu telah menguasai Passport JWT, RolesGuard, dan Custom Decorators. Minggu depan kita membangun GraphQL API Code-First dengan NestJS.
