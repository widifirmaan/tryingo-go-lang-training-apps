# Pengenalan NestJS: Arsitektur Enterprise

> NestJS | Fondasi Nest | Pelajaran 1

## Tujuan Pembelajaran

- Menjelaskan kenapa NestJS ada: struktur untuk skala
- Memahami bootstrap: NestFactory, AppModule, listen
- Mengenal Controller, Service, Module dan perannya
- Membuat proyek dengan Nest CLI

---

## Program: Pengenalan NestJS: Arsitektur Enterprise

```ts
// File bootstrap: titik masuk aplikasi NestJS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestFactory membuat aplikasi dari root module
  const app = await NestFactory.create(AppModule);

  // Prefix global: semua route menjadi /api/...
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log('NestJS berjalan di http://localhost:3000/api');
}

bootstrap();
```

---

## Penjelasan

## Kenapa NestJS? Masalah Express
Express fleksibel - dan itulah masalahnya: tidak ada aturan, jadi tiap developer menulis arsitektur berbeda. Proyek besar jadi sulit dipelihara. NestJS menjawab dengan arsitektur WAJIB: controller, service, module - plus TypeScript, decorators, dan Dependency Injection. Ini alasan NestJS naik pesat di enterprise 2026: struktur yang konsisten = mudah di-onboard, di-test, dan di-scale.
## Bootstrap: main.ts dan AppModule
NestFactory.create(AppModule) membangun aplikasi dari root module. app.listen(3000) menyalakan server (di belakang layar: Express). setGlobalPrefix('api') menambahkan prefix ke semua route - praktik standar agar API bisa diversi (pelajaran 6). NestFactory juga bisa membuat aplikasi dari mikroservices/WebSocket (pelajaran 14).
## Controller, Service, Module: Tiga Pilar
Controller = menerima request, memetakan route ke method (decorator @Get() dll), TIDAK berisi logika bisnis. Service = logika bisnis, di-inject ke controller via constructor (private readonly appService: AppService) - ini Dependency Injection. Module = mengelompokkan controller + service + import, menjadi "peta arsitektur". NestJS CLI membuat ketiganya: nest g controller app, nest g service app.
## Decorators: TypeScript yang Berbicara
@Controller(), @Get(), @Injectable() adalah decorators - metadata yang dibaca framework untuk menangani class/method Anda. Inilah yang membuat kode Nest "mendeskripsikan diri sendiri". Jika Anda pernah pakai Angular atau Spring Boot, semuanya terasa familier - Nest terinspirasi keduanya.

---

## Eksperimen

1. **Kenapa NestJS? Masalah Express**
2. **Bootstrap: main.ts dan AppModule**
3. **Controller, Service, Module: Tiga Pilar**
4. **Decorators: TypeScript yang Berbicara**

---

## Tantangan

Buat proyek baru dengan Nest CLI (nest new latihan), lalu: (1) tambah endpoint GET /waktu di AppController yang mengembalikan new Date().toISOString(), (2) buat service baru WaktuService (nest g service waktu) dan pindahkan logika ke sana, (3) pasang setGlobalPrefix("api") dan uji endpoint dengan preview. Tuliskan struktur folder proyek Nest Anda.

---

## Ringkasan

NestJS = struktur wajib + TypeScript + DI. Bootstrap: main.ts + AppModule. Controller/Service/Module = tiga pilar. Decorators = metadata yang dibaca framework. Lanjut: controller & routing dalam.
