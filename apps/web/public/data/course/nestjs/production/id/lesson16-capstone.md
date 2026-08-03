# Capstone: Notes API Terlindungi

> NestJS | Produksi & Capstone | Pelajaran 16

## Tujuan Pembelajaran

- Menggabungkan SEMUA konsep track dalam satu aplikasi
- Membuat API dengan autentikasi JWT end-to-end
- Menjamin data per-user lewat filter userId dari token
- Menutup proyek: dokumentasi, test, dan deployment

---

## Program: Capstone: Notes API Terlindungi

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CatatanModule } from './catatan/catatan.module';

// Root module capstone: SEMUA konsep track berkumpul di sini
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CatatanModule,
  ],
})
export class AppModule {}
```

---

## Penjelasan

## Capstone: Mengapa Semua Pelajaran Menjadi Satu
Notes API ini adalah NestJS lengkap: module (batas domain) → controller (route) → service (logika) → DTO + ValidationPipe (input bersih) → AuthModule + JwtAuthGuard (identitas) → Swagger (dokumentasi) → ConfigModule (env) → siap di-test dan di-Docker (pelajaran 13-15). Jika Anda bisa menjelaskan setiap file di proyek ini tanpa membuka catatan, Anda menguasai track.
## Data Per-User: Filter yang Menyelamatkan Privasi
Semua method service menerima userId dari token (req.user.sub) dan memfilter data dengannya. Catatan user A TIDAK mungkin terlihat user B - bukan karena UI menyembunyikannya, tapi karena QUERY-nya sendiri menolak. Ini perbedaan keamanan nyata vs keamanan tampilan: aturan selalu di backend, frontend hanya menampilkan.
## Autentikasi: Satu Gerbang untuk Semua Route
@UseGuards(JwtAuthGuard) di level controller: tidak ada route catatan yang bisa diakses tanpa token valid. Login → token → header Authorization: Bearer ... → req.user. Kombinasi dengan Swagger @ApiBearerAuth membuat dokumentasi menjelaskan cara memakai token. Secret dari env (JwtModule.registerAsync) - bukan hardcode.
## Menutup Proyek Seperti Profesional
Penyelesaian yang membedakan lulusan bootcamp: (1) README - cara run, env vars, contoh curl, daftar endpoint, (2) unit + e2e test minimal untuk alur auth & CRUD, (3) deployment ke Render/Railway/Fly + database managed, (4) Dockerfile multi-stage. Satu proyek selesai dan ter-deploy bernilai lebih dari lima proyek setengah jadi.

---

## Eksperimen

1. **Capstone: Mengapa Semua Pelajaran Menjadi Satu**
2. **Data Per-User: Filter yang Menyelamatkan Privasi**
3. **Autentikasi: Satu Gerbang untuk Semua Route**
4. **Menutup Proyek Seperti Profesional**

---

## Tantangan

Selesaikan capstone ke level produksi: (1) tambah e2e test lengkap: login → buat catatan → baca → tandai selesai → hapus (alur dengan token), dan uji akses tanpa token (401), (2) ganti user in-memory dengan TypeORM + database PostgreSQL di Docker (compose api + db), password di-hash bcrypt, (3) tulis README profesional + contoh curl untuk tiap endpoint, (4) deploy ke platform gratis (Render/Railway) dan bagikan URL-nya.

---

## Ringkasan

Capstone merangkum: module → controller → service → DTO → JWT → Swagger → env. Data per-user di level query. Satu proyek selesai > lima setengah jadi. Selamat - Anda NestJS Developer!
