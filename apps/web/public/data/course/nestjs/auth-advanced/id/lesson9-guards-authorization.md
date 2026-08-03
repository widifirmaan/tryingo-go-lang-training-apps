# Guards & Authorization

> NestJS | Auth & Lanjutan | Pelajaran 9

## Tujuan Pembelajaran

- Menjelaskan peran guard: izin akses sebelum handler
- Menulis guard custom dengan Reflector (metadata @Roles)
- Membuat decorator @Roles untuk menandai route
- Memahami urutan eksekusi: middleware, guard, pipe, handler

---

## Program: Guards & Authorization

```ts
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

// Guard: memutuskan IZIN akses SEBELUM handler dijalankan
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Baca metadata @Roles dari handler (dan controller)
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // tidak ada aturan peran -> semua boleh akses
    }
    const request = context.switchToHttp().getRequest();
    // DEMO: peran user dari header X-User-Role.
    // Di aplikasi nyata: diambil dari token JWT (pelajaran 10).
    const userRole: string | undefined = request.headers['x-user-role'];
    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException(
        'Akses ditolak: butuh peran ' + requiredRoles.join(', '),
      );
    }
    return true;
  }
}
```

---

## Penjelasan

## Guard: Penjaga Gerbang
Guard menentukan SIAPA yang boleh menjalankan route - berjalan SETELAH middleware, SEBELUM pipe/handler. Middleware buta terhadap konteks handler (tidak tahu @Roles apa), sedangkan guard punya akses ke metadata handler lewat Reflector. Ini aturan main: middleware untuk kepentingan HTTP global (log, CORS), guard untuk keputusan otorisasi yang spesifik per route.
## Reflector + @Roles: Metadata yang Dibaca Guard
@Roles('admin') hanyalah SetMetadata - menempelkan data ke handler tanpa mengubah perilakunya. RolesGuard membaca metadata itu (getAllAndOverride) lalu membandingkan dengan peran user. Logika izin tersentralisasi di guard, bukan tersebar di setiap controller - tambah peran baru = ubah satu tempat.
## @UseGuards: Level Pemasangan
Controller level: melindungi semua route dalam controller (di contoh: @UseGuards(RolesGuard) di atas class). Method level: hanya route tertentu. Global: via APP_GUARD provider. Urutan pertahanan: akses ditolak di gerbang pertama yang ketat, pesan 403 (Forbidden) jika user terautentikasi tapi tidak berhak, 401 jika belum login (pelajaran 10).
## Alur Request yang Utuh
Middleware (HTTP raw) → Guard (izin akses) → Interceptor (sebelum handler) → Pipe (validasi) → Handler → Interceptor (setelah) → Exception Filter. Menghafal urutan ini penting: tiap lapisan punya pekerjaan dan level akses yang berbeda.

---

## Eksperimen

1. **Guard: Penjaga Gerbang**
2. **Reflector + @Roles: Metadata yang Dibaca Guard**
3. **@UseGuards: Level Pemasangan**
4. **Alur Request yang Utuh**

---

## Tantangan

Perkuat sistem peran: (1) tambah decorator @Public() dan buat PublicGuard/atur guard agar mengizinkan route bertanda @Public tanpa cek peran, (2) tambah peran "editor" yang boleh mengubah (PUT) tapi tidak menghapus, (3) route baru GET /catatan/:id/detail lengkap khusus "admin", (4) uji dengan header X-User-Role: siswa, editor, admin - catat status HTTP tiap kombinasi.

---

## Ringkasan

Guard = gerbang izin sebelum handler. Reflector membaca metadata @Roles. @UseGuards di controller/method/global. 403 vs 401. Lanjut: autentikasi JWT.
