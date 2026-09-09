# Guards & Auth — Satpam KTP NestJS

> **Kategori:** NestJS | **Level:** Menengah | **Minggu 6:** Guards & Auth
> **Prasyarat:** Minggu 5 — **Pipes & Validation**.

## Tujuan Pembelajaran

- `CanActivate` + `@UseGuards(AuthGuard)` satpam per pintu + JWT `sign/verify` KTP (sumber: docs.nestjs.com/security/authentication)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa guard, `/admin/hapus-semua` dibuka siapa saja. Dengan `@UseGuards` 1 baris per pintu + JWT, aman. Beda pintu beda guard (admin vs kasir).

---

## Program: KTP Warung NestJS

```bash
npm install @nestjs/jwt
```

```typescript
// auth.guard.ts — satpam (1x, pakai di mana-mana)
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    try {
      req.user = await this.jwt.verifyAsync(token); // KTP sah?
      return true;
    } catch {
      throw new UnauthorizedException("Login dulu!");
    }
  }
}
```

```typescript
// auth.controller.ts — loket KTP
import { JwtService } from "@nestjs/jwt";

@Post("login")
login(@Body() b: any) {
  if (b.email === "admin@warung.com" && b.password === "123") {
    return { token: this.jwt.sign({ email: b.email }) };
  }
  throw new UnauthorizedException("Salah");
}

// produk.controller.ts — pintu dijaga
@UseGuards(AuthGuard)
@Post()
tambah(@Body() dto: BuatProdukDto) { /* ... */ }

@Get()  // bebas (tanpa guard)
semua() { /* ... */ }
```

Test: `POST /login` → token → `POST /produk` + header `Authorization: Bearer TOKEN` → lolos. Tanpa → 401.

---

## Konsep Kunci

### `CanActivate` = Kartu Satpam
`canActivate()` return `true` (lolos) / throw (tendang).

### `@UseGuards` = Tempel di Pintu
Per method (1 pintu) atau controller (semua pintu).

### JWT = Gelang
`sign` buat, `verify` cek. Rahasia di env!

---

## Penjelasan untuk Pemula

### Analogi: Gelang Konser + Satpam
- **login = tukar tiket jadi gelang (JWT)**, **Guard = satpam cek gelang** tiap pintu VIP.

### Langkah 0 — Siapkan Device
- Sama W1 + `npm install @nestjs/jwt` + `JwtModule.register({ secret: "rahasia" })`.

### Cara Komputer Membaca
1. `POST /produk` + header → Guard `verify` → `req.user` isi → controller.
2. Tanpa header → `UnauthorizedException` → 401.

### 3 Istilah Wajib
1. **Guard/CanActivate**: satpam/bisa-masuk?
2. **JWT/Bearer**: gelang/bawa

---

## Eksperimen

- **Hijau:** Tanpa header → 401?
- **Kuning:** Token palsu → 401?
- **Merah:** Guard di `GET` juga → daftar butuh login (jualan sepi)? Pilih pintu!

---

### Bonus: Middleware + Urutan Pipa Nest (bab Middleware docs.nestjs.com!)

Request lewat PIPA berurutan: **Middleware → Guard → Interceptor → Pipe → Controller**. Middleware = satpam paling depan (log semua request!).

```typescript
// logger.middleware.ts — catat tiap tamu
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`${req.method} ${req.url} — ${new Date().toLocaleTimeString()}`);
    next(); // WAJIB teruskan! lupa = request gantung selamanya!
  }
}

// app.module.ts — pasang ke pintu
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";

@Module({ /* ... */ })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("produk"); // hanya /produk
    // .forRoutes("*") = semua pintu
  }
}
```

---

## Tantangan

**Restoran Ber-KTP:** `login` + `GET` bebas + `POST/DELETE` jaga + `curl` 3 test (bebas/tanpa/palsu/asli).

---

## Glosarium Mini

- **Guard/JWT/UseGuards**: satpam/gelang/tempel

---

## Ringkasan

Minggu 6 dari 12: **Satpam KTP** (Level: Menengah). Pintu terjaga. Minggu depan: **ORM Lanjutan**.
