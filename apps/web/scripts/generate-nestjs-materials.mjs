// ============================================================================
// generate-nestjs-materials.mjs
// NestJS track: 16 lessons x 2 languages (id/en) -> 32 markdown + 32 StackBlitz JSON.
// Structure based on NestJS bootcamp/roadmap research 2026 (NestJS Masterclass,
// techstack.sh roadmap, Tom Ray course, xDev Asia, Zero-to-Hero program):
//   Nest Fundamentals    : intro & CLI, controllers & routing, providers & DI,
//                          modules
//   Request & Data       : pipes & DTO validation, exception filters & middleware,
//                          TypeORM, Prisma
//   Auth & Advanced      : guards & authorization, JWT auth, interceptors,
//                          config, Swagger & logging
//   Production & Capstone: testing, WebSockets, Docker & CI/CD, capstone
// Each lesson ships a runnable StackBlitz "node" project (files JSON) with a
// minimal NestJS app; the lesson's key file is the markdown code block.
// ============================================================================
import fs from 'fs';
import path from 'path';

const BASE = new URL('../public/data/course/nestjs', import.meta.url).pathname;
const BASE_DIR = process.platform === 'win32' ? BASE.slice(1) : BASE;

const PHASES = [
  { phase: 1, id: 'fundamentals', nameId: 'Fondasi Nest', nameEn: 'Nest Fundamentals' },
  { phase: 2, id: 'request-data', nameId: 'Request & Data', nameEn: 'Request & Data' },
  { phase: 3, id: 'auth-advanced', nameId: 'Auth & Lanjutan', nameEn: 'Auth & Advanced' },
  { phase: 4, id: 'production', nameId: 'Produksi & Capstone', nameEn: 'Production & Capstone' },
];

const TS_CONFIG = {
  compilerOptions: {
    module: 'commonjs',
    declaration: false,
    removeComments: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    allowSyntheticDefaultImports: true,
    target: 'ES2021',
    sourceMap: false,
    outDir: './dist',
    baseUrl: './',
    incremental: false,
    skipLibCheck: true,
    strictNullChecks: false,
    noImplicitAny: false,
    strictBindCallApply: false,
    forceConsistentCasingInFileNames: false,
    noFallthroughCasesInSwitch: false,
  },
};

// ===== PHASE 1: NEST FUNDAMENTALS (lessons 1-4) =====
const LESSONS_P1 = [
  {
    phase: 1, num: 1, topicId: 'pengenalan-nest',
    titleId: 'Pengenalan NestJS: Arsitektur Enterprise', titleEn: 'NestJS Intro: Enterprise Architecture',
    codeFile: 'src/main.ts',
    files: {
      'src/main.ts': `// File bootstrap: titik masuk aplikasi NestJS
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

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Root module: peta arsitektur aplikasi
@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}`,
      'src/app.controller.ts': `import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // route prefix: / (tidak ada)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // GET /
  getHello(): string {
    return this.appService.getHello();
  }
}`,
      'src/app.service.ts': `import { Injectable } from '@nestjs/common';

@Injectable() // bisa di-inject ke controller
export class AppService {
  getHello(): string {
    return 'Halo dari NestJS!';
  }
}`,
      'package.json': `{
  "name": "lesson1-nest-intro",
  "version": "1.0.0",
  "description": "NestJS pertama: bootstrap, module, controller, service",
  "scripts": {
    "start": "nest start --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Menjelaskan kenapa NestJS ada: struktur untuk skala',
      'Memahami bootstrap: NestFactory, AppModule, listen',
      'Mengenal Controller, Service, Module dan perannya',
      'Membuat proyek dengan Nest CLI',
    ],
    objEn: [
      'Explain why NestJS exists: structure at scale',
      'Understand bootstrap: NestFactory, AppModule, listen',
      'Meet Controller, Service, Module and their roles',
      'Create a project with the Nest CLI',
    ],
    expId: `## Kenapa NestJS? Masalah Express
Express fleksibel - dan itulah masalahnya: tidak ada aturan, jadi tiap developer menulis arsitektur berbeda. Proyek besar jadi sulit dipelihara. NestJS menjawab dengan arsitektur WAJIB: controller, service, module - plus TypeScript, decorators, dan Dependency Injection. Ini alasan NestJS naik pesat di enterprise 2026: struktur yang konsisten = mudah di-onboard, di-test, dan di-scale.
## Bootstrap: main.ts dan AppModule
NestFactory.create(AppModule) membangun aplikasi dari root module. app.listen(3000) menyalakan server (di belakang layar: Express). setGlobalPrefix('api') menambahkan prefix ke semua route - praktik standar agar API bisa diversi (pelajaran 6). NestFactory juga bisa membuat aplikasi dari mikroservices/WebSocket (pelajaran 14).
## Controller, Service, Module: Tiga Pilar
Controller = menerima request, memetakan route ke method (decorator @Get() dll), TIDAK berisi logika bisnis. Service = logika bisnis, di-inject ke controller via constructor (private readonly appService: AppService) - ini Dependency Injection. Module = mengelompokkan controller + service + import, menjadi "peta arsitektur". NestJS CLI membuat ketiganya: nest g controller app, nest g service app.
## Decorators: TypeScript yang Berbicara
@Controller(), @Get(), @Injectable() adalah decorators - metadata yang dibaca framework untuk menangani class/method Anda. Inilah yang membuat kode Nest "mendeskripsikan diri sendiri". Jika Anda pernah pakai Angular atau Spring Boot, semuanya terasa familier - Nest terinspirasi keduanya.`,
    expEn: `## Why NestJS? The Express Problem
Express is flexible - and that is the problem: no rules, so every developer writes a different architecture. Large projects become hard to maintain. NestJS answers with MANDATORY architecture: controller, service, module - plus TypeScript, decorators, and Dependency Injection. This is why NestJS is rising fast in enterprises in 2026: consistent structure = easy onboarding, testing, and scaling.
## Bootstrap: main.ts and AppModule
NestFactory.create(AppModule) builds the application from the root module. app.listen(3000) starts the server (behind the scenes: Express). setGlobalPrefix('api') prefixes all routes - standard practice for API versioning (lesson 6). NestFactory can also create microservice/WebSocket apps (lesson 14).
## Controller, Service, Module: Three Pillars
Controller = receives requests, maps routes to methods (via @Get() and friends), holds NO business logic. Service = business logic, injected into the controller via the constructor (private readonly appService: AppService) - that is Dependency Injection. Module = groups controller + service + imports, acting as the "architecture map". The Nest CLI creates all three: nest g controller app, nest g service app.
## Decorators: TypeScript That Speaks
@Controller(), @Get(), @Injectable() are decorators - metadata the framework reads to handle your classes and methods. This is what makes Nest code "self-describing". If you have used Angular or Spring Boot, everything feels familiar - Nest is inspired by both.`,
    chId: 'Buat proyek baru dengan Nest CLI (nest new latihan), lalu: (1) tambah endpoint GET /waktu di AppController yang mengembalikan new Date().toISOString(), (2) buat service baru WaktuService (nest g service waktu) dan pindahkan logika ke sana, (3) pasang setGlobalPrefix("api") dan uji endpoint dengan preview. Tuliskan struktur folder proyek Nest Anda.',
    chEn: 'Create a new project with the Nest CLI (nest new latihan), then: (1) add a GET /waktu endpoint in AppController returning new Date().toISOString(), (2) create a new WaktuService (nest g service waktu) and move the logic there, (3) set setGlobalPrefix("api") and test the endpoint in the preview. Write down your Nest project\'s folder structure.',
    sumId: 'NestJS = struktur wajib + TypeScript + DI. Bootstrap: main.ts + AppModule. Controller/Service/Module = tiga pilar. Decorators = metadata yang dibaca framework. Lanjut: controller & routing dalam.',
    sumEn: 'NestJS = mandatory structure + TypeScript + DI. Bootstrap: main.ts + AppModule. Controller/Service/Module = the three pillars. Decorators = metadata the framework reads. Next: controllers & routing in depth.',
  },
  {
    phase: 1, num: 2, topicId: 'controllers-routing',
    titleId: 'Controllers & Routing: CRUD Lengkap', titleEn: 'Controllers & Routing: Full CRUD',
    codeFile: 'src/catatan/catatan.controller.ts',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { CatatanModule } from './catatan/catatan.module';

@Module({
  imports: [CatatanModule],
})
export class AppModule {}`,
      'src/catatan/catatan.module.ts': `import { Module } from '@nestjs/common';
import { CatatanController } from './catatan.controller';
import { CatatanService } from './catatan.service';

@Module({
  controllers: [CatatanController],
  providers: [CatatanService],
})
export class CatatanModule {}`,
      'src/catatan/catatan.controller.ts': `import {
  Controller, Get, Post, Put, Delete, Param, Body, Query,
  HttpCode, HttpStatus, ParseIntPipe,
} from '@nestjs/common';
import { CatatanService } from './catatan.service';

@Controller('catatan') // prefix: /api/catatan
export class CatatanController {
  constructor(private readonly catatanService: CatatanService) {}

  @Get() // GET /api/catatan?selesai=true
  semua(@Query('selesai') selesai?: string) {
    return this.catatanService.semua(selesai === 'true');
  }

  @Get(':id') // GET /api/catatan/1
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.catatanService.detail(id);
  }

  @Post()
  buat(@Body() body: { judul: string }) {
    return this.catatanService.buat(body.judul);
  }

  @Put(':id')
  ubah(@Param('id', ParseIntPipe) id: number, @Body() body: { judul?: string; selesai?: boolean }) {
    return this.catatanService.ubah(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  hapus(@Param('id', ParseIntPipe) id: number) {
    this.catatanService.hapus(id);
  }
}`,
      'src/catatan/catatan.service.ts': `import { Injectable, NotFoundException } from '@nestjs/common';

export interface Catatan {
  id: number;
  judul: string;
  selesai: boolean;
}

@Injectable()
export class CatatanService {
  private data: Catatan[] = [
    { id: 1, judul: 'Belajar NestJS', selesai: false },
  ];
  private idBerikutnya = 2;

  semua(hanyaSelesai: boolean): Catatan[] {
    return hanyaSelesai ? this.data.filter((c) => c.selesai) : this.data;
  }

  detail(id: number): Catatan {
    const item = this.data.find((c) => c.id === id);
    if (!item) throw new NotFoundException('Catatan tidak ditemukan');
    return item;
  }

  buat(judul: string): Catatan {
    const baru: Catatan = { id: this.idBerikutnya++, judul, selesai: false };
    this.data.push(baru);
    return baru;
  }

  ubah(id: number, perubahan: Partial<Catatan>): Catatan {
    const item = this.detail(id);
    Object.assign(item, perubahan);
    return item;
  }

  hapus(id: number): void {
    const index = this.data.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException('Catatan tidak ditemukan');
    this.data.splice(index, 1);
  }
}`,
      'package.json': `{
  "name": "lesson2-nest-controllers",
  "version": "1.0.0",
  "description": "Controllers & routing: CRUD lengkap dengan NestJS",
  "scripts": {
    "start": "nest start --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Membuat controller dengan prefix dan route CRUD',
      'Mengambil data dari params, query, dan body',
      'Menggunakan ParseIntPipe untuk konversi/validasi',
      'Mengembalikan status code yang tepat (201, 204, 404)',
    ],
    objEn: [
      'Create a controller with a prefix and CRUD routes',
      'Extract data from params, query, and body',
      'Use ParseIntPipe for conversion/validation',
      'Return correct status codes (201, 204, 404)',
    ],
    expId: `## Controller: Deklarasi Route dalam Satu Class
@Controller('catatan') menetapkan prefix; @Get(':id'), @Post(), dll. menetapkan method + sub-path. Satu controller = satu resource. Di belakang layar ini Express, tapi deklaratif: tidak ada if/else routing manual. Perhatikan juga: Nest mengembalikan nilai method langsung sebagai JSON - tidak perlu res.json().
## Mengambil Data dari Request
@Param('id', ParseIntPipe) id: number - param path, dikonversi otomatis jadi angka (jika "abc" → 400). @Query('selesai') untuk query string. @Body() body: { judul: string } untuk request body. @Req()/@Res() tersedia tapi dihindari: memakai @Res() melewati pipeline Nest (interceptor, filter) - aturan praktik: jangan pakai kecuali terpaksa.
## Service: Logika Bisnis di Tempatnya
Controller menangani HTTP; service menangani logika (validasi manual, NotFoundException). Pola: controller tipis, service kaya. NotFoundException adalah exception bawaan Nest - dibalas otomatis sebagai 404 JSON. Jika data tidak ditemukan, Anda TIDAK mengembalikan null - Anda melempar exception yang tepat.
## Status Code Default & Kustom
POST default 201 (bukan 200!). DELETE default 200, tapi dengan @HttpCode(HttpStatus.NO_CONTENT) menjadi 204 tanpa body. Ini konsisten dengan konvensi REST yang dipelajari di track Node.js - Nest menegakkannya secara bawaan.`,
    expEn: `## Controllers: Declaring Routes in One Class
@Controller('catatan') sets the prefix; @Get(':id'), @Post(), etc. set the method + sub-path. One controller = one resource. Under the hood this is Express, but declarative: no manual if/else routing. Note also: Nest returns method values directly as JSON - no res.json() needed.
## Extracting Data from the Request
@Param('id', ParseIntPipe) id: number - a path param, auto-converted to a number ("abc" → 400). @Query('selesai') for query strings. @Body() body: { judul: string } for the request body. @Req()/@Res() exist but are avoided: using @Res() bypasses the Nest pipeline (interceptors, filters) - practical rule: do not use it unless forced.
## Services: Business Logic in Its Place
Controllers handle HTTP; services handle logic (manual validation, NotFoundException). Pattern: thin controllers, rich services. NotFoundException is a built-in Nest exception - automatically answered as 404 JSON. When data is missing, you do NOT return null - you throw the right exception.
## Default & Custom Status Codes
POST defaults to 201 (not 200!). DELETE defaults to 200, but @HttpCode(HttpStatus.NO_CONTENT) makes it 204 with no body. This is consistent with the REST conventions learned in the Node.js track - Nest enforces them by default.`,
    chId: 'Perluas API catatan: (1) tambah route GET /api/catatan/selesai sebagai route terpisah (perhatikan urutan: deklarasi sebelum :id), (2) tambah field prioritas ("rendah"|"sedang"|"tinggi") dengan default "sedang", (3) route GET /api/statistik mengembalikan total dan jumlah selesai. Uji semua dengan preview.',
    chEn: 'Extend the notes API: (1) add a GET /api/catatan/selesai route as a separate route (mind the order: declare it before :id), (2) add a prioritas field ("rendah"|"sedang"|"tinggi") defaulting to "sedang", (3) a GET /api/statistik route returning total and completed counts. Test everything in the preview.',
    sumId: 'Controller = deklarasi route; service = logika. Param/Query/Body via decorators. ParseIntPipe konversi otomatis. Exception = status code otomatis. Lanjut: DI & providers.',
    sumEn: 'Controller = route declarations; service = logic. Param/Query/Body via decorators. ParseIntPipe converts automatically. Exceptions = automatic status codes. Next: DI & providers.',
  },
  {
    phase: 1, num: 3, topicId: 'providers-di',
    titleId: 'Providers & Dependency Injection', titleEn: 'Providers & Dependency Injection',
    codeFile: 'src/order/order.service.ts',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';

@Module({
  imports: [OrderModule],
})
export class AppModule {}`,
      'src/order/order.module.ts': `import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { NotificationService } from './notification.service';

@Module({
  controllers: [OrderController],
  // Provider terdaftar di sini - DI container mengelola lifecycle-nya
  providers: [OrderService, NotificationService],
})
export class OrderModule {}`,
      'src/order/order.controller.ts': `import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  // DI: Nest membuatkan instance OrderService dan menyuntikkannya
  constructor(private readonly orderService: OrderService) {}

  @Post()
  buat(@Body() body: { produk: string; qty: number }) {
    return this.orderService.buat(body.produk, body.qty);
  }
}`,
      'src/order/order.service.ts': `import { Injectable, Inject } from '@nestjs/common';
import { NotificationService } from './notification.service';

// Token provider: bisa berupa class, string, atau symbol
export const POTONGAN_RATE = 'POTONGAN_RATE';

@Injectable()
export class OrderService {
  constructor(
    // 1) Inject provider class lain (hierarki dependency)
    private readonly notif: NotificationService,
    // 2) Inject VALUE provider (konstanta) via token
    @Inject(POTONGAN_RATE) private readonly potongan: number,
  ) {}

  buat(produk: string, qty: number) {
    const harga = qty * 50000;
    const total = harga - harga * this.potongan;
    this.notif.kirim('order-baru', { produk, total });
    return { produk, qty, potongan: this.potongan * 100 + '%', total };
  }
}`,
      'src/order/notification.service.ts': `import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  kirim(event: string, data: unknown) {
    // Di produksi: email/SMS/push. Di sini cukup console.
    console.log(\`[NOTIF] \${event}:\`, data);
  }
}`,
      'package.json': `{
  "name": "lesson3-providers-di",
  "version": "1.0.0",
  "description": "Providers & Dependency Injection di NestJS",
  "scripts": {
    "start": "nest start --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Menjelaskan DI container dan kenapa ia ada',
      'Mendaftarkan dan meng-inject provider',
      'Menggunakan value provider dengan token (useValue)',
      'Memahami scope provider: singleton, request, transient',
    ],
    objEn: [
      'Explain the DI container and why it exists',
      'Register and inject providers',
      'Use value providers with tokens (useValue)',
      'Understand provider scopes: singleton, request, transient',
    ],
    expId: `## DI: Kebalikan dari "Buat Sendiri"
Tanpa DI, OrderService harus new NotificationService() sendiri - dan tiap perubahan NotificationService memaksa OrderService berubah. Dengan DI, OrderService CUKUP mendeklarasikan kebutuhan di constructor: private readonly notif: NotificationService. Nest (container IoC) membuatkan instance dan menyuntikkannya. Konsekuensinya: mudah di-test (ganti provider dengan mock) dan mudah di-tukar (ganti implementasi tanpa sentuh pemakai).
## @Injectable() dan Registrasi
@Injectable() menandai class sebagai provider. Di module, daftarkan di array providers. Controller juga bisa di-inject ke... tidak - controller menerima provider; provider TIDAK boleh bergantung ke controller (arah dependency satu arah). Aturan praktik: registrasi yang terlewat = error "Nest can't resolve dependencies" - error paling umum NestJS.
## Value Provider: Konstanta via Token
Tidak semua provider harus class: useValue menginject konstanta (konfigurasi, koneksi, mock). Token berupa string/symbol (@Inject(POTONGAN_RATE)). Nest mendukung 4 bentuk: useClass, useValue, useFactory (pembuatan async - cocok untuk koneksi DB), useExisting (alias). Pola forRoot/forRootAsync di modul populer (ConfigModule, TypeOrmModule) adalah implementasi dynamic modules dengan useFactory.
## Scope: Umur Hidup Provider
DEFAULT: singleton - SATU instance dipakai semua request (state bersama, hati-hati!). REQUEST: instance baru per request (state per-user aman). TRANSIENT: instance baru setiap inject. 99% kasus singleton sudah benar; gunakan REQUEST hanya untuk state yang benar-benar per-request (misal user saat ini).`,
    expEn: `## DI: The Opposite of "Create It Yourself"
Without DI, OrderService would new NotificationService() on its own - and every change to NotificationService would force OrderService to change. With DI, OrderService only DECLARES its need in the constructor: private readonly notif: NotificationService. Nest (the IoC container) creates the instance and injects it. Consequences: easy testing (swap providers with mocks) and easy swapping (change implementations without touching consumers).
## @Injectable() and Registration
@Injectable() marks a class as a provider. In a module, register it in the providers array. Controllers can inject providers; providers must NOT depend on controllers (one-way dependency). Practical rule: a missed registration = "Nest can't resolve dependencies" - the most common NestJS error.
## Value Providers: Constants via Tokens
Not every provider must be a class: useValue injects constants (config, connections, mocks). Tokens can be strings/symbols (@Inject(POTONGAN_RATE)). Nest supports 4 forms: useClass, useValue, useFactory (async creation - great for DB connections), useExisting (aliases). The forRoot/forRootAsync patterns of popular modules (ConfigModule, TypeOrmModule) implement dynamic modules with useFactory.
## Scopes: Provider Lifetimes
DEFAULT: singleton - ONE instance shared across requests (shared state - beware!). REQUEST: a new instance per request (per-user state is safe). TRANSIENT: a new instance on every injection. 99% of cases the singleton is correct; use REQUEST only for truly per-request state (e.g., the current user).`,
    chId: 'Latihan "order dengan pajak": (1) buat TaxService dengan method hitung(total) yang memakai rate dari value provider PAJAK_RATE = 0.11, (2) OrderService menginject TaxService (bukan potongan manual), (3) tambahkan route GET /api/order/ringkasan yang mengembalikan daftar order tersimpan. Tuliskan dependency graph dari modul Anda.',
    chEn: 'A "taxed order" exercise: (1) create a TaxService with hitung(total) using a PAJAK_RATE = 0.11 value provider, (2) OrderService injects TaxService (instead of manual discounts), (3) add a GET /api/order/ringkasan route returning stored orders. Write down your module\'s dependency graph.',
    sumId: 'DI = deklarasi kebutuhan, container yang membuat. @Injectable + registrasi di module. useClass/useValue/useFactory/useExisting. Scope: singleton > request > transient. Lanjut: modules.',
    sumEn: 'DI = declare needs, container creates. @Injectable + module registration. useClass/useValue/useFactory/useExisting. Scopes: singleton > request > transient. Next: modules.',
  },
  {
    phase: 1, num: 4, topicId: 'modules',
    titleId: 'Modules: Organisasi Arsitektur', titleEn: 'Modules: Architecture Organization',
    codeFile: 'src/kursus/kursus.module.ts',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { KursusModule } from './kursus/kursus.module';
import { SertifikatModule } from './sertifikat/sertifikat.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [KursusModule, SertifikatModule, SharedModule],
})
export class AppModule {}`,
      'src/kursus/kursus.module.ts': `import { Module } from '@nestjs/common';
import { KursusController } from './kursus.controller';
import { KursusService } from './kursus.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule], // provider SharedModule yang di-export tersedia di sini
  controllers: [KursusController],
  providers: [KursusService],
  exports: [KursusService], // SertifikatModule boleh memakai KursusService
})
export class KursusModule {}`,
      'src/kursus/kursus.controller.ts': `import { Controller, Get } from '@nestjs/common';
import { KursusService } from './kursus.service';

@Controller('kursus')
export class KursusController {
  constructor(private readonly kursusService: KursusService) {}

  @Get()
  semua() {
    return this.kursusService.semua();
  }
}`,
      'src/kursus/kursus.service.ts': `import { Injectable } from '@nestjs/common';
import { AuditService } from '../shared/audit.service';

@Injectable()
export class KursusService {
  constructor(private readonly audit: AuditService) {}

  semua() {
    this.audit.catat('kursus:daftar');
    return ['Node.js', 'NestJS', 'Docker'];
  }
}`,
      'src/sertifikat/sertifikat.module.ts': `import { Module } from '@nestjs/common';
import { SertifikatController } from './sertifikat.controller';
import { SertifikatService } from './sertifikat.service';
import { KursusModule } from '../kursus/kursus.module';

@Module({
  imports: [KursusModule], // memakai KursusService yang di-export KursusModule
  controllers: [SertifikatController],
  providers: [SertifikatService],
})
export class SertifikatModule {}`,
      'src/sertifikat/sertifikat.controller.ts': `import { Controller, Get } from '@nestjs/common';
import { SertifikatService } from './sertifikat.service';

@Controller('sertifikat')
export class SertifikatController {
  constructor(private readonly sertifikatService: SertifikatService) {}
  @Get()
  semua() {
    return this.sertifikatService.semua();
  }
}`,
      'src/sertifikat/sertifikat.service.ts': `import { Injectable } from '@nestjs/common';
import { KursusService } from '../kursus/kursus.service';

@Injectable()
export class SertifikatService {
  constructor(private readonly kursus: KursusService) {}

  semua() {
    // Memakai service dari modul lain (di-export)
    return this.kursus.semua().map((k) => ({ kursus: k, sertifikat: true }));
  }
}`,
      'src/shared/shared.module.ts': `import { Global, Module } from '@nestjs/common';
import { AuditService } from './audit.service';

// @Global(): provider tersedia di SEMUA modul tanpa import
@Global()
@Module({
  providers: [AuditService],
  exports: [AuditService],
})
export class SharedModule {}`,
      'src/shared/audit.service.ts': `import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditService {
  catat(aksi: string) {
    console.log(\`[AUDIT] \${new Date().toISOString()} \${aksi}\`);
  }
}`,
      'package.json': `{
  "name": "lesson4-nest-modules",
  "version": "1.0.0",
  "description": "Modules: feature modules, exports, @Global, shared",
  "scripts": {
    "start": "nest start --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Membuat feature module per domain bisnis',
      'Memahami imports, exports, dan sharing provider',
      'Menggunakan @Global untuk provider lintas modul',
      'Menggambar peta arsitektur dari file module',
    ],
    objEn: [
      'Create a feature module per business domain',
      'Understand imports, exports, and provider sharing',
      'Use @Global for cross-module providers',
      'Read the architecture map from module files',
    ],
    expId: `## Module = Batas Domain Bisnis
Module mengelompokkan semua yang dibutuhkan SATU fitur: controller + service + DTO + entity. Satu module per domain (kursus, sertifikat, user, order). Modul besar = peta arsitektur yang bisa dibaca: buka app.module.ts dan Anda tahu SEMUA fitur aplikasi. Ini perbedaan utama Nest vs Express: arsitektur terlihat dari struktur folder, bukan tersembunyi di file router.
## imports & exports: Jalan Berbagi
Provider bersifat privat per module UNLESS di-export. KursusModule exports KursusService → SertifikatModule imports KursusModule → SertifikatService bisa inject KursusService. Ekspor yang hemat adalah desain yang sehat: hanya apa yang benar-benar dibutuhkan modul lain. Kalau SertifikatModule butuh KursusService, jangan langsung register - ikuti jalur ekspor.
## @Global: Provider yang "Di Udara"
@Global() membuat provider tersedia di semua module TANPA import. Cocok untuk: logging, config, koneksi DB, audit. Gunakan hemat - global = hidden dependency. Aturan praktik bootcamp: global untuk infrastruktur, module untuk bisnis.
## Circular Dependency & Dynamic Modules
Dua module saling import = circular dependency → error Nest. Solusi: forwardRef(() => ModulLain) - tapi ini alarm desain: pindahkan provider bersama ke module ketiga. Dynamic modules (forRoot) memungkinkan module menerima konfigurasi - dipakai @nestjs/config dan TypeOrmModule (pelajaran 7).`,
    expEn: `## Modules = Business Domain Boundaries
A module groups everything ONE feature needs: controller + service + DTO + entity. One module per domain (courses, certificates, users, orders). Small modules = a readable architecture map: open app.module.ts and you know ALL of the app's features. This is Nest's main difference from Express: the architecture is visible in the folder structure, not hidden in a router file.
## imports & exports: The Sharing Roads
Providers are private per module UNLESS exported. KursusModule exports KursusService → SertifikatModule imports KursusModule → SertifikatService can inject KursusService. Restrained exports are healthy design: only what others truly need. If SertifikatModule needs KursusService, do not re-register it - follow the export path.
## @Global: Providers "in the Air"
@Global() makes a provider available in all modules WITHOUT import. Good for: logging, config, DB connections, audit. Use sparingly - global = hidden dependency. Bootcamp rule of thumb: global for infrastructure, modules for business.
## Circular Dependencies & Dynamic Modules
Two modules importing each other = circular dependency → a Nest error. Solution: forwardRef(() => OtherModule) - but that is a design alarm: move the shared provider into a third module. Dynamic modules (forRoot) let a module accept configuration - used by @nestjs/config and TypeOrmModule (lesson 7).`,
    chId: 'Refactor ke arsitektur domain: (1) buat UserModule (user.controller + user.service) yang menyimpan daftar user, (2) KursusModule menginject UserService lewat jalur exports (tambah route GET /kursus/:id/peserta), (3) pindahkan AuditService ke module InfraModule @Global, (4) gambar dependency graph modul-modul Anda di kertas dan cocokkan dengan kode.',
    chEn: 'Refactor to domain architecture: (1) create a UserModule (user.controller + user.service) storing a user list, (2) KursusModule injects UserService through the exports path (add GET /kursus/:id/peserta), (3) move AuditService into a @Global InfraModule, (4) draw your modules\' dependency graph on paper and match it against the code.',
    sumId: 'Module = batas domain. exports = jalur berbagi provider. @Global untuk infrastruktur. Circular = alarm desain. Baca arsitektur dari app.module. Lanjut: pipes & validasi DTO.',
    sumEn: 'Modules = domain boundaries. exports = the sharing roads. @Global for infrastructure. Circular = a design alarm. Read the architecture from app.module. Next: pipes & DTO validation.',
  },
];

// ===== PHASE 2: REQUEST & DATA (lessons 5-8) =====
const LESSONS_P2 = [
  {
    phase: 2, num: 5, topicId: 'pipes-dto',
    titleId: 'Pipes & Validasi DTO', titleEn: 'Pipes & DTO Validation',
    codeFile: 'src/catatan/catatan.controller.ts',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // ValidationPipe GLOBAL: validasi + transformasi semua input
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // buang properti yang tidak ada di DTO
      forbidNonWhitelisted: true, // error 400 jika ada properti aneh
      transform: true, // konversi tipe otomatis (string -> number, dll)
    }),
  );

  await app.listen(3000);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { CatatanModule } from './catatan/catatan.module';

@Module({ imports: [CatatanModule] })
export class AppModule {}`,
      'src/catatan/catatan.module.ts': `import { Module } from '@nestjs/common';
import { CatatanController } from './catatan.controller';
import { CatatanService } from './catatan.service';

@Module({ controllers: [CatatanController], providers: [CatatanService] })
export class CatatanModule {}`,
      'src/catatan/dto/buat-catatan.dto.ts': `// DTO: bentuk data yang DITERIMA API (validasi terpusat)
import { IsString, IsBoolean, IsOptional, MaxLength, MinLength } from 'class-validator';

export class BuatCatatanDto {
  @IsString()
  @MinLength(3, { message: 'judul minimal 3 karakter' })
  @MaxLength(200)
  judul: string;

  @IsOptional()
  @IsBoolean()
  selesai?: boolean;
}`,
      'src/catatan/catatan.controller.ts': `import { Controller, Get, Post, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { CatatanService } from './catatan.service';
import { BuatCatatanDto } from './dto/buat-catatan.dto';

@Controller('catatan')
export class CatatanController {
  constructor(private readonly catatanService: CatatanService) {}

  @Get()
  semua(@Query('selesai') selesai?: string) {
    return this.catatanService.semua(selesai === 'true');
  }

  @Get(':id')
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.catatanService.detail(id);
  }

  @Post()
  buat(@Body() dto: BuatCatatanDto) {
    // dto sudah VALID & BERSIH - tidak perlu validasi manual
    return this.catatanService.buat(dto.judul, dto.selesai);
  }
}`,
      'src/catatan/catatan.service.ts': `import { Injectable, NotFoundException } from '@nestjs/common';

export interface Catatan {
  id: number;
  judul: string;
  selesai: boolean;
}

@Injectable()
export class CatatanService {
  private data: Catatan[] = [{ id: 1, judul: 'Belajar DTO', selesai: false }];
  private idBerikutnya = 2;

  semua(hanyaSelesai: boolean): Catatan[] {
    return hanyaSelesai ? this.data.filter((c) => c.selesai) : this.data;
  }

  detail(id: number): Catatan {
    const item = this.data.find((c) => c.id === id);
    if (!item) throw new NotFoundException('Catatan tidak ditemukan');
    return item;
  }

  buat(judul: string, selesai = false): Catatan {
    const baru: Catatan = { id: this.idBerikutnya++, judul, selesai };
    this.data.push(baru);
    return baru;
  }
}`,
      'package.json': `{
  "name": "lesson5-nest-pipes",
  "version": "1.0.0",
  "description": "Pipes & validasi DTO dengan class-validator",
  "scripts": {
    "start": "nest start --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Menjelaskan fungsi pipe: transformasi & validasi',
      'Menulis DTO dengan class-validator decorators',
      'Memasang ValidationPipe global (whitelist, transform)',
      'Membedakan input valid vs kotor sebelum masuk service',
    ],
    objEn: [
      'Explain the pipe role: transformation & validation',
      'Write DTOs with class-validator decorators',
      'Mount a global ValidationPipe (whitelist, transform)',
      'Distinguish valid vs dirty input before it reaches services',
    ],
    expId: `## Pipe: Gerbang Pertahanan Pertama
Pipe bekerja SEBELUM handler: menerima nilai, bisa memvalidasi dan/atau mentransformasikannya. ParseIntPipe: mengubah '1' (string dari URL) jadi 1 (number) - atau lempar 400. ValidationPipe: memvalidasi seluruh DTO. Aturan: service TIDAK PERNAH menerima input yang belum divalidasi - jaga batas ini, dan bug validasi hilang dari seluruh codebase.
## DTO: Kontrak Input yang Jelas
DTO (Data Transfer Object) mendefinisikan bentuk data yang boleh masuk: class dengan decorator (@IsString, @MinLength, @IsBoolean, @IsOptional). class-validator membaca decorators saat runtime (memanfaatkan metadata TS). Keuntungan ganda: validasi OTOMATIS + dokumentasi bentuk API yang eksplisit (dipakai Swagger, pelajaran 12).
## Opsi ValidationPipe yang Wajib Tahu
whitelist: true - properti yang tidak ada di DTO DIHAPUS. forbidNonWhitelisted: true - properti asing = 400 (menahan probe payload aneh). transform: true - konversi tipe otomatis (query '5' → number, Date, dll). Kombinasi ini = API yang tegas dan deterministik. Ini juga yang membuat property tambahan dari client tidak bisa "menyelinap" ke logika.
## Di Mana Pipe Dipasang
Global (main.ts): semua route. Controller/method level (@UsePipes): selektif. Param level: ParseIntPipe. Pemilihan level = keseimbangan: global untuk aturan umum, lokal untuk kasus khusus.`,
    expEn: `## Pipes: The First Defense Gate
Pipes run BEFORE handlers: they take a value, can validate and/or transform it. ParseIntPipe: converts '1' (string from the URL) to 1 (number) - or throws 400. ValidationPipe: validates a whole DTO. Rule: services NEVER receive unvalidated input - hold that line, and validation bugs disappear from the entire codebase.
## DTOs: An Explicit Input Contract
A DTO (Data Transfer Object) defines the shape of data allowed in: a class with decorators (@IsString, @MinLength, @IsBoolean, @IsOptional). class-validator reads decorators at runtime (using TS metadata). Double win: AUTOMATIC validation + an explicit API shape (reused by Swagger, lesson 12).
## ValidationPipe Options You Must Know
whitelist: true - properties absent from the DTO are STRIPPED. forbidNonWhitelisted: true - foreign properties = 400 (holds back weird payload probes). transform: true - automatic type conversion (query '5' → number, Date, etc.). This combination = a strict, deterministic API. It also stops extra client properties from sneaking into logic.
## Where to Mount Pipes
Global (main.ts): all routes. Controller/method level (@UsePipes): selective. Param level: ParseIntPipe. Choosing the level is a balance: global for general rules, local for special cases.`,
    chId: 'Perkuat DTO: (1) tambah field prioritas dengan @IsEnum(["rendah","sedang","tinggi"]) dan @IsOptional - tambah ke DTO dan service, (2) buat DTO kedua UpdateCatatanDto dengan semua field @IsOptional (untuk PUT partial), (3) uji: kirim payload dengan properti "hack": true - catat responsnya (harus 400 karena forbidNonWhitelisted).',
    chEn: 'Strengthen the DTO: (1) add a prioritas field with @IsEnum(["rendah","sedang","tinggi"]) and @IsOptional - add it to the DTO and service, (2) create a second UpdateCatatanDto with all fields @IsOptional (for partial PUT), (3) test: send a payload with a "hack": true property - record the response (should be 400 thanks to forbidNonWhitelisted).',
    sumId: 'Pipe = validasi + transformasi sebelum handler. DTO + class-validator = kontrak input. whitelist/forbidNonWhitelisted/transform. Service tak pernah terima input kotor. Lanjut: exception filters & middleware.',
    sumEn: 'Pipes = validation + transformation before handlers. DTOs + class-validator = the input contract. whitelist/forbidNonWhitelisted/transform. Services never see dirty input. Next: exception filters & middleware.',
  },
  {
    phase: 2, num: 6, topicId: 'exception-filters',
    titleId: 'Exception Filters & Middleware', titleEn: 'Exception Filters & Middleware',
    codeFile: 'src/common/http-exception.filter.ts',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // Filter error GLOBAL: semua error lewat sini
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}

bootstrap();`,
      'src/app.module.ts': `import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LogMiddleware } from './common/log.middleware';
import { UserModule } from './user/user.module';

@Module({ imports: [UserModule] })
export class AppModule implements NestModule {
  // Middleware: berjalan SEBELUM pipe/guard/handler (level HTTP)
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*'); // semua route
  }
}`,
      'src/common/http-exception.filter.ts': `import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

// Filter: menangkap exception dan membentuk respons ERROR
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Exception HTTP bawaan (NotFoundException, dll)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      return response.status(status).json({
        statusCode: status,
        pesan: typeof body === 'string' ? body : (body as any).message,
        waktu: new Date().toISOString(),
      });
    }

    // Error tak terduga: log detail, balas 500 GENERIK
    console.error('UNEXPECTED ERROR:', exception);
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      pesan: 'Terjadi kesalahan server',
      waktu: new Date().toISOString(),
    });
  }
}`,
      'src/common/log.middleware.ts': `import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.originalUrl}\`);
    next(); // WAJIB: lanjut ke pipeline berikutnya
  }
}`,
      'src/user/user.module.ts': `import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({ controllers: [UserController], providers: [UserService] })
export class UserModule {}`,
      'src/user/user.controller.ts': `import { Controller, Get, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  semua() {
    return this.userService.semua();
  }

  @Get(':id')
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.userService.detail(id);
  }
}`,
      'src/user/user.service.ts': `import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  private data = [
    { id: 1, nama: 'Budi' },
    { id: 2, nama: 'Ani' },
  ];

  semua() {
    return this.data;
  }

  detail(id: number) {
    const item = this.data.find((u) => u.id === id);
    if (!item) throw new NotFoundException('User tidak ditemukan');
    return item;
  }
}`,
      'package.json': `{
  "name": "lesson6-nest-filters",
  "version": "1.0.0",
  "description": "Exception filters & middleware di NestJS",
  "scripts": {
    "start": "nest start --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Menjelaskan pipeline NestJS: middleware → guard → pipe → handler',
      'Menulis exception filter kustom untuk format error konsisten',
      'Membuat middleware dan mendaftarkannya',
      'Menyembunyikan detail error server dari client',
    ],
    objEn: [
      'Explain the NestJS pipeline: middleware → guard → pipe → handler',
      'Write a custom exception filter for consistent error format',
      'Create and register middleware',
      'Hide server error details from clients',
    ],
    expId: `## Pipeline Lengkap NestJS
Request mengalir: Middleware (level HTTP/Express, raw) → Guard (izin akses, pelajaran 9) → Pipe (validasi/transformasi, pelajaran 5) → Handler (controller) → Interceptor (setelah, pelajaran 11). Exception yang dilempar di mana pun jatuh ke Exception Filter. Memahami urutan ini menjawab setengah pertanyaan wawancara NestJS.
## Exception Filter: Satu Format Error untuk Semua
Tanpa filter kustom, format error bawaan Nest kurang konsisten (string vs objek vs array). Dengan @Catch() + ExceptionFilter, SEMUA error (404 NotFoundException, 400 ValidationPipe, 500 tak terduga) diubah ke format seragam: { statusCode, pesan, waktu }. Client/frontend tidak perlu menebak bentuk error. Filters bisa spesifik per exception: @Catch(NotFoundException).
## Middleware: Lapisan HTTP Klasik
Middleware = fungsi (req, res, next) gaya Express, berjalan PALING AWAL. Cocok untuk: logging mentah, CORS, serving static, rate limit HTTP. Untuk logika bisnis yang butuh konteks aplikasi (auth, roles), pakai GUARD bukan middleware - guard punya akses DI dan context Nest. Aturan praktik: middleware untuk hal HTTP, guard untuk keputusan akses.
## Jangan Bocorkan Stack Trace
Filter contoh: error tak terduga di-log dengan detail (console.error) tapi client mendapat pesan GENERIK. Stack trace di respons = peta serangan gratis. Pola yang sama seperti pelajaran 12 track Node.js - di Nest ini diwajibkan oleh arsitektur.`,
    expEn: `## The Full NestJS Pipeline
Requests flow: Middleware (HTTP/Express level, raw) → Guard (access permission, lesson 9) → Pipe (validation/transformation, lesson 5) → Handler (controller) → Interceptor (after, lesson 11). Exceptions thrown anywhere land in the Exception Filter. Understanding this order answers half of NestJS interview questions.
## Exception Filters: One Error Format for All
Without a custom filter, Nest's built-in error formats are inconsistent (string vs object vs array). With @Catch() + ExceptionFilter, ALL errors (404 NotFoundException, 400 ValidationPipe, unexpected 500s) are reshaped into one format: { statusCode, pesan, waktu }. Clients/frontends never guess the error shape. Filters can target specific exceptions: @Catch(NotFoundException).
## Middleware: The Classic HTTP Layer
Middleware = (req, res, next) functions in Express style, running EARLIEST. Good for: raw logging, CORS, static serving, HTTP rate limits. For business logic needing app context (auth, roles), use GUARDS instead - guards have DI access and Nest context. Rule of thumb: middleware for HTTP concerns, guards for access decisions.
## Never Leak Stack Traces
The sample filter: unexpected errors are logged with detail (console.error) but the client gets a GENERIC message. A stack trace in a response = a free attack map. Same pattern as lesson 12 of the Node.js track - in Nest it is enforced by the architecture.`,
    chId: 'Perluas sistem error: (1) buat DomainExceptionFilter khusus @Catch(NotFoundException) yang menambah field "jenis": "tidak-ditemukan", (2) tambah middleware RequestTimerMiddleware yang mengukur durasi dan mengirim header X-Durasi-Ms, (3) route GET /api/user/error yang melempar Error biasa (bukan HttpException) - amati filter menangani 500 generik.',
    chEn: 'Extend the error system: (1) create a DomainExceptionFilter with @Catch(NotFoundException) adding a "jenis": "tidak-ditemukan" field, (2) add a RequestTimerMiddleware measuring duration and sending an X-Durasi-Ms header, (3) a GET /api/user/error route throwing a plain Error (not an HttpException) - watch the filter answer with a generic 500.',
    sumId: 'Pipeline: middleware → guard → pipe → handler → interceptor → filter. Filter = satu format error. Middleware untuk hal HTTP, guard untuk akses. 500 generik + log detail. Lanjut: TypeORM.',
    sumEn: 'Pipeline: middleware → guard → pipe → handler → interceptor → filter. Filters = one error format. Middleware for HTTP concerns, guards for access. Generic 500 + detailed logs. Next: TypeORM.',
  },
  {
    phase: 2, num: 7, topicId: 'typeorm',
    titleId: 'TypeORM: Entity, Repository, Relasi', titleEn: 'TypeORM: Entities, Repositories, Relations',
    codeFile: 'src/catatan/catatan.service.ts',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { CatatanModule } from './catatan/catatan.module';

@Module({ imports: [CatatanModule] })
export class AppModule {}`,
      'src/catatan/catatan.module.ts': `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatatanController } from './catatan.controller';
import { CatatanService } from './catatan.service';
import { Catatan } from './entities/catatan.entity';

@Module({
  // forFeature: daftarkan entity modul ini ke TypeORM
  imports: [TypeOrmModule.forFeature([Catatan])],
  controllers: [CatatanController],
  providers: [CatatanService],
})
export class CatatanModule {}`,
      'src/catatan/entities/catatan.entity.ts': `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

// Entity = peta tabel database -> class TypeScript
@Entity('catatan')
export class Catatan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  judul: string;

  @Column({ default: false })
  selesai: boolean;

  @Column({ type: 'enum', enum: ['rendah', 'sedang', 'tinggi'], default: 'sedang' })
  prioritas: 'rendah' | 'sedang' | 'tinggi';

  @CreateDateColumn()
  dibuat: Date;
}`,
      'src/catatan/catatan.service.ts': `import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catatan } from './entities/catatan.entity';

@Injectable()
export class CatatanService {
  // Repository Pattern: DI menyuntikkan repository entity ini
  constructor(
    @InjectRepository(Catatan)
    private readonly repo: Repository<Catatan>,
  ) {}

  async semua(hanyaSelesai?: boolean): Promise<Catatan[]> {
    return this.repo.find({
      where: hanyaSelesai === undefined ? {} : { selesai: hanyaSelesai },
      order: { id: 'DESC' },
    });
  }

  async detail(id: number): Promise<Catatan> {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException('Catatan tidak ditemukan');
    return item;
  }

  async buat(data: Partial<Catatan>): Promise<Catatan> {
    return this.repo.save(this.repo.create(data));
  }

  async ubah(id: number, perubahan: Partial<Catatan>): Promise<Catatan> {
    await this.repo.update(id, perubahan);
    return this.detail(id);
  }

  async hapus(id: number): Promise<void> {
    const hasil = await this.repo.delete(id);
    if (!hasil.affected) throw new NotFoundException('Catatan tidak ditemukan');
  }
}

// KONFIGURASI KONEKSI (di proyek nyata, file app.module.ts root):
// TypeOrmModule.forRoot({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   autoLoadEntities: true,
//   synchronize: false, // produksi: pakai migration!
// })`,
      'src/catatan/catatan.controller.ts': `import { Controller, Get, Post, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { CatatanService } from './catatan.service';
import { BuatCatatanDto } from './dto/buat-catatan.dto';

@Controller('catatan')
export class CatatanController {
  constructor(private readonly catatanService: CatatanService) {}

  @Get()
  async semua(@Query('selesai') selesai?: string) {
    return this.catatanService.semua(selesai === 'true');
  }

  @Get(':id')
  async detail(@Param('id', ParseIntPipe) id: number) {
    return this.catatanService.detail(id);
  }

  @Post()
  async buat(@Body() dto: BuatCatatanDto) {
    return this.catatanService.buat(dto);
  }
}`,
      'src/catatan/dto/buat-catatan.dto.ts': `import { IsString, IsOptional, IsEnum, MaxLength, MinLength } from 'class-validator';

export class BuatCatatanDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  judul: string;

  @IsOptional()
  @IsEnum(['rendah', 'sedang', 'tinggi'])
  prioritas?: 'rendah' | 'sedang' | 'tinggi';
}`,
      'package.json': `{
  "name": "lesson7-nest-typeorm",
  "version": "1.0.0",
  "description": "TypeORM: entity, repository pattern, CRUD",
  "scripts": {
    "start": "nest start --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "@nestjs/typeorm": "^10.0.2",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.20"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Mendefinisikan entity dengan decorators TypeORM',
      'Menggunakan repository pattern lewat InjectRepository',
      'Menulis CRUD async tanpa SQL manual',
      'Menjelaskan peran migration dan koneksi (forRoot)',
    ],
    objEn: [
      'Define entities with TypeORM decorators',
      'Use the repository pattern via InjectRepository',
      'Write async CRUD without manual SQL',
      'Explain migrations and connections (forRoot)',
    ],
    expId: `## Entity: Database dalam Bentuk Class
@Entity('catatan') memetakan class ke tabel. @PrimaryGeneratedColumn = id auto-increment. @Column = kolom (dengan opsi: length, default, enum). @CreateDateColumn = dibuat otomatis. Satu entity = satu tabel; perubahan struktur tabel = MIGRATION (bukan alter manual). synchronize: true nyaman di dev tapi DILARANG di produksi - pakai migration yang ter-versioning.
## Repository Pattern: Tanpa SQL di Service
@InjectRepository(Catatan) repo: Repository<Catatan> menyuntikkan repository - object yang membungkus operasi tabel: find, findOneBy, save, update, delete. Service tidak menulis SQL: TypeORM menerjemahkan ke SQL yang aman (parameterized). Hasil: kode tipis, type-safe, dan mudah ditest (mock repository).
## forRoot vs forFeature
TypeOrmModule.forRoot (root module): konfigurasi koneksi sekali (host, user, database, autoLoadEntities). TypeOrmModule.forFeature([Entity]): mendaftarkan entity milik modul ini. AutoLoadEntities menyederhanakan - entity otomatis terdeteksi dari forFeature.
## Relasi & Query Builder
Entity berelasi: @ManyToOne/@OneToMany/@ManyToMany (misal User @OneToMany Catatan) dan pemuatan relasi: find({ relations: ['user'] }). Untuk query kompleks: query builder (createQueryBuilder('catatan').where(...).innerJoin(...)). Pelajaran 10 track Node.js (SQL/JOIN) berlaku persis di sini - TypeORM hanyalah pembungkus.`,
    expEn: `## Entities: The Database as Classes
@Entity('catatan') maps a class to a table. @PrimaryGeneratedColumn = auto-increment id. @Column = a column (with options: length, default, enum). @CreateDateColumn = auto-created. One entity = one table; schema changes = MIGRATIONS (not manual alters). synchronize: true is convenient in dev but FORBIDDEN in production - use versioned migrations instead.
## Repository Pattern: No SQL in Services
@InjectRepository(Catatan) repo: Repository<Catatan> injects the repository - an object wrapping table operations: find, findOneBy, save, update, delete. Services write no SQL: TypeORM translates to safe (parameterized) SQL. Result: thin, type-safe, easily testable code (mock the repository).
## forRoot vs forFeature
TypeOrmModule.forRoot (root module): the one-time connection config (host, user, database, autoLoadEntities). TypeOrmModule.forFeature([Entity]): registers the entities belonging to this module. autoLoadEntities simplifies - entities are auto-detected from forFeature.
## Relations & the Query Builder
Entities relate: @ManyToOne/@OneToMany/@ManyToMany (e.g. User @OneToMany Catatan) with eager relation loading: find({ relations: ['user'] }). For complex queries: the query builder (createQueryBuilder('catatan').where(...).innerJoin(...)). Lesson 10 of the Node.js track (SQL/JOIN) applies exactly here - TypeORM is just a wrapper.`,
    chId: 'Tambah relasi: (1) buat entity Label (id, nama) dan relasi @ManyToMany dengan Catatan (join table), (2) ubah CatatanService.semua menerima ?label=nama dan filter dengan relations + where, (3) buat endpoint GET /api/catatan/:id/label yang menampilkan label catatan, (4) tulis query builder untuk menghitung catatan per prioritas (GROUP BY) dan tampilkan di /api/statistik.',
    chEn: 'Add relations: (1) create a Label entity (id, nama) with a @ManyToMany relation to Catatan (join table), (2) change CatatanService.semua to accept ?label=nama filtering with relations + where, (3) create GET /api/catatan/:id/label showing a note\'s labels, (4) write a query builder counting notes per prioritas (GROUP BY) exposed at /api/statistik.',
    sumId: 'Entity = tabel; repository = operasi aman; forRoot = koneksi, forFeature = entity modul. Migration untuk skema. Relasi + query builder untuk query kompleks. Lanjut: Prisma.',
    sumEn: 'Entities = tables; repositories = safe operations; forRoot = connection, forFeature = module entities. Migrations for schema. Relations + query builder for complex queries. Next: Prisma.',
  },
  {
    phase: 2, num: 8, topicId: 'prisma',
    titleId: 'Prisma: Type-Safe ORM Modern', titleEn: 'Prisma: The Modern Type-Safe ORM',
    codeFile: 'prisma/schema.prisma',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({ imports: [UserModule] })
export class AppModule {}`,
      'prisma/schema.prisma': `// Prisma: schema-first. Database didesain DI SINI,
// Prisma Client yang type-safe di-generate dari schema.

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // atau "sqlite" / "mysql"
  url      = env("DATABASE_URL")
}

// Model = tabel + relasi, ditulis deklaratif
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  nama    String
  catatan Catatan[]
  dibuat  DateTime @default(now())
}

model Catatan {
  id       Int      @id @default(autoincrement())
  judul    String   @db.VarChar(200)
  selesai  Boolean  @default(false)
  prioritas String  @default("sedang") // rendah | sedang | tinggi
  user     User     @relation(fields: [userId], references: [id])
  userId   Int
  dibuat   DateTime @default(now())

  @@index([userId])
}

// Perintah CLI:
//   npx prisma migrate dev --name init   -> buat migration + update DB
//   npx prisma studio                    -> browser GUI untuk data
//   npx prisma generate                  -> generate Prisma Client (type-safe)`,
      'src/user/user.module.ts': `import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [PrismaService],
})
export class UserModule {}`,
      'src/prisma/prisma.service.ts': `import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Bungkus PrismaClient sebagai provider Nest (lazy + lifecycle)
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}`,
      'src/user/user.service.ts': `import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Perhatikan: SEMUA query type-safe. Typo field = error compile, bukan runtime.
  async semua() {
    return this.prisma.user.findMany({
      include: { catatan: { orderBy: { dibuat: 'desc' } } },
    });
  }

  async detail(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User tidak ditemukan');
    return user;
  }

  async buat(data: { email: string; nama: string }) {
    return this.prisma.user.create({ data });
  }

  async catatanUser(id: number) {
    return this.prisma.catatan.findMany({
      where: { userId: id },
      orderBy: { dibuat: 'desc' },
    });
  }
}`,
      'src/user/user.controller.ts': `import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async semua() {
    return this.userService.semua();
  }

  @Get(':id')
  async detail(@Param('id', ParseIntPipe) id: number) {
    return this.userService.detail(id);
  }

  @Get(':id/catatan')
  async catatanUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.catatanUser(id);
  }

  @Post()
  async buat(@Body() body: { email: string; nama: string }) {
    return this.userService.buat(body);
  }
}`,
      'package.json': `{
  "name": "lesson8-nest-prisma",
  "version": "1.0.0",
  "description": "Prisma: schema-first ORM dengan NestJS",
  "scripts": {
    "start": "nest start --watch",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "@prisma/client": "^5.22.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "prisma": "^5.22.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
      '.env': `# Salin ke .env.production untuk produksi
DATABASE_URL="postgresql://postgres:rahasia@localhost:5432/tryngo"`,
    },
    objId: [
      'Mendefinisikan model dengan Prisma schema (schema-first)',
      'Menjalankan migration dengan prisma migrate',
      'Menggunakan PrismaClient yang type-safe di NestJS',
      'Menulis query dengan relasi (include, where, orderBy)',
    ],
    objEn: [
      'Define models with the Prisma schema (schema-first)',
      'Run migrations with prisma migrate',
      'Use the type-safe PrismaClient in NestJS',
      'Write queries with relations (include, where, orderBy)',
    ],
    expId: `## Schema-First: Database Didesain di Satu Tempat
Prisma berbeda dari TypeORM: Anda menulis DATABASE di schema.prisma (model, tipe, relasi, index), lalu CLI generate. Migration otomatis dari schema: npx prisma migrate dev - schema berubah, migration dibuat, database di-update. Satu sumber kebenaran, bisa di-review di git, bisa rollback. Ini alasan Prisma jadi favorit proyek baru 2026.
## Type-Safety: Error di Compile, Bukan di Produksi
PrismaClient di-generate DARI schema: this.prisma.user.findMany() sudah tahu field, tipe, dan relasi User. Typo 'emial' = error compile. Where dengan field yang salah = error compile. Ini beda kelas dari string query: sebagian besar bug database hilang SEBELUM kode dijalankan.
## PrismaService: Integrasi dengan Nest
PrismaService extends PrismaClient + implements OnModuleInit/OnModuleDestroy: koneksi dibuka saat module init, ditutup saat app mati. Didaftarkan sebagai provider dan di-export agar semua modul bisa inject - pola yang sama dengan AuditService di pelajaran 4.
## Query: Ringkas dan Ekspresif
create, findUnique, findMany dengan where/include/orderBy - satu kalimat untuk query yang di TypeORM butuh beberapa baris. include: { catatan: ... } memuat relasi (setara JOIN, satu query). Untuk agregasi & transaksi: prisma.catatan.groupBy, prisma.$transaction - tersedia, sama amannya.`,
    expEn: `## Schema-First: The Database Designed in One Place
Prisma differs from TypeORM: you write the DATABASE in schema.prisma (models, types, relations, indexes), then the CLI generates the rest. Migrations are auto-derived from the schema: npx prisma migrate dev - schema changes, migration created, database updated. One source of truth, reviewable in git, rollbackable. This is why Prisma is the favorite for new 2026 projects.
## Type-Safety: Errors at Compile, Not in Production
PrismaClient is generated FROM the schema: this.prisma.user.findMany() already knows User's fields, types, and relations. A typo 'emial' = compile error. Where with a wrong field = compile error. This is a class above string queries: most database bugs disappear before the code even runs.
## PrismaService: Integration with Nest
PrismaService extends PrismaClient + implements OnModuleInit/OnModuleDestroy: the connection opens at module init and closes when the app shuts down. Registered as a provider and exported so every module can inject it - the same pattern as AuditService in lesson 4.
## Queries: Concise and Expressive
create, findUnique, findMany with where/include/orderBy - one sentence for queries that take several lines in TypeORM. include: { catatan: ... } loads relations (like a JOIN, one query). For aggregation & transactions: prisma.catatan.groupBy, prisma.$transaction - available, just as safe.`,
    chId: 'Perluas schema: (1) tambah model Label (id, nama, warna) dengan relasi @manyToMany ke Catatan, (2) buat migration baru dengan nama "add-label" (tuliskan perintahnya), (3) tambah endpoint GET /api/user/:id/statistik yang menghitung jumlah catatan per prioritas (groupBy), (4) tulis query untuk catatan yang dibuat 7 hari terakhir (where: dibuat > gte).',
    chEn: 'Extend the schema: (1) add a Label model (id, nama, warna) with a @manyToMany relation to Catatan, (2) create a new migration named "add-label" (write the command), (3) add GET /api/user/:id/statistik counting notes per prioritas (groupBy), (4) write a query for notes created in the last 7 days (where: dibuat > gte).',
    sumId: 'Schema-first + generate = type-safe total. Migration = versioned schema. PrismaService = koneksi lifecycle. Query ringkas dengan relasi. Lanjut: guards & authorization.',
    sumEn: 'Schema-first + generate = total type-safety. Migrations = versioned schema. PrismaService = connection lifecycle. Concise queries with relations. Next: guards & authorization.',
  },
];

// ===== PHASE 3: AUTH & ADVANCED (lessons 9-12) =====
const LESSONS_P3 = [
  {
    phase: 3, num: 9, topicId: 'guards-authorization',
    titleId: 'Guards & Authorization', titleEn: 'Guards & Authorization',
    codeFile: 'src/common/roles.guard.ts',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { CatatanModule } from './catatan/catatan.module';

@Module({ imports: [CatatanModule] })
export class AppModule {}`,
      'src/common/roles.decorator.ts': `import { SetMetadata } from '@nestjs/common';

// Kunci metadata yang dibaca RolesGuard
export const ROLES_KEY = 'roles';

// Decorator @Roles('admin') menempelkan daftar peran ke handler
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);`,
      'src/common/roles.guard.ts': `import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
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
}`,
      'src/catatan/catatan.module.ts': `import { Module } from '@nestjs/common';
import { CatatanController } from './catatan.controller';
import { CatatanService } from './catatan.service';
import { RolesGuard } from '../common/roles.guard';

@Module({
  controllers: [CatatanController],
  providers: [CatatanService, RolesGuard],
})
export class CatatanModule {}`,
      'src/catatan/catatan.controller.ts': `import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CatatanService } from './catatan.service';
import { BuatCatatanDto } from './dto/buat-catatan.dto';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('catatan')
@UseGuards(RolesGuard) // SEMUA route di controller ini dilindungi guard
export class CatatanController {
  constructor(private readonly catatanService: CatatanService) {}

  @Get()
  semua() {
    return this.catatanService.semua();
  }

  @Get(':id')
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.catatanService.detail(id);
  }

  @Post()
  buat(@Body() dto: BuatCatatanDto) {
    return this.catatanService.buat(dto.judul, dto.selesai);
  }

  @Delete(':id')
  @Roles('admin') // hanya admin boleh menghapus
  hapus(@Param('id', ParseIntPipe) id: number) {
    return this.catatanService.hapus(id);
  }
}`,
      'src/catatan/catatan.service.ts': `import { Injectable, NotFoundException } from '@nestjs/common';

export interface Catatan {
  id: number;
  judul: string;
  selesai: boolean;
}

@Injectable()
export class CatatanService {
  private data: Catatan[] = [{ id: 1, judul: 'Belajar Guard', selesai: false }];
  private idBerikutnya = 2;

  semua(): Catatan[] {
    return this.data;
  }

  detail(id: number): Catatan {
    const item = this.data.find((c) => c.id === id);
    if (!item) throw new NotFoundException('Catatan tidak ditemukan');
    return item;
  }

  buat(judul: string, selesai = false): Catatan {
    const baru: Catatan = { id: this.idBerikutnya++, judul, selesai };
    this.data.push(baru);
    return baru;
  }

  hapus(id: number): { pesan: string } {
    const index = this.data.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException('Catatan tidak ditemukan');
    this.data.splice(index, 1);
    return { pesan: 'Catatan dihapus' };
  }
}`,
      'src/catatan/dto/buat-catatan.dto.ts': `import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class BuatCatatanDto {
  @IsString()
  @MinLength(3, { message: 'judul minimal 3 karakter' })
  @MaxLength(200)
  judul: string;

  @IsOptional()
  @IsBoolean()
  selesai?: boolean;
}`,
      'package.json': `{
  "name": "lesson9-nest-guards",
  "version": "1.0.0",
  "description": "Guards & authorization dengan RolesGuard",
  "scripts": {
    "start": "nest start --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Menjelaskan peran guard: izin akses sebelum handler',
      'Menulis guard custom dengan Reflector (metadata @Roles)',
      'Membuat decorator @Roles untuk menandai route',
      'Memahami urutan eksekusi: middleware, guard, pipe, handler',
    ],
    objEn: [
      'Explain the guard role: access permission before handlers',
      'Write a custom guard with Reflector (@Roles metadata)',
      'Create a @Roles decorator to mark routes',
      'Understand the execution order: middleware, guard, pipe, handler',
    ],
    expId: `## Guard: Penjaga Gerbang
Guard menentukan SIAPA yang boleh menjalankan route - berjalan SETELAH middleware, SEBELUM pipe/handler. Middleware buta terhadap konteks handler (tidak tahu @Roles apa), sedangkan guard punya akses ke metadata handler lewat Reflector. Ini aturan main: middleware untuk kepentingan HTTP global (log, CORS), guard untuk keputusan otorisasi yang spesifik per route.
## Reflector + @Roles: Metadata yang Dibaca Guard
@Roles('admin') hanyalah SetMetadata - menempelkan data ke handler tanpa mengubah perilakunya. RolesGuard membaca metadata itu (getAllAndOverride) lalu membandingkan dengan peran user. Logika izin tersentralisasi di guard, bukan tersebar di setiap controller - tambah peran baru = ubah satu tempat.
## @UseGuards: Level Pemasangan
Controller level: melindungi semua route dalam controller (di contoh: @UseGuards(RolesGuard) di atas class). Method level: hanya route tertentu. Global: via APP_GUARD provider. Urutan pertahanan: akses ditolak di gerbang pertama yang ketat, pesan 403 (Forbidden) jika user terautentikasi tapi tidak berhak, 401 jika belum login (pelajaran 10).
## Alur Request yang Utuh
Middleware (HTTP raw) → Guard (izin akses) → Interceptor (sebelum handler) → Pipe (validasi) → Handler → Interceptor (setelah) → Exception Filter. Menghafal urutan ini penting: tiap lapisan punya pekerjaan dan level akses yang berbeda.`,
    expEn: `## Guards: The Gatekeepers
Guards decide WHO may run a route - running AFTER middleware, BEFORE pipes/handlers. Middleware is blind to handler context (it cannot see which @Roles exist), while guards can read handler metadata via Reflector. The rule of thumb: middleware for global HTTP concerns (logging, CORS), guards for route-specific authorization decisions.
## Reflector + @Roles: Metadata the Guard Reads
@Roles('admin') is just SetMetadata - attaching data to a handler without changing its behavior. RolesGuard reads that metadata (getAllAndOverride) and compares it with the user's role. Authorization logic is centralized in the guard, not scattered across controllers - adding a new role means changing one place.
## @UseGuards: Mounting Levels
Controller level: protects every route in the controller (in the example: @UseGuards(RolesGuard) above the class). Method level: only specific routes. Global: via the APP_GUARD provider. Defense flow: access is denied at the first strict gate, 403 (Forbidden) if the user is authenticated but unauthorized, 401 if not logged in (lesson 10).
## The Full Request Flow
Middleware (raw HTTP) → Guard (access permission) → Interceptor (before the handler) → Pipe (validation) → Handler → Interceptor (after) → Exception Filter. Memorizing this order matters: each layer has its own job and access level.`,
    chId: 'Perkuat sistem peran: (1) tambah decorator @Public() dan buat PublicGuard/atur guard agar mengizinkan route bertanda @Public tanpa cek peran, (2) tambah peran "editor" yang boleh mengubah (PUT) tapi tidak menghapus, (3) route baru GET /catatan/:id/detail lengkap khusus "admin", (4) uji dengan header X-User-Role: siswa, editor, admin - catat status HTTP tiap kombinasi.',
    chEn: 'Strengthen the role system: (1) add a @Public() decorator and adjust the guard to allow routes marked @Public without role checks, (2) add an "editor" role that may update (PUT) but not delete, (3) a new GET /catatan/:id/detail-full route for "admin" only, (4) test with X-User-Role headers: siswa, editor, admin - record the HTTP status for each combination.',
    sumId: 'Guard = gerbang izin sebelum handler. Reflector membaca metadata @Roles. @UseGuards di controller/method/global. 403 vs 401. Lanjut: autentikasi JWT.',
    sumEn: 'Guards = the permission gate before handlers. Reflector reads @Roles metadata. @UseGuards at controller/method/global level. 403 vs 401. Next: JWT authentication.',
  },
  {
    phase: 3, num: 10, topicId: 'auth-jwt',
    titleId: 'Autentikasi JWT', titleEn: 'JWT Authentication',
    codeFile: 'src/auth/auth.service.ts',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CatatanModule } from './catatan/catatan.module';

@Module({ imports: [AuthModule, CatatanModule] })
export class AppModule {}`,
      'src/auth/auth.module.ts': `import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    // JwtModule: konfigurasi token (secret dari env di produksi, pelajaran 12)
    JwtModule.register({
      secret: 'rahasia-jwt-ganti-di-env',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [JwtModule, JwtAuthGuard], // bisa dipakai modul lain
})
export class AuthModule {}`,
      'src/auth/auth.controller.ts': `import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // POST /api/auth/login
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }

  @Get('me') // route TERLINDUNGI: butuh token valid
  @UseGuards(JwtAuthGuard)
  me(@Req() req: any) {
    return { pesan: 'Kamu terautentikasi!', user: req.user };
  }
}`,
      'src/auth/auth.service.ts': `import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

// DEMO: user di memori. Di produksi: tabel users (pelajaran 7-8)
// dengan password di-hash bcrypt (jangan pernah simpan plain text!).
const USERS: User[] = [
  { id: 1, username: 'admin', password: 'rahasia123', role: 'admin' },
  { id: 2, username: 'siswa', password: 'rahasia123', role: 'siswa' },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(username: string, password: string) {
    const user = USERS.find(
      (u) => u.username === username && u.password === password,
    );
    if (!user) {
      throw new UnauthorizedException('Username atau password salah');
    }
    const payload = { sub: user.id, username: user.username, role: user.role };
    // Sign: server menandatangani token (stateless - server tak simpan sesi)
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, user: { id: user.id, username: user.username, role: user.role } };
  }

  cariById(id: number): User | undefined {
    return USERS.find((u) => u.id === id);
  }
}`,
      'src/auth/jwt-auth.guard.ts': `import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Guard JWT: memverifikasi token dari header Authorization
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header: string | undefined = request.headers['authorization'];
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token tidak ditemukan');
    }
    const token = header.slice(7); // buang prefix "Bearer "
    try {
      const payload = this.jwtService.verify(token);
      request.user = payload; // handler bisa akses via @Req()
      return true;
    } catch {
      throw new UnauthorizedException('Token tidak valid atau kedaluwarsa');
    }
  }
}`,
      'src/auth/dto/login.dto.ts': `import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}`,
      'src/catatan/catatan.module.ts': `import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CatatanController } from './catatan.controller';
import { CatatanService } from './catatan.service';

@Module({
  imports: [AuthModule], // butuh JwtAuthGuard yang di-export
  controllers: [CatatanController],
  providers: [CatatanService],
})
export class CatatanModule {}`,
      'src/catatan/catatan.controller.ts': `import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { CatatanService } from './catatan.service';
import { BuatCatatanDto } from './dto/buat-catatan.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('catatan')
export class CatatanController {
  constructor(private readonly catatanService: CatatanService) {}

  @Get()
  semua() {
    return this.catatanService.semua();
  }

  @Get(':id')
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.catatanService.detail(id);
  }

  @Post() // HANYA user login boleh membuat catatan
  @UseGuards(JwtAuthGuard)
  buat(@Body() dto: BuatCatatanDto, @Req() req: any) {
    return this.catatanService.buat(dto.judul, req.user.sub, dto.selesai);
  }
}`,
      'src/catatan/catatan.service.ts': `import { Injectable, NotFoundException } from '@nestjs/common';

export interface Catatan {
  id: number;
  userId: number;
  judul: string;
  selesai: boolean;
}

@Injectable()
export class CatatanService {
  private data: Catatan[] = [];
  private idBerikutnya = 1;

  semua(): Catatan[] {
    return this.data;
  }

  buat(judul: string, userId: number, selesai = false): Catatan {
    const baru: Catatan = { id: this.idBerikutnya++, userId, judul, selesai };
    this.data.push(baru);
    return baru;
  }

  detail(id: number): Catatan {
    const item = this.data.find((c) => c.id === id);
    if (!item) throw new NotFoundException('Catatan tidak ditemukan');
    return item;
  }
}`,
      'src/catatan/dto/buat-catatan.dto.ts': `import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class BuatCatatanDto {
  @IsString()
  @MinLength(3, { message: 'judul minimal 3 karakter' })
  @MaxLength(200)
  judul: string;

  @IsOptional()
  @IsBoolean()
  selesai?: boolean;
}`,
      'package.json': `{
  "name": "lesson10-nest-jwt",
  "version": "1.0.0",
  "description": "Autentikasi JWT dengan @nestjs/jwt",
  "scripts": {
    "start": "nest start --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/platform-express": "^10.4.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Menjelaskan alur JWT: login, token, verifikasi',
      'Menggunakan @nestjs/jwt untuk sign & verify token',
      'Menulis JwtAuthGuard untuk melindungi route',
      'Membaca user dari token di handler (req.user)',
    ],
    objEn: [
      'Explain the JWT flow: login, token, verification',
      'Use @nestjs/jwt for signing & verifying tokens',
      'Write a JwtAuthGuard to protect routes',
      'Read the user from the token in handlers (req.user)',
    ],
    expId: `## Alur JWT: Stateless Authentication
Login (POST /api/auth/login) → server memverifikasi kredensial → server SIGN token (payload + secret) → client menyimpan token dan mengirimnya di header Authorization: Bearer <token> di setiap request → JwtAuthGuard VERIFY token (tanpa menyentuh database!) → request.user diisi. Stateless: server tidak menyimpan sesi - token membawa identitasnya sendiri. Ini yang membuat API bisa di-scale horizontal tanpa shared session store.
## JwtModule: Konfigurasi Sekali
JwtModule.register({ secret, expiresIn: '1h' }) tersedia di seluruh AuthModule (dan modul yang mengimport-nya lewat exports). Payload yang umum: sub (user id), username, role. Jangan masukkan password atau data sensitif ke token - token bisa dibaca siapa pun (hanya TANDA TANGAN-nya yang aman).
## JwtAuthGuard: Verifikasi di Setiap Request
Guard membaca header Authorization, mengecek prefix Bearer, verify token dengan secret yang sama, lalu menempelkan payload ke request.user. Token expired/cacat = UnauthorizedException (401). Pola ini setara middleware butuhToken di track Node.js - tapi sekarang dibungkus arsitektur Nest dan bisa dikombinasikan dengan RolesGuard (pelajaran 9).
## Keamanan yang Wajib
Secret JWT = kartu identitas server: simpan di env, jangan pernah di git (pelajaran 12). Hash password dengan bcrypt/argon2 sebelum simpan. Masa berlaku pendek (1h) + refresh token untuk sesi panjang. HTTPS wajib di produksi - token lewat HTTP polos = token bocor.`,
    expEn: `## The JWT Flow: Stateless Authentication
Login (POST /api/auth/login) → the server verifies credentials → the server SIGNS a token (payload + secret) → the client stores the token and sends it as the Authorization: Bearer <token> header on every request → JwtAuthGuard VERIFIES the token (no database hit!) → request.user is populated. Stateless: the server stores no sessions - the token carries its own identity. This is what makes an API horizontally scalable without a shared session store.
## JwtModule: Configure Once
JwtModule.register({ secret, expiresIn: '1h' }) is available across AuthModule (and modules importing it via exports). Common payload: sub (user id), username, role. Never put passwords or sensitive data in the token - anyone can READ a token; only its SIGNATURE is protected.
## JwtAuthGuard: Verify on Every Request
The guard reads the Authorization header, checks the Bearer prefix, verifies the token with the same secret, then attaches the payload to request.user. An expired/broken token = UnauthorizedException (401). This pattern equals the butuhToken middleware in the Node.js track - but now wrapped in Nest architecture and combinable with RolesGuard (lesson 9).
## Non-Negotiable Security
The JWT secret = the server's identity card: keep it in env, never in git (lesson 12). Hash passwords with bcrypt/argon2 before storing. Short expiry (1h) + a refresh token for long sessions. HTTPS is mandatory in production - a token over plain HTTP is a leaked token.`,
    chId: 'Lengkapi sistem auth: (1) ganti penyimpanan password plain text dengan hash bcrypt (npm i bcryptjs) - bandingkan login lama vs baru, (2) tambah POST /api/auth/refresh yang mengeluarkan token baru dari token lama yang masih valid, (3) proteksi route DELETE /catatan/:id dengan JwtAuthGuard + RolesGuard sekaligus (kombinasi @UseGuards ganda), (4) uji: tanpa token (401), token salah (401), token benar (200).',
    chEn: 'Complete the auth system: (1) replace plain-text passwords with bcrypt hashing (npm i bcryptjs) - compare the old vs new login, (2) add POST /api/auth/refresh issuing a new token from a still-valid old one, (3) protect DELETE /catatan/:id with JwtAuthGuard + RolesGuard together (double @UseGuards), (4) test: no token (401), wrong token (401), valid token (200).',
    sumId: 'JWT = stateless auth. Login sign token, guard verify. request.user dari payload. Secret di env, password di-hash. Lanjut: interceptors.',
    sumEn: 'JWT = stateless auth. Login signs tokens, guards verify. request.user from the payload. Secrets in env, passwords hashed. Next: interceptors.',
  },
  {
    phase: 3, num: 11, topicId: 'interceptors',
    titleId: 'Interceptors: Logging & Transformasi', titleEn: 'Interceptors: Logging & Transformation',
    codeFile: 'src/common/transform.interceptor.ts',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/logging.interceptor';
import { TransformInterceptor } from './common/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // Interceptor GLOBAL: membungkus SEMUA handler
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());
  await app.listen(3000);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { CatatanModule } from './catatan/catatan.module';

@Module({ imports: [CatatanModule] })
export class AppModule {}`,
      'src/common/logging.interceptor.ts': `import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

// Interceptor 1: mengukur waktu dan mencatat request
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const mulai = Date.now();
    this.logger.log(\`\${request.method} \${request.url} - mulai\`);
    return next.handle().pipe(
      tap(() =>
        this.logger.log(
          \`\${request.method} \${request.url} - selesai dalam \${Date.now() - mulai}ms\`,
        ),
      ),
    );
  }
}`,
      'src/common/transform.interceptor.ts': `import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// Interceptor 2: membungkus respons menjadi { data, waktu, jalur }
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        data,
        waktu: new Date().toISOString(),
        jalur: context.switchToHttp().getRequest().url,
      })),
    );
  }
}`,
      'src/catatan/catatan.module.ts': `import { Module } from '@nestjs/common';
import { CatatanController } from './catatan.controller';
import { CatatanService } from './catatan.service';

@Module({ controllers: [CatatanController], providers: [CatatanService] })
export class CatatanModule {}`,
      'src/catatan/catatan.controller.ts': `import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CatatanService } from './catatan.service';
import { BuatCatatanDto } from './dto/buat-catatan.dto';

@Controller('catatan')
export class CatatanController {
  constructor(private readonly catatanService: CatatanService) {}

  @Get()
  semua() {
    return this.catatanService.semua();
  }

  @Get(':id')
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.catatanService.detail(id);
  }

  @Post()
  buat(@Body() dto: BuatCatatanDto) {
    return this.catatanService.buat(dto.judul, dto.selesai);
  }
}`,
      'src/catatan/catatan.service.ts': `import { Injectable, NotFoundException } from '@nestjs/common';

export interface Catatan {
  id: number;
  judul: string;
  selesai: boolean;
}

@Injectable()
export class CatatanService {
  private data: Catatan[] = [{ id: 1, judul: 'Catatan pertama', selesai: false }];
  private idBerikutnya = 2;

  semua(): Catatan[] {
    return this.data;
  }

  detail(id: number): Catatan {
    const item = this.data.find((c) => c.id === id);
    if (!item) throw new NotFoundException('Catatan tidak ditemukan');
    return item;
  }

  buat(judul: string, selesai = false): Catatan {
    const baru: Catatan = { id: this.idBerikutnya++, judul, selesai };
    this.data.push(baru);
    return baru;
  }
}`,
      'src/catatan/dto/buat-catatan.dto.ts': `import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class BuatCatatanDto {
  @IsString()
  @MinLength(3, { message: 'judul minimal 3 karakter' })
  @MaxLength(200)
  judul: string;

  @IsOptional()
  @IsBoolean()
  selesai?: boolean;
}`,
      'package.json': `{
  "name": "lesson11-nest-interceptors",
  "version": "1.0.0",
  "description": "Interceptors: logging & transformasi respons",
  "scripts": {
    "start": "nest start --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Menjelaskan interceptor: membungkus handler sebelum & sesudah',
      'Menulis LoggingInterceptor dengan RxJS (tap)',
      'Menulis TransformInterceptor untuk membentuk respons',
      'Memilih interceptor vs middleware vs guard vs pipe',
    ],
    objEn: [
      'Explain interceptors: wrapping handlers before & after',
      'Write a LoggingInterceptor with RxJS (tap)',
      'Write a TransformInterceptor to shape responses',
      'Choose between interceptor vs middleware vs guard vs pipe',
    ],
    expId: `## Interceptor: Dua Sisi Handler
Interceptor membungkus handler: kode sebelum next.handle() = SEBELUM handler, next.handle().pipe() = SESUDAH handler. Kuncinya RxJS: respons handler adalah stream observable - bisa diamati (tap), diubah (map), ditunda (delay), di-cache, bahkan dibatalkan. Inilah perbedaan dari middleware: interceptor punya akses KE RESPONS setelah handler selesai.
## Logging & Waktu Eksekusi
LoggingInterceptor mencatat metode, URL, dan durasi: mulai sebelum handler, selesai lewat tap() yang membaca Date.now() setelah stream selesai. Tanpa interceptor, ini harus ditulis ulang di setiap handler - dengan interceptor, satu kali untuk seluruh aplikasi.
## TransformInterceptor: Bentuk Respons yang Konsisten
map() mengubah hasil handler menjadi bentuk baku { data, waktu, jalur }. Konsistensi respons = frontend tidak perlu menebak bentuk tiap endpoint. Interceptor juga tempat yang tepat untuk: wrapping error, menambahkan header, paginasi global, cache (dengan RxJS), dan timeouts.
## Kapan Pakai Apa
Middleware: HTTP raw (body, headers, CORS) - di luar pipeline Nest. Guard: boleh/tidaknya akses. Pipe: validasi & transformasi INPUT. Interceptor: sebelum/sesudah handler, memodifikasi RESPONS atau perilaku stream. Aturan praktik: jika butuh hasil handler → interceptor; jika hanya butuh izin → guard; jika butuh HTTP murni → middleware.`,
    expEn: `## Interceptors: The Two Sides of a Handler
An interceptor wraps a handler: code before next.handle() = BEFORE the handler, next.handle().pipe() = AFTER the handler. The key is RxJS: the handler's response is an observable stream - observable (tap), transformable (map), delayable (delay), cacheable, even cancellable. This is the difference from middleware: interceptors see THE RESPONSE after the handler finishes.
## Logging & Execution Time
LoggingInterceptor records method, URL, and duration: starting before the handler, finishing via tap() reading Date.now() once the stream completes. Without interceptors this must be rewritten in every handler - with one, it applies once to the whole app.
## TransformInterceptor: A Consistent Response Shape
map() turns the handler result into a standard shape { data, waktu, jalur }. Consistent responses = the frontend never guesses the shape of each endpoint. Interceptors are also the right place for: error wrapping, adding headers, global pagination, caching (with RxJS), and timeouts.
## When to Use What
Middleware: raw HTTP (body, headers, CORS) - outside the Nest pipeline. Guards: allowed or not. Pipes: INPUT validation & transformation. Interceptors: before/after the handler, modifying RESPONSES or stream behavior. Rule of thumb: need the handler result → interceptor; only permission → guard; pure HTTP → middleware.`,
    chId: 'Eksperimen dengan interceptor: (1) buat TimeoutInterceptor yang membatalkan request > 3 detik (race dengan timer RxJS), (2) buat CacheInterceptor sederhana: Map<url, data>, kembalikan cache jika ada (map dengan kondisi), (3) tambah header X-Response-Time di TransformInterceptor, (4) pasang interceptor hanya di satu route (@UseInterceptors) dan bandingkan perilakunya dengan global.',
    chEn: 'Experiment with interceptors: (1) build a TimeoutInterceptor cancelling requests longer than 3 seconds (race with an RxJS timer), (2) build a simple CacheInterceptor: Map<url, data>, return the cache when present (conditional map), (3) add an X-Response-Time header in TransformInterceptor, (4) mount an interceptor on a single route (@UseInterceptors) and compare its behavior with the global one.',
    sumId: 'Interceptor = dua sisi handler via RxJS. tap untuk observasi, map untuk transformasi. Konsistensi respons. Pilih alat yang tepat. Lanjut: config, Swagger & logging.',
    sumEn: 'Interceptors = both sides of a handler via RxJS. tap to observe, map to transform. Consistent responses. Choose the right tool. Next: config, Swagger & logging.',
  },
  {
    phase: 3, num: 12, topicId: 'config-swagger-logging',
    titleId: 'Config, Swagger & Logging', titleEn: 'Config, Swagger & Logging',
    codeFile: 'src/main.ts',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger: dokumentasi API OTOMATIS dari decorators + DTO
  const config = new DocumentBuilder()
    .setTitle('Catatan API')
    .setDescription('API catatan - materi NestJS Tryngo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const logger = new Logger('Bootstrap');
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  logger.log(\`API aktif di http://localhost:\${port}/api\`);
  logger.log(\`Dokumentasi Swagger: http://localhost:\${port}/docs\`);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatatanModule } from './catatan/catatan.module';

@Module({
  imports: [
    // ConfigModule GLOBAL: membaca .env, tersedia di semua modul
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CatatanModule,
  ],
})
export class AppModule {}`,
      'src/catatan/catatan.module.ts': `import { Module } from '@nestjs/common';
import { CatatanController } from './catatan.controller';
import { CatatanService } from './catatan.service';

@Module({ controllers: [CatatanController], providers: [CatatanService] })
export class CatatanModule {}`,
      'src/catatan/catatan.controller.ts': `import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatatanService } from './catatan.service';
import { BuatCatatanDto } from './dto/buat-catatan.dto';

@ApiTags('catatan') // grup di dokumen Swagger
@Controller('catatan')
export class CatatanController {
  constructor(private readonly catatanService: CatatanService) {}

  @Get()
  @ApiOperation({ summary: 'Daftar semua catatan' })
  semua() {
    return this.catatanService.semua();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail satu catatan' })
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.catatanService.detail(id);
  }

  @Post()
  @ApiOperation({ summary: 'Buat catatan baru' })
  buat(@Body() dto: BuatCatatanDto) {
    return this.catatanService.buat(dto.judul, dto.selesai);
  }
}`,
      'src/catatan/catatan.service.ts': `import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface Catatan {
  id: number;
  judul: string;
  selesai: boolean;
}

@Injectable()
export class CatatanService {
  // Nest Logger: level (log/warn/error) + nama context
  private readonly logger = new Logger(CatatanService.name);
  private data: Catatan[] = [{ id: 1, judul: 'Belajar NestJS', selesai: false }];
  private idBerikutnya = 2;

  constructor(private readonly configService: ConfigService) {
    const appName = this.configService.get<string>('APP_NAME', 'Catatan API');
    this.logger.log(\`Service \${appName} siap\`);
  }

  semua(): Catatan[] {
    return this.data;
  }

  detail(id: number): Catatan {
    const item = this.data.find((c) => c.id === id);
    if (!item) {
      this.logger.warn(\`Catatan \${id} tidak ditemukan\`);
      throw new NotFoundException('Catatan tidak ditemukan');
    }
    return item;
  }

  buat(judul: string, selesai = false): Catatan {
    const baru: Catatan = { id: this.idBerikutnya++, judul, selesai };
    this.data.push(baru);
    this.logger.log(\`Catatan baru: \${judul}\`);
    return baru;
  }
}`,
      'src/catatan/dto/buat-catatan.dto.ts': `import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class BuatCatatanDto {
  @ApiProperty({ example: 'Belajar Swagger', description: 'Judul catatan' })
  @IsString()
  @MinLength(3, { message: 'judul minimal 3 karakter' })
  @MaxLength(200)
  judul: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  selesai?: boolean;
}`,
      '.env.example': `# Salin ke .env lalu isi nilai sebenarnya
PORT=3000
APP_NAME=Catatan API
JWT_SECRET=rahasia-ganti-di-produksi`,
      'package.json': `{
  "name": "lesson12-nest-config-swagger",
  "version": "1.0.0",
  "description": "Config, Swagger & logging terpusat",
  "scripts": {
    "start": "nest start --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/config": "^3.2.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "@nestjs/swagger": "^7.4.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Mengelola konfigurasi dengan @nestjs/config',
      'Menghasilkan dokumentasi API dengan Swagger/OpenAPI',
      'Menggunakan Nest Logger dengan level dan context',
      'Merapikan produksi: env, validasi config, logging',
    ],
    objEn: [
      'Manage configuration with @nestjs/config',
      'Generate API documentation with Swagger/OpenAPI',
      'Use the Nest Logger with levels and contexts',
      'Tidy production: env, config validation, logging',
    ],
    expId: `## ConfigModule: Satu Tempat untuk Semua Pengaturan
ConfigModule.forRoot({ isGlobal: true }) membaca .env dan membuatnya tersedia di seluruh aplikasi via ConfigService (get<string>('PORT')). Nilai yang tidak ada bisa diberi default (get('APP_NAME', 'Catatan API')). Aturan produksi: tidak ada angka ajaib, tidak ada secret di kode - semuanya env, di-version hanya .env.example (template tanpa nilai asli).
## Swagger: Dokumentasi yang Tidak Pernah Kedaluwarsa
DocumentBuilder + SwaggerModule menghasilkan halaman /docs dari KODE Anda: decorators controller (@ApiTags, @ApiOperation) dan DTO (@ApiProperty). Dokumentasi selalu sinkron dengan implementasi - karena ia LAHIR dari implementasi. Frontend team, tester, dan developer lain bisa membaca kontrak API tanpa bertanya. OpenAPI = standar yang bisa diekspor (json/yaml) untuk codegen.
## Nest Logger: Bukan console.log
Logger memberikan: context (CatatanService), level (log/warn/error/fatal), dan format konsisten. warn/error bisa disambungkan ke sistem monitoring (Sentry, Grafana) di produksi - console.log polos tidak punya level sehingga tidak bisa di-filter. Aturan: log.info untuk jejak, warn untuk anomaly, error untuk kegagalan.
## Mengapa Ketiganya Satu Pelajaran
Config + Swagger + Logging adalah "infrastruktur yang terlihat": tanpa mereka aplikasi jalan, dengan mereka aplikasi DAPAT DIOPERASIKAN - siap dipakai tim, siap di-debug di produksi, siap didokumentasikan. Ketiganya dipasang SEKALI di awal proyek, dan setiap proyek Nest produksi memilikinya.`,
    expEn: `## ConfigModule: One Place for Every Setting
ConfigModule.forRoot({ isGlobal: true }) reads .env and makes it available app-wide via ConfigService (get<string>('PORT')). Missing values get defaults (get('APP_NAME', 'Catatan API')). Production rules: no magic numbers, no secrets in code - everything in env, versioning only .env.example (a template without real values).
## Swagger: Documentation That Never Goes Stale
DocumentBuilder + SwaggerModule produce the /docs page FROM your code: controller decorators (@ApiTags, @ApiOperation) and DTOs (@ApiProperty). Docs are always in sync with the implementation - because they are BORN from it. Frontend teams, testers, and other developers read the API contract without asking. OpenAPI is an exportable standard (json/yaml) for codegen.
## Nest Logger: Not console.log
Logger provides: context (CatatanService), levels (log/warn/error/fatal), and consistent formatting. warn/error can feed monitoring systems (Sentry, Grafana) in production - plain console.log has no levels, so it cannot be filtered. Rules: info logs for traces, warn for anomalies, error for failures.
## Why All Three in One Lesson
Config + Swagger + Logging are "visible infrastructure": without them the app runs, with them the app is OPERABLE - ready for a team, debuggable in production, documented. All three are mounted ONCE at the project start, and every production Nest project has them.`,
    chId: 'Rapikan konfigurasi: (1) pindahkan secret JWT (pelajaran 10) ke .env dan baca lewat ConfigService (JwtModule.registerAsync), (2) aktifkan validasi config: buat fungsi validasi yang melempar error jika PORT bukan angka, (3) tambah @ApiBearerAuth + @ApiResponse untuk route yang butuh token, (4) tambah query param ?q= di GET /catatan dan dokumentasikan dengan @ApiQuery.',
    chEn: 'Tidy the configuration: (1) move the JWT secret (lesson 10) into .env and read it via ConfigService (JwtModule.registerAsync), (2) enable config validation: write a validation function throwing an error when PORT is not a number, (3) add @ApiBearerAuth + @ApiResponse for token-protected routes, (4) add a ?q= query param to GET /catatan and document it with @ApiQuery.',
    sumId: 'ConfigModule = env terpusat. Swagger = docs lahir dari kode. Nest Logger = level + context. Produksi siap. Lanjut: testing.',
    sumEn: 'ConfigModule = centralized env. Swagger = docs born from code. Nest Logger = levels + contexts. Production-ready. Next: testing.',
  },
];

// ===== PHASE 4: PRODUCTION & CAPSTONE (lessons 13-16) =====
const LESSONS_P4 = [
  {
    phase: 4, num: 13, topicId: 'testing',
    titleId: 'Testing: Unit & E2E', titleEn: 'Testing: Unit & E2E',
    codeFile: 'src/catatan/catatan.service.spec.ts',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { CatatanModule } from './catatan/catatan.module';

@Module({ imports: [CatatanModule] })
export class AppModule {}`,
      'src/catatan/catatan.module.ts': `import { Module } from '@nestjs/common';
import { CatatanController } from './catatan.controller';
import { CatatanService } from './catatan.service';

@Module({ controllers: [CatatanController], providers: [CatatanService] })
export class CatatanModule {}`,
      'src/catatan/catatan.controller.ts': `import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CatatanService } from './catatan.service';
import { BuatCatatanDto } from './dto/buat-catatan.dto';

@Controller('catatan')
export class CatatanController {
  constructor(private readonly catatanService: CatatanService) {}

  @Get()
  semua() {
    return this.catatanService.semua();
  }

  @Get(':id')
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.catatanService.detail(id);
  }

  @Post()
  buat(@Body() dto: BuatCatatanDto) {
    return this.catatanService.buat(dto.judul, dto.selesai);
  }
}`,
      'src/catatan/catatan.service.ts': `import { Injectable, NotFoundException } from '@nestjs/common';

export interface Catatan {
  id: number;
  judul: string;
  selesai: boolean;
}

@Injectable()
export class CatatanService {
  private data: Catatan[] = [{ id: 1, judul: 'Catatan awal', selesai: false }];
  private idBerikutnya = 2;

  semua(): Catatan[] {
    return this.data;
  }

  detail(id: number): Catatan {
    const item = this.data.find((c) => c.id === id);
    if (!item) throw new NotFoundException('Catatan tidak ditemukan');
    return item;
  }

  buat(judul: string, selesai = false): Catatan {
    const baru: Catatan = { id: this.idBerikutnya++, judul, selesai };
    this.data.push(baru);
    return baru;
  }

  tandaiSelesai(id: number): Catatan {
    const item = this.data.find((c) => c.id === id);
    if (!item) throw new NotFoundException('Catatan tidak ditemukan');
    item.selesai = true;
    return item;
  }
}`,
      'src/catatan/dto/buat-catatan.dto.ts': `import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class BuatCatatanDto {
  @IsString()
  @MinLength(3, { message: 'judul minimal 3 karakter' })
  @MaxLength(200)
  judul: string;

  @IsOptional()
  @IsBoolean()
  selesai?: boolean;
}`,
      'src/catatan/catatan.service.spec.ts': `import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CatatanService } from './catatan.service';

// Unit test: menguji service TANPA HTTP, TANPA database
describe('CatatanService', () => {
  let service: CatatanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatatanService],
    }).compile();
    service = module.get<CatatanService>(CatatanService);
  });

  it('membuat catatan baru dengan selesai=false', () => {
    const catatan = service.buat('Tes unit pertama');
    expect(catatan.judul).toBe('Tes unit pertama');
    expect(catatan.selesai).toBe(false);
  });

  it('melempar NotFoundException untuk id yang tidak ada', () => {
    expect(() => service.detail(999)).toThrow(NotFoundException);
  });

  it('menandai catatan selesai', () => {
    const dibuat = service.buat('Kerjakan PR');
    const selesai = service.tandaiSelesai(dibuat.id);
    expect(selesai.selesai).toBe(true);
  });
});`,
      'test/app.e2e-spec.ts': `import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

// E2E test: aplikasi utuh lewat HTTP (mirip user asli)
describe('App (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /api/catatan mengembalikan array', () => {
    return request(app.getHttpServer())
      .get('/api/catatan')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('POST /api/catatan valid -> 201', () => {
    return request(app.getHttpServer())
      .post('/api/catatan')
      .send({ judul: 'Catatan dari e2e' })
      .expect(201);
  });

  it('POST /api/catatan tanpa judul -> 400', () => {
    return request(app.getHttpServer()).post('/api/catatan').send({}).expect(400);
  });
});`,
      'test/jest-e2e.json': `{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\\\.(t|j)s$": "ts-jest"
  }
}`,
      'package.json': `{
  "name": "lesson13-nest-testing",
  "version": "1.0.0",
  "description": "Unit & E2E testing dengan Jest + Supertest",
  "scripts": {
    "start": "nest start --watch",
    "test": "jest --watchAll=false",
    "test:e2e": "jest --config ./test/jest-e2e.json --watchAll=false"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "@nestjs/testing": "^10.4.0",
    "@types/jest": "^29.5.0",
    "@types/supertest": "^6.0.0",
    "jest": "^29.7.0",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Membedakan unit test dan e2e test',
      'Menulis unit test service dengan Test.createTestingModule',
      'Menulis e2e test dengan Supertest (HTTP asli)',
      'Menjalankan test secara otomatis dan di CI',
    ],
    objEn: [
      'Distinguish unit tests and e2e tests',
      'Write service unit tests with Test.createTestingModule',
      'Write e2e tests with Supertest (real HTTP)',
      'Run tests automatically and in CI',
    ],
    expId: `## Unit Test: Service Tanpa Aplikasi
Test.createTestingModule({ providers: [CatatanService] }).compile() membangun HANYA service - tanpa HTTP, tanpa database, tanpa modul lain. Cepat dan isolatif: kegagalan pasti dari kode yang diuji, bukan tetangganya. Sebelum tiap test, module dibuat ulang (beforeEach) - tiap test dimulai dari keadaan bersih, tidak bergantung urutan.
## E2E Test: Aplikasi Utuh Lewat HTTP
app.init() menyalakan aplikasi asli di memori; Supertest (request(app.getHttpServer())) mengirim HTTP sungguhan: GET, POST, header, status code, body. Di sini ValidationPipe global ikut bekerja - POST tanpa judul dijamin 400. E2E lambat tapi jujur: ia menguji kontrak yang DILIHAT client.
## Piramida Test: Banyak Unit, Sedikit E2E
Paling bawah: unit test (puluhan, cepat). Tengah: integration test (modul + database nyata). Atas: e2e (beberapa, jalan penuh). Arahkan sebagian besar usaha ke unit test - e2e yang banyak membuat suite lambat dan rapuh. Nest scaffolding membaginya rapi: *.spec.ts untuk unit, test/*.e2e-spec.ts untuk e2e.
## Test di CI: Pintu Gerbang Produksi
Test yang tidak dijalankan otomatis = test yang perlahan diabaikan. Pasang npm test di pipeline CI (pelajaran 15): setiap push yang memecahkan test menghentikan deployment. Ini budaya bootcamp: merah di CI lebih murah daripada insiden di produksi.`,
    expEn: `## Unit Tests: The Service Without the App
Test.createTestingModule({ providers: [CatatanService] }).compile() builds ONLY the service - no HTTP, no database, no other modules. Fast and isolated: failures are guaranteed to come from the code under test, not its neighbors. Before each test the module is re-created (beforeEach) - every test starts clean, never depending on order.
## E2E Tests: The Whole App Over HTTP
app.init() boots the real application in memory; Supertest (request(app.getHttpServer())) sends real HTTP: GET, POST, headers, status codes, bodies. The global ValidationPipe works here too - POST without judul is guaranteed to return 400. E2E is slow but honest: it tests the contract the CLIENT sees.
## The Test Pyramid: Many Units, Few E2E
Bottom: unit tests (dozens, fast). Middle: integration tests (modules + a real database). Top: e2e (a few, running end-to-end). Direct most effort at unit tests - too many e2e tests make the suite slow and brittle. Nest scaffolding separates them cleanly: *.spec.ts for unit, test/*.e2e-spec.ts for e2e.
## Tests in CI: The Production Gate
Tests that are not automated = tests that slowly get ignored. Wire npm test into the CI pipeline (lesson 15): every push that breaks a test stops the deployment. This is bootcamp culture: red in CI is cheaper than an incident in production.`,
    chId: 'Perkuat suite test: (1) tambah unit test untuk tandaiSelesai dengan id tidak ada (harus throw), (2) tambah e2e test: PUT /catatan/:id/selesai (tambah route-nya dulu di controller) → 200 dan body selesai=true, (3) buat test untuk ValidationPipe: kirim judul 2 karakter → 400, (4) refactor service agar data awal kosong dan seed lewat method - jelaskan kenapa test lebih stabil dengan pola ini.',
    chEn: 'Strengthen the test suite: (1) add a unit test for tandaiSelesai with a missing id (must throw), (2) add an e2e test: PUT /catatan/:id/selesai (add the route to the controller first) → 200 and body selesai=true, (3) write a ValidationPipe test: send a 2-character judul → 400, (4) refactor the service so initial data is empty and seeding happens via a method - explain why tests are more stable with this pattern.',
    sumId: 'Unit = cepat & isolatif. E2E = kontrak asli lewat HTTP. Piramida: banyak unit, sedikit e2e. CI = pintu gerbang. Lanjut: WebSockets.',
    sumEn: 'Unit = fast & isolated. E2E = the real contract over HTTP. Pyramid: many units, few e2e. CI = the gate. Next: WebSockets.',
  },
  {
    phase: 4, num: 14, topicId: 'websockets',
    titleId: 'WebSockets: Chat Realtime', titleEn: 'WebSockets: Real-time Chat',
    codeFile: 'src/chat/chat.gateway.ts',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';

@Module({ imports: [ChatModule] })
export class AppModule {}`,
      'src/chat/chat.module.ts': `import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Module({ providers: [ChatGateway] })
export class ChatModule {}`,
      'src/chat/chat.gateway.ts': `import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// Gateway: endpoint WebSocket - komunikasi dua arah & realtime
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server; // server Socket.IO, bisa broadcast ke semua client

  handleConnection(client: Socket) {
    console.log(\`Client terhubung: \${client.id}\`);
  }

  handleDisconnect(client: Socket) {
    console.log(\`Client terputus: \${client.id}\`);
  }

  @SubscribeMessage('kirimPesan')
  kirimPesan(@MessageBody() pesan: string): void {
    // broadcast ke SEMUA client yang terhubung
    this.server.emit('pesanBaru', {
      dari: 'server',
      pesan,
      waktu: new Date().toISOString(),
    });
  }
}`,
      'public/chat.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Chat Realtime NestJS</title>
  <style>
    body { font-family: system-ui; max-width: 480px; margin: 2rem auto; padding: 0 1rem; }
    #daftar { border: 1px solid #ccc; height: 240px; overflow-y: auto; padding: 8px; border-radius: 8px; }
    .pesan { margin: 4px 0; }
    input, button { padding: 8px; font-size: 1rem; }
  </style>
</head>
<body>
  <h1>Chat Realtime</h1>
  <div id="daftar"></div>
  <input id="input" placeholder="Ketik pesan..." />
  <button onclick="kirim()">Kirim</button>

  <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
  <script>
    // Terhubung ke gateway Socket.IO di localhost:3000
    const socket = io('http://localhost:3000', { transports: ['websocket'] });
    const daftar = document.getElementById('daftar');

    // Dengarkan event 'pesanBaru' dari server
    socket.on('pesanBaru', (data) => {
      const div = document.createElement('div');
      div.className = 'pesan';
      div.textContent = data.waktu.slice(11, 19) + ' - ' + data.pesan;
      daftar.appendChild(div);
    });

    function kirim() {
      const input = document.getElementById('input');
      if (input.value.trim()) {
        socket.emit('kirimPesan', input.value.trim()); // kirim event ke server
        input.value = '';
      }
    }
  </script>
</body>
</html>`,
      'package.json': `{
  "name": "lesson14-nest-websockets",
  "version": "1.0.0",
  "description": "WebSockets: chat realtime dengan Socket.IO",
  "scripts": {
    "start": "nest start --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "@nestjs/platform-socket.io": "^10.4.0",
    "@nestjs/websockets": "^10.4.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "socket.io": "^4.7.5"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Menjelaskan WebSocket vs HTTP (dua arah vs satu arah)',
      'Menulis gateway dengan @WebSocketGateway',
      'Menangani event dengan @SubscribeMessage',
      'Broadcast realtime ke semua client',
    ],
    objEn: [
      'Explain WebSocket vs HTTP (two-way vs one-way)',
      'Write a gateway with @WebSocketGateway',
      'Handle events with @SubscribeMessage',
      'Broadcast in real time to all clients',
    ],
    expId: `## WebSocket vs HTTP: Kenapa Harus Dua Arah
HTTP: client minta, server jawab, selesai - server TIDAK BISA menghubungi client duluan. Chat, notifikasi, live dashboard butuh push: server harus mengirim SEJAK ADA peristiwa. WebSocket = koneksi TCP yang tetap terbuka, dua arah, latensi rendah. Socket.IO (di belakang @nestjs/websockets) menambahkan fallback (reconnect otomatis, room, broadcast).
## Gateway: WebSocket Sebagai Provider Nest
ChatGateway didaftarkan sebagai provider biasa (di ChatModule) - tapi dengan decorators ia menjadi endpoint WebSocket. @WebSocketServer() menyuntikkan instance Socket.IO (server). handleConnection/handleDisconnect = lifecycle: siapa masuk/keluar. Gateway juga bisa inject service lain - berbagi logika bisnis dengan HTTP (misal: simpan pesan ke database).
## @SubscribeMessage: Event yang Dikirim Client
Client mengirim socket.emit('kirimPesan', 'halo') → server menjalankan kirimPesan(@MessageBody() pesan). Server lalu broadcast: server.emit('pesanBaru', data) ke SEMUA client - setiap client mendengarkan dengan socket.on('pesanBaru', ...). Ini pola chat klasik; untuk chat privat ada room (client.join('ruangA') + server.to('ruangA').emit(...)).
## Kapan WebSocket, Kapan REST
REST untuk permintaan-jawaban (CRUD, autentikasi). WebSocket untuk data yang BERUBAH tanpa diminta: chat, kolaborasi, notification, live tracking, game. Aplikasi nyata memakai KEDUANYA: REST untuk API, WebSocket untuk aliran realtime - seperti di chat dengan riwayat (REST) + pesan baru (WS).`,
    expEn: `## WebSocket vs HTTP: Why Two-Way Matters
HTTP: the client asks, the server answers, done - the server CANNOT reach out first. Chat, notifications, and live dashboards need push: the server must send as soon as something happens. WebSocket = a TCP connection that stays open, two-way, low latency. Socket.IO (behind @nestjs/websockets) adds resilience (auto-reconnect, rooms, broadcast).
## Gateways: WebSocket as a Nest Provider
ChatGateway is registered as a regular provider (in ChatModule) - but with decorators it becomes a WebSocket endpoint. @WebSocketServer() injects the Socket.IO server instance. handleConnection/handleDisconnect = lifecycle: who joined/left. Gateways can also inject other services - sharing business logic with HTTP (e.g., saving messages to a database).
## @SubscribeMessage: Events the Client Sends
The client sends socket.emit('kirimPesan', 'halo') → the server runs kirimPesan(@MessageBody() pesan). The server then broadcasts: server.emit('pesanBaru', data) to ALL clients - each client listens with socket.on('pesanBaru', ...). This is the classic chat pattern; for private chat there are rooms (client.join('ruangA') + server.to('ruangA').emit(...)).
## When WebSocket, When REST
REST for request-response (CRUD, authentication). WebSocket for data that CHANGES without being asked: chat, collaboration, notifications, live tracking, games. Real apps use BOTH: REST for the API, WebSocket for the real-time stream - like a chat with history (REST) plus new messages (WS).`,
    chId: 'Perluas chat: (1) tambah room: event joinRuang (client.join) dan kirimPesanKeRuang yang broadcast ke room tertentu (server.to(ruang).emit), (2) server menyapa user baru dengan event selamatDatang ke client tersebut SAJA (client.emit, bukan server.emit), (3) integrasikan JwtAuthGuard: verifikasi token saat koneksi (guard gateway via APP_GUARD atau validasi manual di handleConnection), (4) tampilkan jumlah client online di UI (event dengan server.engine.clientsCount).',
    chEn: 'Extend the chat: (1) add rooms: a joinRuang event (client.join) and kirimPesanKeRuang broadcasting to one room (server.to(ruang).emit), (2) have the server welcome a new user with a selamatDatang event to THAT client only (client.emit, not server.emit), (3) integrate JwtAuthGuard: verify the token on connection (gateway guard via APP_GUARD or manual validation in handleConnection), (4) show the online client count in the UI (an event with server.engine.clientsCount).',
    sumId: 'WebSocket = dua arah, realtime. Gateway = provider ber-decorator. Broadcast & room. REST + WS berdampingan. Lanjut: Docker & CI/CD.',
    sumEn: 'WebSocket = two-way, realtime. Gateways = decorated providers. Broadcast & rooms. REST + WS side by side. Next: Docker & CI/CD.',
  },
  {
    phase: 4, num: 15, topicId: 'docker-cicd',
    titleId: 'Docker & CI/CD', titleEn: 'Docker & CI/CD',
    codeFile: 'Dockerfile',
    files: {
      'Dockerfile': `# Stage 1: build (toolchain lengkap)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: runtime - image minimal tanpa toolchain build
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
EXPOSE 3000
CMD ["node", "dist/main"]`,
      'docker-compose.yml': `services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      PORT: 3000
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: tryngo
      POSTGRES_PASSWORD: rahasia
      POSTGRES_DB: tryngo
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U tryngo"]
      interval: 5s
      timeout: 3s
      retries: 5
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:`,
      '.dockerignore': `node_modules
dist
.env`,
      '.github/workflows/ci.yml': `name: CI

on: [push]

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npm test`,
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // PORT dari environment (diatur Docker/CI, bukan hardcode)
  await app.listen(process.env.PORT || 3000);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({ controllers: [AppController], providers: [AppService] })
export class AppModule {}`,
      'src/app.controller.ts': `import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return this.appService.health();
  }
}`,
      'src/app.service.ts': `import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health() {
    return { status: 'ok', waktu: new Date().toISOString() };
  }
}`,
      'package.json': `{
  "name": "lesson15-nest-docker-cicd",
  "version": "1.0.0",
  "description": "Docker multi-stage + CI/CD GitHub Actions",
  "scripts": {
    "build": "nest build",
    "start": "nest start --watch",
    "test": "jest --watchAll=false"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Membuat Dockerfile multi-stage untuk image kecil',
      'Menyusun stack dengan docker-compose (api + db)',
      'Menulis workflow GitHub Actions (CI)',
      'Menjelaskan alur: build, test, push image, deploy',
    ],
    objEn: [
      'Build a multi-stage Dockerfile for small images',
      'Compose a stack with docker-compose (api + db)',
      'Write a GitHub Actions workflow (CI)',
      'Explain the flow: build, test, push image, deploy',
    ],
    expId: `## Multi-stage Build: Image Kecil, Sama Hasilnya
Stage 1 (build): node:20-alpine + toolchain, npm ci, npm run build → dist/. Stage 2 (runtime): node:20-alpine KOSONG, hanya menyalin dist + node_modules produksi. Hasil: image tanpa TypeScript compiler, tanpa source - lebih kecil dan permukaan serangan lebih sempit. Aturan Docker yang sama dari track Docker berlaku: dependency duluan (cache), source belakangan.
## docker-compose: Satu Perintah, Satu Stack
api (build .) + db (postgres:16-alpine) - jaringan otomatis, api memanggil db dengan nama service. depends_on + healthcheck (pg_isready) menjamin database SIAP sebelum api start - bukan sekadar urutan start. Volume db-data membuat data bertahan saat container dihancurkan. Satu docker compose up menjalankan seluruh aplikasi.
## GitHub Actions: Pintu Gerbang Otomatis
Workflow CI: setiap push → checkout → setup-node → npm ci → npm run build → npm test. Build rusak atau test merah = alur BERHENTI di sini, tidak pernah sampai deploy. CI adalah "reviewer tak kenal lelah": ia menjalankan hal yang sama persis di tiap push, tanpa lupa dan tanpa lelah.
## Dari CI ke Produksi
Pola lengkap: CI (build + test) → build image Docker → push ke registry (Docker Hub/GHCR) → deploy ke platform (Render/Railway/Fly/ECS) dengan image itu. Kode yang SAMA diuji di CI dan dijalankan di produksi - tidak ada lagi "di laptop saya jalan". Ini juga alur standar track Node.js; Nest menambahkan langkah nest build.`,
    expEn: `## Multi-stage Builds: Small Image, Same Result
Stage 1 (build): node:20-alpine + the toolchain, npm ci, npm run build → dist/. Stage 2 (runtime): an EMPTY node:20-alpine, copying only dist + production node_modules. Result: an image without the TypeScript compiler and without sources - smaller and with a smaller attack surface. The same Docker rules from the Docker track apply: dependencies first (caching), sources later.
## docker-compose: One Command, One Stack
api (build .) + db (postgres:16-alpine) - automatic network, api reaches db by service name. depends_on + healthcheck (pg_isready) guarantee the database is READY before the api starts - not just the start order. The db-data volume keeps data alive when containers are destroyed. One docker compose up runs the whole application.
## GitHub Actions: The Automatic Gate
CI workflow: every push → checkout → setup-node → npm ci → npm run build → npm test. A broken build or a red test = the flow STOPS here, never reaching deploy. CI is a "tireless reviewer": it runs the exact same thing on every push, without forgetting and without tiring.
## From CI to Production
The full pattern: CI (build + test) → build the Docker image → push to a registry (Docker Hub/GHCR) → deploy to a platform (Render/Railway/Fly/ECS) with that image. The SAME code tested in CI runs in production - no more "it works on my laptop". This is also the standard flow from the Node.js track; Nest adds the nest build step.`,
    chId: 'Perkuat pipeline: (1) tambah stage deploy di workflow: push image ke GHCR (actions: docker/build-push-action) jika branch main, (2) tambah cache npm (actions/cache) agar npm ci lebih cepat, (3) ubah healthcheck API di compose: wget ke /api/health dengan retry, (4) tuliskan alur rilis Anda: commit → CI → image → deploy, dan identifikasi di langkah mana kegagalan paling sering terjadi.',
    chEn: 'Strengthen the pipeline: (1) add a deploy stage to the workflow: push the image to GHCR (docker/build-push-action) when on main, (2) add npm caching (actions/cache) to speed up npm ci, (3) change the API healthcheck in compose: wget to /api/health with retries, (4) write down your release flow: commit → CI → image → deploy, and identify which step fails most often.',
    sumId: 'Multi-stage = image kecil. Compose = stack satu perintah. CI = pintu gerbang otomatis. Image yang sama ke produksi. Lanjut: capstone.',
    sumEn: 'Multi-stage = small images. Compose = one-command stacks. CI = the automatic gate. The same image to production. Next: capstone.',
  },
  {
    phase: 4, num: 16, topicId: 'capstone',
    titleId: 'Capstone: Notes API Terlindungi', titleEn: 'Capstone: Protected Notes API',
    codeFile: 'src/app.module.ts',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Dokumentasi capstone
  const config = new DocumentBuilder()
    .setTitle('Notes API')
    .setDescription('Capstone NestJS: auth JWT + data per-user')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

  await app.listen(3000);
}

bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
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
export class AppModule {}`,
      'src/auth/auth.module.ts': `import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    // Secret dari env (pelajaran 12), bukan hardcode
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'rahasia-dev'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [JwtModule, JwtAuthGuard],
})
export class AuthModule {}`,
      'src/auth/auth.controller.ts': `import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login, dapatkan access token' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Profil dari token' })
  @UseGuards(JwtAuthGuard)
  me(@Req() req: any) {
    return req.user;
  }
}`,
      'src/auth/auth.service.ts': `import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

const USERS: User[] = [
  { id: 1, username: 'admin', password: 'rahasia123', role: 'admin' },
  { id: 2, username: 'siswa', password: 'rahasia123', role: 'siswa' },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(username: string, password: string) {
    const user = USERS.find(
      (u) => u.username === username && u.password === password,
    );
    if (!user) throw new UnauthorizedException('Username atau password salah');
    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user.id, username: user.username, role: user.role },
    };
  }
}`,
      'src/auth/jwt-auth.guard.ts': `import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header: string | undefined = request.headers['authorization'];
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token tidak ditemukan');
    }
    try {
      const payload = this.jwtService.verify(header.slice(7));
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Token tidak valid atau kedaluwarsa');
    }
  }
}`,
      'src/auth/dto/login.dto.ts': `import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}`,
      'src/catatan/catatan.module.ts': `import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CatatanController } from './catatan.controller';
import { CatatanService } from './catatan.service';

@Module({
  imports: [AuthModule],
  controllers: [CatatanController],
  providers: [CatatanService],
})
export class CatatanModule {}`,
      'src/catatan/catatan.controller.ts': `import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatatanService } from './catatan.service';
import { BuatCatatanDto } from './dto/buat-catatan.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('catatan')
@ApiBearerAuth()
@Controller('catatan')
@UseGuards(JwtAuthGuard) // SEMUA route butuh login
export class CatatanController {
  constructor(private readonly catatanService: CatatanService) {}

  // Data per-user: userId diambil dari token (req.user.sub)
  @Get()
  @ApiOperation({ summary: 'Catatan milik user ini' })
  semua(@Req() req: any) {
    return this.catatanService.semua(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail catatan milik user ini' })
  detail(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.catatanService.detail(req.user.sub, id);
  }

  @Post()
  @ApiOperation({ summary: 'Buat catatan' })
  buat(@Body() dto: BuatCatatanDto, @Req() req: any) {
    return this.catatanService.buat(req.user.sub, dto.judul, dto.selesai);
  }

  @Patch(':id/selesai')
  @ApiOperation({ summary: 'Tandai catatan selesai' })
  tandaiSelesai(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.catatanService.tandaiSelesai(req.user.sub, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus catatan' })
  hapus(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.catatanService.hapus(req.user.sub, id);
  }
}`,
      'src/catatan/catatan.service.ts': `import { Injectable, NotFoundException } from '@nestjs/common';

export interface Catatan {
  id: number;
  userId: number;
  judul: string;
  selesai: boolean;
}

@Injectable()
export class CatatanService {
  private data: Catatan[] = [];
  private idBerikutnya = 1;

  semua(userId: number): Catatan[] {
    // filter: user HANYA melihat catatannya sendiri
    return this.data.filter((c) => c.userId === userId);
  }

  detail(userId: number, id: number): Catatan {
    const item = this.data.find((c) => c.id === id && c.userId === userId);
    if (!item) throw new NotFoundException('Catatan tidak ditemukan');
    return item;
  }

  buat(userId: number, judul: string, selesai = false): Catatan {
    const baru: Catatan = { id: this.idBerikutnya++, userId, judul, selesai };
    this.data.push(baru);
    return baru;
  }

  tandaiSelesai(userId: number, id: number): Catatan {
    const item = this.data.find((c) => c.id === id && c.userId === userId);
    if (!item) throw new NotFoundException('Catatan tidak ditemukan');
    item.selesai = true;
    return item;
  }

  hapus(userId: number, id: number): { pesan: string } {
    const index = this.data.findIndex((c) => c.id === id && c.userId === userId);
    if (index === -1) throw new NotFoundException('Catatan tidak ditemukan');
    this.data.splice(index, 1);
    return { pesan: 'Catatan dihapus' };
  }
}`,
      'src/catatan/dto/buat-catatan.dto.ts': `import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class BuatCatatanDto {
  @ApiProperty({ example: 'Belajar capstone' })
  @IsString()
  @MinLength(3, { message: 'judul minimal 3 karakter' })
  @MaxLength(200)
  judul: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  selesai?: boolean;
}`,
      '.env.example': `PORT=3000
JWT_SECRET=rahasia-dev`,
      'package.json': `{
  "name": "lesson16-nest-capstone",
  "version": "1.0.0",
  "description": "Capstone: Notes API dengan JWT + data per-user",
  "scripts": {
    "start": "nest start --watch",
    "build": "nest build",
    "test": "jest --watchAll=false",
    "test:e2e": "jest --config ./test/jest-e2e.json --watchAll=false"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/config": "^3.2.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/platform-express": "^10.4.0",
    "@nestjs/swagger": "^7.4.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "typescript": "^5.5.0"
  }
}`,
      'tsconfig.json': JSON.stringify(TS_CONFIG, null, 2),
      'nest-cli.json': `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}`,
    },
    objId: [
      'Menggabungkan SEMUA konsep track dalam satu aplikasi',
      'Membuat API dengan autentikasi JWT end-to-end',
      'Menjamin data per-user lewat filter userId dari token',
      'Menutup proyek: dokumentasi, test, dan deployment',
    ],
    objEn: [
      'Combine ALL track concepts in one application',
      'Build an API with end-to-end JWT authentication',
      'Guarantee per-user data via userId filtering from the token',
      'Close the project: documentation, tests, and deployment',
    ],
    expId: `## Capstone: Mengapa Semua Pelajaran Menjadi Satu
Notes API ini adalah NestJS lengkap: module (batas domain) → controller (route) → service (logika) → DTO + ValidationPipe (input bersih) → AuthModule + JwtAuthGuard (identitas) → Swagger (dokumentasi) → ConfigModule (env) → siap di-test dan di-Docker (pelajaran 13-15). Jika Anda bisa menjelaskan setiap file di proyek ini tanpa membuka catatan, Anda menguasai track.
## Data Per-User: Filter yang Menyelamatkan Privasi
Semua method service menerima userId dari token (req.user.sub) dan memfilter data dengannya. Catatan user A TIDAK mungkin terlihat user B - bukan karena UI menyembunyikannya, tapi karena QUERY-nya sendiri menolak. Ini perbedaan keamanan nyata vs keamanan tampilan: aturan selalu di backend, frontend hanya menampilkan.
## Autentikasi: Satu Gerbang untuk Semua Route
@UseGuards(JwtAuthGuard) di level controller: tidak ada route catatan yang bisa diakses tanpa token valid. Login → token → header Authorization: Bearer ... → req.user. Kombinasi dengan Swagger @ApiBearerAuth membuat dokumentasi menjelaskan cara memakai token. Secret dari env (JwtModule.registerAsync) - bukan hardcode.
## Menutup Proyek Seperti Profesional
Penyelesaian yang membedakan lulusan bootcamp: (1) README - cara run, env vars, contoh curl, daftar endpoint, (2) unit + e2e test minimal untuk alur auth & CRUD, (3) deployment ke Render/Railway/Fly + database managed, (4) Dockerfile multi-stage. Satu proyek selesai dan ter-deploy bernilai lebih dari lima proyek setengah jadi.`,
    expEn: `## The Capstone: Why All Lessons Become One
This Notes API is complete NestJS: modules (domain boundaries) → controllers (routes) → services (logic) → DTOs + ValidationPipe (clean input) → AuthModule + JwtAuthGuard (identity) → Swagger (documentation) → ConfigModule (env) → ready for testing and Docker (lessons 13-15). If you can explain every file in this project without notes, you own the track.
## Per-User Data: The Privacy-Saving Filter
Every service method receives the userId from the token (req.user.sub) and filters data with it. User A's notes CANNOT be seen by user B - not because the UI hides them, but because the QUERY itself refuses. This is real security vs cosmetic security: rules always live in the backend; the frontend only displays.
## Authentication: One Gate for Every Route
@UseGuards(JwtAuthGuard) at the controller level: no note route works without a valid token. Login → token → Authorization: Bearer ... header → req.user. Combined with the Swagger @ApiBearerAuth, the documentation explains how to use the token. The secret comes from env (JwtModule.registerAsync) - not hardcoded.
## Closing the Project Like a Professional
The finishing touches that separate bootcamp graduates: (1) README - how to run, env vars, curl examples, endpoint list, (2) minimal unit + e2e tests for the auth & CRUD flows, (3) deployment to Render/Railway/Fly with a managed database, (4) a multi-stage Dockerfile. One finished, deployed project is worth more than five half-finished ones.`,
    chId: 'Selesaikan capstone ke level produksi: (1) tambah e2e test lengkap: login → buat catatan → baca → tandai selesai → hapus (alur dengan token), dan uji akses tanpa token (401), (2) ganti user in-memory dengan TypeORM + database PostgreSQL di Docker (compose api + db), password di-hash bcrypt, (3) tulis README profesional + contoh curl untuk tiap endpoint, (4) deploy ke platform gratis (Render/Railway) dan bagikan URL-nya.',
    chEn: 'Take the capstone to production level: (1) add full e2e tests: login → create note → read → mark done → delete (the token flow), plus a no-token access test (401), (2) replace in-memory users with TypeORM + PostgreSQL in Docker (compose api + db), hash passwords with bcrypt, (3) write a professional README + curl examples for each endpoint, (4) deploy to a free platform (Render/Railway) and share the URL.',
    sumId: 'Capstone merangkum: module → controller → service → DTO → JWT → Swagger → env. Data per-user di level query. Satu proyek selesai > lima setengah jadi. Selamat - Anda NestJS Developer!',
    sumEn: 'The capstone ties it together: module → controller → service → DTO → JWT → Swagger → env. Per-user data at the query level. One finished project > five half-finished ones. Congratulations - you are a NestJS Developer!',
  },
];

const LESSONS = [...LESSONS_P1, ...LESSONS_P2, ...LESSONS_P3, ...LESSONS_P4];

// ===== GENERATE =====
for (const lesson of LESSONS) {
  const phase = PHASES.find((p) => p.phase === lesson.phase);
  const levelDir = phase.id;
  const mdDir = path.join(BASE_DIR, levelDir);

  const objListId = lesson.objId.map((o) => `- ${o}`).join('\n');
  const objListEn = lesson.objEn.map((o) => `- ${o}`).join('\n');

  for (const lang of ['id', 'en']) {
    const isId = lang === 'id';
    const title = isId ? lesson.titleId : lesson.titleEn;
    const phaseName = isId ? phase.nameId : phase.nameEn;
    const objList = isId ? objListId : objListEn;
    const exp = isId ? lesson.expId : lesson.expEn;
    const ch = isId ? lesson.chId : lesson.chEn;
    const sum = isId ? lesson.sumId : lesson.sumEn;
    const lessonLabel = isId ? `Pelajaran ${lesson.num}` : `Lesson ${lesson.num}`;

    const langDir = path.join(mdDir, lang);
    fs.mkdirSync(langDir, { recursive: true });

    const code = lesson.files[lesson.codeFile] || '';
    const filename = `lesson${lesson.num}-${lesson.topicId}.md`;
    const content = `# ${title}

> NestJS | ${phaseName} | ${lessonLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objList}

---

## Program: ${title}

\`\`\`ts
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${exp}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${exp.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('##')).map((h, i) => `${i + 1}. **${h.replace(/^#+\s*/, '')}**`).join('\n')}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${ch}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${sum}
`;

    fs.writeFileSync(path.join(langDir, filename), content);

    // Write project files JSON for StackBlitz playground
    const filesJson = path.join(langDir, `lesson${lesson.num}-${lesson.topicId}.json`);
    fs.writeFileSync(filesJson, JSON.stringify(lesson.files, null, 2));
  }

  console.log(`  ${lesson.num}. ${lesson.titleId} / ${lesson.titleEn}`);
}

const total = LESSONS.length * 2;
console.log(`\nGenerated ${total} NestJS curriculum files (${LESSONS.length} lessons x 2 languages)`);
console.log(`  Output: ${BASE_DIR}`);

