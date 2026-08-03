# Config, Swagger & Logging

> NestJS | Auth & Lanjutan | Pelajaran 12

## Tujuan Pembelajaran

- Mengelola konfigurasi dengan @nestjs/config
- Menghasilkan dokumentasi API dengan Swagger/OpenAPI
- Menggunakan Nest Logger dengan level dan context
- Merapikan produksi: env, validasi config, logging

---

## Program: Config, Swagger & Logging

```ts
import { NestFactory } from '@nestjs/core';
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
  logger.log(`API aktif di http://localhost:${port}/api`);
  logger.log(`Dokumentasi Swagger: http://localhost:${port}/docs`);
}

bootstrap();
```

---

## Penjelasan

## ConfigModule: Satu Tempat untuk Semua Pengaturan
ConfigModule.forRoot({ isGlobal: true }) membaca .env dan membuatnya tersedia di seluruh aplikasi via ConfigService (get<string>('PORT')). Nilai yang tidak ada bisa diberi default (get('APP_NAME', 'Catatan API')). Aturan produksi: tidak ada angka ajaib, tidak ada secret di kode - semuanya env, di-version hanya .env.example (template tanpa nilai asli).
## Swagger: Dokumentasi yang Tidak Pernah Kedaluwarsa
DocumentBuilder + SwaggerModule menghasilkan halaman /docs dari KODE Anda: decorators controller (@ApiTags, @ApiOperation) dan DTO (@ApiProperty). Dokumentasi selalu sinkron dengan implementasi - karena ia LAHIR dari implementasi. Frontend team, tester, dan developer lain bisa membaca kontrak API tanpa bertanya. OpenAPI = standar yang bisa diekspor (json/yaml) untuk codegen.
## Nest Logger: Bukan console.log
Logger memberikan: context (CatatanService), level (log/warn/error/fatal), dan format konsisten. warn/error bisa disambungkan ke sistem monitoring (Sentry, Grafana) di produksi - console.log polos tidak punya level sehingga tidak bisa di-filter. Aturan: log.info untuk jejak, warn untuk anomaly, error untuk kegagalan.
## Mengapa Ketiganya Satu Pelajaran
Config + Swagger + Logging adalah "infrastruktur yang terlihat": tanpa mereka aplikasi jalan, dengan mereka aplikasi DAPAT DIOPERASIKAN - siap dipakai tim, siap di-debug di produksi, siap didokumentasikan. Ketiganya dipasang SEKALI di awal proyek, dan setiap proyek Nest produksi memilikinya.

---

## Eksperimen

1. **ConfigModule: Satu Tempat untuk Semua Pengaturan**
2. **Swagger: Dokumentasi yang Tidak Pernah Kedaluwarsa**
3. **Nest Logger: Bukan console.log**
4. **Mengapa Ketiganya Satu Pelajaran**

---

## Tantangan

Rapikan konfigurasi: (1) pindahkan secret JWT (pelajaran 10) ke .env dan baca lewat ConfigService (JwtModule.registerAsync), (2) aktifkan validasi config: buat fungsi validasi yang melempar error jika PORT bukan angka, (3) tambah @ApiBearerAuth + @ApiResponse untuk route yang butuh token, (4) tambah query param ?q= di GET /catatan dan dokumentasikan dengan @ApiQuery.

---

## Ringkasan

ConfigModule = env terpusat. Swagger = docs lahir dari kode. Nest Logger = level + context. Produksi siap. Lanjut: testing.
